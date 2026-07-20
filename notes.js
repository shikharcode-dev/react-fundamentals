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





// DYNAMIC ROUTING IN REACT ROUTER - DETAILED EXPLANATION
// =======================================================

// WHAT IS DYNAMIC ROUTING?
// - Routes that can match multiple URL patterns using parameters
// - URL segments that act as variables (placeholders)
// - Allows creating flexible routes without hardcoding every possible path
// - Parameters are prefixed with colon (:) in the route path
// - Example: /user/:id can match /user/1, /user/2, /user/abc, etc.

// WHY USE DYNAMIC ROUTING?
// - Avoid creating separate routes for similar pages
// - Handle user-specific content (profiles, posts, products)
// - Create scalable applications
// - Reduce code duplication
// - Make URLs more meaningful and SEO-friendly

// HOW DYNAMIC ROUTING WORKS
// -------------------------
// 1. Define route with parameter: <Route path="/user/:id" element={<User />} />
// 2. React Router captures the dynamic segment from URL
// 3. Access parameter in component using useParams() hook
// 4. Use the parameter to fetch data or render content

// EXAMPLE 1: BASIC DYNAMIC ROUTE (User Profile)
// ----------------------------------------------
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// Component that uses dynamic parameter
function UserProfile() {
  // useParams() returns an object with all URL parameters
  const { id } = useParams();
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>Viewing profile for user ID: {id}</p>
    </div>
  );
}

// App with dynamic route
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/user/1">User 1</Link> | 
        <Link to="/user/2">User 2</Link> | 
        <Link to="/user/john">User John</Link>
      </nav>
      
      <Routes>
        {/* Single route handles all user IDs */}
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

// EXAMPLE 2: MULTIPLE PARAMETERS
// -------------------------------
// Route with multiple dynamic segments
function BlogPost() {
  // Destructure multiple parameters
  const { category, postId } = useParams();
  
  return (
    <div>
      <h2>Category: {category}</h2>
      <p>Post ID: {postId}</p>
    </div>
  );
}

// Route definition
// <Route path="/blog/:category/:postId" element={<BlogPost />} />
// Matches: /blog/technology/123, /blog/sports/456, etc.

// EXAMPLE 3: OPTIONAL PARAMETERS
// -------------------------------
function ProductPage() {
  const { productId, variant } = useParams();
  
  return (
    <div>
      <h2>Product: {productId}</h2>
      {variant && <p>Variant: {variant}</p>}
    </div>
  );
}

// Multiple routes for optional parameters
// <Route path="/product/:productId" element={<ProductPage />} />
// <Route path="/product/:productId/:variant" element={<ProductPage />} />

// EXAMPLE 4: FETCHING DATA WITH DYNAMIC ROUTES
// ---------------------------------------------
function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Fetch user data based on userId parameter
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [userId]); // Re-fetch when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>ID: {userId}</p>
    </div>
  );
}

// EXAMPLE 5: NESTED DYNAMIC ROUTES
// ---------------------------------
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link> | 
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet /> {/* Nested routes render here */}
    </div>
  );
}

function UserDashboard() {
  const { userId } = useParams();
  return <h2>Dashboard for User {userId}</h2>;
}

// Route structure
// <Route path="/user/:userId" element={<Dashboard />}>
//   <Route path="profile" element={<UserProfile />} />
//   <Route path="settings" element={<UserSettings />} />
// </Route>
// Matches: /user/123/profile, /user/123/settings

// EXAMPLE 6: WILDCARD ROUTES
// ---------------------------
function FileBrowser() {
  // * captures everything after the base path
  const { '*': filepath } = useParams();
  
  return (
    <div>
      <h2>File Browser</h2>
      <p>Current path: /{filepath}</p>
    </div>
  );
}

// <Route path="/files/*" element={<FileBrowser />} />
// Matches: /files/documents/report.pdf, /files/images/photo.jpg

// EXAMPLE 7: PROGRAMMATIC NAVIGATION WITH PARAMETERS
// ---------------------------------------------------
function UserList() {
  const navigate = useNavigate();
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];
  
  const handleUserClick = (userId) => {
    // Navigate to dynamic route programmatically
    navigate(`/user/${userId}`);
  };
  
  return (
    <div>
      <h2>User List</h2>
      {users.map(user => (
        <button key={user.id} onClick={() => handleUserClick(user.id)}>
          View {user.name}
        </button>
      ))}
    </div>
  );
}

// EXAMPLE 8: VALIDATION AND ERROR HANDLING
// -----------------------------------------
function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  // Validate parameter
  React.useEffect(() => {
    // Check if productId is a valid number
    if (isNaN(productId)) {
      // Redirect to error page if invalid
      navigate('/404');
    }
  }, [productId, navigate]);
  
  return <div>Product ID: {productId}</div>;
}

// EXAMPLE 9: COMPLETE REAL-WORLD EXAMPLE (E-commerce)
// ----------------------------------------------------
function ProductCatalog() {
  const { category, subcategory, productId } = useParams();
  const [product, setProduct] = React.useState(null);
  
  React.useEffect(() => {
    // Fetch product based on all parameters
    const fetchProduct = async () => {
      const response = await fetch(
        `/api/products/${category}/${subcategory}/${productId}`
      );
      const data = await response.json();
      setProduct(data);
    };
    
    fetchProduct();
  }, [category, subcategory, productId]);
  
  return (
    <div>
      <h1>{product?.name}</h1>
      <p>Category: {category}</p>
      <p>Subcategory: {subcategory}</p>
      <p>Product ID: {productId}</p>
      <p>Price: ${product?.price}</p>
    </div>
  );
}

// Route: <Route path="/shop/:category/:subcategory/:productId" element={<ProductCatalog />} />
// URL: /shop/electronics/phones/iphone-15
// Parameters: { category: 'electronics', subcategory: 'phones', productId: 'iphone-15' }

// COMMON USE CASES FOR DYNAMIC ROUTING
// -------------------------------------
// 1. User profiles: /user/:username
// 2. Blog posts: /blog/:postId or /blog/:slug
// 3. Product pages: /product/:productId
// 4. Category pages: /category/:categoryName
// 5. Search results: /search/:query
// 6. Admin panels: /admin/:section/:id
// 7. File systems: /files/*
// 8. Multi-language: /:lang/page

// BEST PRACTICES
// --------------
// 1. Use descriptive parameter names (userId, not id)
// 2. Validate parameters before using them
// 3. Handle missing or invalid parameters gracefully
// 4. Use useEffect to fetch data when parameters change
// 5. Consider using slugs instead of IDs for SEO
// 6. Keep parameter names consistent across routes
// 7. Document expected parameter formats
// 8. Use TypeScript for type-safe parameters

// PARAMETER NAMING CONVENTIONS
// -----------------------------
// - Use camelCase: :userId, :postId, :categoryName
// - Be specific: :userId (not :id), :productSlug (not :slug)
// - Avoid abbreviations unless common: :id is OK, :usr is not
// - Use singular form: :user (not :users)

// ACCESSING PARAMETERS - COMPLETE SYNTAX
// ---------------------------------------
// const params = useParams(); // Get all parameters as object
// const { id } = useParams(); // Destructure specific parameter
// const { id, name } = useParams(); // Multiple parameters
// const { '*': catchAll } = useParams(); // Wildcard parameter

// PARAMETER TYPES AND CONVERSION
// -------------------------------
function ItemPage() {
  const { itemId } = useParams();
  
  // Parameters are always strings, convert if needed
  const numericId = parseInt(itemId, 10);
  const isValidId = !isNaN(numericId);
  
  if (!isValidId) {
    return <div>Invalid item ID</div>;
  }
  
  return <div>Item #{numericId}</div>;
}

// COMBINING DYNAMIC ROUTES WITH QUERY PARAMETERS
// -----------------------------------------------
function SearchResults() {
  const { category } = useParams(); // From URL path
  const [searchParams] = useSearchParams(); // From query string
  const query = searchParams.get('q');
  const sort = searchParams.get('sort');
  
  return (
    <div>
      <h2>Search in {category}</h2>
      <p>Query: {query}</p>
      <p>Sort by: {sort}</p>
    </div>
  );
}

// URL: /search/books?q=react&sort=price
// category = 'books', query = 'react', sort = 'price' 
