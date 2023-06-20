<template>
    <div class="mt-5">

        <section id="book-a-table" class="book-a-table">
            <div class="container">

                <div class="section-title">
                    <h2>Book a <span>Table</span></h2>
                    <h1>With Phone Number</h1>
                    <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, ut.</p> -->
                </div>

                <form action="" class="php-email-form mb-5">
                    <div class="row">

                        <div class="col-lg-4 col-md-6 form-group">
                            <input type="text" name="name" class="form-control" id="name" placeholder="Your Name"
                                data-rule="minlen:4" data-msg="Please enter at least 4 chars">
                            <div class="validate"></div>
                        </div>

                        <div class="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                            <input type="text" class="form-control" name="phone" id="phone" placeholder="Your Phone"
                                data-rule="minlen:4" data-msg="Please enter at least 4 chars">
                            <div class="validate"></div>
                        </div>

                        <div class="col-lg-4 col-md-6 form-group mt-3  mt-md-0">
                            <input type="date" name="date" class="form-control" id="date" placeholder="Date"
                                data-rule="minlen:4" data-msg="Please enter at least 4 chars">
                            <div class="validate"></div>
                        </div>
                        <div class="col-lg-4 col-md-6 form-group mt-3">
                            <input type="time" class="form-control" name="time" id="time" placeholder="Time"
                                data-rule="minlen:4" data-msg="Please enter at least 4 chars">
                            <div class="validate"></div>
                        </div>

                        <div class="col-lg-4 col-md-6 form-group mt-3">
                            <input type="number" min="1" class="form-control" name="people" id="people"
                                placeholder="# of people" data-rule="minlen:1" data-msg="Please enter at least 1 chars">
                            <div class="validate"></div>
                        </div>

                        <div class="col-lg-4 col-md-6 form-group mt-3 ">
                            <input type="text" class="form-control border-danger"
                                placeholder="Food allergic or dietary restrictions . . ." data-rule="minlen:1"
                                data-msg="Please enter at least 1 chars">
                            <div class="validate"></div>
                        </div>




                    </div>
                    <div class="form-group my-4">
                        <textarea class="form-control" rows="4" placeholder="Message"></textarea>
                        <div class="validate"></div>
                    </div>
                    <div class="mb-3">
                        <div class="loading">Loading</div>
                        <div class="error-message"></div>
                        <div class="sent-message">Your booking request was sent. We will call back or send an Email to
                            confirm your
                            reservation. Thank you!</div>
                    </div>
                    <div class="text-center"><button type="submit">Send Order</button></div>
                </form>

            </div>
        </section><!-- End Book A Table Section -->
    </div>
</template>

<script>
export default {

}
</script>

<style  scoped></style>
