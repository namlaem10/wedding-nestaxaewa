import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"; // Update this import

const playlist = [
  "/musics/music.mp3",
  "/musics/music.mp3",
  "/musics/music.mp3",
];

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Set initial state to false
  const [showModal, setShowModal] = useState(true); // Start with modal visible
  const router = useRouter(); // Add this

  const handleUserChoice = (language: string) => {
    setShowModal(false);
    // Instead of directly changing language, use Next.js routing
    router.push(router.pathname, router.asPath, { locale: language });

    // Start music after language selection
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch((error) => console.error("Playback failed:", error));
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
          <div className="bg-white/95 rounded-xl p-8 max-w-xl w-full mx-4 animate-fade-in shadow-xl">
            <h4 className="text-3xl font-serif mb-8 text-center">
              Language / Ngôn ngữ
            </h4>
            <div className="flex flex-row justify-center space-x-4">
              <button
                onClick={() => handleUserChoice("en")}
                className="py-3 px-6 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-3 text-base"
              >
                <span className="text-xl">🇺🇸</span>
                <span>English</span>
              </button>
              <button
                onClick={() => handleUserChoice("vi")}
                className="py-3 px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-800 flex items-center space-x-3 text-base"
              >
                <span className="text-xl">🇻🇳</span>
                <span>Tiếng Việt</span>
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
