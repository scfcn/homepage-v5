<script setup lang="ts">
defineProps<{
	content: string | VNode | (() => VNode)
}>()
</script>

<template>
<template v-if="typeof content === 'string'">
	{{ content }}
</template>
<template v-else-if="typeof content === 'function'">
	<component :is="content()" />
</template>
<template v-else>
	<component :is="content" />
</template>
</template>
