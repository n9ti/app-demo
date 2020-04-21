<template>
  <main>
    <!-- <noscript
      ><iframe
        src="https://ga-landing.netlify.com/thank-indirect"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe
    ></noscript> -->
    <header>
      <h1>Success</h1>
      <h1>Thank you</h1>
      <a href="https://ga-landing.netlify.com/">
        <b>Back to Landing Page</b>
      </a>
    </header>
  </main>
</template>

<script>
import { bootstrap } from "vue-gtag";

export default {
  name: "SuccessPage",
  mounted() {
    this.enablePlugin();
  },
  methods: {
    enablePlugin() {
      bootstrap().then((gtag) => {
        console.log("gtag bootstraping success");
        this.track();
      });
    },
    track() {
      this.$gtag.event("sign_up");
    },
  },
};
</script>
