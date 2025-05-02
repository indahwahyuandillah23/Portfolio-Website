-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT[],
    "images" TEXT[],
    "githubUrl" TEXT,
    "liveUrl" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
