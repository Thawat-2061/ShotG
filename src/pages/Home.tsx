import { useEffect, useRef, useState } from "react";

/* ================= Types ================= */
type SlideType = "image" | "video";

interface SlideItem {
  id: string;
  type: SlideType;
  src: string;
  duration?: number;
}

/* ================= Images ================= */
import img01 from "../assets/images/01.webp";
import img03 from "../assets/images/03.webp";
import img04 from "../assets/images/04.webp";
import img07 from "../assets/images/07.webp";
import img08 from "../assets/images/08.webp";
import img09 from "../assets/images/09.jpg";
import img12 from "../assets/images/12.jpg";
import img13 from "../assets/images/13.jpg";
import img14 from "../assets/images/14.webp";
import img23 from "../assets/images/23.webp";
import img24 from "../assets/images/24.jpg";

/* ================= Videos ================= */
import vid02 from "../assets/videos/02.mp4";
import vid05 from "../assets/videos/05.mp4";
import vid06 from "../assets/videos/06.mp4";
import vid10 from "../assets/videos/10.mp4";
import vid11 from "../assets/videos/11.mp4";
import vid15 from "../assets/videos/15.mp4";
import vid16 from "../assets/videos/16.mp4";
import vid17 from "../assets/videos/17.mp4";
import vid18 from "../assets/videos/18.mp4";
import vid19 from "../assets/videos/19.mp4";
import vid20 from "../assets/videos/20.mp4";
import vid25 from "../assets/videos/25.mp4";
import vid26 from "../assets/videos/26.mp4";
import vid27 from "../assets/videos/27.mp4";
import vid28 from "../assets/videos/28.mp4";
import vid29 from "../assets/videos/29.mp4";
import vid30 from "../assets/videos/30.mp4";
import vid31 from "../assets/videos/31.mp4";
import vid32 from "../assets/videos/32.mp4";
import vid33 from "../assets/videos/33.mp4";
import vid34 from "../assets/videos/34.mp4";
import vid35 from "../assets/videos/35.mp4";
import vid36 from "../assets/videos/36.mp4";

/* ================= Music ================= */
import bgMusic from "../assets/music/wake.mp3";

/* ================= Media Map ================= */
const mediaMap: Record<string, { type: SlideType; src: string }> = {
  "01": { type: "image", src: img01 },
  "02": { type: "video", src: vid02 },
  "03": { type: "image", src: img03 },
  "04": { type: "image", src: img04 },
  "05": { type: "video", src: vid05 },
  "06": { type: "video", src: vid06 },
  "07": { type: "image", src: img07 },
  "08": { type: "image", src: img08 },
  "09": { type: "image", src: img09 },
  "10": { type: "video", src: vid10 },
  "11": { type: "video", src: vid11 },
  "12": { type: "image", src: img12 },
  "13": { type: "image", src: img13 },
  "14": { type: "image", src: img14 },
  "15": { type: "video", src: vid15 },
  "16": { type: "video", src: vid16 },
  "17": { type: "video", src: vid17 },
  "18": { type: "video", src: vid18 },
  "19": { type: "video", src: vid19 },
  "20": { type: "video", src: vid20 },
  "23": { type: "image", src: img23 },
  "24": { type: "image", src: img24 },
  "25": { type: "video", src: vid25 },
  "26": { type: "video", src: vid26 },
  "27": { type: "video", src: vid27 },
  "28": { type: "video", src: vid28 },
  "29": { type: "video", src: vid29 },
  "30": { type: "video", src: vid30 },
  "31": { type: "video", src: vid31 },
  "32": { type: "video", src: vid32 },
  "33": { type: "video", src: vid33 },
  "34": { type: "video", src: vid34 },
  "35": { type: "video", src: vid35 },
  "36": { type: "video", src: vid36 },
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

  /* ▶️ คุมเล่น/หยุด (แก้ ESLint แล้ว) */
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

  /* ⏱ auto slide สำหรับรูป */
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

  /* 🔊 ตั้งระดับเสียง */
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
      <audio ref={audioRef} src={bgMusic} loop preload="auto" />
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
