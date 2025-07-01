import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Cpu, MemoryStick as Memory } from 'lucide-react';
import { EditDistanceResult } from '../types';

interface ResultsSectionProps {
  result: EditDistanceResult;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 mb-8"
    >
      <div className="flex items-center mb-6">
        <div className="bg-emerald-500 p-3 rounded-xl mr-4">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Results</h2>
          <p className="text-gray-600">Levenshtein distance calculation results</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 text-center"
        >
          <div className="text-3xl font-bold text-indigo-600 mb-1">
            {result.distance}
          </div>
          <div className="text-sm font-medium text-indigo-800">
            Levenshtein Distance
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center"
        >
          <div className="flex items-center justify-center mb-1">
            <Clock className="w-5 h-5 text-amber-600 mr-1" />
            <span className="text-lg font-bold text-amber-600">
              {result.executionTime.toFixed(2)}ms
            </span>
          </div>
          <div className="text-sm font-medium text-amber-800">
            Execution Time
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center"
        >
          <div className="flex items-center justify-center mb-1">
            <Cpu className="w-5 h-5 text-emerald-600 mr-1" />
            <span className="text-xs font-bold text-emerald-600">
              {result.timeComplexity}
            </span>
          </div>
          <div className="text-sm font-medium text-emerald-800">
            Time Complexity
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center"
        >
          <div className="flex items-center justify-center mb-1">
            <Memory className="w-5 h-5 text-purple-600 mr-1" />
            <span className="text-xs font-bold text-purple-600">
              {result.spaceComplexity}
            </span>
          </div>
          <div className="text-sm font-medium text-purple-800">
            Space Complexity
          </div>
        </motion.div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Operation Summary
        </h3>
        <div className="text-sm text-gray-600">
          <p>
            The Levenshtein distance between the two strings is{' '}
            <span className="font-bold text-indigo-600">{result.distance}</span>{' '}
            operations. This means you need a minimum of {result.distance}{' '}
            insertions, deletions, or substitutions to transform one string into the other.
          </p>
        </div>
      </div>
    </motion.div>
  );
};