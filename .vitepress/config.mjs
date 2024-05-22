import { defineConfig } from 'vitepress'
import { set_sidebar } from "../utils/auto-gen-sidebar.mjs";

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
      { text: '技术', link: '/技术/index' },
      { text: '生活', link: '/生活/index' },
    ],

    // 侧边栏设置
    sidebar: {
      "/技术/": set_sidebar("技术"),
      "/生活/": set_sidebar("生活"),
    },
    outlineTitle: '文章目录',
    outline: [2, 6],
    // aside: "left", // 设置右侧侧边栏在左侧显示

    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    // 社交链接设置
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hishallyi' }
    ]
  },
})
