<template>
    <div id="app">
        <div class="nav bm-flex ai-center">
            <router-link to="/menu">Menu</router-link>
            <router-link to="/stats">Statistics</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
    .nav {
        background: $bm-white;
        height: 70px;
        color: $bm-red;
        padding: 0 2rem;

        a {
            text-decoration: none;
            margin-right: 2rem;
            color: $bm-grey;

            &.router-link-active {
                color: $bm-red;
            }
        }
    }
</style>
