"use client";
import Link from "@tiptap/extension-link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";

function Tiptap({
  description,
  onChange,
}: {
  description?: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });
  if (!editor) {
    return null;
  }
  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <>
      <div className="mb-4 flex space-x-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Toggle bold</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Toggle italic</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Toggle bullet list</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={setLink}
          className={editor.isActive("link") ? "bg-muted" : ""}
        >
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Add or edit link</span>
        </Button>
      </div>
      <EditorContent
        editor={editor}
        className="border-2 min-h-[200px] p-2 rounded-md"
      />
    </>
  );
}

export default Tiptap;
