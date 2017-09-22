import { Coordinates, hash, unHash } from '../../src/world/coordinates';
import { expect } from 'chai';
import 'mocha';
describe('Coordinates', () => {
    it('Returns an object with an x, y, and z property', () => {
        const result = Coordinates();
        expect(result).to.haveOwnProperty('x');
        expect(result).to.haveOwnProperty('y');
        expect(result).to.haveOwnProperty('z');
    });
    it('returns an object with the x, y, z coordinates provided as args', () => {
        const result = Coordinates([1, 7, 8]);
        expect(result.x).to.equal(1);
        expect(result.y).to.equal(7);
        expect(result.z).to.equal(8);
    });
    it('returns coordinates of 0, 0, 0 when no arguments are given', () => {
        const result = Coordinates();
        expect(result.x).to.equal(0);
        expect(result.y).to.equal(0);
        expect(result.z).to.equal(0);
    });
    describe('hash', () => {
        it('Returns a | seperated string of coords', () => {
            const coords = Coordinates([5, 5, 5]);
            const result = hash(coords);
            expect(result).to.equal('5|5|5');
        });
    });
    describe('unHash', () => {
        it('Returns a set of x, y, z coordinates from a | seperated string of coordinates', () => {
            const coords = Coordinates([5, 5, 5]);
            const hashed = hash(coords);
            const result = unHash(hashed);
            expect(result).to.deep.equal(coords);
        });
    });
});
