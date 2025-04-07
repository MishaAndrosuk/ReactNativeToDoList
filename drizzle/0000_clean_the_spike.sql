CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`date` text NOT NULL,
	`priority` text NOT NULL,
	`status` text NOT NULL
);
-- CREATE TABLE IF NOT EXISTS tasks (
--     id INTEGER PRIMARY KEY NOT NULL, 
--     title TEXT NOT NULL,
--     date TEXT NOT NULL,
--     priority TEXT CHECK(priority IN ('low', 'mid', 'high')) NOT NULL,
--     status TEXT CHECK(status IN ('in progress', 'completed')) NOT NULL
-- );
