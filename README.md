# TravelTrucks 🚐

A modern web application for camper rental, built with Next.js 16, TypeScript, and Zustand.

## Live Demo & Backend

- **Live Demo (Vercel):** https://travel-trucks.vercel.app  
- **Backend (MockAPI):** https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers

## Features

- **Home Page** – Hero section with call-to-action  
- **Catalog Page** – Camper catalog with backend filtering  
- **Camper Details** – Features, reviews, and booking form  
- **Backend Filtering** – All filtering and pagination handled by the API  
- **Favorites** – Save campers to favorites (persisted in localStorage)  
- **Responsive** – Optimized for desktop viewing  

## Tech Stack

- **Framework:** Next.js 16 (App Router)  
- **Language:** TypeScript  
- **State Management:** Zustand  
- **API:** Next.js Route Handlers  
- **Styling:** CSS Modules  
- **Notifications:** React Hot Toast  

## Architecture

### Route Handlers as API Proxy

The app uses **Next.js Route Handlers** as a proxy layer to MockAPI:

# Architecture

### Route Handlers

The app uses Next.js Route Handlers as an API layer:

```
Client Component → /api/campers → MockAPI
Server Component → /api/campers → MockAPI
```

Benefits:
- **Security**: MockAPI URL hidden from client
- **Caching**: Built-in Next.js caching
- **Flexibility**: Easy to add middleware, validation, error handling
- **Consistency**: Single source of truth for API calls

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/travel-trucks.git

# Navigate to project directory
cd travel-trucks

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Author

- 💼 LinkedIn: [Vladyslav Bilonoh](https://www.linkedin.com/in/vladyslavbilonoh/)