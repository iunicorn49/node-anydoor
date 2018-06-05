## 实用插件

### supervisor
> 用这个来执行 node, 修改文件, 不用手动重启.

### mime
> 自动设置响应头类型(根据返回的东西判断).

## 知识点

### range
> 请求目标字节段.
#### 前提
1. range: 请求头中需要有 `bytes=[start]-[end]`
2. Accept-Ranges: 响应头中需要有 `bytes`
3. Content-Range: 响应头中需要有 `bytes start-end/total`

### 缓存
#### 头信息
1. Expires, Cache-Control (绝对时间, 相对时间)
2. If-Modified-Since/Last-Modified (上一次的修改时间相关, 可以判断文件是否变动)
3. If-None-Match/ETag (通过hash值来判断文件是否变动)