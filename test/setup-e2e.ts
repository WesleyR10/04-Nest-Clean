import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import Redis from 'ioredis'

import { DomainEvents } from '@/core/events/domain-events'
import { envSchema } from '@/infra/env/env'

config({ path: '.env', override: true }) // Vai carregar todas as variáveis de ambiente do arquivo .env
config({ path: '.env.test', override: true }) // Vai carregar todas as variáveis de ambiente do arquivo .env.test e sobrescrever as variáveis de ambiente do arquivo .env se houverem variáveis com o mesmo nome

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  DomainEvents.shouldRun = false

  await redis.flushdb() // Limpa o banco de dados do Redis

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})