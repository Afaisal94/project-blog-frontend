import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="border-t-4 border-blue-500 border-solid h-20 w-20 animate-spin rounded-full"></div>
    </div>
  );
}
