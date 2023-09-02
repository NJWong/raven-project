import dotenv from 'dotenv'
import fs from 'fs'
import Papa from 'papaparse'
import { createClient } from '@libsql/client'
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { head, regulationVersion } from '../drizzle/schema'

dotenv.config()

function snakeToCamel (str: string) {
  return str.replace(/_([a-z])/g, (group) =>
    group[1].toUpperCase()
  )
}

/**
 * Converts the snake_case headers from the CSV file to camelCase as per the Drizzle schema
 */
function transformHeader (header: string) {
  return snakeToCamel(header)
}

async function seedRegulationVersion(db: LibSQLDatabase) {
  console.log('Seeding regulation_version table...')

  fs.readFile('data/regulation_version.csv', 'utf-8', async (err, data) => {
    if (err) {
      console.error(err)
    } else {
      // 1. Parse CSV file
      const parsedCsv = Papa.parse(data, { header: true, dynamicTyping: { id: true, name: false, date: false }, transformHeader })

      // 2. Validate CSV data
      const insertRegulationVersionSchema = createInsertSchema(regulationVersion)
      const validatedData: Array<z.TypeOf<typeof insertRegulationVersionSchema>> = []

      for (const row of parsedCsv.data) {
        const validatedRow = insertRegulationVersionSchema.parse(row)

        validatedData.push(validatedRow)
      }

      // 3. Insert validated data into database
      await db.insert(regulationVersion).values(validatedData)
    }
  })
}

async function seedHead(db: LibSQLDatabase) {
  console.log('Seeding head table...')

  fs.readFile('data/head.csv', 'utf-8', async (err, data) => {
    if (err) {
      console.error(err)
    } else {
      // 1. Parse CSV file
      const parsedCsv = Papa.parse(data, { header: true, dynamicTyping: true, transformHeader })

      // 2. Validate CSV data
      const insertHeadSchema = createInsertSchema(head)
      const validatedData: Array<z.TypeOf<typeof insertHeadSchema>> = []

      for (const row of parsedCsv.data) {
        const validatedRow = insertHeadSchema.parse(row)

        validatedData.push(validatedRow)
      }

      // 3. Insert validated data into database
      await db.insert(head).values(validatedData)
    }
  })
}

async function main () {
  console.log('--- db:seed starting ---')

  const client = createClient({
    url: process.env.DATABASE_URL ?? '',
    authToken: process.env.DATABASE_AUTH_TOKEN,
  })

  const db = drizzle(client)

  // Clear all tables
  await db.delete(head)
  await db.delete(regulationVersion)

  // Seed tables
  await seedRegulationVersion(db)
  await seedHead(db)

  console.log('--- db:seed completed ---\n')
}

main()