import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "motion/react";
import { NotebookIcon, ShareIcon, EditIcon } from "lucide-react";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
            QuickNote
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            A simple way to send markdown notes to anyone. Think pastebin, but
            with customizable short slugs that lead to beautiful landing pages.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {user ? (
              <>
                <Link to="/notes">
                  <Button size="lg" className="px-8 py-3 text-lg">
                    View My Notes
                  </Button>
                </Link>
                <Link to="/notes/new">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 text-lg"
                  >
                    Create New Note
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="px-8 py-3 text-lg">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 text-lg"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
              <EditIcon size={24} />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-3">
              Markdown Editor
            </h3>
            <p className="text-muted-foreground">
              Write beautiful notes with our intuitive markdown editor with live
              preview.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShareIcon size={24} />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-3">
              Easy Sharing
            </h3>
            <p className="text-muted-foreground">
              Share your notes instantly with custom short slugs that are easy
              to remember.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
              <NotebookIcon size={24} />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-3">
              Organize Notes
            </h3>
            <p className="text-muted-foreground">
              Keep track of all your notes in one place with easy management
              tools.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
