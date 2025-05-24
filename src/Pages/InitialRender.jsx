import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const InitialRender = ({ setShowContent }) => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          const svgElement = document.querySelector(".svg");
          if (svgElement) {
            svgElement.remove();
            setShowContent(true);
            this.kill();
          }
        }
      },
    });
  });



  return (
    <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
      <title>Welcome | Prashant Adhikari</title>
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <mask id="viMask">
            <rect width="100%" height="100%" fill="black" />
            <g className="vi-mask-group">
              <text
                x="50%"
                y="50%"
                fontSize="8vw"
                textAnchor="middle"
                letterSpacing="1vw"
                fill="white"
                dominantBaseline="middle"
                fontFamily="Arial Black"
              >
                X
              </text>
            </g>
          </mask>
        </defs>
        <image
          href="./initial-prev.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#viMask)"
          onError={(e) => {
            console.error("Error loading initial preview image");
            setShowContent(true);
          }}
        />
      </svg>
    </div>
  );
};

export default InitialRender;
