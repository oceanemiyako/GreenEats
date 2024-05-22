<script setup>
</script>

<template>
    <main>
        <div class="content">
            <div class="smartphone">
                <img src="@/img/screen1.png" alt="description d'un produit" />
            </div>
            <div class="text">
                <h1>GREEN EATS votre guide de poche!</h1>
                <p>
                    Scannez, découvrez, faites des choix alimentaires éclairés. <br>
                    Des informations détaillées sur chaque produit, un suivi selon <br>
                    votre type d'alimentation! GREEN EATS est particulièrement vegan friendly.
                </p>
                <h2>Mangez bien, vivez vert avec GREEN EATS!</h2>
            </div>
            <div class="illustration">
                <img class="tomato" src="@/img/tomato.png" alt="logo tomate">
            </div>
        </div>
        <div class="content content-bottom">
            <div class="info">
                <div class="avis">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <defs>
                            <clipPath id="star">
                                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <div class="stars">
                        <div><span style="width: 100%;"></span></div>
                        <div><span style="width: 100%;"></span></div>
                        <div><span style="width: 100%;"></span></div>
                        <div><span style="width: 100%;"></span></div>
                        <div><span style="width: 70%;"></span></div>
                    </div>
                    <br>
                    <span>4,7/10 - 5500 avis </span>
                </div>
            </div>
            <div class="screens bg-green">
                <img src="@/img/screen2.png" alt="produits favoris" class="screen">
                <img src="@/img/screen3.png" alt="page inscription type de régimes" class="screen">
                <img src="@/img/screen4.png" alt="scan code" class="screen">
            </div>
            <div class="downloads bg-green">
                <!-- <a href="" class="appstore">appstore</a>
                <a href="" class="googleplay">google play</a> -->
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    padding: 1rem;
}

h1, h2, p {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #0B9D60;
}

header {
    background-color: #d6fcec;
    padding: 1rem;
}
header .logo {
    display: inline-block;
}
header .logo img {
    display: block;
    height: auto;
    max-width: 300px;
    width: 100%;
}

.content {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    max-width: 1400px;
}
.content.content-bottom {
    gap: 0;
    margin-left: -1rem;
    margin-right: -1rem;
}
.content-bottom > div {
    flex-grow: 1;
}


.smartphone {
    margin: 0 5% 0 5%;
}
.smartphone img {
    background-color: #eee;
    transform: rotate(-10deg);
}
.illustration {
    max-width: 30%;
    position: relative;
    top: -100px;
}
.tomato {
    height: auto;
    width: 100%;
}

.screens {
    align-items: center;
    display: flex;
    flex-grow: 2;
    justify-content: center;
    margin-top: 100px;
}
.screens .screen {
    background-color: #eee;
    position: relative;
    width: 120px;
    height: 250px;
}
.screens .screen:nth-child(1) {
    transform: rotate(-15deg);
    top: 0;
    right: -10px;
}
.screens .screen:nth-child(2) {
    transform: rotate(5deg);
    top: -20px;
}
.screens .screen:nth-child(3) {
    transform: rotate(20deg);
    top: 20px;
    left: -10px;
}


.info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.stars {
    display: flex;
}
.stars div {
    background: #eee;
    clip-path: url(#star);
    height: 1.5rem;
    margin: .125rem;
    width: 1.5rem;
}
.stars span {
    background: orange;
    display: block;
    height: 100%;
    width: 0;
}

.bg-green {
    background-color: #d6fcec;
}

.downloads {
    align-items: flex-end;
    display: inline-flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 1rem;
}

/* desktop */
@media screen and (min-width: 769px) {
    .content {
        margin: 100px auto;
    }
    .smartphone img {
        height: auto;
        max-width: 250px;
        width: 100%;
    }
}

/* mobile */
@media screen and (max-width: 768px) {
    header .logo {
        max-width: 60vw;
    }
    .content {
        flex-direction: column;
        margin: 25px 0 50px;
        position: relative;
    }
    .smartphone {
        margin-bottom: 25px;
        margin-left: 10vw;
        order: 1;
    }
    .smartphone img {
        height: auto;
        max-width: 230px;
        width: 100%;
    }
    .illustration {
        max-width: 45%;
        order: 2;
        position: absolute;
        right: 0;
        top: 20px;
        z-index: 1;
    }
    .avis {
        margin: 0 1rem;
    }
    .text {
        order: 3;
    }
}
</style>