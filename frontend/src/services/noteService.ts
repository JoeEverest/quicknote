import { CreateNoteData, UpdateNoteData, Note } from "@/types";
import api from "@/lib/api";

export const noteService = {
  // Get all user notes
  getUserNotes: async (): Promise<Note[]> => {
    const response = await api.get("/app/notes");
    return response.data;
  },

  // Create a new note
  createNote: async (data: CreateNoteData): Promise<Note> => {
    const response = await api.post("/app/notes", data);
    return response.data.note;
  },

  // Get note by slug (public endpoint)
  getNoteBySlug: async (slug: string): Promise<Note> => {
    const response = await api.get(`/app/note/${slug}`);

    // Public endpoint only returns content for privacy
    if (response.data.content) {
      return {
        _id: "",
        title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        content: response.data.content,
        slug: slug,
        owner: "",
        createdAt: "",
        updatedAt: "",
      };
    } else {
      throw new Error("Note not found");
    }
  },

  // Update note
  updateNote: async (id: string, data: UpdateNoteData): Promise<Note> => {
    const response = await api.put(`/app/notes/${id}`, data);
    return response.data.note || response.data;
  },

  // Delete note
  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/app/notes/${id}`);
  },
};
