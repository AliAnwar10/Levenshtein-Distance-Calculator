import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Brain, Github, BookOpen } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { MatrixVisualization } from './components/MatrixVisualization';
import { OperationsTrace } from './components/OperationsTrace';
import { calculateEditDistance, validateInputs } from './utils/editDistance';
import { CalculationState } from './types';

function App() {
  const [str1, setStr1] = useState('kitten');
  const [str2, setStr2] = useState('sitting');
  const [state, setState] = useState<CalculationState>({
    isCalculating: false,
    result: null,
    error: null,
    currentStep: 0,
    isAnimating: false
  });

  const handleCalculate = useCallback(async () => {
    const error = validateInputs(str1, str2);
    if (error) {
      setState(prev => ({ ...prev, error }));
      return;
    }

    setState(prev => ({ ...prev, isCalculating: true, error: null }));

    // Simulate async calculation for better UX
    setTimeout(() => {
      try {
        const result = calculateEditDistance(str1, str2);
        setState(prev => ({
          ...prev,
          isCalculating: false,
          result,
          error: null
        }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          isCalculating: false,
          error: 'An error occurred during calculation'
        }));
      }
    }, 500);
  }, [str1, str2]);

  const handleReset = useCallback(() => {
    setStr1('');
    setStr2('');
    setState({
      isCalculating: false,
      result: null,
      error: null,
      currentStep: 0,
      isAnimating: false
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl mr-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Levenshtein Distance Calculator
                </h1>
                <p className="text-gray-600">
                  Visualize Minimum Edit Distance with Dynamic Programming
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">Docs</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InputSection
          str1={str1}
          str2={str2}
          onStr1Change={setStr1}
          onStr2Change={setStr2}
          onCalculate={handleCalculate}
          onReset={handleReset}
          isCalculating={state.isCalculating}
          error={state.error}
        />

        {state.result && (
          <>
            <ResultsSection result={state.result} />
            <MatrixVisualization 
              result={state.result} 
              str1={str1} 
              str2={str2} 
            />
            <OperationsTrace result={state.result} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <p className="text-sm">
              Implementing the Levenshtein Distance algorithm with dynamic programming
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;