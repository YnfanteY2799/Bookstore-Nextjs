"use server";

import { prisma } from "@/db";
import type { IBookCardProps } from "@/types";

export async function createBook(): Promise<any> {}
export async function updateBook(): Promise<any> {}
export async function deleteBook(): Promise<any> {}

export async function getBooks(
  name?: string,
  author?: number,
  genre?: string,
  year?: string,
  page?: number
): Promise<Array<IBookCardProps>> {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        year: true,
        title: true,
        coverImage: true,
        description: true,
        Genres: { select: { name: true } },
        Reviews: { select: { rating: true } },
        Authors: { select: { fore_name: true, sur_name: true } },
      },
      where: {
        title: { contains: name },
        author_id: { equals: author },
        Genres: { some: { name: genre } },
      },
      take: 10,
    });

    return books;
  } catch (e) {}
}
