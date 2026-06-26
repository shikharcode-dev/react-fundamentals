//import { StrictMode } from 'react'  // this is react strict mode like we use js strict mode same like that.
import { createRoot } from 'react-dom/client'
import './index.css' // this will import all css files and we can use it in our project
import App from './App.jsx' // this will import App component from App.jsx file

createRoot(document.getElementById('root')).render(<App />) // this is jsx calling the app function other things same like we did last time. normal app function call also work their like -> App(). but problem with that is we need to reload the page when i did any kinda a changes this is kind a bug i think in v8. so best is call it via jsx form like -> (<App />)