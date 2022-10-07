DROP TABLE IF EXISTS idea;

CREATE TABLE idea
(
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nick          TEXT      NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subject       TEXT      NOT NULL,
    body          TEXT      NOT NULL,
    likes         int       not null,
    live_duration int
);

DROP TABLE IF EXISTS total_likes;

CREATE TABLE total_likes
(
    likes INTEGER
);

DROP TABLE IF EXISTS like;

CREATE TABLE like
(
    ip TEXT NOT NULL,
    like_date TIMESTAMP NOT NULL
);