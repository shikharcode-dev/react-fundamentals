// ============================================
// COMPREHENSIVE NOTES ON REACT CONCEPTS
// ============================================

// ============================================
// 1. ES BUILD vs ROLLUP - BUILD TOOLS COMPARISON
// ============================================

// ES BUILD:
// - Extremely fast bundler written in Go language
// - Focuses on speed and performance
// - Best for development builds due to fast rebuild times
// - Limited plugin ecosystem compared to Rollup
// - Example use case: Create React App uses esbuild for faster development

// ROLLUP:
// - JavaScript bundler focused on creating optimized production bundles
// - Better tree-shaking capabilities (removes unused code)
// - Extensive plugin ecosystem
// - Slower than esbuild but produces smaller, more optimized bundles
// - Example use case: Library authors prefer Rollup for publishing npm packages

// Key Difference:
// esbuild = Speed (Development) | Rollup = Optimization (Production)

// ============================================
// 2. useState WITH PRIMITIVE DATA TYPES
// ============================================

// Example with Primitive (Number):
// const [count, setCount] = useState(0);

// How it works:
// - Primitive values (numbers, strings, booleans) are compared by VALUE
// - When you call setCount(1), React compares old value (0) with new value (1)
// - If values are different, React triggers a re-render
// - Primitives are immutable, so each update creates a new value

// Example behavior:
// setCount(1); // Re-renders because 0 !== 1
// setCount(1); // No re-render because 1 === 1 (same value)

// ============================================
// 3. useState WITH REFERENCE DATA TYPES
// ============================================

// Example with Reference Type (Object):
// const [user, setUser] = useState({name: "PJ"});

// How it works:
// - Objects are compared by REFERENCE (memory address), not by value
// - Even if object content is same, React checks if it's a different object in memory
// - You must create a NEW object to trigger re-render

// WRONG WAY (Won't trigger re-render):
// user.name = "John"; // Mutating existing object
// setUser(user); // Same reference, React thinks nothing changed

// CORRECT WAY (Triggers re-render):
// setUser({...user, name: "John"}); // Creates new object with spread operator
// setUser({name: "John"}); // Creates completely new object

// Why this matters:
// - React uses shallow comparison for performance
// - Mutating state directly breaks React's change detection
// - Always create new objects/arrays when updating state

// ============================================
// 4. WHY NORMAL FUNCTION CALLS DON'T WORK
// ============================================

// WRONG APPROACH - Direct function call:
// function updateCount() {
//   count = count + 1; // This won't work!
//   // React doesn't know state changed
//   // No re-render happens
//   // UI stays the same
// }

// CORRECT APPROACH - Using setState:
// function updateCount() {
//   setCount(count + 1); // This works!
//   // React is notified of state change
//   // React schedules a re-render
//   // UI updates to show new value
// }

// Why setState is necessary:
// - React needs to track state changes to know when to re-render
// - setState tells React "hey, something changed, update the UI"
// - Direct variable assignment bypasses React's change detection system
// - setState also batches multiple updates for better performance

// Re-render Process:
// 1. You call setState with new value
// 2. React compares old state with new state
// 3. If different, React marks component for re-render
// 4. React re-executes component function
// 5. React compares old virtual DOM with new virtual DOM
// 6. React updates only the changed parts in real DOM

// ============================================
// 5. MULTIPLE CHILDREN KEY/ID ERROR
// ============================================

// THE ERROR:
// "Warning: Each child in a list should have a unique 'key' prop"

// WHY THIS ERROR OCCURS:
// When rendering multiple similar components (like cards), React needs a way
// to identify which items changed, were added, or removed between re-renders

// WRONG WAY (Causes error):
// {cards.map((card) => (
//   <Card name={card.name} /> // No key prop!
// ))}

// CORRECT WAY (Fixes error):
// {cards.map((card) => (
//   <Card key={card.id} name={card.name} /> // Unique key prop added
// ))}

// What is the 'key' prop:
// - Special prop that helps React identify which items changed
// - Must be unique among siblings (not globally unique)
// - Should be stable (same item = same key across re-renders)
// - Should not be array index if list can be reordered

// Why keys are important:
// - Without keys: React re-renders ALL items when list changes (slow)
// - With keys: React only updates items that actually changed (fast)
// - Keys help React maintain component state correctly
// - Keys prevent bugs when list items are reordered or deleted

// Best practices for keys:
// 1. Use unique IDs from your data (card.id, user.id, etc.)
// 2. Don't use array index if list can change order
// 3. Don't use random values (generates new key each render)
// 4. Keys only need to be unique among siblings, not globally

// Example with proper keys:
// const cards = [
//   { id: 1, name: "Card 1" },
//   { id: 2, name: "Card 2" },
//   { id: 3, name: "Card 3" }
// ];
//
// return (
//   <div>
//     {cards.map((card) => (
//       <Card key={card.id} name={card.name} />
//     ))}
//   </div>
// );

// When to use index as key (only if):
// - List items never reorder
// - List items never get deleted
// - List is static and doesn't change
// Example: {cards.map((card, index) => <Card key={index} {...card} />)}

// ============================================
// SUMMARY
// ============================================
// 1. esbuild = Fast builds, Rollup = Optimized bundles
// 2. Primitives compared by value, objects by reference
// 3. Always use setState, never mutate state directly
// 4. Keys help React efficiently update lists of components
// 5. Use unique, stable IDs as keys for best performance




