const { CACHE } = require('./config')

function refreshRes (stats, res) {
	const {maxAge, expires, cacheControl, lastModified, eTag} = CACHE
	if (expires) {
		res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString()) // 毫秒
	}
	if (cacheControl) {
		res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
	}
	if (lastModified) { // 通过上一次修改时间判断
		res.setHeader('Last-Modified', stats.mtime.toUTCString())
	}
	if (eTag) { // 通过哈希值判断
		res.setHeader('ETag', `${stats.size}-${stats.mtime}`)
	}
}

module.exports = function isFresh (stats, req, res) {
	refreshRes(stats, res) // 先设置好头, 然后, 下面可以通过 getHeader 读取
	const lastModified = req.headers['if-modified-since']
	const etag = req.headers['if-none-match']
	if (!lastModified && !etag) { // 第一次请求的时候, 不可能携带这两个参数, 说明没有缓存
		return false
	}
	if (lastModified && lastModified !== res.getHeader('Last-Modified')) { // 携带了 lastModified 但是, 和服务器算出来的不一样, 缓存失效
		return false
	}
	if (eTag && eTag !== res.getHeader('ETag')) { // 携带了 ETag 但是, 和服务器算出来的不一样, 缓存失效
		return false
	}
	return true // 缓存有效
}