"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "Laptop", price: 60000, category: "electronics" },
  { id: 2, name: "T-Shirt", price: 1200, category: "clothing" },
  { id: 3, name: "Headphones", price: 3000, category: "electronics" },
  { id: 4, name: "Jeans", price: 2500, category: "clothing" },
];

export default function Home() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");

  let filteredProducts =
    category === "all"
      ? [...products]
      : products.filter((p) => p.category === category);

  filteredProducts = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <main className="min-h-screen bg-blue-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
        Product Listing App
      </h1>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-64"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="all">All Products</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-700 col-span-full">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-blue-900">
                {product.name}
              </h2>
              <p className="text-gray-700">₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
