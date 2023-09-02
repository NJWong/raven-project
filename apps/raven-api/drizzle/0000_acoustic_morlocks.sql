-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `libsql_wasm_func_table` (
	`name` text PRIMARY KEY NOT NULL,
	`body` text
);
--> statement-breakpoint
CREATE TABLE `regulation_version` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `head` (
	`id` integer PRIMARY KEY NOT NULL,
	`regulation_version_id` integer NOT NULL,
	`name` text NOT NULL,
	`ap` integer NOT NULL,
	`anti_kinetic_defense` integer NOT NULL,
	`anti_energy_defense` integer NOT NULL,
	`anti_explosive_defense` integer NOT NULL,
	`attitude_stability` integer NOT NULL,
	`system_recovery` integer NOT NULL,
	`scan_distance` integer NOT NULL,
	`scan_effect_duration` real NOT NULL,
	`weight` integer NOT NULL,
	`en_load` integer NOT NULL
);

*/