# PicLoom

<div align="center">
  <h3>A Modern Social Media Platform for Creative Visual Expression</h3>
</div>

## Overview

PicLoom is a full-stack social media platform that enables users to share, discover, and organize visual content. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a seamless experience for users to create, curate, and engage with visual content through a modern and intuitive interface.

## Features

### User Management

- Secure user registration and authentication
- Social media authentication integration
- Profile customization and management
- Follow/unfollow system
- User preferences and settings

### Content Management

- Pin creation and organization
- Board management system
- Interactive engagement through comments and likes
- Save and organize favorite content
- Tag and categorization system

### Technical Features

- Responsive design for all devices
- Real-time notifications
- Advanced search and filtering
- Image optimization and processing
- Secure API endpoints

## Tech Stack

### Frontend

- React with Vite for fast development and building
- Tailwind CSS for modern styling
- shadcn/ui for consistent UI components
- Zustand for state management
- React Router for navigation
- React Hook Form for form handling
- Axios for API integration

### Backend

- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Multer for file uploads
- Express middleware for security

## Project Structure

The project is organized into two main directories:

- `client/` - Frontend React application
- `server/` - Backend Express.js API

For detailed structure and setup instructions, please refer to:

- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/picloom.git
cd picloom
```

2. Install dependencies for both client and server

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables

```bash
# In server directory
cp .env.sample .env
# Edit .env with your configuration
```

4. Start development servers

```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## Contributing

We welcome contributions to PicLoom! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React documentation
- MongoDB documentation
- Express.js documentation
- Vite documentation
- Tailwind CSS documentation
- shadcn/ui components
- Zustand documentation
