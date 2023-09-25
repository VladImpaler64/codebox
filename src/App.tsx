import './App.css'
import { Editor } from './components/Editor.tsx'
import { Nav } from './components/Nav.tsx'
import { Menu } from "./components/Menu.tsx"

function App() { // We'll be rendering a single component
window.addEventListener("load", (e)=>{
  console.log("se pudo");
  window.Telegram.WebApp.expand();
})
  return (
    <>
      <Nav />
      <Editor />
    </>
  )
}

export default App
