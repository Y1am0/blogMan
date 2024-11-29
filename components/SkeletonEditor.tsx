import React from 'react';

const SkeletonEditor: React.FC = () => {
  return (
    <div className={`animate-pulse space-y-2 bg-background p-4 rounded-md h-[500px] overflow-hidden`}>
      <div className={`h-8 bg-background-dark rounded w-full`}></div>
      <div className={`h-4 bg-background-dark rounded w-3/4`}></div>
      <div className={`h-4 bg-background-dark rounded w-1/2`}></div>
      <div className={`h-4 bg-background-dark rounded w-5/6`}></div>
      <div className={`h-4 bg-background-dark rounded w-2/3`}></div>
      <div className={`h-4 bg-background-dark rounded w-3/4`}></div>
    </div>
  );
};

export default SkeletonEditor;

