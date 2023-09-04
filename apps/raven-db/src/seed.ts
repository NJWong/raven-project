import dotenv from 'dotenv'
import fs from 'fs'
import Papa from 'papaparse'
import { createClient } from '@libsql/client'
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { head, core } from '../drizzle/schema'

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

async function seedHead(db: LibSQLDatabase) {
  console.log('Seeding head table...')

  fs.readFile('data/head.csv', 'utf-8', async (err, data) => {
    if (err) {
      console.error(err)
    } else {
      // 1. Parse CSV file
      const parsedCsv = Papa.parse(data, {
        header: true,
        dynamicTyping: (header) => {
          if (header === 'regulationVersion') {
            return false
          }

          return true
        },
        transformHeader,
      })

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

async function seedCore(db: LibSQLDatabase) {
  console.log('Seeding core table...')

  fs.readFile('data/core.csv', 'utf-8', async (err, data) => {
    if (err) {
      console.error(err)
    } else {
      // 1. Parse CSV file
      const parsedCsv = Papa.parse(data, {
        header: true,
        dynamicTyping: (header) => {
          if (header === 'regulationVersion') {
            return false
          }

          return true
        },
        transformHeader,
      })

      // 2. Validate CSV data
      const insertCoreSchema = createInsertSchema(core)
      const validatedData: Array<z.TypeOf<typeof insertCoreSchema>> = []

      for (const row of parsedCsv.data) {
        const validatedRow = insertCoreSchema.parse(row)

        validatedData.push(validatedRow)
      }

      // 3. Insert validated data into database
      await db.insert(core).values(validatedData)
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
  await db.delete(core)

  // Seed tables
  await seedHead(db)
  await seedCore(db)

  console.log('--- db:seed completed ---\n')
}

main()