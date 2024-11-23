"use server";

import { getCurrentCursorOffSet } from "@/utils/server";
import { prisma } from "@/db";

import type { IBookCardProps } from "@/types";

export async function createBook(): Promise<any> {}
export async function updateBook(): Promise<any> {}
export async function deleteBook(): Promise<any> {}

// This method has a not normal/suited for an actual prod env, due to test time limits
export async function getBooks(
  name?: string,
  author?: number,
  genre?: number,
  year?: string,
  page: number = 1
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
        Authors: { select: { full_name: true } },
      },
      where: {
        title: { contains: name },
        author_id: { equals: author },
     //    Genres: { some: { id: genre } },
      },
      skip: await getCurrentCursorOffSet(page),
      orderBy: { id: "asc" },
      take: 10,
    });

    console.log({ books });

    return books.map(({ Authors, Genres, Reviews, year, ...common }) => {
      const reviews = Reviews.reduce((old, { rating }) => old + rating, 0);
      return {
        genre: Genres.map((x) => x.name),
        rating: reviews / Reviews.length,
        year: new Date(year).toString(),
        author: Authors.full_name,
        ...common,
        reviews,
      };
    });
  } catch (e) {
    throw new Error("");
  }
}
