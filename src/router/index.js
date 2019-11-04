import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path:'/welcome',
      name: 'welcome',
      component: resolve => require(['../components/welcome.vue'], resolve)
    },
    {
      path:'/login',
      name: 'login',
      component: resolve => require(['../components/login.vue'], resolve)    
    },
    {
      path:'/',
      name: 'home',
      component: resolve => require(['../components/home.vue'], resolve)    
    },
    {
      path:'/assistant',
      name: 'assistant',
      component: resolve => require(['../components/assistant/assistant.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'assistantMacroscopic',
          component: resolve => require(['../components/assistant/assistantMacroscopic.vue'], resolve)
        },
        {
          path: '/assistant/industry',
          name: 'assistantIndustry',
          component: resolve => require(['../components/assistant/assistantIndustry.vue'], resolve)
        },
        {
          path: '/assistant/policy',
          name: 'assistantPolicy',
          component: resolve => require(['../components/assistant/assistantPolicy.vue'], resolve)
        }
      ]    
    },
    {
      path:'/ecology',
      name: 'ecology',
      component: resolve => require(['../components/ecology/ecology.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'ecologyPopulation',
          component: resolve => require(['../components/ecology/ecologyPopulation.vue'], resolve)
        },
        {
          path: '/ecology/water',
          name: 'ecologyWater',
          component: resolve => require(['../components/ecology/ecologyWater.vue'], resolve)
        },
        {
          path: '/ecology/gas',
          name: 'ecologyGas',
          component: resolve => require(['../components/ecology/ecologyGas.vue'], resolve)
        }
      ]    
    },
    {
      path:'/thing',
      name: 'thing',
      component: resolve => require(['../components/thing.vue'], resolve)    
    },
    {
      path: '/thing/newlyBuild',
      name: 'newlyBuild',
      component: resolve => require(['../components/newlyBuild.vue'], resolve)
    },
    {
      path:'/meeting',
      name: 'meeting',
      component: resolve => require(['../components/meeting.vue'], resolve)    
    },
    {
      path:'/search',
      name: 'search',
      component: resolve => require(['../components/search.vue'], resolve)    
    },
    {
      path:'/library',
      name: 'library',
      component: resolve => require(['../components/library.vue'], resolve)    
    },
    {
      path:'/chats',
      name: 'chats',
      component: resolve => require(['../components/chats.vue'], resolve)    
    },
    {
      path:'/slicksort',
      name: 'slicksort',
      component: resolve => require(['../components/slicksort.vue'], resolve)    
    },
    {
      path:'/security',
      name: 'security',
      component: resolve => require(['../components/security.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'securitytotal',
          component: resolve => require(['../components/security/total.vue'], resolve)
        },
        {
          path: '/security/enterprise',
          name: 'security',
          component: resolve => require(['../components/security/enterprise.vue'], resolve)
        },
        {
          path: '/security/then',
          name: 'security',
          component: resolve => require(['../components/security/then.vue'], resolve)
        }
      ]        
    },
    {
      path:'/canvas',
      name: 'canvas',
      component: resolve => require(['../components/canvas.vue'], resolve)
    }
  ]    
})
export default router