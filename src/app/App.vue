<template>
    <div id="app">
        <h1>Arcaea Steps Calculator</h1>

        <el-divider><i class="el-icon-star-on"/> Settings <i class="el-icon-star-on"/></el-divider>

        <div class="settings">
            <div class="label">Characters' Step Values:</div>
            <el-input placeholder="Step Values" v-model="settings.characterSteps"/>
        </div>
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
    #app
    {
        max-width: 1000px;
        margin: auto;
        text-align: center;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

        .label
        {
            margin: 5px;
        }

        .settings
        {
            text-align: left;
            color: dimgray;
        }
    }
</style>
