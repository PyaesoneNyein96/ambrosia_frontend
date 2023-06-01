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
      isLoading: 'tool/getLoading',
      notify: 'notify/getAlertNotify'
    })



  },


  methods: {
    toast(notify, x) {
      return this.$toast[x]({
        title: notify[1],
        message: notify[2],
        animateInside: true,
        position: 'topRight',
        iconUrl: 'https://rb.gy/9lw00',
        resetOnHover: true,
      });
    }
  },

  watch: {

    notify(notify) {

      if (notify[0] == true) {

        if (notify[3] == 'success') {
          this.toast(notify, `success`);

        } else if (notify[3] == 'error') {
          this.toast(notify, 'error');
        }





      } // notify true



    }, // notify function end



  },


  // mounted() {





  // }



}


</script>
<style></style>
