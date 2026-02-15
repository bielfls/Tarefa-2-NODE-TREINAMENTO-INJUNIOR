import { app } from "./app.js"

const host = '0.0.0.0'
const port = 3333

app.listen({
    host,
    port,
}).then(() => {
    const url = `http://localhost${port}`
    console.log(`HTTP Server Running at ${url}`)
})