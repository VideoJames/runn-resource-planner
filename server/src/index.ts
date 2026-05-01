import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Pool } from 'pg'
import 'dotenv/config'

const server = Fastify({ logger: true })
server.register(cors)

const db = new Pool({ connectionString: process.env.DATABASE_URL })

server.get('/health', async () => {
	return { status: 'ok' }
})

server.get('/capacity', async (request) => {
	const { weekStart } = request.query as { weekStart: string }
	
	const result = await db.query(`
		SELECT
			p.id AS "personId",
			p.name AS "personName",
			p.capacity_hours_per_week AS "capacityHours",
			COALESCE(SUM(a.hours), 0):: integer AS "allocatedHours"
		FROM people p
		LEFT JOIN allocations a
			ON a.person_id = p.id
			AND a.week_start_date = $1
		GROUP BY p.id, p.name, p.capacity_hours_per_week
	`, [weekStart])
	
	return result.rows.map(row => ({
		...row,
		utilisationPercent: Math.round((row.allocatedHours / row.capacityHours) * 100)
	}))	
})

server.listen({ port: 3001, host: '0.0.0.0' }, (err) => {
	if (err) {
		server.log.error(err)
		process.exit(1)
	}
})