# AI Video Generator with 100 Voices & 100 Styles

## 🎬 Overview

A comprehensive AI video generator application featuring 100 English voices and 100 video styles, with separate SFW and NSFW modes. This application provides a full-featured interface for creating AI-generated videos with text-to-speech synthesis and various visual styles.

## ✨ Features

### 🎭 Voice Options (100 Total)
- **50 SFW Voices**: Professional, educational, and family-friendly voices
- **50 NSFW Voices**: Seductive and adult-oriented voices
- **Voice Attributes**: Gender (Male/Female/Neutral), Age (Young/Adult/Mature), Accent (American/British/Australian/Canadian/Irish/Scottish/Welsh/French-English/Spanish-English)
- **Advanced Filtering**: Search by name, filter by gender, age, and accent

### 🎨 Video Styles (100 Total)
- **50 SFW Styles**: Anime, 3D, Realistic, Artistic, Educational, Corporate, etc.
- **50 NSFW Styles**: Boudoir, Seductive, Adult-themed artistic styles
- **Style Categories**: Animation, Realistic, Artistic, Sci-Fi, Fantasy, Vintage, Modern, and more
- **Genre Filtering**: Filter styles by genre for easy selection

### 🔒 Safety Features
- **Age Verification**: NSFW content requires age verification
- **Mode Separation**: Clear separation between SFW and NSFW content
- **Content Warnings**: Clear warnings for adult content
- **Privacy Protection**: NSFW content is hidden behind verification

### 🚀 Generation Features
- **Real-time Progress**: Live progress tracking with detailed status updates
- **Status Logging**: Complete generation log with timestamps
- **Video Preview**: Built-in video player for preview
- **Download Support**: Direct download of generated videos
- **Cancellation**: Ability to cancel generation mid-process

## 📁 File Structure

```
src/
├── components/
│   ├── apps/
│   │   ├── XPVideoGenerator.tsx          # Main video generator component
│   │   └── video-generator-data.ts       # Voice and style data
│   └── VideoGeneratorDemo.tsx             # Demo component
├── types.ts                               # TypeScript type definitions
└── utils.ts                               # Utility functions
```

## 🎯 Component Architecture

### Main Components

1. **XPVideoGenerator** - Main video generator interface
2. **VideoGeneratorDemo** - Demo wrapper component
3. **video-generator-data.ts** - Data store for voices and styles

### Key Interfaces

```typescript
interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  age: 'young' | 'adult' | 'mature';
  accent: string;
  description: string;
  category: 'sfw' | 'nsfw';
}

interface Style {
  id: string;
  name: string;
  description: string;
  category: 'sfw' | 'nsfw';
  genre: string;
}
```

## 📊 Voice & Style Breakdown

### SFW Voices (50)
- **Professional**: Business presenters, news anchors, corporate voices
- **Educational**: Teachers, tutors, documentary narrators
- **Creative**: Storytellers, poets, creative content voices
- **Technical**: Tech enthusiasts, tutorial guides, scientific voices
- **Motivational**: Inspirational speakers, coaches, motivational voices

### NSFW Voices (50)
- **Seductive**: Sultry, alluring, mysterious voices
- **Commanding**: Dominant, authoritative, powerful voices
- **Playful**: Teasing, flirtatious, playful voices
- **Intense**: Passionate, raw, emotional voices
- **Exotic**: Unique, enticing, captivating voices

### SFW Styles (50)
- **Animation**: Anime, Disney, Pixar, Manga styles
- **Realistic**: Photorealistic, portrait, documentary styles
- **Artistic**: Watercolor, oil painting, sketch, impressionist
- **Sci-Fi**: Cyberpunk, space, futuristic themes
- **Educational**: Corporate, academic, tutorial styles

### NSFW Styles (50)
- **Intimate**: Boudoir, romantic, sensual styles
- **Artistic**: Artistic nude, renaissance erotic art
- **Fantasy**: Adult fantasy, mythological themes
- **Luxury**: High-end, sophisticated adult content
- **Performance**: Burlesque, dance, performance art

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- React 18+
- TypeScript 4.5+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-video-generator

# Install dependencies
npm install

# Install additional dependencies for video generation
npm install @types/react @types/react-dom

# Start development server
npm run dev
```

### TypeScript Configuration

Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Tailwind CSS Setup

Ensure Tailwind CSS is configured for styling:

```bash
npm install -D tailwindcss autoprefixer postcss
npx tailwindcss init -p
```

## 🎮 Usage

### Basic Usage

```tsx
import XPVideoGenerator from './components/apps/XPVideoGenerator';

function App() {
  return (
    <XPVideoGenerator 
      onClose={() => console.log('Generator closed')} 
    />
  );
}
```

### With Demo Wrapper

```tsx
import VideoGeneratorDemo from './components/VideoGeneratorDemo';

function App() {
  return <VideoGeneratorDemo />;
}
```

### Accessing Voice and Style Data

```tsx
import { 
  voices, 
  styles, 
  getVoicesByCategory, 
  getStylesByCategory 
} from './components/apps/video-generator-data';

// Get SFW voices
const sfwVoices = getVoicesByCategory('sfw');

// Get NSFW styles
const nsfwStyles = getStylesByCategory('nsfw');
```

## 🔧 Backend Integration

### Recommended Backend Stack

#### AI Video Generation
- **Stable Video Diffusion**: For smooth anime/realistic videos
- **AnimateDiff**: For adding motion to still images
- **ModelScope**: For direct prompt-to-video generation
- **Genmo API**: Text-to-video API with SFW/NSFW support

#### Text-to-Speech
- **Bark**: Natural multi-style voices (Open Source)
- **Tortoise TTS**: Ultra-realistic voices (Open Source)
- **OpenVoice**: Cross-style voice cloning (Open Source)
- **ElevenLabs**: High-quality API-based TTS (Paid)

#### Backend Framework
```python
# requirements.txt
flask==2.3.3
torch==2.0.1
torchaudio==2.0.2
transformers==4.33.2
numpy==1.24.3
scipy==1.11.2
pydub==0.25.1
opencv-python==4.8.0.76
moviepy==1.0.3
ffmpeg-python==0.2.0
firebase-admin==6.2.0
```

### API Endpoints

```python
# Example Flask backend structure
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/generate', methods=['POST'])
def generate_video():
    data = request.json
    prompt = data.get('prompt')
    voice_id = data.get('voice_id')
    style_id = data.get('style_id')
    
    # Generate TTS
    audio_path = generate_tts(prompt, voice_id)
    
    # Generate video
    video_path = generate_video(prompt, style_id)
    
    # Combine audio and video
    final_video = combine_av(audio_path, video_path)
    
    return jsonify({'video_url': final_video})

@app.route('/api/status/<job_id>')
def get_status(job_id):
    # Return generation status
    return jsonify({'status': 'processing', 'progress': 45})
```

## 🎨 Customization

### Adding New Voices

```typescript
// Add to video-generator-data.ts
const newVoice: Voice = {
  id: 'custom-001',
  name: 'Custom Voice',
  gender: 'female',
  age: 'adult',
  accent: 'American',
  description: 'Custom voice description',
  category: 'sfw'
};

// Add to voices array
voices.push(newVoice);
```

### Adding New Styles

```typescript
// Add to video-generator-data.ts
const newStyle: Style = {
  id: 'custom-style-001',
  name: 'Custom Style',
  description: 'Custom style description',
  category: 'sfw',
  genre: 'Custom'
};

// Add to styles array
styles.push(newStyle);
```

## 🔐 Security Considerations

### NSFW Content Protection
- Age verification before accessing NSFW content
- Warning screens with clear adult content notices
- Optional password protection for NSFW mode
- Content moderation filters for public deployments

### Data Privacy
- No logging of NSFW prompts in production
- Secure storage of generated content
- Optional content auto-deletion after download
- User session management for age verification

## 🚀 Production Deployment

### Environment Variables
```bash
# .env.production
REACT_APP_API_URL=https://your-api.com
REACT_APP_ENABLE_NSFW=true
REACT_APP_AGE_VERIFICATION_REQUIRED=true
```

### Build for Production
```bash
npm run build
npm run preview
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Performance Optimization

### Voice/Style Data Optimization
- Lazy loading of voice/style data
- Virtual scrolling for large lists
- Debounced search functionality
- Cached filter results

### Generation Optimization
- Background processing for long generations
- Progress streaming via WebSockets
- Chunked video delivery
- Client-side caching of generated content

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your voices/styles to the data file
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, please open an issue on the GitHub repository or contact the development team.

## 🔄 Changelog

### Version 1.0.0
- Initial release with 100 voices and 100 styles
- SFW/NSFW mode separation
- Age verification system
- Advanced filtering capabilities
- Real-time generation progress
- Video preview and download functionality

---

**Note**: This is a demonstration interface. In production, you would need to integrate with actual AI video generation services and implement proper backend infrastructure for video processing and storage.