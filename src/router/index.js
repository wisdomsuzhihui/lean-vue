import Vue from 'vue';
import Route from 'vue-router';

/* layout */
// import Layout from '../views/layout/Layout';

/** login */
import Login from '../views/login/';

Vue.use(Route);
export default new Route({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/login',
    component: Login,
    hidden: true
  }]
})