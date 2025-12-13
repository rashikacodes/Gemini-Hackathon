# Gemini-Hackathon
This repository contains our project built for a Gemini-based hackathon, showcasing innovative problem-solving and the practical use of modern AI technologies. The project demonstrates strong implementation skills, creativity, and collaboration. 

# WasteX AI: AI-Powered Waste Management System 🌱

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Real-time AI-powered waste detection system that helps cities identify and clean overflowing bins before they become a problem.**

## 🚀 Features

### 🏠 **Landing Page**
- Modern, responsive design with gradient animations
- Key statistics display (92% AI accuracy, 50% faster cleanup, 30+ hotspots daily)
- Feature highlights with interactive cards
- Step-by-step workflow explanation
- Technology stack showcase
- Call-to-action sections for user engagement

### 📤 **Upload & Analysis**
- Drag-and-drop image upload functionality
- Real-time location detection using browser geolocation
- Integration with Gemini Vision AI for waste level analysis
- Cloudinary image hosting integration
- Progress indicators and status updates
- Support for multiple image formats (JPG, PNG, JPEG)

### 📊 **Dashboard**
- Interactive map visualization using Leaflet
- Real-time waste bin reports with location tracking
- Filterable reports by waste level (Low, Medium, High, Critical)
- Statistical overview with visual indicators
- Auto-refresh functionality
- Responsive sidebar with detailed statistics

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Leaflet** for interactive maps

### Backend
- **Gemini 2.5 Flash Vision AI** for image analysis
- **MongoDB Atlas** for data storage
- **Cloudinary** for image hosting

### Key Features
- Client-side image processing
- Real-time geolocation tracking
- Responsive design for all devices
- Modern UI/UX with smooth animations
- Type-safe development with TypeScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/apurbahalderr/WasteX-AI.git
   cd WasteX-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
WasteX-AI/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx           # Landing page
│   │   ├── upload/
│   │   │   └── page.tsx       # Upload page
│   │   └── dashboard/
│   │       └── page.tsx       # Dashboard page
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts       # AI analysis endpoint
│   │   └── map/
│   │       └── route.ts       # Map data endpoint
│   └── layout.tsx
├── components/
│   └── map.tsx               # Interactive map component
├── contexts/
│   └── userContext.tsx       # User authentication context
├── utils/
│   └── uploadOnCloudinary.ts # Cloudinary upload utility
├── public/
└── package.json
```

## 🔧 Configuration

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your Cloud Name and Upload Preset
3. Add them to your environment variables

### MongoDB Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Add it to your environment variables

### Gemini AI Setup
1. Get a Gemini API key from Google AI Studio
2. Add it to your environment variables

## 🎯 Usage

### 1. **Home Page**
- View key statistics about waste management
- Learn about system features
- Navigate to upload or dashboard sections

### 2. **Report Waste Bin**
1. Navigate to `/upload`
2. Drag-and-drop or select an image of a waste bin
3. Click "Add Current Location" to tag the location
4. Click "Upload & Analyze" to process the image
5. View AI analysis results

### 3. **Monitor Dashboard**
1. Navigate to `/dashboard`
2. View all reported waste bins on an interactive map
3. Filter by waste level using the sidebar
4. Monitor real-time statistics
5. Refresh data as needed

## 📊 AI Analysis Levels

The system categorizes waste bins into four levels:

| Level | Color | Description | Action Required |
|-------|--------|-------------|-----------------|
| **Low** | 🟢 Green | Bin is less than 30% full | Routine check |
| **Medium** | 🟡 Yellow | Bin is 30-70% full | Monitor closely |
| **High** | 🟠 Orange | Bin is 70-90% full | Schedule cleanup |
| **Critical** | 🔴 Red | Bin is overflowing | Immediate cleanup needed |

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod
```

### Self-hosted
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Gemini AI** for image analysis capabilities
- **Leaflet** for interactive maps
- **Cloudinary** for image hosting
- **Tailwind CSS** for styling utilities
- **Next.js** for the amazing framework

## 📞 Support

For support, contact Team HackerEyesor create an issue in the GitHub repository.

---

**Built with ❤️ by Team HackerEyes for cleaner cities and smarter waste management**
