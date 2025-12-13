<script setup lang="ts">
useHead({ title: '' })
definePageMeta({
	alias: ['/'],
	title: '主页',
})
const appConfig = useAppConfig()
</script>

<template>
<ZhiluAvatar class="avatar" />
<div class="wrapper">
	<ZField>
		<template #label>
			<span style="font-size: 3rem;">👋</span>
		</template>
		<h1 style="font-size: 3rem;">
			你好，<br>我是<mark>{{ appConfig.author.name }}</mark>
		</h1>
		<p class="desc">
			{{ appConfig.subtitle }}
		</p>
		<div>
			<ZButton
				icon="ri:file-list-3-line"
				to="https://qxzhan.cn/"
				text="青序栈"
				primary
			/>
			<ZButton
				icon="ri:github-line"
				to="https://github.com/scfcn/"
				text="GitHub"
			/>
		</div>
	</ZField>
	<ZField label="介绍">
		<p>
			<ZLink to="https://www.travellings.cn/">开往</ZLink>
			成员，Windows 11 和 Android 用户。
		</p>
	</ZField>
	<ZField label="近期活动">
		<p>
			2025 年 11 月底数据库由mysql 5.7更换至mariadb 10.6，优化博客速度
			<ZLink to="https://qxzhan.cn/">青序栈</ZLink>2025 年 11月初部署ech0说说项目
			<ZLink to="https://mm.qxzhan.cn/">卷邻茶叙</ZLink>
		</p>
	</ZField>
	<ZField label="关于主页">
		<p>
			fork自zhilu大佬<ZLink to="https://github.com/L33Z22L11/homepage-v5" icon="ri:github-line">L33Z22L11/homepage-v5</ZLink>
		</p>
		<p>
			同款主页的友友们：<br>
			<ZBadge v-for="item in appConfig.fork" :key="item.link" v-bind="item" />
		</p>
	</ZField>
</div>
</template>

<style lang="scss" scoped>
.avatar {
	position: fixed;
	opacity: 0.2;
	top: 0;
	right: 20vw;
	margin-right: -0.4em;
	font-size: min(100vw, 60vh);
	z-index: -1;
}

.desc {
	margin: 1rem 0;
	font-size: 1.5rem;
	color: var(--c-text-2);
}
</style>
