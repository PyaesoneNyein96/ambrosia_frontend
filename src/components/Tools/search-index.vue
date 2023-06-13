<template>
    <div class="">
        <div class="input-wrapper">
            <button class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="205px" width="25px">
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff"
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z">
                    </path>

                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M22 22L20 20">
                    </path>
                </svg>
            </button>
            <input placeholder="Search.." class="input" name="text" type="text" v-model="search_key" v-on:keyup="search"
                v-on:keyup.enter="search_key = ''" @click="isBlank">
        </div>
    </div>
</template>

<script>
export default {
    name: 'search-index.vue',
    data() {
        return {
            search_key: '',
            route_name: ''
        }
    },
    methods: {
        search() {
            let value = {
                key: this.search_key
            }

            if (this.route_name == 'food_List') {
                this.$store.dispatch('food/searchByAdmin', value);

            } else if (this.route_name == 'user_list') {
                this.$store.dispatch('users/searchUserByAdmin', value)
            }
        },


        clear() {
            this.search_key = ''
        }
    },

    created() {
        this.route_name = this.$route.name;

    },

}
</script>

<style  scoped>
.input-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    position: relative;
}

.input {
    border-style: none;
    height: 35px;
    width: 35px;
    padding: 10px;
    outline: none;
    border-radius: 50%;
    transition: .5s ease-in-out;
    /* background-color: #7e4fd4; */
    background-color: #5c590f73;
    box-shadow: 0px 0px 3px #262121;
    padding-right: 10px;
    color: #9c1818;
}

.input::placeholder,
.input {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 15px;
}

.input::placeholder {
    color: #7c791c2f;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0px;
    cursor: pointer;
    width: 35px;
    height: 35px;
    outline: none;
    border-style: none;
    border-radius: 50%;
    pointer-events: painted;
    background-color: transparent;
    transition: .2s linear;
}

.icon:focus~.input,
.input:focus {
    box-shadow: none;
    width: 150px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 3px solid #7e4fd4;
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    /* color: red; */
}
</style>
