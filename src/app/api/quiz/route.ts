// src/app/api/quiz/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    const promptTopic = (topic || 'Data Structures').toLowerCase();
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Try Gemini API if key exists
    if (apiKey && apiKey.startsWith('AIzaSy')) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `Generate a 3-question multiple-choice quiz about "${promptTopic}" in JSON format.` }] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          return NextResponse.json({ questions: JSON.parse(rawText) });
        }
      } catch (e) {
        console.error('Using smart quiz fallback');
      }
    }

    // 2. High-Yield Smart Quiz Bank
    let questions = [
      {
        question: `In ${promptTopic}, what is the primary benefit of dividing a problem into smaller independent subproblems?`,
        options: ['Reduces overall time complexity via Divide & Conquer', 'Guarantees O(1) space complexity', 'Eliminates the need for memory allocation', 'Avoids compilation errors'],
        correct: 0,
        explanation: 'Divide and conquer breaks complex problems into manageable sub-problems, often leading to optimal logarithmic or linearithmic solutions.'
      },
      {
        question: `When optimizing performance in ${promptTopic}, which metric is most critical for real-time responsiveness?`,
        options: ['Throughput', 'Latency / Response Time', 'Disk storage capacity', 'Code line count'],
        correct: 1,
        explanation: 'Latency measures the time taken to process a single request, which directly dictates user-perceived responsiveness.'
      },
      {
        question: `Which fundamental principle is key to preventing system deadlocks in ${promptTopic}?`,
        options: ['Mutual Exclusion', 'Hold and Wait', 'Circular Wait elimination', 'All of the above must be addressed'],
        correct: 3,
        explanation: 'Coffman conditions dictate that preventing any one of the four deadlock conditions (including circular wait and hold & wait) prevents deadlocks.'
      }
    ];

    if (promptTopic.includes('os') || promptTopic.includes('operating')) {
      questions = [
        {
          question: 'What happens during a Context Switch in an Operating System?',
          options: ['The CPU registers and program counter of the current process are saved, and the next process state is restored', 'The hard drive is formatted', 'All RAM is cleared', 'The OS shuts down unused threads'],
          correct: 0,
          explanation: 'Context switching saves the execution state of an active process so it can be resumed seamlessly later.'
        },
        {
          question: 'Which page replacement algorithm suffers from Belady’s Anomaly?',
          options: ['FIFO (First-In, First-Out)', 'LRU (Least Recently Used)', 'Optimal Page Replacement', 'LFU (Least Frequently Used)'],
          correct: 0,
          explanation: 'In FIFO, increasing the number of page frames can sometimes counterintuitively increase page faults—this is Belady’s Anomaly.'
        },
        {
          question: 'What is the main role of a Semaphore in process synchronization?',
          options: ['Allocate GPU memory', 'Coordinate access to shared resources to prevent race conditions', 'Speed up file downloads', 'Encrypt passwords'],
          correct: 1,
          explanation: 'Semaphores provide signaling mechanisms (wait and signal) to ensure mutual exclusion across critical sections.'
        }
      ];
    }

    return NextResponse.json({ questions });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}