import { XMLParser } from 'fast-xml-parser'
import homepageConfig from '~~/homepage.config'

export default defineCachedEventHandler(async (event) => {
  // 直接获取并解析博客文章数据，避免内部API调用
  const parser = new XMLParser({
    attributeNamePrefix: '$',
    cdataPropName: '$',
    ignoreAttributes: false,
    isArray: name => name === 'entry' || name === 'category',
    textNodeName: '_',
  })

  const resp = await fetch(homepageConfig.blogAtom)
  const objAtom = parser.parse(await resp.text())
  const blogFeed = objAtom.feed?.entry || []
  
  // 获取请求URL，用于构建完整的链接
  const protocol = event.node.req.headers['x-forwarded-proto'] || 'http'
  const host = event.node.req.headers.host || homepageConfig.url
  const baseUrl = `${protocol}://${host}`
  
  // 生成当前时间的RFC 822格式
  const now = new Date()
  const pubDate = now.toUTCString()
  
  // 构建RSS 2.0 XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
 xmlns:content="http://purl.org/rss/1.0/modules/content/"
 xmlns:dc="http://purl.org/dc/elements/1.1/"
 xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
 xmlns:atom="http://www.w3.org/2005/Atom"
 xmlns:wfw="http://wellformedweb.org/CommentAPI/">
<channel>
<title>${homepageConfig.title} - 文章</title>
<link>${baseUrl}/article</link>
<atom:link href="${baseUrl}/api/feed/article" rel="self" type="application/rss+xml" />
<language>${homepageConfig.language}</language>
<description>${homepageConfig.description}</description>
<lastBuildDate>${pubDate}</lastBuildDate>
<pubDate>${pubDate}</pubDate>
${blogFeed.map((article: any) => {
  // 确保文章发布日期是RFC 822格式
  const articlePubDate = new Date(article.published).toUTCString()
  
  return `<item>
<title>${article.title._ || article.title}</title>
<link>${article.link.$href}</link>
<guid>${article.link.$href}</guid>
<pubDate>${articlePubDate}</pubDate>
<dc:creator>${homepageConfig.author.name}</dc:creator>
<description><![CDATA[${article.summary._ || article.summary}]]></description>
<slash:comments>0</slash:comments>
<comments>${article.link.$href}#comments</comments>
<wfw:commentRss>${homepageConfig.blogAtom}</wfw:commentRss>
</item>`
}).join('\n')}
</channel>
</rss>`
  
  // 设置响应头
  event.node.res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8')
  
  return rssXml
}, {
  maxAge: 60 * 60 * 24, // 缓存24小时
})