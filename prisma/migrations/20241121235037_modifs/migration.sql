/*
  Warnings:

  - You are about to drop the `_BookToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_B_fkey";

-- DropTable
DROP TABLE "_BookToUser";

-- CreateTable
CREATE TABLE "UserFavoriteBooks" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "create_time" DATE DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE,

    CONSTRAINT "UserFavoriteBooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "UserFavoriteBooks" ADD CONSTRAINT "UserFavoriteBooks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteBooks" ADD CONSTRAINT "UserFavoriteBooks_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
