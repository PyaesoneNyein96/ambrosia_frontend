<template>
    <div :style="{ background: `url(${'https://jooinn.com/images/blur-restaurant-1.png'})` }" class="login-background">
        <!-- <div class="login-background"> -->

        <section id=" menu" class="Login">
            <div class="container">
                <div class="mx-auto ">
                    <div class="login-card-wrap">

                        <Form class="form mx-auto shadow" style="max-width:350px;" @submit="onSubmit"
                            :validation-schema="formSchema">

                            <p class="heading"><span class="h3">Ambrosia</span>
                                <br>
                                <span v-html="type ? 'LOGIN' : 'REGISTER'"></span>
                            </p>

                            <Field name="email" v-slot="{ field, errors, errorMessage }">

                                <input-template :field="field" :errors="errors" :errorMessage="errorMessage" element="input"
                                    type="text" placeholder="Email . . ." />

                            </Field>


                            <Field name="password" v-slot="{ field, errors, errorMessage }" v-model="password">
                                <input-template :field="field" :errors="errors" :errorMessage="errorMessage" element="input"
                                    type="password" placeholder="Password . . ." />
                            </Field>

                            <Field name="confirm_password" v-slot="{ field, errors, errorMessage }" v-if="!type"
                                v-model="confirm">
                                <input-template :field="field" :errors="errors" :errorMessage="errorMessage" element="input"
                                    type="password" placeholder="Confirm Password . . ." />
                                <p class="small text-danger py-0" v-if="err">
                                    Passwords must match !!
                                </p>
                            </Field>



                            <p class="already py-0 my-0" @click="typeChange()"
                                v-html="type ? 'I want to Register' : 'I already have an account'"></p>

                            <button class="btn" v-html="type ? 'Login' : 'Register'"></button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

/* eslint-disable  */

import inputTemplate from '../../components/Tools/form-input-template.vue'
import { mapGetters } from 'vuex'

import * as yup from 'yup';
import { Field, Form } from 'vee-validate'
export default {
    name: 'Login_Register',
    components: {
        Field,
        Form,
        inputTemplate
    },


    data() {
        return {
            formSchema: {
                email: yup.string().required('Email field is required !').email('Your Email is not valid !!'),
                password: yup.string().required('Password field is required !'),
                // confirm_password: ''
            },
            type: true,
            password: '',
            confirm: '',
            err: false

        }
    },

    computed: {
        ...mapGetters({
            getAuthErr: 'auth/getAuthErr'
        })
    },

    methods: {

        typeChange() {
            this.type = !this.type;
            if (!this.type) {
                this.formSchema.confirm_password = yup.string().required('Confirm password field is required !')

            } else {
                this.formSchema.confirm_password = null
            }
        },

        onSubmit(value, { resetForm }) {
            if (this.type === true) {
                this.$store.dispatch('auth/login', value)
            } else {

                if (this.password !== this.confirm) {
                    this.err = true
                } else {

                    this.$store.dispatch('auth/register', value)
                    resetForm()
                }


            }
        }
    }
}
</script>

<style scoped>
/* .login-background {
    background: url('../../../../public/assets/img/navBackground/dashboard-nav-background.jpg');
} */

.login-background {
    position: relative !important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 83vh;
    object-fit: cover;
    background-position: center !important;
    /* background: url('../../../public/assets/img/login-Background/blur-restaurant-1.png') !important; */

    /* background-image: url('../../../public/assets/img/login-Background/blur-restaurant-1.png'); */
}

.Login {
    padding-top: 100px;
}

.form {
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
</style>
