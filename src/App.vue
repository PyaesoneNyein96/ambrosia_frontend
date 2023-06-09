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

import success from '../public/assets/audio/success.wav'
import err from '../public/assets/audio/wrong-answer-129254.mp3'
import info from '../public/assets/audio/info.mp3'
import BigSuccess from '../public/assets/audio/order_success.mp3'
import warning from '../public/assets/audio/warning.mp3'


export default {
  name: 'App',
  data() {
    return {
      // success: '../public/assets/audio/success.wav'

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


    audioEff(x) {
      let audio = new Audio(x);
      audio.play();
      audio.volume = 0.5
    }


  }, //end of Methods

  watch: {

    notify(notify) {

      if (notify[0] == true) {

        if (notify[3] == 'success') {
          this.toast(notify, `success`);
          this.audioEff(success);
        }
        else if (notify[3] == 'error') {
          this.toast(notify, 'error');
          this.audioEff(err);
        }
        else if (notify[3] == 'inform') {
          this.toast(notify, 'warning');
          this.audioEff(warning);
        }
        else if (notify[3] == 'logout') {
          this.toast(notify, 'info');
          this.audioEff(info);
        }


      } // notify true



    }, // notify function end



  }, //end of watch





}


</script>
<style>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
