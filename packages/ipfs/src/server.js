import Fastify from 'fastify';
import { getJson, publishJson } from './ipfs.js';
import cors from '@fastify/cors'


const fastify = Fastify({
  logger: true,
  connectionTimeout: 1000
})


await fastify.register(cors, { 
    origin: "*",
  })
  

fastify.get('/:cid', async (request, reply) => {
    const { cid } = request.params;
    const data = await getJson(cid);
    console.log(data);
    reply.send(data);
})

fastify.put('/', async (request, reply) => {
    const cid = await publishJson(request.body)
    reply.send(cid);
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()