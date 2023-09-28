import './App.css'
import { Editor } from './components/Editor.tsx'
import { Nav } from './components/Nav.tsx'
import { Menu } from "./components/Menu.tsx"
import { Donation } from "./components/Donation.tsx"

function App() { // We'll be rendering a two components


  return (
    <>
      <Nav />
      <Editor />
    </>
  )
}

export default App
