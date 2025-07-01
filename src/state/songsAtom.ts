import type { Song } from "@/types";
import { atom } from "recoil";

export const songsState = atom<Song[]>({
    key: 'songsState',
    default: []
});

export const currentSongState = atom<number>({
    key: 'currentSongState',
    default: 0
})