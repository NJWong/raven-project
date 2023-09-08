import { Request, Router } from 'itty-router'
import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'
import { partsSpecs } from '../../../drizzle/schema'

const router = Router({ base: '/api/v1/parts/specs' })

router.get('/', async (request: Request, env: Env) => {
	const client = createClient({
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN,
	})

  const db = drizzle(client)

  const result = await db.select().from(partsSpecs)

  const response = {
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