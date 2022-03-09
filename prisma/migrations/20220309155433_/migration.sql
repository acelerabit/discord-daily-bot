-- CreateTable
CREATE TABLE "AlertChannels" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "AlertChannels_pkey" PRIMARY KEY ("id")
);
