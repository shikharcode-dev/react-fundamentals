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





// ============================================
// PREVENTING MULTIPLE RE-RENDERS USING useEffect
// ============================================

// WHAT IS THE PROBLEM?
// When using Context API with useState, every time the context value changes,
// ALL components that consume that context will re-render, even if they don't use
// the specific piece of data that changed. This can cause performance issues.

// SOLUTION: Use useEffect hook to control when components should update
// and prevent unnecessary re-renders.

// ============================================
// EXAMPLE 1: PROBLEM - MULTIPLE UNNECESSARY RE-RENDERS
// ============================================

import React, { createContext, useState, useContext, useEffect, useRef, memo } from 'react';

const DataContext = createContext();

function DataProvider({ children }) {
  const [name, setName] = useState("John");
  const [age, setAge] = useState(25);
  const [email, setEmail] = useState("john@example.com");

  return (
    <DataContext.Provider value={{ name, setName, age, setAge, email, setEmail }}>
      {children}
    </DataContext.Provider>
  );
}

// This component only uses 'name' but will re-render when age or email changes too
function NameDisplay() {
  const { name } = useContext(DataContext);
  
  // This will log every time ANY context value changes
  console.log("NameDisplay re-rendered");
  
  return <h2>Name: {name}</h2>;
}

// ============================================
// SOLUTION 1: USING useEffect TO TRACK SPECIFIC CHANGES
// ============================================

function OptimizedNameDisplay() {
  const { name } = useContext(DataContext);
  const [displayName, setDisplayName] = useState(name);
  
  // useEffect with dependency array - only runs when 'name' changes
  useEffect(() => {
    console.log("Name changed, updating display");
    setDisplayName(name);
  }, [name]); // Only re-run when 'name' changes, not age or email
  
  return <h2>Name: {displayName}</h2>;
}

// ============================================
// SOLUTION 2: USING useRef TO PREVENT UNNECESSARY EFFECTS
// ============================================

function SmartComponent() {
  const { name, age, email } = useContext(DataContext);
  const previousName = useRef(name);
  
  useEffect(() => {
    // Only execute logic if name actually changed
    if (previousName.current !== name) {
      console.log("Name changed from", previousName.current, "to", name);
      // Perform expensive operations only when name changes
      previousName.current = name;
    }
  }, [name]);
  
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

// ============================================
// SOLUTION 3: SPLITTING CONTEXTS TO REDUCE RE-RENDERS
// ============================================

// Instead of one large context, create separate contexts for different data
const NameContext = createContext();
const AgeContext = createContext();
const EmailContext = createContext();

function SplitContextProviders({ children }) {
  const [name, setName] = useState("John");
  const [age, setAge] = useState(25);
  const [email, setEmail] = useState("john@example.com");

  return (
    <NameContext.Provider value={{ name, setName }}>
      <AgeContext.Provider value={{ age, setAge }}>
        <EmailContext.Provider value={{ email, setEmail }}>
          {children}
        </EmailContext.Provider>
      </AgeContext.Provider>
    </NameContext.Provider>
  );
}

// Now this component only re-renders when name changes
function OnlyNameComponent() {
  const { name } = useContext(NameContext);
  
  useEffect(() => {
    console.log("OnlyNameComponent rendered - name changed");
  }, [name]);
  
  return <h2>Name: {name}</h2>;
}

// This component only re-renders when age changes
function OnlyAgeComponent() {
  const { age } = useContext(AgeContext);
  
  useEffect(() => {
    console.log("OnlyAgeComponent rendered - age changed");
  }, [age]);
  
  return <h2>Age: {age}</h2>;
}

// ============================================
// SOLUTION 4: USING React.memo TO PREVENT RE-RENDERS
// ============================================

// React.memo prevents re-renders if props haven't changed
const MemoizedComponent = memo(function DisplayInfo({ name, age }) {
  useEffect(() => {
    console.log("MemoizedComponent rendered");
  });
  
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
});

// ============================================
// SOLUTION 5: DEBOUNCING WITH useEffect
// ============================================

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  
  // useEffect with cleanup to debounce API calls
  useEffect(() => {
    // Don't search if term is empty
    if (!searchTerm) {
      setResults([]);
      return;
    }
    
    // Set a timer to delay the search
    const timeoutId = setTimeout(() => {
      console.log("Searching for:", searchTerm);
      // Simulate API call
      fetchSearchResults(searchTerm).then(data => setResults(data));
    }, 500); // Wait 500ms after user stops typing
    
    // Cleanup function - cancels previous timer if user keeps typing
    return () => {
      clearTimeout(timeoutId);
      console.log("Cancelled previous search");
    };
  }, [searchTerm]); // Only run when searchTerm changes
  
  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => <li key={result.id}>{result.name}</li>)}
      </ul>
    </div>
  );
}

// Simulated API call
function fetchSearchResults(term) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: `Result for ${term} - 1` },
        { id: 2, name: `Result for ${term} - 2` }
      ]);
    }, 300);
  });
}

// ============================================
// SOLUTION 6: CONDITIONAL EFFECTS
// ============================================

function ConditionalEffectComponent() {
  const { name, age, email } = useContext(DataContext);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  
  useEffect(() => {
    // Only run effect if shouldUpdate is true
    if (shouldUpdate) {
      console.log("Effect running - data updated");
      // Perform operations
    }
  }, [name, age, email, shouldUpdate]);
  
  return (
    <div>
      <p>Name: {name}, Age: {age}</p>
      <button onClick={() => setShouldUpdate(!shouldUpdate)}>
        Toggle Updates: {shouldUpdate ? "ON" : "OFF"}
      </button>
    </div>
  );
}

// ============================================
// SOLUTION 7: USING useCallback TO PREVENT FUNCTION RE-CREATION
// ============================================

import { useCallback } from 'react';

function ParentWithCallback() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");
  
  // Without useCallback, this function is recreated on every render
  // causing child components to re-render unnecessarily
  
  // With useCallback, function is only recreated when dependencies change
  const handleIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // Empty array means function never changes
  
  const handleNameChange = useCallback((newName) => {
    setName(newName);
  }, []); // Function doesn't depend on any values
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <MemoizedButton onClick={handleIncrement} label="Increment" />
      <MemoizedInput onChange={handleNameChange} />
    </div>
  );
}

const MemoizedButton = memo(function Button({ onClick, label }) {
  useEffect(() => {
    console.log("Button rendered");
  });
  
  return <button onClick={onClick}>{label}</button>;
});

const MemoizedInput = memo(function Input({ onChange }) {
  useEffect(() => {
    console.log("Input rendered");
  });
  
  return <input onChange={(e) => onChange(e.target.value)} />;
});

// ============================================
// COMPLETE EXAMPLE: OPTIMIZED CONTEXT WITH ALL TECHNIQUES
// ============================================

const OptimizedContext = createContext();

function OptimizedProvider({ children }) {
  const [user, setUser] = useState({ name: "John", age: 25 });
  const [settings, setSettings] = useState({ theme: "light", language: "en" });
  
  // Use useCallback to prevent function recreation
  const updateUser = useCallback((newUser) => {
    setUser(prevUser => ({ ...prevUser, ...newUser }));
  }, []);
  
  const updateSettings = useCallback((newSettings) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  }, []);
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    user,
    settings,
    updateUser,
    updateSettings
  }), [user, settings, updateUser, updateSettings]);
  
  return (
    <OptimizedContext.Provider value={contextValue}>
      {children}
    </OptimizedContext.Provider>
  );
}

function OptimizedConsumer() {
  const { user, updateUser } = useContext(OptimizedContext);
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    console.log(`Component rendered ${renderCount.current} times`);
  });
  
  // Only update when user clicks button, not on every render
  const handleUpdate = useCallback(() => {
    updateUser({ name: "Jane" });
  }, [updateUser]);
  
  return (
    <div>
      <p>User: {user.name}, Age: {user.age}</p>
      <p>Render count: {renderCount.current}</p>
      <button onClick={handleUpdate}>Update Name</button>
    </div>
  );
}

// ============================================
// KEY TAKEAWAYS
// ============================================
// 1. useEffect with dependency array - Only run effects when specific values change
// 2. useRef - Track previous values without causing re-renders
// 3. Split contexts - Separate data into multiple contexts
// 4. React.memo - Prevent component re-renders if props haven't changed
// 5. Debouncing - Delay expensive operations until user stops interacting
// 6. Conditional effects - Only run effects when certain conditions are met
// 7. useCallback - Prevent function recreation on every render
// 8. useMemo - Memoize expensive calculations and context values
// 9. Cleanup functions - Cancel timers, subscriptions, and pending operations
// 10. Combine techniques - Use multiple optimization strategies together

// ============================================
// WHEN TO USE EACH TECHNIQUE
// ============================================
// - useEffect with dependencies: When you need to respond to specific state changes
// - useRef: When you need to track values without triggering re-renders
// - Split contexts: When you have unrelated data in one context
// - React.memo: For expensive components that receive the same props often
// - Debouncing: For search inputs, API calls, or expensive calculations
// - useCallback: For functions passed as props to memoized components
// - useMemo: For expensive calculations or to stabilize context values
