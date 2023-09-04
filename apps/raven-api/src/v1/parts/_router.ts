import { Router } from 'itty-router'
import regulationVersionRouter from './regulation_version'
import headRouter from './head'
import coreRouter from './core'
import armsRouter from './arms'
import legsRouter from './legs'

const router = Router({ base: '/api/v1/parts' })

router.get('/regulation_version/*', regulationVersionRouter.handle)
router.get('/head/*', headRouter.handle)
router.get('/core/*', coreRouter.handle)
router.get('/arms/*', armsRouter.handle)
router.get('/legs/*', legsRouter.handle)

export default router