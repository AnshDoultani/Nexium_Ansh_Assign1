'use client';
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { quotes, Quote } from '@/data/quotes';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function Home() {
  const [topic, setTopic] = useState('success');
  const [results, setResults] = useState<Quote[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [liked, setLiked] = useState<number[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load likes & theme from sessionStorage
  useEffect(() => {
    const savedLikes = sessionStorage.getItem('likedQuotes');
    if (savedLikes) {
      setLiked(JSON.parse(savedLikes));
    }

    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save likes to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('likedQuotes', JSON.stringify(liked));
  }, [liked]);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      sessionStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      sessionStorage.setItem('theme', 'light');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const filtered = quotes
      .filter(q => q.topic === topic)
      .sort(() => Math.random() - 0.5) // Shuffle results
      .slice(0, 3);
    
    setResults(filtered);
    setAnimationKey(prev => prev + 1);
    setIsLoading(false);
  };

  const copyQuote = async (quote: Quote) => {
    await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    setCopiedId(quote.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLike = (quoteId: number) => {
    setLiked((prev) =>
      prev.includes(quoteId)
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const topicColors = {
    success: 'from-green-400 to-emerald-600',
    life: 'from-blue-400 to-cyan-600',
    motivation: 'from-purple-400 to-pink-600',
    courage: 'from-orange-400 to-red-600',
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4 py-8 transition-colors duration-300">
      <div className="w-full max-w-4xl space-y-8">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <label className="swap swap-rotate">
            <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
            {/* Sun Icon */}
            <svg
              className="swap-off h-10 w-10 fill-current text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            {/* Moon Icon */}
            <svg
              className="swap-on h-10 w-10 fill-current text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Motivational Quote Generator
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover wisdom that inspires and motivates your journey
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                Choose Your Topic
              </label>
              <Select
                value={topic}
                onValueChange={(value) => setTopic(value)}
                required
              >
                <SelectTrigger className="w-full h-12 text-lg">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="life">Life</SelectItem>
                  <SelectItem value="motivation">Motivation</SelectItem>
                  <SelectItem value="courage">Courage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Finding Quotes...
                </div>
              ) : (
                <>Get Quotes</>
              )}
            </Button>
          </form>
        </div>

        {/* Results */}
        {results && results.length > 0 && (
          <div 
            key={animationKey}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in-50 duration-700"
          >
            {results.map((quote, idx) => (
              <Card 
                key={quote.id} 
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br ${topicColors[topic as keyof typeof topicColors]} p-1`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 h-full flex flex-col transition-colors duration-300">
                  <CardContent className="p-0 flex-1">
                    <blockquote className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-relaxed mb-4">
                      "{quote.text}"
                    </blockquote>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      — {quote.author}
                    </p>
                  </CardContent>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyQuote(quote)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {copiedId === quote.id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                      )}
                    </Button>
                    
                    {/* DaisyUI Heart Button */}
                    <button
                      className={`btn btn-circle btn-sm ${
                        liked.includes(quote.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      } transition-colors duration-200`}
                      onClick={() => toggleLike(quote.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={liked.includes(quote.id) ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
                            0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                            3.75 3 5.765 3 8.25c0 7.22 9 12 9 
                            12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}