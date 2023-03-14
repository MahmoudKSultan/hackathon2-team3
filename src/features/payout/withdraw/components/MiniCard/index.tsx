import React from "react";
import { Children } from "types";

export function MiniCard({
  children,
  className = "",
}: {
  children: Children;
  className?: string;
}) {
  return (
    <div
      className={`p-4 sm:px-7 border-[1px] border-gray-dark rounded-lg text-left ${className}`}
    >
      {children}
    </div>
  );
}

export default MiniCard;
