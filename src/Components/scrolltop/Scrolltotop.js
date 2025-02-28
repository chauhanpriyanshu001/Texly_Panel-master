import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState, useEffect } from "react";

const Scrolltotop = () => {
  const handlescroll = () => {
    window.scrollTo(0, 0);
  };
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  return (
    <div
      style={{
        position: "fixed",
        top: "90vh",
        border: "2px solid black",
        left: "90vw",
        padding: "4px",
        borderRadius: "100%",
        width: "4vw",
        height: "4vw",
        display: visible ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        backgroundColor: "var(--backColor4)",
        zIndex: "10",
      }}
      onClick={handlescroll}
    >
      <ArrowUpwardIcon sty />
    </div>
  );
};

export default Scrolltotop;
