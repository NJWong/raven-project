import { expect, test } from 'vitest'
import request from 'supertest'
import { createSelectSchema } from 'drizzle-zod'
import { arms } from '../../../drizzle/schema'

import { CURRENT_VERSION } from '../consts/regulationVersion'

const api = request('http://127.0.0.1:8787')

test('GET arm parts', async () => {
  const res = await api.get('/api/v1/parts/arms')

  // Check status
  const status = res.status
  expect(status).toBe(200)

  // Check default pagination values
  const meta = res.body.meta
  expect(meta.limit).toBe(20)
  expect(meta.offset).toBe(0)

  // Check metadata
  expect(meta.total).toBe(18) // 18 unique arms in the game
  expect(meta.regulationVersion).toBe(CURRENT_VERSION)

  // Check data
  const data = res.body.data
  expect(data.length).toBe(18) // 18 is less than the default limit of 20
})

test('GET arm parts with regulationVersion - valid', async () => {
  const res = await api.get('/api/v1/parts/arms?reg_ver=1.01')

  // Check status
  const status = res.status
  expect(status).toBe(200)

  // Check default pagination values
  const meta = res.body.meta
  expect(meta.limit).toBe(20)
  expect(meta.offset).toBe(0)

  // Check metadata
  expect(meta.total).toBe(18) // 18 unique arms in the game
  expect(meta.regulationVersion).toBe('1.01')

  // Check data
  const data = res.body.data
  expect(data.length).toBe(18) // 18 is less than the default limit of 20
})

test('GET arm parts with regulationVersion - invalid', async () => {
  const res = await api.get('/api/v1/parts/arms?reg_ver=0.5')

  // Check status
  const status = res.status
  expect(status).toBe(200)

  // Check default pagination values
  const meta = res.body.meta
  expect(meta.limit).toBe(20)
  expect(meta.offset).toBe(0)

  // Check metadata
  expect(meta.total).toBe(18) // 18 unique arms in the game
  expect(meta.regulationVersion).toBe(CURRENT_VERSION)

  // Check data
  const data = res.body.data
  expect(data.length).toBe(18) // 18 is less than the default limit of 20
})

test('GET arm parts with pagination - valid', async () => {
  const res = await api.get('/api/v1/parts/arms?limit=5&offset=2')

  // Check status
  const status = res.status
  expect(status).toBe(200)

  // Check default pagination values
  const meta = res.body.meta
  expect(meta.limit).toBe(5)
  expect(meta.offset).toBe(2)

  // Check metadata
  expect(meta.total).toBe(18) // 18 unique arms in the game
  expect(meta.regulationVersion).toBe(CURRENT_VERSION)

  // Check data
  const data = res.body.data
  expect(data.length).toBe(5) // match the limit query param
})

test('GET arm parts with pagination - invalid limit', async () => {
  const res = await api.get('/api/v1/parts/arms?limit=x')

  // Check status
  const status = res.status
  expect(status).toBe(400)

  // Check error
  expect(res.body.error).toBe('Invalid limit')
})

test('GET arm parts with pagination - invalid offset', async () => {
  const res = await api.get('/api/v1/parts/arms?offset=y')

  // Check status
  const status = res.status
  expect(status).toBe(400)

  // Check error
  expect(res.body.error).toBe('Invalid offset')
})

test('GET arm part by ID - valid', async () => {
  const res = await api.get('/api/v1/parts/arms/5')

  // Check status
  const status = res.status
  expect(status).toBe(200)

  // Check data
  const data = res.body
  expect(data.id).toBe(5)

  // Check data schema
  const parsed = createSelectSchema(arms).parse(data)
  expect(parsed).toEqual(data)
})

test('GET arm part by ID - invalid', async () => {
  const res = await api.get('/api/v1/parts/arms/invalid')

  // Check status
  const status = res.status
  expect(status).toBe(400)

  // Check error
  expect(res.body.error).toBe('Invalid ID')
})