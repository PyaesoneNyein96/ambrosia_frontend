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
      notify: 'notify/getAlertNotify',
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
    },


  }, //end of Methods

  watch: {

    notify(notify) {

      if (notify[0] == true) {

        if (notify[3] == 'success') {
          this.toast(notify, `success`);

        }
        else if (notify[3] == 'error') {
          this.toast(notify, 'error');
        }
        else if (notify[3] == 'inform') {
          this.toast(notify, 'warning');
        }
        else if (notify[3] == 'logout') {
          this.toast(notify, 'info')
        }

        // else if (notify[3] == 'question') {
        //   this.$toast.question({
        //     timeout: 20000,
        //     close: false,
        //     overlay: true,
        //     displayMode: 'once',
        //     id: 'question',
        //     zindex: 999,
        //     title: 'FOOD Delete',
        //     message: notify[2],
        //     position: 'center',
        //     buttons: [
        //       ['<button><b>YES</b></button>', function (instance, toast) {

        //         store.dispatch('food/deleteFood', notify[1]);

        //         instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

        //       }, true],
        //       ['<button>NO</button>', function (instance, toast) {

        //         instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

        //       }],
        //     ],
        //     onClosing: function (instance, toast, closedBy) {
        //       console.info('Closing | closedBy: ' + closedBy);
        //     },
        //     onClosed: function (instance, toast, closedBy) {
        //       console.info('Closed | closedBy: ' + closedBy);
        //     }
        //   });
        // }




      } // notify true



    }, // notify function end



  }, //end of watch


  // mounted() {





  // }



}


</script>
<style></style>
