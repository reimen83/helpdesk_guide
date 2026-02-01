CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int AUTO_INCREMENT NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL UNIQUE,
  `excerpt` text,
  `content` text,
  `category` varchar(100),
  `tags` varchar(500),
  `author` varchar(255),
  `thumbnail` varchar(500),
  `source` varchar(255),
  `sourceUrl` varchar(500),
  `published` boolean DEFAULT true,
  `views` int DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `publishedAt` timestamp,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`)
);
