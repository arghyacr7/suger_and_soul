import { Product } from "@/types";

export const WHATSAPP_NUMBER = "919836733874"; // Configurable

interface OrderDetails {
  product: Product;
  size?: number; // in pounds
  quantity?: number;
  totalPrice?: number;
}

export const generateWhatsAppLink = ({ product, size, quantity, totalPrice, text }: { 
    product?: Product; 
    size?: string; 
    quantity?: number; 
    totalPrice?: number;
    text?: string;
}) => {
    if (text) {
         return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    }
    
    // Fallback for simple calls (though we mostly use custom text now)
    const defaultText = `Hi Sugar & Soul, I want to order ${product?.name}`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultText)}`
}

export const buildWhatsAppLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};


