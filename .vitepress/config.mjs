import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 网站基本信息
  // base: '/vitepress-demo/',
  title: "Hishallyi",
  description: "A Learning Site",
  lang: 'zh-CN',

  // 网站图标设置
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],

  // 主题设置
  themeConfig: {
    logo: '/logo.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '技术', link: '/技术/hexo' },
      { text: '生活', link: '/生活/suibi' },
    ],

    // 侧边栏设置
    sidebar: false, // 关闭侧边栏
    outlineTitle: '文章目录',
    outline: [2, 6],
    aside: "left", // 设置右侧侧边栏在左侧显示

    // 社交链接设置
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hishallyi' }
    ]
  }, 
})
