import { Request, Router } from 'itty-router'
import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'
import { sql, eq } from "drizzle-orm"
import { partsSpecs } from '../../../drizzle/schema'

const router = Router({ base: '/api/v1/parts/specs' })

router.get('/', async (request: Request, env: Env) => {
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)
  const name = params.get('name')
  const limit = parseInt(params.get('limit') ?? '20') ?? 20
  const cappedLimit = Math.min(limit, 60)
  const offset = parseInt(params.get('offset') ?? '0') ?? 0

	const client = createClient({
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN,
	})

  const db = drizzle(client)

  if (name) {
    const result = await db.select().from(partsSpecs).where(eq(partsSpecs.name, name))

    if (result[0]) {
      return new Response(JSON.stringify(result[0]), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    } else {
      return new Response(JSON.stringify({ error: 'Spec not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }
  } else {
    const result = await db.select().from(partsSpecs).orderBy(partsSpecs.id).limit(cappedLimit).offset(offset)
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(partsSpecs)

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
  }
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

  const result = await db.select().from(partsSpecs).where(eq(partsSpecs.id, id))

  return new Response(JSON.stringify(result[0]), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
})

export default router