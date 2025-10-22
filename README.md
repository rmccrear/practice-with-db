# React + Supabase Demo

This educational project demonstrates how to integrate Supabase with a React application. The project showcases common database operations and authentication features using Supabase as a backend service.

## Project Overview

This is a step-by-step tutorial project that shows how to:
1. Set up a React project with Supabase
2. Configure environment variables for Supabase credentials
3. Create and handle forms in React
4. Perform CRUD operations with Supabase
5. Manage employee data in a database

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rmccrear/practice-with-db.git
cd practice-with-db
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
practice-with-db/
├── src/
│   ├── utils/
│   │   └── supabase.js    # Supabase client configuration
│   ├── App.jsx           # Main application component
│   ├── App.css          # Application styles
│   └── main.jsx         # Entry point
├── public/              # Static assets
└── vite.config.js      # Vite configuration
```

## Features

The project is organized into different branches that showcase various features:

- `main` - Basic Supabase setup and configuration
  - [View main branch App.jsx](https://github.com/rmccrear/practice-with-db/blob/main/src/App.jsx)
- `add-form` - Implementation of forms for data input
  - [View add-form branch App.jsx](https://github.com/rmccrear/practice-with-db/blob/add-form/src/App.jsx)
- `add-employee` - Employee management functionality
  - [View add-employee branch App.jsx](https://github.com/rmccrear/practice-with-db/blob/add-employee/src/App.jsx)

Each link above takes you directly to the `App.jsx` file in that branch, where you can see the progression of the implementation.

## Learning Path

1. Start with the `main` branch to understand the basic setup
2. Move to `add-form` to learn about form handling with React and Supabase
3. Explore `add-employee` to see a complete implementation of employee management

## Technology Stack

- React (v19)
- Vite
- Supabase
- ESLint for code quality

## Development

To work on this project:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Contributing

Feel free to fork this project and create pull requests for improvements. This is an educational project, and contributions that enhance its learning value are welcome.

## License

This project is open source and available for educational purposes.
