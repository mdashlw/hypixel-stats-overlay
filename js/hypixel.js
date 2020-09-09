const RANKS = {
    NORMAL: {
        color: '§7',
        prefix: '§7'
    },
    VIP: {
        color: '§a',
        prefix: '§a[VIP] '
    },
    VIP_PLUS: {
        color: '§a',
        prefix: '§a[VIP§6+§a] '
    },
    MVP: {
        color: '§b',
        prefix: '§b[MVP] '
    },
    MVP_PLUS: {
        color: '§b',
        prefix: '§b[MVP$+§b] '
    },
    SUPERSTAR: {
        color: '§6',
        prefix: '@[MVP$++@] '
    },
    YOUTUBER: {
        color: '§c',
        prefix: '§c[§fYOUTUBE§c] '
    },
    JR_HELPER: {
        color: '§9',
        prefix: '§9[JR HELPER] '
    },
    HELPER: {
        color: '§9',
        prefix: '§9[HELPER] '
    },
    MODERATOR: {
        color: '§2',
        prefix: '§2[MOD] '
    },
    ADMIN: {
        color: '§c',
        prefix: '§c[ADMIN] '
    }
}
const COLORS = {
    BLACK: '§0',
    DARK_BLUE: '§1',
    DARK_GREEN: '§2',
    DARK_AQUA: '§3',
    DARK_RED: '§4',
    DARK_PURPLE: '§5',
    GOLD: '§6',
    GRAY: '§7',
    DARK_GRAY: '§8',
    BLUE: '§9',
    GREEN: '§a',
    AQUA: '§b',
    RED: '§c',
    LIGHT_PURPLE: '§d',
    YELLOW: '§e',
    WHITE: '§f'
};

class Player {
    constructor(data) {
        Object.assign(this, data);
    }

    get highestRankName() {
        const {
            rank = 'NORMAL',
            monthlyPackageRank = 'NONE',
            newPackageRank = 'NONE',
            packageRank = 'NONE'
        } = this;

        if (rank !== 'NORMAL') {
            return rank;
        } else if (monthlyPackageRank !== 'NONE') {
            return monthlyPackageRank;
        } else if (newPackageRank !== 'NONE') {
            return newPackageRank;
        } else if (packageRank !== 'NONE') {
            return packageRank;
        } else {
            return 'NORMAL';
        }
    }

    get highestRank() {
        const rankName = this.highestRankName;

        return RANKS[rankName] || {
            color: '§7',
            prefix: `§7[${rankName}] `
        };
    }

    get formattedName() {
        const { displayname, prefix } = this;

        if (prefix) {
            return `${prefix} ${displayname}`;
        }

        const { monthlyRankColor = 'GOLD', rankPlusColor = 'RED' } = this;
        const rankPrefix = this.highestRank.prefix
            .replace(/@/g, COLORS[monthlyRankColor])
            .replace(/\$/g, COLORS[rankPlusColor]);

        return rankPrefix + displayname;
    }

    get coloredName() {
        return this.highestRank.color + this.displayname;
    }

    get skywars_remaining_exp_next_level() {
        const lvl = getSwLevel(this.stats.SkyWars.skywars_experience);
        const perc = lvl % 1;
        return 10000 * (1 - perc);
    }
}

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

var keyCounter = 0;

function provideKey() {
    return HYPIXEL_API_KEYS[keyCounter++ % HYPIXEL_API_KEYS.length];
}

function getPlayerByName(name) {
    return fetch(`https://api.hypixel.net/player?key=${provideKey()}&name=${name}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.player) {
                return new Player(data.player);
            } else {
                return null;
            }
        });
}
