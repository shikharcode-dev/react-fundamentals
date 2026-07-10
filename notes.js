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
