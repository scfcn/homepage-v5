import type { Nav } from '~/types/nav'
import { h } from 'vue'
import homepageConfig from '~~/homepage.config'

// 图标查询：https://yesicon.app/ph
// 图标插件：https://marketplace.visualstudio.com/items?itemName=antfu.iconify

export default defineAppConfig({
	...homepageConfig,

	footer: [
		`© ${new Date().getFullYear()} 筱序二十`,
		h('a', { href: 'https://icp.gov.moe/?keyword=20256101', target: '_blank', rel: 'noopener nofollow' }, '萌ICP备20256101号'),
	],

	// 用于在主页展示下游引用
	fork: [
		{
			img: 'https://api-space.tnxg.top/avatar?s=qq',
			link: 'https://tnxg.top/',
			text: '天翔TNXG',
		},
		{
			img: 'https://q1.qlogo.cn/g?b=qq&nk=1043865083&s=2',
			link: 'https://www.xlenco.top/',
			text: 'Xlenco',
		},
		{
			img: 'https://www.mugzx.top/icon.png',
			link: 'https://www.mugzx.top/',
			text: 'Mugzx',
		},
		{
			img: 'https://cn.cravatar.com/avatar/1F6C8947D35A8186A1647009BA8BC5F2?size=256',
			link: 'https://www.kemiao.online/',
			text: '克喵爱吃卤面',
		},
		{
			img: 'https://q1.qlogo.cn/g?b=qq&nk=3310149631&s=2',
			link: 'https://gr114.com/',
			text: 'GreenRoc',
		},
		{
			img: 'https://q.qlogo.cn/g?b=qq&nk=2907713872&s=2',
			text: '筱序二十',
		},
		{
			img: 'https://file.furrys.im/img/logo.webp',
			link: 'https://www.furrys.im/',
			text: 'lpcay',
		},
	],

	nav: [
		{
			title: '',
			items: [
				{ icon: 'ri:id-card-line', text: '简介', url: '/' },
				{ icon: 'ri:quill-pen-line', text: '文章', url: '/article' },
				{ icon: 'ri:code-line', text: '项目', url: '/project' },
				{ icon: 'ri:planet-line', text: '站点', url: '/site' },
				{ icon: 'ri:history-line', text: '日志', url: '/log' },
			],
		},
		{
			title: '社交',
			items: [
				{ icon: 'ri:qq-line', text: '群: 665751334', url: 'https://qm.qq.com/q/gOTblcp6mW' },
				{ icon: 'ri:mail-line', text: 'qxbk@qq.com', url: 'mailto:qxbk@qq.com' },
				{ icon: 'ri:github-line', text: 'Github', url: 'https://github.com/scfcn' },
				{ icon: 'ri:telegram-line', text: 'Telegram', url: 'https://t.me/qxuzh' },
			],
		},
	] satisfies Nav,

	themes: {
		light: {
			icon: 'ri:sun-line',
			tip: '浅色模式',
		},
		system: {
			icon: 'ri:tv-2-line',
			tip: '跟随系统',
		},
		dark: {
			icon: 'ri:moon-line',
			tip: '深色模式',
		},
	},
})
