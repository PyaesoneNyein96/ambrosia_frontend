<template>
    <div class="bg-light">
        <div class="p-3 h3  my-0">Packages List</div>

        <div class="container mt-0">

            <div class="row p-1">

                <div class="col-lg-4 col-md-6 p-1 shadow-sm" v-for="pack in packageList" :key="pack.id">

                    <div class="body-wrap p-2 rounded-1">
                        <div class="body-wrap-2">
                            <div class="row main-img-wrap">
                                <TransitionGroup name="item" appear>
                                    <div class="col-4 mb-2 p-2" v-for="i in pack.food" :key="i.id">
                                        <img :src="i.image" class="img card-img" :title="i.name">
                                    </div>
                                </TransitionGroup>
                            </div>

                            <div class="info-wrap">
                                <ul class="py-2">
                                    <li class="list-group-item">
                                        Package Name: <span class="text-success fw-bold">{{ pack.name }}</span>
                                    </li>
                                    <li class="list-group-item">
                                        Sub Total: <span class="text-muted fw-bold text-decoration-line-through">{{
                                            pack.sub_total }} $</span> $
                                    </li>
                                    <li class="list-group-item">
                                        Net Total: <span class="text-success fw-bold">{{ pack.net_total }} $</span> $
                                    </li>
                                    <li class="list-group-item">
                                        Percentage: <span class="text-danger fw-bold"> {{ pack.percentage }} %</span>
                                    </li>
                                    <li class="list-group-item">
                                        Total Dish: <span class="text-primary"> {{ pack.food.length }} </span>

                                    </li>
                                    <li class="list-group-item  mt-2">

                                        <span class="pe-4">
                                            <button class="btn btn-sm text-light bg-success me-1" @click="edit(pack.id)">
                                                Edit <i class="fa fa-edit fa-sm text-light"></i>
                                            </button>
                                            <button class="btn btn-sm text-light bg-danger" @click="del(pack)">
                                                Delete <i class="fa fa-trash fa-sm text-light"></i>
                                            </button>
                                        </span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>


                </div>


            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { smsQuestion } from '../../../store/Notify/notify.js'

import store from '../../../store'


export default {
    name: 'Package-list',
    data() {
        return {
            list: ''
        }
    },

    computed: {
        ...mapGetters({
            packageList: 'package/getAdminPackage',
            notify: 'notify/getAlertNotify'
        }),
    },

    methods: {

        edit(x) {
            this.$store.dispatch('package/getEditPack', x)
        },

        del(p) {
            const info = { name: p.name, id: p.id };
            smsQuestion(store.commit, info, 'Are your sure to delete this package!!!');

        }

    },
    beforeMount() {
        this.$store.dispatch('package/getAllPackage');
    },

    watch: {
        // packageList() {
        //     this.list = this.packageList;
        // },


        notify(notify) {
            if (notify[3] == 'question') {
                if (notify[0] == true) {
                    this.$toast.question({
                        timeout: 20000,
                        close: false,
                        overlay: true,
                        displayMode: 'once',
                        id: 'question',
                        zindex: 999,
                        title: notify[1].name,
                        message: notify[2],
                        position: 'center',
                        buttons: [
                            ['<button><b>YES</b></button>', function (instance, toast) {
                                store.dispatch('package/deletePackage', notify[1].id);

                                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                            }, true],
                            ['<button>NO</button>', function (instance, toast) {

                                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                            }],
                        ],
                        onClosing: function (instance, toast, closedBy) {
                            console.info('Closing | closedBy: ' + closedBy);
                        },
                        onClosed: function (instance, toast, closedBy) {
                            console.info('Closed | closedBy: ' + closedBy);
                        }
                    });
                }
            }
        }
    },


}
</script>


<style scoped>
.img {
    width: 100%;
    height: 90px;
    object-fit: cover;
    box-shadow: 0px 40px 15px rgba(3, 26, 3, 0.734);
    border-radius: 8px;
    padding: 3px;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
}

.img:hover {

    transform: scale(1.05);

}

.main-img-wrap {
    height: 250px;
    overflow-y: scroll;
}

.body-wrap {
    background: url('../../../../public/assets/img/logo/bg.jpg');
    position: relative;
}

.body-wrap::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(249, 238, 238, 0.219);
    z-index: 9;
}

.body-wrap-2 {
    position: relative;
    z-index: 10;
}

.info-wrap {
    /* padding-top: 20px; */
    border-radius: 10px;
    background-color: rgba(255, 245, 245, 0.701) !important;
}





.item-enter-from,
.item-leave-to {
    opacity: 0;
}

.item-enter-active {
    transition: 2.5s;
}

.item-leave-active {
    width: 100%;
    transition: all 0.3s;
    position: absolute;
}

.item-enter-to,
.item-leave-from {
    opacity: 1;
}

.item-move {
    transition: transform 0.5s;
}




/* scroll bar  */

::-webkit-scrollbar {
    width: 3px !important;
    /* Width of the scrollbar */
}

::-webkit-scrollbar-track {
    background: #f1f1f1 !important;
    /* Color of the scrollbar track */
}

::-webkit-scrollbar-thumb {
    background: #8e8704 !important;
    /* Color of the scrollbar thumb */
}

::-webkit-scrollbar-thumb:hover {
    background: #55555500 !important;
    /* Color of the scrollbar thumb on hover */
}
</style>

