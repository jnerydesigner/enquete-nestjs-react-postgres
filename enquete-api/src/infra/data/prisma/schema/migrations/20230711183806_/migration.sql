-- CreateTable
CREATE TABLE "Author" (
    "id_user" UUID NOT NULL,
    "name_user" VARCHAR(200),
    "email_user" VARCHAR(200),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_user" PRIMARY KEY ("id_user")
);
