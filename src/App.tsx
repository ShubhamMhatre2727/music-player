import { useEffect, useState } from "react";
import Player from "./components/Player"
import Songs from "./components/Songs"
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { Song } from "./types";

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<number>(0);

  useEffect(()=>{
    async function fetchCurrentSong() {
      const songsSnapshot = await getDocs(collection(db, 'songs'));
      const songsList: Song[] = songsSnapshot.docs.map((doc) => doc.data() as Song);
        setSongs([...songsList]);
    }

    fetchCurrentSong();
  },[])

  return (
    <div className="bg-black h-screen text-white sm:flex flex-row-reverse">
      <Player songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <Songs songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} />
    </div>
    
  )
}

export default App