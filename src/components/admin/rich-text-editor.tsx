"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus,
  AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, Image as ImageIcon, Undo, Redo,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function ToolbarBtn({
  onClick, active, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
        active
          ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-0.5 h-5 w-px bg-slate-200 dark:bg-white/[0.08]" />;
}

export function RichTextEditor({ value, onChange, placeholder = "Write your content here…" }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-blue-600 underline" } }),
      Image.configure({ HTMLAttributes: { class: "max-w-full rounded-xl" } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[320px] focus:outline-none prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-[-0.02em] prose-p:leading-[1.75] prose-p:text-[14px] prose-li:text-[14px]",
      },
    },
  });

  // Sync external value changes (e.g. when editing an existing post)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const insertImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.02]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50/70 px-2 py-1.5 dark:border-white/[0.06] dark:bg-white/[0.02]">

        {/* History */}
        <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-3.5 w-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Headings */}
        <ToolbarBtn title="Heading 1" active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Heading 2" active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Heading 3" active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="h-3.5 w-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Inline marks */}
        <ToolbarBtn title="Bold" active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Italic" active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Underline" active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Strikethrough" active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Inline Code" active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code className="h-3.5 w-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Lists & blocks */}
        <ToolbarBtn title="Bullet List" active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Ordered List" active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Blockquote" active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Horizontal Rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-3.5 w-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Alignment */}
        <ToolbarBtn title="Align Left" active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Align Center" active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Align Right" active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="h-3.5 w-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Link & Image */}
        <ToolbarBtn title="Insert Link" active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Insert Image" onClick={insertImage}>
          <ImageIcon className="h-3.5 w-3.5" />
        </ToolbarBtn>
      </div>

      {/* Editor area */}
      <div className="px-5 py-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
