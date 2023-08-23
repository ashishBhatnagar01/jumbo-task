-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watch_later_videos" (
    "id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "watch_later_videos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "videos_video_id_key" ON "videos"("video_id");

-- AddForeignKey
ALTER TABLE "watch_later_videos" ADD CONSTRAINT "watch_later_videos_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_later_videos" ADD CONSTRAINT "watch_later_videos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
