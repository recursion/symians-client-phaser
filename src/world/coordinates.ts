export const Coordinates = ([x, y, z] = [0, 0, 0]) => (
    { x: x, y: y, z: z }
);

export const hash = (coords) => {
    return [coords.x, coords.y, coords.z].join('|');
};

export const unHash = (coords) => {
    const [x, y, z] = coords.split('|');
    return Coordinates([Number(x), Number(y), Number(z)]);
};
