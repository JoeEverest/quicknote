import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
        Q
      </div>
      <span className="font-serif text-xl font-semibold">QuickNote</span>
    </div>
  );
};

export default Logo;
