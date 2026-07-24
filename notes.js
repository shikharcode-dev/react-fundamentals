// ============================================================================
// CRUD APPLICATION - DETAILED NOTES
// ============================================================================

// WHAT IS CRUD?
// CRUD stands for Create, Read, Update, and Delete - the four basic operations
// for persistent storage in any application. These operations form the foundation
// of most web applications and databases.

// CREATE: Adding new data/records to the system
// READ: Retrieving and displaying existing data
// UPDATE: Modifying existing data/records
// DELETE: Removing data/records from the system

// ============================================================================
// WHY CRUD APPLICATIONS ARE IMPORTANT
// ============================================================================
// - They form the backbone of most web applications
// - Essential for data management in databases
// - Used in almost every real-world application (social media, e-commerce, etc.)
// - Helps understand the complete lifecycle of data

// ============================================================================
// IMPLEMENTING CRUD IN A PROJECT
// ============================================================================

// STEP 1: SET UP YOUR PROJECT STRUCTURE
// - Create HTML file for the user interface
// - Create JavaScript file for logic and functionality
// - Optionally create CSS file for styling
// - Set up a data storage mechanism (array, localStorage, or database)

// STEP 2: CREATE OPERATION (C in CRUD)
// Purpose: Add new items to your data collection
// Example: Adding a new user, product, or task

// Example Code:
// let users = []; // Data storage array
// 
// function createUser(name, email) {
//     const newUser = {
//         id: Date.now(), // Unique identifier
//         name: name,
//         email: email,
//         createdAt: new Date()
//     };
//     users.push(newUser);
//     console.log("User created successfully!");
//     return newUser;
// }

// STEP 3: READ OPERATION (R in CRUD)
// Purpose: Retrieve and display data from your collection
// Can be reading all items or a specific item by ID

// Example Code:
// function getAllUsers() {
//     return users; // Returns all users
// }
// 
// function getUserById(id) {
//     return users.find(user => user.id === id); // Returns specific user
// }

// STEP 4: UPDATE OPERATION (U in CRUD)
// Purpose: Modify existing data in your collection
// Find the item by ID and update its properties

// Example Code:
// function updateUser(id, newName, newEmail) {
//     const userIndex = users.findIndex(user => user.id === id);
//     if (userIndex !== -1) {
//         users[userIndex].name = newName;
//         users[userIndex].email = newEmail;
//         users[userIndex].updatedAt = new Date();
//         console.log("User updated successfully!");
//         return users[userIndex];
//     }
//     console.log("User not found!");
//     return null;
// }

// STEP 5: DELETE OPERATION (D in CRUD)
// Purpose: Remove data from your collection
// Find the item by ID and remove it from the array

// Example Code:
// function deleteUser(id) {
//     const userIndex = users.findIndex(user => user.id === id);
//     if (userIndex !== -1) {
//         users.splice(userIndex, 1);
//         console.log("User deleted successfully!");
//         return true;
//     }
//     console.log("User not found!");
//     return false;
// }

// ============================================================================
// COMPLETE CRUD APPLICATION EXAMPLE - TODO LIST
// ============================================================================

// Data Storage
// let todos = [];

// CREATE - Add new todo
// function addTodo(title, description) {
//     const todo = {
//         id: Date.now(),
//         title: title,
//         description: description,
//         completed: false,
//         createdAt: new Date()
//     };
//     todos.push(todo);
//     displayTodos(); // Update UI
//     return todo;
// }

// READ - Get all todos
// function getAllTodos() {
//     return todos;
// }

// READ - Get single todo
// function getTodoById(id) {
//     return todos.find(todo => todo.id === id);
// }

// UPDATE - Modify existing todo
// function updateTodo(id, newTitle, newDescription) {
//     const todo = todos.find(t => t.id === id);
//     if (todo) {
//         todo.title = newTitle;
//         todo.description = newDescription;
//         todo.updatedAt = new Date();
//         displayTodos(); // Update UI
//         return todo;
//     }
//     return null;
// }

// UPDATE - Toggle completion status
// function toggleTodoComplete(id) {
//     const todo = todos.find(t => t.id === id);
//     if (todo) {
//         todo.completed = !todo.completed;
//         displayTodos(); // Update UI
//         return todo;
//     }
//     return null;
// }

// DELETE - Remove todo
// function deleteTodo(id) {
//     const index = todos.findIndex(t => t.id === id);
//     if (index !== -1) {
//         todos.splice(index, 1);
//         displayTodos(); // Update UI
//         return true;
//     }
//     return false;
// }

// DISPLAY - Show todos in UI
// function displayTodos() {
//     const todoList = document.getElementById('todoList');
//     todoList.innerHTML = ''; // Clear existing content
//     
//     todos.forEach(todo => {
//         const todoElement = document.createElement('div');
//         todoElement.className = 'todo-item';
//         todoElement.innerHTML = `
//             <h3>${todo.title}</h3>
//             <p>${todo.description}</p>
//             <button onclick="toggleTodoComplete(${todo.id})">
//                 ${todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
//             </button>
//             <button onclick="editTodo(${todo.id})">Edit</button>
//             <button onclick="deleteTodo(${todo.id})">Delete</button>
//         `;
//         todoList.appendChild(todoElement);
//     });
// }

// ============================================================================
// KEY CONCEPTS COVERED IN CRUD IMPLEMENTATION
// ============================================================================

// 1. ARRAYS: Used to store collections of data
//    - push(): Add items
//    - splice(): Remove items
//    - find(): Search for specific item
//    - findIndex(): Get position of item

// 2. OBJECTS: Used to structure individual data items
//    - Properties to store different attributes
//    - Dot notation to access/modify properties

// 3. FUNCTIONS: Encapsulate CRUD operations
//    - Parameters to pass data
//    - Return values to send results back
//    - Reusable code blocks

// 4. DOM MANIPULATION: Update the user interface
//    - getElementById(): Select elements
//    - createElement(): Create new elements
//    - innerHTML: Set content
//    - appendChild(): Add elements to page

// 5. EVENT HANDLING: Respond to user actions
//    - onclick: Handle button clicks
//    - Form submissions for data entry
//    - Event listeners for interactive features

// 6. DATA PERSISTENCE (Optional Advanced Topic):
//    - localStorage: Save data in browser
//    - JSON.stringify(): Convert objects to strings
//    - JSON.parse(): Convert strings back to objects

// ============================================================================
// BEST PRACTICES FOR CRUD APPLICATIONS
// ============================================================================

// 1. Always validate user input before creating/updating
// 2. Use unique IDs for each item (timestamp, UUID, or auto-increment)
// 3. Provide user feedback (success/error messages)
// 4. Confirm before deleting (prevent accidental deletion)
// 5. Keep functions small and focused on one task
// 6. Update the UI after each CRUD operation
// 7. Handle errors gracefully (item not found, etc.)
// 8. Consider data persistence (localStorage or backend database)

// ============================================================================
// REAL-WORLD EXAMPLES OF CRUD APPLICATIONS
// ============================================================================

// 1. Social Media: Create posts, Read feed, Update profile, Delete comments
// 2. E-commerce: Add products, View catalog, Update cart, Remove items
// 3. Contact Manager: Add contacts, View list, Edit details, Delete contacts
// 4. Blog Platform: Write articles, Read posts, Edit content, Remove posts
// 5. Task Manager: Create tasks, View todos, Update status, Delete completed

// ============================================================================
// NEXT STEPS TO ENHANCE YOUR CRUD APPLICATION
// ============================================================================

// 1. Add form validation
// 2. Implement search and filter functionality
// 3. Add sorting capabilities
// 4. Integrate with a backend API
// 5. Add user authentication
// 6. Implement pagination for large datasets
// 7. Add confirmation dialogs
// 8. Improve UI/UX with better styling
// 9. Add data export/import features
// 10. Implement undo/redo functionality
