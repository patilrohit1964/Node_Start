const Product = require("../models/product.model");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

const tp = async () => {
  const products = await Product.insertMany([
    {
      name: "Wireless Headphones",
      description:
        "High-quality wireless headphones with noise-canceling technology.",
      price: 99.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Wireless+Headphones",
    },
    {
      name: "Smart Watch",
      description:
        "Stylish and feature-packed smart watch with fitness tracking capabilities.",
      price: 149.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Smart+Watch",
    },
    {
      name: "Laptop Backpack",
      description:
        "Durable and spacious backpack for carrying your laptop and accessories.",
      price: 49.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Laptop+Backpack",
    },
    {
      name: "Portable Speaker",
      description: "Compact and powerful portable speaker for on-the-go music.",
      price: 69.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Portable+Speaker",
    },
    {
      name: "Bluetooth Earbuds",
      description:
        "Premium Bluetooth earbuds with a long battery life and great sound quality.",
      price: 59.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Bluetooth+Earbuds",
    },
    {
      name: "Smartphone",
      description:
        "Latest smartphone with high-end features and a stunning display.",
      price: 799.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Smartphone",
    },
    {
      name: "Gaming Mouse",
      description:
        "Ergonomic gaming mouse with customizable buttons and high precision.",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Gaming+Mouse",
    },
    {
      name: "LED Desk Lamp",
      description: "Energy-efficient LED desk lamp with adjustable brightness.",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=LED+Desk+Lamp",
    },
    {
      name: "Smart Home Camera",
      description: "Security camera with motion detection and night vision.",
      price: 119.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Smart+Home+Camera",
    },
    {
      name: "External SSD",
      description:
        "Portable external SSD with fast data transfer speeds and large storage capacity.",
      price: 89.99,
      imageUrl: "https://via.placeholder.com/300x200?text=External+SSD",
    },
  ]);
};

