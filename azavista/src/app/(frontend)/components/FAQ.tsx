"use client";

import type { FAQBlockData } from "../types";
import { useEffect, useRef, useState } from "react";

export default function FAQ({ title, items = [] }: FAQBlockData) {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-20 bg-[#f1f4f9]">
            <div className="max-w-5xl mx-auto px-6 ">
                {title && (
                    <h2 className="max-w-3xl mx-auto font-bold text-center text-4xl sm:text-4xl lg:text-4xl text-gray-900 mb-12">
                        {title}
                    </h2>
                )}

                <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-y border-gray-200">
                    {items.map((item, idx) => (
                        <FAQItem key={idx} question={item.question} answer={item.answer} />)
                    )}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState<number>(0);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        if (open) {
            setMaxHeight(el.scrollHeight);
        } else {
            setMaxHeight(0);
        }
    }, [open]);

    return (
        <div className="py-0">
            <button
                type="button"
                aria-expanded={open}
                className="group w-full flex items-center justify-between text-left py-6"
                onClick={() => setOpen((v) => !v)}
            >
                <span className={`text-md md:text-xl font-medium ${open ? "text-[#2b59ff]" : "text-gray-900 group-hover:text-[#2b59ff]"}`}>
                    {question}
                </span>
                <span
                    className={`ml-6 shrink-0 ${open ? "text-[#2b59ff]" : "text-gray-400 group-hover:text-[#2b59ff]"} transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                        }`}
                >
                    ∨
                </span>
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight }}
                className="overflow-hidden transition-[max-height] duration-400 ease-out"
            >
                <p className={`pb-6 text-gray-600 leading-relaxed transition-opacity duration-300 ${open ? "opacity-100 mt-1" : "opacity-0 mt-0"}`}>
                    {answer}
                </p>
            </div>
        </div>
    );
}


