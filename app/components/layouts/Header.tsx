"use client";
import React, { useEffect, useState } from "react";
import AnnouncementBar from "./AnnouncementBar";

const Header = () => {
  const [isVisible, setVisibility] = useState<boolean>(true);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < prevScrollY) {
        setVisibility(true);
      } else if (currentScrollY > 100) {
        setVisibility(false);
      }
      setPrevScrollY(currentScrollY);
    };
    setPrevScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);
  return (
    <>
      <header className="w-full sticky top-0 z-50">
        <div
          className={`w-full transform transition-transform duration-400 ease-in-out ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <AnnouncementBar />
        </div>
      </header>
    </>
  );
};

export default Header;
