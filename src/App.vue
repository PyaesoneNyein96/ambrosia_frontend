<template>
  <app-Header />
  <app-Loader v-if="isLoading" />

  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </Transition>
  </router-view>



  <app-Footer />
</template>

<script>

import { mapGetters } from 'vuex'


export default {
  name: 'App',
  data() {
    return {

    }
  },
  computed: {


    ...mapGetters({
      isLoading: 'tool/getLoading'
    })



  },

}


</script>
<style></style>
