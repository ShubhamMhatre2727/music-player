import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

// This component is used to control the music player
// It shows the song title, artist name, current time, duration, and controls for playing, pausing, and seeking the song
// It also includes a slider to seek specific parts of the song
function Controls({currentAudio, setCurrentSong}: {currentAudio: HTMLAudioElement, setCurrentSong: (song: number) => void}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);


    useEffect(() => {

    function updateProgress() {
      setProgress((currentAudio.currentTime / currentAudio.duration) * 100);
    }

    function handleEnded() {
        setProgress(0);        
        // Automatically play the next song when the current one ends
        setCurrentSong(prevSong => (prevSong + 1)%18);
    }

    currentAudio.addEventListener("timeupdate", updateProgress);
    currentAudio.addEventListener("ended", handleEnded);
    
    return () => {
        currentAudio.removeEventListener("timeupdate", updateProgress);
        currentAudio.removeEventListener("ended", handleEnded);
    };
  }, []);

    function handlePlayPause() {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setIsPlaying(!isPlaying);
    }
  }



    function handleSeek(e: number[]){
    if (currentAudio) {
      const newProgress = e[0];
      setProgress(newProgress);
      const newTime = (newProgress / 100) * currentAudio.duration;
      currentAudio.currentTime = newTime;
    }
  }

  function handlePlayPack(i : number){
    setProgress(0);        
        // Automatically play the next song when the current one ends
        setCurrentSong(prevSong => Math.max(0,(prevSong + i)%18));
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
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#ffffff60]">{((currentAudio?.currentTime)/60)?.toFixed(2)}</span>
            <span className="text-sm text-[#ffffff60]">{((currentAudio?.duration)/60).toFixed(2)}</span>
          </div>
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
