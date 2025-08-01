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