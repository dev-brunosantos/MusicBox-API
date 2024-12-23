-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sobrenome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dt_cadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
