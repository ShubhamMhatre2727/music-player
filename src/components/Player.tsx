import Controls from "./Controls";
import VolumeControl from "./VolumeControl";
import { useRecoilValue } from "recoil";
import { currentlyPlaying } from "@/state/songsSelector";
import { useEffect } from "react";

const audio = new Audio();

function Player() {
  const song = useRecoilValue(currentlyPlaying);

  if (!song) return null;

  
  
  useEffect(()=>{
    document.title = song.title;
    audio.src = song.path.toLowerCase()
  },[song])

  return (
    <div className="h-full py-10 px-6 relative z-0">
      <img
        src={song.imagePath}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 blur-3xl"
      />
      <div className=" h-10 flex justify-center items-center text-lg font-semibold text-[#fff] text-shadow-lg shadow-black relative">
        <h2 className="">Now Playing</h2>

        <p
          className="absolute left-6 sm:hidden scale-y-[300%] -rotate-90"
          onClick={() => window.scrollTo({ top: 300, behavior: "smooth" })}
        >
          &gt;
        </p>
      </div>

      <div className="h-96 flex flex-col justify-center items-center gap-4">
        <img
          src={song.imagePath}
          alt=""
          className="w-2/3 aspect-square drop-shadow-2xl"
        />

        <VolumeControl audio={audio}/>
      </div>


      <div className="h-50">
        <div className="text-shadow-lg shadow-black">
          <h3 className="text-3xl font-semibold">{song.title}</h3>
          <p className="text-[#fff6]">{song.artists.join(", ")}</p>
          <p className="text-sm text-[#fff6] text-shadow-lg shadow-white">
            {song.album}
          </p>
        </div>

        <Controls audio={audio}/>
      </div>
    </div>
  );
}

export default Player;
