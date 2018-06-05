const { createGzip, createDeflate } = require('zlib') // node 内置的压缩算法

module.exports = (rs, req, res) => { // 流对象, 客户端 request, 服务端 response
	const acceptEncoding = req.headers['accept-encoding'] // 获取客户的请求头信息中的支持的压缩格式
	console.log('acceptEncoding: ', acceptEncoding)
	if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) { // 如果客户端不支持压缩 或者 服务端没有客户端所支持的压缩格式(这里假设服务端只支持 gzip 和 deflate)
		return rs // 直接返回 流对象, 不做任何处理
	} else if (acceptEncoding.match(/\bgzip\b/)) { // 可以优先使用 gizp
		res.setHeader('Content-Encoding', 'gzip') // 设置响应头, 告诉浏览器用 gzip 解压
		console.log('SUCCESS: 进入 GZIP 解压')
		return rs.pipe(createGzip())
	} else if (acceptEncoding.match(/\bdeflate\b/)) { // 可以优先使用 gizp
		res.setHeader('Content-Encoding', 'deflate')
		return rs.pipe(createDeflate())
	} 
}