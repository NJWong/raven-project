import { Router } from 'itty-router'
import routerV1 from './v1/apiRouter'

const router = Router()

router.get('/api/v1/*', routerV1.handle)

router.all('*', () => {
  const html = `
    <html>
      <head>
        <title>Raven API</title>
      </head>
      <body>
        <h1>Welcome to Raven API</h1>
        <p>Some endpoints you can try:</p>
        <ul>
          <li><a href="/api/v1/parts/head">/api/v1/parts/head</a></li>
        <ul>
      </body>
    </html>
  `

  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html' }})
})

export default router