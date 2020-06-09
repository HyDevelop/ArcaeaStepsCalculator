# Arcaea Steps Calculator

## How to use

1. Open Site ( [English](https://arcaea.hydev.org/#en) | [中文](https://arcaea.hydev.org/#zh) )
2. Scroll down to chagne settings (settings are automatically saved to cookies)
3. Change the target steps number to recalculate.

## How to update charts data:

(This is recorded in case future contributors forgets how to update chart data)

* Create a Google sheet document
* Type `=importHTML("https://arcaea.fandom.com/wiki/Songs_data","table",1)` on A1
* File > Download > `.csv`
* Go to https://csvjson.com/csv2json
* Paste `.csv` content, convert to json
* Download json
* Copy json to `src/charts/csvjson.json`
* Open terminal in `src/charts/`
* Run `node csvjson-to-json.js`
* Done!
