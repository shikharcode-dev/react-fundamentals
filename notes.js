// REACT ROUTER - COMPREHENSIVE NOTES
// ===================================

// WHAT IS REACT ROUTER?
// - A standard library for routing in React applications
// - Enables navigation between different views/components
// - Keeps UI in sync with the URL
// - Provides declarative routing for React apps

// INSTALLATION
// Step 1: Install react-router-dom package
// npm install react-router-dom
// or
// yarn add react-router-dom

// CORE CONCEPTS
// --------------

// 1. BrowserRouter
//    - Wrapper component that uses HTML5 history API
//    - Keeps UI in sync with URL
//    - Must wrap your entire app

// 2. Routes
//    - Container for all Route components
//    - Renders the first child Route that matches the location

// 3. Route
//    - Defines a path and component to render
//    - Matches URL path to component

// 4. Link
//    - Creates navigation links
//    - Prevents page reload (SPA behavior)

// 5. Navigate
//    - Programmatic navigation component
//    - Redirects to different routes

// 6. useNavigate Hook
//    - Hook for programmatic navigation
//    - Returns navigate function

// 7. useParams Hook
//    - Accesses URL parameters
//    - Returns object of key/value pairs

// 8. useLocation Hook
//    - Returns current location object
//    - Contains pathname, search, hash, state

// BASIC SETUP STEPS
// ------------------

// Step 1: Import necessary components
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Step 2: Wrap your app with BrowserRouter
// <BrowserRouter>
//   <App />
// </BrowserRouter>

// Step 3: Define Routes inside your app
// <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/about" element={<About />} />
// </Routes>

// Step 4: Create navigation using Link
// <Link to="/">Home</Link>
// <Link to="/about">About</Link>

// EXAMPLE 1: BASIC ROUTING
// -------------------------
// import React from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//
// function Home() {
//   return <h1>Home Page</h1>;
// }
//
// function About() {
//   return <h1>About Page</h1>;
// }
//
// function App() {
//   return (
//     <BrowserRouter>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// EXAMPLE 2: NESTED ROUTES
// -------------------------
// <Routes>
//   <Route path="/" element={<Layout />}>
//     <Route index element={<Home />} />
//     <Route path="about" element={<About />} />
//     <Route path="contact" element={<Contact />} />
//   </Route>
// </Routes>
//
// function Layout() {
//   return (
//     <div>
//       <nav>Navigation</nav>
//       <Outlet /> {/* Child routes render here */}
//     </div>
//   );
// }

// EXAMPLE 3: DYNAMIC ROUTES (URL PARAMETERS)
// -------------------------------------------
// <Routes>
//   <Route path="/user/:id" element={<UserProfile />} />
// </Routes>
//
// function UserProfile() {
//   const { id } = useParams();
//   return <h1>User ID: {id}</h1>;
// }
//
// Usage: Navigate to /user/123 will display "User ID: 123"

// EXAMPLE 4: PROGRAMMATIC NAVIGATION
// -----------------------------------
// import { useNavigate } from 'react-router-dom';
//
// function LoginForm() {
//   const navigate = useNavigate();
//
//   const handleSubmit = () => {
//     // After successful login
//     navigate('/dashboard');
//   };
//
//   return <button onClick={handleSubmit}>Login</button>;
// }

// EXAMPLE 5: PROTECTED ROUTES
// ----------------------------
// function ProtectedRoute({ children }) {
//   const isAuthenticated = checkAuth(); // Your auth logic
//   return isAuthenticated ? children : <Navigate to="/login" />;
// }
//
// <Routes>
//   <Route path="/dashboard" element={
//     <ProtectedRoute>
//       <Dashboard />
//     </ProtectedRoute>
//   } />
// </Routes>

// EXAMPLE 6: 404 NOT FOUND PAGE
// ------------------------------
// <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/about" element={<About />} />
//   <Route path="*" element={<NotFound />} />
// </Routes>
//
// function NotFound() {
//   return <h1>404 - Page Not Found</h1>;
// }

// EXAMPLE 7: QUERY PARAMETERS
// ----------------------------
// import { useSearchParams } from 'react-router-dom';
//
// function SearchPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get('q');
//
//   return <h1>Search results for: {query}</h1>;
// }
//
// Usage: /search?q=react will display "Search results for: react"

// ADVANCED FEATURES
// -----------------

// 1. Lazy Loading Routes
// const Home = React.lazy(() => import('./Home'));
// <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />

// 2. Route Guards/Middleware
// Check authentication, permissions before rendering

// 3. Hash Router
// Uses hash portion of URL (#)
// import { HashRouter } from 'react-router-dom';

// 4. Memory Router
// Keeps history in memory (useful for testing)
// import { MemoryRouter } from 'react-router-dom';

// COMMON PATTERNS
// ---------------

// Pattern 1: Layout with Outlet
// - Create reusable layouts
// - Child routes render in <Outlet />

// Pattern 2: Index Routes
// - Default child route
// - Renders when parent path matches exactly

// Pattern 3: Relative Links
// - Use relative paths in nested routes
// - <Link to="..">Back</Link>

// BEST PRACTICES
// --------------
// 1. Keep routes organized in separate file
// 2. Use lazy loading for large components
// 3. Implement error boundaries
// 4. Use protected route components for auth
// 5. Keep route paths consistent and RESTful
// 6. Use path parameters for dynamic content
// 7. Implement proper 404 handling
// 8. Use Navigate for redirects, not window.location

// COMMON HOOKS SUMMARY
// --------------------
// useNavigate() - Navigate programmatically
// useParams() - Access URL parameters
// useLocation() - Get current location object
// useSearchParams() - Work with query strings
// useMatch() - Check if current URL matches pattern
// useRoutes() - Define routes as JavaScript objects
