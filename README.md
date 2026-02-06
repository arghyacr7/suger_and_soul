# Sugar & Soul 🍰

Baked with Love, Delivered with Care.

**Sugar & Soul** is a premium cloud kitchen cake shop website built with modern web technologies. It allows users to browse a variety of baked goods, including plain cakes, cream cakes, brownies, and cupcakes, and place orders seamlessly via WhatsApp.

![Sugar & Soul Banner](/public/images/logo.png) *(Note: Replace with actual banner if available)*

## 🚀 Technologies Used

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: Vercel / Hostinger (Static Export compatible)

## ✨ Key Features

-   **📱 Fully Responsive Design**: Mobile-first approach ensuring a great experience on all devices.
-   **🎨 Dynamic Product Cards**: Beautifully designed cards with tagging (e.g., "Anniversary", "Kids Special").
-   **🔍 Search & Filtering**: Easy navigation through categories and search functionality.
-   **🛒 Interactive Product Modal**:
    -   Detailed view with high-quality images.
    -   Weight/Quantity selection (1lb, 2lb, 3lb, Pieces).
    -   **Interactive 5-Star Rating System**.
    -   Dynamic price calculation.
-   **📲 WhatsApp Ordering**: Direct integration generating pre-filled order messages with product details, selected options, and user rating.
-   **🏷️ Occasion-Based Tagging**: Highlights special cakes for Anniversaries, Kids' Birthdays, etc.
-   **🔐 Robust Authentication**:
    -   Secure email/password login via Supabase.
    -   **Persistent Sessions**: Keeps users logged in across refreshes and browser restarts.
    -   **Simplified Profile**: Clean user interface showing name and logout options.
-   **🎂 Automated Birthday System**:
    -   **Birthday Detection**: Automatically detects user's birthday based on profile data.
    -   **Celebratory Banner**: Displays a personalized greeting with confetti animations.
    -   **Exclusive Offers**: Direct WhatsApp link to claim special birthday surprises.
    -   **Smart Dismissal**: Remembers banner dismissal for the day but resets annually.

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
