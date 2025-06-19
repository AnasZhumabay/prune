import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypewriterEffect = () => {
    return (
        <h2 className="text-3xl font-mono text-peach">
            <Typewriter
                words={["PRUNE", "MINIMAL", "PRECISE", "ALL FOR YOU"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
            />
        </h2>
    );
};

export default TypewriterEffect;
