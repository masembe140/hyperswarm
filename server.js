import Hyperswarm from "hyperswarm";
import CoreStore from "corestore";

const store = new CoreStore('./db2')
const node = store.get({name: 'server'})
await node.ready()

const swarm = new Hyperswarm()

swarm.on('connection',(connection)=>{
  store.replicate(connection)
})

swarm.join(node.discoveryKey)
console.log(node.key.toString('hex'))
const message = prompt('enter something')
await node.append(Buffer.from(message))