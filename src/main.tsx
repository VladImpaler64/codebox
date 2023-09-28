import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This is where we start all calls to webapp interface
document.addEventListener("DOMContentLoaded", (e)=>{ // After all the content of the DOM has load we start config of our Telegram mini app
  let webapp = window.Telegram.WebApp; // For convinient calling the webapp interface
  webapp.expand(); // This method will spand the webapp, it's convinient if your webapp needs all the space available
  webapp.BackButton.show();
  webapp.enableClosingConfirmation();

// CloudStorage is used for fetching previous buffer data, if the user exited the mini app with out making any action
  let buffered;
  try {
    buffered = webapp.CloudStorage.getItem("buffer_data");
  } catch(e){
    buffered = "";
  }
  document.querySelector(".textcode").value = buffered;  // Styling the mini app with user theme colors

  console.log(webapp.colorScheme, webapp.themeParams); // We separete our styling in two main modes, light and dark

  // All event handlers for mini app

});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// This is a simple react template all the components and functions are in component folder, this will start the process of rendering our components
