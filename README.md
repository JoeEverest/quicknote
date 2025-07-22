# QuickNote

## The Problem

Linkedin notes only allow a maximum of 200 characters for initial connection requests. But some pitches take more than 200 characters

### The Real Problem

I don't want to pay for Linkedin Premium, and I needed an excuse to learn how to use hono

### The Solution

QuickNote, a simple way to send markdown notes to anyone.

Think pastebin, but customizable short slugs that lead to a landing page with your note.

### The Product

**Auth**

- [x] Basic email, password auth with a JWT stored locally.
- [ ] A way to recover lost accounts
- [ ] update passwords
- [ ] password reset

**Notes**

- [x] A markdown editor, then we store the text in a mongoDB collection with it's slug and metadata (timestamps, userID)

### Note

Most of the UI is vibe coded

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [MongoDB](https://www.mongodb.com/) - Database (local installation or MongoDB Atlas)
- [Git](https://git-scm.com/) - Version control

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/JoeEverest/quicknote.git
   cd quicknote
   ```

### Backend Setup

1. **Navigate to the backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Environment Configuration**

   Create a `.env` file in the backend directory with the following variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/quicknote
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3000
   ```

   **Note:** Replace the values with your actual configuration:
   - `MONGO_URI`: Your MongoDB connection string (local or Atlas)
   - `JWT_SECRET`: A secure random string for JWT token signing
   - `PORT`: Port number for the backend server (default: 3000)

4. **Start the development server**

   ```bash
   bun run dev
   ```

   The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. **Open a new terminal and navigate to the frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

   The frontend application will be available at `http://localhost:5173`

### Database Setup

#### Option 1: Local MongoDB

1. Install MongoDB locally following the [official installation guide](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB service
3. The application will automatically create the necessary collections

#### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and update the `MONGO_URI` in your `.env` file

### Verification

To verify everything is working correctly:

1. Visit `http://localhost:5173` in your browser
2. Register a new account
3. Create your first note
4. Share the note using the generated slug

### Building for Production

#### Backend

```bash
cd backend
bun run build  # If build script exists, otherwise the app runs directly
```

#### Frontend

```bash
cd frontend
bun run build
```

The built files will be in the `frontend/dist` directory, ready for deployment.

## Tech Stack

### Backend

- **Hono** - Fast, lightweight web framework
- **Bun** - JavaScript runtime and package manager
- **MongoDB** - NoSQL database with Mongoose ODM
- **Zod** - TypeScript-first schema validation
- **JWT** - JSON Web Tokens for authentication
- **TypeScript** - Type safety and better developer experience

### Frontend

- **React 19** - UI library with TypeScript
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Component library built on Radix UI
- **Motion** (Framer Motion) - Animations
- **React Markdown** - Markdown rendering with GitHub Flavored Markdown
- **Vite** - Build tool and development server

## Development

### Project Structure

```
quicknote/
├── backend/          # Hono API server
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── utils/    # Helper functions
│   │   └── index.ts  # Server entry point
│   └── package.json
└── frontend/         # React frontend
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── pages/      # Page components
    │   ├── services/   # API services
    │   └── lib/        # Utilities
    └── package.json
```

### API Endpoints

- `POST /app/auth/register` - User registration
- `POST /app/auth/login` - User login
- `GET /app/notes` - Get user's notes
- `POST /app/notes` - Create new note
- `PUT /app/notes/:id` - Update note
- `DELETE /app/notes/:id` - Delete note
- `GET /app/note/:slug` - Get public note by slug

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
