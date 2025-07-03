'use client';

import { useState } from 'react';
import { quotes } from '@/data/quotes';

export default function Home() {
  const [topic, setTopic] = useState('success');
  const [results, setResults] = useState<string[] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = quotes
      .filter(q => q.topic === topic)
      .slice(0, 3)
      .map(q => q.text);
    setResults(filtered);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Motivational Quote Generator</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <select
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  className="w-full border border-gray-700 rounded px-3 py-2 bg-gray-800 text-white"
  required
>
  <option value="success" className="bg-gray-800 text-white">Success</option>
  <option value="life" className="bg-gray-800 text-white">Life</option>
  <option value="motivation" className="bg-gray-800 text-white">Motivation</option>
  <option value="courage" className="bg-gray-800 text-white">Courage</option>
</select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Quotes
        </button>
      </form>

      {results && results.length > 0 && (
        <div className="mt-8 space-y-4 w-full max-w-md">
          {results.map((quote, idx) => (
            <div key={idx} className="p-4 border rounded bg-gray-800 text-white font-medium">
              {quote}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
