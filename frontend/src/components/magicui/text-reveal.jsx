"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";
export const TextReveal = ({ children, className }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[50vh]", className)}>
      <div
        className={
          "flex sticky top-0 justify-center items-center mx-auto text-justify bg-transparent h-[50vh] w-[90vw] px-[1rem] py-[5rem]"
        }
      >
        <span
          className={
            "flex flex-wrap items-center p-5 w-full text-2xl font-bold text-justify text-white/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 0.5) / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5 ">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity }} className={"text-white dark:text-white"}>
        {children}
      </motion.span>
    </span>
  );
};
