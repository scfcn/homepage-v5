<script setup lang="ts">
useHead({ title: '说说' })
definePageMeta({ headerText: '我的说说' })

const { data, error, status } = useLazyFetch('/api/feed/ech0')
</script>

<template>
<ZTitle icon="💬">
	<span class="badge-text">我的说说</span>
</ZTitle>

<template v-if="status === 'pending'">
	<p>加载中…</p>
</template>
<template v-else-if="status === 'error'">
	<p>{{ error }}</p>
</template>
<div v-else class="echo-list">
	<ZEcho v-for="echo in data" :key="echo.id" v-bind="echo" />
	
	<p v-if="data && data.length === 0" class="echo-empty">
		还没有说说，快去发布第一条吧~
	</p>
</div>
</template>

<style scoped lang="scss">
.echo-list {
	margin-top: 20px;
	
	// 三栏瀑布流布局
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
}

// 移除 Echo 组件中可能导致间隙问题的 margin-bottom
.echo-list :deep(.echo-item) {
	margin-bottom: 0;
}

.echo-empty {
	grid-column: 1 / -1;
	text-align: center;
	color: var(--c-text-3);
	padding: 40px 0;
	font-style: italic;
}

// 响应式设计，在小屏幕上调整为两栏或单栏
@media (max-width: 1024px) {
	.echo-list {
		grid-template-columns: repeat(2, 1fr);
		gap: 18px;
	}
}

@media (max-width: 768px) {
	.echo-list {
		grid-template-columns: 1fr;
		gap: 16px;
	}
}
</style>