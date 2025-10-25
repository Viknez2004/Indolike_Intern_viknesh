import React, { useState } from 'react';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '%':
        return firstValue % secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const buttonClass = (type = 'number') => {
    const baseClass = 'h-16 text-xl font-semibold rounded-lg transition-all duration-200 active:scale-95 ';
    
    switch (type) {
      case 'number':
        return baseClass + 'bg-gray-700 text-white hover:bg-gray-600';
      case 'operator':
        return baseClass + 'bg-orange-500 text-white hover:bg-orange-600';
      case 'function':
        return baseClass + 'bg-gray-500 text-white hover:bg-gray-400';
      default:
        return baseClass;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-black rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        {/* Display */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <div className="text-white text-right text-3xl font-light overflow-hidden">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className={buttonClass('function')}
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className={buttonClass('function')}
          >
            +/-
          </button>
          <button
            onClick={() => performOperation('%')}
            className={buttonClass('function')}
          >
            %
          </button>
          <button
            onClick={() => performOperation('÷')}
            className={buttonClass('operator')}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber(7)}
            className={buttonClass('number')}
          >
            7
          </button>
          <button
            onClick={() => inputNumber(8)}
            className={buttonClass('number')}
          >
            8
          </button>
          <button
            onClick={() => inputNumber(9)}
            className={buttonClass('number')}
          >
            9
          </button>
          <button
            onClick={() => performOperation('×')}
            className={buttonClass('operator')}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber(4)}
            className={buttonClass('number')}
          >
            4
          </button>
          <button
            onClick={() => inputNumber(5)}
            className={buttonClass('number')}
          >
            5
          </button>
          <button
            onClick={() => inputNumber(6)}
            className={buttonClass('number')}
          >
            6
          </button>
          <button
            onClick={() => performOperation('-')}
            className={buttonClass('operator')}
          >
            -
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber(1)}
            className={buttonClass('number')}
          >
            1
          </button>
          <button
            onClick={() => inputNumber(2)}
            className={buttonClass('number')}
          >
            2
          </button>
          <button
            onClick={() => inputNumber(3)}
            className={buttonClass('number')}
          >
            3
          </button>
          <button
            onClick={() => performOperation('+')}
            className={buttonClass('operator')}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber(0)}
            className="col-span-2 h-16 bg-gray-700 text-white text-xl font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200 active:scale-95"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className={buttonClass('number')}
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className={buttonClass('operator')}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;