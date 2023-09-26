import 'dotenv/config'
import Hyperswarm from "hyperswarm";
import CoreStore from "corestore";

const remoteKey = process.env.SERVERPRIMARYKEY;
const store = new CoreStore('./db3')
const node = store.get(Buffer.from(remoteKey,'hex'))
await node.ready()

const swarm = new Hyperswarm()

swarm.on('connection',(connection)=>{
  store.replicate(connection)
})

swarm.join(node.discoveryKey)
console.log(node.key.toString('hex'))

await swarm.flush()
await node.update()

let message
let i = 0
while(i<node.length){
  message += await node.get(i)
  i++
}
console.log(message.toString())

