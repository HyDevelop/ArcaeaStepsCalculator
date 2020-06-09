<template>
    <div id="app">
        <h1>Arcaea Steps Calculator</h1>

        <el-divider><i class="el-icon-star-on"/> Settings <i class="el-icon-star-on"/></el-divider>

        <div class="settings">
            <div class="label">Characters' Step Values:</div>
            <el-input v-model="settings.characterSteps"/>

            <el-container>
                <el-aside width="160px">
                    <div class="label">Bought Song Packs:</div>
                    <el-checkbox v-for="pack in Object.keys(settings.boughtPacks)" :key="pack"
                                 v-model="settings.boughtPacks[pack]">{{pack}}</el-checkbox>
                </el-aside>
                <el-main style="padding: 0; margin-left: 5vw">
                    <div class="label">Bought Individual Songs:</div>
                    <el-input type="textarea" :rows="18" v-model="settings.boughtSongs"/>
                </el-main>
            </el-container>

            <el-container>
                <el-aside width="160px">
                    <div class="label">Level Confidence:</div>
                    <div v-for="level in Object.keys(this.settings.levelConfidence)" :key="level">
                        <el-input size="mini" v-model="settings.levelConfidence[level]">
                            <template slot="prepend">{{level}}</template>
                        </el-input>
                    </div>
                </el-aside>
                <el-main style="padding: 0; margin-left: 5vw">
                    <div class="label">Individual Chart Confidence:</div>
                    <el-input type="textarea" :rows="18" v-model="settings.songConfidence"/>
                </el-main>
            </el-container>
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
            margin-top: 20px;
            margin-bottom: 5px;
        }

        .settings
        {
            text-align: left;
            color: dimgray;
        }
    }

    .el-checkbox
    {
        display: block !important;
        margin-bottom: 3px;
    }

    .el-input-group
    {
        margin-bottom: 3px;
    }
</style>
