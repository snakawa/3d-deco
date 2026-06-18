# 3D Deco - Client Registration System

A modern client registration system with Google OAuth 2.0 authentication and phone number storage in MongoDB.

## Features

✅ Google OAuth 2.0 authentication
✅ Client profile management
✅ Phone number registration and storage
✅ MongoDB database integration
✅ RESTful API endpoints
✅ Session management
✅ Responsive UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Google OAuth credentials

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback`
   - Your production URL

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

```env
MONGODB_URI=mongodb://localhost:27017/3d-deco
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
SESSION_SECRET=your_session_secret_here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4. Start MongoDB

```bash
mongod
```

### 5. Run the Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/me` - Get current authenticated user
- `POST /auth/logout` - Logout current user

### Clients

- `GET /api/clients/profile` - Get client profile (requires auth)
- `PUT /api/clients/profile` - Update client profile with phone number (requires auth)
- `GET /api/clients` - Get all clients (requires auth)

## Database Schema

### Client Model

```javascript
{
  googleId: String (unique, sparse),
  email: String (required, unique),
  name: String (required),
  phoneNumber: String (with validation),
  profilePicture: String,
  registeredAt: Date,
  updatedAt: Date,
  timestamps: true
}
```

## File Structure

```
3d-deco/
├── config/
│   └── passport.js          # Passport configuration
├── models/
│   └── Client.js            # MongoDB Client schema
├── routes/
│   ├── auth.js              # Authentication routes
│   └── clients.js           # Client routes
├── public/
│   ├── index.html           # Frontend UI
│   └── styles.css           # Styling
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Usage

1. Visit `http://localhost:5000/public/index.html` in your browser
2. Click "Sign in with Google"
3. After authentication, you'll be redirected to the dashboard
4. Enter your phone number and click "Save Phone Number"
5. Your information will be stored in the database

## Security Considerations

- ✅ Use HTTPS in production
- ✅ Keep environment variables secure
- ✅ Validate all user inputs
- ✅ Use secure session cookies (httpOnly, sameSite)
- ✅ Implement rate limiting for production
- ✅ Add CSRF protection
- ✅ Regular security audits

## Troubleshooting

### MongoDB Connection Error

Ensure MongoDB is running and the connection string is correct in `.env`.

### Google OAuth Error

Verify your Google credentials and callback URL match the configuration.

### CORS Issues

Check that `FRONTEND_URL` in `.env` matches your frontend URL.

## Future Enhancements

- [ ] Email verification
- [ ] SMS verification
- [ ] Profile photo upload
- [ ] Admin dashboard
- [ ] User roles and permissions
- [ ] Two-factor authentication
- [ ] Password recovery
- [ ] Activity logging

## License

ISC

## Support

For issues or questions, please open an issue in the repository.
