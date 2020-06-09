// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const csvJson = fs.readFileSync('./csvjson.json').toString().replace(/""/g, '-1').replace(/[*?]/g, '')
const csv = JSON.parse(csvJson)

const finalJson = []
let lastSong = {}

for (const entry of csv)
{
    // Reading a new song
    if (entry["Title"] !== -1)
    {
        lastSong = {}
        lastSong.title = entry["Title"]
        lastSong.artist = entry["Artist(s)"]
        lastSong.length = entry["Length"]
        lastSong.designer = entry["Chart designer"]
        lastSong.bpm = entry["BPM (Beats Per Minute)"]
        lastSong.side = entry["Side"]
        lastSong.worldMode = entry["Unlocked in World Mode?"]
        lastSong.pack = entry["Pack"]
        lastSong.version = entry["Version implementation"]
        lastSong.charts = []

        finalJson.push(lastSong)
    }

    // Add specific info about this song.
    const charts = {}
    charts.difficulty = "" + entry["Difficulty"]
    charts.notes = entry["Notes"]
    charts.floorNotes = entry["Floor Notes"]
    charts.holdNotes = entry["Hold Notes"]
    charts.arcNotes = entry["Arc Notes"]
    charts.skyNotes = entry["Sky Notes"]
    charts.notesPerSec = entry["Notes per second"]
    charts.chartConstant = entry["Chart Constant"]

    lastSong.charts.push(charts)
}

fs.writeFileSync("charts.json", JSON.stringify(finalJson))
