/*
  Warnings:

  - Added the required column `cargoId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "dt_cadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" DATETIME NOT NULL,
    CONSTRAINT "Usuario_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("dt_atualizacao", "dt_cadastro", "email", "id", "nome", "senha", "sobrenome") SELECT "dt_atualizacao", "dt_cadastro", "email", "id", "nome", "senha", "sobrenome" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
