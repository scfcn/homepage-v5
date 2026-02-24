<script setup lang="ts">
useHead({ title: '项目' })
definePageMeta({ headerText: '参与的开源项目' })

const projects = [
	{
		title: 'Rainyun-Qiandao',
		github: 'scfcn/Rainyun-Qiandao',
		description: '免费雨云自动签到脚本，发布后受到上百位用户使用',
	},
	{
		title: 'Static-mirrors',
		github: 'scfcn/static-mirrors',
		description: '静态文件镜像，用于加速静态文件的访问',
	},
	{
		title: 'cfcn',
		github: 'scfcn/cfcn',
		description: '信网CF优选项目',
	},
	{
		title: 'Xnetcdnweb',
		github: 'scfcn/scdnweb',
		description: '信网CDN前端主页',
	},
	{
		title: 'AcgAPI',
		github: 'scfcn/acgapi',
		description: '依赖于EO PAGE的随机图片API',
	},
	{
		title: 'UA-G',
		github: 'scfcn/ua-g',
		description: '用于快速生成符合各种浏览器、操作系统和设备类型的User-Agent字符串',
	},
	{
		title: 'WuICP',
		github: 'scfcn/WuICP',
		description: '虚拟备案系统',
	},
	{
		title: 'domain-card',
		github: 'scfcn/domain-card',
		description: '域名卡片，用于展示域名信息',
	},
]
</script>

<template>
<section>
	<ZProject v-for="project in projects" :key="project.title" v-bind="project" />
</section>
</template>

<style lang="scss" scoped>
section {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
	gap: 1rem;
}
</style>
