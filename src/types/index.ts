export interface EditDistanceResult {
  distance: number;
  matrix: number[][];
  operations: Operation[];
  timeComplexity: string;
  spaceComplexity: string;
  executionTime: number;
}

export interface Operation {
  step: number;
  type: 'insert' | 'delete' | 'substitute' | 'match';
  position: [number, number];
  char1?: string;
  char2?: string;
  description: string;
}

export interface MatrixCell {
  value: number;
  row: number;
  col: number;
  isActive: boolean;
  operation?: Operation;
}

export interface CalculationState {
  isCalculating: boolean;
  result: EditDistanceResult | null;
  error: string | null;
  currentStep: number;
  isAnimating: boolean;
}