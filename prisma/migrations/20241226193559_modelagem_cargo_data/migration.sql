-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cargo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cargo" TEXT NOT NULL,
    "dt_cadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" TEXT NOT NULL
);
INSERT INTO "new_Cargo" ("cargo", "dt_atualizacao", "dt_cadastro", "id") SELECT "cargo", "dt_atualizacao", "dt_cadastro", "id" FROM "Cargo";
DROP TABLE "Cargo";
ALTER TABLE "new_Cargo" RENAME TO "Cargo";
CREATE UNIQUE INDEX "Cargo_cargo_key" ON "Cargo"("cargo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
