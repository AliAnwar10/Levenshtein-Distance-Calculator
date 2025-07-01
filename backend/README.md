# Levenshtein Distance Calculator API

A FastAPI backend for calculating Levenshtein distance between strings using dynamic programming.

## Features

- **Levenshtein Distance**: Calculate minimum edit distance using dynamic programming
- **Operation Tracking**: Track all insert, delete, substitute, and match operations
- **Performance Metrics**: Measure execution time and complexity analysis
- **CORS Support**: Ready for frontend integration
- **Input Validation**: Robust input validation and error handling

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

Start the development server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- **Interactive API docs**: `http://localhost:8000/docs`
- **ReDoc documentation**: `http://localhost:8000/redoc`

## API Endpoints

### POST /calculate_edit_distance

Calculate Levenshtein distance between two strings.

**Request Body:**
```json
{
  "str1": "kitten",
  "str2": "sitting"
}
```

**Response:**
```json
{
  "distance": 3,
  "matrix": [[0, 1, 2, 3, 4, 5, 6, 7], ...],
  "operations": [
    {
      "step": 1,
      "type": "substitute",
      "position": [0, 0],
      "char1": "k",
      "char2": "s",
      "description": "Substitute 'k' with 's' at position 0"
    }
  ],
  "time_complexity": "O(7 × 8) = O(56)",
  "space_complexity": "O(7 × 8) = O(56)",
  "execution_time": 0.123
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": 1699123456.789
}
```

## Algorithm Details

The implementation uses the Wagner-Fischer algorithm (a form of dynamic programming) to compute the Levenshtein distance:

1. **Initialization**: Create a matrix where dp[i][j] represents the minimum edit distance between the first i characters of string1 and the first j characters of string2.

2. **Recurrence Relation**:
   - If characters match: `dp[i][j] = dp[i-1][j-1]`
   - If characters don't match: `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`

3. **Backtracking**: Trace back through the matrix to find the actual sequence of operations.

## Performance

- **Time Complexity**: O(m × n) where m and n are the lengths of the input strings
- **Space Complexity**: O(m × n) for the DP matrix
- **Optimizations**: Can be optimized to O(min(m, n)) space complexity for large strings

## Error Handling

The API includes comprehensive error handling:
- Input validation (string length limits)
- HTTP exception handling with appropriate status codes
- Detailed error messages for debugging

## Extensions

The codebase is designed to be easily extensible:

- **Algorithm Variants**: Add Damerau-Levenshtein, Hamming distance, etc.
- **Trie Integration**: Add dictionary-based word suggestions
- **Caching**: Add Redis for caching frequent calculations
- **Authentication**: Add JWT-based authentication
- **Rate Limiting**: Add request rate limiting