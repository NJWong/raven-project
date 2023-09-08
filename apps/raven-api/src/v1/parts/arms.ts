import { Request, Router } from 'itty-router'
import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'
import { sql, eq } from "drizzle-orm"
import { arms } from '../../../drizzle/schema'

const router = Router({ base: '/api/v1/parts/arms' })

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

  const result = await db.select().from(arms).orderBy(arms.id).limit(cappedLimit).offset(offset)
  const countResult = await db.select({ count: sql<number>`count(*)` }).from(arms)

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

router.get('/:id', async (request: Request, env: Env) => {
  const id = parseInt(request.params?.id ?? '')

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  })

  const db = drizzle(client)

  const result = await db.select().from(arms).where(eq(arms.id, id))

  return new Response(JSON.stringify(result[0]), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
})

export default router