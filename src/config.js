module.exports = {
	PORT: 3000,
	HOST_NAME: '127.0.0.1',
	ROOT: process.cwd(),
	COMPRESS: /\.(html|js|css|md)/,
	CACHE: {
		maxAge: 600, // 秒
		expires: true,
		cacheControl: true,
		lastModified: true,
		eTag: true
	}
}
