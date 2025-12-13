import homepageConfig from '~~/homepage.config'

export default defineCachedEventHandler(async (_event) => {
	const resp = await fetch(`${homepageConfig.ech0Api}/api/echo/page`)
	const data = await resp.json()
	
	if (data.code === 1) {
		return data.data.items
	}
	
	return []
}, {
	maxAge: 60 * 60 * 24,
})