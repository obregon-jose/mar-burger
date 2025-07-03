// "use client"

// import React from "react";

// const reviews = [
//     {
//         name: "Ana López",
//         comment: "¡La mejor hamburguesa que he probado! Excelente atención.",
//         rating: 5,
//     },
//     {
//         name: "Carlos Pérez",
//         comment: "Muy buen sabor y ambiente agradable.",
//         rating: 4,
//     },
//     {
//         name: "María García",
//         comment: "Servicio rápido y comida deliciosa.",
//         rating: 5,
//     },
// ];

// const Star = ({ filled }: { filled: boolean }) => (
//     <svg
//         className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
//         fill="currentColor"
//         viewBox="0 0 20 20"
//     >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
//     </svg>
// );

// export function Reviews() {
//     return (
//         <section className="bg-white py-12 px-4 md:px-8">
//             <div className="max-w-3xl mx-auto">
//                 <h2 className="text-3xl font-bold mb-6 text-center">Reseñas de Clientes</h2>
//                 <div className="space-y-6">
//                     {reviews.map((review, idx) => (
//                         <div
//                             key={idx}
//                             className="bg-gray-50 p-6 rounded-lg shadow flex flex-col md:flex-row items-start"
//                         >
//                             <div className="flex-shrink-0 mr-4 mb-2 md:mb-0">
//                                 <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-700">
//                                     {review.name[0]}
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="flex items-center mb-1">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <Star key={star} filled={star <= review.rating} />
//                                     ))}
//                                 </div>
//                                 <p className="text-gray-800 font-semibold">{review.name}</p>
//                                 <p className="text-gray-600">{review.comment}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
