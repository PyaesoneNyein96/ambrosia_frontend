<template>
    <div class="wrap-404 text-center">
        <img src="../public/assets/img/ERR404/invalid-url-1354629517.png"
            class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
        <h1>The Page you want to go is <b>Not Found !!!</b>
            <div class="text-warning" @click="this.$router.push({ name: 'home' })" style="cursor: pointer;">
                Back to home</div>
        </h1>
    </div>
</template>

<script>
export default {


}
</script>

<style  scoped>
.wrap-404 {
    margin-top: 12%;
    margin-bottom: 15%;
}
</style>
