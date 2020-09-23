// Use /api new on hypixel to obtain your key
const HYPIXEL_API_KEYS = [
    'insert-key-here'
];
const PLAYER_NAME = 'irlHamster';
const DISPLAY = [
    {
        display: '{}',
        stat: 'formattedName'
    },
    {
        display: '§7Solo Kills: §e{}',
        stat: 'stats.SkyWars.kills_solo'
    },
    {
        display: '§7Solo Wins: §e{}',
        stat: 'stats.SkyWars.wins_solo'
    },
    {
        display: '§7Goal to 8.5k wins: §6{}',
        goal: 'stats.SkyWars.wins_solo'
    },
    {
        display: '§7Level: §a{}',
        stat: 'stats.SkyWars.levelFormatted'
    },
    {
        display: '§7Exp for next level: §b{}',
        stat: 'skywars_remaining_exp_next_level'
    }
];
const GOALS = {
    'stats.SkyWars.wins_solo': 8500
};
const IMAGE_SETTINGS = {
    // Minecraft font is built-in
    'font': 'Minecraft',
    'size': 40,
    // See readme to see what is outline
    'outline': true
}
