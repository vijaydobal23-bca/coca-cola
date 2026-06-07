import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterContent from "./FooterContent";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const frames = {
      currIndex: 1,
      maxIndex: 176,
    };

    let imagesLoaded = 0;
    const images = [];

    function preLoadImages() {
      for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `/CokeVdo/frame_${i.toString().padStart(4, "0")}.png`;

        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
          imagesLoaded++;

          if (imagesLoaded === 1) {
            loadImage(frames.currIndex);
          }

          if (imagesLoaded === frames.maxIndex) {
            loadImage(frames.currIndex);
          }
        };

        img.onerror = () => {
          imagesLoaded++;
        };

        images.push(img);
      }
    }

    function loadImage(idx) {
      if (idx >= 1 && idx <= frames.maxIndex) {
        const img = images[idx - 1];

        if (!img || !img.complete) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;

        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currIndex = idx;
      }
    }

    function startAnimation() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".parent",
          start: "top top",
          end: "top -250%",
          scrub: 3,
          pin: true,
        },
      });

      tl.to(frames, {
        currIndex: frames.maxIndex,
        onUpdate: () => {
          loadImage(Math.floor(frames.currIndex));
        },
      });
    }

    preLoadImages();
    startAnimation();
  }, []);

  return (
    <div className="w-full anim">
      <div className="parent w-full h-screen relative">

        <FooterContent/>
        <div className="w-full h-screen sticky top-0 left-0">
          <canvas ref={canvasRef} className="w-full h-screen" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
