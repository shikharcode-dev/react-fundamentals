// NOTES ON useRef() HOOK:
// 
// useRef() is a React Hook that returns a mutable ref object whose .current property is initialized to the passed argument.
// The returned object will persist for the full lifetime of the component.
//
// Key characteristics:
// 1. Does not cause re-renders when its value changes (unlike useState)
// 2. Persists values between renders
// 3. Commonly used to access DOM elements directly
// 4. Can store any mutable value
//
// Example 1: Accessing DOM elements
// import React, { useRef } from 'react';
// 
// function TextInputWithFocusButton() {
//   const inputRef = useRef(null);
//   
//   const handleClick = () => {
//     inputRef.current.focus(); // Directly access and focus the input element
//   };
//   
//   return (
//     <div>
//       <input ref={inputRef} type="text" />
//       <button onClick={handleClick}>Focus Input</button>
//     </div>
//   );
// }
//
// Example 2: Storing previous values
// function Counter() {
//   const [count, setCount] = useState(0);
//   const prevCountRef = useRef();
//   
//   useEffect(() => {
//     prevCountRef.current = count; // Store current count after render
//   });
//   
//   const prevCount = prevCountRef.current;
//   
//   return (
//     <div>
//       <p>Current: {count}, Previous: {prevCount}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }
//
// Example 3: Storing mutable values without re-rendering
// function Timer() {
//   const intervalRef = useRef(null);
//   const [seconds, setSeconds] = useState(0);
//   
//   const startTimer = () => {
//     intervalRef.current = setInterval(() => {
//       setSeconds(s => s + 1);
//     }, 1000);
//   };
//   
//   const stopTimer = () => {
//     clearInterval(intervalRef.current);
//   };
//   
//   return (
//     <div>
//       <p>Seconds: {seconds}</p>
//       <button onClick={startTimer}>Start</button>
//       <button onClick={stopTimer}>Stop</button>
//     </div>
//   );
// }
//
// NOTES ON REACT-HOOK-FORM:
//
// react-hook-form is a library for managing form state and validation in React applications.
// It uses uncontrolled components and refs to minimize re-renders and improve performance.
//
// Key features:
// 1. Minimal re-renders
// 2. Easy integration with UI libraries
// 3. Built-in validation
// 4. Small bundle size
// 5. TypeScript support
//
// Installation:
// npm install react-hook-form
//
// Example: Basic form with validation
// import React from 'react';
// import { useForm } from 'react-hook-form';
//
// function RegistrationForm() {
//   const { 
//     register,           // Function to register input fields
//     handleSubmit,       // Function to handle form submission
//     formState: { errors }, // Object containing validation errors
//     watch               // Function to watch input values
//   } = useForm();
//
//   const onSubmit = (data) => {
//     console.log(data); // { username: "...", email: "...", password: "..." }
//   };
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Username:</label>
//         <input 
//           {...register("username", { 
//             required: "Username is required",
//             minLength: { value: 3, message: "Minimum 3 characters" }
//           })} 
//         />
//         {errors.username && <span>{errors.username.message}</span>}
//       </div>
//
//       <div>
//         <label>Email:</label>
//         <input 
//           {...register("email", { 
//             required: "Email is required",
//             pattern: { 
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: "Invalid email address"
//             }
//           })} 
//         />
//         {errors.email && <span>{errors.email.message}</span>}
//       </div>
//
//       <div>
//         <label>Password:</label>
//         <input 
//           type="password"
//           {...register("password", { 
//             required: "Password is required",
//             minLength: { value: 8, message: "Minimum 8 characters" }
//           })} 
//         />
//         {errors.password && <span>{errors.password.message}</span>}
//       </div>
//
//       <button type="submit">Register</button>
//     </form>
//   );
// }
//
// Example: Advanced features
// function AdvancedForm() {
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors, isSubmitting },
//     reset,
//     setValue,
//     getValues
//   } = useForm({
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       age: 0
//     }
//   });
//
//   const onSubmit = async (data) => {
//     await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
//     console.log(data);
//     reset(); // Reset form after submission
//   };
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("firstName", { required: true })} placeholder="First Name" />
//       {errors.firstName && <span>This field is required</span>}
//       
//       <input {...register("lastName", { required: true })} placeholder="Last Name" />
//       {errors.lastName && <span>This field is required</span>}
//       
//       <input 
//         type="number" 
//         {...register("age", { 
//           required: true,
//           min: { value: 18, message: "Must be 18 or older" },
//           max: { value: 100, message: "Must be 100 or younger" }
//         })} 
//         placeholder="Age" 
//       />
//       {errors.age && <span>{errors.age.message}</span>}
//       
//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? "Submitting..." : "Submit"}
//       </button>
//     </form>
//   );
// }




// NOTES ON CREATING A FORM WITH REACT-HOOK-FORM AND VALIDATION
//
// This section explains how to create a comprehensive form using react-hook-form library
// with regex pattern validation and custom error messages.
//
// WHAT IS REACT-HOOK-FORM?
// - A performant, flexible library for managing forms in React
// - Uses uncontrolled components (refs) instead of controlled components (state)
// - Minimizes re-renders, improving performance
// - Provides built-in validation with custom rules
//
// KEY CONCEPTS:
//
// 1. FORM HANDLING:
//    - useForm() hook initializes the form
//    - register() function connects input fields to the form
//    - handleSubmit() processes form data when submitted
//    - formState contains form status (errors, isSubmitting, etc.)
//
// 2. VALIDATION:
//    - Built-in validators: required, min, max, minLength, maxLength
//    - Pattern validation using regex (regular expressions)
//    - Custom validation functions
//    - Real-time or on-submit validation
//
// 3. ERROR MESSAGES:
//    - Each validation rule can have a custom message
//    - Errors are stored in formState.errors object
//    - Display errors conditionally when they exist
//
// EXAMPLE: COMPLETE FORM WITH VALIDATION
//
// import React from 'react';
// import { useForm } from 'react-hook-form';
//
// function ComprehensiveForm() {
//   // Initialize the form with useForm hook
//   const { 
//     register,                    // Function to register input fields
//     handleSubmit,                // Wrapper function for form submission
//     formState: { errors },       // Object containing all validation errors
//     watch                        // Function to watch specific field values
//   } = useForm({
//     mode: 'onBlur'              // Validate on blur (when user leaves field)
//   });
//
//   // Function called when form is valid and submitted
//   const onSubmit = (data) => {
//     console.log('Form Data:', data);
//     // Here you would typically send data to an API
//     // Example: fetch('/api/register', { method: 'POST', body: JSON.stringify(data) })
//   };
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       
//       {/* USERNAME FIELD */}
//       <div>
//         <label>Username:</label>
//         <input 
//           {...register("username", { 
//             required: "Username is required",                    // Required validation
//             minLength: { 
//               value: 3, 
//               message: "Username must be at least 3 characters" 
//             },
//             maxLength: { 
//               value: 20, 
//               message: "Username cannot exceed 20 characters" 
//             },
//             pattern: {
//               value: /^[a-zA-Z0-9_]+$/,                         // Regex: only letters, numbers, underscore
//               message: "Username can only contain letters, numbers, and underscores"
//             }
//           })} 
//         />
//         {errors.username && <span className="error">{errors.username.message}</span>}
//       </div>
//
//       {/* EMAIL FIELD */}
//       <div>
//         <label>Email:</label>
//         <input 
//           type="email"
//           {...register("email", { 
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,  // Regex: valid email format
//               message: "Please enter a valid email address"
//             }
//           })} 
//         />
//         {errors.email && <span className="error">{errors.email.message}</span>}
//       </div>
//
//       {/* PHONE NUMBER FIELD */}
//       <div>
//         <label>Phone Number:</label>
//         <input 
//           {...register("phone", { 
//             required: "Phone number is required",
//             pattern: {
//               value: /^[0-9]{10}$/,                              // Regex: exactly 10 digits
//               message: "Phone number must be exactly 10 digits"
//             }
//           })} 
//           placeholder="1234567890"
//         />
//         {errors.phone && <span className="error">{errors.phone.message}</span>}
//       </div>
//
//       {/* PASSWORD FIELD */}
//       <div>
//         <label>Password:</label>
//         <input 
//           type="password"
//           {...register("password", { 
//             required: "Password is required",
//             minLength: { 
//               value: 8, 
//               message: "Password must be at least 8 characters" 
//             },
//             pattern: {
//               // Regex: at least one uppercase, one lowercase, one number, one special char
//               value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//               message: "Password must contain uppercase, lowercase, number, and special character"
//             }
//           })} 
//         />
//         {errors.password && <span className="error">{errors.password.message}</span>}
//       </div>
//
//       {/* AGE FIELD */}
//       <div>
//         <label>Age:</label>
//         <input 
//           type="number"
//           {...register("age", { 
//             required: "Age is required",
//             min: { 
//               value: 18, 
//               message: "You must be at least 18 years old" 
//             },
//             max: { 
//               value: 120, 
//               message: "Please enter a valid age" 
//             }
//           })} 
//         />
//         {errors.age && <span className="error">{errors.age.message}</span>}
//       </div>
//
//       {/* WEBSITE URL FIELD */}
//       <div>
//         <label>Website:</label>
//         <input 
//           {...register("website", { 
//             pattern: {
//               value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,  // Regex: valid URL
//               message: "Please enter a valid URL"
//             }
//           })} 
//           placeholder="https://example.com"
//         />
//         {errors.website && <span className="error">{errors.website.message}</span>}
//       </div>
//
//       {/* POSTAL CODE FIELD */}
//       <div>
//         <label>Postal Code:</label>
//         <input 
//           {...register("postalCode", { 
//             required: "Postal code is required",
//             pattern: {
//               value: /^\d{5}(-\d{4})?$/,                         // Regex: US ZIP code format
//               message: "Please enter a valid postal code (e.g., 12345 or 12345-6789)"
//             }
//           })} 
//         />
//         {errors.postalCode && <span className="error">{errors.postalCode.message}</span>}
//       </div>
//
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
//
// COMMON REGEX PATTERNS EXPLAINED:
//
// 1. Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
//    - ^ = start of string
//    - [A-Z0-9._%+-]+ = one or more letters, numbers, or special chars before @
//    - @ = literal @ symbol
//    - [A-Z0-9.-]+ = domain name
//    - \. = literal dot
//    - [A-Z]{2,} = top-level domain (at least 2 letters)
//    - $ = end of string
//    - i = case insensitive
//
// 2. Phone: /^[0-9]{10}$/
//    - ^ = start of string
//    - [0-9]{10} = exactly 10 digits
//    - $ = end of string
//
// 3. Strong Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//    - (?=.*[a-z]) = at least one lowercase letter (lookahead)
//    - (?=.*[A-Z]) = at least one uppercase letter (lookahead)
//    - (?=.*\d) = at least one digit (lookahead)
//    - (?=.*[@$!%*?&]) = at least one special character (lookahead)
//    - [A-Za-z\d@$!%*?&]{8,} = at least 8 characters from allowed set
//
// 4. Username: /^[a-zA-Z0-9_]+$/
//    - ^ = start of string
//    - [a-zA-Z0-9_]+ = one or more letters, numbers, or underscores
//    - $ = end of string
//
// VALIDATION MODES:
//
// - mode: 'onSubmit' (default) - Validate when form is submitted
// - mode: 'onBlur' - Validate when user leaves the field
// - mode: 'onChange' - Validate on every keystroke
// - mode: 'onTouched' - Validate after field is touched and on submit
// - mode: 'all' - Validate on blur and change
//
// ERROR HANDLING:
//
// - errors object contains all validation errors
// - Each field's error is accessed via errors.fieldName
// - errors.fieldName.message contains the custom error message
// - Conditionally render error messages: {errors.fieldName && <span>{errors.fieldName.message}</span>}
//
// BEST PRACTICES:
//
// 1. Always provide clear, user-friendly error messages
// 2. Use appropriate validation modes (onBlur is often best for UX)
// 3. Test regex patterns thoroughly
// 4. Provide placeholder text to guide users
// 5. Use proper input types (email, number, tel, etc.)
// 6. Consider accessibility (labels, ARIA attributes)
// 7. Handle loading states during form submission
// 8. Reset form after successful submission if needed






// NOTES ON LOCAL STORAGE IN JAVASCRIPT
//
// Local Storage is a web storage API that allows you to store key-value pairs in a web browser
// with no expiration date. The data persists even after the browser is closed and reopened.
//
// KEY CHARACTERISTICS:
// 1. Storage Limit: Typically 5-10MB per domain (varies by browser)
// 2. Synchronous API: Operations are blocking
// 3. String-only Storage: All data must be stored as strings
// 4. Same-origin Policy: Data is accessible only from the same domain/protocol/port
// 5. Persistent: Data remains until explicitly deleted
// 6. Client-side Only: Data is not sent to server with HTTP requests
//
// BASIC LOCAL STORAGE METHODS:
//
// 1. localStorage.setItem(key, value)
//    - Stores a value with a specified key
//    - Example: localStorage.setItem('username', 'john_doe');
//
// 2. localStorage.getItem(key)
//    - Retrieves the value associated with a key
//    - Returns null if key doesn't exist
//    - Example: const username = localStorage.getItem('username');
//
// 3. localStorage.removeItem(key)
//    - Removes a specific item from storage
//    - Example: localStorage.removeItem('username');
//
// 4. localStorage.clear()
//    - Removes all items from storage
//    - Example: localStorage.clear();
//
// 5. localStorage.key(index)
//    - Returns the key at a specific index
//    - Example: const firstKey = localStorage.key(0);
//
// 6. localStorage.length
//    - Returns the number of items stored
//    - Example: console.log(localStorage.length);
//
// STORING COMPLEX DATA (OBJECTS AND ARRAYS):
//
// Since localStorage only stores strings, you must serialize objects/arrays to JSON:
//
// Storing an object:
// const user = { name: 'John', age: 30, email: 'john@example.com' };
// localStorage.setItem('user', JSON.stringify(user));
//
// Retrieving an object:
// const storedUser = JSON.parse(localStorage.getItem('user'));
// console.log(storedUser.name); // 'John'
//
// Storing an array:
// const todos = ['Buy milk', 'Walk dog', 'Code'];
// localStorage.setItem('todos', JSON.stringify(todos));
//
// Retrieving an array:
// const storedTodos = JSON.parse(localStorage.getItem('todos'));
// console.log(storedTodos[0]); // 'Buy milk'
//
// ERROR HANDLING:
//
// Always wrap localStorage operations in try-catch blocks:
// try {
//   localStorage.setItem('key', 'value');
// } catch (error) {
//   console.error('Storage failed:', error);
//   // Handle quota exceeded, privacy mode, etc.
// }
//
// COMMON USE CASES:
// 1. Saving user preferences (theme, language)
// 2. Caching data to reduce API calls
// 3. Storing form data to prevent loss on page refresh
// 4. Maintaining authentication tokens
// 5. Saving shopping cart items
// 6. Storing user progress in applications
//
// SECURITY CONSIDERATIONS:
// 1. Never store sensitive data (passwords, credit cards) in localStorage
// 2. Data is accessible via JavaScript (vulnerable to XSS attacks)
// 3. Use encryption for sensitive but necessary data
// 4. Consider using httpOnly cookies for authentication tokens
//
// EXAMPLE 1: SIMPLE COUNTER WITH LOCAL STORAGE
//
// import React, { useState, useEffect } from 'react';
//
// function CounterWithStorage() {
//   // Initialize state from localStorage or default to 0
//   const [count, setCount] = useState(() => {
//     const savedCount = localStorage.getItem('counter');
//     return savedCount ? parseInt(savedCount) : 0;
//   });
//
//   // Save to localStorage whenever count changes
//   useEffect(() => {
//     localStorage.setItem('counter', count.toString());
//   }, [count]);
//
//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);
//   const reset = () => setCount(0);
//
//   return (
//     <div>
//       <h2>Counter: {count}</h2>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//       <button onClick={reset}>Reset</button>
//       <p>Counter value persists even after page refresh!</p>
//     </div>
//   );
// }
//
// EXAMPLE 2: USEREF WITH LOCAL STORAGE - FOCUS TRACKING
//
// import React, { useRef, useEffect } from 'react';
//
// function TextInputWithStoredFocus() {
//   const inputRef = useRef(null);
//
//   useEffect(() => {
//     // Check if this input was previously focused
//     const wasFocused = localStorage.getItem('inputWasFocused');
//     
//     if (wasFocused === 'true' && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);
//
//   const handleFocus = () => {
//     // Store focus state in localStorage
//     localStorage.setItem('inputWasFocused', 'true');
//   };
//
//   const handleBlur = () => {
//     // Clear focus state when user leaves input
//     localStorage.setItem('inputWasFocused', 'false');
//   };
//
//   return (
//     <div>
//       <input 
//         ref={inputRef} 
//         type="text" 
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         placeholder="This input remembers if it was focused"
//       />
//     </div>
//   );
// }
//
// EXAMPLE 3: USEREF WITH LOCAL STORAGE - TIMER WITH PERSISTENCE
//
// import React, { useState, useRef, useEffect } from 'react';
//
// function PersistentTimer() {
//   const intervalRef = useRef(null);
//   
//   // Load saved seconds from localStorage
//   const [seconds, setSeconds] = useState(() => {
//     const saved = localStorage.getItem('timerSeconds');
//     return saved ? parseInt(saved) : 0;
//   });
//
//   const [isRunning, setIsRunning] = useState(() => {
//     const savedState = localStorage.getItem('timerIsRunning');
//     return savedState === 'true';
//   });
//
//   // Save seconds to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('timerSeconds', seconds.toString());
//   }, [seconds]);
//
//   // Save running state to localStorage
//   useEffect(() => {
//     localStorage.setItem('timerIsRunning', isRunning.toString());
//   }, [isRunning]);
//
//   // Resume timer if it was running before page refresh
//   useEffect(() => {
//     if (isRunning) {
//       startTimer();
//     }
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isRunning]);
//
//   const startTimer = () => {
//     if (!intervalRef.current) {
//       intervalRef.current = setInterval(() => {
//         setSeconds(s => s + 1);
//       }, 1000);
//       setIsRunning(true);
//     }
//   };
//
//   const stopTimer = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//       setIsRunning(false);
//     }
//   };
//
//   const resetTimer = () => {
//     stopTimer();
//     setSeconds(0);
//     localStorage.removeItem('timerSeconds');
//     localStorage.removeItem('timerIsRunning');
//   };
//
//   return (
//     <div>
//       <h2>Persistent Timer</h2>
//       <p>Seconds: {seconds}</p>
//       <button onClick={startTimer} disabled={isRunning}>Start</button>
//       <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
//       <button onClick={resetTimer}>Reset</button>
//       <p>Timer state persists across page refreshes!</p>
//     </div>
//   );
// }
//
// EXAMPLE 4: REACT-HOOK-FORM WITH LOCAL STORAGE - AUTO-SAVE FORM
//
// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
//
// function AutoSaveRegistrationForm() {
//   const STORAGE_KEY = 'registrationFormData';
//
//   // Load saved form data from localStorage
//   const getSavedFormData = () => {
//     try {
//       const saved = localStorage.getItem(STORAGE_KEY);
//       return saved ? JSON.parse(saved) : {};
//     } catch (error) {
//       console.error('Error loading form data:', error);
//       return {};
//     }
//   };
//
//   const { 
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset
//   } = useForm({
//     defaultValues: getSavedFormData() // Load saved data as default values
//   });
//
//   // Watch all form fields
//   const watchedFields = watch();
//
//   // Auto-save form data to localStorage whenever fields change
//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedFields));
//     } catch (error) {
//       console.error('Error saving form data:', error);
//     }
//   }, [watchedFields]);
//
//   const onSubmit = (data) => {
//     console.log('Form submitted:', data);
//     // Submit to API here
//     
//     // Clear saved form data after successful submission
//     localStorage.removeItem(STORAGE_KEY);
//     reset(); // Reset form
//     alert('Form submitted successfully!');
//   };
//
//   const clearSavedData = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     reset({
//       username: '',
//       email: '',
//       password: ''
//     });
//     alert('Saved form data cleared!');
//   };
//
//   return (
//     <div>
//       <h2>Auto-Save Registration Form</h2>
//       <p>Your progress is automatically saved!</p>
//       
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Username:</label>
//           <input 
//             {...register("username", { 
//               required: "Username is required",
//               minLength: { value: 3, message: "Minimum 3 characters" }
//             })} 
//           />
//           {errors.username && <span className="error">{errors.username.message}</span>}
//         </div>
//
//         <div>
//           <label>Email:</label>
//           <input 
//             {...register("email", { 
//               required: "Email is required",
//               pattern: { 
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Invalid email address"
//               }
//             })} 
//           />
//           {errors.email && <span className="error">{errors.email.message}</span>}
//         </div>
//
//         <div>
//           <label>Password:</label>
//           <input 
//             type="password"
//             {...register("password", { 
//               required: "Password is required",
//               minLength: { value: 8, message: "Minimum 8 characters" }
//             })} 
//           />
//           {errors.password && <span className="error">{errors.password.message}</span>}
//         </div>
//
//         <button type="submit">Register</button>
//         <button type="button" onClick={clearSavedData}>Clear Saved Data</button>
//       </form>
//     </div>
//   );
// }
//
// EXAMPLE 5: COMPREHENSIVE FORM WITH LOCAL STORAGE AND VALIDATION
//
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
//
// function ComprehensiveFormWithStorage() {
//   const STORAGE_KEY = 'comprehensiveFormData';
//   const SUBMISSION_HISTORY_KEY = 'formSubmissionHistory';
//
//   // Load saved form data
//   const loadFormData = () => {
//     try {
//       const saved = localStorage.getItem(STORAGE_KEY);
//       return saved ? JSON.parse(saved) : {
//         username: '',
//         email: '',
//         phone: '',
//         password: '',
//         age: '',
//         website: '',
//         postalCode: ''
//       };
//     } catch (error) {
//       console.error('Error loading form data:', error);
//       return {};
//     }
//   };
//
//   const [submissionHistory, setSubmissionHistory] = useState(() => {
//     try {
//       const saved = localStorage.getItem(SUBMISSION_HISTORY_KEY);
//       return saved ? JSON.parse(saved) : [];
//     } catch (error) {
//       return [];
//     }
//   });
//
//   const { 
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset
//   } = useForm({
//     mode: 'onBlur',
//     defaultValues: loadFormData()
//   });
//
//   const watchedFields = watch();
//
//   // Auto-save form data
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       try {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedFields));
//       } catch (error) {
//         console.error('Error saving form data:', error);
//       }
//     }, 500); // Debounce: save 500ms after user stops typing
//
//     return () => clearTimeout(timeoutId);
//   }, [watchedFields]);
//
//   const onSubmit = (data) => {
//     console.log('Form Data:', data);
//
//     // Add submission to history with timestamp
//     const submission = {
//       ...data,
//       timestamp: new Date().toISOString(),
//       id: Date.now()
//     };
//
//     const newHistory = [...submissionHistory, submission];
//     setSubmissionHistory(newHistory);
//
//     try {
//       // Save submission history
//       localStorage.setItem(SUBMISSION_HISTORY_KEY, JSON.stringify(newHistory));
//       
//       // Clear current form data
//       localStorage.removeItem(STORAGE_KEY);
//       
//       // Reset form
//       reset();
//       
//       alert('Form submitted successfully!');
//     } catch (error) {
//       console.error('Error saving submission:', error);
//       alert('Error saving submission. Storage might be full.');
//     }
//   };
//
//   const clearFormData = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     reset({
//       username: '',
//       email: '',
//       phone: '',
//       password: '',
//       age: '',
//       website: '',
//       postalCode: ''
//     });
//   };
//
//   const clearHistory = () => {
//     localStorage.removeItem(SUBMISSION_HISTORY_KEY);
//     setSubmissionHistory([]);
//
