<template>
    <div>
        <div class=" rounded-3 my-2 ms-2">
            <button class="btn-info text-light nav-btn btn btn-sm" @click="drink">Drink</button>
            <button class="btn-success btn ms-1 btn-sm nav-btn" @click="food">Food</button>
            <button class="btn-secondary btn ms-1 btn-sm nav-btn" @click="all">All</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'foodByType',
    methods: {
        drink() {
            this.$store.dispatch('food/getFoodByType', 0)
            // this.getFoodByType([0])
        },
        food() {
            this.$store.dispatch('food/getFoodByType', 1)
        },
        all() {
            this.$store.dispatch('food/getFoodByType', 2)
        },
    },
}
</script>

<style scoped></style>
