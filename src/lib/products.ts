import { Product } from "@/types"

export const products: Product[] = [
    // Plain Cakes (Public Folder: /images/plain cake/)
    {
        id: "p1",
        name: "Classic Vanilla Sponge Cake",
        description: "Soft and buttery vanilla sponge cake, perfect for tea time.",
        price: 300,
        variantPrices: { "1lb": 300, "2lb": 570, "3lb": 820 },
        image: "/images/plain cake/Classic_Vanilla_Sponge.jpg",
        category: "plain-cakes",
        bestseller: false,
        popular: false,
        occasions: ["casual"]
    },
    {
        id: "p2",
        name: "Rich Chocolate Sponge Cake",
        description: "Deep chocolate flavor in a soft sponge.",
        price: 350,
        variantPrices: { "1lb": 350, "2lb": 650, "3lb": 950 },
        image: "/images/plain cake/Rich_Chocolate_Sponge.jpg",
        category: "plain-cakes",
        bestseller: true,
        popular: true,
        occasions: ["kids", "casual"]
    },
    {
        id: "p3",
        name: "Rich Plum Cake",
        description: "Loaded with tutty fruity and dry fruits.",
        price: 400,
        variantPrices: { "1lb": 400, "2lb": 750, "3lb": 1100 },
        image: "/images/plain cake/rich_plum_cake.png",
        category: "plain-cakes",
        bestseller: true,
        popular: true,
        occasions: ["christmas", "celebration"]
    },
    {
        id: "p4",
        name: "Marble Cake",
        description: "A swirl of vanilla and chocolate sponge.",
        price: 350,
        variantPrices: { "1lb": 350, "2lb": 650, "3lb": 950 },
        image: "/images/plain cake/Marble_Cake.jpg",
        category: "plain-cakes",
        bestseller: false,
        popular: false,
        occasions: ["casual"]
    },
    {
        id: "p5",
        name: "Fruit Cake",
        description: "Traditional fruit cake packed with dried fruits and nuts.",
        price: 350,
        variantPrices: { "1lb": 350, "2lb": 650, "3lb": 950 },
        image: "/images/plain cake/Fruit_cake.png",
        category: "plain-cakes",
        bestseller: false,
        popular: true,
        occasions: ["christmas", "celebration"]
    },

    // Cream Cakes (Public Folder: /images/cream cake/)
    {
        id: "c1",
        name: "Chocolate Truffle Cake",
        description: "Rich dark chocolate ganache with moist sponge.",
        price: 650,
        variantPrices: { "1lb": 650, "2lb": 1200, "3lb": 1750 },
        image: "/images/cream cake/Chocolate_Truffle.jpg",
        category: "cream-cakes",
        bestseller: true,
        popular: true,
        occasions: ["birthday", "anniversary", "celebration"]
    },
    {
        id: "c2",
        name: "Red Velvet Cake",
        description: "Classic red velvet with cream cheese frosting.",
        price: 450,
        originalPrice: 500,
        discountText: "Limited Offer",
        tag: "Anniversary",
        variantPrices: { "1lb": 450, "2lb": 850, "3lb": 1250 },
        image: "/images/cream cake/red_velvet_cake.jpg",
        category: "cream-cakes",
        bestseller: false,
        popular: false,
        occasions: ["anniversary", "birthday", "love"]
    },
    {
        id: "c3",
        name: "Butterscotch Crunch Cake",
        description: "Crunchy caramelized nuts with fresh cream.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/Butterscotch_With_Crunch_Cake.png",
        category: "cream-cakes",
        bestseller: false,
        popular: false,
        occasions: ["birthday", "kids"]
    },
    {
        id: "c4",
        name: "Black Forest Cake",
        description: "Layers of chocolate, cherries, and whipped cream.",
        price: 550,
        variantPrices: { "1lb": 550, "2lb": 1000, "3lb": 1450 },
        image: "/images/cream cake/black_forest.jpg",
        category: "cream-cakes",
        bestseller: true,
        popular: true,
        occasions: ["birthday", "kids"]
    },
    {
        id: "cc1",
        name: "Pineapple Cream Cake",
        description: "Fresh pineapple chunks with light fluffy cream.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/pineapple_cream_cake.jpeg",
        category: "cream-cakes",
        bestseller: true,
        popular: true,
        occasions: ["birthday", "casual"]
    },
    {
        id: "cc2",
        name: "Mango Delight Cake",
        description: "Seasonal mango pulp with vanilla sponge.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/mango_delight_cake.jpg",
        category: "cream-cakes",
        bestseller: false,
        popular: false,
        occasions: ["birthday", "summer"]
    },
    {
        id: "cc3",
        name: "Strawberry Bliss Cake",
        description: "Sweet strawberry compote with fresh cream.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/Strawberry_Bliss.png",
        category: "cream-cakes",
        bestseller: false,
        popular: false,
        occasions: ["birthday", "kids", "love"]
    },
    {
        id: "cc4",
        name: "White Frosted Cake",
        description: "Elegant white frosted cake with a smooth finish.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/white_frosted_cake.png",
        category: "cream-cakes",
        bestseller: false,
        popular: true,
        occasions: ["wedding", "anniversary"]
    },
    {
        id: "cc5",
        name: "Floral Cake",
        description: "Beautiful cake decorated with edible floral designs.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/Floral_cake.png",
        category: "cream-cakes",
        bestseller: false,
        popular: true,
        occasions: ["birthday", "gift"]
    },
    {
        id: "cc6",
        name: "Spooky Spider Web Cake",
        description: "Fun and spooky spider web themed cake for parties.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/spooky_spider_web_cake.png",
        category: "cream-cakes",
        bestseller: true,
        popular: true,
        occasions: ["kids", "party"]
    },
    {
        id: "cc7",
        name: "Mehndi Special Cake",
        description: "Intricate mehndi-inspired designs for special celebrations.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/mehndi_special_cake.png",
        category: "cream-cakes",
        bestseller: false,
        popular: true,
        tag: "Special Occasion",
        occasions: ["celebration", "wedding"]
    },
    {
        id: "cc8",
        name: "Frozen Theme Cake",
        description: "Magical Frozen-themed cake perfect for kids' birthdays.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/Frozen_theme_cake.png",
        category: "cream-cakes",
        bestseller: false,
        popular: true,
        tag: "Kids Special",
        occasions: ["kids", "birthday"]
    },

    // New Cream Cakes
    {
        id: "cc-teach-butter",
        name: "Teachers’ Day Butterscotch Cake",
        description: "Delicious butterscotch cake crafted specially for Teachers’ Day celebrations.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/teachers-day-butterscotch-cake.jpg",
        category: "cream-cakes",
        bestseller: false,
        popular: true,
        tag: "Special Occasion",
        occasions: ["celebration", "teacher"]
    },
    {
        id: "cc-anniv-choc",
        name: "Anniversary Chocolate Cake",
        description: "Rich chocolate cream cake perfect for anniversaries and special moments.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/Anniversary_cake_choclate.jpg",
        category: "cream-cakes",
        bestseller: false,
        popular: true,
        tag: "Anniversary",
        occasions: ["anniversary", "chocolate"]
    },
    {
        id: "cc-red-velvet-special",
        name: "Red Velvet Cake (Special Design)",
        description: "Classic red velvet cake with an elegant special design and smooth frosting.",
        price: 450,
        variantPrices: { "1lb": 450, "2lb": 900, "3lb": 1300 },
        originalPrice: 500,
        discountText: "Special Offer",
        tag: "Anniversary",
        image: "/images/cream cake/Red_Velvet_Cake2.jpg",
        category: "cream-cakes",
        bestseller: false,
        popular: true,
        occasions: ["special", "celebration"]
    },
    {
        id: "cc-barbie",
        name: "Barbie Theme Cake",
        description: "Beautiful Barbie-themed cake, perfect for kids’ birthdays and celebrations.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/barbie_cake.jpg",
        category: "cream-cakes",
        bestseller: false,
        popular: true,
        tag: "Kids Special",
        occasions: ["kids", "birthday"]
    },
    {
        id: "cc-elephant",
        name: "Kids Special Elephant Cake",
        description: "Cute elephant-themed cake specially designed for kids’ celebrations.",
        price: 500,
        variantPrices: { "1lb": 500, "2lb": 900, "3lb": 1300 },
        image: "/images/cream cake/kids_special_elephant.jpg",
        category: "cream-cakes",
        bestseller: false,
        popular: true,
        tag: "Kids Special",
        occasions: ["kids", "birthday"]
    },

    // Cupcakes
    {
        id: "cup1",
        name: "Chocolate Cupcakes",
        description: "Soft and fluffy chocolate cupcakes, perfect for parties and gifting.",
        price: 20,
        variantPrices: { "piece": 20, "10pc": 170 },
        image: "/images/plain cake/Chocolate-Cupcakes.jpg", // Using the available image
        category: "plain-cakes",
        type: "cupcake",
        bestseller: false,
        popular: true,
        occasions: ["party", "gift"],
        originalPrice: 200,
        discountText: "Combo Offer"
    },

    // Brownies (Public Folder: /images/brownie/)
    {
        id: "b1",
        name: "Walnut Brownie",
        description: "Fudgy brownie loaded with roasted walnuts.",
        price: 50,
        variantPrices: { "piece": 50, "1lb": 250 },
        image: "/images/brownie/walnut_brownie.jpg",
        category: "brownies",
        bestseller: true,
        popular: true,
        occasions: ["casual", "gift"]
    },
    {
        id: "b2",
        name: "Choco Chip Brownie",
        description: "Gooey chocolate brownie with extra chips.",
        price: 50,
        variantPrices: { "piece": 50, "1lb": 250 },
        image: "/images/brownie/Choco_Chip_Brownie.jpg",
        category: "brownies",
        bestseller: false,
        popular: false,
        occasions: ["kids", "snack"]
    },
    {
        id: "b3",
        name: "Nutella Brownie",
        description: "Decadent brownie topped with Nutella swirl.",
        price: 60,
        variantPrices: { "piece": 60, "1lb": 300 },
        image: "/images/brownie/nutella_brownies.jpg",
        category: "brownies",
        bestseller: true,
        popular: true,
        occasions: ["gift", "love"]
    }
]

export const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category)
}

export const getProductById = (id: string) => {
    return products.find(product => product.id === id)
}
