const sendWhatsAppMessage = (
  phone: string,
  message: string = "¡Hola! Me gustaría hacer un pedido en Mar Burger 🍔"
) => {
  const whatsappUrl = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
};

export default sendWhatsAppMessage;