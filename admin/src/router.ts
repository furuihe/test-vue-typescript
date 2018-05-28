import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import { makeHot, reload } from './util/hot-reload'

const homeComponent = () => import('./views/home').then(({ HomeComponent }) => HomeComponent)
const aboutComponent = () => import('./views/about').then(({ AboutComponent }) => AboutComponent)
const listComponent = () => import('./views/list').then(({ ListComponent }) => ListComponent)
// const homeComponent = () => import(/* webpackChunkName: 'home' */'./views/home').then(({ HomeComponent }) => HomeComponent)
// const aboutComponent = () => import(/* webpackChunkName: 'about' */'./views/about').then(({ AboutComponent }) => AboutComponent)
// const listComponent = () => import(/* webpackChunkName: 'list' */'./views/list').then(({ ListComponent }) => ListComponent)
if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './views/home'
  const aboutModuleId = './views/about'
  const listModuleId = './views/list'

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./views/home', () => reload(homeModuleId, (require('./views/home') as any).HomeComponent)))

  makeHot(aboutModuleId, aboutComponent,
    module.hot.accept('./views/about', () => reload(aboutModuleId, (require('./views/about') as any).AboutComponent)))

  makeHot(listModuleId, listComponent,
    module.hot.accept('./views/list', () => reload(listModuleId, (require('./views/list') as any).ListComponent)))
}

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent
  },
  {
    path: '/about',
    component: aboutComponent
  },
  {
    path: '/list',
    component: listComponent
  }
]

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() })
