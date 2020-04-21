import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import RegisterPage from "./pages/RegisterPage.vue";
import SuccessPage from "./pages/SuccessPage.vue";
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "UA-163580229-1" },
  params: {
    send_page_view: false,
  },
  bootstrap: false,
});

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  {
    path: "/",
    component: RegisterPage,
    meta: {
      title: "Register Page",
    },
  },
  {
    path: "/success",
    component: SuccessPage,
    meta: {
      title: "Success Page",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
