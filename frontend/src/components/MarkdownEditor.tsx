import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MarkdownEditorProps {
    title: string;
    content: string;
    onTitleChange: (title: string) => void;
    onContentChange: (content: string) => void;
    onSave: () => void;
    isLoading?: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    title,
    content,
    onTitleChange,
    onContentChange,
    onSave,
    isLoading = false,
}) => {
    const [isPreview, setIsPreview] = useState(false);

    return (
        <div className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
                <Label htmlFor="title">Note Title</Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Enter your note title..."
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
            </div>

            {/* Editor Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant={!isPreview ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsPreview(false)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="button"
                        variant={isPreview ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsPreview(true)}
                    >
                        Preview
                    </Button>
                </div>
                <Button
                    onClick={onSave}
                    size="sm"
                    disabled={isLoading || !title.trim() || !content.trim()}
                >
                    {isLoading ? "Saving..." : "Save Note"}
                </Button>
            </div>

            {/* Editor/Preview Area */}
            <div className="border border-border rounded-lg overflow-hidden">
                {isPreview ? (
                    <div className="p-6 min-h-[400px] bg-background">
                        <h1 className="text-3xl mb-6">{title}</h1>
                        <div className="prose prose-neutral max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ) : (
                    <textarea
                        value={content}
                        onChange={(e) => onContentChange(e.target.value)}
                        placeholder="Start typing your markdown content here..."
                        id="markdown-content"
                        name="markdown-content"
                        className="w-full min-h-[400px] p-6 bg-background border-none outline-none font-mono text-sm"
                    />
                )}
            </div>
        </div>
    );
};

export default MarkdownEditor;
