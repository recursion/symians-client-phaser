import { Selection } from '../../src/app/selection';
import { expect } from 'chai';
import 'mocha';
describe('Selection', () => {
    it('Should have a selection property', () => {
        const result = Selection();
        expect(result).to.haveOwnProperty('selection');
    });
});
