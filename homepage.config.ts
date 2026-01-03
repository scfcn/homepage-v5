// 存储 nuxt.config 和 app.config 共用的配置

import type { NitroConfig } from 'nitropack'

const author = {
	name: '筱序二十',
	avatar: 'https://me.qixz.cn/avatar.avif',
	email: 'qxbk@qq.com',
	homepage: 'https://me.qixz.cn/',
}

const homepageConfig = {
	title: '筱序二十 (栈主)',
	subtitle: '青序入栈云作岸，筱风二十月盈窗',
	description: '筱序二十（栈主 / scfcn）是一位活跃于 GitHub 与博客圈的独立开发者，热衷开源与云原生。他维护的个人站 https://www.qixz.cn/ 收录了从 Web 全栈、容器化到 DevOps 的实战笔记，也分享旅行与摄影的随想。主页延续「纸鹿」极简风格，聚焦深度技术解析与轻量生活记录，为同路人提供可 fork 的代码与可复用的经验。',
	author,
	language: 'zh-CN',
	timezone: 'Asia/Shanghai',
	favicon: 'https://me.qixz.cn/avatar.avif',
	url: 'https://me.qixz.cn/',
	blogAtom: 'https://www.qixz.cn/atom.xml',
	ech0Api: 'https://mm.qixz.cn',
}

// https://nitro.build/config#routerules
export const routeRules: NitroConfig['routeRules'] = {
	'/api/avatar.png': { redirect: author.avatar },
	'/api/icon.png': { redirect: homepageConfig.favicon },
	'/favicon.ico': { redirect: homepageConfig.favicon },
}

export default homepageConfig
