export interface Quote {
  id: number;
  text: string;
  author: string;
  topic: string;
}

export const quotes: Quote[] = [
  // Success Quotes
  { id: 1, topic: 'success', text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill' },
  { id: 2, topic: 'success', text: 'Don\'t watch the clock; do what it does. Keep going.', author: 'Sam Levenson' },
  { id: 3, topic: 'success', text: 'The secret of success is to do the common thing uncommonly well.', author: 'John D. Rockefeller Jr.' },

  // Life Quotes
  { id: 4, topic: 'life', text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
  { id: 5, topic: 'life', text: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
  { id: 6, topic: 'life', text: 'The purpose of our lives is to be happy.', author: 'Dalai Lama' },

  // Motivation Quotes
  { id: 7, topic: 'motivation', text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { id: 8, topic: 'motivation', text: 'Push yourself, because no one else is going to do it for you.', author: 'Unknown' },
  { id: 9, topic: 'motivation', text: 'Dream big and dare to fail.', author: 'Norman Vaughan' },

  // Courage Quotes
  { id: 10, topic: 'courage', text: 'Courage is resistance to fear, mastery of fear, not absence of fear.', author: 'Mark Twain' },
  { id: 11, topic: 'courage', text: 'All our dreams can come true, if we have the courage to pursue them.', author: 'Walt Disney' },
  { id: 12, topic: 'courage', text: 'Have the courage to follow your heart and intuition.', author: 'Steve Jobs' }
];