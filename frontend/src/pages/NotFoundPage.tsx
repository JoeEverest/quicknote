import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-serif font-bold text-foreground mb-4">
          404
        </h1>
        <h2 className="text-2xl font-serif font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg">Go Home</Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
