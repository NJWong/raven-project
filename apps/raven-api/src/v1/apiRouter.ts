import { Router } from 'itty-router'

import partsRouter from './parts/_router'

const router = Router({ base: '/api/v1' })

router.get('/parts/*', partsRouter.handle)

export default router