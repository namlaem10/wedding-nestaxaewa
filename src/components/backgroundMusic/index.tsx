import { useEffect, useRef, useState } from "react"; // Update this import

const playlist = [
  "/musics/lover1.mp3",
  "/musics/lover1.mp3",
  "/musics/lover1.mp3",
];

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Set initial state to false
  const [showModal, setShowModal] = useState(true); // Start with modal visible

  const handleUserChoice = (wantsMusic: boolean) => {
    setShowModal(false);
    if (wantsMusic) {
      audioRef.current
        ?.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Playback failed:", error));
    }
  };

  // Handle song ending and auto-play next song
  useEffect(() => {
    const audio = audioRef.current;

    const handleSongEnd = () => {
      setCurrentSongIndex((prevIndex) =>
        prevIndex === playlist.length - 1 ? 0 : prevIndex + 1
      );
    };

    audio?.addEventListener("ended", handleSongEnd);

    return () => {
      audio?.removeEventListener("ended", handleSongEnd);
    };
  }, []);

  // Update the audio source useEffect to handle play() as a promise
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex];
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [currentSongIndex, isPlaying]);

  const startPlaying = async () => {
    try {
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
      console.error("Failed to play:", error);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 rounded-xl p-8 max-w-sm w-full mx-4 animate-fade-in shadow-xl">
            <h2 className="text-2xl font-serif mb-4 text-center">
              Background Music
            </h2>
            <p className="text-gray-600 mb-8 text-center font-light">
              Would you like to enhance your experience with some background
              music?
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleUserChoice(true)}
                className="w-full py-3 px-6 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Yes, play music
              </button>
              <button
                onClick={() => handleUserChoice(false)}
                className="w-full py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-800"
              >
                No, thanks
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <audio ref={audioRef}>
          <source src={playlist[currentSongIndex]} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <button
          onClick={toggleMusic}
          className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        >
          {isPlaying ? (
            "🎵"
          ) : (
            <span className="relative">
              🎵
              <span className="absolute left-0 right-0 top-1/2 border-t-2 border-red-500 transform -rotate-45"></span>
            </span>
          )}
        </button>
      </div>
    </>
  );
};
