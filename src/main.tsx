import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from "@tonconnect/ui-react"; // Connection provider element to TON blockchain with ton connect protocol
const manifest = "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json"; // Manifest must public, it is a description on your contract for it to appear in the ton connect protocol, I'll be using the example manifest

// This is a simple react template all the components and functions are in component folder, this will start the process of rendering our components

// Once DOM is fully loaded we start making all web app function calls
document.addEventListener("DOMContentLoaded", ()=>{
  // Docs: https://core.telegram.org/bots/webapps#initializing-mini-apps

  let webapp = window.Telegram.WebApp; // For convinient calling the webapp interface
  webapp.expand(); // This method will spand the webapp, it's convinient if your webapp needs all the space available
  webapp.enableClosingConfirmation();

// Once all DOM is created we log in last code and config from cloudStorage
  try {

    window.Telegram.WebApp.CloudStorage.getItem("buffer_data", (err, value)=>{
        if (err === null){
          (document.querySelector(".textcode") as HTMLTextAreaElement).value = value || "// To enable proper highlight go to menu and change the language, also font size and color. Enjoy!";
        }
      });
  } catch (err) {
    ;
  }

  try {
    window.Telegram.WebApp.CloudStorage.getItem("config", (err, value)=>{
      if (err === null){
          const config = JSON.parse(value || '{"color": "#888888", "font_size": 3, "lang": "language-rust"}');
          document.querySelector(".textcode")?.setAttribute("style", `color: ${config.color}; font-size: ${config.font_size / 2}rem;`);
          document.querySelector(".editor-numbers")?.setAttribute("style", `color: ${config.color}; font-size: ${config.font_size / 2}rem;`);
          document.querySelector("#lang-hg")?.setAttribute("class", `${config.lang}`);
          (document.querySelector("#input-font_color") as HTMLInputElement).value = config.color;
          (document.querySelector("#input-font_size") as HTMLInputElement).value = config.font_size;
          (document.querySelector("#langs") as HTMLInputElement).value = config.lang;

          console.log("got config", config);
        }
      });
  } catch (err) {
      ;
  }

// Theming the mini app to the user looks
  console.log(webapp.colorScheme, webapp.themeParams); // We separete our styling in two main modes, light and dark
  // If your app needs a personalization make use of themeParams, I am not doing any.

  // All event handlers for mini app
  /* 
      List of events

      themeChanged 	
      viewportChanged 
      mainButtonClicked
      backButtonClicked 	
      settingsButtonClicked 	
      invoiceClosed 	
      popupClosed 
      qrTextReceived 
      clipboardTextReceived 	
      writeAccessRequested 
      contactRequested 
      
      Example

      webapp.onEvent("backButtonClicked", ()=>{
       // Logic
      });
  */

});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifest}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TonConnectUIProvider>,
)

