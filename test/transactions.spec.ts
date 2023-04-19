import { expect, it, beforeAll, beforeEach, afterAll, describe } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'

import { application } from '../src/application'

describe('Transaction routes', () => {
  beforeAll(async () => {
    await application.ready()
  })

  afterAll(async () => {
    await application.close()
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    await request(application.server)
      .post('/transactions')
      .send({
        title: 'Example transaction',
        amount: 5e3,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all your transactions', async () => {
    const createTransactionResponse = await request(application.server)
      .post('/transactions')
      .send({
        title: 'Example transaction',
        amount: 5e3,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const transactionsListResponse = await request(application.server)
      .get('/transactions')
      .send()
      .set('Cookie', cookies)
      .expect(200)

    expect(transactionsListResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Example transaction',
        amount: 5e3,
      }),
    ])
  })

  it('should be able to get specific transactions', async () => {
    const createTransactionResponse = await request(application.server)
      .post('/transactions')
      .send({
        title: 'Example transaction',
        amount: 5e3,
        type: 'credit',
      })

    const sessionId = createTransactionResponse.body.transaction[0].session_id
    const transactionId = createTransactionResponse.body.transaction[0].id
    const cookies = `sessionId="${sessionId}"`

    const getTransactionResponse = await request(application.server)
      .get(`/transactions/${transactionId}`)
      .send()
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual({
      id: transactionId,
      title: 'Example transaction',
      amount: 5e3,
      created_at: expect.any(String),
      session_id: sessionId,
    })
  })

  it('should be able to get summary transactions', async () => {
    const createTransactionResponse = await request(application.server)
      .post('/transactions')
      .send({
        title: 'Credit transaction',
        amount: 5e3,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(application.server)
      .post('/transactions')
      .send({
        title: 'Debit transaction',
        amount: 2e3,
        type: 'debit',
      })
      .set('Cookie', cookies)

    const summaryTransactionsResponse = await request(application.server)
      .get('/transactions/summary')
      .send()
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryTransactionsResponse.body.summary.amount).toEqual(3e3)
  })
})
