const {exec} = require('child_process') // 调用系统的可执行文件, 工具包 node 内置

module.exports = url => {
	switch (process.platform) {
		case 'darwin': // mac
			exec(`open ${url}`)
			break
		case 'win32': // windows
		exec(`start ${url}`)
		break
		default:
			break
	}
}