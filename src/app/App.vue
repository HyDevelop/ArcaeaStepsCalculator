<template>
    <div id="app">
        <h1>Arcaea Steps Calculator</h1>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Settings from "@/app/settings";

    @Component
    export default class App extends Vue
    {
        settings: Settings = new Settings();
    }
</script>

<style lang="scss">
</style>
