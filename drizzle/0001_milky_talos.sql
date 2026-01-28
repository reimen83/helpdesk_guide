CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`level` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
	`duration` int,
	`instructor` varchar(255),
	`thumbnail` varchar(500),
	`price` decimal(10,2) DEFAULT '0',
	`isFree` boolean DEFAULT true,
	`totalLessons` int DEFAULT 0,
	`rating` decimal(3,1) DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`progress` int DEFAULT 0,
	`status` enum('enrolled','in_progress','completed','dropped') DEFAULT 'enrolled',
	`completedLessons` int DEFAULT 0,
	`enrolledAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `enrollments_id` PRIMARY KEY(`id`)
);
