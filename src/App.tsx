import { useEffect, useState } from "react";
import Player from "./components/Player"
import Songs from "./components/Songs"
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { Song } from "./types";
import { useRecoilState } from "recoil";
import { songsState } from "./state/songsAtom";

function App() {
  
  const [songs, setSongs] = useRecoilState(songsState);

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
      <Player/>
      <Songs/>
    </div>
    
  )
}

export default App