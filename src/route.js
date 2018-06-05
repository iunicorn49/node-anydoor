const fs = require('fs')
const path = require('path')
const { stat, readdir } = require('./tools')
const { ROOT, COMPRESS } = require('./config')
const Handlebars = require('handlebars')

const tplPath = path.join(__dirname, './template/dir.tpl')
const source = fs.readFileSync(tplPath, 'utf-8')
const template = Handlebars.compile(source)
const mime = require('mime')

const zip = require('./zip')
const range = require('./range')
const isFresh = require('./cache')

module.exports = async function (req, res, filePath) {
	let type = mime.getType(path.extname(filePath)) || 'text/plain'
	try {
		const stats = await stat(filePath)
		if (stats.isFile()) { // 如果是文件
			res.setHeader('Content-Type', `${type};charset=utf-8`)
			
			if (isFresh(stats, req, res)) { // 可以继续用缓存的情况
				res.statusCode = 304
				res.end()
				return
			}

			let rs = null
			const {code, start, end} = range(stats.size, req, res)
			if (code === 200) { // 返回完整字节
				res.statusCode = 200
				rs = fs.createReadStream(filePath) // 将文件以流方式, 回给客户端
			} else { // 返回部分字节
				res.statusCode = 206 // 部分内容
				rs = fs.createReadStream(filePath, {start, end})
			}			
			if (filePath.match(COMPRESS)) {
				rs = zip(rs, req, res)
			}
			rs.pipe(res)
		} else if (stats.isDirectory()) { // 如果是文件夹
			const files = await readdir(filePath)
			res.statusCode = 200
			res.setHeader('Content-Type', `text/html;charset=utf-8`)
			// res.writeHead(200, {'Content-Type': `text/html;charset=utf-8`})
			const dir = path.relative(ROOT, filePath)
			const data = {
				files,
				dir: dir ? `/${dir}` : '',
				title: path.basename(filePath)
			}
			res.end(template(data))
		}
	} catch(ex) {
		res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
		res.end(`filePath: ${filePath} is error .\n${ex.toString()}`)
	}
}