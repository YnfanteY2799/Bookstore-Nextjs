"use client";

import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { type ReactNode, useState } from "react";
import { Filters } from "@/components";

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, category: "Classic" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, category: "Fiction" },
  { id: 3, title: "1984", author: "George Orwell", price: 11.99, category: "Science Fiction" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 9.99, category: "Romance" },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 10.99, category: "Fiction" },
  { id: 6, title: "Moby-Dick", author: "Herman Melville", price: 13.99, category: "Classic" },
];

export default function HomePage(): ReactNode {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20]);

  const filteredBooks = books.filter(
    (book) =>
      (selectedCategories.length === 0 || selectedCategories.includes(book.category)) &&
      book.price >= priceRange[0] &&
      book.price <= priceRange[1]
  );

  function onFilter(key?: any) {}

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex">
      <div className="flex-grow justify-center">
        <div className="mb-8 flex justify-between">
          <p className="text-3xl font-bold">Featured Books</p>
          <Filters onFilter={onFilter} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <Card className="py-4" key={book.id} isPressable>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image
                  width={270}
                  alt="Card background"
                  className="object-cover rounded-xl w-full"
                  src="https://nextui.org/images/hero-card-complete.jpeg"
                />
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                <small className="text-default-500">12 Tracks</small>
                <h4 className="font-bold text-large">Frontend Radio</h4>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
