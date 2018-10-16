import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Callback from '@/components/Callback'
import ShareThoughts from '@/components/ShareThoughts'
import auth0Client from '../AuthService'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/share-your-thoughts',
      name: 'ShareThoughts',
      component: ShareThoughts,
      beforeEnter: (to, from, next) => {
        if (auth0Client.isAuthenticated()) {
          return next()
        }
        next('/')
      }
    }
  ]
})
