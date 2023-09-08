import { Router } from 'itty-router'
import specsRouter from './specs'

const router = Router({ base: '/api/v1/ac' })

router.get('/specs/*', specsRouter.handle)

export default router