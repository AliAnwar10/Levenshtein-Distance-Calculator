import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { EditDistanceResult } from '../types';

interface MatrixVisualizationProps {
  result: EditDistanceResult;
  str1: string;
  str2: string;
}

export const MatrixVisualization: React.FC<MatrixVisualizationProps> = ({
  result,
  str1,
  str2
}) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < result.matrix.length * result.matrix[0].length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    } else if (currentStep >= result.matrix.length * result.matrix[0].length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, result.matrix.length]);

  const getCellColor = (row: number, col: number) => {
    const cellIndex = row * result.matrix[0].length + col;
    if (cellIndex <= currentStep) {
      if (row === 0 || col === 0) {
        return 'bg-blue-100 border-blue-300 text-blue-800';
      }
      return 'bg-emerald-100 border-emerald-300 text-emerald-800';
    }
    return 'bg-gray-50 border-gray-200 text-gray-600';
  };

  const handlePlayPause = () => {
    if (currentStep >= result.matrix.length * result.matrix[0].length - 1) {
      setCurrentStep(-1);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-purple-500 p-3 rounded-xl mr-4">
            <Grid className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">DP Matrix Visualization</h2>
            <p className="text-gray-600">Dynamic programming matrix with step-by-step calculation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentStep(Math.max(-1, currentStep - 1))}
            className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentStep(Math.min(result.matrix.length * result.matrix[0].length - 1, currentStep + 1))}
            className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${result.matrix[0].length + 1}, minmax(0, 1fr))` }}>
            {/* Header row */}
            <div className="bg-gray-100 border border-gray-300 p-2 text-center font-semibold text-xs">
              ∅
            </div>
            {str2.split('').map((char, idx) => (
              <div key={idx} className="bg-gray-100 border border-gray-300 p-2 text-center font-semibold text-xs">
                {char}
              </div>
            ))}

            {/* Matrix rows */}
            {result.matrix.map((row, rowIdx) => (
              <React.Fragment key={rowIdx}>
                {/* Row header */}
                <div className="bg-gray-100 border border-gray-300 p-2 text-center font-semibold text-xs">
                  {rowIdx === 0 ? '∅' : str1[rowIdx - 1]}
                </div>
                
                {/* Row cells */}
                {row.map((cell, colIdx) => (
                  <motion.div
                    key={`${rowIdx}-${colIdx}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                    }}
                    className={`border-2 p-2 text-center font-bold text-sm transition-all duration-300 ${getCellColor(rowIdx, colIdx)}`}
                  >
                    {cell}
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Initialization</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-100 border border-emerald-300 rounded"></div>
            <span>Calculated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
            <span>Pending</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Step {Math.max(0, currentStep + 1)} of {result.matrix.length * result.matrix[0].length}
        </div>
      </div>
    </motion.div>
  );
};