function getStatValue(object, stat) {
    for (const property of stat.split('.')) {
        object = object[property];
    }

    return object;
}

function formatStat(value) {
    if (typeof value === 'number') {
        return value.toLocaleString('en');
    } else if (typeof value === 'boolean') {
        return value ? '§aYes' : '§cNo';
    } else if (value === null || value === undefined) {
        return '§cN/A';
    } else {
        return value;
    }
}

function formatDisplayObject(player, { display, stat, goal }) {
    const value = getStatValue(player, stat || goal);
    var formattedValue;

    if (stat) {
        formattedValue = formatStat(value);
    } else if (goal) {
        const goalValue = GOALS[goal];

        formattedValue = `${Math.trunc(value / goalValue * 100)}%`;
    } else {
        formattedValue = 'specify stat or goal';
    }

    return display.replace('{}', formattedValue);
}

function formatDisplays(player) {
    return DISPLAY.map(d => formatDisplayObject(player, d));
}

function update() {
    getPlayerByName(PLAYER_NAME)
        .then(player => {
            drawItem(formatDisplays(player));
        });
}

update();
setInterval(update, 5000);