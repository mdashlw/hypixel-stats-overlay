// All the code here is taken and refactored from
// https://github.com/PitPanda/PitPandaProduction/blob/master/utils/ImageHelpers.js

const THE_CANVAS = document.getElementById('the-canvas');
const colors = {
    '0': { color: '000000', textshadow: '000000' },
    '1': { color: '0000AA', textshadow: '00006A' },
    '2': { color: '00AA00', textshadow: '006A00' },
    '3': { color: '00AAAA', textshadow: '006A6A' },
    '4': { color: 'AA0000', textshadow: '6A0000' },
    '5': { color: 'AA00AA', textshadow: '6A006A' },
    '6': { color: 'FFAA00', textshadow: 'BF6A00' },
    '7': { color: '999999', textshadow: '595959' },
    '8': { color: '3f3f3f', textshadow: '000000' },
    '9': { color: '5555FF', textshadow: '1515BF' },
    'a': { color: '55FF55', textshadow: '15BF15' },
    'b': { color: '55FFFF', textshadow: '15BFBF' },
    'c': { color: 'FF5555', textshadow: 'BF1515' },
    'd': { color: 'FF55FF', textshadow: 'BF15BF' },
    'e': { color: 'FFFF55', textshadow: 'BFBF15' },
    'f': { color: 'FFFFFF', textshadow: 'BFBFBF' }
};

function drawItem(lines, { outline = IMAGE_SETTINGS.outline, background = null } = {}) {
    const size = IMAGE_SETTINGS.size;
    const padding = 8;
    const height = lines.length * size + padding * 2;
    const width = padding * 2 + Math.max(...lines.map(measureText));
    THE_CANVAS.width = width;
    THE_CANVAS.height = height;
    const ctx = THE_CANVAS.getContext('2d');

    ctx.patternQuality = 'best';
    ctx.quality = 'best';

    if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
    }

    if (outline) {
        ctx.fillStyle = '#120211';
        ctx.strokeStyle = '#25015b';
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.arc(6, 6, 4, Math.PI, 1.5 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(width - 6, 6, 4, 1.5 * Math.PI, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(6, height - 6, 4, 0.5 * Math.PI, 1 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(width - 6, height - 6, 4, 0, 0.5 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1, 5);
        ctx.lineTo(2, height - 6);
        ctx.lineTo(6, height - 2);
        ctx.lineTo(width - 6, height - 2);
        ctx.lineTo(width - 2, height - 6);
        ctx.lineTo(width - 2, 6);
        ctx.lineTo(width - 6, 2);
        ctx.lineTo(6, 2);
        ctx.lineTo(2, 6);
        ctx.fill();
        ctx.stroke();
    }

    lines.forEach((line, index) => {
        drawText(line, { x: padding, y: size * index + padding });
    });
}

function measureText(text, { size = IMAGE_SETTINGS.size, font = IMAGE_SETTINGS.font } = {}) {
    const ctx = THE_CANVAS.getContext('2d');

    ctx.patternQuality = 'best';
    ctx.quality = 'best';

    var bold = false;
    var length = size * 0.05;

    const parts = text.split('§');
    for (const part of parts) {
        const key = part.charAt(0);

        if (key === 'l') {
            bold = true;
        } else if (key === 'r') {
            bold = false;
        }

        ctx.font = `${bold ? 'bold' : ''} ${size}px ${font}`;
        length += ctx.measureText(part.substring(1)).width;
    }

    return length;
}

function drawText(text, { x = 0, y = 0, size = IMAGE_SETTINGS.size, font = IMAGE_SETTINGS.font } = {}) {
    if (!text.startsWith('§')) {
        text = `§7${text}`;
    }

    const ctx = THE_CANVAS.getContext('2d');

    ctx.patternQuality = 'best';
    ctx.quality = 'best';
    ctx.fillStyle = "#ffffff";

    const offset = Math.max(1, size * 0.02);
    const adjustedy = y + size * (5 / 6);
    var position = size * 0.05;

    var color = colors['7'];
    var bold = false;
    var italic = false;

    const parts = text.split('§');
    for (const part of parts) {
        const key = part.charAt(0);
        color = colors[key] || color;

        if (key === 'l') {
            bold = true;
        } else if (key === 'n') {
            italic = true;
        } else if (key === 'r') {
            bold = false;
            italic = false;
        }

        ctx.font = `${bold ? 'bold' : ''} ${italic ? 'italic' : ''} ${size}px ${font}`;
        ctx.fillStyle = `#${color.textshadow}`;
        ctx.fillText(part.substring(1), Math.floor(x + position + offset), Math.floor(adjustedy + offset));
        ctx.fillStyle = `#${color.color}`;
        ctx.fillText(part.substring(1), Math.floor(x + position), Math.floor(adjustedy));
        position += ctx.measureText(part.substring(1)).width;
    }
}
