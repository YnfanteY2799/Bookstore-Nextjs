"use client";
import { AddBookModal, BookCard, Filters, FilterSearchbar } from "@/components";
import { type ReactNode } from "react";

import type { IHomeComponentProps } from "@/types";

export default function HomeComponent({ Books }: IHomeComponentProps): ReactNode {
  return (
    <div className="flex-grow container mx-auto px-4 py-8 flex">
      <div className="flex-grow justify-center">
        <div className="mb-8 flex justify-between">
          <p className="text-3xl font-bold">Featured Books</p>

          <div className="flex gap-2">
            <FilterSearchbar />
            <Filters />
            <AddBookModal />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {(Books ?? []).map((book) => (
            <BookCard {...book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
