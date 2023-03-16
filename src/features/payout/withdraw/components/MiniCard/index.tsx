import React from "react";
import { Children } from "types";

export function MiniCard({
  children,
  className = "",
  ...reset
}: {
  children: Children;
  className?: string;
}) {
  return (
    <div
      className={`p-4 sm:px-7 border-[1px] border-gray-300 rounded-lg text-left ${className}`}
      {...reset}
    >
      {children}
    </div>
  );
}

export default MiniCard;
