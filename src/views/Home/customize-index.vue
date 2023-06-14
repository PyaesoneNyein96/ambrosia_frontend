<template>
    <div class="main-wrap">
        <div class="container">
            <div class="row">
                <div class="col-md-7">
                    <h4 class="title text-secondary" :class="scroll">The Most-Popular Dishes in this Month
                        <hr>
                    </h4>
                    <h2 :class="scroll"><strong class="text-muted"> Savor the Finest Beef Steak Delights at Our
                            Ambrosia</strong></h2>

                    <div class="text-wrap" :class="scroll2">
                        <p>Introduction:
                        </p>
                        <p class="text-muted">
                            At <strong> Ambrosia </strong>, we take pride in offering our patrons an extraordinary culinary
                            experience. This month, we are thrilled to present the most popular and mouthwatering beef steak
                            dishes that will tantalize your taste buds and leave you craving for more. Our expert chefs have
                            meticulously crafted a menu that showcases the finest cuts of beef cooked to perfection,
                            ensuring an unforgettable dining experience.
                        </p>
                        <br>

                    </div>
                </div>
                <div class="col-md-5" :class="scroll3">
                    <div class="img-wrap mt-5">
                        <img src="../../../public/assets/img/steak.jpg" class="img-thumbnail">
                    </div>
                </div>
                <p class="mt-2" :class="scroll2">
                    <strong>Classic Ribeye Steak:</strong>
                    Indulge in the timeless elegance of our Classic Ribeye Steak. This prime cut of beef, known for
                    its marbling and exceptional tenderness, is grilled to your desired level of doneness. Served
                    with a choice of delectable sides and accompanied by a rich and savory sauce, this dish is a
                    true celebration of flavor and texture.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'customize-index',
    props: ['scroll', 'scroll2', 'scroll3']
}
</script>

<style scoped>
.main-wrap {
    /* height: 120vh; */
    padding-top: 100px;
    background-color: rgb(255, 255, 254);
}

.container {
    width: 100vw;
    /* height: 90vh; */
}

.row {
    padding: 100px 30px;
}

.title {
    font-weight: bolder;
}
</style>
