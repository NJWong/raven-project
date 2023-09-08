import { Request, Router } from 'itty-router'
import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'
import { sql } from "drizzle-orm"
import { generator } from '../../../drizzle/schema'

const router = Router({ base: '/api/v1/parts/generator' })

router.get('/', async (request: Request, env: Env) => {
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)
  const limit = parseInt(params.get('limit') ?? '20') ?? 20
  const cappedLimit = Math.min(limit, 60)
  const offset = parseInt(params.get('offset') ?? '0') ?? 0

	const client = createClient({
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN,
	})

  const db = drizzle(client)

  const result = await db.select().from(generator).orderBy(generator.id).limit(cappedLimit).offset(offset)
  const countResult = await db.select({ count: sql<number>`count(*)` }).from(generator)

  const response = {
    meta: {
      limit: cappedLimit,
      offset,
      total: countResult[0].count,
    },
    data: result
  }

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
})

export default router