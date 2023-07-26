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
                    <input type="text" class="form-control" v-model="form.subject" placeholder="Title" required>
                </div>
                <div class="form-group mt-3">
                    <textarea class="form-control" v-model="form.message" rows="5" placeholder="Message"
                        required></textarea>
                </div>
                <div class="my-3 rating-wrap">
                    <h4 class="my-0">Please rate our website <span class="fw-bold text-warning"> Ambrosia</span></h4>

                    <div class="rating">

                        <input type="radio" id="star1" name="rate" value="1" @click="rate(5)">
                        <label for="star1" title="text"></label>

                        <input type="radio" id="star2" name="rate" value="2" @click="rate(4)">
                        <label for="star2" title="text"></label>

                        <input type="radio" id="star3" name="rate" value="3" @click="rate(3)">
                        <label for="star3" title="text"></label>

                        <input type="radio" id="star4" name="rate" value="4" @click="rate(2)">
                        <label for="star4" title="text"></label>

                        <input type="radio" id="star5" name="rate" value="5" @click="rate(1)">
                        <label for="star5" title="text"></label>

                    </div>
                </div>
                <!-- <h1>{{ form.rating }}</h1> -->
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
                rating: ''

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

        rate(v) {
            this.form.rating = v;
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

<style  scoped>
.rating-wrap {
    height: 50px;
}

.rating:not(:checked)>input {
    position: absolute;
    appearance: none;
}

.rating:not(:checked)>label {
    float: right;
    align-items: center;
    cursor: pointer;
    font-size: 27px;
    color: #666;
}

.rating:not(:checked)>label:before {
    content: '★';
}

.rating>input:checked+label:hover,
.rating>input:checked+label:hover~label,
.rating>input:checked~label:hover,
.rating>input:checked~label:hover~label,
.rating>label:hover~input:checked~label {
    color: #e58e09;
}

.rating:not(:checked)>label:hover,
.rating:not(:checked)>label:hover~label {
    color: #ff9e0b;
}

.rating>input:checked~label {
    color: #ffa723;
}

.rating {
    position: absolute;
    /* background-color: green; */
    padding: 0;
    margin: 0;
}
</style>
