const http = require('http')
const path = require('path')
const { PORT, HOST_NAME, ROOT } = require('./config')
const { stat, readdir, createReadStream } = require('./tools')
const route = require('./route')

http.createServer((req, res) => {
	const filePath = path.join(ROOT, req.url)
	route(req, res, filePath)
}).listen(PORT, HOST_NAME, () => {
	console.log(`服务器已启动: http://${HOST_NAME}:${PORT}`)
})