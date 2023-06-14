<template>
    <div>
        <section id="why-us" class="why-us mb-4">
            <div class="container">

                <div class="section-title" :class="scroll">
                    <h2>Why choose <span>Our Restaurant</span></h2>
                    <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas
                        atque
                        vitae
                        autem.</p>
                </div>

                <div class="row p-3 shadow" :class="scroll">

                    <div class="col-lg-4" :class="scroll">
                        <div class="box">
                            <span>01</span>
                            <h4>Culinary Excellence</h4>
                            <p> Showcase your talented chefs, their expertise, and the exceptional quality of the dishes you
                                offer. Highlight any awards, certifications, or special culinary techniques that make your
                                restaurant stand out. Emphasize the use of fresh, locally sourced ingredients and your
                                commitment to creating memorable dining experiences.
                            </p>
                        </div>
                    </div>

                    <div class="col-lg-4 mt-4 mt-lg-0" :class="scroll2">
                        <div class="box">
                            <span>02</span>
                            <h4>Menu Variety</h4>
                            <p>Highlight the diverse range of options available on your menu. Whether you specialize in a
                                particular cuisine or offer a fusion of flavors, make sure to mention the variety of choices
                                available to cater to different preferences and dietary restrictions. This can include
                                vegetarian, vegan, gluten-free, or other specialty options.</p>
                        </div>
                    </div>

                    <div class="col-lg-4 mt-4 mt-lg-0" :class="scroll3">
                        <div class="box">
                            <span>03</span>
                            <h4>Exceptional Service</h4>
                            <p>Highlight your commitment to providing outstanding customer service. Emphasize the
                                attentiveness and friendliness of your staff, their knowledge about the menu, and their
                                ability to cater to individual needs and preferences. Share any testimonials or customer
                                reviews that commend the exceptional service they received.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
        <!-- End Whu Us Section -->
    </div>
</template>

<script>


export default {
    name: 'why-us',
    props: ['scroll', 'scroll2', 'scroll3']
}
</script>

<style scoped>
.why-us {
    background-color: whitesmoke;
    height: 100vh;
    /* padding-top: 70px; */
}
</style>
