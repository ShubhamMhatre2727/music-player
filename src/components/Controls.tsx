import { Slider } from "@/components/ui/slider";
import { currentSongState } from "@/state/songsAtom";
import { songsCountState } from "@/state/songsSelector";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// This component is used to control the music player
// It shows the song title, artist name, current time, duration, and controls for playing, pausing, and seeking the song
// It also includes a slider to seek specific parts of the song
function Controls({audio}:{audio:HTMLAudioElement}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
    console.log(currentSong);
    const songsCount = useRecoilValue(songsCountState)

    useEffect(() => {

    function updateProgress() {
      setProgress((audio.currentTime / audio.duration) * 100);
    }

    function handleEnded() {
        setProgress(0);        
        // Automatically play the next song when the current one ends
        setCurrentSong((prev) => (prev+1)%songsCount);
        setIsPlaying(false)
    }

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    
    return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleEnded);
    };
  }, []);

    function handlePlayPause() {
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    }else{
      audio.pause();
      setIsPlaying(false)
    }
  }



    function handleSeek(e: number[]){
    if (audio) {
      const newProgress = e[0];
      setProgress(newProgress);
      const newTime = (newProgress / 100) * audio.duration;
      audio.currentTime = newTime;
    }
  }

  function handlePlayPack(i : number){
    // setProgress(0);
    // Get current song index from currentAudio's dataset or default to 0
    setCurrentSong((prev)=> Math.max(0, (prev+i)%songsCount));
    setIsPlaying(false)
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
            (audio) &&
            <div className="flex items-center justify-between">
            <span className="text-sm text-[#ffffff60]">{((audio?.currentTime)/60)?.toFixed(2)}</span>
            <span className="text-sm text-[#ffffff60]">{((audio?.duration)/60).toFixed(2)}</span>
          </div>
          }
        </div>

      {/* this part shows the controls for the music player */}
      <div className="flex justify-between items-center">
        <img src="/images/add.png" alt="add" />
        <div className="flex items-center">
          <img
            src="/images/forward.png"
            alt="backward"
            className="rotate-180"
            onClick={()=>handlePlayPack(-1)}
          />
          {
            !isPlaying ?
            <img src="/images/play.png" alt="play" onClick={handlePlayPause} className="" />
            :
            <img src="/images/pause.png" alt="pause" onClick={handlePlayPause} className="" />
          }
          <img src="/images/forward.png" alt="forward" className="" onClick={()=>handlePlayPack(1)} />
        </div>
        <img src="/images/mic.png" alt="mic" />
      </div>
    </div>
  );
}

export default Controls;
