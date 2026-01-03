<script setup lang="ts">
import { ZhiluIcon } from '#components'

useHead({ title: '日志' })
definePageMeta({ headerText: '互联网上的活动记录' })

const timeline = {
	'2026-01-02': '全域迁移至 qixz.cn',
	'2025-07-13': h('span', ['博客：迁移 Typecho，并更换域名 ', h('code', 'qxzhan.cn')]),
	'2025-07-03': h('span', ['Logo：', h(ZhiluIcon)]),
	'2024-12-27': 'Slogan：须知少时凌云志，曾许人间第一流',
	'2025-07-30': '博客一周年',
	'2025-05-15': '创立信网联盟',
	'2024-09-24': '创建雾都虚拟城市',
	'2024-07-23': '个人网站：使用 Hexo，发布第一篇文章',
	'2024-07-17': h('span', ['个人网站：购买域名 ', h('code', 'scfc.top')]),
	'2024-07-02': 'Slogan：屠龙少年终成恶龙',
	'2024-06-23': h('span', ['开始使用昵称 ', h('code', 'SCFC'), ' 在互联网上活跃']),
}
</script>

<template>
<div class="timeline wrapper">
	<div v-for="(content, date) in timeline" :key="date" class="timeline-item">
		<div class="timeline-item-date">
			{{ date }}
		</div>
		<p v-if="typeof content === 'string'" class="timeline-item-content">
			{{ content }}
		</p>
		<p v-else class="timeline-item-content">
			<component :is="content" />
		</p>
	</div>
</div>
</template>

<style lang="scss" scoped>
.timeline {
	position: relative;
	width: fit-content;
	padding-left: 1em;

	&::before {
		content: "";
		position: absolute;
		top: 0.5em;
		bottom: 0;
		left: 0;
		width: 4px;
		background-color: var(--c-bg-2);
	}
}

.timeline-item {
	display: grid;
	justify-items: start;
	gap: 4px;
	margin: 0.5em 0;

	.timeline-item-date {
		font-size: 0.8em;
		color: var(--c-text-2);
	}

	.timeline-item-content {
		padding: 0.5em 0.8em;
		border-radius: 0.5em;
		background-color: var(--c-bg-2);
	}
}

@container (min-width: $breakpoint-mobile) {
	.timeline-item {
		grid-column-gap: 1em;
		grid-template-areas: "date content";
		grid-template-columns: 1fr 1fr;

		.timeline-item-date {
			grid-area: date;
		}

		.timeline-item-content {
			grid-area: content;
			padding: 0.5em 1em;
		}
	}
}
</style>
