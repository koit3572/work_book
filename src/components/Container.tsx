import React from 'react'
const Container = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default Container