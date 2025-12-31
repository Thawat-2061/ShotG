import { useEffect, useRef, useState } from "react";

/* ================= Types ================= */
type SlideType = "image" | "video";

interface SlideItem {
  id: string;
  type: SlideType;
  src: string;
  duration?: number;
}

/* ================= Media Map (PUBLIC URL ONLY) ================= */
const mediaMap: Record<string, { type: SlideType; src: string }> = {
  "01": { type: "image", src: "/images/01.webp" },
  "02": { type: "video", src: "/videos/02.mp4" },
  "03": { type: "image", src: "/images/03.webp" },
  "04": { type: "image", src: "/images/04.webp" },
  "05": { type: "video", src: "/videos/05.mp4" },
  "06": { type: "video", src: "/videos/06.mp4" },
  "07": { type: "image", src: "/images/07.webp" },
  "08": { type: "image", src: "/images/08.webp" },
  "09": { type: "image", src: "/images/09.jpg" },
  "10": { type: "video", src: "/videos/10.mp4" },
  "11": { type: "video", src: "/videos/11.mp4" },
  "12": { type: "image", src: "/images/12.jpg" },
  "13": { type: "image", src: "/images/13.jpg" },
  "14": { type: "image", src: "/images/14.webp" },
  "15": { type: "video", src: "/videos/15.mp4" },
  "16": { type: "video", src: "/videos/16.mp4" },
  "17": { type: "video", src: "/videos/17.mp4" },
  "18": { type: "video", src: "/videos/18.mp4" },
  "19": { type: "video", src: "/videos/19.mp4" },
  "20": { type: "video", src: "/videos/20.mp4" },
  "23": { type: "image", src: "/images/23.webp" },
  "24": { type: "image", src: "/images/24.jpg" },
  "25": { type: "video", src: "/videos/25.mp4" },
  "26": { type: "video", src: "/videos/26.mp4" },
  "27": { type: "video", src: "/videos/27.mp4" },
  "28": { type: "video", src: "/videos/28.mp4" },
  "29": { type: "video", src: "/videos/29.mp4" },
  "30": { type: "video", src: "/videos/30.mp4" },
  "31": { type: "video", src: "/videos/31.mp4" },
  "32": { type: "video", src: "/videos/32.mp4" },
  "33": { type: "video", src: "/videos/33.mp4" },
  "34": { type: "video", src: "/videos/34.mp4" },
  "35": { type: "video", src: "/videos/35.mp4" },
  "36": { type: "video", src: "/videos/36.mp4" },
};

/* ================= Slides ================= */
const slides: SlideItem[] = Object.keys(mediaMap)
  .sort((a, b) => Number(a) - Number(b))
  .map(id => ({
    id,
    type: mediaMap[id].type,
    src: mediaMap[id].src,
    duration: mediaMap[id].type === "image" ? 3500 : undefined,
  }));

/* ================= Component ================= */
export default function Home() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = slides[index];

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % slides.length);
  };

  /* ▶️ Play / Pause */
  const togglePlay = () => {
  setPlaying(prev => {
    const next = !prev;

    if (audioRef.current) {
      if (next) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }

    return next;
  });
};


  /* ⏱ Auto slide (image only) */
  useEffect(() => {
    if (!playing) return;

    if (current.type === "image") {
      timerRef.current = window.setTimeout(
        nextSlide,
        current.duration
      );
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [index, playing, current]);

  /* 🔊 Music volume */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  return (
    <div style={container}>
      <div style={frame}>
        {current.type === "image" ? (
          <img
            key={current.id}
            src={current.src}
            style={{ ...media, objectFit: "contain" }}
          />
        ) : (
          <video
            key={current.id}
            src={current.src}
            style={{ ...media, objectFit: "cover" }}
            autoPlay={playing}
            muted
            playsInline
            onEnded={nextSlide}
          />
        )}
      </div>

      <button onClick={togglePlay} style={button}>
        {playing ? "⏸ หยุด" : "▶ เล่น"}
      </button>

      {/* 🎵 Background Music */}
      <audio
        ref={audioRef}
        src="/music/wake.mp3"
        loop
        preload="auto"
      />
    </div>
  );
}

/* ================= Styles ================= */
const container: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  background: "#000",
  overflow: "hidden",
  position: "relative",
};

const frame: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const media: React.CSSProperties = {
  width: "100%",
  height: "100%",
  animation: "fade 0.8s ease-in-out",
};

const button: React.CSSProperties = {
  position: "absolute",
  bottom: 40,
  left: "50%",
  transform: "translateX(-50%)",
  padding: "14px 38px",
  fontSize: 18,
  borderRadius: 999,
  border: "none",
  background: "rgba(255,255,255,0.9)",
  color: "#d63384",
  fontWeight: 600,
  cursor: "pointer",
};
