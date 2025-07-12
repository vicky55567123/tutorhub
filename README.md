# TutorHub - Online Tutoring Platform

<!-- Updated: Latest localhost fixes and development server optimization completed -->

A modern, responsive online tutoring platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern UI/UX**: Beautiful, responsive design optimized for all devices
- **Course Browsing**: Explore courses across multiple subjects with filtering and search
- **Tutor Discovery**: Find qualified tutors with detailed profiles and ratings
- **User Authentication**: Secure login/registration system (to be implemented)
- **Live Video Sessions**: Video calling capabilities for tutoring sessions (to be implemented)
- **Payment Processing**: Secure payment handling (to be implemented)
- **Progress Tracking**: Monitor learning progress and analytics (to be implemented)
- **Admin Dashboard**: Platform management tools (to be implemented)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd online-tutoring-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Headless UI
- **Icons**: Heroicons & Lucide React

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── courses/        # Course listing and detail pages
│   ├── tutors/         # Tutor listing and profile pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/         # Reusable React components
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
└── lib/               # Utility functions and configurations
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔮 Future Enhancements

### Phase 1: Core Features
- [ ] User authentication (NextAuth.js)
- [ ] Database integration (Prisma + PostgreSQL)
- [ ] User profiles and dashboard
- [ ] Basic messaging system

### Phase 2: Advanced Features
- [ ] Video calling integration (WebRTC/Agora)
- [ ] Payment processing (Stripe)
- [ ] Booking and scheduling system
- [ ] File sharing and whiteboard

### Phase 3: Premium Features
- [ ] Progress tracking and analytics
- [ ] AI-powered tutor matching
- [ ] Mobile app (React Native)
- [ ] Advanced admin tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (to be expanded)
- **Database**: PostgreSQL with Prisma (to be implemented)
- **Authentication**: NextAuth.js (to be implemented)
- **Payments**: Stripe (to be implemented)
- **Video**: WebRTC/Agora (to be implemented)

## 📞 Support

For support, email support@tutorhub.com or join our Slack channel.

---

**Happy Learning! 🎓**
