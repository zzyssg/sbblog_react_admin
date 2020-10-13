// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    //blog
    {
      path: '/blog',
      component: '../layouts/BasicLayout',
      routes: [
        {
          name: 'blog',
          path: '/blog',
          component: './blog',
        },
        {
          name: 'aboutme',
          path: '/blog/aboutme',
          component: './blog/aboutme',
          target : "_blank"
        },
      ],
    },
    //user
    // {
    //   path: '/user',
    //   component: '../layouts/UserLayout',
    //   routes: [
    //     {
    //       name: 'login',
    //       path: '/user/login',
    //       component: './user/login',
    //     },
    //   ],
    // },
    //app
    {
      path: '/',
      // component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
              hideInMenu : true,
            },
            // blog page
            {
              // name: 'blogs',
              name: '博客',
              icon: 'smile',
              path: '/blogs',
              routes:[
                {
                  path:'/blogs/list',
                  // name:'list-page',
                  name:'博客列表',
                  icon:'smile',
                  component:'./blogs/list',
                },
                {
                  path:'/blogs/publish',
                  // name:'publish-page',
                  name:'博客发布',
                  icon:'smile',
                  component:'./blogs/publish',
                },
              ]
            },
            // type page
            {
              // name: 'types',
              name: '类型',
              icon: 'smile',
              path: '/types',
              routes:[
                {
                  path:'/types/list',
                  // name:'typeListPage',
                  name:'类型列表',
                  icon:'smile',
                  component:'./types/list',
                },
                {
                  path:'/types/publish',
                  // name:'typePublistPage',
                  name:'类型发布',
                  icon:'smile',
                  component:'./types/publish',
                  hideInMenu:true,
                },
              ]
            },
            // tags page
            {
              // name: 'tags',
              name: '标签',
              icon: 'smile',
              path: '/tags',
              routes:[
                {
                  path:'/tags/list',
                  // name:'tagListPage',
                  name:'标签列表',
                  icon:'smile',
                  component:'./tags/list',
                },
                {
                  path:'/tags/publish',
                  // name:'tagPublistPage',
                  name:'标签发布',
                  icon:'smile',
                  component:'./tags/publish',
                },
              ]
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
