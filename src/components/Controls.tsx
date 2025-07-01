import { Slider } from "@/components/ui/slider";
import { currentSongState } from "@/state/songsAtom";
import { useEffect, useState, type RefObject } from "react";
import { useRecoilState } from "recoil";

// This component is used to control the music player
// It shows the song title, artist name, current time, duration, and controls for playing, pausing, and seeking the song
// It also includes a slider to seek specific parts of the song
function Controls({audioRef}:{audioRef:RefObject<HTMLAudioElement> | any}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const [currentSong, setCurrentSong] = useRecoilState(currentSongState);

    useEffect(() => {

    function updateProgress() {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }

    function handleEnded() {
        setProgress(0);        
        // Automatically play the next song when the current one ends
        setCurrentSong((prev) => (prev+1)%18);
    }

    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("ended", handleEnded);
    
    return () => {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(()=>{
    if (audioRef.current) {
      audioRef.current.play();
    }
  },[currentSong])

    function handlePlayPause() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }



    function handleSeek(e: number[]){
    if (audioRef.current) {
      const newProgress = e[0];
      setProgress(newProgress);
      const newTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  }

  function handlePlayPack(i : number){
    // setProgress(0);
    // Get current song index from currentAudio's dataset or default to 0
    setCurrentSong((prev)=> Math.max(0, (prev+i)%18));
    setIsPlaying(true)
  }



  return (
    <div className="p-2">

    {/* slider to seek specific part of song */}
        <div className="w-full mt-2 transition-all duration-300 ease-in-out">
          <Slider
            value={[progress]}
            max={100}
            
            trackClassName="bg-transparent border "
            rangeClassName="bg-white"
            thumbClassName="bg-white border-white size-2"
            onValueChange={handleSeek}
          />


          {/* this part shows current time and duration of a song */}
          {
            (audioRef.current) &&
            <div className="flex items-center justify-between">
            <span className="text-sm text-[#ffffff60]">{((audioRef.current?.currentTime)/60)?.toFixed(2)}</span>
            <span className="text-sm text-[#ffffff60]">{((audioRef.current?.duration)/60).toFixed(2)}</span>
          </div>
          }
        </div>

      {/* this part shows the controls for the music player */}
      <div className="flex justify-between items-center">
        <img src="src/assets/add.png" alt="add" />
        <div className="flex items-center">
          <img
            src="src/assets/forward.png"
            alt="backward"
            className="rotate-180"
            onClick={()=>handlePlayPack(-1)}
          />
          {
            !isPlaying ?
            <img src="src/assets/play.png" alt="play" onClick={handlePlayPause} className="" />
            :
            <img src="src/assets/pause.png" alt="pause" onClick={handlePlayPause} className="" />
          }
          <img src="src/assets/forward.png" alt="forward" className="" onClick={()=>handlePlayPack(1)} />
        </div>
        <img src="src/assets/mic.png" alt="mic" />
      </div>
    </div>
  );
}

export default Controls;
