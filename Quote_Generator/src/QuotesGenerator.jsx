import React, { useState, useEffect } from 'react';

const QuotesGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });

  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    },
    {
      text: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney"
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon"
    },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela"
    },
    {
      text: "The purpose of our lives is to be happy.",
      author: "Dalai Lama"
    }
  ];

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    generateRandomQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Random Quote Generator
        </h1>
        
        <div className="bg-gray-50 rounded-xl p-8 mb-8 border-l-4 border-blue-500">
          <p className="text-2xl text-gray-800 italic leading-relaxed mb-6 text-center">
            "{currentQuote.text}"
          </p>
          <p className="text-lg text-gray-600 font-semibold text-right">
            - {currentQuote.author}
          </p>
        </div>

        <button
          onClick={generateRandomQuote}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
        >
          Generate New Quote
        </button>
      </div>
    </div>
  );
};

export default QuotesGenerator;