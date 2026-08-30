-- CreateTable
CREATE TABLE "destinations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "description" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "average_budget" DOUBLE PRECISION,
    "popularity_score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attractions" (
    "id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "estimated_cost" DOUBLE PRECISION,
    "opening_hours" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "attractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local_experiences" (
    "id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "estimated_cost" DOUBLE PRECISION,
    "duration_minutes" INTEGER,
    "popularity_score" DOUBLE PRECISION,
    "is_hidden_gem" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "local_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_interests" (
    "destination_id" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "relevance_score" DOUBLE PRECISION,

    CONSTRAINT "destination_interests_pkey" PRIMARY KEY ("destination_id","interest")
);

-- CreateTable
CREATE TABLE "trending_destinations" (
    "trend_id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "trend_score" DOUBLE PRECISION NOT NULL,
    "rank" INTEGER NOT NULL,
    "calculated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "trending_destinations_pkey" PRIMARY KEY ("trend_id")
);

-- CreateTable
CREATE TABLE "web_chat_conversations" (
    "conversation_id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "web_chat_conversations_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "web_chat_messages" (
    "message_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "web_chat_messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "web_plan_previews" (
    "preview_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "duration_days" INTEGER,
    "budget" DOUBLE PRECISION,
    "interests" TEXT[],
    "travel_style" TEXT,
    "preview_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "web_plan_previews_pkey" PRIMARY KEY ("preview_id")
);

-- CreateTable
CREATE TABLE "destination_media" (
    "media_id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "object_key" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "destination_media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "ar_assets" (
    "asset_id" TEXT NOT NULL,
    "attraction_id" TEXT NOT NULL,
    "asset_type" TEXT NOT NULL,
    "object_key" TEXT NOT NULL,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ar_assets_pkey" PRIMARY KEY ("asset_id")
);

-- AddForeignKey
ALTER TABLE "attractions" ADD CONSTRAINT "attractions_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_experiences" ADD CONSTRAINT "local_experiences_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_interests" ADD CONSTRAINT "destination_interests_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trending_destinations" ADD CONSTRAINT "trending_destinations_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web_chat_messages" ADD CONSTRAINT "web_chat_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "web_chat_conversations"("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web_plan_previews" ADD CONSTRAINT "web_plan_previews_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "web_chat_conversations"("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_media" ADD CONSTRAINT "destination_media_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ar_assets" ADD CONSTRAINT "ar_assets_attraction_id_fkey" FOREIGN KEY ("attraction_id") REFERENCES "attractions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
