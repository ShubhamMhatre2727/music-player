// this component fetches songs from the firestore database and displays them in a table
// it also shows the song title, artist name, and a delete button (which is not functional yet)

import { currentSongState, songsState } from "@/state/songsAtom"
import { useRecoilState, useRecoilValue } from "recoil"

// the delete button is hidden by default and appears when the user hovers over the row 
function Songs() {
  const songs = useRecoilValue(songsState);
  console.log(songs);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);

  return (
    <div className='px-6 sm:min-w-1/2 md:min-w-2/3 h-full'>
        <img src="src/assets/Music Player.png" alt="" className='pt-6 h-[10%]' />
        <div className="max-h-[85%] overflow-y-auto ">
  <table className="w-full">
    <thead className="text-lg opacity-0 sm:opacity-100">
      <tr className='text-[#ffffff60] '>
        <td className="sticky top-0 bg-black text-start  z-10 ">#</td>
        <td className="sticky top-0 bg-gradient-to-r from-black text-start  z-10 ">Title</td>
        <td className="sticky top-0 bg-gradient-to-r from-black text-start  z-10 hidden md:table-cell">Album</td>
        <td className="sticky top-0 bg-transparent text-start  z-10 "></td>
      </tr>
    </thead>
    <tbody>


      {/* This part shows the list of songs */}
      {
        songs.map((song, index) => (
          <tr key={index} >
        <td className=" text-[#fff5] font-semibold text-lg ">{index + 1}</td>
        <td className=" flex items-center space-x-2 p-2" onClick={() => setCurrentSong(index)}>
          <img src={song.imagePath} alt="" className={ `w-12 h-12 rounded-lg ${index==currentSong && 'slow-spin'}`} />
          <div className="font-semibold">
            <h3 className="text-lg">{song.title}</h3>
            <p className="text-sm text-[#fff5]">{song.artists.join(", ")}</p>
          </div>
        </td>
        <td className="text-[#fff5] hidden md:table-cell" onClick={() => setCurrentSong(index)}>
          {song.album}
        </td>
        <td className="text-[#fff5]" onClick={() => setCurrentSong(index)}>{(song.duration).toFixed(2)} </td>
      </tr>
        ))
      }
    </tbody>
  </table>
</div>




    </div>
  )
}

export default Songs