import { sqliteTable, AnySQLiteColumn, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const libsqlWasmFuncTable = sqliteTable("libsql_wasm_func_table", {
	name: text("name").primaryKey().notNull(),
	body: text("body"),
});

export const regulationVersion = sqliteTable("regulation_version", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	date: text("date").notNull(),
});

export const head = sqliteTable("head", {
	id: integer("id").primaryKey().notNull(),
	regulationVersion: text("regulation_version").notNull(),
	name: text("name").notNull(),
	ap: integer("ap").notNull(),
	antiKineticDefense: integer("anti_kinetic_defense").notNull(),
	antiEnergyDefense: integer("anti_energy_defense").notNull(),
	antiExplosiveDefense: integer("anti_explosive_defense").notNull(),
	attitudeStability: integer("attitude_stability").notNull(),
	systemRecovery: integer("system_recovery").notNull(),
	scanDistance: integer("scan_distance").notNull(),
	scanEffectDuration: real("scan_effect_duration").notNull(),
	weight: integer("weight").notNull(),
	enLoad: integer("en_load").notNull(),
});

export const core = sqliteTable("core", {
	id: integer("id").primaryKey().notNull(),
	regulationVersion: text("regulation_version").notNull(),
	name: text("name").notNull(),
	ap: integer("ap").notNull(),
	antiKineticDefense: integer("anti_kinetic_defense").notNull(),
	antiEnergyDefense: integer("anti_energy_defense").notNull(),
	antiExplosiveDefense: integer("anti_explosive_defense").notNull(),
	attitudeStability: integer("attitude_stability").notNull(),
	boosterEfficiencyAdj: integer("booster_efficiency_adj").notNull(),
	generatorOutputAdj: integer("generator_output_adj").notNull(),
	generatorSupplyAdj: integer("generator_supply_adj").notNull(),
	weight: integer("weight").notNull(),
	enLoad: integer("en_load").notNull(),
});

export const arms = sqliteTable("arms", {
	id: integer("id").primaryKey().notNull(),
	regulationVersion: text("regulation_version").notNull(),
	name: text("name").notNull(),
	ap: integer("ap").notNull(),
	antiKineticDefense: integer("anti_kinetic_defense").notNull(),
	antiEnergyDefense: integer("anti_energy_defense").notNull(),
	antiExplosiveDefense: integer("anti_explosive_defense").notNull(),
	armsLoadLimit: integer("arms_load_limit").notNull(),
	recoilControl: integer("recoil_control").notNull(),
	firearmSpecialization: integer("firearm_specialization").notNull(),
	meleeSpecialization: integer("melee_specialization").notNull(),
	weight: integer("weight").notNull(),
	enLoad: integer("en_load").notNull(),
});

export const legs = sqliteTable("legs", {
	id: integer("id").primaryKey().notNull(),
	regulationVersion: text("regulation_version").notNull(),
	name: text("name").notNull(),
	ap: integer("ap").notNull(),
	antiKineticDefense: integer("anti_kinetic_defense").notNull(),
	antiEnergyDefense: integer("anti_energy_defense").notNull(),
	antiExplosiveDefense: integer("anti_explosive_defense").notNull(),
	attitudeStability: integer("attitude_stability").notNull(),
	loadLimit: integer("load_limit").notNull(),
	jumpDistance: integer("jump_distance"),
	jumpHeight: integer("jump_height"),
	travelSpeed: integer("travel_speed"),
	highSpeedPerf: integer("high_speed_perf"),
	thrust: integer("thrust"),
	upwardThrust: integer("upward_thrust"),
	upwardEnConsumption: integer("upward_en_consumption"),
	qbThrust: integer("qb_thrust"),
	qbJetDuration: real("qb_jet_duration"),
	qbEnConsumption: integer("qb_en_consumption"),
	qbReloadTime: real("qb_reload_time"),
	qbReloadIdealWeight: integer("qb_reload_ideal_weight"),
	abThrust: integer("ab_thrust"),
	abEnConsumption: integer("ab_en_consumption"),
	weight: integer("weight").notNull(),
	enLoad: integer("en_load").notNull(),
});