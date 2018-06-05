module.exports = (totalSize, req, res) => { // 总字节数, request, response
	const range = req.headers['range']
	if (!range) { // 如果没有, 正常返回
		return {code: 200}
	}
	const sizes = range.match(/bytes=(\d*)-(\d*)/) // 正则分割
	const end = sizes[2] || totalSize - 1
	const start = sizes[1] || totalSize - end
	if (start > end || start < 0 || end > totalSize) {
		return {code: 200}
	}
	res.setHeader('Accept-Ranges', 'bytes')
	res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
	res.setHeader('Content-Length', end - start)
	return {
		code: 206, // 代表返回部分内容
		start: +start,
		end: +end
	}
}