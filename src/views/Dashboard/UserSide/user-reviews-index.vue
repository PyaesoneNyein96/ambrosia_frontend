<template>
    <div>
        <Reviews />
    </div>
</template>

<script>

import Reviews from '../../Home/Review-index'



export default {
    name: 'reviews-user-index',
    components: {
        Reviews
    },

    beforeMount() {
        this.$store.dispatch('users/getReviews')
    }
}
</script>

<style scoped></style>
