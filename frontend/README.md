# QuickNote Frontend

A beautiful and modern frontend for QuickNote - a simple way to send markdown notes to anyone.

## Features

- 🔐 **Authentication**: Email/password registration and login
- ✍️ **Markdown Editor**: Write notes with live preview
- 🔗 **Custom Slugs**: Share notes with memorable URLs
- 📱 **Responsive Design**: Works beautifully on all devices
- 🎨 **Luxurious Design**: Elegant typography with Playfair Display and Inter fonts
- 🌟 **Modern UI**: Built with Tailwind CSS and Shadcn/UI components

## Tech Stack

- **React 19** with TypeScript
- **React Router** for navigation
- **TanStack Query** for data fetching and caching
- **Axios** for API communication
- **Motion** (Framer Motion) for animations
- **Tailwind CSS** for styling
- **Shadcn/UI** for component library
- **React Markdown** with GitHub Flavored Markdown support
- **Vite** for build tooling
- **Bun** as package manager

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- QuickNote backend API running on `http://localhost:3000`

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd quicknote-fe
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
bun run build
```

## Usage

### Creating an Account

1. Click "Get Started" on the homepage
2. Fill in your name, email, and password
3. Click "Create Account"

### Creating Notes

1. Sign in to your account
2. Click "New Note" in the navigation
3. Enter a title and write your markdown content
4. Use the "Preview" tab to see how your note will look
5. Click "Save Note" to create it

### Sharing Notes

Each note gets a unique slug that can be shared publicly. The public view displays your note beautifully formatted without requiring authentication.

### Managing Notes

- View all your notes in the "My Notes" section
- Edit notes by clicking the edit icon
- Delete notes with the trash icon (with confirmation)
- Copy public URLs to share your notes

## API Integration

The frontend connects to the QuickNote backend API with the following endpoints:

- `POST /app/auth/register` - User registration
- `POST /app/auth/login` - User login
- `GET /app/notes` - Get user's notes
- `POST /app/notes` - Create a new note
- `GET /app/note/:slug` - Get note by slug (public)
- `PUT /app/notes/:id` - Update a note
- `DELETE /app/notes/:id` - Delete a note

## Design System

### Colors

- Background: `#fefae0` (warm cream)
- Text: Black (`#000000`)
- Buttons: Black with white text
- Secondary: `#f7f3e0` (lighter cream)

### Typography

- **Headings**: Playfair Display (serif, luxurious)
- **Body Text**: Inter (sans-serif, readable)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
