import React, { useState, useEffect } from 'react';

const AdvancedQuotesGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });
  const [category, setCategory] = useState('all');
  const [isCopied, setIsCopied] = useState(false);

  const quotesByCategory = {
    all: [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" }
    ],
    motivation: [
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
      { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" }
    ],
    wisdom: [
      { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
      { text: "Knowing others is intelligence; knowing yourself is true wisdom.", author: "Lao Tzu" },
      { text: "The wise man knows he knows nothing, the fool thinks he knows all.", author: "Chinese Proverb" }
    ],
    success: [
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
      { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" }
    ],
    life: [
      { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
      { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
      { text: "Get busy living or get busy dying.", author: "Stephen King" }
    ]
  };

  const generateRandomQuote = () => {
    const categoryQuotes = category === 'all' 
      ? Object.values(quotesByCategory).flat() 
      : quotesByCategory[category];
    
    const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
    setCurrentQuote(categoryQuotes[randomIndex]);
    setIsCopied(false);
  };

  useEffect(() => {
    generateRandomQuote();
  }, [category]);

  const copyToClipboard = async () => {
    const quoteText = `"${currentQuote.text}" - ${currentQuote.author}`;
    try {
      await navigator.clipboard.writeText(quoteText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ✨ Quote Generator
          </h1>
          <p className="text-gray-600">Get inspired with random quotes</p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Category:
          </label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
          >
            <option value="all">All Quotes</option>
            <option value="motivation">Motivation</option>
            <option value="wisdom">Wisdom</option>
            <option value="success">Success</option>
            <option value="life">Life</option>
          </select>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 mb-8 border-l-4 border-blue-500 shadow-lg">
          <div className="text-center">
            <p className="text-xl md:text-2xl text-gray-800 italic leading-relaxed mb-6">
              "{currentQuote.text}"
            </p>
            <p className="text-lg md:text-xl text-gray-600 font-semibold">
              - {currentQuote.author}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={generateRandomQuote}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-2 "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            New Quote
          </button>

          <button
            onClick={copyToClipboard}
            className={`font-semibold ml-20 py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 flex items-center justify-center gap-2 ${
              isCopied 
                ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300' 
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-300'
            }`}
          >
            {isCopied ? (
              <>
                <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>

        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {Object.values(quotesByCategory).flat().length} quotes available
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedQuotesGenerator;