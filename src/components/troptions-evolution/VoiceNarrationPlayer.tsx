"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { getNarrationScript } from "@/lib/troptions/narrationScripts";

interface VoiceNarrationPlayerProps {
  pageId: string;
  autoPlay?: boolean;
  showTranscript?: boolean;
}

export function VoiceNarrationPlayer({ pageId, autoPlay = false, showTranscript = false }: VoiceNarrationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const script = useMemo(() => getNarrationScript(pageId), [pageId]);
  const segments = script?.segments ?? [];

  const handleAudioEnded = useCallback(() => {
    setCurrentSegmentIndex((prevIndex) => {
      if (prevIndex < segments.length - 1) {
        setIsPlaying(false);
        return prevIndex + 1;
      } else {
        setIsPlaying(false);
        return 0;
      }
    });
  }, [segments.length]);

  // Audio ended event listener
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("ended", handleAudioEnded);
    return () => audio.removeEventListener("ended", handleAudioEnded);
  }, [handleAudioEnded]);

  // Play audio when isPlaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audioUrls.length === 0) return;

    if (isPlaying) {
      audio.src = audioUrls[currentSegmentIndex];
      audio.play().catch((error) => console.error("Failed to play audio:", error));
    }
  }, [isPlaying, currentSegmentIndex, audioUrls]);

  const loadAudio = async () => {
    if (audioUrls.length > 0) return;

    setIsLoading(true);
    try {
      const urls: string[] = [];

      for (const segment of segments) {
        const response = await fetch("/api/troptions/narration/synthesize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: segment.text,
            segmentId: segment.id,
            pageId,
          }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          urls.push(url);
        }
      }

      setAudioUrls(urls);
      setIsLoading(false);

      if (autoPlay && urls.length > 0) {
        setTimeout(() => setIsPlaying(true), 100);
      }
    } catch (error) {
      console.error("Failed to load narration audio:", error);
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (audioUrls.length === 0) {
      loadAudio();
      return;
    }
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  if (!script || segments.length === 0) {
    return null;
  }

  return (
    <div style={{ background: "#0f172a", color: "#f6f1e3", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
      <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          onClick={isPlaying ? pauseAudio : playAudio}
          disabled={isLoading}
          style={{
            background: "#f0cf82",
            color: "#0f172a",
            border: "none",
            borderRadius: "0.375rem",
            padding: "0.5rem 1rem",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? "Loading narration..." : isPlaying ? "⏸ Pause narration" : "▶ Play narration"}
        </button>

        <span style={{ fontSize: "0.875rem", color: "#d1d5db" }}>
          Segment {currentSegmentIndex + 1} of {segments.length}
        </span>
      </div>

      {showTranscript && isPlaying && (
        <div style={{ marginTop: "0.75rem", fontSize: "0.875rem", lineHeight: "1.6", color: "#e5e7eb" }}>
          <p style={{ margin: 0 }}>
            <strong>{segments[currentSegmentIndex].id}:</strong> {segments[currentSegmentIndex].text}
          </p>
        </div>
      )}

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
}
