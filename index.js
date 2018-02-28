/**
 * Copyright 2018. Starry, Inc. All Rights Reserved.
 *
 * MIT Licensed, see LICENSE.md
 *
 * Software written by Alfred Ababio <alfred@starry.com>.
 */

'use strict';

const street_types = require('street-types');

/**
 * Flattens street_types into maps of abbreviation <-> suffix
 * @param  Array[Object] types - array of street_types
 * @param  String        key   - string to key the flat map by
 * @return Object              - map of abbreviations to suffixes
 */
function flatten( types, key ) {
  return types.reduce( ( prev, type ) => {
    return type.abbrs.reduce( ( flat, abbr ) => {
      return Object.assign( flat, { [ abbr.trim() ]: type[ key ] } );
    }, prev );
  }, {} );
}

/**
 * String ONLY object get all other types return undefined
 * @param  Object map - An object
 * @param  String key - A key
 * @return Any
 */
function get( map, key ) {
  if ( typeof key !== 'string' ) {
    return;
  }

  return map[ key.toUpperCase() ];
}

const expansions    = flatten( street_types, 'suffix' );
const abbreviations = flatten( street_types, 'standardAbbr' );

module.exports = {
  expand: get.bind( null, expansions ),
  abbreviate: get.bind( null, abbreviations )
};
