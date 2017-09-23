import { Selection, selected, start, stop, update } from '../../src/app/selection';
import * as R from 'ramda';
import { expect } from 'chai';
import 'mocha';
import * as Location from '../../src/world/location';

describe('Selection', () => {
    it('has an enabled property', () => {
        const result = Selection();
        expect(result).to.haveOwnProperty('enabled');
    });

    it('has a start property', () => {
        const result = Selection();
        expect(result).to.haveOwnProperty('start');
    });
    it('has an end property', () => {
        const result = Selection();
        expect(result).to.haveOwnProperty('end');
    });
    describe('.start', () => {
        it('sets the begin property of a Selection', () => {
            const expected = {
                enabled: true,
                start: { x: 1, y: 1, z: 0 },
                end: { x: 0, y: 0, z: 0 }
            }

            const selection = Selection();
            const coords = { x: 1, y: 1, z: 0 };
            const result = start(coords, selection)
            expect(result).to.deep.equal(expected);
        });
        it('sets enabled to true', () => {
            const selection = Selection();
            const coords = { x: 1, y: 1, z: 0 };
            const result = start(coords, selection)
            expect(result.enabled).to.equal(true);
        });
    });
    describe('.update', () => {
        it('updates the end coordinates', () => {
            const expected = {
                enabled: true,
                start: { x: 1, y: 1, z: 0 },
                end: { x: 2, y: 3, z: 0 }
            }

            const selection = Selection();
            const coords = { x: 1, y: 1, z: 0 };
            const coords2 = { x: 2, y: 3, z: 0 };
            const sel1 = start(coords, selection)
            const result = update(coords2, sel1)
            expect(result).to.deep.equal(expected);
        });
    });
    describe('.stop', () => {
        it('sets the end property of a Selection', () => {
            const expected = {
                enabled: false,
                start: { x: 0, y: 0, z: 0 },
                end: { x: 1, y: 1, z: 0 }
            }

            const selection = Selection();
            const coords = { x: 1, y: 1, z: 0 };
            const result = stop(coords, selection)
            expect(result).to.deep.equal(expected);
        })
        it('sets enabled to false', () => {
            const selection = Selection();
            const coords = { x: 1, y: 1, z: 0 };
            const result = stop(coords, selection)
            expect(result.enabled).to.equal(false);
        })
    });
    describe('.selected', () => {
        it('returns an empty array if inactive', () => {
            let subject = Selection();
            subject = start({ x: 5, y: 10, z: 0 }, subject)
            subject = stop({ x: 1, y: 20, z: 0 }, subject)
            expect(selected(subject)).to.deep.equal([]);
        });
        it('calculates the current selection', () => {
            const expected = {
                enabled: false,
                start: { x: 1, y: 2, z: 0 },
                end: { x: 1, y: 1, z: 0 }
            };
            let sel = Selection();
            sel = start({ x: 1, y: 2, z: 0 }, sel)
            sel = update({ x: 1, y: 1, z: 0 }, sel)
            expect(selected(sel)).to.deep.equal([{ x: 1, y: 2, z: 0 }, { x: 1, y: 1, z: 0 }])
        });
        it('calculates the current selection', () => {
            const expected = [{ x: 1, y: 1, z: 0 }, { x: 1, y: 2, z: 0 }, { x: 2, y: 1, z: 0 }, { x: 2, y: 2, z: 0 }];
            let sel = Selection();
            sel = start({ x: 1, y: 1, z: 0 }, sel)
            sel = update({ x: 2, y: 2, z: 0 }, sel)

            // create a list of coordinates that are not in both lists
            const diff = R.difference(expected, selected(sel));
            expect(diff.length).to.equal(0);
        });
    });
});
