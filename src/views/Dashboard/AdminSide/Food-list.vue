<template>
    <div>
        <h1 class="p-3 fw-bold">
            Food List
            <hr>
        </h1>

        <div class="col-md-12 px-2 mx-auto table-responsive pb-5">


            <table class="table table-sm table-striped bg-light table-hover">
                <thead class="text-center text-muted">
                    <tr>
                        <th class="num"> . No</th>
                        <th class="img">Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>description</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Tag</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="(f, i) in allFoodList" :key="i">
                        <td class="num">{{ i + 1 }}</td>
                        <td class="img-wrap">
                            <img :src="f.image" alt="meal" v-if="f.image">
                            <img src="../../../../public/assets/img/GODlogopng.png" alt="meal" v-else>
                        </td>
                        <td>{{ f.name }}</td>
                        <td>{{ f.price }}</td>
                        <td class="description">

                            {{ f.description }}

                        </td>

                        <td>{{ f.status == 1 ? 'A' : 'N/A' }}</td>

                        <td>{{ f.type == 1 ? 'Food' : 'Beverage' }}</td>

                        <td class="tag-field">
                            <span class="d-block bg-light col-8 d-lg-inline text-start" v-for="tag in f.tag" :key="tag.id"
                                style="min-width:100px">
                                <span class="rounded-2 me-1 text-light px-1 bg-secondary col-2"
                                    :class="{ 'bg-danger': tag.id == 1, 'bg-success': tag.id == 2, 'bg-warning': tag.id == 4 }">
                                    {{ tag.name }}
                                </span>
                            </span>
                        </td>
                        <td>{{ f.category.name }}</td>
                        <td>
                            <div class="btn-wrap">
                                <button class="btn btn-success ms-1 btn-sm py-0" @click="gotToEdit(f.id)">
                                    <i class="fa fa-edit" aria-hidden="true"></i>
                                    <span class="d-none d-lg-inline">Edit</span>
                                </button>
                                <button class="btn btn-danger ms-1 btn-sm py-0">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    <span class="d-none d-lg-inline">Delete</span>
                                </button>
                            </div>
                        </td>

                    </tr>

                </tbody>




            </table>



        </div>


    </div>
</template>

<script>

import { mapGetters } from 'vuex'
// import router from '../../../router'


export default {
    name: 'Food-list',

    computed: {
        ...mapGetters({
            allFoodList: 'food/getFoodList'
        })
    },

    methods: {
        gotToEdit(num) {
            const id = Number(num);

            this.$store.dispatch('food/getFoodBySpecific', id)
        }
    },
    mounted() {
        this.$store.dispatch('food/GetSpecific', 'All');
    }
}
</script>

<style  scoped>
/* Responsive */

@media (max-width:800px) {

    th,
    td {
        font-size: 12px;
    }
}

@media (max-width:500px) {

    th,
    td {
        font-size: 10px;
    }

}

.table-wrap {
    cursor: pointer;
}


.img-wrap img {
    width: 80px;
    height: 80px;
    transition: all 0.5s ease-in-out;
    object-fit: cover;
}

.img-wrap img:hover {
    transform: scale(1.5) translateX(5px);
}

table * {
    font-size: 13px;
}

.table-responsive {
    /* width: 100%; */
    height: 70vh;
}

thead {
    position: sticky;
    top: 0;
    background-color: rgb(243, 240, 235);
}

.description {
    max-width: 150px !important;
    max-height: 70px;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    text-align: start;
}





.tag-field * {
    font-size: 0.9em;
}

thead {
    margin-bottom: 20px;
}
</style>
