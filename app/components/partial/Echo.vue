<script setup lang="ts">
import homepageConfig from '~~/homepage.config'
import { ref, watch, onMounted } from 'vue'

interface Tag {
  id: number
  name: string
  usage_count: number
  created_at: string
}

interface Image {
  id: number
  message_id: number
  image_url: string
  image_source: string
}

interface EchoItem {
  id: number
  content: string
  username: string
  layout: string
  private: boolean
  user_id: number
  tags?: Tag[]
  fav_count: number
  created_at: string
  images?: Image[]
  extension?: string
  extension_type?: string
}

interface GithubMeta {
  stars: number
  forks: number
}

const props = defineProps<EchoItem>()

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 处理图片路径，确保是完整URL，格式：URL/api/images/xxx
const processImageUrl = (url: string) => {
  // 确保图片路径是/api/images/xxx格式
  let imagePath = url
  
  // 如果是相对路径，确保以/api/images/开头
  if (url.startsWith('/images/')) {
    // 从/images/xxx转换为/api/images/xxx
    imagePath = `/api${url}`
  } else if (!url.startsWith('/api/images/') && !url.startsWith('http')) {
    // 其他相对路径，加上/api/images/前缀
    imagePath = `/api/images/${url}`
  }
  
  // 如果是相对路径，加上基础URL
  if (imagePath.startsWith('/')) {
    return `${homepageConfig.ech0Api}${imagePath}`
  }
  
  return imagePath
}

// 解析内容，将github链接和音乐链接转换为可交互元素
const parseContent = (content: string) => {
  let parsed = content
  
  // 匹配GitHub仓库链接，格式：https://github.com/username/repo
  const githubRegex = /(https?:\/\/github\.com\/[\w\-]+\/[\w\-\.]+)/g
  parsed = parsed.replace(githubRegex, '<a href="$1" target="_blank" class="echo-content-link github">$1</a>')
  
  // 匹配网易云音乐链接，格式：https://music.163.com/#/song?id=123456789
  const musicRegex = /(https?:\/\/music\.163\.com\/#\/song\?id=(\d+))/g
  parsed = parsed.replace(musicRegex, '<div class="echo-music-wrapper"><a href="$1" target="_blank" class="echo-content-link music">$1</a></div>')
  
  // 普通链接
  const linkRegex = /(https?:\/\/[^\s]+)/g
  parsed = parsed.replace(linkRegex, '<a href="$1" target="_blank" class="echo-content-link">$1</a>')
  
  // 换行处理
  return parsed.replace(/\n/g, '<br>')
}

// 获取GitHub仓库信息
const getGithubRepoInfo = (url: string) => {
  const parts = url.split('/')
  return {
    username: parts[parts.length - 2],
    repo: parts[parts.length - 1]
  }
}

// 判断是否为GitHub链接
const isGithubLink = (url: string) => {
  return url.includes('github.com')
}

// 判断是否为音乐链接
const isMusicLink = (url: string) => {
  return url.includes('music.163.com')
}

// 获取GitHub仓库元数据（fork和star数量）
const getGithubRepoMeta = async (url: string) => {
  try {
    const { username, repo } = getGithubRepoInfo(url)
    const apiUrl = `https://api.github.com/repos/${username}/${repo}`
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repo metadata')
    }
    const data = await response.json()
    return {
      stars: data.stargazers_count,
      forks: data.forks_count
    }
  } catch (error) {
    console.error('Error fetching GitHub repo metadata:', error)
    return {
      stars: 0,
      forks: 0
    }
  }
}

// 存储GitHub仓库元数据
const githubMeta = ref<GithubMeta | null>(null)

// 监听extension变化，获取GitHub仓库元数据
watch(() => props.extension, async (newExtension) => {
  if (newExtension && isGithubLink(newExtension)) {
    githubMeta.value = await getGithubRepoMeta(newExtension)
  } else {
    githubMeta.value = null
  }
}, { immediate: true })

// 组件挂载时获取GitHub仓库元数据
onMounted(async () => {
  if (props.extension && isGithubLink(props.extension)) {
    githubMeta.value = await getGithubRepoMeta(props.extension)
  }
})
</script>

<template>
<div class="echo-item">
  <!-- 头部信息 -->
  <div class="echo-header">
    <div class="echo-header-info">
      <div class="echo-date">{{ formatDate(created_at) }}</div>
    </div>
  </div>
  
  <!-- 内容 -->
  <div class="echo-content" v-html="parseContent(content)"></div>
  
  <!-- 图片 -->
  <div class="echo-images" v-if="images && images.length > 0">
    <div 
      v-for="image in images" 
      :key="image.id" 
      class="echo-image-container"
    >
      <img 
        :src="processImageUrl(image.image_url)" 
        class="echo-image" 
        :alt="`echo-image-${image.id}`"
      >
    </div>
  </div>
  
  <!-- 标签 -->
  <div class="echo-tags" v-if="tags && tags.length > 0">
    <span 
      v-for="tag in tags" 
      :key="tag.id" 
      class="echo-tag"
    >
      <span class="echo-tag-hash">#</span>
      {{ tag.name }}
    </span>
  </div>
  
  <!-- 扩展内容 -->
  <div class="echo-extension" v-if="extension">
    <!-- GitHub项目卡片 -->
    <div v-if="isGithubLink(extension)" class="github-card">
      <div class="github-header">
        <Icon name="ri:github-line" class="github-icon" />
        <a :href="extension" target="_blank" class="github-link">{{ extension }}</a>
      </div>
      <div class="github-info">
        <div class="github-repo">{{ getGithubRepoInfo(extension).repo }}</div>
        <div class="github-owner">by {{ getGithubRepoInfo(extension).username }}</div>
      </div>
      <div class="github-meta" v-if="githubMeta">
        <span class="github-meta-item">
          <Icon name="ri:star-line" class="github-meta-icon" />
          <span>{{ githubMeta.stars }} Stars</span>
        </span>
        <span class="github-meta-item">
          <Icon name="ri:git-branch-line" class="github-meta-icon" />
          <span>{{ githubMeta.forks }} Forks</span>
        </span>
      </div>
    </div>
    
    <!-- 音乐卡片 -->
    <div v-else-if="isMusicLink(extension)" class="music-card">
      <div class="music-header">
        <Icon name="ri:music-2-line" class="music-icon" />
        <a :href="extension" target="_blank" class="music-link">{{ extension }}</a>
      </div>
      <!-- 移除iframe，直接显示链接 -->
      <div class="music-info">
        <p>点击链接播放音乐</p>
      </div>
    </div>
    
    <!-- 其他链接 -->
    <a 
      v-else 
      :href="extension" 
      target="_blank" 
      class="echo-extension-link other"
    >
      <Icon name="ri:link-line" />
      <span>{{ extension }}</span>
    </a>
  </div>
  
  <!-- 底部信息 -->
  <div class="echo-footer">
    <div class="echo-stats">
      <span class="echo-fav">
        <Icon name="ri:heart-line" />
        {{ fav_count }}
      </span>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.echo-item {
  background: linear-gradient(135deg, var(--c-bg-soft) 0%, var(--c-bg-hover) 100%);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
}

/* 头部信息 */
.echo-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
}

.echo-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-primary-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.echo-header-info {
  flex: 1;
  min-width: 0;
}

.echo-username {
  font-weight: 600;
  font-size: 1rem;
  color: var(--c-text);
  margin-bottom: 2px;
}

.echo-date {
  font-size: 0.8rem;
  color: var(--c-text-3);
}

/* 内容 */
.echo-content {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 16px;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--c-text);
}

/* 内容中的链接 */
.echo-content-link {
  color: var(--c-primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s;
  padding: 0 2px;
  border-radius: 3px;
  
  &:hover {
    background-color: var(--c-primary-soft);
    border-bottom-color: var(--c-primary);
  }
  
  &.github {
    color: #6e5494;
    
    &:hover {
      background-color: rgba(110, 84, 148, 0.1);
    }
  }
  
  &.music {
    color: #e60023;
    
    &:hover {
      background-color: rgba(230, 0, 35, 0.1);
    }
  }
}

/* 音乐容器 */
.echo-music-wrapper {
  margin: 8px 0;
}

.meting-container {
  margin-top: 8px;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--c-bg);
}

/* 图片布局 */
.echo-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.echo-image-container {
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--c-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
}

.echo-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
  
  .echo-image-container:hover & {
    transform: scale(1.05);
  }
}

/* 标签 */
.echo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.echo-tag {
  background: linear-gradient(135deg, var(--c-primary-soft) 0%, var(--c-primary-lighter) 100%);
  color: var(--c-primary);
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-primary-light) 100%);
    color: white;
    transform: translateY(-1px);
  }
}

.echo-tag-hash {
  font-weight: 700;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 扩展内容 */
.echo-extension {
  margin-bottom: 16px;
}

/* GitHub卡片 */
.github-card {
  background-color: var(--c-bg);
  border-radius: 8px;
  padding: 12px;
  border-left: 4px solid #6e5494;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    transform: translateX(2px);
  }
}

.github-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.github-icon {
  color: #6e5494;
  font-size: 1.2rem;
}

.github-link {
  color: #6e5494;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  word-break: break-all;
  
  &:hover {
    text-decoration: underline;
  }
}

.github-info {
			display: flex;
			flex-direction: column;
			gap: 2px;
			font-size: 0.85rem;
			color: var(--c-text-2);
		}

		.github-repo {
			font-weight: 600;
		}

		.github-meta {
			display: flex;
			gap: 16px;
			margin-top: 8px;
			padding-top: 8px;
			border-top: 1px solid var(--c-border);
			font-size: 0.8rem;
			color: var(--c-text-3);
		}

		.github-meta-item {
			display: flex;
			align-items: center;
			gap: 4px;
			transition: all 0.2s;
		}

		.github-meta-item:hover {
			color: var(--c-primary);
		}

		.github-meta-icon {
			font-size: 0.85rem;
			color: var(--c-text-3);
		}

		.github-meta-item:hover .github-meta-icon {
			color: var(--c-primary);
		}

/* 音乐卡片 */
.music-card {
  background-color: var(--c-bg);
  border-radius: 8px;
  padding: 12px;
  border-left: 4px solid #e60023;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    transform: translateX(2px);
  }
}

.music-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.music-icon {
  color: #e60023;
  font-size: 1.2rem;
}

.music-link {
  color: #e60023;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  word-break: break-all;
  
  &:hover {
    text-decoration: underline;
  }
}

/* 其他链接 */
.echo-extension-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background-color: var(--c-bg);
  border-radius: 8px;
  text-decoration: none;
  color: var(--c-text);
  transition: all 0.2s;
  font-size: 0.9rem;
  border-left: 4px solid var(--c-primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  
  &:hover {
    background-color: var(--c-bg-soft);
    color: var(--c-primary);
    transform: translateX(2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
  
  .icon {
    font-size: 1rem;
  }
}

/* 底部信息 */
.echo-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid var(--c-border);
  margin-top: 12px;
}

.echo-stats {
  display: flex;
  gap: 16px;
  align-items: center;
}

.echo-fav {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--c-text-3);
  font-size: 0.85rem;
  transition: all 0.2s;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 16px;
  
  &:hover {
    color: var(--c-primary);
    background-color: var(--c-primary-soft);
    transform: scale(1.05);
  }
  
  .icon {
    font-size: 0.9rem;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .echo-item {
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .echo-avatar {
    width: 36px;
    height: 36px;
  }
  
  .echo-images {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }
  
  .echo-image {
    height: 120px;
  }
  
  .echo-tag {
    padding: 5px 12px;
    font-size: 0.8rem;
  }
}
</style>