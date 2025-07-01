import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Info } from 'lucide-react';

interface InputSectionProps {
  str1: string;
  str2: string;
  onStr1Change: (value: string) => void;
  onStr2Change: (value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
  isCalculating: boolean;
  error: string | null;
}

export const InputSection: React.FC<InputSectionProps> = ({
  str1,
  str2,
  onStr1Change,
  onStr2Change,
  onCalculate,
  onReset,
  isCalculating,
  error
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 mb-8"
    >
      <div className="flex items-center mb-6">
        <div className="bg-indigo-500 p-3 rounded-xl mr-4">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">String Input</h2>
          <p className="text-gray-600">Enter two strings to calculate their Levenshtein distance</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            String A
            <div className="group relative ml-2">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                  First string for comparison
                </div>
              </div>
            </div>
          </label>
          <input
            type="text"
            value={str1}
            onChange={(e) => onStr1Change(e.target.value)}
            placeholder="e.g., kitten"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-mono text-lg"
            maxLength={100}
          />
          <div className="text-xs text-gray-500">
            {str1.length}/100 characters
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            String B
            <div className="group relative ml-2">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                  Second string for comparison
                </div>
              </div>
            </div>
          </label>
          <input
            type="text"
            value={str2}
            onChange={(e) => onStr2Change(e.target.value)}
            placeholder="e.g., sitting"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-mono text-lg"
            maxLength={100}
          />
          <div className="text-xs text-gray-500">
            {str2.length}/100 characters
          </div>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
        >
          <p className="text-red-800 text-sm font-medium">{error}</p>
        </motion.div>
      )}

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCalculate}
          disabled={isCalculating}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          {isCalculating ? 'Calculating...' : 'Calculate Levenshtein Distance'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
};