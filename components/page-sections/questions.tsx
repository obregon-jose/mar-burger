"use client"

import React, { useState } from "react";

const faqs = [
    {
        question: "¿Cómo hago un pedido?",
        answer: "Puedes hacer tu pedido a través de nuestra página web o llamando al número que aparece en la sección de contacto.",
    },
    {
        question: "¿Cuáles son los métodos de pago aceptados?",
        answer: "Aceptamos pagos en efectivo, tarjeta de crédito y débito.",
    },
    {
        question: "¿Realizan entregas a domicilio?",
        answer: "Sí, realizamos entregas a domicilio dentro de la ciudad.",
    },
];

export function Questions() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="preguntas" className="py-10 sm:py-10 lg:py-10 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 uppercase">
                        <span className="text-red-500" >Preguntas </span>
                        <span className="text-white">Frecuentes</span>
                    </h2>
                    {/* <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            
                    </p> */}
                </div>
            </div>
            <div className=" max-w-4xl px-6 mx-auto">
                <div className="flex flex-col space-y-6 h-full">
                    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
                        <div className="space-y-2 text-gray-300 text-sm">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border rounded-lg bg-black">
                                    <button
                                        className="w-full flex justify-between items-center px-4 py-3 text-left font-medium focus:outline-none"
                                        onClick={() => toggle(idx)}
                                    >
                                        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto-">{faq.question}</p>
                                        <svg
                                            className={`w-5 h-5 transition-transform ${openIndex === idx ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openIndex === idx && (
                                        <div className="px-4 pb-4 text-gray-300">
                                            <span className="text-gray-300">{faq.answer}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};