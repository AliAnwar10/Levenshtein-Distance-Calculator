import React from 'react';
import { motion } from 'framer-motion';
import { List, Plus, Minus, RefreshCw, CheckCircle } from 'lucide-react';
import { EditDistanceResult } from '../types';

interface OperationsTraceProps {
  result: EditDistanceResult;
}

export const OperationsTrace: React.FC<OperationsTraceProps> = ({ result }) => {
  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'insert':
        return <Plus className="w-4 h-4" />;
      case 'delete':
        return <Minus className="w-4 h-4" />;
      case 'substitute':
        return <RefreshCw className="w-4 h-4" />;
      case 'match':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getOperationColor = (type: string) => {
    switch (type) {
      case 'insert':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'delete':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'substitute':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'match':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center mb-6">
        <div className="bg-amber-500 p-3 rounded-xl mr-4">
          <List className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Operations Trace</h2>
          <p className="text-gray-600">Step-by-step transformation operations</p>
        </div>
      </div>

      {result.operations.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg">
            No operations needed - strings are identical!
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {result.operations.map((operation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-xl p-4 ${getOperationColor(operation.type)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getOperationIcon(operation.type)}
                    <span className="font-semibold capitalize">
                      {operation.type}
                    </span>
                  </div>
                  <div className="text-sm font-mono">
                    Step {operation.step}
                  </div>
                </div>
                <div className="text-sm">
                  Position [{operation.position[0]}, {operation.position[1]}]
                </div>
              </div>
              <div className="mt-2 text-sm">
                {operation.description}
              </div>
              {operation.char1 && operation.char2 && (
                <div className="mt-2 text-xs font-mono bg-white bg-opacity-50 rounded px-2 py-1 inline-block">
                  '{operation.char1}' → '{operation.char2}'
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 bg-gray-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Operation Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Insert</span>
          </div>
          <div className="flex items-center gap-2">
            <Minus className="w-4 h-4 text-red-600" />
            <span>Delete</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-amber-600" />
            <span>Substitute</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span>Match</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};