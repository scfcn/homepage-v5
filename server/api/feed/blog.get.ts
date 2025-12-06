import { XMLParser } from 'fast-xml-parser'
import homepageConfig from '~~/homepage.config'

export default defineCachedEventHandler(async (_event) => {
	const parser = new XMLParser({
		attributeNamePrefix: '$',
		cdataPropName: '$',
		ignoreAttributes: false,
		isArray: name => name === 'item' || name === 'category',
		textNodeName: '_',
	})

	try {
		const resp = await fetch(homepageConfig.blogAtom, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
			},
			redirect: 'follow'
		})
		
		if (!resp.ok) {
			console.error(`Failed to fetch blog feed: ${resp.status} ${resp.statusText}`)
			return []
		}
		
		const text = await resp.text()
		const objRss = parser.parse(text)
		
		if (!objRss.rss?.channel) {
			console.error('Invalid feed structure, no channel element found')
			return []
		}
		
		const items = objRss.rss.channel.item || []
		
		// 转换RSS格式为期望的Atom格式结构
		return items.map((item: any) => ({
			title: { _: item.title?._ || item.title || '' },
			link: { $href: item.link?._ || item.link || '' },
			id: item.guid?._ || item.guid || item.link?._ || item.link || '',
			published: item.pubDate?._ || item.pubDate || '',
			updated: item.pubDate?._ || item.pubDate || '',
			summary: { _: item.description?._ || item.description || '' },
			category: item.category || []
		}))
	} catch (error) {
		console.error('Error fetching or parsing blog feed:', error)
		return []
	}
}, {
	maxAge: 60 * 60 * 24,
})
