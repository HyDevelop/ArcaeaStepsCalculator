
export default class Settings
{
    displayLimit = 20
    shiftRange = 0.8
    characterSteps = '102,90,76,55'
    boughtPacks: {[index: string]: boolean} = {
        'Arcaea': true,
        'World Extend': false,
        'Black Fate': false,
        'Adverse Prelude': true,
        'Luminous Sky': true,
        'Vicious Labyrinth': true,
        'Eternal Core': true,
        'Sunset Radiance': false,
        'Absolute Reason': false,
        'Binary Enfold': false,
        'Ambivalent Vision': false,
        'Crimson Solace': false,
        'CHUNITHM': false,
        'Groove Coaster': false,
        'Tone Sphere': false,
        'Lanota': false,
        'Dynamix': false,
        'Memory Archive': false
    }
    boughtSongs = 'Astral tale\nAvant Raze'
    levelConfidence: {[index: string]: number} = {
        '1': 1000,
        '2': 1000,
        '3': 1000,
        '4': 1000,
        '5': 999,
        '6': 998,
        '7': 996,
        '8': 994,
        '9': 986,
        '9+': 930,
        '10': 940,
        '10+': 0, // I don't want to use 10+ charts to climb steps
        '11': 0
    }
    songConfidence = 'Monochrome Princess - 9 : 0\nLunarOrbit - 9: 968\nKanagawa - 9: 999\nBabaroque - 8: 0'
}
