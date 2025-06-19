import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import mammoth from "mammoth";

export default function TypeTrainer() {
    const location = useLocation();
    const [text, setText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [finished, setFinished] = useState(false);
    const [points, setPoints] = useState(0);
    const [isSoundOn, setIsSoundOn] = useState(true); // ✅ состояние звука

    const inputRef = useRef(null);

    const keySound = useRef(null);
    const errorSound = useRef(null);
    const successSound = useRef(null);

    const queryParams = new URLSearchParams(location.search);
    const file = queryParams.get("file");

    const normalizeChar = (char) => {
        return ["'", "‘", "’", ","].includes(char) ? "," : char;
    };

    useEffect(() => {
        if (file) {
            fetch(`/books/${file}`)
                .then((res) => res.arrayBuffer())
                .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
                .then((result) => {
                    const plainText = result.value.replace(/<[^>]+>/g, "").trim();
                    setText(plainText);
                })
                .catch((err) => console.error("Ошибка чтения файла:", err));
        }
    }, [file]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!startTime) setStartTime(Date.now());

            if (e.key.length === 1 || e.key === "Backspace") {
                e.preventDefault();

                if (e.key === "Backspace") {
                    setUserInput((prev) => prev.slice(0, -1));
                } else {
                    const key = normalizeChar(e.key);
                    setUserInput((prev) => {
                        const nextChar = normalizeChar(text[prev.length]);

                        if (key === nextChar) {
                            if (isSoundOn) keySound.current?.play(); // ✅ звук при правильном
                            setPoints((p) => p + 1);
                        } else {
                            if (isSoundOn) errorSound.current?.play(); // ✅ звук при ошибке
                        }

                        const updated = prev + key;
                        if (updated.length === text.length) {
                            setFinished(true);
                            successSound.current?.play();
                        }
                        return updated;
                    });
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [text, startTime, isSoundOn]);

    const renderText = () => {
        return text.split("").map((char, idx) => {
            const expected = normalizeChar(char);
            const typed = normalizeChar(userInput[idx]);

            let color = "text-white";
            if (idx < userInput.length) {
                color =
                    expected === typed
                        ? "text-green-400"
                        : "text-red-500 animate-pulse";
            }

            return (
                <span key={idx} className={`${color} text-xl`}>
                    {char}
                </span>
            );
        });
    };

    const accuracy = () => {
        let correct = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (normalizeChar(userInput[i]) === normalizeChar(text[i])) correct++;
        }
        return ((correct / text.length) * 100).toFixed(2);
    };

    const wpm = () => {
        const minutes = (Date.now() - startTime) / 60000;
        const words = userInput.trim().split(/\s+/).length;
        return (words / minutes).toFixed(2);
    };

    return (
        <div
            className="min-h-screen bg-prune text-peach p-10 font-kode"
            onClick={() => inputRef.current?.focus()}
        >
            <h1 className="text-2xl mb-6 tracking-wide">🏆 TypeTrainer</h1>

            <button
                onClick={() => setIsSoundOn(!isSoundOn)} // ✅ переключатель
                className="mb-6 px-4 py-2 bg-yellow-300 text-black font-bold rounded shadow"
            >
                {isSoundOn ? "🔊 sound on" : "🔇 sound off"}
            </button>

            <div
                className="border-2 border-peach p-6 rounded-xl text-lg tracking-wide leading-relaxed max-w-4xl mx-auto bg-[#120019] shadow-lg min-h-[300px]"
                ref={inputRef}
                tabIndex={0}
            >
                {renderText()}
            </div>

            <div className="mt-8 text-center space-y-2">
                <p>Symbols typed: {userInput.length} / {text.length}</p>
                <p>Points: {points}</p>
                {finished && (
                    <>
                        <p className="text-green-400">✅ Finished!</p>
                        <p>Accuracy: {accuracy()}%</p>
                        <p>WPM: {wpm()}</p>
                    </>
                )}
            </div>

            {/* Звуки */}
            <audio src="/sounds/keystroke.mp3" ref={keySound} preload="auto" />
            <audio src="/sounds/error.mp3" ref={errorSound} preload="auto" />
            <audio src="/sounds/success.mp3" ref={successSound} preload="auto" />
        </div>
    );
}
