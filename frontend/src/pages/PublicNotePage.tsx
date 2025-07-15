import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { noteService } from "@/services/noteService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "motion/react";
import Logo from "@/components/navbar-components/logo";

const PublicNotePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const {
        data: note,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["note", slug],
        queryFn: () => noteService.getNoteBySlug(slug!),
        enabled: !!slug,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !note) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-16">
                        <h1 className="text-4xl font-serif font-bold mb-4">
                            Note Not Found
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            The note you&apos;re looking for doesn&apos;t exist or has been
                            removed.
                        </p>
                        <a href="/" className="text-primary hover:underline">
                            Go to QuickNote
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
            {/* Header */}
            <header>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-center items-center">
                        <a href="/" className="hover:opacity-80 transition-opacity">
                            <Logo />
                        </a>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-12">
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="p-8 md:p-12">
                        <header className="mb-8">
                            <h1 className="text-4xl md:text-5xl text-foreground mb-4">
                                {note.title}
                            </h1>

                        </header>

                        <div className="prose prose-neutral prose-lg max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {note.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </motion.article>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground mb-4">
                        This note was created with QuickNote
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        Create your own notes →
                    </a>
                </motion.div>
            </main>
        </div>
    );
};

export default PublicNotePage;
