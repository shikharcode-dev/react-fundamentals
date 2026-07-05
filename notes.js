// ============================================================================
// FORM HANDLING IN REACT - COMPREHENSIVE GUIDE
// ============================================================================

// CONCEPT: Form handling in React involves managing user input using React Hooks
// React uses a declarative approach with state management instead of direct DOM manipulation
// We use hooks like useState, useRef, and custom hooks to handle form data and validation
// onKeyDown is an event that fires when a user presses a key while focused on an element

// ============================================================================
// REACT HOOKS USED IN FORM HANDLING
// ============================================================================

// 1. useState: Manages component state (form data, errors, validation status)
// 2. useRef: Direct access to DOM elements without re-rendering
// 3. useEffect: Side effects like validation on mount or data changes
// 4. Custom Hooks: Reusable form logic across components

// ============================================================================
// EXAMPLE: THREE APPROACHES TO FORM HANDLING WITH onKeyDown IN REACT
// ============================================================================

// ----------------------------------------------------------------------------
// APPROACH 1: BRUTE FORCE APPROACH (Individual State for Each Field)
// ----------------------------------------------------------------------------
// Description: Separate useState for each input field
// Characteristics:
// - Repetitive state declarations
// - Hard to maintain and scale
// - No reusability
// - Violates DRY (Don't Repeat Yourself) principle

import React, { useState } from 'react';

function BruteForceForm() {
    // Separate state for each field - REPETITIVE CODE
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    // Separate error state for each field
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    
    // Separate event handler for each field - REPETITIVE CODE
    const handleFirstNameKeyDown = (event) => {
        console.log('First Name key pressed:', event.key);
        
        if (event.key === 'Enter') {
            console.log('First Name value:', firstName);
            // Validation logic for first name
            if (firstName.trim().length < 2) {
                setFirstNameError('First name must be at least 2 characters');
            } else {
                setFirstNameError('');
            }
        }
    };
    
    const handleLastNameKeyDown = (event) => {
        console.log('Last Name key pressed:', event.key);
        
        if (event.key === 'Enter') {
            console.log('Last Name value:', lastName);
            // Validation logic for last name
            if (lastName.trim().length < 2) {
                setLastNameError('Last name must be at least 2 characters');
            } else {
                setLastNameError('');
            }
        }
    };
    
    const handleEmailKeyDown = (event) => {
        console.log('Email key pressed:', event.key);
        
        if (event.key === 'Enter') {
            console.log('Email value:', email);
            // Validation logic for email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
            }
        }
    };
    
    const handlePhoneKeyDown = (event) => {
        console.log('Phone key pressed:', event.key);
        
        // Only allow numbers in phone field
        if (!/[0-9]/.test(event.key) && 
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(event.key)) {
            event.preventDefault();
        }
        
        if (event.key === 'Enter') {
            console.log('Phone value:', phone);
            // Validation logic for phone
            if (phone.length < 10) {
                setPhoneError('Phone number must be at least 10 digits');
            } else {
                setPhoneError('');
            }
        }
    };
    
    return (
        <form>
            <div>
                <label>First Name:</label>
                <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={handleFirstNameKeyDown}
                />
                {firstNameError && <div className="error-message">{firstNameError}</div>}
            </div>
            
            <div>
                <label>Last Name:</label>
                <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyDown={handleLastNameKeyDown}
                />
                {lastNameError && <div className="error-message">{lastNameError}</div>}
            </div>
            
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleEmailKeyDown}
                />
                {emailError && <div className="error-message">{emailError}</div>}
            </div>
            
            <div>
                <label>Phone:</label>
                <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={handlePhoneKeyDown}
                />
                {phoneError && <div className="error-message">{phoneError}</div>}
            </div>
            
            <button type="submit">Submit</button>
        </form>
    );
}

// PROBLEMS WITH BRUTE FORCE:
// 1. Too many useState declarations - one for each field and error
// 2. Code duplication - same logic repeated multiple times
// 3. Difficult to update - changes must be made in multiple places
// 4. Poor scalability - adding new fields requires more repetitive code
// 5. Component becomes very large and hard to read

// ----------------------------------------------------------------------------
// APPROACH 2: BETTER APPROACH (Single State Object)
// ----------------------------------------------------------------------------
// Description: Using a single state object to manage all form data
// Characteristics:
// - Single useState for all form fields
// - Reusable validation functions
// - Better organization and maintainability
// - Follows DRY principle

import React, { useState } from 'react';

function BetterForm() {
    // Single state object for all form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    
    // Single state object for all errors
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    
    // Reusable function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    // Reusable validation functions
    const validateName = (value, fieldName) => {
        if (value.trim().length < 2) {
            return `${fieldName} must be at least 2 characters`;
        }
        return '';
    };
    
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Invalid email format';
        }
        return '';
    };
    
    const validatePhone = (value) => {
        if (value.length < 10) {
            return 'Phone number must be at least 10 digits';
        }
        return '';
    };
    
    // Single keydown handler for all fields
    const handleKeyDown = (event) => {
        const { name, value } = event.target;
        
        console.log(`Key pressed in ${name}:`, event.key);
        
        // Restrict phone field to numbers only
        if (name === 'phone' && 
            !/[0-9]/.test(event.key) && 
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(event.key)) {
            event.preventDefault();
            return;
        }
        
        // Validate on Enter key
        if (event.key === 'Enter') {
            event.preventDefault();
            
            let errorMessage = '';
            
            // Field-specific validation based on name
            switch(name) {
                case 'firstName':
                    errorMessage = validateName(value, 'First name');
                    break;
                case 'lastName':
                    errorMessage = validateName(value, 'Last name');
                    break;
                case 'email':
                    errorMessage = validateEmail(value);
                    break;
                case 'phone':
                    errorMessage = validatePhone(value);
                    break;
                default:
                    break;
            }
            
            // Update error state
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: errorMessage
            }));
            
            console.log(`${name} value:`, value);
        }
    };
    
    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Validate all fields
        const newErrors = {
            firstName: validateName(formData.firstName, 'First name'),
            lastName: validateName(formData.lastName, 'Last name'),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone)
        };
        
        setErrors(newErrors);
        
        // Check if form is valid
        const isValid = Object.values(newErrors).every(error => error === '');
        
        if (isValid) {
            console.log('Form is valid, submitting...');
            console.log('Form data:', formData);
            // Submit form or make API call here
        } else {
            console.log('Form has validation errors');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>
            
            <div>
                <label>Last Name:</label>
                <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
            
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div>
                <label>Phone:</label>
                <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
            
            <button type="submit">Submit</button>
        </form>
    );
}

// ADVANTAGES OF BETTER APPROACH:
// 1. Single state object - easier to manage and pass to other components
// 2. Reusable handlers - one function handles all inputs
// 3. Centralized logic - changes in one place affect all fields
// 4. More readable and organized code
// 5. Easier to debug - fewer functions to check

// REMAINING ISSUES:
// 1. Still some repetitive JSX for each input field
// 2. Validation logic could be more modular
// 3. Not using advanced React patterns like custom hooks

// ----------------------------------------------------------------------------
// APPROACH 3: OPTIMIZED APPROACH (Custom Hook + Dynamic Rendering)
// ----------------------------------------------------------------------------
// Description: Using custom hooks for reusable form logic
// Characteristics:
// - Custom hook encapsulates all form logic
// - Dynamic field rendering reduces JSX repetition
// - Most efficient and scalable solution
// - Easy to reuse across multiple components

import React, { useState } from 'react';

// Custom Hook for Form Handling
// This hook provides a complete form management solution with validation, error handling, and keyboard events
// It accepts initial values and validation rules, returning all necessary form state and handlers
function useForm(initialValues, validationRules) {
    // State for form data
    const [values, setValues] = useState(initialValues);
    
    // State for errors
    const [errors, setErrors] = useState({});
    
    // State for touched fields (to show errors only after user interaction)
    const [touched, setTouched] = useState({});
    
    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };
    
    // Handle keydown events
    const handleKeyDown = (event) => {
        const { name, value } = event.target;
        
        console.log(`Key pressed in ${name}:`, event.key);
        
        // Get field-specific rules
        const fieldRules = validationRules[name];
        
        // Apply input restrictions
        if (fieldRules?.restrict) {
            if (!fieldRules.restrict(event.key)) {
                event.preventDefault();
                return;
            }
        }
        
        // Validate on Enter key
        if (event.key === 'Enter') {
            event.preventDefault();
            validateField(name, value);
        }
    };
    
    // Validate a single field
    const validateField = (name, value) => {
        const fieldRules = validationRules[name];
        
        if (fieldRules?.validate) {
            const errorMessage = fieldRules.validate(value);
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: errorMessage
            }));
            setTouched(prevTouched => ({
                ...prevTouched,
                [name]: true
            }));
            return errorMessage === '';
        }
        
        return true;
    };
    
    // Validate all fields
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const errorMessage = validationRules[fieldName].validate(values[fieldName]);
            if (errorMessage) {
                newErrors[fieldName] = errorMessage;
                isValid = false;
            }
        });
        
        setErrors(newErrors);
        setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
        
        return isValid;
    };
    
    // Reset form
    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };
    
    return {
        values,
        errors,
        touched,
        handleChange,
        handleKeyDown,
        validateField,
        validateForm,
        resetForm
    };
}

// Optimized Form Component using Custom Hook
function OptimizedForm() {
    // Define validation rules for each field
    const validationRules = {
        firstName: {
            validate: (value) => {
                if (value.trim().length < 2) {
                    return 'First name must be at least 2 characters';
                }
                return '';
            }
        },
        lastName: {
            validate: (value) => {
                if (value.trim().length < 2) {
                    return 'Last name must be at least 2 characters';
                }
                return '';
            }
        },
        email: {
            validate: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return 'Invalid email format';
                }
                return '';
            }
        },
        phone: {
            validate: (value) => {
                if (value.length < 10) {
                    return 'Phone number must be at least 10 digits';
                }
                return '';
            },
            restrict: (key) => {
                // Only allow numbers and control keys
                return /[0-9]/.test(key) || 
                       ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(key);
            }
        }
    };
    
    // Initialize form with custom hook
    const {
        values,
        errors,
        touched,
        handleChange,
        handleKeyDown,
        validateForm,
        resetForm
    } = useForm(
        {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        validationRules
    );
    
    // Define form fields configuration for dynamic rendering
    const formFields = [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter your first name'
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter your last name'
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email'
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'tel',
            placeholder: 'Enter your phone number'
        }
    ];
    
    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const isValid = validateForm();
        
        if (isValid) {
            console.log('Form is valid, submitting...');
            console.log('Form data:', values);
            // Submit form or make API call here
            alert('Form submitted successfully!');
            resetForm();
        } else {
            console.log('Form has validation errors');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {formFields.map((field) => (
                <div key={field.name}>
                    <label>{field.label}:</label>
                    <input 
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={values[field.name]}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    {touched[field.name] && errors[field.name] && (
                        <div className="error-message">{errors[field.name]}</div>
                    )}
                </div>
            ))}
            
            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={resetForm}>Reset</button>
            </div>
        </form>
    );
}

// ADVANTAGES OF OPTIMIZED APPROACH:
// 1. Custom Hook - Reusable form logic across multiple components
// 2. Dynamic Rendering - No repetitive JSX, fields defined in configuration array
// 3. Centralized Validation - All validation rules in one place
// 4. Better UX - Shows errors only after field is touched
// 5. Scalable - Easy to add new fields by updating configuration
// 6. Maintainable - Changes to form logic happen in one place (custom hook)
// 7. Testable - Custom hook can be tested independently
// 8. Clean Component - Component focuses on rendering, logic is in the hook

// USAGE EXAMPLE:
// Export the component to use it in your application
export default OptimizedForm;

// You can also export the custom hook to use it in other forms
export { useForm };
