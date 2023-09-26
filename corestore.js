import CoreStore from 'corestore'

const store = new CoreStore('./db')

const core = store.get({name: 'Korah'})

await core.ready()

console.log(core.key.toString('hex'))
console.log(core.length)

await core.append('I')
await core.append('Love')
await core.update()
let message = await core.get(1)
console.log(core.length)

let i = 0
while(i<core.length){
    message += await core.get(i)
    i++
}
console.log(message.toString())
const man = await core.truncate(4)
await core.append('Love you')
await core.update()
console.log(core.length)
while(i<core.length){
    message += await core.get(i)
    i++
}
console.log(message.toString())