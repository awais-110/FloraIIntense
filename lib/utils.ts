export function whatsappUrl(text: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923173626703";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
