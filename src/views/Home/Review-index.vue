<template>
    <div>
        <!-- ======= Testimonials Section ======= -->
        <section class="testimonials">
            <div class="container position-relative" v-for="u in reviews" :key="u.id">

                <div class="swiper-slide mb-5">
                    <div class="testimonial-item ">
                        <img :src="u.user.image" class="testimonial-img" alt="" v-if="u.user.image">
                        <img src="../../../public/assets/img/logo/GODlogopng.png" class="testimonial-img" v-else>
                        <h3>{{ u.user.name ? u.user.name : u.user.email }}</h3>
                        <h4>{{ u.user.role == 1 ? 'Admin' : 'Member Customer' }}</h4>
                        <div class="stars">
                            <i class="fa fa-star" v-for="  star   in   u.rating  " :key="star.id"></i>
                        </div>
                        <p>
                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                            {{ u.message }}
                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                        </p>
                    </div>






                </div>

            </div>
        </section><!-- End Testimonials Section -->
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'Review-index',
    data() {
        return {
            reviews: ''
        }
    },
    computed: {
        ...mapGetters({
            reviewList: 'users/getReviewList'
        })
    },


    watch: {
        reviewList() {
            this.reviews = this.reviewList;

        },

    },


    beforeMount() {
        this.$store.dispatch('users/getReviews')
    }

}
</script>

<style  scoped></style>
