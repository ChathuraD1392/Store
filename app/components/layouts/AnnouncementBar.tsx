import React from "react";

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-gradient-to-l from-cyan-500 to-amber-300 py-2">
      <div className="container mx-auto flex items-center justify-center px-8">
        <span className="text-center text-sm font-medium tracking-wide text-white">
          FREE SHIPPING ON ORDERS OVER $50.00 & FREE RETURNS
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
