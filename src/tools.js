const { promisify } = require('util')
const fs = require('fs')

module.exports = {
	stat: promisify(fs.stat),
	readdir: promisify(fs.readdir)
}