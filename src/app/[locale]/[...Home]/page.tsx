import { type AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { AddBookModal, BookCard, Filters, FilterSearchbar } from "@/components";
import { books } from "@/utils/client/consts.ts";

import type { ReactNode } from "react";

export default function HomePage(): ReactNode {
  // Hooks
  const { Common } = useMessages();
  const locale = useLocale();
  const Books = books;

  return (
    <div className="flex-grow container mx-auto px-4 py-4 flex">
      <div className="flex-grow justify-center">
        <NextIntlClientProvider messages={Common as AbstractIntlMessages} locale={locale}>
          <div className="mb-4 flex justify-between">
            <p className="text-3xl font-bold">Featured Books</p>

            <div className="flex gap-2">
              <FilterSearchbar />
              <Filters />
              <AddBookModal />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Books.map((book) => (
              <BookCard {...book} key={book.id} />
            ))}
          </div>
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
