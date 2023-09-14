import { Router } from 'itty-router'
import headRouter from './head'
import coreRouter from './core'
import armsRouter from './arms'
import legsRouter from './legs'
import boosterRouter from './booster'
import fcsRouter from './fcs'
import generatorRouter from './generator'
import specsRouter from './specs'

const router = Router({ base: '/api/v1/parts' })

router.get('/head/*', headRouter.handle)
router.get('/core/*', coreRouter.handle)
router.get('/arms/*', armsRouter.handle)
router.get('/legs/*', legsRouter.handle)
router.get('/booster/*', boosterRouter.handle)
router.get('/fcs/*', fcsRouter.handle)
router.get('/generator/*', generatorRouter.handle)
router.get('/specs/*', specsRouter.handle)

export default router