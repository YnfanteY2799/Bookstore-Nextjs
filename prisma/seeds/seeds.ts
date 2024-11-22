import { authors, genres, dummyBooks } from "./src";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const authorSeeds = await prisma.authors.createMany({
      data: authors.map((auth) => ({ fore_name: auth.split(" ")[0] ?? "", sur_name: auth.split(" ")[1] ?? "" })),
      skipDuplicates: true,
    });

    const genresSeeds = await prisma.genre.createMany({
      data: genres.map((genre) => ({ name: genre })),
      skipDuplicates: true,
    });

    //     console.log(genresSeeds, );

    //     const dummyBooksSeeds = await prisma.book.createMany({
    //       data: dummyBooks.map(({ coverImage, year, title }) => {
    //         return {
    //           year,
    //           title,
    //           coverImage,
    //           totalRating: 0,
    //         };
    //       }),
    //     });

    console.log({ authorSeeds, genresSeeds });

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
