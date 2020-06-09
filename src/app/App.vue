<template>
    <div id="app">
        <h1>Arcaea Steps Calculator</h1>

        <el-divider><i class="el-icon-star-on"/> Calculation <i class="el-icon-star-on"/></el-divider>

        <div class="calculation">
            <div class="label">How many steps do you want to go? (Decimal allowed)</div>
            <el-input v-model="target"/>


        </div>


        <el-divider><i class="el-icon-star-on"/> Settings <i class="el-icon-star-on"/></el-divider>

        <div class="settings">
            <div class="label">Characters' Step Values:</div>
            <el-input v-model="settings.characterSteps" @change="saveSettings"/>

            <el-container>
                <el-aside width="160px">
                    <div class="label">Bought Song Packs:</div>
                    <el-checkbox v-for="pack in Object.keys(settings.boughtPacks)" :key="pack"
                                 v-model="settings.boughtPacks[pack]" @change="saveSettings">{{pack}}
                    </el-checkbox>
                </el-aside>
                <el-main style="padding: 0; margin-left: 5vw">
                    <div class="label">Bought Individual Songs:</div>
                    <el-input type="textarea" :rows="18" v-model="settings.boughtSongs" @change="saveSettings"/>
                </el-main>
            </el-container>

            <el-container>
                <el-aside width="160px">
                    <div class="label">Level Confidence:</div>
                    <div v-for="level in levels" :key="level">
                        <el-input size="mini" v-model="settings.levelConfidence[level]" @change="saveSettings">
                            <template slot="prepend">{{level}}</template>
                        </el-input>
                    </div>
                </el-aside>
                <el-main style="padding: 0; margin-left: 5vw">
                    <div class="label">Individual Chart Confidence:</div>
                    <el-input type="textarea" :rows="18" v-model="settings.songConfidence" @change="saveSettings"/>
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
        settings = new Settings();
        levels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '9+', '10', '10+', '11']

        target = 15

        saveSettings()
        {
            console.log('Settings saved')
            this.$cookies.set('settings', JSON.stringify(this.settings), '1y')
        }
    }
</script>

<style lang="scss">
    .label
    {
        margin-top: 20px;
        margin-bottom: 5px;
        color: dimgray;
    }

    #app
    {
        max-width: 1000px;
        margin: auto;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

        h1
        {
            text-align: center;
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

    .el-divider
    {
        background-color: #ff277d !important;
    }

    .el-divider__text
    {
        color: #ff277d !important;
    }
</style>
