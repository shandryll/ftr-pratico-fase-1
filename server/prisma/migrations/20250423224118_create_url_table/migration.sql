-- CreateTable
CREATE TABLE "urls" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortenedUrl" TEXT NOT NULL,
    "urlAccessCounter" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_shortenedUrl_key" ON "urls"("shortenedUrl");
