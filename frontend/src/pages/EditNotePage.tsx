import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { noteService } from "@/services/noteService";
import MarkdownEditor from "@/components/MarkdownEditor";
import { motion } from "motion/react";

const EditNotePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: noteService.getUserNotes,
  });

  const note = notes.find((n) => n._id === id);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const updateMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      noteService.updateNote(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/notes");
    },
  });

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      updateMutation.mutate({ title: title.trim(), content: content.trim() });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Note Not Found</h1>
          <p className="text-muted-foreground">
            The note you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Edit Note</h1>
          <p className="text-muted-foreground">Update your markdown note.</p>
        </div>

        <MarkdownEditor
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSave={handleSave}
          isLoading={updateMutation.isPending}
        />

        {updateMutation.error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg">
            Failed to update note. Please try again.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EditNotePage;
