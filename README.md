# Sugar & Soul 🍰

Baked with Love, Delivered with Care.

**Sugar & Soul** is a premium **Handcrafted Home Bakery** website built with modern web technologies. It features a "Dark Luxury" design aesthetic, allowing users to browse a variety of baked goods—including plain cakes, cream cakes, brownies, and cupcakes—and place orders seamlessly via WhatsApp.

[**🌐 Live Demo**](https://sugernsoul.shop/)

![Sugar & Soul Banner](/public/images/logo.png)

## 🚀 Technologies Used

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Database & Auth**: [Supabase](https://supabase.com/)
-   **Deployment**: Vercel / Hostinger (Static Export compatible)

## ✨ Key Features

-   **🎨 Dark Luxury Aesthetic**:
    -   Deep black backgrounds with gold accents for a premium feel.
    -   Smooth "slow zoom" cinematic animations in the Hero section.
    -   Glassmorphism and subtle gradients throughout the UI.
-   **📱 Universal Mobile Design**:
    -   Optimized for all screen sizes, including 5-7 inch mobile displays.
    -   Dynamic viewport adjustments (`dvh`) for perfect fit.
-   **🛒 Interactive Product Modal**:
    -   Detailed view with high-quality images.
    -   Weight/Quantity selection (1lb, 2lb, 3lb, Pieces).
    -   **Interactive 5-Star Rating System**.
    -   Dynamic price calculation.
-   **📲 WhatsApp Ordering**: Direct integration generating pre-filled order messages with product details, selected options, and user rating.
-   **🔐 Robust Authentication**:
    -   Secure email/password login via Supabase.
    -   **Forgot Password Flow**: Complete reset mechanism with secure feedback.
    -   **Persistent Sessions**: Keeps users logged in across refreshes.
-   **🎂 Automated Birthday System**:
    -   **Birthday Detection**: Automatically detects user's birthday based on profile data.
    -   **Celebratory Banner**: Displays a personalized greeting with confetti animations.
    -   **Exclusive Offers**: Direct WhatsApp link to claim special birthday surprises.

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
sugar-and-soul/
├── public/              # Static assets (images, favicons)
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Navbar, Footer
│   │   ├── product/     # ProductCard, ProductModal
│   │   └── ui/          # Buttons, Inputs
│   ├── lib/             # Utilities (products.ts data, helpers)
│   └── types/           # TypeScript interfaces
└── ...
```

## 📝 Configuration

-   **Product Data**: Managed in `src/lib/products.ts`. Add or edit products there.
-   **Brand Info**: Constants for brand name, phone number, etc., are properly typed and reused.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary to Sugar & Soul.
