import { XMLParser } from 'fast-xml-parser'
import homepageConfig from '~~/homepage.config'

export default defineCachedEventHandler(async (event) => {
  // 直接获取并解析博客文章数据，避免内部API调用
  const parser = new XMLParser({
    attributeNamePrefix: '$',
    cdataPropName: '$',
    ignoreAttributes: false,
    isArray: name => name === 'item' || name === 'category',
    textNodeName: '_',
  })

  const resp = await fetch(homepageConfig.blogAtom)
  const objRss = parser.parse(await resp.text())
  const blogFeed = objRss.rss?.channel?.item || []
  
  // 获取请求URL，用于构建完整的链接
  const baseUrl = homepageConfig.url
  
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
<link>${new URL('/article', baseUrl).href}</link>
<atom:link href="${new URL('/api/feed/article', baseUrl).href}" rel="self" type="application/rss+xml" />
<language>${homepageConfig.language}</language>
<description>${homepageConfig.description}</description>
<lastBuildDate>${pubDate}</lastBuildDate>
<pubDate>${pubDate}</pubDate>
${blogFeed.map((article: any) => {
  // 确保文章发布日期是RFC 822格式
  const articlePubDate = new Date(article.pubDate || article.published).toUTCString()
  
  return `<item>
<title>${article.title._ || article.title}</title>
<link>${article.link._ || article.link}</link>
<guid>${article.guid._ || article.guid}</guid>
<pubDate>${articlePubDate}</pubDate>
<dc:creator>${article['dc:creator']._ || article['dc:creator'] || homepageConfig.author.name}</dc:creator>
<description><![CDATA[${article.description._ || article.description || ''}]]></description>
${article['content:encoded'] ? `<content:encoded xml:lang="${homepageConfig.language}"><![CDATA[${article['content:encoded']._ || article['content:encoded']}]]></content:encoded>` : ''}
<slash:comments>${article['slash:comments'] || 0}</slash:comments>
<comments>${article.comments || (article.link._ || article.link) + '#comments'}</comments>
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