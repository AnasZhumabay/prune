import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedTitle = ({ text = "PRUNE", className = "" }) => {
    const titleRef = useRef(null);

    useEffect(() => {
        const letters = titleRef.current.querySelectorAll(".letter");

        gsap.fromTo(
            letters,
            {
                opacity: 0,
                y: 20,
                scale: 0.8,
                color: "#ffcc99",
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                color: "#FFE4B5",
                ease: "power3.out",
                stagger: 0.12,
                duration: 0.9,
                delay: 0.3,
            }
        );
    }, []);

    return (
        <h1 ref={titleRef} className={`text-8xl tracking-wider ${className}`}>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="inline-block letter transition-transform duration-300 hover:scale-125 hover:text-peach"
                    style={{
                        marginRight: "2px",
                    }}
                >
          {char}
        </span>
            ))}
        </h1>
    );
};

export default AnimatedTitle;
