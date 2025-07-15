import React from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Logo from "@/components/navbar-components/logo";
import { PlusIcon, LogOutIcon, NotebookIcon } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left side */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/notes">
                  <Button
                    variant={
                      location.pathname === "/notes" ? "default" : "ghost"
                    }
                    size="sm"
                    className="gap-2"
                  >
                    <NotebookIcon size={16} />
                    My Notes
                  </Button>
                </Link>
                <Link to="/notes/new">
                  <Button size="sm" className="gap-2">
                    <PlusIcon size={16} />
                    New Note
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-2"
                >
                  <LogOutIcon size={16} />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
