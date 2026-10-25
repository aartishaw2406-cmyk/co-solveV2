import { useState } from "react";
import { ImagePlus, X } from "lucide-react";

const MAX_PHOTOS = 4;
const MAX_EDGE = 1024;

// Downscale to keep storage small.
async function shrink(file) {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d").drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close?.();
  return canvas.toDataURL("image/jpeg", 0.72);
}

export default function PhotoPicker({ photos, onChange }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onFiles = async (e) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setError("");
    const room = MAX_PHOTOS - photos.length;
    const picked = files.filter((f) => f.type.startsWith("image/")).slice(0, room);
    if (picked.length < files.length) setError(`Only images are allowed, up to ${MAX_PHOTOS} photos.`);
    setBusy(true);
    try {
      const urls = await Promise.all(picked.map(shrink));
      onChange([...photos, ...urls]);
    } catch {
      setError("One of the photos could not be read. Try a different file.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((src, i) => (
          <li key={i} className="relative aspect-square overflow-hidden rounded-lg border border-[#E5E7EB]">
            <img src={src} alt={`Attached photo ${i + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(photos.filter((_, j) => j !== i))}
              aria-label={`Remove photo ${i + 1}`}
              className="absolute right-1.5 top-1.5 rounded-full bg-[#0F172A]/70 p-1 text-white hover:bg-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
        {photos.length < MAX_PHOTOS && (
          <li>
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[#9CA3AF] bg-[#FAFAFB] text-center text-xs font-medium text-[#4B5563] focus-within:ring-2 focus-within:ring-[#1E40AF] hover:border-[#1E40AF] hover:text-[#1E40AF]">
              <ImagePlus className="h-6 w-6" aria-hidden="true" />
              {busy ? "Adding…" : "Add photos"}
              <input type="file" accept="image/*" multiple onChange={onFiles} className="sr-only" />
            </label>
          </li>
        )}
      </ul>
      <p className="mt-2 text-xs text-[#4B5563]">Up to {MAX_PHOTOS} photos. Clear shots of the problem help solvers most.</p>
      {error && (
        <p role="alert" className="mt-1 text-sm text-[#EF4444]">
          {error}
        </p>
      )}
    </div>
  );
}
