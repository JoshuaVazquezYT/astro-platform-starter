# 🎬 TTS AI Video Generator

A comprehensive AI video generator application featuring 100 voices and 100 video styles, with separate SFW and NSFW modes. This application provides text-to-speech synthesis using ElevenLabs API and a React frontend for video generation.

## ✨ Features

- **🎤 Text-to-Speech**: Powered by ElevenLabs API with 100 voice options
- **🎬 Video Generation**: 100 video styles (50 SFW + 50 NSFW)
- **🔒 Content Safety**: SFW/NSFW mode toggle with age verification
- **⚡ Real-time Status**: Live progress tracking for video generation
- **🎵 Audio Preview**: Built-in audio player for TTS preview
- **📱 Responsive Design**: Modern UI that works on all devices

## 🏗️ Project Structure

```
tts-ai-video-generator/
├── backend/                # FastAPI backend
│   └── server.py          # Main API server
├── frontend/              # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Styles
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── requirements.txt       # Backend dependencies
├── .env                   # Environment variables
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Install Python dependencies**:
```bash
cd backend
pip install -r ../requirements.txt
```

2. **Set up environment variables**:
```bash
cp ../.env.example ../.env
# Edit .env and add your ElevenLabs API key
```

3. **Run the backend**:
```bash
python server.py
# or
uvicorn server:app --reload
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Start development server**:
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 🎯 API Endpoints

### Voice Management
- `GET /voices` - Get all voices
- `GET /voices?category=sfw` - Get SFW voices only
- `GET /voices?category=nsfw` - Get NSFW voices only

### Style Management  
- `GET /styles` - Get all styles
- `GET /styles?category=sfw` - Get SFW styles only
- `GET /styles?category=nsfw` - Get NSFW styles only

### Generation
- `POST /generate-tts` - Generate text-to-speech audio
- `POST /generate-video` - Generate AI video with TTS
- `GET /status/{job_id}` - Get generation status

### File Upload
- `POST /upload-file` - Upload files for processing

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ELEVENLABS_API_KEY` | Your ElevenLabs API key | Required |
| `DEBUG` | Enable debug mode | `True` |
| `ENABLE_NSFW` | Enable NSFW content | `True` |
| `MAX_TEXT_LENGTH` | Maximum text length | `1000` |
| `RATE_LIMIT_PER_MINUTE` | API rate limit | `10` |

### Voice Categories

**SFW Voices (50)**: Professional, educational, creative voices
- Business presenters, news anchors
- Teachers, tutors, documentary narrators  
- Storytellers, poets, creative content
- Tech enthusiasts, tutorial guides
- Motivational speakers, coaches

**NSFW Voices (50)**: Adult-oriented voices
- Seductive, sultry, mysterious
- Commanding, dominant, authoritative
- Playful, teasing, flirtatious
- Passionate, intense, emotional
- Exotic, unique, captivating

### Video Styles

**SFW Styles (50)**: Family-friendly content
- Animation (Anime, Disney, Pixar)
- Realistic (Portrait, Documentary)
- Artistic (Watercolor, Oil painting)
- Sci-Fi (Cyberpunk, Space, Futuristic)
- Educational (Corporate, Academic)

**NSFW Styles (50)**: Adult content
- Intimate (Boudoir, Romantic, Sensual)
- Artistic (Artistic nude, Renaissance)
- Fantasy (Adult fantasy, Mythological)
- Luxury (High-end, Sophisticated)
- Performance (Burlesque, Dance)

## 🔒 Safety Features

### Age Verification
- NSFW content requires age verification
- Modal popup for age confirmation
- Clear warnings for adult content

### Content Separation
- Strict SFW/NSFW mode separation
- Cannot mix SFW and NSFW content
- Clear visual indicators for content type

## 🎨 Frontend Features

### User Interface
- Modern gradient design
- Responsive layout
- Smooth animations
- Loading states
- Progress bars

### Voice Selection
- Dropdown with detailed voice info
- Filter by gender, age, accent
- Preview voice characteristics
- Category-based filtering

### Video Generation
- Real-time status updates
- Progress tracking
- Job ID tracking
- Estimated time remaining

## 🔄 Development

### Backend Development
```bash
# Install in development mode
pip install -e .

# Run with hot reload
uvicorn server:app --reload --host 0.0.0.0 --port 8000

# Run tests
pytest tests/
```

### Frontend Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📦 Production Deployment

### Docker Deployment

**Backend Dockerfile**:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
EXPOSE 8000
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Frontend Dockerfile**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
```

### Environment Setup
```bash
# Production environment
ELEVENLABS_API_KEY=your_production_api_key
DEBUG=False
CORS_ORIGINS=https://yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ElevenLabs](https://elevenlabs.io/) for TTS API
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**⚠️ Note**: This is a demonstration interface. The video generation is currently mocked. In production, you would need to integrate with actual AI video generation services.
