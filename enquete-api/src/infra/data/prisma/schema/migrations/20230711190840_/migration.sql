/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_user` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `name_user` on the `Author` table. All the data in the column will be lost.
  - Added the required column `id_author` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" DROP CONSTRAINT "pk_user",
DROP COLUMN "email_user",
DROP COLUMN "id_user",
DROP COLUMN "name_user",
ADD COLUMN     "email_author" VARCHAR(200),
ADD COLUMN     "id_author" UUID NOT NULL,
ADD COLUMN     "name_author" VARCHAR(200),
ADD CONSTRAINT "pk_user" PRIMARY KEY ("id_author");
