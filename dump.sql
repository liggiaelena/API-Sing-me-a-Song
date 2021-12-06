CREATE TABLE "musics" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL UNIQUE,
	"youtube_link" VARCHAR(255) NOT NULL UNIQUE,
	CONSTRAINT "musics_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "scores" (
	"id" serial NOT NULL,
	"music_id" integer NOT NULL,
	"score" integer NOT NULL,
	CONSTRAINT "scores_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);