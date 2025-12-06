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
		return items.map((item: any) => {
			if (!item) return null
				
			// 处理category字段，确保符合FeedProps接口
			let categories = item.category || []
			// 如果是字符串，转换为数组
			if (typeof categories === 'string') {
				categories = [{ $term: categories, $scheme: '' }]
			}
			// 如果是对象数组，转换为期望的格式
			else if (Array.isArray(categories)) {
				categories = categories.map((cat: any) => {
					if (typeof cat === 'string') {
						return { $term: cat, $scheme: '' }
					}
					// 如果是对象，提取$term和$scheme
					return {
						$term: cat._ || cat.$term || '',
						$scheme: cat.$scheme || ''
					}
				})
			}
			// 其他情况，返回空数组
			else {
				categories = []
			}
			
			// 获取标题和摘要文本
			const titleText = item.title?._ || item.title || ''
			const summaryText = item.description?._ || item.description || ''
			const linkText = item.link?._ || item.link || ''
			const pubDateText = item.pubDate?._ || item.pubDate || ''
			
			return {
				title: titleText,
				link: { $href: linkText },
				id: item.guid?._ || item.guid || linkText,
				published: pubDateText,
				updated: pubDateText,
				summary: summaryText,
				category: categories
			}
		}).filter(Boolean) // 过滤掉null值
	} catch (error) {
		console.error('Error fetching or parsing blog feed:', error)
		return []
	}
}, {
	maxAge: 60 * 60 * 24,
})
