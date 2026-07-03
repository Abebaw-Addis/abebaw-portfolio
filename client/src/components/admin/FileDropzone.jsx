import { useRef, useState } from "react";

const FileDropzone = ({ label, value, onFileChange, accept = "image/*", previewUrl, disabled, helperText }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    if (!files?.length) {
      return;
    }

    onFileChange(files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex min-h-[10rem] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed px-4 py-6 text-center transition ${dragging ? "border-sky-500 bg-sky-50" : "border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"}`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="mx-auto mb-4 max-h-48 w-full max-w-xs rounded-3xl object-contain"
          />
        ) : (
          <div className="mb-3 text-sm text-slate-500 dark:text-slate-400">Drag and drop an image here, or choose a file</div>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-sky-500"
        >
          Select file
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
        {helperText ? <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{helperText}</p> : null}
        {value && !previewUrl ? (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Current value: {value}</p>
        ) : null}
      </div>
    </div>
  );
};

export default FileDropzone;
