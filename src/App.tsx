import Player from "./components/Player"
import Songs from "./components/Songs"

function App() {

  return (
    <div className="bg-black h-screen text-white sm:flex flex-row-reverse">
      <Player/>
      <Songs/>
    </div>
    
  )
}

export default App