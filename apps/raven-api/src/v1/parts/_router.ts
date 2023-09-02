import { Router } from 'itty-router'
import regulationVersionRouter from './regulation_version'
import headRouter from './head'

const router = Router({ base: '/api/v1/parts' })

router.get('/regulation_version/*', regulationVersionRouter.handle)
router.get('/head/*', headRouter.handle)

export default router