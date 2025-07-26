"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

const allReviews = [
    { name: "Ana López", comment: "¡Los camarones al ajillo están brutales! Volveré pronto.", rating: 5, date: "Julio 2025" },
    { name: "Carlos Pérez", comment: "Los combos son económicos y el pescado fresco. Me encantó.", rating: 5, date: "Julio 2025" },
    { name: "María García", comment: "La hamburguesa de camarón es una joya escondida 😋", rating: 5, date: "Junio 2025" },
    { name: "Luis Torres", comment: "Buena sazón caribeña. Todo muy sabroso y rápido.", rating: 4, date: "Junio 2025" },
    { name: "Sofía Ramírez", comment: "Me gustó mucho el ceviche, aunque la bebida estaba un poco dulce.", rating: 4, date: "Mayo 2025" },
    { name: "Pedro Medina", comment: "Ambiente relajado, ideal para almorzar mariscos sin gastar mucho.", rating: 5, date: "Mayo 2025" },
    // { name: "Gabriela Suárez", comment: "¡Excelente atención y la comida llegó muy rápido! El arroz con mariscos estaba delicioso, definitivamente regresaré con mi familia.", rating: 5, date: "Abril 2025" },
    // { name: "Jorge Castillo", comment: "El lugar es pequeño pero acogedor. Me gustó la variedad de opciones en el menú.", rating: 4, date: "Marzo 2025" },
    // { name: "Valentina Ríos", comment: "Probé la hamburguesa de pescado y fue una grata sorpresa. Muy recomendable.", rating: 5, date: "Febrero 2025" },
    // { name: "Miguel Ángel", comment: "Todo bien, pero el local estaba un poco lleno y tardaron en atenderme.", rating: 3, date: "Enero 2025" },
];

const Star = ({ filled }: { filled: boolean }) => (
    <svg
        className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
    </svg>
);

export function Reviews() {
    const [visibleReviews, setVisibleReviews] = useState(4);

    const handleShowMore = () => {
        setVisibleReviews((prev) => prev + 2);
    };

    return (
        <section id="opiniones" className="py-10 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 uppercase">
                        <span className="text-yellow-400">Sabores </span>
                        <span className="text-white">y opiniones</span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-4xl mx-auto">
                        Cada bocado merece ser contado. Tus palabras le dan sazón a lo que hacemos.
                    </p>
                </div>
            </div>


            <div className="max-w-6xl mx-auto px-6">
                <div className="grid gap-3 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    {allReviews.slice(0, visibleReviews).map((review, idx) => (
                        <div
                            key={idx}
                            className="w-full- max-w-2xl- bg-black border-red-600/20 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex justify-between">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 relative bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-700 mr-3 text-lg uppercase">
                                        {/* {review.name[0]} */}
                                        {review.name[0]}{review.name.split(' ')[1]?.[0] || ''}
                                    </div>
                                    <div>
                                        <p className="text-gray-300 font-semibold">{review.name}</p>
                                        <p className="text-sm text-gray-300">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} filled={star <= review.rating} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-300 italic">“{review.comment}”</p>
                        </div>
                    ))}
                </div>

                {visibleReviews < allReviews.length && (
                    <div className="text-center mt-10">
                        <Button
                            className="bg-yellow-400 text-gray-900 font-semibold py-2 px-6 hover:bg-yellow-500 transition"
                            onClick={handleShowMore}
                        >
                            Ver más
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
