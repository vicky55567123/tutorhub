<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Online Tutoring Platform - Copilot Instructions

This is a Next.js 15 project for an online tutoring platform built with TypeScript and Tailwind CSS.

## Project Structure
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Tailwind utility classes
- **Authentication**: To be implemented (consider NextAuth.js)
- **Database**: To be determined (Prisma + PostgreSQL recommended)
- **Video Calling**: To be implemented (consider WebRTC or Agora)
- **Payments**: To be implemented (Stripe integration)

## Key Features to Implement
1. User authentication (students, tutors, admin)
2. Course management system
3. Live video calling for tutoring sessions
4. Payment processing
5. Booking and scheduling system
6. User profiles and ratings
7. Admin dashboard
8. Progress tracking and analytics

## Coding Standards
- Use TypeScript for all components and utilities
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling with custom utility classes
- Implement responsive design (mobile-first approach)
- Use Server Components where possible, Client Components when needed
- Follow React best practices and hooks patterns
- Implement proper error handling and loading states

## API Design
- Use Next.js API routes for backend functionality
- Implement RESTful endpoints
- Add proper authentication middleware
- Use TypeScript for API route handlers
- Implement proper error responses and status codes

## Database Schema Considerations
- Users (students, tutors, admins) with roles
- Courses and subjects
- Tutoring sessions and bookings
- Payments and transactions
- Reviews and ratings
- Messages and notifications
