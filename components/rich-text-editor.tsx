"use client";

import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// ---------------------------------------------------------------------------
// Custom link tooltip — Quill's built-in Snow link handler opens a prompt().
// We swap it for a programmatic handler that uses window.prompt so it works
// in all browsers without relying on the Snow theme tooltip UI.
// ---------------------------------------------------------------------------
const Link = Quill.import("formats/link") as typeof import("quill").default;
// Keep Quill's sanitize but allow http/https/mailto
// @ts-expect-error – static property exists at runtime
Link.sanitize = function sanitize(url: string) {
  if (url.startsWith("http") || url.startsWith("mailto:") || url.startsWith("/")) return url;
  return `https://${url}`;
};

// ---------------------------------------------------------------------------
// Toolbar format groups — mirrors Slack's toolbar exactly:
//   [B  I  U  S]  [link]  [ol  ul]  [indent+  indent-]  [code-block  blockquote]
// ---------------------------------------------------------------------------
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["code-block", "blockquote"],
];

// ---------------------------------------------------------------------------
// Custom toolbar icons using lucide-compatible SVG paths so they look sharp
// at any size and inherit currentColor.
// ---------------------------------------------------------------------------
const Icons = Quill.import("ui/icons") as Record<string, string>;

Icons["bold"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>`;
Icons["italic"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>`;
Icons["underline"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>`;
Icons["strike"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><path d="M17.5 5C17.5 5 16 3 12 3s-6 2-6 5c0 2.5 2 3.5 4 4"/><path d="M6.5 19C6.5 19 8 21 12 21s6-2 6-5c0-2.5-2-3.5-4-4"/></svg>`;
Icons["link"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
Icons["list"]["ordered"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1.5"/></svg>`;
Icons["list"]["bullet"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none"/></svg>`;
Icons["indent"]["-1"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><path d="M15 12H3"/><line x1="21" y1="18" x2="3" y2="18"/><polyline points="7 8 3 12 7 16"/></svg>`;
Icons["indent"]["+1"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><path d="M9 12h12"/><line x1="21" y1="18" x2="3" y2="18"/><polyline points="3 8 7 12 3 16"/></svg>`;
Icons["code-block"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
Icons["blockquote"] = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h3c0 0 0 4-4 4v2z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h3c0 0 0 4-4 4v2z"/></svg>`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write the body here…",
}: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          // Override the default prompt-based link handler
          link: function (this: { quill: InstanceType<typeof Quill> }) {
            const quill = this.quill;
            const selection = quill.getSelection();
            if (!selection) return;
            const currentUrl = quill.getFormat(selection)?.link as string | undefined;
            const url = window.prompt("Enter link URL:", currentUrl ?? "https://");
            if (url === null) return; // cancelled
            if (url === "") {
              quill.format("link", false);
            } else {
              quill.format("link", url);
            }
          },
        },
      },
      clipboard: { matchVisual: false },
    }),
    [],
  );

  const formats = [
    "bold", "italic", "underline", "strike",
    "link",
    "list",
    "indent",
    "code-block", "blockquote",
  ];

  return (
    <div className="sukoon-quill">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
