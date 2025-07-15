import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { noteService } from "@/services/noteService";
import MarkdownEditor from "@/components/MarkdownEditor";
import { motion } from "motion/react";

const NewNotePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: noteService.createNote,
    onSuccess: () => {
      navigate("/notes");
    },
  });

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      createMutation.mutate({ title: title.trim(), content: content.trim() });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">
            Create New Note
          </h1>
          <p className="text-muted-foreground">
            Write your markdown note and share it with the world.
          </p>
        </div>

        <MarkdownEditor
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSave={handleSave}
          isLoading={createMutation.isPending}
        />

        {createMutation.error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg">
            Failed to create note. Please try again.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NewNotePage;
