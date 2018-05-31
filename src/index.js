const http = require('http')
const { PORT, HOST_NAME } = require('./config.js')

http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/html')
	res.write('<html>')
	res.write('<body>')
	res.write('<h1>')
	res.write('what the fuck')
	res.write('</h1>')
	res.write('</body>')
	res.write('</html>')
	res.end()
}).listen(PORT, HOST_NAME, () => {
	console.log(`服务器已启动: http://${HOST_NAME}:${PORT}`)
})