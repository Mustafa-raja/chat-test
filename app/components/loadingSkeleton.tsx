import React from "react";

function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-base-300 rounded mb-4"></div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-base-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-base-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
