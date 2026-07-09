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
