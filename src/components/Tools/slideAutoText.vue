<template>
    <div>
        <vue-auto-writer :base-text="data" class="autoText" :infinite="true" :delay-on-writer="70" :cursor-size="30" />

    </div>
</template>

<script>




import VueAutoWriter from "vue-auto-writer";

import { mapGetters } from 'vuex'



export default {

    name: 'slideAutoText',
    props: ['text'],
    components: {
        VueAutoWriter
    },



    data() {
        return {
            show: '',
            data: '',
        }
    },

    computed: {

        ...mapGetters({
            trigger: 'tool/getCarouselText'
        }),
    },

    mounted() {
        this.data = this.text
    }

}
</script>

<style  scoped>
.autoText {
    text-shadow: 2px 2px 30px #e5fbfc;
    /* font-size: 50px; */
}
</style>
