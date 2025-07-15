import { db } from "@/firebase";
import type { Song } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { atom } from "recoil";

async function fetchCurrentSong() {
      const songsSnapshot = await getDocs(collection(db, 'songs'));
      const songsList: Song[] = songsSnapshot.docs.map((doc) => doc.data() as Song);
        return songsList
    }

export const songsState = atom<Song[]>({
    key: 'songsState',
    default: fetchCurrentSong(),
});

export const currentSongState = atom<number>({
    key: 'currentSongState',
    default: 0
})