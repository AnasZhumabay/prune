import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
                          children,
                          scrollContainerRef,
                          enableBlur = true,
                          baseOpacity = 0.1,
                          baseRotation = 3,
                          blurStrength = 4,
                          containerClassName = "",
                          textClassName = "",
                          rotationEnd = "bottom bottom",
                          wordAnimationEnd = "bottom bottom"
                      }) => {
    const containerRef = useRef(null);

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span className="inline-block word" key={index}>
          {word}
        </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller =
            scrollContainerRef && scrollContainerRef.current
                ? scrollContainerRef.current
                : window;

        // Rotation animation (блок целиком)
        gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: baseRotation },
            {
                rotate: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom',
                    end: rotationEnd,
                    scrub: 0.7,
                },
            }
        );

        const wordElements = el.querySelectorAll('.word');

        // Combined opacity + y + autoAlpha animation
        gsap.fromTo(
            wordElements,
            {
                y: 20,
                autoAlpha: baseOpacity ?? 0.1,
                filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
                willChange: 'opacity, transform, filter',
            },
            {
                y: 0,
                autoAlpha: 1,
                filter: 'blur(0px)',
                ease: 'power3.out',
                stagger: 0.08,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom-=20%',
                    end: wordAnimationEnd,
                    scrub: 0.7,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [
        scrollContainerRef,
        enableBlur,
        baseRotation,
        baseOpacity,
        rotationEnd,
        wordAnimationEnd,
        blurStrength,
    ]);


    return (
        <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
            <p
                className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}
            >
                {splitText}
            </p>
        </h2>
    );
};

export default ScrollReveal;
