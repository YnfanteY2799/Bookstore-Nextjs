import { authors, genres, dummyBooks } from "./src";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const authorSeeds = await prisma.authors.createManyAndReturn({
      data: authors.map((auth) => ({ full_name: auth })),
      select: { id: true, sur_name: true, fore_name: true },
      skipDuplicates: true,
    });

    const genresSeeds = await prisma.genre.createManyAndReturn({
      data: genres.map((genre) => ({ name: genre })),
      select: { id: true, name: true },
      skipDuplicates: true,
    });

    // This code is not suitable for a properly donde Production env : YY
    const dummyBooksSeeds = await prisma.book.createMany({
      data: dummyBooks.map(({ coverImage, year, title, genre, description, author }) => {
        return {
          title,
          coverImage,
          description,
          totalRating: 0,
          year: new Date(),
          genres_ids: genre.map((x) => (genresSeeds.find((old) => old.name === x) ?? { id: 0 }).id),
          author_id: authorSeeds.find(({ fore_name, sur_name }) => `${fore_name} ${sur_name}` === author)?.id ?? 1,
        };
      }),
    });

    console.log({ authorSeeds, genresSeeds, dummyBooksSeeds });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

(async () => {
  await main();
  await prisma.$disconnect();
  process.exit();
})();
