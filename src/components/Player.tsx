import { useEffect, useRef } from "react";
import Controls from "./Controls";
import VolumeControl from "./VolumeControl";
import type { Song } from "@/types";


function Player({ songs, currentSong, setCurrentSong }: { songs: Song[], currentSong: number, setCurrentSong: (song: number) => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(()=>{
    if (audioRef.current) {
      audioRef.current.play();
    }
  },[currentSong])


  return (
    <div className="h-full py-10 px-6 relative z-0">
      <img
        src={songs[currentSong]?.imagePath}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 blur-3xl"
      />
      <div className=" h-10 flex justify-center items-center text-lg font-semibold text-[#fff] text-shadow-lg shadow-black">
        <h2 className="">Now Playing</h2>
      </div>

      <div className="h-96 flex flex-col justify-center items-center gap-4">
        <img
          src={songs[currentSong]?.imagePath}
          alt=""
          className="w-2/3 aspect-square drop-shadow-2xl"
        />

        {audioRef.current && <VolumeControl currentAudio={audioRef.current} />}
      </div>

      <audio ref={audioRef} src={songs[currentSong]?.path} preload="auto" />

      <div className="h-50">
        <div className="text-shadow-lg shadow-black">
          <h3 className="text-3xl font-semibold">{songs[currentSong]?.title}</h3>
          <p className=" ">{songs[currentSong]?.artists.join(", ")}</p>
        </div>

        {audioRef.current && <Controls currentAudio={audioRef.current} setCurrentSong={setCurrentSong} />}
      </div>
    </div>
  );
}

export default Player;
