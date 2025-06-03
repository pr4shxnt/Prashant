import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const Poemcard = ({ poem, currentIndex, total, onPrev, onNext, setIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setProgress(0);
    setCurrentTime(0);
  }, [poem]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!isDragging.current) {
        setCurrentTime(audio.currentTime);
        setProgress(audio.currentTime / audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seekToPosition = (e) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newProgress = offsetX / rect.width;
    const newTime = newProgress * duration;

    setProgress(newProgress);
    setCurrentTime(newTime);

    if (isDragging.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const onSeekStart = (e) => {
    isDragging.current = true;
    seekToPosition(e);
    document.addEventListener("mousemove", seekToPosition);
    document.addEventListener("touchmove", seekToPosition);
    document.addEventListener("mouseup", onSeekEnd);
    document.addEventListener("touchend", onSeekEnd);
  };

  const onSeekEnd = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", seekToPosition);
    document.removeEventListener("touchmove", seekToPosition);
    document.removeEventListener("mouseup", onSeekEnd);
    document.removeEventListener("touchend", onSeekEnd);
  };

  if (!poem) return null;

  const releaseDateFormatted = new Date(poem.releaseDate).toLocaleDateString();

  return (
    <div className="w-full text-beige relative pb-5 pt-14 px-5 bg-beige flex-col flex gap-3 rounded-lg shadow-lg">
      <div className="absolute z-10 w-full h-full backdrop-blur-md bg-charcoal/60 top-0 left-0 rounded-lg"></div>
      <img
        src={poem.imageUrl}
        alt={poem.title}
        className="absolute w-full h-full top-0 left-0 object-cover rounded-lg"
      />

      <div className="header z-20 flex flex-col items-center gap-2 relative">
        <div className="thumbnail w-28 md:w-44 h-28 md:h-44 rounded-full overflow-hidden border-4 border-beige">
          <img
            src={poem.imageUrl}
            alt={poem.title}
            className="rounded-full object-cover w-full "
          />
        </div>
        <div className="name flex flex-col text-center text-charcoal relative z-20">
          <h1 className="text-xl font-bold text-beige">{poem.title}</h1>
          <h2 className="text-sm text-gray-400">Author: {poem.author}</h2>
          <div className="text-sm text-gray-400">
            Released: {releaseDateFormatted}
          </div>
        </div>
      </div>

      <div className="progressbars z-20 flex flex-col gap-3  mt-4 relative">
        <audio ref={audioRef} src={poem.audioUrl} />

      

        <div
          ref={progressBarRef}
          onMouseDown={onSeekStart}
          onTouchStart={onSeekStart}
          className="relative group h-1 rounded bg-charcoal cursor-pointer select-none"
        >
          <div
            className="relative top-0 left-0 h-1 rounded bg-beige"
            style={{ width: `${progress * 100}%` }}
          >
            {" "}
            <div className="absolute right-0 top-1 group-hover:block hidden text-xs text-beige">
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
          <div className="absolute left-0 text-beige text-xs">          <span>{formatTime(duration)}</span>
</div>
        </div>

        <div className="controls flex justify-center gap-3">
          <button
            onClick={onPrev}
            className="previous p-2 bg-brown text-beige rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={togglePlay}
            className="play-pause p-2 bg-brown text-beige rounded-full"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button
            onClick={onNext}
            className="next p-2 bg-brown text-beige rounded-full"
          >
            <ChevronRight />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Poemcard;
