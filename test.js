'use strict';

const { assert } = require('chai');
const rewire     = require('rewire');
const modulePath = './index';

describe( 'index', () => {

  describe( '#flatten', () => {
    it( 'Correctly makes a 1-to-1 map', () => {
      const module  = rewire( modulePath );
      const flatten = module.__get__('flatten');
      const given = [
        {
          "suffix": "ALLEY",
          "abbrs": ["ALLEE", "ALLEY", "ALLY", "ALY"],
          "standardAbbr": "ALY"
        },
        {
          "suffix": "ANEX",
          "abbrs": ["ANEX", "ANNEX", "ANNX", "ANX"],
          "standardAbbr": "ANX"
        },
        {
          "suffix": "ARCADE",
          "abbrs": ["ARC", "ARCADE "],
          "standardAbbr": "ARC"
        }
      ];

      const actual = flatten( given, 'suffix' );

      const expected = {
        ALLEE: 'ALLEY',
        ALLEY: 'ALLEY',
        ALLY: 'ALLEY',
        ALY: 'ALLEY',
        ANEX: 'ANEX',
        ANNEX: 'ANEX',
        ANNX: 'ANEX',
        ANX: 'ANEX',
        ARC: 'ARCADE',
        ARCADE: 'ARCADE'
      };

      assert.deepEqual( actual, expected );
    });
  });

  describe( '#get', () => {

    it( 'returns undefined for non-strings', () => {
      const module = rewire( modulePath );
      const get    = module.__get__('get');

      assert.isUndefined( get( { 5: 3 }, 5 ) );
    });

    it( 'returns the right thing for strings', () => {
      const module = rewire( modulePath );
      const get    = module.__get__('get');

      assert.equal( get( { '5': 3 }, '5' ), 3 );
    });
  });

  describe( '#expand', () => {

    it( 'expands a known abbr', () => {
      const module   = rewire( modulePath );
      const expected = 'BLUFF';
      const actual   = module.expand('BLF');

      assert.equal( actual, expected );
    });

    it( 'returns undefined for anything unknown', () => {
      const module   = rewire( modulePath );
      const actual   = module.expand('something else');

      assert.isUndefined( actual );
    });
  });

  describe( '#abbreviate', () => {
    it( 'abbreviates a known expansion', () => {
      const module   = rewire( modulePath );
      const expected = 'BLF';
      const actual   = module.abbreviate('BLUFF');

      assert.equal( actual, expected );
    });

    it( 'abbreviates a known abbreviation', () => {
      const module   = rewire( modulePath );
      const expected = 'BLF';
      const actual   = module.abbreviate('BLUF');

      assert.equal( actual, expected );
    });

    it( 'returns undefined for anything unknown', () => {
      const module   = rewire( modulePath );
      const actual   = module.abbreviate('something else');

      assert.isUndefined( actual );
    });
  });

});
