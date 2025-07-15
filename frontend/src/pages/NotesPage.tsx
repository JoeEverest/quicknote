import React from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { noteService } from "@/services/noteService";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { PlusIcon, EditIcon, TrashIcon, ExternalLinkIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NotesPage: React.FC = () => {
    const queryClient = useQueryClient();

    const {
        data: notes = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["notes"],
        queryFn: noteService.getUserNotes,
    });

    const deleteMutation = useMutation({
        mutationFn: noteService.deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
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

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p className="text-destructive">
                        Failed to load notes. Please try again.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-serif font-bold">My Notes</h1>
                <Link to="/notes/new">
                    <Button className="gap-2">
                        <PlusIcon size={16} />
                        New Note
                    </Button>
                </Link>
            </div>

            {notes.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <div className="max-w-md mx-auto">
                        <h3 className="text-xl font-serif font-semibold mb-4">
                            No notes yet
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Create your first note to get started with QuickNote.
                        </p>
                        <Link to="/notes/new">
                            <Button size="lg" className="gap-2">
                                <PlusIcon size={16} />
                                Create Your First Note
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                    {notes.map((note, index) => (
                        <motion.div
                            key={note._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-serif font-semibold truncate flex-1">
                                    {note.title}
                                </h3>
                                <div className="flex gap-1 ml-2">
                                    <a
                                        href={`/${note.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 hover:bg-secondary rounded"
                                    >
                                        <ExternalLinkIcon
                                            size={14}
                                            className="text-muted-foreground"
                                        />
                                    </a>
                                    <Link
                                        to={`/notes/${note._id}/edit`}
                                        className="p-1 hover:bg-secondary rounded"
                                    >
                                        <EditIcon size={14} className="text-muted-foreground" />
                                    </Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="p-1 hover:bg-secondary rounded">
                                                <TrashIcon size={14} className="text-destructive" />
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Note</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete &quot;{note.title}
                                                    &quot;? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(note._id)}
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>

                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                {note.content.substring(0, 150).replace(/#/g, "")}...
                            </p>

                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>Created {formatDate(note.createdAt)}</span>
                                <span className="font-mono bg-secondary px-2 py-1 rounded">
                                    /{note.slug}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default NotesPage;
