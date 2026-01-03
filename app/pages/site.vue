<script setup lang="ts">
import type { CardProps } from '~/components/partial/Card.vue'
import { ZLink } from '#components'

useHead({ title: '站点' })
definePageMeta({ headerText: '一些网站' })

const toolSites: Array<CardProps> = [
	{
		name: '卷邻茶叙',
		nameAlt: 'shuoshuo',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://mm.qixz.cn/' },
			{ icon: 'ph:github-logo-duotone', text: 'GitHub', to: 'https://github.com/lin-snow/Ech0' },
		],
		desc: '个人说说，随感而发',
	},
	{
		name: '友链朋友圈',
		nameAlt: 'Friend-Circle',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://fc.qixz.cn/' },
			{ icon: 'ph:github-logo-duotone', text: 'GitHub', to: 'https://github.com/willow-god/Friend-Circle-Lite' },
		],
		desc: '一个简单的友链朋友圈，用于展示友链文章动态',
	},
	{
		name: 'Gists',
		nameAlt: 'gists',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://gist.qixz.cn/all' },
			{ icon: 'ph:github-logo-duotone', text: 'GitHub', to: 'https://github.com/thomiceli/opengist' },
		],
		desc: '一个简单的Gists仓库，用于存储和分享代码片段',
	},
	{
		name: 'Bing每日一图',
		nameAlt: 'bingdailypic',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://bing.qixz.cn/' },
			{ icon: 'ph:github-logo-duotone', text: 'GitHub', to: 'https://github.com/willow-god/daily-image' },
		],
		desc: '这是一个基于 GitHub Actions 自动获取并展示 Bing 每日高清壁纸的项目,维护最近400天的壁纸',
	},
	{
		name: 'NewsNow',
		nameAlt: 'news',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://nn.qixz.cn/' },
			{ icon: 'ph:github-logo-duotone', text: 'GitHub', to: 'https://github.com/ourongxing/newsnow' },
		],
		desc: '优雅地阅读实时热门新闻',
	},
	{
		name: '青序图压',
		nameAlt: 'picsmaller',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://picsm.qixz.cn/' },
			{ icon: 'ph:github-logo-duotone', text: 'GitHub', to: 'https://github.com/joye61/pic-smaller' },
		],
		desc: '一个超级易于使用的在线图像压缩工具, 支持批量压缩, 压缩后图片质量无损失, 压缩率可达90%以上',
	},
	{
		name: '青序快驿',
		nameAlt: 'share',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://share.qixz.cn/#/' },
			{ icon: 'ph:github-logo-duotone', text: 'GitHub', to: 'https://github.com/vastsa/FileCodeBox' },
		],
		desc: '一个简单的分享工具，用于分享链接、图片、文本等内容',
	},

]

const orgSites: Array<CardProps> = [
	{
		name: '雾都政府市民互联网站',
		nameAlt: 'wuicp',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://icp.wudu.ltd/' },
		],
		desc: '一种异次元中的爱好，可爱和个性的展现',
	},
	{
		name: '开往',
		nameAlt: 'travellings',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://www.travellings.cn/' },
		],
		desc: () => h('div', [
			'「开往 Travellings」是一个友链接力项目，旨在通过',
			h(ZLink, { to: 'https://www.travellings.cn/plain.html' }, () => '网络跳转'),
			'的方式将流量引入那些鲜为人知的独立站点，从而推动网络的开放性和多元性。该项目于 2020 年 3 月 12 日诞生，灵感来源于开放的网络。',
		]),
	},
	{
		name: '个人博客俱乐部',
		nameAlt: 'blogsclub',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://www.blogsclub.org/' },
		],
		desc: () => h('div', [
			'BlogsClub是一个独立且相互包容的个人博客俱乐部，旨在为博主们提供一个互相交流、学习和进步的空间，让博主们能够在这里共同分享彼此的经验和知识，共同进步。',
		]),
	},
	{
		name: '揪蝉',
		nameAlt: 'jiuchan',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://www.jiuchan.org/' },
		],
		desc: () => h('div', [
			'欢迎各位独立博客创作者加入“揪蝉”，我们的博客就像是一个笔记本，偶尔想写下点什么，偶尔又想记录点什么，或者…想在这个世界留下点什么，证明我们也曾来过。我们留了千言万语，想对这个世界好好的…说上一说。',
		]),
	},
	{
		name: '信网联盟',
		nameAlt: 'xnet',
		buttons: [
			{ icon: 'ph:planet-duotone', text: '访问', to: 'https://icp.xnet.ren/' },
		],
		desc: '信网，互联网新一代公益服务组织,是众多信网联盟成员互助互联互利的网络组织！',
	},
]
</script>

<template>
<ZTitle>个人站点</ZTitle>
<ZCardList :data-list="toolSites" />
<ZTitle>组织门户</ZTitle>
<ZCardList :data-list="orgSites" />
</template>

<style lang="scss" scoped>
</style>
