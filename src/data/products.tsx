
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  stock: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience superior sound quality with our premium noise-cancelling wireless headphones. Perfect for music enthusiasts and professionals alike.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    featured: true,
    stock: 15
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Track your fitness goals, receive notifications, and more with our latest Smart Watch Pro. Water resistant and long battery life.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
    featured: true,
    stock: 10
  },
  {
    id: "3",
    name: "Ultra HD 4K Monitor",
    description: "Enhance your visual experience with our Ultra HD 4K Monitor. Perfect for gaming, video editing, and professional work.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    category: "Electronics",
    featured: false,
    stock: 5
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Work in comfort with our ergonomic office chair, designed to provide optimal support for long hours of sitting.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
    category: "Furniture",
    featured: false,
    stock: 8
  },
  {
    id: "5",
    name: "Minimalist Desk Lamp",
    description: "Add a touch of elegance to your workspace with our minimalist desk lamp. Features adjustable brightness and color temperature.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    category: "Home Decor",
    featured: true,
    stock: 20
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description: "Take your music anywhere with our portable Bluetooth speaker. Waterproof and offers 20 hours of playback time.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "Electronics",
    featured: false,
    stock: 12
  },
  {
    id: "7",
    name: "Leather Messenger Bag",
    description: "Carry your essentials in style with our premium leather messenger bag. Handcrafted with attention to detail.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
    category: "Accessories",
    featured: true,
    stock: 7
  },
  {
    id: "8",
    name: "Mechanical Keyboard",
    description: "Enhance your typing experience with our mechanical keyboard. Customizable RGB lighting and satisfying key feedback.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
    category: "Electronics",
    featured: false,
    stock: 9
  }
];
