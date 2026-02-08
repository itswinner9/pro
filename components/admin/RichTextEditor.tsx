"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
}: RichTextEditorProps) {
  const quillRef = useRef<any>(null);

  useEffect(() => {
    // Custom image handler
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule("toolbar");
      
      toolbar.addHandler("image", function () {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            // You can upload to Supabase Storage here or use a URL
            // For now, we'll use a data URL or prompt for URL
            const reader = new FileReader();
            reader.onload = (e) => {
              const imageUrl = e.target?.result as string;
              const range = quill.getSelection(true);
              quill.insertEmbed(range.index, "image", imageUrl);
            };
            reader.readAsDataURL(file);
          }
        };
      });
    }
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{
          minHeight: "400px",
          backgroundColor: "white",
        }}
      />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 400px;
          font-size: 16px;
          font-family: inherit;
        }
        .rich-text-editor .ql-editor {
          min-height: 400px;
          padding: 20px;
          line-height: 1.8;
        }
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-bottom: none;
          border-radius: 8px 8px 0 0;
          background: #f9fafb;
          padding: 12px;
        }
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
        }
        .rich-text-editor .ql-snow .ql-stroke {
          stroke: #4b5563;
        }
        .rich-text-editor .ql-snow .ql-fill {
          fill: #4b5563;
        }
        .rich-text-editor .ql-snow .ql-picker-label {
          color: #4b5563;
        }
      `}</style>
    </div>
  );
}

