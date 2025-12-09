# AEC Tools

A simple web application with React + Vite frontend and Express backend.

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Vercel Serverless Functions, Node.js, MongoDB
- **Package Manager**: Yarn
- **Deployment**: Vercel (Free)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Yarn
- MongoDB Atlas account

### Installation

```bash
yarn install
```

### Configuration

1. Edit `backend/.env` with your MongoDB Atlas credentials:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/aec_tools?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

### Development

Run both frontend and backend in development mode:

```bash
yarn dev
```

Or run them separately:

```bash
# Frontend only (http://localhost:5173)
yarn dev:frontend

# Backend only (http://localhost:3000)
yarn dev:backend
```

### Build

```bash
yarn build
```

### Production

```bash
yarn start
```

## Project Structure

```
aec_tools/
├── frontend/          # React + Vite frontend
├── backend/           # Express backend (for local dev)
├── api/               # Vercel serverless functions
└── vercel.json        # Vercel deployment config
```

## Deployment

This app is deployed on Vercel (completely free):

1. Push to GitHub
2. Import project to Vercel
3. Add `MONGODB_URI` environment variable
4. Deploy!

## API Endpoints

- `GET /api/hello` - Test endpoint
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
