<template>
    <div class="container pt-5">
        <div class="wrap col text-center">
            <h1>Coming Soon . . <span class="text-warning" @click="this.$router.push({ name: 'home' })">Back to home</span>
            </h1>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wrap {
    width: 100%;
    height: 50vh;
}

h1 {
    margin-top: 200px;
    cursor: pointer;
}
</style>
