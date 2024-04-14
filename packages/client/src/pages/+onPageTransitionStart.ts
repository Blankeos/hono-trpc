import NProgress from "nprogress";

export { onPageTransitionStart };

// Create custom page transition animations
async function onPageTransitionStart() {
  console.log("START");
  NProgress.start();
}
