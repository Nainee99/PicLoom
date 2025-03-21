# PicLoom Server

PicLoom is a MERN stack application inspired by Pinterest, allowing users to discover, save, and share visual inspiration. This repository contains the backend server implementation.

## Features

### Authentication & Authorization
- User registration and login system
- JWT-based authentication with refresh tokens
- Email verification
- Password reset functionality
- Role-based access control

### User Management
- Profile management
- Follow/unfollow system
- User role updates
- Profile customization

### Content Management
- Pin creation and management
- Board organization
- Comments and likes system
- Save pins to boards
- Tag management

### Security Features
- Rate limiting
- Input sanitization
- XSS protection
- MongoDB query sanitization
- Secure file upload handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: express-fileupload
- **Image Processing**: Sharp
- **Security**: 
  - bcryptjs (password hashing)
  - express-mongo-sanitize
  - xss
  - express-rate-limit

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd server
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory and add the following variables:
```env
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
server/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middlewares/     # Custom middleware functions
├── models/          # Mongoose models
├── routes/          # API routes
├── utils/           # Utility functions
├── app.js          # Express app setup
└── server.js       # Server entry point
```

## API Documentation

### Authentication Endpoints

```
POST /api/auth/register     # Register new user
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
POST /api/auth/refresh      # Refresh access token
POST /api/auth/verify-email # Verify email address
POST /api/auth/reset-password # Reset password
```

### User Endpoints

```
GET    /api/users/profile      # Get user profile
PUT    /api/users/profile      # Update user profile
POST   /api/users/follow       # Follow a user
DELETE /api/users/follow       # Unfollow a user
GET    /api/users/followers    # Get user followers
GET    /api/users/following    # Get users being followed
```

## Error Handling

The API uses standard HTTP response codes:
- 2xx for successful requests
- 4xx for client errors
- 5xx for server errors

Error responses follow this format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Express.js documentation
- MongoDB documentation
- Mongoose documentation
- JWT.io