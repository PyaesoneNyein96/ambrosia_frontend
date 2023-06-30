<template>
    <!-- <div> -->
    <section id="contact" class="contact mt-5">

        <div>
            <div class="h3 fw-bold text-center text-muted mb-3">User Suggestion</div>
        </div>

        <div class="container">

            <form @submit.prevent="submit" role="form" class="php-email-form" v-if="form">
                <div class="row">
                    <div class="col-md-6 form-group">
                        <input type="text" class="form-control" v-model="form.name" placeholder="Your Name" disabled>
                    </div>
                    <div class="col-md-6 form-group mt-3 mt-md-0">
                        <input type="email" class="form-control" v-model="form.email" placeholder="Your Email" disabled>
                    </div>
                </div>
                <div class="form-group mt-3">
                    <input type="text" class="form-control" v-model="form.subject" placeholder="Subject" required>
                </div>
                <div class="form-group mt-3">
                    <textarea class="form-control" v-model="form.message" rows="5" placeholder="Message"
                        required></textarea>
                </div>
                <div class="my-3">
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div class="text-center"><button type="submit">Send Message</button></div>
            </form>
        </div>
    </section>
    <!-- </div> -->
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'user-suggestion',

    data() {
        return {
            form: {
                user_id: '',
                name: '',
                email: '',
                subject: '',
                message: '',
                rating: 1

            }
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'auth/getUserData'
        })
    },

    methods: {
        submit() {
            this.$store.dispatch('users/submitReview', this.form)
        },


        setData() {
            this.form.name = this.userInfo.name
            this.form.email = this.userInfo.email
            this.form.user_id = this.userInfo.id
        }
    },

    watch: {
        userInfo() {
            this.setData()
        }
    },

    mounted() {
        if (this.userInfo) {
            this.setData()
        }
    },

}
</script>

<style  scoped></style>
