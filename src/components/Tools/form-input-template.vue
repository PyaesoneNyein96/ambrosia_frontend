<template>
    <div>
        <div v-if="element == 'input'">
            <input class="login form-control-color shadow-none" :type="type" v-bind="field"
                :class="{ 'is-invalid': errors.length !== 0 }" :placeholder="placeholder">
            <div class="py-0 text-center">
                <Transition name="slow" appear>
                    <p class="small text-danger my-0" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </p>
                </Transition>
                <!-- <TransitionGroup -->
            </div>
        </div>




    </div>
</template>

<script>

export default {
    props: [
        'type',
        'field',
        'errors',
        'errorMessage',
        'placeholder',
        'element',

    ],


}
</script>

<style scoped>
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
