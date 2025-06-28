import {collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

interface Song {
    title: string;
    artists: [string];
    album: string;
    path: string;
    imagePath: string;
}


function Songs() {
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(()=>{
        async function getSongs(){
        const songsSnapshot = await getDocs(collection(db, 'songs'));
        const songsList: Song[] = songsSnapshot.docs.map((doc) => doc.data() as Song);
        setSongs(songsList);
    }
        getSongs();
    },[])

  return (
    <div className='px-6'>
        <h2>Songs</h2>
        <div>
            {
                songs.map((song, index)=>{
                    return (
                        <div key={index} className='border-b border-gray-500 pt-3 flex items-center'>
                            <img src={song.imagePath} alt="" className='w-12'/>
                            <div className='border'>
                                <h3 className='text-lg font-semibold'>
                                {song.title}
                            </h3>
                            <p className='opacity-50 text-sm font-semibold pb-1'>
                                {song.artists.join(", ")}
                            </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Songs