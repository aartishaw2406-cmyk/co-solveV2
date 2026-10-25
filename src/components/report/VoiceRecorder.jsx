import { useEffect, useRef, useState } from "react";
import { Mic, Square, Trash2, Upload } from "lucide-react";

const MAX_SECONDS = 60;

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

// value: { url, seconds } | null
export default function VoiceRecorder({ value, onChange }) {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const recRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);
  const secondsRef = useRef(0);
  const canRecord = typeof window !== "undefined" && !!navigator.mediaDevices?.getUserMedia && "MediaRecorder" in window;

  const cleanup = () => {
    clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  useEffect(() => cleanup, []);

  const stop = () => {
    if (recRef.current && recRef.current.state !== "inactive") recRef.current.stop();
  };

  const start = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      recRef.current = rec;
      chunksRef.current = [];
      secondsRef.current = 0;
      setElapsed(0);

      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = async () => {
        cleanup();
        setRecording(false);
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        if (blob.size) onChange({ url: await blobToDataUrl(blob), seconds: secondsRef.current });
      };

      rec.start();
      setRecording(true);
      timerRef.current = setInterval(() => {
        secondsRef.current += 1;
        setElapsed(secondsRef.current);
        if (secondsRef.current >= MAX_SECONDS) stop();
      }, 1000);
    } catch {
      cleanup();
      setError("Microphone access was blocked. Allow it in your browser, or upload an audio file instead.");
    }
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("audio/")) return setError("Please choose an audio file.");
    if (file.size > 3 * 1024 * 1024) return setError("Audio file is too large (max 3 MB).");
    setError("");
    onChange({ url: await blobToDataUrl(file), seconds: null });
  };

  return (
    <div>
      {value ? (
        <div className="flex flex-col gap-3 rounded-lg border border-[#E5E7EB] bg-[#FAFAFB] p-3 sm:flex-row sm:items-center">
          <audio controls src={value.url} className="h-10 w-full" aria-label="Voice note preview" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-[#EF4444] hover:bg-[#FEF2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Remove
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          {recording ? (
            <button
              type="button"
              onClick={stop}
              className="inline-flex items-center gap-2 rounded-lg bg-[#EF4444] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#DC2626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2"
            >
              <Square className="h-4 w-4" aria-hidden="true" />
              Stop · {fmt(elapsed)} / {fmt(MAX_SECONDS)}
            </button>
          ) : (
            canRecord && (
              <button
                type="button"
                onClick={start}
                className="inline-flex items-center gap-2 rounded-lg border border-[#1E40AF] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E40AF] hover:bg-[#EFF6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2"
              >
                <Mic className="h-4 w-4" aria-hidden="true" />
                Record voice note
              </button>
            )
          )}
          {!recording && (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#4B5563] focus-within:ring-2 focus-within:ring-[#1E40AF] hover:bg-[#FAFAFB]">
              <Upload className="h-4 w-4" aria-hidden="true" />
              Upload audio
              <input type="file" accept="audio/*" onChange={onFile} className="sr-only" />
            </label>
          )}
          {recording && (
            <span className="flex items-center gap-2 text-sm text-[#EF4444]" role="status">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#EF4444]" aria-hidden="true" />
              Recording…
            </span>
          )}
        </div>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-[#EF4444]">
          {error}
        </p>
      )}
    </div>
  );
}
