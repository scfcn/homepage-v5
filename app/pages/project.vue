<script setup lang="ts">
useHead({ title: '项目' })
definePageMeta({ headerText: '参与的开源项目' })

const projects = [
	{
		title: 'Rainyun-Qiandao',
		github: 'scfcn/Rainyun-Qiandao',
		description: '雨云签到自动化技术研究，发布后受到上百位用户学习',
	},
	{
		title: 'StarCDN',
		github: 'scfcn/StarCDN',
		description: '前端公共库加速服务',
	},
	{
		title: 'UA-G',
		github: 'scfcn/ua-g',
		description: '用于快速生成符合各种浏览器、操作系统和设备类型的User-Agent字符串',
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
