# PicLoom Client

PicLoom is a modern social media platform for sharing and discovering visual content, inspired by Pinterest. This repository contains the frontend application built with React and modern web technologies.

## Features

### User Experience
- Responsive and intuitive user interface
- Infinite scroll for seamless content browsing
- Dynamic image grid layout
- Real-time notifications
- Dark/Light theme support

### Authentication & User Management
- Secure user registration and login
- Social media authentication
- Profile customization
- Follow/unfollow system
- User preferences management

### Content Interaction
- Pin creation and management
- Board organization
- Save pins to collections
- Like and comment system
- Content sharing capabilities
- Tag-based content discovery

## Tech Stack

- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **API Integration**: Axios

## Project Structure

```
src/
├── assets/           # Static assets like images, fonts, etc.
├── components/       # Reusable UI components
│   ├── common/       # Shared components used across pages
│   ├── forms/        # Form-related components
│   └── ui/          # UI primitives and basic components
├── hooks/            # Custom React hooks
├── layouts/          # Page layouts and layout components
├── lib/              # Utility functions and helpers
├── pages/            # Application pages/routes
│   ├── admin/        # Admin dashboard and related pages
│   ├── auth/         # Authentication related pages
│   └── user/         # User profile and related pages
├── services/         # API services and data fetching
│   ├── api/          # API client and endpoints
│   └── config/       # API configuration
└── stores/           # Zustand store definitions
    ├── auth/         # Authentication state management
    └── user/         # User-related state management
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd picloom/client
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the client directory and configure environment variables
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Development

### Code Style

- Follow the ESLint configuration
- Use Prettier for code formatting
- Follow component naming conventions
- Implement proper TypeScript types

### State Management

- Use Zustand for global state management
- Implement proper state persistence where needed
- Follow the store organization pattern

### Component Guidelines

- Create reusable components in the components directory
- Follow the component folder structure
- Implement proper prop types and documentation
- Use shadcn/ui components where applicable

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React documentation
- Vite documentation
- Tailwind CSS documentation
- shadcn/ui components
- Zustand documentation