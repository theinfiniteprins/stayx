import React from "react";

const Skeleton = ({ count = 1 }) => {
  const skeletonItems = [];
  for (let i = 0; i < count; i++) {
    skeletonItems.push(
      <div
        key={i}
        className="bg-gray-300 h-48 w-full rounded-lg animate-pulse"
      ></div>
    );
  }

  return <div className="grid gap-4">{skeletonItems}</div>;
};

export default Skeleton;
