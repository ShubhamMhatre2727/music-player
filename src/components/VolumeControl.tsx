import { useEffect, useState } from "react";

function VolumeControl({ currentAudio }: { currentAudio: HTMLAudioElement }) {
    const [volume, setVolume] = useState(50);

    useEffect(() => {
        currentAudio.volume = volume / 100;
    }, [volume, currentAudio]);

    return (
        <div className="flex items-center justify-center gap-2">
            <img src="src/assets/volumedown.svg" alt="" className="" onClick={() => setVolume(Math.max((volume - 10), 0))} />
        <progress value={volume} max="100" className="h-1"/>
        <img src="src/assets/volumeup.svg" alt="" onClick={() => setVolume(Math.min((volume + 10),100))} />
    </div>
  )
}

export default VolumeControl