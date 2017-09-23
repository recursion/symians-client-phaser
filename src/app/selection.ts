import { Coordinates } from '../world/coordinates';
// import { not, contains } from 'ramda';

export const Selection = () => (
    {
        enabled: false,
        start: { x: 0, y: 0, z: 0 },
        end: { x: 0, y: 0, z: 0 }
    }
);
export const start = (coords, selection) => {
    selection.start = coords
    selection.enabled = true;
    return selection;
};
export const stop = (coords, selection) => {
    selection.end = coords
    selection.enabled = false;
    return selection;
};
export const update = (coords, selection) => {
    selection.end = coords
    return selection;
};

export const selected = (selection) => {
    if (selection.enabled) {
        const z = selection.end && selection.end.z || 0;

        const selected = [];

        const [xStart, xDiff] = (selection.end.x > selection.start.x)
            ? [selection.start.x, (selection.end.x - selection.start.x)]
            : [selection.end.x, (selection.start.x - selection.end.x)];

        const [yStart, yDiff] = (selection.end.y > selection.start.y)
            ? [selection.start.y, (selection.end.y - selection.start.y)]
            : [selection.end.y, (selection.start.y - selection.end.y)];


        for (let x = xStart; x < xStart + xDiff + 1; x++) {
            for (let y = yStart; y < yStart + yDiff + 1; y++) {
                selected.unshift({ x, y, z });
            }
        }
        return selected;
    } else {
        return [];
    }
}
