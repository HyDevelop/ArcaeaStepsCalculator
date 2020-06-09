# Arcaea Steps Calculator

### How to update charts data:

* Create a Google sheet document
* Type `=importHTML("https://arcaea.fandom.com/wiki/Songs_data","table",1)` on A1
* File > Download > `.csv`
* Go to https://csvjson.com/csv2json
* Paste `.csv` content, convert to json
* Download json
* Open json with Notepad++
* Replace `*` with empty string
* Copy json to `src/charts/csvjson.json`
* Open terminal in `src/charts/`
* Run `ts-node csvjson-to-json.ts`
* Done!
