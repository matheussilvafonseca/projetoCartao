-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartao" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "nomeProprietario" TEXT NOT NULL,
    "validade" TIMESTAMP(3) NOT NULL,
    "digitoSeguranca" INTEGER NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "cartao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cartao" ADD CONSTRAINT "cartao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
