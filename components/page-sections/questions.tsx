// "use client"

// import React, { useState } from "react";

// const faqs = [
//     {
//         question: "¿Cómo hago un pedido?",
//         answer: "Puedes hacer tu pedido a través de nuestra página web o llamando al número que aparece en la sección de contacto.",
//     },
//     {
//         question: "¿Cuáles son los métodos de pago aceptados?",
//         answer: "Aceptamos pagos en efectivo, tarjeta de crédito y débito.",
//     },
//     {
//         question: "¿Realizan entregas a domicilio?",
//         answer: "Sí, realizamos entregas a domicilio dentro de la ciudad.",
//     },
// ];

// export function Questions()  {
//     const [openIndex, setOpenIndex] = useState<number | null>(null);

//     const toggle = (idx: number) => {
//         setOpenIndex(openIndex === idx ? null : idx);
//     };

//     return (
//         <section className="max-w-2xl mx-auto py-12 px-4">
//             <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
//             <div className="space-y-4">
//                 {faqs.map((faq, idx) => (
//                     <div key={idx} className="border rounded-lg">
//                         <button
//                             className="w-full flex justify-between items-center px-4 py-3 text-left font-medium focus:outline-none"
//                             onClick={() => toggle(idx)}
//                         >
//                             <span>{faq.question}</span>
//                             <svg
//                                 className={`w-5 h-5 transition-transform ${openIndex === idx ? "rotate-180" : ""}`}
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>
//                         {openIndex === idx && (
//                             <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };