
export default interface Song
{
    title: string
    artist: string
    length: string
    designer: string
    bpm: number
    side: string
    pack: string
    version: string
    charts: Chart[]
}

export interface Chart
{
    difficulty: string
    notes: number
    floorNotes: number
    holdNotes: number
    arcNotes: number
    skyNotes: number
    notesPerSec: number
    chartConstant: number
    score: number
}
