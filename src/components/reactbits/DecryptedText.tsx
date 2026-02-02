import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  animateOn?: "view" | "hover";
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 20,
  className = "",
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  animateOn = "hover",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const revealedIndices = useRef(new Set<number>());
  const iterations = useRef(0);

  useEffect(() => {
    let interval: any;

    if (isScrambling) {
      interval = setInterval(() => {
        setDisplayText((currentText) => {
          return currentText
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (revealedIndices.current.has(index)) return text[index];
              return availableChars[Math.floor(Math.random() * availableChars.length)];
            })
            .join("");
        });

        iterations.current++;

        if (iterations.current >= maxIterations) {
          revealNextChar();
        }
      }, speed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isScrambling, text, speed, maxIterations]);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
    : characters.split("");

  const revealNextChar = () => {
    const remainingIndices = text
      .split("")
      .map((_, i) => i)
      .filter((i) => !revealedIndices.current.has(i));

    if (remainingIndices.length === 0) {
      setIsScrambling(false);
      return;
    }

    let nextIndex;
    if (revealDirection === "start") {
      nextIndex = remainingIndices[0];
    } else if (revealDirection === "end") {
      nextIndex = remainingIndices[remainingIndices.length - 1];
    } else {
      const middle = Math.floor(remainingIndices.length / 2);
      nextIndex = remainingIndices[middle];
    }

    revealedIndices.current.add(nextIndex);
  };

  // Auto start on mount
  useEffect(() => {
    revealedIndices.current.clear();
    setIsScrambling(true);
    iterations.current = 0;
  }, []);

  return (
    <motion.span
      className={className}
      onMouseEnter={animateOn === "hover" ? () => {
        revealedIndices.current.clear();
        setIsScrambling(true);
        iterations.current = 0;
      } : undefined}
      viewport={{ once: true }} // For view animation
    >
      {displayText}
    </motion.span>
  );
}
