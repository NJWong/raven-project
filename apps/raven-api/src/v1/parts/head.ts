import { Request, Router } from 'itty-router'
import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'
import { eq } from 'drizzle-orm'
import { head, regulationVersion } from '../../../drizzle/schema'

const router = Router({ base: '/api/v1/parts/head' })

router.get('/', async (request: Request, env: Env) => {
	const client = createClient({
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN,
	})

  const db = drizzle(client)

  const result = await db.select().from(head).innerJoin(regulationVersion, eq(head.regulationVersionId, regulationVersion.id))

  const data = result.map(({ head, regulation_version }) => {

    const { regulationVersionId, ...rest } = head

    return {
      ...rest,
      regulationVersion: regulation_version.name,
    }
  })

  const response = {
    data,
  }

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
})

export default router