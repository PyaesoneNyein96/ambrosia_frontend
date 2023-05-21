<template>
  <app-Header />
  <div class=""></div>

  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </Transition>
  </router-view>

  <app-Footer />
</template>

<script>



export default {

  name: 'App'

}


</script>
<style>
/* @import '../public/assets/css/style.css' */
/* @import '../' */
</style>
