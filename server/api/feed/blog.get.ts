import { XMLParser } from 'fast-xml-parser'
import homepageConfig from '~~/homepage.config'

export default defineCachedEventHandler(async (_event) => {
	const parser = new XMLParser({
		attributeNamePrefix: '$',
		cdataPropName: '$',
		ignoreAttributes: false,
		isArray: name => name === 'entry' || name === 'category',
		textNodeName: '_',
		trimValues: true,
	})

	const resp = await fetch(homepageConfig.blogAtom)
	let text = await resp.text()

	// 处理可能的PHP错误信息，只保留XML部分
	const xmlStartIndex = text.indexOf('<?xml')
	if (xmlStartIndex !== -1) {
		text = text.slice(xmlStartIndex)
	}

	const objAtom = parser.parse(text)
	const entries = objAtom.feed?.entry || []

	// 转换为Article组件期望的格式
	return entries.map(entry => {
		// 处理title，提取CDATA内容
		const title = typeof entry.title === 'object' && entry.title.$ 
			? entry.title.$ 
			: (entry.title || '')

		// 处理summary，提取CDATA内容
		const summary = typeof entry.summary === 'object' && entry.summary.$ 
			? entry.summary.$ 
			: (entry.summary || '')

		// 处理link，确保格式正确
		let link = entry.link
		let href = ''
		
		if (Array.isArray(link)) {
			// 从数组中找到合适的link
			const alternateLink = link.find(l => typeof l === 'object' && l.$ && l.$.rel === 'alternate')
			if (alternateLink) {
				link = alternateLink
			} else {
				// 取第一个有href属性的link
				link = link.find(l => typeof l === 'object' && l.$ && l.$.href) || link[0]
			}
		}
		
		if (typeof link === 'object' && link.$ && link.$.href) {
			href = link.$.href
		} else if (typeof link === 'string') {
			href = link
		}

		return {
			...entry,
			title,
			summary,
			link: { $href: href },
			category: entry.category || [],
		}
	})
}, {
	maxAge: 60 * 60 * 24,
})
