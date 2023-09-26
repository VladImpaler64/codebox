import './App.css'
import { Editor } from './components/Editor.tsx'
import { Nav } from './components/Nav.tsx'
import { Menu } from "./components/Menu.tsx"
import { Donation } from "./components/Donation.tsx"

function App() { // We'll be rendering a two components

// This is where we start all calls to webapp interface
document.addEventListener("DOMContentLoaded", (e)=>{ // After all the content of the DOM has load we start config of our Telegram mini app
  let webapp = window.Telegram.WebApp; // For convinient calling the webapp interface
  webapp.expand(); // This method will spand the webapp, it's convinient if your webapp needs all the space available
  webapp.BackButton.show();
  webapp.MainButton.show();
  webapp.enableClosingConfirmation();

  // All event handlers for mini app

});

  return (
    <>
      <Nav />
      <Editor />
    </>
  )
}

export default App
