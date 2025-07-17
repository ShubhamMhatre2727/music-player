import { audioPlayer } from "@/state/songsSelector";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

function VolumeControl() {
  const [volume, setVolume] = useState(50);
  const audio = useRecoilValue(audioPlayer);
  
  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume, audio]);

  return (
    <div className="flex items-center justify-center gap-2">
      <img
        src="/images/volumedown.svg"
        alt=""
        className="brightness-125"
        onClick={() => setVolume(Math.max(volume - 10, 0))}
      />
      <progress value={volume} max="100" className="h-1" />
      <img
        src="/images/volumeup.svg"
        alt=""
        className="brightness-125"
        onClick={() => setVolume(Math.min(volume + 10, 100))}
      />
    </div>
  );
}

export default VolumeControl;
