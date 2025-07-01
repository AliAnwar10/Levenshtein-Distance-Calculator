from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time

app = FastAPI(
    title="Edit Distance Calculator API",
    description="Calculate minimum edit distance between strings using dynamic programming",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EditDistanceRequest(BaseModel):
    str1: str
    str2: str

class Operation(BaseModel):
    step: int
    type: str  # 'insert', 'delete', 'substitute', 'match'
    position: List[int]
    char1: Optional[str] = None
    char2: Optional[str] = None
    description: str

class EditDistanceResponse(BaseModel):
    distance: int
    matrix: List[List[int]]
    operations: List[Operation]
    time_complexity: str
    space_complexity: str
    execution_time: float

def calculate_edit_distance(str1: str, str2: str) -> EditDistanceResponse:
    """
    Calculate the minimum edit distance between two strings using dynamic programming.
    
    Args:
        str1: First string
        str2: Second string
        
    Returns:
        EditDistanceResponse containing the distance, matrix, and operations
    """
    start_time = time.time()
    
    m, n = len(str1), len(str2)
    
    # Create DP matrix
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Initialize first row and column
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    # Fill the DP matrix
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # deletion
                    dp[i][j - 1],      # insertion
                    dp[i - 1][j - 1]   # substitution
                )
    
    # Backtrack to find operations
    operations = []
    i, j = m, n
    step = 1
    
    while i > 0 or j > 0:
        if i > 0 and j > 0 and str1[i - 1] == str2[j - 1]:
            operations.append(Operation(
                step=step,
                type="match",
                position=[i - 1, j - 1],
                char1=str1[i - 1],
                char2=str2[j - 1],
                description=f"Match '{str1[i - 1]}' at position {i - 1}"
            ))
            i -= 1
            j -= 1
        elif i > 0 and j > 0 and dp[i][j] == dp[i - 1][j - 1] + 1:
            operations.append(Operation(
                step=step,
                type="substitute",
                position=[i - 1, j - 1],
                char1=str1[i - 1],
                char2=str2[j - 1],
                description=f"Substitute '{str1[i - 1]}' with '{str2[j - 1]}' at position {i - 1}"
            ))
            i -= 1
            j -= 1
        elif i > 0 and dp[i][j] == dp[i - 1][j] + 1:
            operations.append(Operation(
                step=step,
                type="delete",
                position=[i - 1, j],
                char1=str1[i - 1],
                description=f"Delete '{str1[i - 1]}' at position {i - 1}"
            ))
            i -= 1
        elif j > 0 and dp[i][j] == dp[i][j - 1] + 1:
            operations.append(Operation(
                step=step,
                type="insert",
                position=[i, j - 1],
                char2=str2[j - 1],
                description=f"Insert '{str2[j - 1]}' at position {i}"
            ))
            j -= 1
        
        step += 1
    
    operations.reverse()
    
    end_time = time.time()
    execution_time = (end_time - start_time) * 1000  # Convert to milliseconds
    
    return EditDistanceResponse(
        distance=dp[m][n],
        matrix=dp,
        operations=operations,
        time_complexity=f"O({m} × {n}) = O({m * n})",
        space_complexity=f"O({m} × {n}) = O({m * n})",
        execution_time=execution_time
    )

@app.get("/")
async def root():
    return {
        "message": "Edit Distance Calculator API",
        "version": "1.0.0",
        "endpoints": {
            "calculate": "/calculate_edit_distance",
            "health": "/health"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": time.time()}

@app.post("/calculate_edit_distance", response_model=EditDistanceResponse)
async def calculate_edit_distance_endpoint(request: EditDistanceRequest):
    """
    Calculate the minimum edit distance between two strings.
    
    Args:
        request: EditDistanceRequest containing the two strings
        
    Returns:
        EditDistanceResponse with the calculation results
    """
    try:
        # Validate input
        if len(request.str1) > 100 or len(request.str2) > 100:
            raise HTTPException(
                status_code=400,
                detail="Strings must be 100 characters or less"
            )
        
        result = calculate_edit_distance(request.str1, request.str2)
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error calculating edit distance: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)