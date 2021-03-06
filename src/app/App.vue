<template>
    <div id="app">
        <h1>{{t('title')}}</h1>
        <div class="subtitle">
            <a href="https://github.com/HyDevelop/ArcaeaStepsCalculator">Github</a>
            &lt;
            <a href="https://github.com/hykilpikonna">By Hykilpikonna</a>
            &gt;
            <a href="https://www.youtube.com/channel/UCCwz4RuQr1Glln359nuj2vw">Youtube</a>
        </div>

        <el-divider><i class="el-icon-star-on"/> {{t('divCalculation')}} <i class="el-icon-star-on"/></el-divider>

        <div class="calculation">
            <div class="label">{{t('lblTarget')}}</div>
            <el-input v-model="target"/>

            <div class="label">{{t('lblResults')}}</div>
            <el-table :data="getDisplayedPossibilities()" style="width: 100%" stripe border height="60vh"
                      :default-sort="{prop: 'length', order: 'ascending'}">
                <el-table-column sortable prop="title" :label="t('tableTitle')"/>

                <el-table-column sortable prop="length" :label="t('tableTime')"
                                 width="100" align="center"/>

                <el-table-column sortable prop="diff" :label="t('tableDiff')"
                                 width="100" align="center"/>

                <el-table-column sortable prop="char" :label="t('tableChar')"
                                 width="150" align="center"/>

                <el-table-column sortable prop="steps" :label="t('tableSteps')"
                                 width="100" align="center"/>

                <el-table-column sortable prop="shift" :label="t('tableShift')"
                                 width="100" align="center"/>
            </el-table>
        </div>


        <el-divider><i class="el-icon-star-on"/> {{t('divSettings')}} <i class="el-icon-star-on"/></el-divider>

        <div class="settings">
            <div class="label">{{t('lblDisplayLimit')}}</div>
            <el-input v-model="settings.displayLimit" @change="saveSettings"/>

            <div class="label">{{t('lblShiftRange')}}</div>
            <el-input v-model="settings.shiftRange" @change="saveSettings"/>

            <div class="label">{{t('lblCharSteps')}}</div>
            <el-input v-model="settings.characterSteps" @change="saveSettings"/>

            <el-container>
                <el-aside width="160px">
                    <div class="label">{{t('lblBoughtPacks')}}</div>
                    <el-checkbox v-for="pack in Object.keys(settings.boughtPacks)" :key="pack"
                                 v-model="settings.boughtPacks[pack]" @change="saveSettings">{{pack}}
                    </el-checkbox>
                </el-aside>
                <el-main style="padding: 0; margin-left: 5vw">
                    <div class="label">{{t('lblBoughtSongs')}}</div>
                    <el-input type="textarea" :rows="18" v-model="settings.boughtSongs" @change="saveSettings"/>
                </el-main>
            </el-container>

            <el-container>
                <el-aside width="160px">
                    <div class="label">{{t('lblLevelConfidence')}}</div>
                    <div v-for="level in levels" :key="level">
                        <el-input size="mini" v-model="settings.levelConfidence[level]" @change="saveSettings">
                            <template slot="prepend">{{level}}</template>
                        </el-input>
                    </div>
                </el-aside>
                <el-main style="padding: 0; margin-left: 5vw">
                    <div class="label">{{t('lblChartConfidence')}}</div>
                    <el-input type="textarea" :rows="18" v-model="settings.songConfidence" @change="saveSettings"/>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Settings from "@/app/settings";
    import Possibility from "@/app/possibility";
    import Song from "@/app/charts";
    import {i18n} from "@/main";

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const songs = require('../charts/charts.json') as Song[]

    @Component
    export default class App extends Vue
    {
        settings = new Settings();
        levels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '9+', '10', '10+', '11']

        target = 15

        possibilities: Possibility[] = []

        created()
        {
            // i18n
            window.addEventListener('locationchange', this.checkLang)
            window.onhashchange = this.checkLang
            this.checkLang()

            // Load settings from cookies
            if (this.$cookies.isKey('settings'))
            {
                this.settings = this.$cookies.get('settings')
            }
            this.indexConfidence()
            this.calculate()
        }

        checkLang()
        {
            // Check i18n
            const url = window.location.href.toLowerCase()
            if (url.includes('zh') || url.includes('cn') || url.includes('ch')) i18n.locale = 'zh'
            else i18n.locale = 'en'
        }

        saveSettings()
        {
            console.log('Settings saved')
            this.$cookies.set('settings', JSON.stringify(this.settings), '1y')
            this.indexConfidence()
            this.calculate()
        }

        /**
         * Cache confidence scores
         */
        indexConfidence()
        {
            // Every song
            for (const song of songs)
            {
                // Every difficulty
                for (const chart of song.charts)
                {
                    // Get confidence score
                    let score = this.settings.levelConfidence[chart.difficulty]
                    for (const confidence of this.settings.songConfidence.split('\n'))
                    {
                        const split = confidence.replace(/ /g, '').split('-')
                        const title = split[0]
                        const split1 = split[0].split(':')
                        const diff = split1[0]

                        if (song.title.replace(/ /g, '').includes(title) && chart.difficulty == diff)
                        {
                            score = +split1[1]
                        }
                    }

                    chart.score = score
                }
            }
        }

        calculate()
        {
            this.possibilities = []

            // Every song
            for (const song of songs)
            {
                if (!this.settings.boughtPacks[song.pack]) continue

                // Every difficulty
                for (const chart of song.charts)
                {
                    // Every character
                    for (const char of this.settings.characterSteps.split(',').map(it => +it))
                    {
                        // Calculate play rating
                        // https://arcaea.fandom.com/wiki/Potential#Play_Rating
                        const playRating = Math.max(chart.chartConstant + this.getScoreModifier(chart.score))

                        // Calculate steps
                        // https://arcaea.fandom.com/wiki/World_Mode_Mechanics#Calculation
                        const steps = (2.45 * Math.sqrt(playRating) + 2.5) * (char / 50)

                        this.possibilities.push({song, chart, char, steps: +steps.toFixed(1)})
                    }
                }
            }
        }

        getScoreModifier(score: number)
        {
            // https://arcaea.fandom.com/wiki/Potential#Play_Rating
            if (score >= 1000) return 2
            if (score >= 980) return score/20 - 48
            return score/3 - 95/3
        }

        getDisplayedPossibilities()
        {
            // Sort
            const sorted = this.possibilities.slice().map(it => {return {
                title: it.song.title, length: it.song.length, diff: it.chart.difficulty, char: it.char,
                steps: it.steps, shift: +Math.abs(it.steps - this.target).toFixed(1)
            }}).filter(it => it.shift <= this.settings.shiftRange).sort((a,b) => a.shift - b.shift)

            // Pick the first 20
            return sorted.slice(0, Math.min(this.settings.displayLimit, this.possibilities.length))
        }

        t(id: string) { return this.$t(id) }
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
            margin-bottom: 10px;
        }

        .subtitle
        {
            text-align: center;
            color: #ff79ad;
            margin-bottom: 21px;

            a
            {
                color: inherit;
            }
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
