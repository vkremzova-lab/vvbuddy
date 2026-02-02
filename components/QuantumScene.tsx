import React from "react";

export const BuddyHeroScene: React.FC = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, rgba(50,116,144,0.25), transparent 60%), radial-gradient(circle at 70% 60%, rgba(212,175,55,0.25), transparent 60%)",
      }}
    />
  );
};
