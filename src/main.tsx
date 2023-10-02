import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This is a simple react template all the components and functions are in component folder, this will start the process of rendering our components

// Once DOM is fully loaded we start making all web app function calls
document.addEventListener("DOMContentLoaded", ()=>{

  let webapp = window.Telegram.WebApp; // For convinient calling the webapp interface
  webapp.expand(); // This method will spand the webapp, it's convinient if your webapp needs all the space available
  webapp.BackButton.show(); // This method makes a callback and when the user press the backbutton is called
  // webapp.enableClosingConfirmation();


// Once all DOM is created we log in last code and config from cloudStorage
  window.Telegram.WebApp.CloudStorage.getItem("buffer_data", (err, value)=>{
    if (err === null){
      (document.querySelector(".textcode") as HTMLTextAreaElement).value = value || "// To enable proper highlight go to menu and change the language, also font size and color. Enjoy!";
    }
  });

  window.Telegram.WebApp.CloudStorage.getItem("config", (err, value)=>{
    console.log(err, value)
    if (err === null){
      let {color, font_size, lang} = JSON.parse(value || '"color": "#888888", "font_size": 2, "lang": "language-rust"');
      document.querySelector(".textcode")?.setAttribute("style", `color: ${color}; font-size: ${font_size / 2}rem;`);
      document.querySelector(".editor-numbers")?.setAttribute("style", `color: ${color}; font-size: ${font_size / 2}rem;`);
      document.querySelector("#lang-hg")?.setAttribute("class", `${lang}`)
    }
  });


// Theming the mini app to the user looks
  console.log(webapp.colorScheme, webapp.themeParams); // We separete our styling in two main modes, light and dark

  // All event handlers for mini app

});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

