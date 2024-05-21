import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: '/vitepress-demo/',
  logo: '/logo.svg',
  title: "Hishallyi",
  description: "A Learning Site",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '技术', link: '/技术/hexo' },
      { text: '生活', link: '/生活/suibi' },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    sidebar: false, // 关闭侧边栏
    outlineTitle: '文章目录',
    outline: [2, 6],
    aside: "left", // 设置右侧侧边栏在左侧显示

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hishallyi' }
    ]
  }
})
