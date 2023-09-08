import { Router } from 'itty-router'

import partsRouter from './parts/_router'
import acRouter from './ac/_router'

const router = Router({ base: '/api/v1' })

router.get('/parts/*', partsRouter.handle)
router.get('/ac/*', acRouter.handle)

export default router