"use client";
import { useRef, useState } from "react";

// Reads an image file and returns a resized/compressed JPEG data URL.
// Keeps stored images small enough to live directly in the database.
function fileToDataUrl(file, maxDim = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader({ value = [], onChange, multiple = false, t }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [url, setUrl] = useState("");

  const handleFiles = async (fileList) => {
    const files = [...fileList].filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    setBusy(true);
    try {
      const urls = [];
      for (const f of files) {
        urls.push(await fileToDataUrl(f));
        if (!multiple) break;
      }
      onChange(multiple ? [...value, ...urls] : [urls[0]]);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (i) => onChange(value.filter((_, idx) => idx !== i));

  const addUrl = () => {
    const u = url.trim();
    if (!u) return;
    onChange(multiple ? [...value, u] : [u]);
    setUrl("");
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${dragOver ? "border-gold bg-rose-light" : "border-beige-dark bg-beige/40 hover:border-gold"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24" className="text-gold"><path d="M12 16V4m0 0 4 4m-4-4-4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
          <span className="text-sm">{busy ? "..." : (multiple ? t.chooseImages : t.chooseImage)}</span>
          <span className="text-xs text-gray-400">{t.uploadHint}</span>
        </div>
      </div>

      {value.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-3">
          {value.map((im, i) => (
            <div key={i} className="relative w-20 h-24 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im} alt="" className="w-full h-full object-cover bg-beige rounded-lg border border-beige-dark" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-white border border-beige-dark shadow flex items-center justify-center text-red-500 hover:bg-red-50"
                aria-label="remove"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addUrl(); } }}
          placeholder={t.orPasteUrl}
          className="input py-2 text-sm"
        />
        <button type="button" onClick={addUrl} className="btn-outline py-2 px-4 text-xs whitespace-nowrap">{t.addUrl}</button>
      </div>
    </div>
  );
}
