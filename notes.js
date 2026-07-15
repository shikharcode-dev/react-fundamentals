// ============================================
// CONTEXT API - DETAILED NOTES & EXPLANATION
// ============================================

// WHAT IS CONTEXT API?
// Context API is a React feature that allows you to share data across components without passing props manually at every level.
// It helps avoid "prop drilling" (passing props through multiple levels of components).

// WHY USE CONTEXT API?
// - To share global data (like user info, theme, language settings)
// - To avoid passing props through many intermediate components
// - To make code cleaner and more maintainable

// ============================================
// STEP 1: CREATE A CONTEXT
// ============================================
// First, we need to create a context using React.createContext()

import React, { createContext, useState } from 'react';

// Create a context - this will hold our shared data
const MyContext = createContext();

// ============================================
// STEP 2: CREATE A PROVIDER COMPONENT
// ============================================
// The Provider component wraps around components that need access to the context data
// It uses useState to manage the data that will be shared

function MyContextProvider({ children }) {
  // useState hook to manage the shared data
  const [data, setData] = useState("Hello from Context!");
  const [user, setUser] = useState({ name: "John", age: 25 });
  const [count, setCount] = useState(0);

  // You can create functions to update the data
  const updateData = (newData) => {
    setData(newData);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  // The value prop contains all data and functions we want to share
  return (
    <MyContext.Provider 
      value={{ 
        data, 
        setData, 
        user, 
        setUser, 
        count, 
        incrementCount,
        updateData,
        updateUser 
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

// ============================================
// STEP 3: WRAP YOUR APP WITH THE PROVIDER
// ============================================
// In your main App component, wrap all components that need access to the context

function App() {
  return (
    <MyContextProvider>
      <div>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </MyContextProvider>
  );
}

// ============================================
// STEP 4: CONSUME THE CONTEXT IN ANY COMPONENT
// ============================================
// Use the useContext hook to access the shared data in any component

import { useContext } from 'react';

// Example Component 1 - Reading data
function Header() {
  // useContext hook gives us access to all the values from the Provider
  const { data, user, count } = useContext(MyContext);

  return (
    <header>
      <h1>{data}</h1>
      <p>User: {user.name}, Age: {user.age}</p>
      <p>Count: {count}</p>
    </header>
  );
}

// Example Component 2 - Updating data
function MainContent() {
  // We can access both data and functions to update it
  const { data, updateData, incrementCount, updateUser } = useContext(MyContext);

  const handleClick = () => {
    updateData("Data has been updated!");
  };

  const handleUserUpdate = () => {
    updateUser({ name: "Jane", age: 30 });
  };

  return (
    <main>
      <p>Current Data: {data}</p>
      <button onClick={handleClick}>Update Data</button>
      <button onClick={incrementCount}>Increment Count</button>
      <button onClick={handleUserUpdate}>Update User</button>
    </main>
  );
}

// Example Component 3 - Nested component can also access context
function Footer() {
  const { count, user } = useContext(MyContext);

  return (
    <footer>
      <p>Footer - Count: {count}</p>
      <p>User in Footer: {user.name}</p>
    </footer>
  );
}

// ============================================
// SENDING DATA ANYWHERE YOU WANT
// ============================================
// Any component wrapped by the Provider can access and modify the context data
// No matter how deeply nested the component is

function DeeplyNestedComponent() {
  // Even deeply nested components can access the context directly
  const { data, setData, user, count } = useContext(MyContext);

  return (
    <div>
      <p>I can access data from anywhere: {data}</p>
      <p>User: {user.name}</p>
      <p>Count: {count}</p>
      <button onClick={() => setData("Changed from nested component!")}>
        Change Data
      </button>
    </div>
  );
}

// ============================================
// COMPLETE FLOW SUMMARY
// ============================================
// 1. Create Context using createContext()
// 2. Create Provider component with useState to manage data
// 3. Wrap your app/components with the Provider
// 4. Use useContext hook in any component to access/modify data
// 5. Data can be sent and accessed anywhere within the Provider's scope

// ============================================
// KEY POINTS TO REMEMBER
// ============================================
// - Context API works with useState to manage and share state
// - Provider component holds the state and provides it to children
// - useContext hook is used to consume the context in any component
// - You can have multiple contexts for different types of data
// - Any component inside the Provider can read and update the shared data
// - Changes to context data will re-render all components using that data

// ============================================
// EXAMPLE: MULTIPLE CONTEXTS
// ============================================
// You can create multiple contexts for different purposes

const ThemeContext = createContext();
const AuthContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const login = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Using multiple contexts together
function AppWithMultipleContexts() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MyContextProvider>
          <div>
            <ComponentUsingMultipleContexts />
          </div>
        </MyContextProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function ComponentUsingMultipleContexts() {
  // Access multiple contexts in one component
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, username, login, logout } = useContext(AuthContext);
  const { data, count } = useContext(MyContext);

  return (
    <div style={{ background: theme === "light" ? "#fff" : "#333" }}>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      
      {isLoggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login("User123")}>Login</button>
      )}
      
      <p>Data from MyContext: {data}</p>
      <p>Count: {count}</p>
    </div>
  );
}

// This is how Context API works with useState to share data across your entire application!
