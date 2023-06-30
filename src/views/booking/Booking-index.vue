<template>
    <div class="mt-5">
        <section id="book-a-table" class="book-a-table">
            <div class="container">

                <div class="section-title">
                    <h2>Book a <span>Table</span></h2>
                    <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque
                        vitae
                        autem.</p>
                </div>

                <form action="forms/book-a-table.php" method="post" role="form" class="php-email-form">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 form-group">
                            <input type="text" name="name" class="form-control" v-model="userData.name"
                                placeholder="Your Name" :disabled="userData.name">
                        </div>

                        <div class="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                            <input type="email" class="form-control" v-model="userData.email" disabled
                                placeholder="Your Email">
                        </div>

                        <div class="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                            <input type="text" class="form-control" placeholder="Your Phone" v-model="userData.phone"
                                :disabled="userData.phone">
                        </div>
                        <div class="col-lg-4 col-md-6 form-group mt-3">
                            <input type="date" name="date" class="form-control" placeholder="Date">

                        </div>
                        <div class="col-lg-4 col-md-6 form-group mt-3">
                            <input type="time" class="form-control" placeholder="Time">
                        </div>
                        <div class="col-lg-4 col-md-6 form-group mt-3">
                            <input type="number" min="1" max="25" class="form-control" placeholder="# of people">
                            <div class="validate"></div>
                        </div>
                    </div>
                    <div class="form-group mt-3">
                        <textarea class="form-control" name="message" rows="5"
                            placeholder="Special Order Message . . ."></textarea>

                    </div>
                    <div class="mb-3">
                        <div class="loading">Loading</div>
                        <div class="error-message"></div>
                        <div class="sent-message">Your booking request was sent. We will call back or send an Email to
                            confirm your
                            reservation. Thank you!</div>
                    </div>
                    <div class="text-center">
                        <h4 class="fw-bold text-muted">Checkout With</h4>
                        <button type="button" class="m-1 btn btn btn-warning text-light m-1 bg-gradient"
                            @click="directOrderSubmit">Proceed
                            to
                            Checkout</button>
                        <button type="button" class="btn btn btn-success m-1 text-light bg-gradient" @click="submitTable">
                            Book a table and checkout</button>
                    </div>
                </form>

            </div>
        </section><!-- End Book A Table Section -->
    </div>
</template>

<script>

import { mapGetters } from 'vuex'


export default {
    name: 'Booking-index',
    data() {
        return {
            userData: {
                order_code: '',
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                people: '',
                message: '',
            },

            directCheckoutData: '',
            bookLock: false
        }
    },
    computed: {
        ...mapGetters({
            auth: 'auth/getUserData'
        })
    },
    methods: {
        setData() {
            this.userData.name = this.auth.name
            this.userData.email = this.auth.email
            this.userData.phone = this.auth.phone
        },


        directCheckout() {
            let box = this.$route.query.box;
            let decodeValue = JSON.parse(decodeURIComponent(box))

            this.directCheckoutData = decodeValue
        },

        // direct checkout &(old method)
        directOrderSubmit() {
            this.$store.dispatch('cart/submitOrder', this.directCheckoutData)
        },

        submitTable() {
            if (this.userData.date || this.userData.phone ||
                this.userData.name || this.userData.time ||
                this.userData.people || this.userData.message) {
                console.log('xxx');
            } else {
                console.log('yyy');
            }
        }

    },

    watch: {
        auth() {
            this.setData();
        },



    },

    mounted() {
        if (this.auth) {
            this.setData();
            this.userData.order_code = this.$route.query.code;

            this.directCheckout();


        }
    }

}
</script>

<style  scoped></style>
