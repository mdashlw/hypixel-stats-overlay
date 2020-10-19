const config = {
  // Use /api new on the server to obtain your personal key
  "api_key": "your key here",
  "player": "mdashlw",
  "stats": [
    "{field:formattedName}",
    "§7Solo Kills: §e{field:stats.SkyWars.kills_solo}",
    "§7Solo Wins: §e{field:stats.SkyWars.wins_solo}",
    "§7Shards: §b{field:stats.SkyWars.shard} §7| §b{session:stats.SkyWars.shard} today",
    "§7Session Kills: §e{session:stats.SkyWars.kills_solo}",
    "§7Session K/D: §a{eval:{session:stats.SkyWars.kills_solo}/{session:stats.SkyWars.deaths_solo}}",
    "§7Goal to 10k wins: §6{goal:stats.SkyWars.wins}",
    "§7Exp until next level: §b{field:stats.SkyWars.exp_until_next_level}",
    "§7WS: §6{field:stats.SkyWars.win_streak}",
  ],
  "goals": {
    "stats.SkyWars.wins": 10000,
  },
  "display": {
    "font": "Minecraft",
    "font_size": 40,
    "outline": true,
  },
};
