'use client';
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
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
      <h1 className="text-4xl font-bold mb-8 text-[#2D3745]">✨Motivational Quote Generator✨</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">


        <h3 className="text-lg font-semibold text-[#2D3745]">Select a Topic</h3>
        <Select
          value={topic}
          onValueChange={(value) => setTopic(value)}
        >
          <SelectTrigger className="w-[450px]">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="life">Life</SelectItem>
            <SelectItem value="motivation">Motivation</SelectItem>
            <SelectItem value="courage">Courage</SelectItem>
          </SelectContent>
        </Select>


        <div className="flex items-center justify-center">
        <Button type="submit" variant="outline">Get Quotes</Button>
        </div>
      </form>

      

      {results && results.length > 0 && (
        <div className="mt-8 space-y-4 w-full max-w-md">
          {results.map((quote, idx) => (
            <Card key={idx} className="bg-neutral-200 text-black border border-neutral-700">
              <CardContent>
                {quote}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </main>
  );
}
