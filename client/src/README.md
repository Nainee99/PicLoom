# Source Directory Structure

This directory contains the main source code for the PicLoom client application.

## Directory Structure

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

## Directory Purposes

- **assets**: Contains static files like images, icons, and other media
- **components**: Reusable UI components organized by type and function
- **hooks**: Custom React hooks for shared logic and state management
- **layouts**: Page layout components and templates
- **lib**: Utility functions, constants, and helper methods
- **pages**: Main application routes and page components
- **services**: API integration and data fetching logic
- **stores**: Zustand stores for global state management