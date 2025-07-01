# Edit Distance Calculator

A full-stack web application for calculating and visualizing the Minimum Edit Distance (Levenshtein Distance) between two strings. This project demonstrates fundamental concepts in Natural Language Processing (NLP) and Dynamic Programming through an interactive, beautifully designed interface.

## 🌟 Features

### Frontend (React + TypeScript)
- **Interactive Input**: Two string input fields with real-time validation
- **Visual Matrix**: Animated DP matrix showing step-by-step calculation
- **Operations Trace**: Detailed list of insert, delete, substitute, and match operations
- **Performance Metrics**: Time complexity, space complexity, and execution time
- **Responsive Design**: Beautiful UI that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience

### Backend (Python + FastAPI)
- **RESTful API**: Clean API endpoints for edit distance calculations
- **Dynamic Programming**: Efficient Wagner-Fischer algorithm implementation
- **Operation Tracking**: Backtracking to find optimal transformation sequence
- **CORS Support**: Ready for frontend integration
- **Comprehensive Documentation**: Auto-generated API docs with Swagger UI

## 🚀 Quick Start

### Frontend Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Open browser**: Navigate to `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Create virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Start API server**:
```bash
uvicorn main:app --reload --port 8000
```

5. **API Documentation**: Visit `http://localhost:8000/docs`

## 🎯 Algorithm Overview

The application implements the **Wagner-Fischer algorithm** for computing Levenshtein distance:

### Dynamic Programming Approach
```
dp[i][j] = minimum edit distance between first i chars of str1 and first j chars of str2

Base cases:
- dp[i][0] = i (delete all i characters)
- dp[0][j] = j (insert all j characters)

Recurrence:
- If str1[i-1] == str2[j-1]: dp[i][j] = dp[i-1][j-1]
- Else: dp[i][j] = 1 + min(
    dp[i-1][j],    // deletion
    dp[i][j-1],    // insertion
    dp[i-1][j-1]   // substitution
  )
```

### Complexity Analysis
- **Time Complexity**: O(m × n) where m, n are string lengths
- **Space Complexity**: O(m × n) for the DP matrix
- **Optimization Potential**: Can be reduced to O(min(m, n)) space

## 🏗️ Project Structure

```
edit-distance-calculator/
├── src/
│   ├── components/
│   │   ├── InputSection.tsx          # String input interface
│   │   ├── ResultsSection.tsx        # Results display
│   │   ├── MatrixVisualization.tsx   # DP matrix visualization
│   │   └── OperationsTrace.tsx       # Operations list
│   ├── utils/
│   │   └── editDistance.ts           # Core algorithm implementation
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   └── App.tsx                       # Main application component
├── backend/
│   ├── main.py                       # FastAPI application
│   ├── requirements.txt              # Python dependencies
│   └── README.md                     # Backend documentation
└── README.md                         # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#4F46E5) - Main actions and highlights
- **Secondary**: Emerald (#10B981) - Success states and positive feedback
- **Accent**: Amber (#F59E0B) - Warnings and attention-grabbing elements
- **Status Colors**: Red (errors), Blue (information), Purple (visualization)

### Typography
- **Headings**: Inter font family with 120% line height
- **Body Text**: System font stack with 150% line height
- **Code**: Monospace font for algorithm visualization

### Layout
- **8px Grid System**: Consistent spacing throughout the interface
- **Responsive Breakpoints**: Mobile-first design with tablet and desktop optimizations
- **Card-based Layout**: Clean separation of content sections

## 🔧 API Reference

### Calculate Edit Distance
```http
POST /calculate_edit_distance
```

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
  "matrix": [[0, 1, 2, ...], ...],
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

## 🧪 Example Usage

### Classic Example: "kitten" → "sitting"
1. **k** → **s** (substitute)
2. **e** → **i** (substitute)  
3. Insert **t**
4. **n** → **n** (match)
5. **g** → **g** (match)

**Result**: 3 operations needed

### Visualization Features
- **Step-by-step matrix filling**: Watch the DP algorithm in action
- **Operation highlighting**: See each transformation step
- **Interactive controls**: Play, pause, and step through calculations

## 🚀 Future Enhancements

### Algorithm Extensions
- **Damerau-Levenshtein**: Support for transposition operations
- **Weighted Edit Distance**: Custom operation costs
- **Jaro-Winkler**: Alternative string similarity metric

### Feature Additions
- **History**: Save and compare previous calculations
- **Export**: PDF/CSV export of results
- **Themes**: Dark mode and custom color schemes
- **Performance**: Web Workers for large string processing

### Data Structure Extensions
- **Trie Integration**: Dictionary-based word suggestions
- **Graph Visualization**: Show transformation paths as graphs
- **Pattern Matching**: KMP and Aho-Corasick integration

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, consistent icons
- **Vite**: Fast development and build tooling

### Backend
- **Python 3.8+**: Modern Python with type hints
- **FastAPI**: High-performance async web framework
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server for production deployment

## 📝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Wagner-Fischer Algorithm**: The foundation of efficient edit distance calculation
- **Dynamic Programming**: Classic algorithmic technique for optimization problems
- **Natural Language Processing**: Applications in spell checking, DNA sequencing, and more
- **React Community**: For the excellent ecosystem and tools