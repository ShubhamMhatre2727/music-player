import { useEffect, useState, type RefObject } from "react";

function VolumeControl({
  audioRef,
}: {
  audioRef: RefObject<HTMLAudioElement> | any;
}) {
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume, audioRef.current]);

  return (
    <div className="flex items-center justify-center gap-2">
      <img
        src="src/assets/volumedown.svg"
        alt=""
        className="brightness-125"
        onClick={() => setVolume(Math.max(volume - 10, 0))}
      />
      <progress value={volume} max="100" className="h-1" />
      <img
        src="src/assets/volumeup.svg"
        alt=""
        className="brightness-125"
        onClick={() => setVolume(Math.min(volume + 10, 100))}
      />
    </div>
  );
}

export default VolumeControl;
