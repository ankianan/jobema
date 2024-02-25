
import Fastify from 'fastify';
import cors from '@fastify/cors'
import { JobPosting } from './model/JobPosting.js';
import { getValueFromDB } from './getValueFromDB.js';
import { addJobPosting } from './util.js';
import { pollJobs } from './pollJobs.js';


const fastify = Fastify({
  logger: true,
  connectionTimeout: 1000
})


await fastify.register(cors, { 
    origin: "*",
  })
  

fastify.get('/poll/:since', async (request, reply) => {
    const pollResult = await pollJobs(request.params.since);
    let data = await Promise.all(pollResult.map(key=>getValueFromDB(key)));
    reply.send(data);
})

fastify.post('/', async (request, reply) => {
    const id = await addJobPosting(JobPosting.create(request.body));
    reply.send(id);
})



const start = async () => {
    try {
        await fastify.listen({ port: 3001 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()

