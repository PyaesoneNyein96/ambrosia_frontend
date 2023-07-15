<template>
    <div :style="{ background: `url(${'https://jooinn.com/images/blur-restaurant-1.png'})` }" class="bg-wrap">
        <!-- <div class="login-background"> -->

        <section id=" menu" class="Login">
            <div class="container">
                <div class="mx-auto ">
                    <div class="login-card-wrap">


                        <form class="form mx-auto">

                            <span class="text-color mt-3 h4">Change Password</span>
                            <span class="text-color fw-bold">
                                {{ auth.email }}

                            </span>

                            <input type="password" class="login form-control-color shadow-none" v-model="form.oldPassword"
                                placeholder="Your Old Password . . .">
                            <small class="text-danger py-0" v-if="validate.oldRequired">Old Password is Required !</small>
                            <small class="text-danger" v-if="validate.oldIncorrect">Old Password is incorrect!</small>

                            <input type="password" class="login form-control-color shadow-none" v-model="form.newPassword"
                                placeholder="New Password . . .">
                            <small class="text-danger py-0" v-if="validate.newRequired">New Password is Required !</small>

                            <input type="password" class="login form-control-color shadow-none"
                                v-model="form.confirmPassword" placeholder="Confirm Password">
                            <small class="text-danger py-0" v-if="validate.confirmErr">Password is not match !</small>
                            <small class="text-danger py-0" v-if="validate.confirmRequired">New Password is Required
                                !</small>

                            <button type="button" class="btn btn-primary my-4" @click="submit"
                                :disabled="validate.Btn_required">
                                Update Password</button>

                        </form>










                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>



import { mapGetters } from 'vuex'

export default {
    name: 'user-password-change',

    data() {
        return {

            old_password: 'abc',
            form: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                user_id: ''
            },
            validate: {
                oldRequired: false,
                oldIncorrect: false,
                confirmRequired: false,
                confirmErr: false,


                newRequired: false,

                Btn_required: false,
            }
        }
    },
    computed: {
        ...mapGetters({
            auth: 'auth/getUserData'
        })
    },
    methods: {
        submit() {
            if (this.check()) {

                let form = new FormData();
                form = this.form
                this.$store.dispatch('auth/passwordUpdate', form)
            }



        },

        check() {

            Object.entries(this.validate).forEach(([key]) => {
                this.validate[key] = false
            });


            if (this.form.oldPassword === '') {
                this.validate.oldRequired = true;
            }
            else if (this.form.newPassword === '') {
                this.validate.newRequired = true;
            }
            else if (this.form.confirmPassword === '') {
                this.validate.confirmRequired = true;
            }
            else if (this.form.confirmPassword !== this.form.newPassword) {
                this.validate.confirmErr = true;
            }
            else {
                return true
            }

        }
    },

    beforeUpdate() {
        if (this.form.oldPassword === '' || this.form.newPassword === '' || this.form.confirmPassword === '') {
            this.Btn_required = true
        } else {
            this.Btn_required = false
        }

    },
    watch: {
        auth() {
            this.form.user_id = this.auth.id
        }
    },

    mounted() {
        this.form.user_id = this.auth.id
    }



}
</script>

<style scoped>
.bg-wrap {
    min-height: 90vh;
    top: 0;
    /* background: url('../../../public/assets/img/logo/menu.jpg') top no-repeat; */
    position: relative;
    background-size: cover;
    padding-top: 50px;
}

.bg-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: rgba(255, 255, 255, 0.164);
}

.container {
    position: relative;
    z-index: 10;
}

/*  */
.login-background {
    position: relative !important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 83vh;
    object-fit: cover;
    background-position: center !important;
}

.Login {
    padding-top: 100px;
}

.form {
    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding-top: 1em;
    padding-bottom: 2em;
    border: 2px dashed #DAA06D;
    border-radius: 15px;
    background-color: #EADDCA;
    box-shadow: 0 0 0 4px #EADDCA, 2px 2px 4px 2px rgba(0, 0, 0, 0.5);
    transition: .4s ease-in-out;
}

::placeholder {
    color: #DAA06D;
    text-align: center;
}

.text-color {
    color: #DAA06D;
}

.already {
    color: #bf8859;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.already:hover {
    color: #c0854a;
    transform: scale(1.03);
}

.form .heading {
    padding-left: 0.8em;
    color: #DAA06D;
    background-color: transparent;
    letter-spacing: .5em;
    text-align: center;
    padding-top: 1.5em;
    padding-bottom: 0em;
    text-shadow: inset -1px -1px 1px #DAA06D;
    cursor: pointer;
}

.form .input {
    outline: none;
    border: 1px solid #DAA06D;
    color: #DAA06D;
    width: 17em;
    height: 3em;
    border-radius: 10px;
    background-color: #EADDCA;
    text-align: center;
    cursor: text;
}

.form .btn {
    align-self: center;
    /* margin-top: 2em; */
    border-radius: 10px;
    outline: none;
    border: none;
    color: white;
    background-color: #E5AA70;
    font-weight: bold;
    letter-spacing: 0.1em;
    transition: .4s ease-in-out opacity, .1s ease-in-out active;
    padding: 1em;
    box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
}

.form .btn:hover {
    opacity: 0.8;
}

.form .btn:active {
    transform: translateX(0.1em) translateY(0.1em);
    box-shadow: none;
}

/*  */
form .login {
    outline: none;
    padding: 0.5em;
    border: 1px solid #DAA06D;
    color: #DAA06D;
    width: 17em;
    height: 3em;
    border-radius: 10px;
    background-color: #EADDCA !important;
    text-align: center;
    cursor: text;
}

.form .login:focus {
    background-color: #EADDCA;
}

::placeholder {
    color: #DAA06D;
    text-align: center;
}

/* ------ ------ */
.slow-enter-active,
.slow-leave-active {
    opacity: 1;
    transition: all 0.3s ease-in-out;
}

.slow-enter-from,
.slow-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>
