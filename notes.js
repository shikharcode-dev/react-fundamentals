// ============================================
// REACT RE-RENDERING CONCEPT
// ============================================
// Re-rendering is when React updates the UI to reflect changes in data
// When state or props change, React re-renders the component
// This means the component function runs again with new values
// React then compares the new output with the previous one and updates only what changed in the DOM

// ============================================
// REACT HOOKS
// ============================================
// Hooks are special functions that let you use React features in functional components
// They were introduced in React 16.8
// Hooks always start with the word "use" (like useState, useEffect, etc.)
// Rules: 
//   - Only call hooks at the top level (not inside loops, conditions, or nested functions)
//   - Only call hooks in React functional components or custom hooks

// ============================================
// useState HOOK - DETAILED EXPLANATION
// ============================================
// useState is a hook that lets you add state to functional components
// State is data that can change over time and causes re-renders when updated

// SYNTAX: const [state, setState] = useState(initialValue);

// WHAT IT RETURNS:
// useState returns an ARRAY with exactly 2 elements:
//   1. state - The current value of the state variable
//   2. setState - A function to update the state value

// EXAMPLE:
// const [count, setCount] = useState(0);
//   - count: holds the current value (initially 0)
//   - setCount: function to update count
//   - When you call setCount(5), count becomes 5 and component re-renders

// WHY ARRAY DESTRUCTURING?
// We use array destructuring to give custom names to our state variables
// This is better than returning an object because you can name variables anything you want

// HOW IT WORKS:
// 1. First render: useState(0) creates state with initial value 0
// 2. When setState is called: React schedules a re-render
// 3. Next render: useState returns the updated value
// 4. React updates the UI with the new value

// IMPORTANT NOTES:
// - Calling setState does NOT immediately update the state
// - State updates are asynchronous
// - Never modify state directly (always use setState function)
// - Each setState call triggers a re-render
