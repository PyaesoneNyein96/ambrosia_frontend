<template>
  <app-Header />
  <!-- <div class="mt-5">
    <h1>
      {{ isAdmin }}
    </h1>
  </div> -->

  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </Transition>
  </router-view>

  <app-Loader class="d-none" />

  <app-Footer />
</template>

<script>



export default {
  name: 'App',
  data() {
    return {

    }
  },
  computed: {
    isHide() {
      return this.$store.getters['tool/getToggleNav']
    },



  },

}


</script>
<style>
/* @import '../public/assets/css/style.css' */
/* @import '../' */
</style>
