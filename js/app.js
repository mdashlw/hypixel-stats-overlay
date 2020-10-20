const formattersFunctions = {
    'field': (player, value) => getField(player, value),
    'session': (player, value) => getField(player, value) - getField(firstPlayer, value),
    'goal': (player, value) => `${(getField(player, value) / config.goals[value] * 100).toFixed(2)}%`,
    'eval': (player, value) => eval(applyFormatters(player, value, { format: false })),
};
const customFields = {
    'stats.SkyWars.exp_until_next_level': player => {
        function getSwLevel(xp) {
            var xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
            if (xp >= 15000) {
                return (xp - 15000) / 10000 + 12;
            } else {
                for (i = 0; i < xps.length; i++) {
                    if (xp < xps[i]) {
                        return 1 + i + (xp - xps[i - 1]) / (xps[i] - xps[i - 1]);
                    }
                }
            }
        }

        const lvl = getSwLevel(player.stats.SkyWars.skywars_experience);
        const perc = lvl % 1;
        return 10000 * (1 - perc);
    },
    'stats.SkyWars.win_streak': player => {
        const newWins = player.stats.SkyWars.wins;
        const newLosses = player.stats.SkyWars.losses;

        if (!winStreakData.wins) {
            winStreakData.wins = newWins;
        }

        if (!winStreakData.losses) {
            winStreakData.losses = newLosses;
        }

        if (newLosses > winStreakData.losses) {
            winStreakData.losses = newLosses;
            winStreakData.winStreak = 0;
        } else if (newWins > winStreakData.wins) {
            winStreakData.wins = newWins;
            winStreakData.winStreak += 1;
        }

        return winStreakData.winStreak;
    },
};
let firstPlayer = null;

const winStreakData = {
    winStreak: 0,
    wins: 0,
    losses: 0
};

function getField(object, field) {
    if (customFields[field]) {
        return customFields[field](object);
    }

    for (const property of field.split('.')) {
        if (!object) {
            return null;
        }

        object = object[property];
    }

    return object;
}

function formatValue(value) {
    if (typeof value === 'number') {
        if (isNaN(value)) {
            return '§cN/A';
        } else {
            if (Number.isInteger(value)) {
                return value.toLocaleString('en');
            } else {
                return parseFloat(value.toFixed(2)).toLocaleString('en');
            }
        }
    } else if (typeof value === 'boolean') {
        return value ? '§aYes' : '§cNo';
    } else if (value === null || value === undefined) {
        return '§cN/A';
    } else {
        return value;
    }
}

function extractFormatters(string) {
    let formatters = [];
    let formatter;
    let token;
    let nested = 0;

    for (let index = 0; index < string.length; index++) {
        const char = string[index];

        if (char === '{') {
            if (!formatter) {
                formatter = {
                    key: '',
                    value: '',
                    indexStart: index,
                    indexEnd: -1
                };
                token = 'key';
                continue;
            } else {
                nested += 1;
            }
        } else if (char === '}') {
            if (--nested === -1) {
                formatter.indexEnd = index;
                formatters.push(formatter);
                formatter = undefined;
                nested = 0;
                continue;
            }
        } else if (char === ':') {
            if (formatter && !formatter.value) {
                token = 'value';
                continue;
            }
        }

        if (formatter) {
            formatter[token] += char;
        }
    }

    return formatters;
}

function applyFormatters(player, string, { format = true } = {}) {
    const formatters = extractFormatters(string);

    for (const formatter of formatters.reverse()) {
        const func = formattersFunctions[formatter.key];
        const result = func(player, formatter.value);
        const formattedResult = format ? formatValue(result) : result;

        string = string.substring(0, formatter.indexStart) + formattedResult + string.substring(formatter.indexEnd + 1);
    }

    return string;
}

function formatDisplays(player) {
    return config.stats.map(stat => applyFormatters(player, stat));
}

function update() {
    getPlayerByName(config.player)
        .then(player => {
            if (!player) {
                drawItem(['§4Player not found:', '§c' + config.player]);
                return;
            }

            if (!firstPlayer) {
                firstPlayer = player;
            }

            drawItem(formatDisplays(player));
        })
        .catch(error => {
            console.error(error);
            drawItem(['§4Error:', '§c' + error.message]);
        });
}

update();
setInterval(update, 5000);
