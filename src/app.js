const http = require('http')
const path = require('path')
const conf = require('./config')
const { stat, readdir, createReadStream } = require('./tools')
const route = require('./route')
const openUrl = require('./openUrl')

class Server {
	constructor (config) {
		this.conf = Object.assign({}, conf, config)
	}
	start () {
		http.createServer((req, res) => {
			const filePath = path.join(this.conf.ROOT, req.url)
			route(req, res, filePath)
		}).listen(conf.PORT, conf.HOST_NAME, () => {
			console.log(`服务器已启动: http://${this.conf.HOST_NAME}:${this.conf.PORT}`)
			openUrl(`http://${this.conf.HOST_NAME}:${this.conf.PORT}`)
		})
	}
}

module.exports = Server