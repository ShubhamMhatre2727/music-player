import type{ Song } from "@/types";
import { selector } from "recoil";
import { currentSongState, songsState } from "./songsAtom";

export const currentlyPlaying = selector<Song>({
    key: "currentlyPlaying",
    get: ({get}) => {
        return get(songsState)[get(currentSongState)]
    }
})

export const songsCountState = selector<number>({
    key:'songsCountState',
    get: ({get})=>{
        return get(songsState).length;
    }
})

const audio = new Audio();

export const audioPlayer = selector<HTMLAudioElement>({
    key: 'audioPlayer',
    get: ({get})=>{
        const songPath = get(currentlyPlaying).path;

        // slicing the path because public/ is included in db but it geneerates error in produnction
        console.log(songPath);
        audio.src = songPath;

        return audio
}
})