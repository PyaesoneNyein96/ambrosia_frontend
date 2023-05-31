<template>
    <div>
        <!-- ========== INPUT Section ========== -->

        <div v-if="element == 'input'" class="mb-4">
            <input class="w-100 form-control shadow-none" :type="type" v-bind="field"
                :class="{ 'is-invalid': errors.length !== 0 }" :placeholder="placeholder" :min="min">
            <div class="py-0 text-start">

                <p class="small text-danger my-0" v-if="errors.length !== 0">
                    {{ errorMessage }}
                </p>

                <div v-else-if="serverErr">
                    <div v-if="errForWhat == 'name'">
                        <small class="text-danger" v-for="err in serverErr.foodName" :key="err">
                            {{ err }}
                        </small>
                    </div>
                    <div v-if="errForWhat == 'price'">
                        <small class="text-danger" v-for="err in serverErr.foodPrice" :key="err">
                            {{ err }}
                        </small>
                    </div>
                </div>

            </div>
        </div>

        <!-- ========== TEXTAREA Section ========== -->

        <div v-if="element == 'textarea'" class="mb-4">
            <textarea class="form-control shadow-none" :rows="rows" :class="{ 'is-invalid': errors.length !== 0 }"
                :placeholder="placeholder" v-bind="field">
            </textarea>
            <div class="py-0 text-start">
                <Transition name="slow" appear>
                    <p class="small text-danger my-0" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </p>
                </Transition>
            </div>
        </div>


        <!-- ========== SELECT Section ========== -->

        <div v-if="element == 'select'" class="mb-4">
            <select class="form-select shadow-none" v-bind="field" :class="{ 'is-invalid': errors.length !== 0 }">
                <slot />

            </select>
            <div class="py-0 text-start">
                <Transition name="slow" appear>
                    <p class="small text-danger my-0" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </p>
                </Transition>
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
        'min',
        'rows',
        'serverErr',
        'errForWhat',
        'labelText'

    ],
    methods: {


    }
}
</script>

<style scoped>
form label,
select {
    cursor: pointer;
}
</style>
