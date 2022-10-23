/**
 * @type {import('vitepress').UserConfig}
 */
export default {
  title: 'Artsmp',
  // siteTitle: 'My Custom Title',
  siteTitle: false,
  logo: '/logo.png',
  description: 'Just playing around.',
  themeConfig: {
    nav: [
      { text: '练习', link: '/demo/animation-input' },
      { text: '笔记', link: '/record/css-ellipsis' },
    ],
    sidebar: {
      '/demo/': [
        {
          text: 'HTML & CSS',
          items: [
            { text: '动效输入框', link: '/demo/animation-input' }, // /guide/one.md
          ],
        },
      ],
      '/record/': [
        {
          items: [
            { text: 'css文字溢出省略号', link: '/record/css-ellipsis' }, // /guide/one.md
            { text: '事件循环', link: '/record/event-loop' }, // /guide/one.md
          ],
        },
      ],
    },
  },
};
