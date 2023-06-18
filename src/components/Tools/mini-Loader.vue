<template>
    <div class="shell">
        <div class="loader-wrap">
            <div class="loader">
                <span class="l">A</span>
                <span class="o">M</span>
                <span class="a">B</span>
                <span class="d">R</span>
                <span class="i">O</span>
                <span class="n">S</span>
                <span class="g">I</span>
                <span class="g">A</span>
                <span class="d1">.</span>
                <span class="d2">.</span>
                <span class="d3">.</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mini-Loader'
}
</script>

<style scoped>
.shell {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #757c3700;
    cursor: pointer;
    z-index: 1000;
}

.loader-wrap {
    width: 100%;
    height: 100% !important;
    background-color: rgba(229, 255, 174, 0);
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
    background-color: rgba(7, 169, 77, 0);
    /* padding: 50px; */
    /* border-radius: 100%; */
    box-shadow: 2px 2px 50px rgba(172, 255, 47, 0.016);
}

.l {
    color: rgb(167, 167, 13);
    opacity: 0;
    animation: pass 2s ease-in-out infinite;
    animation-delay: 0.2s;
    letter-spacing: 0.5em;
    text-shadow: 2px 2px 3px #919191;
}

.o {
    /* color: black; */
    color: rgb(167, 167, 13);
    opacity: 0;
    animation: pass 2s ease-in-out infinite;
    animation-delay: 0.4s;
    letter-spacing: 0.5em;
    text-shadow: 2px 2px 3px #919191;
}

.a {
    /* color: black; */
    color: rgb(167, 167, 13);
    opacity: 0;
    animation: pass 2s ease-in-out infinite;
    animation-delay: 0.6s;
    letter-spacing: 0.5em;
    text-shadow: 2px 2px 3px #919191;
}

.d {
    /* color: black; */
    color: rgb(167, 167, 13);
    opacity: 0;
    animation: pass 2s ease-in-out infinite;
    animation-delay: 0.8s;
    letter-spacing: 0.5em;
    text-shadow: 2px 2px 3px #919191;
}

.i {
    /* color: black; */
    color: rgb(167, 167, 13);
    opacity: 0;
    animation: pass 2s ease-in-out infinite;
    animation-delay: 1s;
    letter-spacing: 0.5em;
    text-shadow: 2px 2px 3px #919191;
}

.n {
    color: rgb(167, 167, 13);
    /* color: black; */
    opacity: 0;
    animation: pass 2s ease-in-out infinite;
    animation-delay: 1.2s;
    letter-spacing: 0.5em;
    text-shadow: 2px 2px 3px #919191;
}

.g {
    /* color: black;     */
    color: rgb(167, 167, 13);
    opacity: 0;
    animation: pass 2s ease-in-out infinite;
    animation-delay: 1.4s;
    letter-spacing: 0.5em;
    text-shadow: 2px 2px 3px #919191;
}

.d1 {
    color: rgb(167, 167, 13);
    opacity: 0;
    font-size: 60px;
    animation: pass1 2s ease-in-out infinite;
    animation-delay: 1.6s;
    /* letter-spacing: 0.5em; */
    letter-spacing: 0.1em;
    text-shadow: 2px 2px 3px #919191;
}

.d2 {
    color: rgb(227, 4, 4);
    opacity: 0;
    font-size: 60px;
    animation: pass1 2s ease-in-out infinite;
    animation-delay: 2s;
    /* letter-spacing: 0.5em; */
    letter-spacing: 0.1em;
    text-shadow: 2px 2px 3px #919191;
}

.d3 {
    color: rgb(0, 255, 0);
    opacity: 0;
    font-size: 60px;
    animation: pass1 2s ease-in-out infinite;
    animation-delay: 2s;
    /* letter-spacing: 0.5em; */
    letter-spacing: 0.1em;
    text-shadow: 2px 2px 3px #919191;
}

@keyframes pass {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes pass1 {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
