const yargs = require('yargs') 
const Server = require('./app')

/**
 * yargs 用来制作命令行工具
 * 根据下面的自定义配置
 * node index.js --p 1511 (可以将端口号改成1511)
 */
const argv = yargs
	.usage('anydoor [options]')
	.option('p', { // 参数一: 设置 命令, 参数二: 对应的配置, 提示, 默认值
		alias: 'PORT',
		describe: '端口号',
		default: 3000
	})
	.option('h', {
		alias: 'HOST_NAME',
		describe: 'IP',
		default: '127.0.0.1'
	})
	.option('d', {
		alias: 'ROOT',
		describe: 'root',
		default: process.cwd()
	})
	.version()
	.alias('v', 'version')
	.help()
	.argv

	const server = new Server(argv)
	server.start()