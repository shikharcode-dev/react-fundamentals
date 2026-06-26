// explain about how to setup react like npm create vite@7 and then explain after npm work then how compliar tehn bundle fir transpile hota hai help of babel also explain babel then how they got execute.
// after that explain JSX all things and then components of a function also explai diffrance between orginal function call and functional components call 
// then, explain what is props and how it works with suttable example like write inside function html and work it on another main.jsx file all explain ok
// also explain the difffrence between vite 8 like what rust come kinda a stuff and vite 7




//START ==>
// ==================== REACT SETUP WITH VITE 7 ====================

// Step 1: Create a new React project using Vite 7
// Command: npm create vite@7 my-react-app
// This command will:
// - Download and run the create-vite package
// - Prompt you to select a framework (choose React)
// - Prompt you to select a variant (JavaScript or TypeScript)
// - Create a new directory with all necessary files

// Step 2: Navigate to project and install dependencies
// cd my-react-app
// npm install

// Step 3: Start development server
// npm run dev
// This starts a local development server at http://localhost:5173


// ==================== HOW NPM WORKS ====================

// npm (Node Package Manager) is a package manager for JavaScript
// When you run 'npm install':
// 1. npm reads package.json file
// 2. Downloads all dependencies listed in package.json
// 3. Stores them in node_modules folder
// 4. Creates package-lock.json to lock dependency versions

// Example package.json:
// {
//   "name": "my-react-app",
//   "dependencies": {
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0"
//   },
//   "devDependencies": {
//     "vite": "^5.0.0"
//   }
// }


// ==================== COMPILATION, BUNDLING & TRANSPILATION ====================

// TRANSPILATION (Babel's Role):
// - Converts modern JavaScript (ES6+) to older versions (ES5) for browser compatibility
// - Converts JSX syntax to regular JavaScript
// - Example of JSX transpilation:
// Before (JSX): const element = <h1>Hello World</h1>;
// After (Babel): const element = React.createElement('h1', null, 'Hello World');

// BABEL - What is it?
// Babel is a JavaScript compiler/transpiler that:
// 1. Parses your code into an Abstract Syntax Tree (AST)
// 2. Transforms the AST according to plugins/presets
// 3. Generates new code from the transformed AST

// Example Babel configuration (.babelrc):
// {
//   "presets": [
//     "@babel/preset-env",    // Transpiles ES6+ to ES5
//     "@babel/preset-react"   // Transpiles JSX to JavaScript
//   ]
// }

// BUNDLING:
// - Combines multiple JavaScript files into one or few files
// - Vite uses Rollup for production bundling
// - Reduces HTTP requests and optimizes loading time

// COMPILATION PROCESS:
// 1. Write code in JSX/ES6+ → 2. Babel transpiles to ES5 → 3. Bundler combines files → 4. Browser executes

// HOW CODE GETS EXECUTED:
// Development: Vite serves files directly with ESM (ES Modules), no bundling needed
// Production: npm run build → Vite bundles with Rollup → Creates optimized dist folder → Deploy to server


// ==================== JSX (JavaScript XML) ====================

// JSX is a syntax extension for JavaScript that looks like HTML
// It allows you to write HTML-like code in JavaScript files

// JSX Rules:
// 1. Must return a single parent element
// 2. Use className instead of class
// 3. Use camelCase for attributes (onClick, onChange)
// 4. Close all tags (even self-closing like <img />)
// 5. Use {} to embed JavaScript expressions

// Example 1: Basic JSX
const element = <h1>Hello, World!</h1>;

// Example 2: JSX with JavaScript expressions
const name = "John";
const greeting = <h1>Hello, {name}!</h1>;

// Example 3: JSX with attributes
const image = <img src="photo.jpg" alt="My Photo" className="profile-pic" />;

// Example 4: JSX with conditional rendering
const isLoggedIn = true;
const message = (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}
  </div>
);

// Example 5: JSX with lists
const fruits = ['Apple', 'Banana', 'Orange'];
const fruitList = (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);


// ==================== FUNCTIONAL COMPONENTS ====================

// A functional component is a JavaScript function that returns JSX

// Example 1: Simple functional component
function Welcome() {
  return <h1>Welcome to React!</h1>;
}

// Example 2: Functional component with arrow function
const Greeting = () => {
  return <h1>Hello from arrow function!</h1>;
};

// Example 3: Component with logic
function UserStatus() {
  const isOnline = true;
  return (
    <div>
      <h2>User Status</h2>
      <p>{isOnline ? "Online" : "Offline"}</p>
    </div>
  );
}


// ==================== DIFFERENCE: REGULAR FUNCTION vs FUNCTIONAL COMPONENT ====================

// REGULAR FUNCTION CALL:
// - Called directly with parentheses: myFunction()
// - Returns a value that can be used immediately
// - Executed when called

function regularFunction() {
  return "Hello from regular function";
}
const result = regularFunction(); // Called with ()
console.log(result); // Output: "Hello from regular function"

// FUNCTIONAL COMPONENT CALL:
// - Called by React using JSX syntax: <MyComponent />
// - Returns JSX that React renders to DOM
// - React manages when and how to execute it

function FunctionalComponent() {
  return <h1>Hello from component</h1>;
}
// Usage in JSX: <FunctionalComponent />  (No parentheses!)
// React internally calls it and renders the returned JSX

// KEY DIFFERENCES:
// 1. Regular function: myFunction() → returns value
// 2. Component: <MyComponent /> → React renders JSX
// 3. Components can use React hooks (useState, useEffect)
// 4. Components are part of React's component tree
// 5. Regular functions are just JavaScript functions


// ==================== PROPS (Properties) ====================

// Props are arguments passed to React components
// They allow data to flow from parent to child components
// Props are read-only (immutable)

// Example 1: Simple props
// File: Greeting.jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage in main.jsx:
// <Greeting name="Alice" />
// Output: Hello, Alice!

// Example 2: Multiple props
// File: UserCard.jsx
function UserCard(props) {
  return (
    <div className="user-card">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}

// Usage in main.jsx:
// <UserCard name="John Doe" age={30} email="john@example.com" />

// Example 3: Props with destructuring (cleaner syntax)
// File: Product.jsx
function Product({ title, price, inStock }) {
  return (
    <div className="product">
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <p>{inStock ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
}

// Usage in main.jsx:
// <Product title="Laptop" price={999} inStock={true} />

// Example 4: Props with children
// File: Card.jsx
function Card(props) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <div className="card-content">
        {props.children}
      </div>
    </div>
  );
}

// Usage in main.jsx:
// <Card title="My Card">
//   <p>This is the content inside the card</p>
//   <button>Click me</button>
// </Card>

// Example 5: Complete example with main.jsx
// File: Button.jsx
function Button({ text, color, onClick }) {
  return (
    <button 
      style={{ backgroundColor: color, padding: '10px 20px', border: 'none', borderRadius: '5px' }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// File: main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from './Button.jsx';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>My React App</h1>
      <Button text="Click Me" color="blue" onClick={handleClick} />
      <Button text="Submit" color="green" onClick={() => console.log('Submitted')} />
      <Button text="Cancel" color="red" onClick={() => console.log('Cancelled')} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// HOW PROPS WORK:
// 1. Parent component passes data as attributes: <Child name="John" />
// 2. Child component receives data as props object: function Child(props) { ... }
// 3. Access props using props.name or destructure: function Child({ name }) { ... }
// 4. Props flow one-way: Parent → Child (not reverse)
// 5. Props are immutable: Cannot modify props inside child component


// ==================== VITE 7 vs VITE 8 DIFFERENCES ====================

// VITE 7:
// - Uses esbuild (written in Go) for dependency pre-bundling
// - Fast development server with Hot Module Replacement (HMR)
// - Uses Rollup for production builds
// - Good performance but room for improvement

// VITE 8 (with Rust integration):
// - Introduces Rolldown: A Rust-based bundler (alternative to Rollup)
// - Rolldown is written in Rust for better performance
// - Aims to unify development and production bundling
// - Faster build times due to Rust's performance
// - Better memory efficiency
// - More consistent behavior between dev and prod

// WHY RUST?
// - Rust is a systems programming language
// - Extremely fast (compiled, no garbage collection)
// - Memory safe without runtime overhead
// - Perfect for build tools that need maximum performance

// PERFORMANCE COMPARISON:
// Vite 7: esbuild (Go) + Rollup (JavaScript)
// Vite 8: esbuild (Go) + Rolldown (Rust)
// Result: Vite 8 is faster, especially for large projects

// Example: Build time comparison
// Vite 7: Large project build → 45 seconds
// Vite 8: Same project build → 28 seconds (approximately 40% faster)

// KEY IMPROVEMENTS IN VITE 8:
// 1. Rolldown bundler (Rust-based) for production
// 2. Better tree-shaking (removes unused code)
// 3. Improved code splitting
// 4. Faster cold starts
// 5. Lower memory usage
// 6. Better compatibility between dev and prod builds

// MIGRATION FROM VITE 7 TO VITE 8:
// Most projects can upgrade with minimal changes:
// npm install vite@8
// Update vite.config.js if needed (usually no changes required)
