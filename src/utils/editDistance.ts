import { EditDistanceResult, Operation } from '../types';

export function calculateEditDistance(str1: string, str2: string): EditDistanceResult {
  const startTime = performance.now();
  
  const m = str1.length;
  const n = str2.length;
  
  // Create DP matrix
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  const operations: Operation[] = [];
  
  // Initialize first row and column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  
  // Fill the DP matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        const insertCost = dp[i][j - 1] + 1;
        const deleteCost = dp[i - 1][j] + 1;
        const substituteCost = dp[i - 1][j - 1] + 1;
        
        dp[i][j] = Math.min(insertCost, deleteCost, substituteCost);
      }
    }
  }
  
  // Backtrack to find operations
  const backtrackOperations = (i: number, j: number, step: number): Operation[] => {
    if (i === 0 && j === 0) return [];
    
    const ops: Operation[] = [];
    
    if (i > 0 && j > 0 && str1[i - 1] === str2[j - 1]) {
      ops.push(...backtrackOperations(i - 1, j - 1, step + 1));
      ops.push({
        step: step,
        type: 'match',
        position: [i - 1, j - 1],
        char1: str1[i - 1],
        char2: str2[j - 1],
        description: `Match '${str1[i - 1]}' at position ${i - 1}`
      });
    } else {
      let minCost = Infinity;
      let bestOp: Operation | null = null;
      
      // Check all three operations
      if (i > 0 && dp[i - 1][j] + 1 === dp[i][j]) {
        const op: Operation = {
          step: step,
          type: 'delete',
          position: [i - 1, j],
          char1: str1[i - 1],
          description: `Delete '${str1[i - 1]}' at position ${i - 1}`
        };
        if (dp[i - 1][j] < minCost) {
          minCost = dp[i - 1][j];
          bestOp = op;
        }
      }
      
      if (j > 0 && dp[i][j - 1] + 1 === dp[i][j]) {
        const op: Operation = {
          step: step,
          type: 'insert',
          position: [i, j - 1],
          char2: str2[j - 1],
          description: `Insert '${str2[j - 1]}' at position ${i}`
        };
        if (dp[i][j - 1] < minCost) {
          minCost = dp[i][j - 1];
          bestOp = op;
        }
      }
      
      if (i > 0 && j > 0 && dp[i - 1][j - 1] + 1 === dp[i][j]) {
        const op: Operation = {
          step: step,
          type: 'substitute',
          position: [i - 1, j - 1],
          char1: str1[i - 1],
          char2: str2[j - 1],
          description: `Substitute '${str1[i - 1]}' with '${str2[j - 1]}' at position ${i - 1}`
        };
        if (dp[i - 1][j - 1] <= minCost) {
          bestOp = op;
        }
      }
      
      if (bestOp) {
        if (bestOp.type === 'delete') {
          ops.push(...backtrackOperations(i - 1, j, step + 1));
        } else if (bestOp.type === 'insert') {
          ops.push(...backtrackOperations(i, j - 1, step + 1));
        } else {
          ops.push(...backtrackOperations(i - 1, j - 1, step + 1));
        }
        ops.push(bestOp);
      }
    }
    
    return ops;
  };
  
  const operationsList = backtrackOperations(m, n, 1).reverse();
  const endTime = performance.now();
  
  return {
    distance: dp[m][n],
    matrix: dp,
    operations: operationsList,
    timeComplexity: `O(${m} × ${n}) = O(${m * n})`,
    spaceComplexity: `O(${m} × ${n}) = O(${m * n})`,
    executionTime: endTime - startTime
  };
}

export function validateInputs(str1: string, str2: string): string | null {
  if (str1.length === 0 && str2.length === 0) {
    return 'Please enter at least one non-empty string';
  }
  
  if (str1.length > 100 || str2.length > 100) {
    return 'Strings must be 100 characters or less for visualization';
  }
  
  return null;
}