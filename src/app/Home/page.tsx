"use client";

import { useState } from "react";

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, category: "Classic" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, category: "Fiction" },
  { id: 3, title: "1984", author: "George Orwell", price: 11.99, category: "Science Fiction" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 9.99, category: "Romance" },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 10.99, category: "Fiction" },
  { id: 6, title: "Moby-Dick", author: "Herman Melville", price: 13.99, category: "Classic" },
];

const categories = ["Classic", "Fiction", "Science Fiction", "Romance"];

export default function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20]);

  const filteredBooks = books.filter(
    (book) =>
      (selectedCategories.length === 0 || selectedCategories.includes(book.category)) &&
      book.price >= priceRange[0] &&
      book.price <= priceRange[1]
  );

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex">
      <aside className="w-64 mr-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Categories</h3>
          {categories.map((category) => (
            <div key={category} className="flex items-center mb-2">
              {/* <div
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(
                      checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category)
                    );
                  }}
                /> */}
              <label
                htmlFor={category}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Price Range</h3>
          {/* <Slider min={0} max={20} step={1} value={priceRange} onValueChange={setPriceRange} className="mb-2" /> */}
          <p className="text-sm text-gray-600">
            ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>
      </aside>
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-8">Featured Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="flex flex-col justify-between">
              <div className="pt-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <p className="text-lg font-bold">${book.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">{book.category}</p>
              </div>
              <div>
                <button className="w-full">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
