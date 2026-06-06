<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
<footer id="z-footer">
	<ZRender v-for="(item, index) in appConfig.footer" :key="index" :content="item" />
</footer>
</template>

<style lang="scss" scoped>
#z-footer {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 0.4rem 0.8rem;
	padding: 0.8rem 1rem;
	margin-top: 0.8rem;
	font-size: 0.9em;
	line-height: 1.2;
	text-align: center;
	color: var(--c-text-2);

	a {
		display: inline-flex;
		align-items: center;
		line-height: 1.2;
	}

	a:hover {
		color: var(--c-primary);
	}

	.beian-icon {
		display: inline-block;
		width: 0.9em;
		height: 0.9em;
		margin-right: 0.2em;
		vertical-align: middle;
		object-fit: contain;
	}
}
</style>
