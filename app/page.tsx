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
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Load likes & theme from sessionStorage
  useEffect(() => {
    const savedLikes = sessionStorage.getItem('likedQuotes');
    if (savedLikes) {
      setLiked(JSON.parse(savedLikes));
    }

    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme === 'light') {
      // Only switch to light if explicitly saved as light
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark mode (including when no theme is saved)
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      sessionStorage.setItem('theme', 'dark');
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
    success: {
      light: 'from-emerald-400/20 via-green-300/15 to-teal-400/20',
      dark: 'from-emerald-500/15 via-green-400/10 to-teal-500/15'
    },
    life: {
      light: 'from-blue-400/20 via-cyan-300/15 to-indigo-400/20',
      dark: 'from-blue-500/15 via-cyan-400/10 to-indigo-500/15'
    },
    motivation: {
      light: 'from-purple-400/20 via-pink-300/15 to-violet-400/20',
      dark: 'from-purple-500/15 via-pink-400/10 to-violet-500/15'
    },
    courage: {
      light: 'from-orange-400/20 via-red-300/15 to-rose-400/20',
      dark: 'from-orange-500/15 via-red-400/10 to-rose-500/15'
    },
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 transition-all duration-1000 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-b from-blue-400 via-sky-300 to-cyan-200'
    }`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {darkMode ? (
          // Night Sky with Stars
          <>
            {/* Animated Stars */}
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              />
            ))}
            
            {/* Shooting Stars */}
            {[...Array(3)].map((_, i) => (
              <div
                key={`shooting-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 50}%`,
                  animation: `shootingStar 4s linear infinite`,
                  animationDelay: `${i * 8}s`,
                }}
              />
            ))}
            
            {/* Nebula Effects */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
          </>
        ) : (
          // Day Sky with Clouds and Sun Rays
          <>
            {/* Floating Clouds */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`cloud-${i}`}
                className="absolute bg-white/30 rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 120 - 10}%`,
                  top: `${Math.random() * 60 + 10}%`,
                  width: `${Math.random() * 100 + 80}px`,
                  height: `${Math.random() * 40 + 30}px`,
                  animation: `floatClouds ${Math.random() * 20 + 30}s linear infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              />
            ))}
            
            {/* Sun Rays */}
            <div className="absolute top-10 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-5 right-15 w-40 h-40 bg-yellow-200/15 rounded-full blur-3xl animate-pulse delay-500"></div>
            
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute bg-white/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animation: `floatParticles ${Math.random() * 10 + 15}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
            
            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-300/20 via-transparent to-cyan-300/20"></div>
          </>
        )}
      </div>

      <div className="w-full max-w-4xl space-y-8 relative z-10">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className="swap swap-rotate p-2 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? (
              // Sun Icon for switching to light mode
              <svg
                className="h-8 w-8 fill-current text-yellow-400 drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            ) : (
              // Moon Icon for switching to dark mode
              <svg
                className="h-8 w-8 fill-current text-blue-600 drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            )}
          </button>
        </div>

        {/* Header */}
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" aria-hidden="true" />
            <h1 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent drop-shadow-2xl ${
              darkMode 
                ? 'bg-gradient-to-r from-white via-purple-200 to-pink-200' 
                : 'bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800'
            }`}>
              Quote Generator
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" aria-hidden="true" />
          </div>
          <p className={`text-lg font-light drop-shadow-lg ${
            darkMode ? 'text-white/80' : 'text-gray-700/90'
          }`}>
            Discover wisdom that inspires and motivates your journey
          </p>
        </header>

        {/* Enhanced Glassy Form */}
        <section className={`backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border transition-all duration-300 hover:shadow-white/10 ${
          darkMode 
            ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30' 
            : 'bg-white/30 border-white/40 hover:bg-white/40 hover:border-white/50'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label 
                htmlFor="topic-select"
                className={`text-sm font-medium flex items-center gap-2 drop-shadow-sm ${
                  darkMode ? 'text-white/90' : 'text-gray-800/90'
                }`}
              >
                Choose Your Topic
              </label>
              <div className="relative">
                <Select
                  value={topic}
                  onValueChange={(value) => setTopic(value)}
                  required
                >
                  <SelectTrigger 
                    id="topic-select"
                    className={`w-full h-14 text-lg backdrop-blur-md border rounded-2xl shadow-lg transition-all duration-300 ${
                      darkMode 
                        ? 'bg-white/20 border-white/30 text-white placeholder:text-white/60 hover:bg-white/25' 
                        : 'bg-white/40 border-white/50 text-gray-800 placeholder:text-gray-600 hover:bg-white/50'
                    }`}
                    aria-label="Select quote topic"
                  >
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent className={`backdrop-blur-xl border rounded-2xl shadow-2xl ${
                    darkMode 
                      ? 'bg-gray-900/90 border-gray-700/50' 
                      : 'bg-white/90 border-white/50'
                  }`}>
                    <SelectItem value="success" className={`rounded-xl ${
                      darkMode 
                        ? 'text-white hover:bg-white/10' 
                        : 'text-gray-800 hover:bg-white/50'
                    }`}>Success</SelectItem>
                    <SelectItem value="life" className={`rounded-xl ${
                      darkMode 
                        ? 'text-white hover:bg-white/10' 
                        : 'text-gray-800 hover:bg-white/50'
                    }`}>Life</SelectItem>
                    <SelectItem value="motivation" className={`rounded-xl ${
                      darkMode 
                        ? 'text-white hover:bg-white/10' 
                        : 'text-gray-800 hover:bg-white/50'
                    }`}>Motivation</SelectItem>
                    <SelectItem value="courage" className={`rounded-xl ${
                      darkMode 
                        ? 'text-white hover:bg-white/10' 
                        : 'text-gray-800 hover:bg-white/50'
                    }`}>Courage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className={`w-full h-14 text-lg backdrop-blur-sm border-0 rounded-2xl shadow-2xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600/90 hover:to-pink-600/90 hover:shadow-purple-500/25' 
                  : 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 hover:shadow-blue-500/25'
              }`}
              disabled={isLoading}
              aria-describedby={isLoading ? "loading-status" : undefined}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div 
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    aria-hidden="true"
                  ></div>
                  <span id="loading-status">Finding Quotes...</span>
                </div>
              ) : (
                <>Get Quotes</>
              )}
            </Button>
          </form>
        </section>

        {/* Ultra Glassy Results Cards */}
        {results && results.length > 0 && (
          <section 
            key={animationKey}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in-50 duration-700"
            aria-label="Generated quotes"
          >
            {results.map((quote, idx) => (
              <Card 
                key={quote.id} 
                className={`group relative overflow-hidden border-0 shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] rounded-3xl ${
                  darkMode ? 'hover:shadow-purple-500/20' : 'hover:shadow-blue-500/20'
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Subtle Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? topicColors[topic as keyof typeof topicColors].dark : topicColors[topic as keyof typeof topicColors].light}`} aria-hidden="true"></div>
                
                {/* Primary Glass Layer */}
                <div className={`absolute inset-0 backdrop-blur-2xl border rounded-3xl ${
                  darkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/20 border-white/30'
                }`} aria-hidden="true"></div>
                
                {/* Secondary Glass Layer for Extra Depth */}
                <div className={`absolute inset-[1px] backdrop-blur-xl rounded-3xl shadow-inner ${
                  darkMode ? 'bg-white/3' : 'bg-white/15'
                }`} aria-hidden="true"></div>
                
                {/* Highlight Effect */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden="true"></div>
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" aria-hidden="true"></div>
                
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <CardContent className="p-0 flex-1">
                    <blockquote className={`text-lg font-medium leading-relaxed mb-4 drop-shadow-sm ${
                      darkMode ? 'text-white/95' : 'text-gray-800'
                    }`}>
                      "{quote.text}"
                    </blockquote>
                    <cite className={`font-medium drop-shadow-sm not-italic ${
                      darkMode ? 'text-white/70' : 'text-gray-600'
                    }`}>
                      — {quote.author}
                    </cite>
                  </CardContent>
                  
                  <div className={`flex justify-between items-center mt-6 pt-4 border-t ${
                    darkMode ? 'border-white/20' : 'border-gray-300/40'
                  }`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyQuote(quote)}
                      className={`p-3 backdrop-blur-xl border transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl ${
                        darkMode 
                          ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                          : 'bg-white/30 hover:bg-white/50 border-white/40'
                      }`}
                      aria-label={`Copy quote by ${quote.author}`}
                      title={`Copy quote by ${quote.author}`}
                    >
                      {copiedId === quote.id ? (
                        <Check className="w-5 h-5 text-green-500 drop-shadow-sm" aria-hidden="true" />
                      ) : (
                        <Copy className={`w-5 h-5 transition-colors drop-shadow-sm ${
                          darkMode 
                            ? 'text-white/70 hover:text-white' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`} aria-hidden="true" />
                      )}
                    </Button>
                    
                    {/* Ultra Glassy Heart Button */}
                    <button
                      className={`btn btn-circle btn-sm backdrop-blur-xl border transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/20 ${
                        darkMode 
                          ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                          : 'bg-white/30 hover:bg-white/50 border-white/40'
                      } ${
                        liked.includes(quote.id) 
                          ? 'text-red-500' 
                          : darkMode 
                            ? 'text-white/70 hover:text-red-400' 
                            : 'text-gray-600 hover:text-red-500'
                      }`}
                      onClick={() => toggleLike(quote.id)}
                      aria-label={`${liked.includes(quote.id) ? 'Unlike' : 'Like'} quote by ${quote.author}`}
                      title={`${liked.includes(quote.id) ? 'Unlike' : 'Like'} quote by ${quote.author}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={liked.includes(quote.id) ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 drop-shadow-sm"
                        aria-hidden="true"
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
          </section>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shootingStar {
          0% {
            opacity: 0;
            transform: translateX(-100px) translateY(0px);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(300px) translateY(200px);
          }
        }
        
        @keyframes floatClouds {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }
        
        @keyframes floatParticles {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}