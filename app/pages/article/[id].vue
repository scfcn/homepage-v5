<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

useHead({ title: `文章: ${id}` });
definePageMeta({ headerText: "文章详情" });
</script>

<template>
  <ZTitle>文章详情</ZTitle>
  <p>当前访问的文章ID: {{ id }}</p>
  <p>这是一个动态路由页面，用于处理/article/:id路径。</p>
  <ZButton @click="navigateTo('/article')"> 返回文章列表 </ZButton>
</template>
