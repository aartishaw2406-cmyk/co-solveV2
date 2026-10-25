import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import PhotoPicker from "./PhotoPicker";
import VoiceRecorder from "./VoiceRecorder";
import { addProblem } from "../../lib/problemsStore";

const CATEGORIES = [
  "Infrastructure",
  "Sanitation",
  "Education",
  "Safety",
  "Agriculture",
  "Healthcare",
  "Other",
];

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus-visible:border-[#1E40AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]/30";

const EMPTY = { title: "", category: "", location: "", description: "" };

function Field({ label, error, hint, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium text-[#1F2937]">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-[#4B5563]">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1 text-sm text-[#EF4444]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ReportForm({ onSubmitted }) {
  const [form, setForm] = useState(EMPTY);
  const [photos, setPhotos] = useState([]);
  const [voice, setVoice] = useState(null);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 8) e.title = "Give your problem a short title (at least 8 characters).";
    if (!form.category) e.category = "Choose a category.";
    if (form.location.trim().length < 3) e.location = "Tell us where this is.";
    if (!form.description.trim() && !voice) e.description = "Describe it in writing or record a voice note.";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const p = addProblem({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      location: form.location.trim(),
      photos,
      voice,
    });
    setDone(p);
    setForm(EMPTY);
    setPhotos([]);
    setVoice(null);
    onSubmitted?.(p);
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className="space-y-5 rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="report-form-heading"
    >
      <div>
        <h2 id="report-form-heading" className="text-base font-semibold text-[#1F2937]">
          Describe the problem
        </h2>
        <p className="mt-1 text-sm text-[#4B5563]">
          Real, specific problems get solved. Vague or off-topic reports can be flagged as useless by the community.
        </p>
      </div>

      {done && (
        <div role="status" className="flex items-start gap-3 rounded-lg border border-[#10B981]/30 bg-[#ECFDF5] p-3 text-sm text-[#059669]">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            <span className="font-semibold">{done.id} posted.</span> Solvers can see it now.
          </p>
        </div>
      )}

      <Field label="Title" htmlFor="rp-title" error={errors.title}>
        <input id="rp-title" className={inputClass} value={form.title} onChange={set("title")} maxLength={120} placeholder="e.g. Water collects outside the main market after light rain" aria-invalid={!!errors.title} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Category" htmlFor="rp-category" error={errors.category}>
          <select id="rp-category" className={inputClass} value={form.category} onChange={set("category")} aria-invalid={!!errors.category}>
            <option value="">Select…</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Location" htmlFor="rp-location" error={errors.location}>
          <input id="rp-location" className={inputClass} value={form.location} onChange={set("location")} placeholder="Ward, area or landmark" aria-invalid={!!errors.location} />
        </Field>
      </div>

      <Field label="Details" htmlFor="rp-desc" error={errors.description} hint="Optional if you add a voice note.">
        <textarea id="rp-desc" rows={4} className={inputClass} value={form.description} onChange={set("description")} maxLength={1000} placeholder="What is happening, since when, and who is affected?" aria-invalid={!!errors.description} />
      </Field>

      <div>
        <p className="text-sm font-medium text-[#1F2937]">Photos</p>
        <div className="mt-1.5">
          <PhotoPicker photos={photos} onChange={setPhotos} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-[#1F2937]">Voice note</p>
        <p className="mt-0.5 text-xs text-[#4B5563]">Explain it in your own language. Up to 60 seconds.</p>
        <div className="mt-2">
          <VoiceRecorder value={voice} onChange={setVoice} />
        </div>
      </div>

      <div className="flex justify-end border-t border-[#E5E7EB] pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1E40AF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Post problem
        </button>
      </div>
    </form>
  );
}
