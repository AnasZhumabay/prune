import React from 'react';
import CircularText from './CircularText';
import ScrollReveal from './ScrollReveal';
import ClickSpark from './ClickSpark';
import AnimatedTitle from './AnimatedTitle';


export default function Home() {
    return (
            <ClickSpark
                sparkColor='#fff'
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
            >
            <div className="bg-prune text-peach font-kode">
                {/* === Первая страница === */}
                <section className="h-screen flex items-center justify-center">
                    <div className="transform -translate-y-20">
                        <CircularText
                            text="PRUNE*PRUNE*PRUNE*"
                            onHover="speedUp"
                            spinDuration={20}
                            className="custom-class"
                        />
                    </div>
                </section>


                {/* === Вторая страница === */}
                <section className="h-screen flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 md:gap-0">
                    {/* Левая часть: логотип */}
                    <AnimatedTitle text="PRUNE" />

                    {/* Правая часть: описание */}
                    <div className="text-right text-xl leading-relaxed tracking-widest">
                        <ScrollReveal
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                        >Type Smarter, Not Harder              </ScrollReveal>
                    </div>
                </section>
            </div>
            </ClickSpark>
    );
}
