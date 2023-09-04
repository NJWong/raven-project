import { Router } from 'itty-router'
import regulationVersionRouter from './regulation_version'
import headRouter from './head'
import coreRouter from './core'
import armsRouter from './arms'

const router = Router({ base: '/api/v1/parts' })

router.get('/regulation_version/*', regulationVersionRouter.handle)
router.get('/head/*', headRouter.handle)
router.get('/arms/*', armsRouter.handle)

export default router