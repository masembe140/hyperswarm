import 'dotenv/config'
import Hyperswarm from 'hyperswarm'
import crypto from 'crypto'
import CoreStore from "corestore";

const store = new CoreStore('./db1');
const swarm = new Hyperswarm()
// const TOPIC = process.env.TOPIC

// const topic = crypto.createHash('sha256').update(TOPIC).digest()

const localWriter = store.get({name: 'localWriter'})
await localWriter.ready()



swarm.join(localWriter.discoveryKey)
swarm.on('connection',(remoteSocketConnection)=>{
    store.replicate(remoteSocketConnection)
    console.log('New connection from', remoteSocketConnection.remotePublicKey.toString('hex'))

    process.stdin.pipe(remoteSocketConnection).pipe(process.stdout)

    remoteSocketConnection.on('data', function (data) {
        console.log('Remote peer said:', data.toString())
    })
    remoteSocketConnection.on('error', function (err) {
        console.log('Remote peer errored:', err)
    })
    remoteSocketConnection.on('close', function () {
        console.log('Remote peer fully left')
    })

})