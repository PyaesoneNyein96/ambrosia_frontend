<template>
    <section id="about" class="about">
        <div class="container-fluid p-5">

            <div class="row">

                <div class="col-lg-5 align-items-stretch video-box" style='background-image: url("assets/img/about.jpg");'>
                    <a href="https://www.youtube.com/watch?v=xPPLbEFbCAo" class="venobox play-btn mb-4" data-vbtype="video"
                        data-autoplay="true"></a>
                </div>

                <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch">

                    <div class="content">
                        <h3 :class="scroll">Story of <strong class="h1"> Ambrosia</strong></h3>
                        <div class="text-wrap" :class="scroll2">
                            <p>
                                Founded in 1967, our restaurant has been serving delicious meals and creating memorable
                                dining experiences for [NUMBER] of years. Our journey began with a simple passion for food
                                and a vision to provide a unique culinary destination for our guests.
                            </p>
                            <p class="fst-italic">
                                Over the years, we have grown into a beloved establishment, cherished by locals and visitors
                                alike. Our commitment to using the finest ingredients, showcasing culinary creativity, and
                                delivering exceptional service has earned us a reputation as a go-to dining destination.
                            </p>
                        </div>
                        <ul :class="scroll3" class="mt-2">
                            <li><i class="bx bx-check-double"></i> Building Sustainable Relationships</li>
                            <li><i class="bx bx-check-double"></i> Seasonal Menus and Culinary Creativity</li>
                            <li><i class="bx bx-check-double"></i> An Elevated Dining Experience</li>
                            <li><i class="bx bx-check-double"></i> Discovering Exotic Flavors</li>
                        </ul>
                        <p :class="scroll3">
                            Join us on this journey as we celebrate the beauty of local, sustainable, and delicious
                            food. Together, we can support our community, protect our environment, and indulge in the
                            incredible flavors that nature provides.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    </section>
</template>

<script>


export default {

    props: ['scroll', 'scroll2', 'scroll3']

}
</script>

<style  scoped>
.about {
    opacity: 0.9;
    background-color: rgba(255, 255, 253, 0.511);
    /* height: 120vh; */

}
</style>
