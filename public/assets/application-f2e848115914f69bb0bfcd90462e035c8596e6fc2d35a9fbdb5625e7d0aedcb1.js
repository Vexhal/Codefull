/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 DataTables Bootstrap 3 integration
 ©2011-2014 SpryMedia Ltd - datatables.net/license
*/

(function(l,q){var e=function(b,c){b.extend(!0,c.defaults,{dom:"<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",renderer:"bootstrap"});b.extend(c.ext.classes,{sWrapper:"dataTables_wrapper form-inline dt-bootstrap",sFilterInput:"form-control input-sm",sLengthSelect:"form-control input-sm"});c.ext.renderer.pageButton.bootstrap=function(g,e,r,s,i,m){var t=new c.Api(g),u=g.oClasses,j=g.oLanguage.oPaginate,d,f,n=0,p=function(c,e){var k,h,o,a,l=function(a){a.preventDefault();
b(a.currentTarget).hasClass("disabled")||t.page(a.data.action).draw(!1)};k=0;for(h=e.length;k<h;k++)if(a=e[k],b.isArray(a))p(c,a);else{f=d="";switch(a){case "ellipsis":d="&hellip;";f="disabled";break;case "first":d=j.sFirst;f=a+(0<i?"":" disabled");break;case "previous":d=j.sPrevious;f=a+(0<i?"":" disabled");break;case "next":d=j.sNext;f=a+(i<m-1?"":" disabled");break;case "last":d=j.sLast;f=a+(i<m-1?"":" disabled");break;default:d=a+1,f=i===a?"active":""}d&&(o=b("<li>",{"class":u.sPageButton+" "+
f,id:0===r&&"string"===typeof a?g.sTableId+"_"+a:null}).append(b("<a>",{href:"#","aria-controls":g.sTableId,"data-dt-idx":n,tabindex:g.iTabIndex}).html(d)).appendTo(c),g.oApi._fnBindAction(o,{action:a},l),n++)}},h;try{h=b(q.activeElement).data("dt-idx")}catch(l){}p(b(e).empty().html('<ul class="pagination"/>').children("ul"),s);h&&b(e).find("[data-dt-idx="+h+"]").focus()};c.TableTools&&(b.extend(!0,c.TableTools.classes,{container:"DTTT btn-group",buttons:{normal:"btn btn-default",disabled:"disabled"},
collection:{container:"DTTT_dropdown dropdown-menu",buttons:{normal:"",disabled:"disabled"}},print:{info:"DTTT_print_info"},select:{row:"active"}}),b.extend(!0,c.TableTools.DEFAULTS.oTags,{collection:{container:"ul",button:"li",liner:"a"}}))};"function"===typeof define&&define.amd?define(["jquery","datatables"],e):"object"===typeof exports?e(require("jquery"),require("datatables")):jQuery&&e(jQuery,jQuery.fn.dataTable)})(window,document);
/*! DataTables 1.10.7
 * ©2008-2015 SpryMedia Ltd - datatables.net/license
 */

(function(Ea,Q,k){var P=function(h){function W(a){var b,c,e={};h.each(a,function(d){if((b=d.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=d.replace(b[0],b[2].toLowerCase()),e[c]=d,"o"===b[1]&&W(a[d])});a._hungarianMap=e}function H(a,b,c){a._hungarianMap||W(a);var e;h.each(b,function(d){e=a._hungarianMap[d];if(e!==k&&(c||b[e]===k))"o"===e.charAt(0)?(b[e]||(b[e]={}),h.extend(!0,b[e],b[d]),H(a[e],b[e],c)):b[e]=b[d]})}function P(a){var b=m.defaults.oLanguage,c=a.sZeroRecords;
!a.sEmptyTable&&(c&&"No data available in table"===b.sEmptyTable)&&E(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(c&&"Loading..."===b.sLoadingRecords)&&E(a,a,"sZeroRecords","sLoadingRecords");a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&db(a)}function eb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");
A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&H(m.models.oSearch,a[b])}function fb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;b&&!h.isArray(b)&&(a.aDataSort=[b])}function gb(a){var a=a.oBrowser,b=h("<div/>").css({position:"absolute",top:0,left:0,height:1,width:1,overflow:"hidden"}).append(h("<div/>").css({position:"absolute",
top:1,left:1,width:100,overflow:"scroll"}).append(h('<div class="test"/>').css({width:"100%",height:10}))).appendTo("body"),c=b.find(".test");a.bScrollOversize=100===c[0].offsetWidth;a.bScrollbarLeft=1!==Math.round(c.offset().left);b.remove()}function hb(a,b,c,e,d,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;e!==d;)a.hasOwnProperty(e)&&(g=j?b(g,a[e],e,a):a[e],j=!0,e+=f);return g}function Fa(a,b){var c=m.defaults.column,e=a.aoColumns.length,c=h.extend({},m.models.oColumn,c,{nTh:b?b:Q.createElement("th"),sTitle:c.sTitle?
c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[e],mData:c.mData?c.mData:e,idx:e});a.aoColumns.push(c);c=a.aoPreSearchCols;c[e]=h.extend({},m.models.oSearch,c[e]);ka(a,e,h(b).data())}function ka(a,b,c){var b=a.aoColumns[b],e=a.oClasses,d=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=d.attr("width")||null;var f=(d.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(fb(c),H(m.defaults.column,c),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&
(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),h.extend(b,c),E(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),E(b,c,"aDataSort"));var g=b.mData,j=R(g),i=b.mRender?R(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&(c(g.sort)||c(g.type)||c(g.filter));b.fnGetData=function(a,b,c){var e=j(a,b,k,c);return i&&b?i(e,b,a,c):e};b.fnSetData=function(a,b,c){return S(g)(a,b,c)};"number"!==typeof g&&
(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,d.addClass(e.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=e.sSortableNone,b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=e.sSortableAsc,b.sSortingClassJUI=e.sSortJUIAscAllowed):!a&&c?(b.sSortingClass=e.sSortableDesc,b.sSortingClassJUI=e.sSortJUIDescAllowed):(b.sSortingClass=e.sSortable,b.sSortingClassJUI=e.sSortJUI)}function X(a){if(!1!==a.oFeatures.bAutoWidth){var b=
a.aoColumns;Ga(a);for(var c=0,e=b.length;c<e;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&Y(a);w(a,null,"column-sizing",[a])}function la(a,b){var c=Z(a,"bVisible");return"number"===typeof c[b]?c[b]:null}function $(a,b){var c=Z(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}function aa(a){return Z(a,"bVisible").length}function Z(a,b){var c=[];h.map(a.aoColumns,function(a,d){a[b]&&c.push(d)});return c}function Ha(a){var b=a.aoColumns,c=a.aoData,e=m.ext.type.detect,d,
f,g,j,i,h,l,q,n;d=0;for(f=b.length;d<f;d++)if(l=b[d],n=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=0;for(j=e.length;g<j;g++){i=0;for(h=c.length;i<h;i++){n[i]===k&&(n[i]=x(a,i,d,"type"));q=e[g](n[i],a);if(!q&&g!==e.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function ib(a,b,c,e){var d,f,g,j,i,o,l=a.aoColumns;if(b)for(d=b.length-1;0<=d;d--){o=b[d];var q=o.targets!==k?o.targets:o.aTargets;h.isArray(q)||(q=[q]);f=0;for(g=q.length;f<
g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Fa(a);e(q[f],o)}else if("number"===typeof q[f]&&0>q[f])e(l.length+q[f],o);else if("string"===typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&e(j,o)}}if(c){d=0;for(a=c.length;d<a;d++)e(d,c[d])}}function K(a,b,c,e){var d=a.aoData.length,f=h.extend(!0,{},m.models.oRow,{src:c?"dom":"data"});f._aData=b;a.aoData.push(f);for(var b=a.aoColumns,f=0,g=b.length;f<g;f++)c&&Ia(a,d,f,x(a,d,f)),b[f].sType=null;a.aiDisplayMaster.push(d);
(c||!a.oFeatures.bDeferRender)&&Ja(a,d,c,e);return d}function ma(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,d){c=na(a,d);return K(a,c.data,d,c.cells)})}function x(a,b,c,e){var d=a.iDraw,f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,c=f.fnGetData(g,e,{settings:a,row:b,col:c});if(c===k)return a.iDrawError!=d&&null===j&&(I(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b,4),a.iDrawError=d),j;if((c===g||null===c)&&
null!==j)c=j;else if("function"===typeof c)return c.call(g);return null===c&&"display"==e?"":c}function Ia(a,b,c,e){a.aoColumns[c].fnSetData(a.aoData[b]._aData,e,{settings:a,row:b,col:c})}function Ka(a){return h.map(a.match(/(\\.|[^\.])+/g),function(a){return a.replace(/\\./g,".")})}function R(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=R(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,
c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=Ka(f);for(var i=0,h=j.length;i<h;i++){f=j[i].match(ba);g=j[i].match(T);if(f){j[i]=j[i].replace(ba,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");i=0;for(h=a.length;i<h;i++)g.push(c(a[i],b,j));a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(T,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===
k)return k;a=a[j[i]]}}return a};return function(b,d){return c(b,d,a)}}return function(b){return b[a]}}function S(a){if(h.isPlainObject(a))return S(a._);if(null===a)return function(){};if("function"===typeof a)return function(b,e,d){a(b,"set",e,d)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,e,d){var d=Ka(d),f;f=d[d.length-1];for(var g,j,i=0,h=d.length-1;i<h;i++){g=d[i].match(ba);j=d[i].match(T);if(g){d[i]=d[i].replace(ba,"");a[d[i]]=[];
f=d.slice();f.splice(0,i+1);g=f.join(".");j=0;for(h=e.length;j<h;j++)f={},b(f,e[j],g),a[d[i]].push(f);return}j&&(d[i]=d[i].replace(T,""),a=a[d[i]](e));if(null===a[d[i]]||a[d[i]]===k)a[d[i]]={};a=a[d[i]]}if(f.match(T))a[f.replace(T,"")](e);else a[f.replace(ba,"")]=e};return function(c,e){return b(c,e,a)}}return function(b,e){b[a]=e}}function La(a){return D(a.aoData,"_aData")}function oa(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0}function pa(a,b,c){for(var e=-1,d=0,f=a.length;d<
f;d++)a[d]==b?e=d:a[d]>b&&a[d]--; -1!=e&&c===k&&a.splice(e,1)}function ca(a,b,c,e){var d=a.aoData[b],f,g=function(c,f){for(;c.childNodes.length;)c.removeChild(c.firstChild);c.innerHTML=x(a,b,f,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===d.src)d._aData=na(a,d,e,e===k?k:d._aData).data;else{var j=d.anCells;if(j)if(e!==k)g(j[e],e);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}d._aSortData=null;d._aFilterData=null;g=a.aoColumns;if(e!==k)g[e].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;
Ma(d)}}function na(a,b,c,e){var d=[],f=b.firstChild,g,j=0,i,o=a.aoColumns,l=a._rowReadObject,e=e||l?{}:[],q=function(a,b){if("string"===typeof a){var c=a.indexOf("@");-1!==c&&(c=a.substring(c+1),S(a)(e,b.getAttribute(c)))}},a=function(a){if(c===k||c===j)g=o[j],i=h.trim(a.innerHTML),g&&g._bAttrSrc?(S(g.mData._)(e,i),q(g.mData.sort,a),q(g.mData.type,a),q(g.mData.filter,a)):l?(g._setter||(g._setter=S(g.mData)),g._setter(e,i)):e[j]=i;j++};if(f)for(;f;){b=f.nodeName.toUpperCase();if("TD"==b||"TH"==b)a(f),
d.push(f);f=f.nextSibling}else{d=b.anCells;f=0;for(b=d.length;f<b;f++)a(d[f])}return{data:e,cells:d}}function Ja(a,b,c,e){var d=a.aoData[b],f=d._aData,g=[],j,i,h,l,q;if(null===d.nTr){j=c||Q.createElement("tr");d.nTr=j;d.anCells=g;j._DT_RowIndex=b;Ma(d);l=0;for(q=a.aoColumns.length;l<q;l++){h=a.aoColumns[l];i=c?e[l]:Q.createElement(h.sCellType);g.push(i);if(!c||h.mRender||h.mData!==l)i.innerHTML=x(a,b,l,"display");h.sClass&&(i.className+=" "+h.sClass);h.bVisible&&!c?j.appendChild(i):!h.bVisible&&c&&
i.parentNode.removeChild(i);h.fnCreatedCell&&h.fnCreatedCell.call(a.oInstance,i,x(a,b,l),f,b,l)}w(a,"aoRowCreatedCallback",null,[j,f,b])}d.nTr.setAttribute("role","row")}function Ma(a){var b=a.nTr,c=a._aData;if(b){c.DT_RowId&&(b.id=c.DT_RowId);if(c.DT_RowClass){var e=c.DT_RowClass.split(" ");a.__rowc=a.__rowc?Na(a.__rowc.concat(e)):e;h(b).removeClass(a.__rowc.join(" ")).addClass(c.DT_RowClass)}c.DT_RowAttr&&h(b).attr(c.DT_RowAttr);c.DT_RowData&&h(b).data(c.DT_RowData)}}function jb(a){var b,c,e,d,
f,g=a.nTHead,j=a.nTFoot,i=0===h("th, td",g).length,o=a.oClasses,l=a.aoColumns;i&&(d=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],e=h(f.nTh).addClass(f.sClass),i&&e.appendTo(d),a.oFeatures.bSort&&(e.addClass(f.sSortingClass),!1!==f.bSortable&&(e.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Oa(a,f.nTh,b))),f.sTitle!=e.html()&&e.html(f.sTitle),Pa(a,"header")(a,e,f,o);i&&da(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(o.sHeaderTH);
h(j).find(">tr>th, >tr>td").addClass(o.sFooterTH);if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function ea(a,b,c){var e,d,f,g=[],j=[],i=a.aoColumns.length,o;if(b){c===k&&(c=!1);e=0;for(d=b.length;e<d;e++){g[e]=b[e].slice();g[e].nTr=b[e].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[e].splice(f,1);j.push([])}e=0;for(d=g.length;e<d;e++){if(a=g[e].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[e].length;f<b;f++)if(o=
i=1,j[e][f]===k){a.appendChild(g[e][f].cell);for(j[e][f]=1;g[e+i]!==k&&g[e][f].cell==g[e+i][f].cell;)j[e+i][f]=1,i++;for(;g[e][f+o]!==k&&g[e][f].cell==g[e][f+o].cell;){for(c=0;c<i;c++)j[e+c][f+o]=1;o++}h(g[e][f].cell).attr("rowspan",i).attr("colspan",o)}}}}function M(a){var b=w(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))C(a,!1);else{var b=[],c=0,e=a.asStripeClasses,d=e.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==B(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=
j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=-1);var g=a._iDisplayStart,o=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,C(a,!1);else if(j){if(!a.bDestroying&&!kb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:o;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ja(a,l);l=q.nTr;if(0!==d){var n=e[c%d];q._sRowStripe!=n&&(h(l).removeClass(q._sRowStripe).addClass(n),q._sRowStripe=n)}w(a,"aoRowCallback",null,[l,q._aData,c,j]);b.push(l);c++}}else c=f.sZeroRecords,
1==a.iDraw&&"ajax"==B(a)?c=f.sLoadingRecords:f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":d?e[0]:""}).append(h("<td />",{valign:"top",colSpan:aa(a),"class":a.oClasses.sRowEmpty}).html(c))[0];w(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],La(a),g,o,i]);w(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],La(a),g,o,i]);e=h(a.nTBody);e.children().detach();e.append(h(b));w(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=
!1}}function N(a,b){var c=a.oFeatures,e=c.bFilter;c.bSort&&lb(a);e?fa(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;M(a);a._drawHold=!1}function mb(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),e=a.oFeatures,d=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=d[0];a.nTableReinsertBefore=a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,o,l,q,n=0;n<f.length;n++){g=
null;j=f[n];if("<"==j){i=h("<div/>")[0];o=f[n+1];if("'"==o||'"'==o){l="";for(q=2;f[n+q]!=o;)l+=f[n+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(o=l.split("."),i.id=o[0].substr(1,o[0].length-1),i.className=o[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;n+=q}d.append(i);d=h(i)}else if(">"==j)d=d.parent();else if("l"==j&&e.bPaginate&&e.bLengthChange)g=nb(a);else if("f"==j&&e.bFilter)g=ob(a);else if("r"==j&&e.bProcessing)g=pb(a);else if("t"==j)g=qb(a);else if("i"==
j&&e.bInfo)g=rb(a);else if("p"==j&&e.bPaginate)g=sb(a);else if(0!==m.ext.feature.length){i=m.ext.feature;q=0;for(o=i.length;q<o;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),d.append(g))}c.replaceWith(d)}function da(a,b){var c=h(b).children("tr"),e,d,f,g,j,i,o,l,q,n;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<i;f++){e=c[f];for(d=e.firstChild;d;){if("TD"==d.nodeName.toUpperCase()||"TH"==d.nodeName.toUpperCase()){l=
1*d.getAttribute("colspan");q=1*d.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;o=g;n=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][o+j]={cell:d,unique:n},a[f+g].nTr=e}d=d.nextSibling}}}function qa(a,b,c){var e=[];c||(c=a.aoHeader,b&&(c=[],da(c,b)));for(var b=0,d=c.length;b<d;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!e[f]||!a.bSortCellsTop))e[f]=c[b][f].cell;return e}function ra(a,b,c){w(a,"aoServerParams","serverParams",[b]);
if(b&&h.isArray(b)){var e={},d=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(d);c?(c=c[0],e[c]||(e[c]=[]),e[c].push(b.value)):e[b.name]=b.value});b=e}var f,g=a.ajax,j=a.oInstance,i=function(b){w(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var o=h.isFunction(f)?f(b,a):f,b=h.isFunction(f)&&o?o:h.extend(!0,b,o);delete g.data}o={data:b,success:function(b){var c=b.error||b.sError;c&&I(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,
c){var f=w(a,null,"xhr",[a,null,a.jqXHR]);-1===h.inArray(!0,f)&&("parsererror"==c?I(a,0,"Invalid JSON response",1):4===b.readyState&&I(a,0,"Ajax error",7));C(a,!1)}};a.oAjaxData=b;w(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(o,{url:g||a.sAjaxSource})):h.isFunction(g)?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(o,g)),g.data=f)}function kb(a){return a.bAjaxDataGet?
(a.iDraw++,C(a,!0),ra(a,tb(a),function(b){ub(a,b)}),!1):!0}function tb(a){var b=a.aoColumns,c=b.length,e=a.oFeatures,d=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,o,l,q=U(a);g=a._iDisplayStart;i=!1!==e.bPaginate?a._iDisplayLength:-1;var n=function(a,b){j.push({name:a,value:b})};n("sEcho",a.iDraw);n("iColumns",c);n("sColumns",D(b,"sName").join(","));n("iDisplayStart",g);n("iDisplayLength",i);var k={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:d.sSearch,regex:d.bRegex}};for(g=
0;g<c;g++)o=b[g],l=f[g],i="function"==typeof o.mData?"function":o.mData,k.columns.push({data:i,name:o.sName,searchable:o.bSearchable,orderable:o.bSortable,search:{value:l.sSearch,regex:l.bRegex}}),n("mDataProp_"+g,i),e.bFilter&&(n("sSearch_"+g,l.sSearch),n("bRegex_"+g,l.bRegex),n("bSearchable_"+g,o.bSearchable)),e.bSort&&n("bSortable_"+g,o.bSortable);e.bFilter&&(n("sSearch",d.sSearch),n("bRegex",d.bRegex));e.bSort&&(h.each(q,function(a,b){k.order.push({column:b.col,dir:b.dir});n("iSortCol_"+a,b.col);
n("sSortDir_"+a,b.dir)}),n("iSortingCols",q.length));b=m.ext.legacy.ajax;return null===b?a.sAjaxSource?j:k:b?j:k}function ub(a,b){var c=sa(a,b),e=b.sEcho!==k?b.sEcho:b.draw,d=b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(e){if(1*e<a.iDraw)return;a.iDraw=1*e}oa(a);a._iRecordsTotal=parseInt(d,10);a._iRecordsDisplay=parseInt(f,10);e=0;for(d=c.length;e<d;e++)K(a,c[e]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;
M(a);a._bInitComplete||ta(a,b);a.bAjaxDataGet=!0;C(a,!1)}function sa(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?R(c)(b):b}function ob(a){var b=a.oClasses,c=a.sTableId,e=a.oLanguage,d=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=e.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),
f=function(){var b=!this.value?"":this.value;b!=d.sSearch&&(fa(a,{sSearch:b,bRegex:d.bRegex,bSmart:d.bSmart,bCaseInsensitive:d.bCaseInsensitive}),a._iDisplayStart=0,M(a))},g=null!==a.searchDelay?a.searchDelay:"ssp"===B(a)?400:0,i=h("input",b).val(d.sSearch).attr("placeholder",e.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT",g?ua(f,g):f).bind("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{i[0]!==
Q.activeElement&&i.val(d.sSearch)}catch(f){}});return b[0]}function fa(a,b,c){var e=a.oPreviousSearch,d=a.aoPreSearchCols,f=function(a){e.sSearch=a.sSearch;e.bRegex=a.bRegex;e.bSmart=a.bSmart;e.bCaseInsensitive=a.bCaseInsensitive};Ha(a);if("ssp"!=B(a)){vb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<d.length;b++)wb(a,d[b].sSearch,b,d[b].bEscapeRegex!==k?!d[b].bEscapeRegex:d[b].bRegex,d[b].bSmart,d[b].bCaseInsensitive);xb(a)}else f(b);a.bFiltered=
!0;w(a,null,"search",[a])}function xb(a){for(var b=m.ext.search,c=a.aiDisplay,e,d,f=0,g=b.length;f<g;f++){for(var j=[],i=0,h=c.length;i<h;i++)d=c[i],e=a.aoData[d],b[f](a,e._aFilterData,d,e._aData,i)&&j.push(d);c.length=0;c.push.apply(c,j)}}function wb(a,b,c,e,d,f){if(""!==b)for(var g=a.aiDisplay,e=Qa(b,e,d,f),d=g.length-1;0<=d;d--)b=a.aoData[g[d]]._aFilterData[c],e.test(b)||g.splice(d,1)}function vb(a,b,c,e,d,f){var e=Qa(b,e,d,f),d=a.oPreviousSearch.sSearch,f=a.aiDisplayMaster,g;0!==m.ext.search.length&&
(c=!0);g=yb(a);if(0>=b.length)a.aiDisplay=f.slice();else{if(g||c||d.length>b.length||0!==b.indexOf(d)||a.bSorted)a.aiDisplay=f.slice();b=a.aiDisplay;for(c=b.length-1;0<=c;c--)e.test(a.aoData[b[c]]._sFilterRow)||b.splice(c,1)}}function Qa(a,b,c,e){a=b?a:va(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',"")}).join(")(?=.*?")+").*$");return RegExp(a,e?"i":"")}function va(a){return a.replace(Yb,"\\$1")}
function yb(a){var b=a.aoColumns,c,e,d,f,g,j,i,h,l=m.ext.type.search;c=!1;e=0;for(f=a.aoData.length;e<f;e++)if(h=a.aoData[e],!h._aFilterData){j=[];d=0;for(g=b.length;d<g;d++)c=b[d],c.bSearchable?(i=x(a,e,d,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(wa.innerHTML=i,i=Zb?wa.textContent:wa.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}
function zb(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}function Ab(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function rb(a){var b=a.sTableId,c=a.aanFeatures.i,e=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Bb,sName:"information"}),e.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",b+"_info"));return e[0]}function Bb(a){var b=
a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,e=a._iDisplayStart+1,d=a.fnDisplayEnd(),f=a.fnRecordsTotal(),g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Cb(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,e,d,f,g,j));h(b).html(j)}}function Cb(a,b){var c=a.fnFormatNumber,e=a._iDisplayStart+1,d=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===d;return b.replace(/_START_/g,c.call(a,e)).replace(/_END_/g,c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,
c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(e/d))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/d)))}function ga(a){var b,c,e=a.iInitDisplayStart,d=a.aoColumns,f;c=a.oFeatures;if(a.bInitialised){mb(a);jb(a);ea(a,a.aoHeader);ea(a,a.aoFooter);C(a,!0);c.bAutoWidth&&Ga(a);b=0;for(c=d.length;b<c;b++)f=d[b],f.sWidth&&(f.nTh.style.width=s(f.sWidth));N(a);d=B(a);"ssp"!=d&&("ajax"==d?ra(a,[],function(c){var f=sa(a,c);for(b=0;b<f.length;b++)K(a,f[b]);
a.iInitDisplayStart=e;N(a);C(a,!1);ta(a,c)},a):(C(a,!1),ta(a)))}else setTimeout(function(){ga(a)},200)}function ta(a,b){a._bInitComplete=!0;b&&X(a);w(a,"aoInitComplete","init",[a,b])}function Ra(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Sa(a);w(a,null,"length",[a,c])}function nb(a){for(var b=a.oClasses,c=a.sTableId,e=a.aLengthMenu,d=h.isArray(e[0]),f=d?e[0]:e,e=d?e[1]:e,d=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)d[0][g]=new Option(e[g],
f[g]);var i=h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",d[0].outerHTML));h("select",i).val(a._iDisplayLength).bind("change.DT",function(){Ra(a,h(this).val());M(a)});h(a.nTable).bind("length.dt.DT",function(b,c,f){a===c&&h("select",i).val(f)});return i[0]}function sb(a){var b=a.sPaginationType,c=m.ext.pager[b],e="function"===typeof c,d=function(a){M(a)},b=h("<div/>").addClass(a.oClasses.sPaging+b)[0],
f=a.aanFeatures;e||c.fnInit(a,b,d);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(e){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),q,l=0;for(q=f.p.length;l<q;l++)Pa(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,d)},sName:"pagination"}));return b}function Ta(a,b,c){var e=a._iDisplayStart,d=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===d?e=0:"number"===typeof b?(e=b*d,e>f&&(e=0)):
"first"==b?e=0:"previous"==b?(e=0<=d?e-d:0,0>e&&(e=0)):"next"==b?e+d<f&&(e+=d):"last"==b?e=Math.floor((f-1)/d)*d:I(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==e;a._iDisplayStart=e;b&&(w(a,null,"page",[a]),c&&M(a));return b}function pb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}function C(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");w(a,
null,"processing",[a,b])}function qb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var e=c.sX,d=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),o=h(b[0].cloneNode(!1)),l=b.children("tfoot");c.sX&&"100%"===b.attr("width")&&b.removeAttr("width");l.length||(l=null);c=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,
width:e?!e?null:s(e):"100%"}).append(h("<div/>",{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({overflow:"auto",height:!d?null:s(d),width:!e?null:s(e)}).append(b));l&&c.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:e?!e?null:s(e):"100%"}).append(h("<div/>",{"class":f.sScrollFootInner}).append(o.removeAttr("id").css("margin-left",
0).append("bottom"===j?g:null).append(b.children("tfoot")))));var b=c.children(),q=b[0],f=b[1],n=l?b[2]:null;if(e)h(f).on("scroll.DT",function(){var a=this.scrollLeft;q.scrollLeft=a;l&&(n.scrollLeft=a)});a.nScrollHead=q;a.nScrollBody=f;a.nScrollFoot=n;a.aoDrawCallback.push({fn:Y,sName:"scrolling"});return c[0]}function Y(a){var b=a.oScroll,c=b.sX,e=b.sXInner,d=b.sY,f=b.iBarWidth,g=h(a.nScrollHead),j=g[0].style,i=g.children("div"),o=i[0].style,l=i.children("table"),i=a.nScrollBody,q=h(i),n=i.style,
k=h(a.nScrollFoot).children("div"),p=k.children("table"),m=h(a.nTHead),r=h(a.nTable),t=r[0],O=t.style,L=a.nTFoot?h(a.nTFoot):null,ha=a.oBrowser,w=ha.bScrollOversize,v,u,y,x,z,A=[],B=[],C=[],D,E=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};r.children("thead, tfoot").remove();z=m.clone().prependTo(r);v=m.find("tr");y=z.find("tr");z.find("th, td").removeAttr("tabindex");L&&(x=L.clone().prependTo(r),u=L.find("tr"),x=x.find("tr"));
c||(n.width="100%",g[0].style.width="100%");h.each(qa(a,z),function(b,c){D=la(a,b);c.style.width=a.aoColumns[D].sWidth});L&&G(function(a){a.style.width=""},x);b.bCollapse&&""!==d&&(n.height=q[0].offsetHeight+m[0].offsetHeight+"px");g=r.outerWidth();if(""===c){if(O.width="100%",w&&(r.find("tbody").height()>i.offsetHeight||"scroll"==q.css("overflow-y")))O.width=s(r.outerWidth()-f)}else""!==e?O.width=s(e):g==q.width()&&q.height()<r.height()?(O.width=s(g-f),r.outerWidth()>g-f&&(O.width=s(g))):O.width=
s(g);g=r.outerWidth();G(E,y);G(function(a){C.push(a.innerHTML);A.push(s(h(a).css("width")))},y);G(function(a,b){a.style.width=A[b]},v);h(y).height(0);L&&(G(E,x),G(function(a){B.push(s(h(a).css("width")))},x),G(function(a,b){a.style.width=B[b]},u),h(x).height(0));G(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+C[b]+"</div>";a.style.width=A[b]},y);L&&G(function(a,b){a.innerHTML="";a.style.width=B[b]},x);if(r.outerWidth()<g){u=i.scrollHeight>i.offsetHeight||
"scroll"==q.css("overflow-y")?g+f:g;if(w&&(i.scrollHeight>i.offsetHeight||"scroll"==q.css("overflow-y")))O.width=s(u-f);(""===c||""!==e)&&I(a,1,"Possible column misalignment",6)}else u="100%";n.width=s(u);j.width=s(u);L&&(a.nScrollFoot.style.width=s(u));!d&&w&&(n.height=s(t.offsetHeight+f));d&&b.bCollapse&&(n.height=s(d),b=c&&t.offsetWidth>i.offsetWidth?f:0,t.offsetHeight<i.offsetHeight&&(n.height=s(t.offsetHeight+b)));b=r.outerWidth();l[0].style.width=s(b);o.width=s(b);l=r.height()>i.clientHeight||
"scroll"==q.css("overflow-y");ha="padding"+(ha.bScrollbarLeft?"Left":"Right");o[ha]=l?f+"px":"0px";L&&(p[0].style.width=s(b),k[0].style.width=s(b),k[0].style[ha]=l?f+"px":"0px");q.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)i.scrollTop=0}function G(a,b,c){for(var e=0,d=0,f=b.length,g,j;d<f;){g=b[d].firstChild;for(j=c?c[d].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,e):a(g,e),e++),g=g.nextSibling,j=c?j.nextSibling:null;d++}}function Ga(a){var b=a.nTable,c=a.aoColumns,e=a.oScroll,d=e.sY,f=e.sX,
g=e.sXInner,j=c.length,e=Z(a,"bVisible"),i=h("th",a.nTHead),o=b.getAttribute("width"),l=b.parentNode,k=!1,n,m;(n=b.style.width)&&-1!==n.indexOf("%")&&(o=n);for(n=0;n<e.length;n++)m=c[e[n]],null!==m.sWidth&&(m.sWidth=Db(m.sWidthOrig,l),k=!0);if(!k&&!f&&!d&&j==aa(a)&&j==i.length)for(n=0;n<j;n++)c[n].sWidth=s(i.eq(n).width());else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var p=h("<tr/>").appendTo(j.find("tbody"));j.find("tfoot th, tfoot td").css("width",
"");i=qa(a,j.find("thead")[0]);for(n=0;n<e.length;n++)m=c[e[n]],i[n].style.width=null!==m.sWidthOrig&&""!==m.sWidthOrig?s(m.sWidthOrig):"";if(a.aoData.length)for(n=0;n<e.length;n++)k=e[n],m=c[k],h(Eb(a,k)).clone(!1).append(m.sContentPadding).appendTo(p);j.appendTo(l);f&&g?j.width(g):f?(j.css("width","auto"),j.width()<l.offsetWidth&&j.width(l.offsetWidth)):d?j.width(l.offsetWidth):o&&j.width(o);Fb(a,j[0]);if(f){for(n=g=0;n<e.length;n++)m=c[e[n]],d=h(i[n]).outerWidth(),g+=null===m.sWidthOrig?d:parseInt(m.sWidth,
10)+d-h(i[n]).width();j.width(s(g));b.style.width=s(g)}for(n=0;n<e.length;n++)if(m=c[e[n]],d=h(i[n]).width())m.sWidth=s(d);b.style.width=s(j.css("width"));j.remove()}o&&(b.style.width=s(o));if((o||f)&&!a._reszEvt)b=function(){h(Ea).bind("resize.DT-"+a.sInstance,ua(function(){X(a)}))},a.oBrowser.bScrollOversize?setTimeout(b,1E3):b(),a._reszEvt=!0}function ua(a,b){var c=b!==k?b:200,e,d;return function(){var b=this,g=+new Date,j=arguments;e&&g<e+c?(clearTimeout(d),d=setTimeout(function(){e=k;a.apply(b,
j)},c)):(e=g,a.apply(b,j))}}function Db(a,b){if(!a)return 0;var c=h("<div/>").css("width",s(a)).appendTo(b||Q.body),e=c[0].offsetWidth;c.remove();return e}function Fb(a,b){var c=a.oScroll;if(c.sX||c.sY)c=!c.sX?c.iBarWidth:0,b.style.width=s(h(b).outerWidth()-c)}function Eb(a,b){var c=Gb(a,b);if(0>c)return null;var e=a.aoData[c];return!e.nTr?h("<td/>").html(x(a,c,b,"display"))[0]:e.anCells[b]}function Gb(a,b){for(var c,e=-1,d=-1,f=0,g=a.aoData.length;f<g;f++)c=x(a,f,b,"display")+"",c=c.replace($b,""),
c.length>e&&(e=c.length,d=f);return d}function s(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function Hb(){var a=m.__scrollbarWidth;if(a===k){var b=h("<p/>").css({position:"absolute",top:0,left:0,width:"100%",height:150,padding:0,overflow:"scroll",visibility:"hidden"}).appendTo("body"),a=b[0].offsetWidth-b[0].clientWidth;m.__scrollbarWidth=a;b.remove()}return a}function U(a){var b,c,e=[],d=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var o=[];
f=function(a){a.length&&!h.isArray(a[0])?o.push(a):o.push.apply(o,a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<o.length;a++){i=o[a][0];f=d[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=d[g].sType||"string",o[a]._idx===k&&(o[a]._idx=h.inArray(o[a][1],d[g].asSorting)),e.push({src:i,col:g,dir:o[a][1],index:o[a]._idx,type:j,formatter:m.ext.type.order[j+"-pre"]})}return e}function lb(a){var b,c,e=[],d=m.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;
Ha(a);h=U(a);b=0;for(c=h.length;b<c;b++)j=h[b],j.formatter&&g++,Ib(a,j.col);if("ssp"!=B(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)e[i[b]]=b;g===h.length?i.sort(function(a,b){var c,d,g,j,i=h.length,k=f[a]._aSortData,m=f[b]._aSortData;for(g=0;g<i;g++)if(j=h[g],c=k[j.col],d=m[j.col],c=c<d?-1:c>d?1:0,0!==c)return"asc"===j.dir?c:-c;c=e[a];d=e[b];return c<d?-1:c>d?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,m=f[a]._aSortData,r=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=m[i.col],g=r[i.col],i=d[i.type+
"-"+i.dir]||d["string-"+i.dir],c=i(c,g),0!==c)return c;c=e[a];g=e[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Jb(a){for(var b,c,e=a.aoColumns,d=U(a),a=a.oLanguage.oAria,f=0,g=e.length;f<g;f++){c=e[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<d.length&&d[0].col==f?(i.setAttribute("aria-sort","asc"==d[0].dir?"ascending":"descending"),c=j[d[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",
b)}}function Ua(a,b,c,e){var d=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof d[0]&&(d=a.aaSorting=[d]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,D(d,"0")),-1!==c?(b=g(d[c],!0),null===b&&1===d.length&&(b=0),null===b?d.splice(c,1):(d[c][1]=f[b],d[c]._idx=b)):(d.push([b,f[0],0]),d[d.length-1]._idx=0)):d.length&&d[0][0]==b?(b=g(d[0]),d.length=1,d[0][1]=f[b],d[0]._idx=b):(d.length=0,d.push([b,f[0]]),d[0]._idx=
0);N(a);"function"==typeof e&&e(a)}function Oa(a,b,c,e){var d=a.aoColumns[c];Va(b,{},function(b){!1!==d.bSortable&&(a.oFeatures.bProcessing?(C(a,!0),setTimeout(function(){Ua(a,c,b.shiftKey,e);"ssp"!==B(a)&&C(a,!1)},0)):Ua(a,c,b.shiftKey,e))})}function xa(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,e=U(a),d=a.oFeatures,f,g;if(d.bSort&&d.bSortClasses){d=0;for(f=b.length;d<f;d++)g=b[d].src,h(D(a.aoData,"anCells",g)).removeClass(c+(2>d?d+1:3));d=0;for(f=e.length;d<f;d++)g=e[d].src,h(D(a.aoData,"anCells",
g)).addClass(c+(2>d?d+1:3))}a.aLastSort=e}function Ib(a,b){var c=a.aoColumns[b],e=m.ext.order[c.sSortDataType],d;e&&(d=e.call(a.oInstance,a,b,$(a,b)));for(var f,g=m.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],c._aSortData||(c._aSortData=[]),!c._aSortData[b]||e)f=e?d[j]:x(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function ya(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),
search:zb(a.oPreviousSearch),columns:h.map(a.aoColumns,function(b,e){return{visible:b.bVisible,search:zb(a.aoPreSearchCols[e])}})};w(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,b)}}function Kb(a){var b,c,e=a.aoColumns;if(a.oFeatures.bStateSave){var d=a.fnStateLoadCallback.call(a.oInstance,a);if(d&&d.time&&(b=w(a,"aoStateLoadParams","stateLoadParams",[a,d]),-1===h.inArray(!1,b)&&(b=a.iStateDuration,!(0<b&&d.time<+new Date-1E3*b)&&e.length===
d.columns.length))){a.oLoadedState=h.extend(!0,{},d);d.start!==k&&(a._iDisplayStart=d.start,a.iInitDisplayStart=d.start);d.length!==k&&(a._iDisplayLength=d.length);d.order!==k&&(a.aaSorting=[],h.each(d.order,function(b,c){a.aaSorting.push(c[0]>=e.length?[0,c[1]]:c)}));d.search!==k&&h.extend(a.oPreviousSearch,Ab(d.search));b=0;for(c=d.columns.length;b<c;b++){var f=d.columns[b];f.visible!==k&&(e[b].bVisible=f.visible);f.search!==k&&h.extend(a.aoPreSearchCols[b],Ab(f.search))}w(a,"aoStateLoaded","stateLoaded",
[a,d])}}}function za(a){var b=m.settings,a=h.inArray(a,D(b,"nTable"));return-1!==a?b[a]:null}function I(a,b,c,e){c="DataTables warning: "+(null!==a?"table id="+a.sTableId+" - ":"")+c;e&&(c+=". For more information about this error, please see http://datatables.net/tn/"+e);if(b)Ea.console&&console.log&&console.log(c);else if(b=m.ext,b=b.sErrMode||b.errMode,w(a,null,"error",[a,e,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==typeof b&&b(a,e,c)}}function E(a,b,c,e){h.isArray(c)?
h.each(c,function(c,f){h.isArray(f)?E(a,b,f[0],f[1]):E(a,b,f)}):(e===k&&(e=c),b[c]!==k&&(a[e]=b[c]))}function Lb(a,b,c){var e,d;for(d in b)b.hasOwnProperty(d)&&(e=b[d],h.isPlainObject(e)?(h.isPlainObject(a[d])||(a[d]={}),h.extend(!0,a[d],e)):a[d]=c&&"data"!==d&&"aaData"!==d&&h.isArray(e)?e.slice():e);return a}function Va(a,b,c){h(a).bind("click.DT",b,function(b){a.blur();c(b)}).bind("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).bind("selectstart.DT",function(){return!1})}function z(a,
b,c,e){c&&a[b].push({fn:c,sName:e})}function w(a,b,c,e){var d=[];b&&(d=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,e)}));null!==c&&(b=h.Event(c+".dt"),h(a.nTable).trigger(b,e),d.push(b.result));return d}function Sa(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),e=a._iDisplayLength;b>=c&&(b=c-e);b-=b%e;if(-1===e||0>b)b=0;a._iDisplayStart=b}function Pa(a,b){var c=a.renderer,e=m.ext.renderer[b];return h.isPlainObject(c)&&c[b]?e[c[b]]||e._:"string"===typeof c?e[c]||e._:e._}function B(a){return a.oFeatures.bServerSide?
"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function Wa(a,b){var c=[],c=Mb.numbers_length,e=Math.floor(c/2);b<=c?c=V(0,b):a<=e?(c=V(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-e?c=V(b-(c-2),b):(c=V(a-e+2,a+e-1),c.push("ellipsis"),c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function db(a){h.each({num:function(b){return Aa(b,a)},"num-fmt":function(b){return Aa(b,a,Xa)},"html-num":function(b){return Aa(b,a,Ba)},"html-num-fmt":function(b){return Aa(b,a,Ba,Xa)}},function(b,
c){u.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(u.type.search[b+a]=u.type.search.html)})}function Nb(a){return function(){var b=[za(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return m.ext.internal[a].apply(this,b)}}var m,u,t,r,v,Ya={},Ob=/[\r\n]/g,Ba=/<.*?>/g,ac=/^[\w\+\-]/,bc=/[\w\+\-]$/,Yb=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Xa=/[',$\u00a3\u20ac\u00a5%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,J=function(a){return!a||!0===a||
"-"===a?!0:!1},Pb=function(a){var b=parseInt(a,10);return!isNaN(b)&&isFinite(a)?b:null},Qb=function(a,b){Ya[b]||(Ya[b]=RegExp(va(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,"").replace(Ya[b],"."):a},Za=function(a,b,c){var e="string"===typeof a;if(J(a))return!0;b&&e&&(a=Qb(a,b));c&&e&&(a=a.replace(Xa,""));return!isNaN(parseFloat(a))&&isFinite(a)},Rb=function(a,b,c){return J(a)?!0:!(J(a)||"string"===typeof a)?null:Za(a.replace(Ba,""),b,c)?!0:null},D=function(a,b,c){var e=[],d=0,f=a.length;
if(c!==k)for(;d<f;d++)a[d]&&a[d][b]&&e.push(a[d][b][c]);else for(;d<f;d++)a[d]&&e.push(a[d][b]);return e},ia=function(a,b,c,e){var d=[],f=0,g=b.length;if(e!==k)for(;f<g;f++)a[b[f]][c]&&d.push(a[b[f]][c][e]);else for(;f<g;f++)d.push(a[b[f]][c]);return d},V=function(a,b){var c=[],e;b===k?(b=0,e=a):(e=b,b=a);for(var d=b;d<e;d++)c.push(d);return c},Sb=function(a){for(var b=[],c=0,e=a.length;c<e;c++)a[c]&&b.push(a[c]);return b},Na=function(a){var b=[],c,e,d=a.length,f,g=0;e=0;a:for(;e<d;e++){c=a[e];for(f=
0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b},A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},ba=/\[.*?\]$/,T=/\(\)$/,wa=h("<div>")[0],Zb=wa.textContent!==k,$b=/<.*?>/g;m=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new t(za(this[u.iApiIndex])):new t(this)};this.fnAddData=function(a,b){var c=this.api(!0),e=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===
k||b)&&c.draw();return e.flatten().toArray()};this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],e=c.oScroll;a===k||a?b.draw(!1):(""!==e.sX||""!==e.sY)&&Y(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,b,c){var e=this.api(!0),a=e.rows(a),d=a.settings()[0],h=d.aoData[a[0][0]];a.remove();b&&b.call(this,d,h);(c===k||c)&&e.draw();return h};
this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};this.fnFilter=function(a,b,c,e,d,h){d=this.api(!0);null===b||b===k?d.search(a,c,e,h):d.column(b).search(a,c,e,h);d.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var e=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==e||"th"==e?c.cell(a,b).data():c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};
this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===
k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return za(this[u.iApiIndex])};this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,e,d){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(d===k||d)&&h.columns.adjust();(e===k||e)&&h.draw();return 0};this.fnVersionCheck=u.fnVersionCheck;var b=this,c=a===k,e=this.length;c&&(a={});this.oApi=this.internal=u.internal;for(var d in m.ext.internal)d&&
(this[d]=Nb(d));this.each(function(){var d={},d=1<e?Lb(d,a,!0):a,g=0,j,i=this.getAttribute("id"),o=!1,l=m.defaults,q=h(this);if("table"!=this.nodeName.toLowerCase())I(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{eb(l);fb(l.column);H(l,l,!0);H(l.column,l.column,!0);H(l,h.extend(d,q.data()));var n=m.settings,g=0;for(j=n.length;g<j;g++){var r=n[g];if(r.nTable==this||r.nTHead.parentNode==this||r.nTFoot&&r.nTFoot.parentNode==this){g=d.bRetrieve!==k?d.bRetrieve:l.bRetrieve;if(c||g)return r.oInstance;
if(d.bDestroy!==k?d.bDestroy:l.bDestroy){r.oInstance.fnDestroy();break}else{I(r,0,"Cannot reinitialise DataTable",3);return}}if(r.sTableId==this.id){n.splice(g,1);break}}if(null===i||""===i)this.id=i="DataTables_Table_"+m.ext._unique++;var p=h.extend(!0,{},m.models.oSettings,{sDestroyWidth:q[0].style.width,sInstance:i,sTableId:i});p.nTable=this;p.oApi=b.internal;p.oInit=d;n.push(p);p.oInstance=1===b.length?b:q.dataTable();eb(d);d.oLanguage&&P(d.oLanguage);d.aLengthMenu&&!d.iDisplayLength&&(d.iDisplayLength=
h.isArray(d.aLengthMenu[0])?d.aLengthMenu[0][0]:d.aLengthMenu[0]);d=Lb(h.extend(!0,{},l),d);E(p.oFeatures,d,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));E(p,d,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback",
"renderer","searchDelay",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"],["bJQueryUI","bJUI"]]);E(p.oScroll,d,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);E(p.oLanguage,d,"fnInfoCallback");z(p,"aoDrawCallback",d.fnDrawCallback,"user");z(p,"aoServerParams",d.fnServerParams,"user");z(p,"aoStateSaveParams",d.fnStateSaveParams,"user");z(p,"aoStateLoadParams",
d.fnStateLoadParams,"user");z(p,"aoStateLoaded",d.fnStateLoaded,"user");z(p,"aoRowCallback",d.fnRowCallback,"user");z(p,"aoRowCreatedCallback",d.fnCreatedRow,"user");z(p,"aoHeaderCallback",d.fnHeaderCallback,"user");z(p,"aoFooterCallback",d.fnFooterCallback,"user");z(p,"aoInitComplete",d.fnInitComplete,"user");z(p,"aoPreDrawCallback",d.fnPreDrawCallback,"user");i=p.oClasses;d.bJQueryUI?(h.extend(i,m.ext.oJUIClasses,d.oClasses),d.sDom===l.sDom&&"lfrtip"===l.sDom&&(p.sDom='<"H"lfr>t<"F"ip>'),p.renderer)?
h.isPlainObject(p.renderer)&&!p.renderer.header&&(p.renderer.header="jqueryui"):p.renderer="jqueryui":h.extend(i,m.ext.classes,d.oClasses);q.addClass(i.sTable);if(""!==p.oScroll.sX||""!==p.oScroll.sY)p.oScroll.iBarWidth=Hb();!0===p.oScroll.sX&&(p.oScroll.sX="100%");p.iInitDisplayStart===k&&(p.iInitDisplayStart=d.iDisplayStart,p._iDisplayStart=d.iDisplayStart);null!==d.iDeferLoading&&(p.bDeferLoading=!0,g=h.isArray(d.iDeferLoading),p._iRecordsDisplay=g?d.iDeferLoading[0]:d.iDeferLoading,p._iRecordsTotal=
g?d.iDeferLoading[1]:d.iDeferLoading);var t=p.oLanguage;h.extend(!0,t,d.oLanguage);""!==t.sUrl&&(h.ajax({dataType:"json",url:t.sUrl,success:function(a){P(a);H(l.oLanguage,a);h.extend(true,t,a);ga(p)},error:function(){ga(p)}}),o=!0);null===d.asStripeClasses&&(p.asStripeClasses=[i.sStripeOdd,i.sStripeEven]);var g=p.asStripeClasses,s=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(g,function(a){return s.hasClass(a)}))&&(h("tbody tr",this).removeClass(g.join(" ")),p.asDestroyStripes=g.slice());
n=[];g=this.getElementsByTagName("thead");0!==g.length&&(da(p.aoHeader,g[0]),n=qa(p));if(null===d.aoColumns){r=[];g=0;for(j=n.length;g<j;g++)r.push(null)}else r=d.aoColumns;g=0;for(j=r.length;g<j;g++)Fa(p,n?n[g]:null);ib(p,d.aoColumnDefs,r,function(a,b){ka(p,a,b)});if(s.length){var u=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h.each(na(p,s[0]).cells,function(a,b){var c=p.aoColumns[a];if(c.mData===a){var d=u(b,"sort")||u(b,"order"),e=u(b,"filter")||u(b,"search");if(d!==null||e!==
null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};ka(p,a)}}})}var v=p.oFeatures;d.bStateSave&&(v.bStateSave=!0,Kb(p,d),z(p,"aoDrawCallback",ya,"state_save"));if(d.aaSorting===k){n=p.aaSorting;g=0;for(j=n.length;g<j;g++)n[g][1]=p.aoColumns[g].asSorting[0]}xa(p);v.bSort&&z(p,"aoDrawCallback",function(){if(p.bSorted){var a=U(p),b={};h.each(a,function(a,c){b[c.src]=c.dir});w(p,null,"order",[p,a,b]);Jb(p)}});z(p,"aoDrawCallback",
function(){(p.bSorted||B(p)==="ssp"||v.bDeferRender)&&xa(p)},"sc");gb(p);g=q.children("caption").each(function(){this._captionSide=q.css("caption-side")});j=q.children("thead");0===j.length&&(j=h("<thead/>").appendTo(this));p.nTHead=j[0];j=q.children("tbody");0===j.length&&(j=h("<tbody/>").appendTo(this));p.nTBody=j[0];j=q.children("tfoot");if(0===j.length&&0<g.length&&(""!==p.oScroll.sX||""!==p.oScroll.sY))j=h("<tfoot/>").appendTo(this);0===j.length||0===j.children().length?q.addClass(i.sNoFooter):
0<j.length&&(p.nTFoot=j[0],da(p.aoFooter,p.nTFoot));if(d.aaData)for(g=0;g<d.aaData.length;g++)K(p,d.aaData[g]);else(p.bDeferLoading||"dom"==B(p))&&ma(p,h(p.nTBody).children("tr"));p.aiDisplay=p.aiDisplayMaster.slice();p.bInitialised=!0;!1===o&&ga(p)}});b=null;return this};var Tb=[],y=Array.prototype,cc=function(a){var b,c,e=m.settings,d=h.map(e,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,d),-1!==b?[e[b]]:
null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,d);return-1!==b?e[b]:null}).toArray()};t=function(a,b){if(!(this instanceof t))return new t(a,b);var c=[],e=function(a){(a=cc(a))&&c.push.apply(c,a)};if(h.isArray(a))for(var d=0,f=a.length;d<f;d++)e(a[d]);else e(a);this.context=Na(c);b&&this.push.apply(this,b.toArray?b.toArray():b);this.selector={rows:null,cols:null,opts:null};
t.extend(this,this,Tb)};m.Api=t;t.prototype={any:function(){return 0!==this.flatten().length},concat:y.concat,context:[],each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=this.context;return b.length>a?new t(b[a],this[a]):null},filter:function(a){var b=[];if(y.filter)b=y.filter.call(this,a,this);else for(var c=0,e=this.length;c<e;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new t(this.context,b)},flatten:function(){var a=[];
return new t(this.context,a.concat.apply(a,this.toArray()))},join:y.join,indexOf:y.indexOf||function(a,b){for(var c=b||0,e=this.length;c<e;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,e){var d=[],f,g,h,i,o,l=this.context,q,n,m=this.selector;"string"===typeof a&&(e=c,c=b,b=a,a=!1);g=0;for(h=l.length;g<h;g++){var p=new t(l[g]);if("table"===b)f=c.call(p,l[g],g),f!==k&&d.push(f);else if("columns"===b||"rows"===b)f=c.call(p,l[g],this[g],g),f!==k&&d.push(f);else if("column"===b||"column-rows"===
b||"row"===b||"cell"===b){n=this[g];"column-rows"===b&&(q=Ca(l[g],m.opts));i=0;for(o=n.length;i<o;i++)f=n[i],f="cell"===b?c.call(p,l[g],f.row,f.column,g,i):c.call(p,l[g],f,g,i,q),f!==k&&d.push(f)}}return d.length||e?(a=new t(l,a?d.concat.apply([],d):d),b=a.selector,b.rows=m.rows,b.cols=m.cols,b.opts=m.opts,a):this},lastIndexOf:y.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(y.map)b=y.map.call(this,a,this);else for(var c=
0,e=this.length;c<e;c++)b.push(a.call(this,this[c],c));return new t(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:y.pop,push:y.push,reduce:y.reduce||function(a,b){return hb(this,a,b,0,this.length,1)},reduceRight:y.reduceRight||function(a,b){return hb(this,a,b,this.length-1,-1,-1)},reverse:y.reverse,selector:null,shift:y.shift,sort:y.sort,splice:y.splice,toArray:function(){return y.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},
unique:function(){return new t(this.context,Na(this))},unshift:y.unshift};t.extend=function(a,b,c){if(c.length&&b&&(b instanceof t||b.__dt_wrapper)){var e,d,f,g=function(a,b,c){return function(){var d=b.apply(a,arguments);t.extend(d,d,c.methodExt);return d}};e=0;for(d=c.length;e<d;e++)f=c[e],b[f.name]="function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,t.extend(a,b[f.name],f.propExt)}};t.register=r=function(a,b){if(h.isArray(a))for(var c=0,e=a.length;c<
e;c++)t.register(a[c],b);else for(var d=a.split("."),f=Tb,g,j,c=0,e=d.length;c<e;c++){g=(j=-1!==d[c].indexOf("()"))?d[c].replace("()",""):d[c];var i;a:{i=0;for(var o=f.length;i<o;i++)if(f[i].name===g){i=f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===e-1?i.val=b:f=j?i.methodExt:i.propExt}};t.registerPlural=v=function(a,b,c){t.register(a,c);t.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof t?a.length?h.isArray(a[0])?new t(a.context,
a[0]):a[0]:k:a})};r("tables()",function(a){var b;if(a){b=t;var c=this.context;if("number"===typeof a)a=[c[a]];else var e=h.map(c,function(a){return a.nTable}),a=h(e).filter(a).map(function(){var a=h.inArray(this,e);return c[a]}).toArray();b=new b(a)}else b=this;return b});r("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new t(b[0]):a});v("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});v("tables().body()","table().body()",
function(){return this.iterator("table",function(a){return a.nTBody},1)});v("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});v("tables().footer()","table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)});v("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});r("draw()",function(a){return this.iterator("table",function(b){N(b,
!1===a)})});r("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Ta(b,a)})});r("page.info()",function(){if(0===this.context.length)return k;var a=this.context[0],b=a._iDisplayStart,c=a._iDisplayLength,e=a.fnRecordsDisplay(),d=-1===c;return{page:d?0:Math.floor(b/c),pages:d?1:Math.ceil(e/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:e}});r("page.len()",function(a){return a===k?0!==this.context.length?this.context[0]._iDisplayLength:
k:this.iterator("table",function(b){Ra(b,a)})});var Ub=function(a,b,c){if(c){var e=new t(a);e.one("draw",function(){c(e.ajax.json())})}"ssp"==B(a)?N(a,b):(C(a,!0),ra(a,[],function(c){oa(a);for(var c=sa(a,c),e=0,g=c.length;e<g;e++)K(a,c[e]);N(a,b);C(a,!1)}))};r("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});r("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});r("ajax.reload()",function(a,b){return this.iterator("table",function(c){Ub(c,
!1===b,a)})});r("ajax.url()",function(a){var b=this.context;if(a===k){if(0===b.length)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});r("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Ub(c,!1===b,a)})});var $a=function(a,b,c,e,d){var f=[],g,j,i,o,l,q;i=typeof b;if(!b||"string"===i||"function"===i||b.length===k)b=[b];i=0;for(o=b.length;i<o;i++){j=
b[i]&&b[i].split?b[i].split(","):[b[i]];l=0;for(q=j.length;l<q;l++)(g=c("string"===typeof j[l]?h.trim(j[l]):j[l]))&&g.length&&f.push.apply(f,g)}a=u.selector[a];if(a.length){i=0;for(o=a.length;i<o;i++)f=a[i](e,d,f)}return f},ab=function(a){a||(a={});a.filter&&a.search===k&&(a.search=a.filter);return h.extend({search:"none",order:"current",page:"all"},a)},bb=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=a[b],a[0].length=1,a.length=1,a.context=[a.context[b]],a;a.length=0;return a},
Ca=function(a,b){var c,e,d,f=[],g=a.aiDisplay;c=a.aiDisplayMaster;var j=b.search;e=b.order;d=b.page;if("ssp"==B(a))return"removed"===j?[]:V(0,c.length);if("current"==d){c=a._iDisplayStart;for(e=a.fnDisplayEnd();c<e;c++)f.push(g[c])}else if("current"==e||"applied"==e)f="none"==j?c.slice():"applied"==j?g.slice():h.map(c,function(a){return-1===h.inArray(a,g)?a:null});else if("index"==e||"original"==e){c=0;for(e=a.aoData.length;c<e;c++)"none"==j?f.push(c):(d=h.inArray(c,g),(-1===d&&"removed"==j||0<=d&&
"applied"==j)&&f.push(c))}return f};r("rows()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=ab(b),c=this.iterator("table",function(c){var d=b;return $a("row",a,function(a){var b=Pb(a);if(b!==null&&!d)return[b];var j=Ca(c,d);if(b!==null&&h.inArray(b,j)!==-1)return[b];if(!a)return j;if(typeof a==="function")return h.map(j,function(b){var d=c.aoData[b];return a(b,d._aData,d.nTr)?b:null});b=Sb(ia(c.aoData,j,"nTr"));return a.nodeName&&h.inArray(a,b)!==-1?[a._DT_RowIndex]:h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},
c,d)},1);c.selector.rows=a;c.selector.opts=b;return c});r("rows().nodes()",function(){return this.iterator("row",function(a,b){return a.aoData[b].nTr||k},1)});r("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return ia(a.aoData,b,"_aData")},1)});v("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var e=b.aoData[c];return"search"===a?e._aFilterData:e._aSortData},1)});v("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",
function(b,c){ca(b,c,a)})});v("rows().indexes()","row().index()",function(){return this.iterator("row",function(a,b){return b},1)});v("rows().remove()","row().remove()",function(){var a=this;return this.iterator("row",function(b,c,e){var d=b.aoData;d.splice(c,1);for(var f=0,g=d.length;f<g;f++)null!==d[f].nTr&&(d[f].nTr._DT_RowIndex=f);h.inArray(c,b.aiDisplay);pa(b.aiDisplayMaster,c);pa(b.aiDisplay,c);pa(a[e],c,!1);Sa(b)})});r("rows.add()",function(a){var b=this.iterator("table",function(b){var c,
f,g,h=[];f=0;for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(ma(b,c)[0]):h.push(K(b,c));return h},1),c=this.rows(-1);c.pop();c.push.apply(c,b.toArray());return c});r("row()",function(a,b){return bb(this.rows(a,b))});r("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:k;b[0].aoData[this[0]]._aData=a;ca(b[0],this[0],"data");return this});r("row().node()",function(){var a=this.context;return a.length&&this.length?
a[0].aoData[this[0]].nTr||null:null});r("row.add()",function(a){a instanceof h&&a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?ma(b,a)[0]:K(b,a)});return this.row(b[0])});var cb=function(a,b){var c=a.context;c.length&&(c=c[0].aoData[b!==k?b:a[0]],c._details&&(c._details.remove(),c._detailsShow=k,c._details=k))},Vb=function(a,b){var c=a.context;if(c.length&&a.length){var e=c[0].aoData[a[0]];if(e._details){(e._detailsShow=b)?e._details.insertAfter(e.nTr):
e._details.detach();var d=c[0],f=new t(d),g=d.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");0<D(g,"_details").length&&(f.on("draw.dt.DT_details",function(a,b){d===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",function(a,b){if(d===b)for(var c,e=aa(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",e)}),f.on("destroy.dt.DT_details",
function(a,b){if(d===b)for(var c=0,e=g.length;c<e;c++)g[c]._details&&cb(f,c)}))}}};r("row().child()",function(a,b){var c=this.context;if(a===k)return c.length&&this.length?c[0].aoData[this[0]]._details:k;if(!0===a)this.child.show();else if(!1===a)cb(this);else if(c.length&&this.length){var e=c[0],c=c[0].aoData[this[0]],d=[],f=function(a,b){if(h.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else a.nodeName&&"tr"===a.nodeName.toLowerCase()?d.push(a):(c=h("<tr><td/></tr>").addClass(b),
h("td",c).addClass(b).html(a)[0].colSpan=aa(e),d.push(c[0]))};f(a,b);c._details&&c._details.remove();c._details=h(d);c._detailsShow&&c._details.insertAfter(c.nTr)}return this});r(["row().child.show()","row().child().show()"],function(){Vb(this,!0);return this});r(["row().child.hide()","row().child().hide()"],function(){Vb(this,!1);return this});r(["row().child.remove()","row().child().remove()"],function(){cb(this);return this});r("row().child.isShown()",function(){var a=this.context;return a.length&&
this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var dc=/^(.+):(name|visIdx|visible)$/,Wb=function(a,b,c,e,d){for(var c=[],e=0,f=d.length;e<f;e++)c.push(x(a,d[e],b));return c};r("columns()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=ab(b),c=this.iterator("table",function(c){var d=a,f=b,g=c.aoColumns,j=D(g,"sName"),i=D(g,"nTh");return $a("column",d,function(a){var b=Pb(a);if(a==="")return V(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var d=Ca(c,
f);return h.map(g,function(b,f){return a(f,Wb(c,f,0,0,d),i[f])?f:null})}var k=typeof a==="string"?a.match(dc):"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],10);if(b<0){var m=h.map(g,function(a,b){return a.bVisible?b:null});return[m[m.length+b]]}return[la(c,b)];case "name":return h.map(j,function(a,b){return a===k[1]?b:null})}else return h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray()},c,f)},1);c.selector.cols=a;c.selector.opts=b;return c});v("columns().header()",
"column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});v("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});v("columns().data()","column().data()",function(){return this.iterator("column-rows",Wb,1)});v("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},1)});v("columns().cache()","column().cache()",
function(a){return this.iterator("column-rows",function(b,c,e,d,f){return ia(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)});v("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,e,d){return ia(a.aoData,d,"anCells",b)},1)});v("columns().visible()","column().visible()",function(a,b){return this.iterator("column",function(c,e){if(a===k)return c.aoColumns[e].bVisible;var d=c.aoColumns,f=d[e],g=c.aoData,j,i,m;if(a!==k&&f.bVisible!==a){if(a){var l=
h.inArray(!0,D(d,"bVisible"),e+1);j=0;for(i=g.length;j<i;j++)m=g[j].nTr,d=g[j].anCells,m&&m.insertBefore(d[e],d[l]||null)}else h(D(c.aoData,"anCells",e)).detach();f.bVisible=a;ea(c,c.aoHeader);ea(c,c.aoFooter);if(b===k||b)X(c),(c.oScroll.sX||c.oScroll.sY)&&Y(c);w(c,null,"column-visibility",[c,e,a]);ya(c)}})});v("columns().indexes()","column().index()",function(a){return this.iterator("column",function(b,c){return"visible"===a?$(b,c):c},1)});r("columns.adjust()",function(){return this.iterator("table",
function(a){X(a)},1)});r("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return la(c,b);if("fromData"===a||"toVisible"===a)return $(c,b)}});r("column()",function(a,b){return bb(this.columns(a,b))});r("cells()",function(a,b,c){h.isPlainObject(a)&&(a.row===k?(c=a,a=null):(c=b,b=null));h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===k)return this.iterator("table",function(b){var d=a,e=ab(c),f=b.aoData,g=Ca(b,e),i=Sb(ia(f,g,"anCells")),
j=h([].concat.apply([],i)),l,m=b.aoColumns.length,o,r,t,s,u,v;return $a("cell",d,function(a){var c=typeof a==="function";if(a===null||a===k||c){o=[];r=0;for(t=g.length;r<t;r++){l=g[r];for(s=0;s<m;s++){u={row:l,column:s};if(c){v=b.aoData[l];a(u,x(b,l,s),v.anCells?v.anCells[s]:null)&&o.push(u)}else o.push(u)}}return o}return h.isPlainObject(a)?[a]:j.filter(a).map(function(a,b){l=b.parentNode._DT_RowIndex;return{row:l,column:h.inArray(b,f[l].anCells)}}).toArray()},b,e)});var e=this.columns(b,c),d=this.rows(a,
c),f,g,j,i,m,l=this.iterator("table",function(a,b){f=[];g=0;for(j=d[b].length;g<j;g++){i=0;for(m=e[b].length;i<m;i++)f.push({row:d[b][g],column:e[b][i]})}return f},1);h.extend(l.selector,{cols:b,rows:a,opts:c});return l});v("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b].anCells)?a[c]:k},1)});r("cells().data()",function(){return this.iterator("cell",function(a,b,c){return x(a,b,c)},1)});v("cells().cache()","cell().cache()",function(a){a=
"search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,e){return b.aoData[c][a][e]},1)});v("cells().render()","cell().render()",function(a){return this.iterator("cell",function(b,c,e){return x(b,c,e,a)},1)});v("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:$(a,c)}},1)});v("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,e){ca(b,c,a,e)})});r("cell()",
function(a,b,c){return bb(this.cells(a,b,c))});r("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?x(b[0],c[0].row,c[0].column):k;Ia(b[0],c[0].row,c[0].column,a);ca(b[0],c[0].row,"data",c[0].column);return this});r("order()",function(a,b){var c=this.context;if(a===k)return 0!==c.length?c[0].aaSorting:k;"number"===typeof a?a=[[a,b]]:h.isArray(a[0])||(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});
r("order.listener()",function(a,b,c){return this.iterator("table",function(e){Oa(e,a,b,c)})});r(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,e){var d=[];h.each(b[e],function(b,c){d.push([c,a])});c.aaSorting=d})});r("search()",function(a,b,c,e){var d=this.context;return a===k?0!==d.length?d[0].oPreviousSearch.sSearch:k:this.iterator("table",function(d){d.oFeatures.bFilter&&fa(d,h.extend({},d.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:
b,bSmart:null===c?!0:c,bCaseInsensitive:null===e?!0:e}),1)})});v("columns().search()","column().search()",function(a,b,c,e){return this.iterator("column",function(d,f){var g=d.aoPreSearchCols;if(a===k)return g[f].sSearch;d.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===e?!0:e}),fa(d,d.oPreviousSearch,1))})});r("state()",function(){return this.context.length?this.context[0].oSavedState:null});r("state.clear()",function(){return this.iterator("table",
function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});r("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});r("state.save()",function(){return this.iterator("table",function(a){ya(a)})});m.versionCheck=m.fnVersionCheck=function(a){for(var b=m.version.split("."),a=a.split("."),c,e,d=0,f=a.length;d<f;d++)if(c=parseInt(b[d],10)||0,e=parseInt(a[d],10)||0,c!==e)return c>e;return!0};m.isDataTable=m.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;h.each(m.settings,
function(a,d){var f=d.nScrollHead?h("table",d.nScrollHead)[0]:null,g=d.nScrollFoot?h("table",d.nScrollFoot)[0]:null;if(d.nTable===b||f===b||g===b)c=!0});return c};m.tables=m.fnTables=function(a){return h.map(m.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable})};m.util={throttle:ua,escapeRegex:va};m.camelToHungarian=H;r("$()",function(a,b){var c=this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,
b){r(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0].match(/\.dt\b/)||(a[0]+=".dt");var e=h(this.tables().nodes());e[b].apply(e,a);return this})});r("clear()",function(){return this.iterator("table",function(a){oa(a)})});r("settings()",function(){return new t(this.context,this.context)});r("init()",function(){var a=this.context;return a.length?a[0].oInit:null});r("data()",function(){return this.iterator("table",function(a){return D(a.aoData,"_aData")}).flatten()});r("destroy()",
function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,e=b.oClasses,d=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(d),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),q;b.bDestroying=!0;w(b,"aoDestroyCallback","destroy",[b]);a||(new t(b)).columns().visible(!0);k.unbind(".DT").find(":not(tbody *)").unbind(".DT");h(Ea).unbind(".DT-"+b.sInstance);d!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&d!=j.parentNode&&(i.children("tfoot").detach(),
i.append(j));i.detach();k.detach();b.aaSorting=[];b.aaSortingFixed=[];xa(b);h(l).removeClass(b.asStripeClasses.join(" "));h("th, td",g).removeClass(e.sSortable+" "+e.sSortableAsc+" "+e.sSortableDesc+" "+e.sSortableNone);b.bJUI&&(h("th span."+e.sSortIcon+", td span."+e.sSortIcon,g).detach(),h("th, td",g).each(function(){var a=h("div."+e.sSortJUIWrapper,this);h(this).append(a.contents());a.detach()}));!a&&c&&c.insertBefore(d,b.nTableReinsertBefore);f.children().detach();f.append(l);i.css("width",b.sDestroyWidth).removeClass(e.sTable);
(q=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%q])});c=h.inArray(b,m.settings);-1!==c&&m.settings.splice(c,1)})});h.each(["column","row","cell"],function(a,b){r(b+"s().every()",function(a){return this.iterator(b,function(e,d,f){a.call((new t(e))[b](d,f))})})});r("i18n()",function(a,b,c){var e=this.context[0],a=R(a)(e.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:a._);return a.replace("%d",c)});m.version="1.10.7";m.settings=
[];m.models={};m.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0};m.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null};m.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",
sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};m.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bJQueryUI:!1,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,
fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,
fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},
sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},m.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,
sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null};W(m.defaults);m.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};W(m.defaults.column);m.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,
bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],
sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,
bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==B(this)?1*this._iRecordsTotal:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==B(this)?1*this._iRecordsDisplay:
this.aiDisplay.length},fnDisplayEnd:function(){var a=this._iDisplayLength,b=this._iDisplayStart,c=b+a,e=this.aiDisplay.length,d=this.oFeatures,f=d.bPaginate;return d.bServerSide?!1===f||-1===a?b+e:Math.min(b+a,this._iRecordsDisplay):!f||c>e||-1===a?e:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{}};m.ext=u={buttons:{},classes:{},errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},
header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:m.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:m.version};h.extend(u,{afnFiltering:u.search,aTypes:u.type.detect,ofnSearch:u.type.search,oSort:u.type.order,afnSortData:u.order,aoFeatures:u.feature,oApi:u.internal,oStdClasses:u.classes,oPagination:u.pager});h.extend(m.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",
sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",
sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});var Da="",Da="",F=Da+"ui-state-default",ja=Da+"css_right ui-icon ui-icon-",Xb=Da+"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";h.extend(m.ext.oJUIClasses,
m.ext.classes,{sPageButton:"fg-button ui-button "+F,sPageButtonActive:"ui-state-disabled",sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:F+" sorting_asc",sSortDesc:F+" sorting_desc",sSortable:F+" sorting",sSortableAsc:F+" sorting_asc_disabled",sSortableDesc:F+" sorting_desc_disabled",sSortableNone:F+" sorting_disabled",sSortJUIAsc:ja+"triangle-1-n",sSortJUIDesc:ja+"triangle-1-s",sSortJUI:ja+"carat-2-n-s",
sSortJUIAscAllowed:ja+"carat-1-n",sSortJUIDescAllowed:ja+"carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead "+F,sScrollFoot:"dataTables_scrollFoot "+F,sHeaderTH:F,sFooterTH:F,sJUIHeader:Xb+" ui-corner-tl ui-corner-tr",sJUIFooter:Xb+" ui-corner-bl ui-corner-br"});var Mb=m.ext.pager;h.extend(Mb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},simple_numbers:function(a,b){return["previous",
Wa(a,b),"next"]},full_numbers:function(a,b){return["first","previous",Wa(a,b),"next","last"]},_numbers:Wa,numbers_length:7});h.extend(!0,m.ext.renderer,{pageButton:{_:function(a,b,c,e,d,f){var g=a.oClasses,j=a.oLanguage.oPaginate,i,k,l=0,m=function(b,e){var n,r,t,s,u=function(b){Ta(a,b.data.action,true)};n=0;for(r=e.length;n<r;n++){s=e[n];if(h.isArray(s)){t=h("<"+(s.DT_el||"div")+"/>").appendTo(b);m(t,s)}else{k=i="";switch(s){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;
case "first":i=j.sFirst;k=s+(d>0?"":" "+g.sPageButtonDisabled);break;case "previous":i=j.sPrevious;k=s+(d>0?"":" "+g.sPageButtonDisabled);break;case "next":i=j.sNext;k=s+(d<f-1?"":" "+g.sPageButtonDisabled);break;case "last":i=j.sLast;k=s+(d<f-1?"":" "+g.sPageButtonDisabled);break;default:i=s+1;k=d===s?g.sPageButtonActive:""}if(i){t=h("<a>",{"class":g.sPageButton+" "+k,"aria-controls":a.sTableId,"data-dt-idx":l,tabindex:a.iTabIndex,id:c===0&&typeof s==="string"?a.sTableId+"_"+s:null}).html(i).appendTo(b);
Va(t,{action:s},u);l++}}}},n;try{n=h(Q.activeElement).data("dt-idx")}catch(r){}m(h(b).empty(),e);n&&h(b).find("[data-dt-idx="+n+"]").focus()}}});h.extend(m.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return Za(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&(!ac.test(a)||!bc.test(a)))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||J(a)?"date":null},function(a,b){var c=b.oLanguage.sDecimal;return Za(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;
return Rb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Rb(a,c,!0)?"html-num-fmt"+c:null},function(a){return J(a)||"string"===typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(m.ext.type.search,{html:function(a){return J(a)?a:"string"===typeof a?a.replace(Ob," ").replace(Ba,""):""},string:function(a){return J(a)?a:"string"===typeof a?a.replace(Ob," "):a}});var Aa=function(a,b,c,e){if(0!==a&&(!a||"-"===a))return-Infinity;b&&(a=Qb(a,b));a.replace&&(c&&(a=a.replace(c,"")),
e&&(a=a.replace(e,"")));return 1*a};h.extend(u.type.order,{"date-pre":function(a){return Date.parse(a)||0},"html-pre":function(a){return J(a)?"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return J(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,b){return a<b?1:a>b?-1:0}});db("");h.extend(!0,m.ext.renderer,{header:{_:function(a,b,c,e){h(a.nTable).on("order.dt.DT",function(d,
f,g,h){if(a===f){d=c.idx;b.removeClass(c.sSortingClass+" "+e.sSortAsc+" "+e.sSortDesc).addClass(h[d]=="asc"?e.sSortAsc:h[d]=="desc"?e.sSortDesc:c.sSortingClass)}})},jqueryui:function(a,b,c,e){h("<div/>").addClass(e.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(e.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(d,f,g,h){if(a===f){d=c.idx;b.removeClass(e.sSortAsc+" "+e.sSortDesc).addClass(h[d]=="asc"?e.sSortAsc:h[d]=="desc"?e.sSortDesc:c.sSortingClass);
b.find("span."+e.sSortIcon).removeClass(e.sSortJUIAsc+" "+e.sSortJUIDesc+" "+e.sSortJUI+" "+e.sSortJUIAscAllowed+" "+e.sSortJUIDescAllowed).addClass(h[d]=="asc"?e.sSortJUIAsc:h[d]=="desc"?e.sSortJUIDesc:c.sSortingClassJUI)}})}}});m.render={number:function(a,b,c,e){return{display:function(d){if("number"!==typeof d&&"string"!==typeof d)return d;var f=0>d?"-":"",d=Math.abs(parseFloat(d)),g=parseInt(d,10),d=c?b+(d-g).toFixed(c).substring(2):"";return f+(e||"")+g.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
a)+d}}}};h.extend(m.ext.internal,{_fnExternApiFunc:Nb,_fnBuildAjax:ra,_fnAjaxUpdate:kb,_fnAjaxParameters:tb,_fnAjaxUpdateDraw:ub,_fnAjaxDataSrc:sa,_fnAddColumn:Fa,_fnColumnOptions:ka,_fnAdjustColumnSizing:X,_fnVisibleToColumnIndex:la,_fnColumnIndexToVisible:$,_fnVisbleColumns:aa,_fnGetColumns:Z,_fnColumnTypes:Ha,_fnApplyColumnDefs:ib,_fnHungarianMap:W,_fnCamelToHungarian:H,_fnLanguageCompat:P,_fnBrowserDetect:gb,_fnAddData:K,_fnAddTr:ma,_fnNodeToDataIndex:function(a,b){return b._DT_RowIndex!==k?b._DT_RowIndex:
null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:x,_fnSetCellData:Ia,_fnSplitObjNotation:Ka,_fnGetObjectDataFn:R,_fnSetObjectDataFn:S,_fnGetDataMaster:La,_fnClearTable:oa,_fnDeleteIndex:pa,_fnInvalidate:ca,_fnGetRowElements:na,_fnCreateTr:Ja,_fnBuildHead:jb,_fnDrawHead:ea,_fnDraw:M,_fnReDraw:N,_fnAddOptionsHtml:mb,_fnDetectHeader:da,_fnGetUniqueThs:qa,_fnFeatureHtmlFilter:ob,_fnFilterComplete:fa,_fnFilterCustom:xb,_fnFilterColumn:wb,_fnFilter:vb,_fnFilterCreateSearch:Qa,
_fnEscapeRegex:va,_fnFilterData:yb,_fnFeatureHtmlInfo:rb,_fnUpdateInfo:Bb,_fnInfoMacros:Cb,_fnInitialise:ga,_fnInitComplete:ta,_fnLengthChange:Ra,_fnFeatureHtmlLength:nb,_fnFeatureHtmlPaginate:sb,_fnPageChange:Ta,_fnFeatureHtmlProcessing:pb,_fnProcessingDisplay:C,_fnFeatureHtmlTable:qb,_fnScrollDraw:Y,_fnApplyToChildren:G,_fnCalculateColumnWidths:Ga,_fnThrottle:ua,_fnConvertToWidth:Db,_fnScrollingWidthAdjust:Fb,_fnGetWidestNode:Eb,_fnGetMaxLenString:Gb,_fnStringToCss:s,_fnScrollBarWidth:Hb,_fnSortFlatten:U,
_fnSort:lb,_fnSortAria:Jb,_fnSortListener:Ua,_fnSortAttachListener:Oa,_fnSortingClasses:xa,_fnSortData:Ib,_fnSaveState:ya,_fnLoadState:Kb,_fnSettingsFromNode:za,_fnLog:I,_fnMap:E,_fnBindAction:Va,_fnCallbackReg:z,_fnCallbackFire:w,_fnLengthOverflow:Sa,_fnRenderer:Pa,_fnDataSource:B,_fnRowAttributes:Ma,_fnCalculateEnd:function(){}});h.fn.dataTable=m;h.fn.dataTableSettings=m.settings;h.fn.dataTableExt=m.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};h.each(m,function(a,b){h.fn.DataTable[a]=
b});return h.fn.dataTable};"function"===typeof define&&define.amd?define("datatables",["jquery"],P):"object"===typeof exports?module.exports=P(require("jquery")):jQuery&&!jQuery.fn.dataTable&&P(jQuery)})(window,document);
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */

(function(e){e.fn.extend({slimScroll:function(f){var a=e.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},f);this.each(function(){function v(d){if(r){d=d||window.event;
var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&n(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function n(d,g,e){k=!1;var f=b.outerHeight()-c.outerHeight();g&&(g=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),g=Math.min(Math.max(g,0),f),g=0<d?Math.ceil(g):Math.floor(g),c.css({top:g+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());g=
l*(b[0].scrollHeight-b.outerHeight());e&&(g=d,d=g/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),f),c.css({top:d+"px"}));b.scrollTop(g);b.trigger("slimscrolling",~~g);w();p()}function x(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:u+"px"});var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function w(){x();clearTimeout(B);l==~~l?(k=a.allowPageScroll,C!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;C=l;u>=b.outerHeight()?k=!0:(c.stop(!0,
!0).fadeIn("fast"),a.railVisible&&m.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(B=setTimeout(function(){a.disableFadeOut&&r||y||z||(c.fadeOut("slow"),m.fadeOut("slow"))},1E3))}var r,y,z,B,A,u,l,C,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var q=b.scrollTop(),c=b.siblings("."+a.barClass),m=b.siblings("."+a.railClass);x();if(e.isPlainObject(f)){if("height"in f&&"auto"==f.height){b.parent().css("height","auto");b.css("height","auto");var h=b.parent().parent().height();b.parent().css("height",
h);b.css("height",h)}else"height"in f&&(h=f.height,b.parent().css("height",h),b.css("height",h));if("scrollTo"in f)q=parseInt(a.scrollTo);else if("scrollBy"in f)q+=parseInt(a.scrollBy);else if("destroy"in f){c.remove();m.remove();b.unwrap();return}n(q,!1,!0)}}else if(!(e.isPlainObject(f)&&"destroy"in f)){a.height="auto"==a.height?b.parent().height():a.height;q=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",
width:a.width,height:a.height});var m=e("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,
WebkitBorderRadius:a.borderRadius,zIndex:99}),h="right"==a.position?{right:a.distance}:{left:a.distance};m.css(h);c.css(h);b.wrap(q);b.parent().append(c);b.parent().append(m);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);z=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);n(0,c.position().top,!1)});b.bind("mouseup.slimscroll",function(a){z=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",
function(a){a.stopPropagation();a.preventDefault();return!1});m.hover(function(){w()},function(){p()});c.hover(function(){y=!0},function(){y=!1});b.hover(function(){r=!0;w();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(A=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&(n((A-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),A=b.originalEvent.touches[0].pageY)});
x();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),n(0,!0)):"top"!==a.start&&(n(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());window.addEventListener?(this.addEventListener("DOMMouseScroll",v,!1),this.addEventListener("mousewheel",v,!1)):document.attachEvent("onmousewheel",v)}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);
/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.5
 * @license MIT <http://opensource.org/licenses/MIT>
 */

function _init(){"use strict";$.AdminLTE.layout={activate:function(){var a=this;a.fix(),a.fixSidebar(),$(window,".wrapper").resize(function(){a.fix(),a.fixSidebar()})},fix:function(){var a=$(".main-header").outerHeight()+$(".main-footer").outerHeight(),b=$(window).height(),c=$(".sidebar").height();if($("body").hasClass("fixed"))$(".content-wrapper, .right-side").css("min-height",b-$(".main-footer").outerHeight());else{var d;b>=c?($(".content-wrapper, .right-side").css("min-height",b-a),d=b-a):($(".content-wrapper, .right-side").css("min-height",c),d=c);var e=$($.AdminLTE.options.controlSidebarOptions.selector);"undefined"!=typeof e&&e.height()>d&&$(".content-wrapper, .right-side").css("min-height",e.height())}},fixSidebar:function(){return $("body").hasClass("fixed")?("undefined"==typeof $.fn.slimScroll&&window.console&&window.console.error("Error: the fixed layout requires the slimscroll plugin!"),void($.AdminLTE.options.sidebarSlimScroll&&"undefined"!=typeof $.fn.slimScroll&&($(".sidebar").slimScroll({destroy:!0}).height("auto"),$(".sidebar").slimscroll({height:$(window).height()-$(".main-header").height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"})))):void("undefined"!=typeof $.fn.slimScroll&&$(".sidebar").slimScroll({destroy:!0}).height("auto"))}},$.AdminLTE.pushMenu={activate:function(a){var b=$.AdminLTE.options.screenSizes;$(document).on("click",a,function(a){a.preventDefault(),$(window).width()>b.sm-1?$("body").hasClass("sidebar-collapse")?$("body").removeClass("sidebar-collapse").trigger("expanded.pushMenu"):$("body").addClass("sidebar-collapse").trigger("collapsed.pushMenu"):$("body").hasClass("sidebar-open")?$("body").removeClass("sidebar-open").removeClass("sidebar-collapse").trigger("collapsed.pushMenu"):$("body").addClass("sidebar-open").trigger("expanded.pushMenu")}),$(".content-wrapper").click(function(){$(window).width()<=b.sm-1&&$("body").hasClass("sidebar-open")&&$("body").removeClass("sidebar-open")}),($.AdminLTE.options.sidebarExpandOnHover||$("body").hasClass("fixed")&&$("body").hasClass("sidebar-mini"))&&this.expandOnHover()},expandOnHover:function(){var a=this,b=$.AdminLTE.options.screenSizes.sm-1;$(".main-sidebar").hover(function(){$("body").hasClass("sidebar-mini")&&$("body").hasClass("sidebar-collapse")&&$(window).width()>b&&a.expand()},function(){$("body").hasClass("sidebar-mini")&&$("body").hasClass("sidebar-expanded-on-hover")&&$(window).width()>b&&a.collapse()})},expand:function(){$("body").removeClass("sidebar-collapse").addClass("sidebar-expanded-on-hover")},collapse:function(){$("body").hasClass("sidebar-expanded-on-hover")&&$("body").removeClass("sidebar-expanded-on-hover").addClass("sidebar-collapse")}},$.AdminLTE.tree=function(a){var b=this,c=$.AdminLTE.options.animationSpeed;$(document).off("click",a+" li a").on("click",a+" li a",function(a){var d=$(this),e=d.next();if(e.is(".treeview-menu")&&e.is(":visible")&&!$("body").hasClass("sidebar-collapse"))e.slideUp(c,function(){e.removeClass("menu-open")}),e.parent("li").removeClass("active");else if(e.is(".treeview-menu")&&!e.is(":visible")){var f=d.parents("ul").first(),g=f.find("ul:visible").slideUp(c);g.removeClass("menu-open");var h=d.parent("li");e.slideDown(c,function(){e.addClass("menu-open"),f.find("li.active").removeClass("active"),h.addClass("active"),b.layout.fix()})}e.is(".treeview-menu")&&a.preventDefault()})},$.AdminLTE.controlSidebar={activate:function(){var a=this,b=$.AdminLTE.options.controlSidebarOptions,c=$(b.selector),d=$(b.toggleBtnSelector);d.on("click",function(d){d.preventDefault(),c.hasClass("control-sidebar-open")||$("body").hasClass("control-sidebar-open")?a.close(c,b.slide):a.open(c,b.slide)});var e=$(".control-sidebar-bg");a._fix(e),$("body").hasClass("fixed")?a._fixForFixed(c):$(".content-wrapper, .right-side").height()<c.height()&&a._fixForContent(c)},open:function(a,b){b?a.addClass("control-sidebar-open"):$("body").addClass("control-sidebar-open")},close:function(a,b){b?a.removeClass("control-sidebar-open"):$("body").removeClass("control-sidebar-open")},_fix:function(a){var b=this;if($("body").hasClass("layout-boxed")){if(a.css("position","absolute"),a.height($(".wrapper").height()),b.hasBindedResize)return;$(window).resize(function(){b._fix(a)}),b.hasBindedResize=!0}else a.css({position:"fixed",height:"auto"})},_fixForFixed:function(a){a.css({position:"fixed","max-height":"100%",overflow:"auto","padding-bottom":"50px"})},_fixForContent:function(a){$(".content-wrapper, .right-side").css("min-height",a.height())}},$.AdminLTE.boxWidget={selectors:$.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,icons:$.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,animationSpeed:$.AdminLTE.options.animationSpeed,activate:function(a){var b=this;a||(a=document),$(a).on("click",b.selectors.collapse,function(a){a.preventDefault(),b.collapse($(this))}),$(a).on("click",b.selectors.remove,function(a){a.preventDefault(),b.remove($(this))})},collapse:function(a){var b=this,c=a.parents(".box").first(),d=c.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");c.hasClass("collapsed-box")?(a.children(":first").removeClass(b.icons.open).addClass(b.icons.collapse),d.slideDown(b.animationSpeed,function(){c.removeClass("collapsed-box")})):(a.children(":first").removeClass(b.icons.collapse).addClass(b.icons.open),d.slideUp(b.animationSpeed,function(){c.addClass("collapsed-box")}))},remove:function(a){var b=a.parents(".box").first();b.slideUp(this.animationSpeed)}}}if("undefined"==typeof jQuery)throw new Error("AdminLTE requires jQuery");$.AdminLTE={},$.AdminLTE.options={navbarMenuSlimscroll:!0,navbarMenuSlimscrollWidth:"3px",navbarMenuHeight:"200px",animationSpeed:500,sidebarToggleSelector:"[data-toggle='offcanvas']",sidebarPushMenu:!0,sidebarSlimScroll:!0,sidebarExpandOnHover:!1,enableBoxRefresh:!0,enableBSToppltip:!0,BSTooltipSelector:"[data-toggle='tooltip']",enableFastclick:!1,enableControlSidebar:!0,controlSidebarOptions:{toggleBtnSelector:"[data-toggle='control-sidebar']",selector:".control-sidebar",slide:!0},enableBoxWidget:!0,boxWidgetOptions:{boxWidgetIcons:{collapse:"fa-minus",open:"fa-plus",remove:"fa-times"},boxWidgetSelectors:{remove:'[data-widget="remove"]',collapse:'[data-widget="collapse"]'}},directChat:{enable:!0,contactToggleSelector:'[data-widget="chat-pane-toggle"]'},colors:{lightBlue:"#3c8dbc",red:"#f56954",green:"#00a65a",aqua:"#00c0ef",yellow:"#f39c12",blue:"#0073b7",navy:"#001F3F",teal:"#39CCCC",olive:"#3D9970",lime:"#01FF70",orange:"#FF851B",fuchsia:"#F012BE",purple:"#8E24AA",maroon:"#D81B60",black:"#222222",gray:"#d2d6de"},screenSizes:{xs:480,sm:768,md:992,lg:1200}},$(function(){"use strict";$("body").removeClass("hold-transition"),"undefined"!=typeof AdminLTEOptions&&$.extend(!0,$.AdminLTE.options,AdminLTEOptions);var a=$.AdminLTE.options;_init(),$.AdminLTE.layout.activate(),$.AdminLTE.tree(".sidebar"),a.enableControlSidebar&&$.AdminLTE.controlSidebar.activate(),a.navbarMenuSlimscroll&&"undefined"!=typeof $.fn.slimscroll&&$(".navbar .menu").slimscroll({height:a.navbarMenuHeight,alwaysVisible:!1,size:a.navbarMenuSlimscrollWidth}).css("width","100%"),a.sidebarPushMenu&&$.AdminLTE.pushMenu.activate(a.sidebarToggleSelector),a.enableBSToppltip&&$("body").tooltip({selector:a.BSTooltipSelector}),a.enableBoxWidget&&$.AdminLTE.boxWidget.activate(),a.enableFastclick&&"undefined"!=typeof FastClick&&FastClick.attach(document.body),a.directChat.enable&&$(document).on("click",a.directChat.contactToggleSelector,function(){var a=$(this).parents(".direct-chat").first();a.toggleClass("direct-chat-contacts-open")}),$('.btn-group[data-toggle="btn-toggle"]').each(function(){var a=$(this);$(this).find(".btn").on("click",function(b){a.find(".btn.active").removeClass("active"),$(this).addClass("active"),b.preventDefault()})})}),function(a){"use strict";a.fn.boxRefresh=function(b){function c(a){a.append(f),e.onLoadStart.call(a)}function d(a){a.find(f).remove(),e.onLoadDone.call(a)}var e=a.extend({trigger:".refresh-btn",source:"",onLoadStart:function(a){return a},onLoadDone:function(a){return a}},b),f=a('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');return this.each(function(){if(""===e.source)return void(window.console&&window.console.log("Please specify a source first - boxRefresh()"));var b=a(this),f=b.find(e.trigger).first();f.on("click",function(a){a.preventDefault(),c(b),b.find(".box-body").load(e.source,function(){d(b)})})})}}(jQuery),function(a){"use strict";a.fn.activateBox=function(){a.AdminLTE.boxWidget.activate(this)},a.fn.toggleBox=function(){var b=a(a.AdminLTE.boxWidget.selectors.collapse,this);a.AdminLTE.boxWidget.collapse(b)},a.fn.removeBox=function(){var b=a(a.AdminLTE.boxWidget.selectors.remove,this);a.AdminLTE.boxWidget.remove(b)}}(jQuery),function(a){"use strict";a.fn.todolist=function(b){var c=a.extend({onCheck:function(a){return a},onUncheck:function(a){return a}},b);return this.each(function(){"undefined"!=typeof a.fn.iCheck?(a("input",this).on("ifChecked",function(){var b=a(this).parents("li").first();b.toggleClass("done"),c.onCheck.call(b)}),a("input",this).on("ifUnchecked",function(){var b=a(this).parents("li").first();b.toggleClass("done"),c.onUncheck.call(b)})):a("input",this).on("change",function(){var b=a(this).parents("li").first();b.toggleClass("done"),a("input",b).is(":checked")?c.onCheck.call(b):c.onUncheck.call(b)})})}}(jQuery);
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/*! bootstrap3-wysihtml5-bower 2014-09-26 */

var wysihtml5,Base,Handlebars;Object.defineProperty&&Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(Element.prototype,"textContent")&&!Object.getOwnPropertyDescriptor(Element.prototype,"textContent").get&&!function(){var a=Object.getOwnPropertyDescriptor(Element.prototype,"innerText");Object.defineProperty(Element.prototype,"textContent",{get:function(){return a.get.call(this)},set:function(b){return a.set.call(this,b)}})}(),Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)}),wysihtml5={version:"0.4.15",commands:{},dom:{},quirks:{},toolbar:{},lang:{},selection:{},views:{},INVISIBLE_SPACE:"﻿",EMPTY_FUNCTION:function(){},ELEMENT_NODE:1,TEXT_NODE:3,BACKSPACE_KEY:8,ENTER_KEY:13,ESCAPE_KEY:27,SPACE_KEY:32,DELETE_KEY:46},function(a,b){"function"==typeof define&&define.amd?define(a):b.rangy=a()}(function(){function a(a,b){var c=typeof a[b];return c==x||!(c!=w||!a[b])||"unknown"==c}function b(a,b){return!(typeof a[b]!=w||!a[b])}function c(a,b){return typeof a[b]!=y}function d(a){return function(b,c){for(var d=c.length;d--;)if(!a(b,c[d]))return!1;return!0}}function e(a){return a&&D(a,C)&&F(a,B)}function f(a){return b(a,"body")?a.body:a.getElementsByTagName("body")[0]}function g(c){b(window,"console")&&a(window.console,"log")&&window.console.log(c)}function h(a,b){b?window.alert(a):g(a)}function i(a){H.initialized=!0,H.supported=!1,h("Rangy is not supported on this page in your browser. Reason: "+a,H.config.alertOnFail)}function j(a){h("Rangy warning: "+a,H.config.alertOnWarn)}function k(a){return a.message||a.description||a+""}function l(){var b,c,d,h,j,l,m,o,p;if(!H.initialized){if(c=!1,d=!1,a(document,"createRange")&&(b=document.createRange(),D(b,A)&&F(b,z)&&(c=!0)),h=f(document),!h||"body"!=h.nodeName.toLowerCase())return i("No body element found"),void 0;if(h&&a(h,"createTextRange")&&(b=h.createTextRange(),e(b)&&(d=!0)),!c&&!d)return i("Neither Range nor TextRange are available"),void 0;H.initialized=!0,H.features={implementsDomRange:c,implementsTextRange:d};for(m in G)(j=G[m])instanceof n&&j.init(j,H);for(o=0,p=s.length;p>o;++o)try{s[o](H)}catch(q){l="Rangy init listener threw an exception. Continuing. Detail: "+k(q),g(l)}}}function m(a){a=a||window,l();for(var b=0,c=t.length;c>b;++b)t[b](a)}function n(a,b,c){this.name=a,this.dependencies=b,this.initialized=!1,this.supported=!1,this.initializer=c}function o(a,b,c,d){var e=new n(b,c,function(a){if(!a.initialized){a.initialized=!0;try{d(H,a),a.supported=!0}catch(c){var e="Module '"+b+"' failed to load: "+k(c);g(e)}}});G[b]=e}function p(){}function q(){}var r,s,t,u,v,w="object",x="function",y="undefined",z=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],A=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],B=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],C=["collapse","compareEndPoints","duplicate","moveToElementText","parentElement","select","setEndPoint","getBoundingClientRect"],D=d(a),E=d(b),F=d(c),G={},H={version:"1.3alpha.20140804",initialized:!1,supported:!0,util:{isHostMethod:a,isHostObject:b,isHostProperty:c,areHostMethods:D,areHostObjects:E,areHostProperties:F,isTextRange:e,getBody:f},features:{},modules:G,config:{alertOnFail:!0,alertOnWarn:!1,preferTextRange:!1,autoInitialize:typeof rangyAutoInitialize==y?!0:rangyAutoInitialize}};return H.fail=i,H.warn=j,{}.hasOwnProperty?H.util.extend=function(a,b,c){var d,e,f;for(f in b)b.hasOwnProperty(f)&&(d=a[f],e=b[f],c&&null!==d&&"object"==typeof d&&null!==e&&"object"==typeof e&&H.util.extend(d,e,!0),a[f]=e);return b.hasOwnProperty("toString")&&(a.toString=b.toString),a}:i("hasOwnProperty not supported"),function(){var a,b,c=document.createElement("div");c.appendChild(document.createElement("span")),a=[].slice;try{1==a.call(c.childNodes,0)[0].nodeType&&(b=function(b){return a.call(b,0)})}catch(d){}b||(b=function(a){var b,c,d=[];for(b=0,c=a.length;c>b;++b)d[b]=a[b];return d}),H.util.toArray=b}(),a(document,"addEventListener")?r=function(a,b,c){a.addEventListener(b,c,!1)}:a(document,"attachEvent")?r=function(a,b,c){a.attachEvent("on"+b,c)}:i("Document does not have required addEventListener or attachEvent method"),H.util.addListener=r,s=[],H.init=l,H.addInitListener=function(a){H.initialized?a(H):s.push(a)},t=[],H.addShimListener=function(a){t.push(a)},H.shim=H.createMissingNativeApi=m,n.prototype={init:function(){var a,b,c,d,e=this.dependencies||[];for(a=0,b=e.length;b>a;++a){if(d=e[a],c=G[d],!(c&&c instanceof n))throw Error("required module '"+d+"' not found");if(c.init(),!c.supported)throw Error("required module '"+d+"' not supported")}this.initializer(this)},fail:function(a){throw this.initialized=!0,this.supported=!1,Error("Module '"+this.name+"' failed to load: "+a)},warn:function(a){H.warn("Module "+this.name+": "+a)},deprecationNotice:function(a,b){H.warn("DEPRECATED: "+a+" in module "+this.name+"is deprecated. Please use "+b+" instead")},createError:function(a){return Error("Error in Rangy "+this.name+" module: "+a)}},H.createModule=function(a){var b,c,d;2==arguments.length?(b=arguments[1],c=[]):(b=arguments[2],c=arguments[1]),d=o(!1,a,c,b),H.initialized&&d.init()},H.createCoreModule=function(a,b,c){o(!0,a,b,c)},H.RangePrototype=p,H.rangePrototype=new p,H.selectionPrototype=new q,u=!1,v=function(){u||(u=!0,!H.initialized&&H.config.autoInitialize&&l())},typeof window==y?(i("No window found"),void 0):typeof document==y?(i("No document found"),void 0):(a(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",v,!1),r(window,"load",v),H.createCoreModule("DomUtil",[],function(a,b){function c(a){var b;return typeof a.namespaceURI==I||null===(b=a.namespaceURI)||"http://www.w3.org/1999/xhtml"==b}function d(a){var b=a.parentNode;return 1==b.nodeType?b:null}function e(a){for(var b=0;a=a.previousSibling;)++b;return b}function f(a){switch(a.nodeType){case 7:case 10:return 0;case 3:case 8:return a.length;default:return a.childNodes.length}}function g(a,b){var c,d=[];for(c=a;c;c=c.parentNode)d.push(c);for(c=b;c;c=c.parentNode)if(F(d,c))return c;return null}function h(a,b,c){for(var d=c?b:b.parentNode;d;){if(d===a)return!0;d=d.parentNode}return!1}function i(a,b){return h(a,b,!0)}function j(a,b,c){for(var d,e=c?a:a.parentNode;e;){if(d=e.parentNode,d===b)return e;e=d}return null}function k(a){var b=a.nodeType;return 3==b||4==b||8==b}function l(a){if(!a)return!1;var b=a.nodeType;return 3==b||8==b}function m(a,b){var c=b.nextSibling,d=b.parentNode;return c?d.insertBefore(a,c):d.appendChild(a),a}function n(a,b,c){var d,f,g=a.cloneNode(!1);if(g.deleteData(0,b),a.deleteData(b,a.length-b),m(g,a),c)for(d=0;f=c[d++];)f.node==a&&f.offset>b?(f.node=g,f.offset-=b):f.node==a.parentNode&&f.offset>e(a)&&++f.offset;return g}function o(a){if(9==a.nodeType)return a;if(typeof a.ownerDocument!=I)return a.ownerDocument;if(typeof a.document!=I)return a.document;if(a.parentNode)return o(a.parentNode);throw b.createError("getDocument: no document found for node")}function p(a){var c=o(a);if(typeof c.defaultView!=I)return c.defaultView;if(typeof c.parentWindow!=I)return c.parentWindow;throw b.createError("Cannot get a window object for node")}function q(a){if(typeof a.contentDocument!=I)return a.contentDocument;if(typeof a.contentWindow!=I)return a.contentWindow.document;throw b.createError("getIframeDocument: No Document object found for iframe element")}function r(a){if(typeof a.contentWindow!=I)return a.contentWindow;if(typeof a.contentDocument!=I)return a.contentDocument.defaultView;throw b.createError("getIframeWindow: No Window object found for iframe element")}function s(a){return a&&J.isHostMethod(a,"setTimeout")&&J.isHostObject(a,"document")}function t(a,b,c){var d;if(a?J.isHostProperty(a,"nodeType")?d=1==a.nodeType&&"iframe"==a.tagName.toLowerCase()?q(a):o(a):s(a)&&(d=a.document):d=document,!d)throw b.createError(c+"(): Parameter must be a Window object or DOM node");return d}function u(a){for(var b;b=a.parentNode;)a=b;return a}function v(a,c,d,f){var h,i,k,l,m;if(a==d)return c===f?0:f>c?-1:1;if(h=j(d,a,!0))return c<=e(h)?-1:1;if(h=j(a,d,!0))return e(h)<f?-1:1;if(i=g(a,d),!i)throw Error("comparePoints error: nodes have no common ancestor");if(k=a===i?i:j(a,i,!0),l=d===i?i:j(d,i,!0),k===l)throw b.createError("comparePoints got to case 4 and childA and childB are the same!");for(m=i.firstChild;m;){if(m===k)return-1;if(m===l)return 1;m=m.nextSibling}}function w(a){var b;try{return b=a.parentNode,!1}catch(c){return!0}}function x(a){if(!a)return"[No node]";if(G&&w(a))return"[Broken node]";if(k(a))return'"'+a.data+'"';if(1==a.nodeType){var b=a.id?' id="'+a.id+'"':"";return"<"+a.nodeName+b+">[index:"+e(a)+",length:"+a.childNodes.length+"]["+(a.innerHTML||"[innerHTML not supported]").slice(0,25)+"]"}return a.nodeName}function y(a){for(var b,c=o(a).createDocumentFragment();b=a.firstChild;)c.appendChild(b);return c}function z(a){this.root=a,this._next=a}function A(a){return new z(a)}function B(a,b){this.node=a,this.offset=b}function C(a){this.code=this[a],this.codeName=a,this.message="DOMException: "+this.codeName}var D,E,F,G,H,I="undefined",J=a.util;J.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||b.fail("document missing a Node creation method"),J.isHostMethod(document,"getElementsByTagName")||b.fail("document missing getElementsByTagName method"),D=document.createElement("div"),J.areHostMethods(D,["insertBefore","appendChild","cloneNode"]||!J.areHostObjects(D,["previousSibling","nextSibling","childNodes","parentNode"]))||b.fail("Incomplete Element implementation"),J.isHostProperty(D,"innerHTML")||b.fail("Element is missing innerHTML property"),E=document.createTextNode("test"),J.areHostMethods(E,["splitText","deleteData","insertData","appendData","cloneNode"]||!J.areHostObjects(D,["previousSibling","nextSibling","childNodes","parentNode"])||!J.areHostProperties(E,["data"]))||b.fail("Incomplete Text Node implementation"),F=function(a,b){for(var c=a.length;c--;)if(a[c]===b)return!0;return!1},G=!1,function(){var b,c=document.createElement("b");c.innerHTML="1",b=c.firstChild,c.innerHTML="<br>",G=w(b),a.features.crashyTextNodes=G}(),typeof window.getComputedStyle!=I?H=function(a,b){return p(a).getComputedStyle(a,null)[b]}:typeof document.documentElement.currentStyle!=I?H=function(a,b){return a.currentStyle[b]}:b.fail("No means of obtaining computed style properties found"),z.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var a,b,c=this._current=this._next;if(this._current)if(a=c.firstChild,a)this._next=a;else{for(b=null;c!==this.root&&!(b=c.nextSibling);)c=c.parentNode;this._next=b}return this._current},detach:function(){this._current=this._next=this.root=null}},B.prototype={equals:function(a){return!!a&&this.node===a.node&&this.offset==a.offset},inspect:function(){return"[DomPosition("+x(this.node)+":"+this.offset+")]"},toString:function(){return this.inspect()}},C.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11,INVALID_NODE_TYPE_ERR:24},C.prototype.toString=function(){return this.message},a.dom={arrayContains:F,isHtmlNamespace:c,parentElement:d,getNodeIndex:e,getNodeLength:f,getCommonAncestor:g,isAncestorOf:h,isOrIsAncestorOf:i,getClosestAncestorIn:j,isCharacterDataNode:k,isTextOrCommentNode:l,insertAfter:m,splitDataNode:n,getDocument:o,getWindow:p,getIframeWindow:r,getIframeDocument:q,getBody:J.getBody,isWindow:s,getContentDocument:t,getRootContainer:u,comparePoints:v,isBrokenNode:w,inspectNode:x,getComputedStyleProperty:H,fragmentFromNodeChildren:y,createIterator:A,DomPosition:B},a.DOMException=C}),H.createCoreModule("DomRange",["DomUtil"],function(a){function b(a,b){return 3!=a.nodeType&&(gb(a,b.startContainer)||gb(a,b.endContainer))}function c(a){return a.document||hb(a.startContainer)}function d(a){return new cb(a.parentNode,fb(a))}function e(a){return new cb(a.parentNode,fb(a)+1)}function f(a,b,c){var d=11==a.nodeType?a.firstChild:a;return eb(b)?c==b.length?ab.insertAfter(a,b):b.parentNode.insertBefore(a,0==c?b:jb(b,c)):c>=b.childNodes.length?b.appendChild(a):b.insertBefore(a,b.childNodes[c]),d}function g(a,b,d){if(y(a),y(b),c(b)!=c(a))throw new db("WRONG_DOCUMENT_ERR");var e=ib(a.startContainer,a.startOffset,b.endContainer,b.endOffset),f=ib(a.endContainer,a.endOffset,b.startContainer,b.startOffset);return d?0>=e&&f>=0:0>e&&f>0}function h(a){var b,d,e,f;for(e=c(a.range).createDocumentFragment();d=a.next();){if(b=a.isPartiallySelectedSubtree(),d=d.cloneNode(!b),b&&(f=a.getSubtreeIterator(),d.appendChild(h(f)),f.detach()),10==d.nodeType)throw new db("HIERARCHY_REQUEST_ERR");e.appendChild(d)}return e}function i(a,b,c){var d,e,f,g;for(c=c||{stop:!1};f=a.next();)if(a.isPartiallySelectedSubtree()){if(b(f)===!1)return c.stop=!0,void 0;if(g=a.getSubtreeIterator(),i(g,b,c),g.detach(),c.stop)return}else for(d=ab.createIterator(f);e=d.next();)if(b(e)===!1)return c.stop=!0,void 0}function j(a){for(var b;a.next();)a.isPartiallySelectedSubtree()?(b=a.getSubtreeIterator(),j(b),b.detach()):a.remove()}function k(a){for(var b,d,e=c(a.range).createDocumentFragment();b=a.next();){if(a.isPartiallySelectedSubtree()?(b=b.cloneNode(!1),d=a.getSubtreeIterator(),b.appendChild(k(d)),d.detach()):a.remove(),10==b.nodeType)throw new db("HIERARCHY_REQUEST_ERR");e.appendChild(b)}return e}function l(a,b,c){var d,e,f=!(!b||!b.length),g=!!c;return f&&(d=RegExp("^("+b.join("|")+")$")),e=[],i(new n(a,!1),function(b){var h,i;(!f||d.test(b.nodeType))&&(!g||c(b))&&(h=a.startContainer,b==h&&eb(h)&&a.startOffset==h.length||(i=a.endContainer,b==i&&eb(i)&&0==a.endOffset||e.push(b)))}),e}function m(a){var b=void 0===a.getName?"Range":a.getName();return"["+b+"("+ab.inspectNode(a.startContainer)+":"+a.startOffset+", "+ab.inspectNode(a.endContainer)+":"+a.endOffset+")]"}function n(a,b){if(this.range=a,this.clonePartiallySelectedTextNodes=b,!a.collapsed){this.sc=a.startContainer,this.so=a.startOffset,this.ec=a.endContainer,this.eo=a.endOffset;var c=a.commonAncestorContainer;this.sc===this.ec&&eb(this.sc)?(this.isSingleCharacterDataNode=!0,this._first=this._last=this._next=this.sc):(this._first=this._next=this.sc!==c||eb(this.sc)?kb(this.sc,c,!0):this.sc.childNodes[this.so],this._last=this.ec!==c||eb(this.ec)?kb(this.ec,c,!0):this.ec.childNodes[this.eo-1])}}function o(a){return function(b,c){for(var d,e=c?b:b.parentNode;e;){if(d=e.nodeType,mb(a,d))return e;e=e.parentNode}return null}}function p(a,b){if(P(a,b))throw new db("INVALID_NODE_TYPE_ERR")}function q(a,b){if(!mb(b,a.nodeType))throw new db("INVALID_NODE_TYPE_ERR")}function r(a,b){if(0>b||b>(eb(a)?a.length:a.childNodes.length))throw new db("INDEX_SIZE_ERR")}function s(a,b){if(N(a,!0)!==N(b,!0))throw new db("WRONG_DOCUMENT_ERR")}function t(a){if(O(a,!0))throw new db("NO_MODIFICATION_ALLOWED_ERR")}function u(a,b){if(!a)throw new db(b)}function v(a){return ob&&ab.isBrokenNode(a)||!mb(J,a.nodeType)&&!N(a,!0)}function w(a,b){return b<=(eb(a)?a.length:a.childNodes.length)}function x(a){return!!a.startContainer&&!!a.endContainer&&!v(a.startContainer)&&!v(a.endContainer)&&w(a.startContainer,a.startOffset)&&w(a.endContainer,a.endOffset)}function y(a){if(!x(a))throw Error("Range error: Range is no longer valid after DOM mutation ("+a.inspect()+")")}function z(a,b){var c,d,e,f,g;y(a),c=a.startContainer,d=a.startOffset,e=a.endContainer,f=a.endOffset,g=c===e,eb(e)&&f>0&&f<e.length&&jb(e,f,b),eb(c)&&d>0&&d<c.length&&(c=jb(c,d,b),g?(f-=d,e=c):e==c.parentNode&&f>=fb(c)&&f++,d=0),a.setStartAndEnd(c,d,e,f)}function A(a){y(a);var b=a.commonAncestorContainer.parentNode.cloneNode(!1);return b.appendChild(a.cloneContents()),b.innerHTML}function B(a){a.START_TO_START=U,a.START_TO_END=V,a.END_TO_END=W,a.END_TO_START=X,a.NODE_BEFORE=Y,a.NODE_AFTER=Z,a.NODE_BEFORE_AND_AFTER=$,a.NODE_INSIDE=_}function C(a){B(a),B(a.prototype)}function D(a,b){return function(){var c,d,f,g,h,j,k;return y(this),c=this.startContainer,d=this.startOffset,f=this.commonAncestorContainer,g=new n(this,!0),c!==f&&(h=kb(c,f,!0),j=e(h),c=j.node,d=j.offset),i(g,t),g.reset(),k=a(g),g.detach(),b(this,c,d,c,d),k}}function E(c,f){function g(a,b){return function(c){q(c,I),q(nb(c),J);var f=(a?d:e)(c);(b?h:i)(this,f.node,f.offset)}}function h(a,b,c){var d=a.endContainer,e=a.endOffset;(b!==a.startContainer||c!==a.startOffset)&&((nb(b)!=nb(d)||1==ib(b,c,d,e))&&(d=b,e=c),f(a,b,c,d,e))}function i(a,b,c){var d=a.startContainer,e=a.startOffset;(b!==a.endContainer||c!==a.endOffset)&&((nb(b)!=nb(d)||-1==ib(b,c,d,e))&&(d=b,e=c),f(a,d,e,b,c))}var l=function(){};l.prototype=a.rangePrototype,c.prototype=new l,bb.extend(c.prototype,{setStart:function(a,b){p(a,!0),r(a,b),h(this,a,b)},setEnd:function(a,b){p(a,!0),r(a,b),i(this,a,b)},setStartAndEnd:function(){var a=arguments,b=a[0],c=a[1],d=b,e=c;switch(a.length){case 3:e=a[2];break;case 4:d=a[2],e=a[3]}f(this,b,c,d,e)},setBoundary:function(a,b,c){this["set"+(c?"Start":"End")](a,b)},setStartBefore:g(!0,!0),setStartAfter:g(!1,!0),setEndBefore:g(!0,!1),setEndAfter:g(!1,!1),collapse:function(a){y(this),a?f(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):f(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(a){p(a,!0),f(this,a,0,a,lb(a))},selectNode:function(a){p(a,!1),q(a,I);var b=d(a),c=e(a);f(this,b.node,b.offset,c.node,c.offset)},extractContents:D(k,f),deleteContents:D(j,f),canSurroundContents:function(){var a,c;return y(this),t(this.startContainer),t(this.endContainer),a=new n(this,!0),c=a._first&&b(a._first,this)||a._last&&b(a._last,this),a.detach(),!c},splitBoundaries:function(){z(this)},splitBoundariesPreservingPositions:function(a){z(this,a)},normalizeBoundaries:function(){var a,b,c,d,e,g,h,i,j;y(this),a=this.startContainer,b=this.startOffset,c=this.endContainer,d=this.endOffset,e=function(a){var b=a.nextSibling;b&&b.nodeType==a.nodeType&&(c=a,d=a.length,a.appendData(b.data),b.parentNode.removeChild(b))},g=function(e){var f,g,h=e.previousSibling;h&&h.nodeType==e.nodeType&&(a=e,f=e.length,b=h.length,e.insertData(0,h.data),h.parentNode.removeChild(h),a==c?(d+=b,c=a):c==e.parentNode&&(g=fb(e),d==g?(c=e,d=f):d>g&&d--))},h=!0,eb(c)?c.length==d&&e(c):(d>0&&(i=c.childNodes[d-1],i&&eb(i)&&e(i)),h=!this.collapsed),h?eb(a)?0==b&&g(a):b<a.childNodes.length&&(j=a.childNodes[b],j&&eb(j)&&g(j)):(a=c,b=d),f(this,a,b,c,d)},collapseToPoint:function(a,b){p(a,!0),r(a,b),this.setStartAndEnd(a,b)}}),C(c)}function F(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset,a.commonAncestorContainer=a.collapsed?a.startContainer:ab.getCommonAncestor(a.startContainer,a.endContainer)}function G(a,b,c,d,e){a.startContainer=b,a.startOffset=c,a.endContainer=d,a.endOffset=e,a.document=ab.getDocument(b),F(a)}function H(a){this.startContainer=a,this.startOffset=0,this.endContainer=a,this.endOffset=0,this.document=a,F(this)}var I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab=a.dom,bb=a.util,cb=ab.DomPosition,db=a.DOMException,eb=ab.isCharacterDataNode,fb=ab.getNodeIndex,gb=ab.isOrIsAncestorOf,hb=ab.getDocument,ib=ab.comparePoints,jb=ab.splitDataNode,kb=ab.getClosestAncestorIn,lb=ab.getNodeLength,mb=ab.arrayContains,nb=ab.getRootContainer,ob=a.features.crashyTextNodes;n.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:!1,reset:function(){this._current=null,this._next=this._first},hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;return a&&(this._next=a!==this._last?a.nextSibling:null,eb(a)&&this.clonePartiallySelectedTextNodes&&(a===this.ec&&(a=a.cloneNode(!0)).deleteData(this.eo,a.length-this.eo),this._current===this.sc&&(a=a.cloneNode(!0)).deleteData(0,this.so))),a},remove:function(){var a,b,c=this._current;!eb(c)||c!==this.sc&&c!==this.ec?c.parentNode&&c.parentNode.removeChild(c):(a=c===this.sc?this.so:0,b=c===this.ec?this.eo:c.length,a!=b&&c.deleteData(a,b-a))},isPartiallySelectedSubtree:function(){var a=this._current;return b(a,this.range)},getSubtreeIterator:function(){var a,b,d,e,f,g;return this.isSingleCharacterDataNode?(a=this.range.cloneRange(),a.collapse(!1)):(a=new H(c(this.range)),b=this._current,d=b,e=0,f=b,g=lb(b),gb(b,this.sc)&&(d=this.sc,e=this.so),gb(b,this.ec)&&(f=this.ec,g=this.eo),G(a,d,e,f,g)),new n(a,this.clonePartiallySelectedTextNodes)},detach:function(){this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}},I=[1,3,4,5,7,8,10],J=[2,9,11],K=[5,6,10,12],L=[1,3,4,5,7,8,10,11],M=[1,3,4,5,7,8],N=o([9,11]),O=o(K),P=o([6,10,12]),Q=document.createElement("style"),R=!1;try{Q.innerHTML="<b>x</b>",R=3==Q.firstChild.nodeType}catch(pb){}a.features.htmlParsingConforms=R,S=R?function(a){var b,c=this.startContainer,d=hb(c);if(!c)throw new db("INVALID_STATE_ERR");return b=null,1==c.nodeType?b=c:eb(c)&&(b=ab.parentElement(c)),b=null===b||"HTML"==b.nodeName&&ab.isHtmlNamespace(hb(b).documentElement)&&ab.isHtmlNamespace(b)?d.createElement("body"):b.cloneNode(!1),b.innerHTML=a,ab.fragmentFromNodeChildren(b)}:function(a){var b=c(this),d=b.createElement("body");return d.innerHTML=a,ab.fragmentFromNodeChildren(d)},T=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],U=0,V=1,W=2,X=3,Y=0,Z=1,$=2,_=3,bb.extend(a.rangePrototype,{compareBoundaryPoints:function(a,b){var c,d,e,f,g,h;return y(this),s(this.startContainer,b.startContainer),g=a==X||a==U?"start":"end",h=a==V||a==U?"start":"end",c=this[g+"Container"],d=this[g+"Offset"],e=b[h+"Container"],f=b[h+"Offset"],ib(c,d,e,f)},insertNode:function(a){if(y(this),q(a,L),t(this.startContainer),gb(a,this.startContainer))throw new db("HIERARCHY_REQUEST_ERR");var b=f(a,this.startContainer,this.startOffset);this.setStartBefore(b)},cloneContents:function(){var a,b,d;return y(this),this.collapsed?c(this).createDocumentFragment():this.startContainer===this.endContainer&&eb(this.startContainer)?(a=this.startContainer.cloneNode(!0),a.data=a.data.slice(this.startOffset,this.endOffset),b=c(this).createDocumentFragment(),b.appendChild(a),b):(d=new n(this,!0),a=h(d),d.detach(),a)},canSurroundContents:function(){var a,c;return y(this),t(this.startContainer),t(this.endContainer),a=new n(this,!0),c=a._first&&b(a._first,this)||a._last&&b(a._last,this),a.detach(),!c},surroundContents:function(a){if(q(a,M),!this.canSurroundContents())throw new db("INVALID_STATE_ERR");var b=this.extractContents();if(a.hasChildNodes())for(;a.lastChild;)a.removeChild(a.lastChild);f(a,this.startContainer,this.startOffset),a.appendChild(b),this.selectNode(a)},cloneRange:function(){var a,b,d;for(y(this),a=new H(c(this)),b=T.length;b--;)d=T[b],a[d]=this[d];return a},toString:function(){var a,b,c;return y(this),a=this.startContainer,a===this.endContainer&&eb(a)?3==a.nodeType||4==a.nodeType?a.data.slice(this.startOffset,this.endOffset):"":(b=[],c=new n(this,!0),i(c,function(a){(3==a.nodeType||4==a.nodeType)&&b.push(a.data)}),c.detach(),b.join(""))},compareNode:function(a){var b,c,d,e;if(y(this),b=a.parentNode,c=fb(a),!b)throw new db("NOT_FOUND_ERR");return d=this.comparePoint(b,c),e=this.comparePoint(b,c+1),0>d?e>0?$:Y:e>0?Z:_},comparePoint:function(a,b){return y(this),u(a,"HIERARCHY_REQUEST_ERR"),s(a,this.startContainer),ib(a,b,this.startContainer,this.startOffset)<0?-1:ib(a,b,this.endContainer,this.endOffset)>0?1:0},createContextualFragment:S,toHtml:function(){return A(this)},intersectsNode:function(a,b){var d,e,f,g;return y(this),u(a,"NOT_FOUND_ERR"),hb(a)!==c(this)?!1:(d=a.parentNode,e=fb(a),u(d,"NOT_FOUND_ERR"),f=ib(d,e,this.endContainer,this.endOffset),g=ib(d,e+1,this.startContainer,this.startOffset),b?0>=f&&g>=0:0>f&&g>0)},isPointInRange:function(a,b){return y(this),u(a,"HIERARCHY_REQUEST_ERR"),s(a,this.startContainer),ib(a,b,this.startContainer,this.startOffset)>=0&&ib(a,b,this.endContainer,this.endOffset)<=0},intersectsRange:function(a){return g(this,a,!1)},intersectsOrTouchesRange:function(a){return g(this,a,!0)},intersection:function(a){var b,c,d;return this.intersectsRange(a)?(b=ib(this.startContainer,this.startOffset,a.startContainer,a.startOffset),c=ib(this.endContainer,this.endOffset,a.endContainer,a.endOffset),d=this.cloneRange(),-1==b&&d.setStart(a.startContainer,a.startOffset),1==c&&d.setEnd(a.endContainer,a.endOffset),d):null},union:function(a){if(this.intersectsOrTouchesRange(a)){var b=this.cloneRange();return-1==ib(a.startContainer,a.startOffset,this.startContainer,this.startOffset)&&b.setStart(a.startContainer,a.startOffset),1==ib(a.endContainer,a.endOffset,this.endContainer,this.endOffset)&&b.setEnd(a.endContainer,a.endOffset),b}throw new db("Ranges do not intersect")},containsNode:function(a,b){return b?this.intersectsNode(a,!1):this.compareNode(a)==_},containsNodeContents:function(a){return this.comparePoint(a,0)>=0&&this.comparePoint(a,lb(a))<=0},containsRange:function(a){var b=this.intersection(a);return null!==b&&a.equals(b)},containsNodeText:function(a){var b,c,d=this.cloneRange();return d.selectNode(a),b=d.getNodes([3]),b.length>0?(d.setStart(b[0],0),c=b.pop(),d.setEnd(c,c.length),this.containsRange(d)):this.containsNodeContents(a)},getNodes:function(a,b){return y(this),l(this,a,b)},getDocument:function(){return c(this)},collapseBefore:function(a){this.setEndBefore(a),this.collapse(!1)},collapseAfter:function(a){this.setStartAfter(a),this.collapse(!0)},getBookmark:function(b){var d,e,f,g=c(this),h=a.createRange(g);return b=b||ab.getBody(g),h.selectNodeContents(b),d=this.intersection(h),e=0,f=0,d&&(h.setEnd(d.startContainer,d.startOffset),e=(""+h).length,f=e+(""+d).length),{start:e,end:f,containerNode:b}},moveToBookmark:function(a){var b,c,d,e,f,g,h,i=a.containerNode,j=0;for(this.setStart(i,0),this.collapse(!0),b=[i],d=!1,e=!1;!e&&(c=b.pop());)if(3==c.nodeType)f=j+c.length,!d&&a.start>=j&&a.start<=f&&(this.setStart(c,a.start-j),d=!0),d&&a.end>=j&&a.end<=f&&(this.setEnd(c,a.end-j),e=!0),j=f;else for(h=c.childNodes,g=h.length;g--;)b.push(h[g])},getName:function(){return"DomRange"},equals:function(a){return H.rangesEqual(this,a)},isValid:function(){return x(this)},inspect:function(){return m(this)},detach:function(){}}),E(H,G),bb.extend(H,{rangeProperties:T,RangeIterator:n,copyComparisonConstants:C,createPrototypeRange:E,inspect:m,toHtml:A,getRangeDocument:c,rangesEqual:function(a,b){return a.startContainer===b.startContainer&&a.startOffset===b.startOffset&&a.endContainer===b.endContainer&&a.endOffset===b.endOffset}}),a.DomRange=H}),H.createCoreModule("WrappedRange",["DomRange"],function(a,b){var c,d,e,f,g,h,i,j,k=a.dom,l=a.util,m=k.DomPosition,n=a.DomRange,o=k.getBody,p=k.getContentDocument,q=k.isCharacterDataNode;a.features.implementsDomRange&&!function(){function d(a){for(var b,c=s.length;c--;)b=s[c],a[b]=a.nativeRange[b];a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset}function e(a,b,c,d,e){var f=a.startContainer!==b||a.startOffset!=c,g=a.endContainer!==d||a.endOffset!=e,h=!a.equals(a.nativeRange);(f||g||h)&&(a.setEnd(d,e),a.setStart(b,c))}var f,g,h,i,j,m,q,r,s=n.rangeProperties;c=function(a){if(!a)throw b.createError("WrappedRange: Range must be specified");this.nativeRange=a,d(this)},n.createPrototypeRange(c,e),f=c.prototype,f.selectNode=function(a){this.nativeRange.selectNode(a),d(this)},f.cloneContents=function(){return this.nativeRange.cloneContents()},f.surroundContents=function(a){this.nativeRange.surroundContents(a),d(this)},f.collapse=function(a){this.nativeRange.collapse(a),d(this)},f.cloneRange=function(){return new c(this.nativeRange.cloneRange())},f.refresh=function(){d(this)},f.toString=function(){return""+this.nativeRange},h=document.createTextNode("test"),o(document).appendChild(h),i=document.createRange(),i.setStart(h,0),i.setEnd(h,0);try{i.setStart(h,1),f.setStart=function(a,b){this.nativeRange.setStart(a,b),d(this)},f.setEnd=function(a,b){this.nativeRange.setEnd(a,b),d(this)},g=function(a){return function(b){this.nativeRange[a](b),d(this)}}}catch(t){f.setStart=function(a,b){try{this.nativeRange.setStart(a,b)}catch(c){this.nativeRange.setEnd(a,b),this.nativeRange.setStart(a,b)}d(this)},f.setEnd=function(a,b){try{this.nativeRange.setEnd(a,b)}catch(c){this.nativeRange.setStart(a,b),this.nativeRange.setEnd(a,b)}d(this)},g=function(a,b){return function(c){try{this.nativeRange[a](c)}catch(e){this.nativeRange[b](c),this.nativeRange[a](c)}d(this)}}}f.setStartBefore=g("setStartBefore","setEndBefore"),f.setStartAfter=g("setStartAfter","setEndAfter"),f.setEndBefore=g("setEndBefore","setStartBefore"),f.setEndAfter=g("setEndAfter","setStartAfter"),f.selectNodeContents=function(a){this.setStartAndEnd(a,0,k.getNodeLength(a))},i.selectNodeContents(h),i.setEnd(h,3),j=document.createRange(),j.selectNodeContents(h),j.setEnd(h,4),j.setStart(h,2),f.compareBoundaryPoints=-1==i.compareBoundaryPoints(i.START_TO_END,j)&&1==i.compareBoundaryPoints(i.END_TO_START,j)?function(a,b){return b=b.nativeRange||b,a==b.START_TO_END?a=b.END_TO_START:a==b.END_TO_START&&(a=b.START_TO_END),this.nativeRange.compareBoundaryPoints(a,b)}:function(a,b){return this.nativeRange.compareBoundaryPoints(a,b.nativeRange||b)},m=document.createElement("div"),m.innerHTML="123",q=m.firstChild,r=o(document),r.appendChild(m),i.setStart(q,1),i.setEnd(q,2),i.deleteContents(),"13"==q.data&&(f.deleteContents=function(){this.nativeRange.deleteContents(),d(this)},f.extractContents=function(){var a=this.nativeRange.extractContents();return d(this),a}),r.removeChild(m),r=null,l.isHostMethod(i,"createContextualFragment")&&(f.createContextualFragment=function(a){return this.nativeRange.createContextualFragment(a)}),o(document).removeChild(h),f.getName=function(){return"WrappedRange"},a.WrappedRange=c,a.createNativeRange=function(a){return a=p(a,b,"createNativeRange"),a.createRange()}}(),a.features.implementsTextRange&&(e=function(a){var b,c,d,e=a.parentElement(),f=a.duplicate();return f.collapse(!0),b=f.parentElement(),f=a.duplicate(),f.collapse(!1),c=f.parentElement(),d=b==c?b:k.getCommonAncestor(b,c),d==e?d:k.getCommonAncestor(e,d)},f=function(a){return 0==a.compareEndPoints("StartToEnd",a)},g=function(a,b,c,d,e){var f,g,h,i,j,l,n,o,p,r,s,t,u,v,w,x,y=a.duplicate();if(y.collapse(c),f=y.parentElement(),k.isOrIsAncestorOf(b,f)||(f=b),!f.canHaveHTML)return g=new m(f.parentNode,k.getNodeIndex(f)),{boundaryPosition:g,nodeInfo:{nodeIndex:g.offset,containerElement:g.node}};for(h=k.getDocument(f).createElement("span"),h.parentNode&&h.parentNode.removeChild(h),j=c?"StartToStart":"StartToEnd",r=e&&e.containerElement==f?e.nodeIndex:0,s=f.childNodes.length,t=s,u=t;;){if(u==s?f.appendChild(h):f.insertBefore(h,f.childNodes[u]),y.moveToElementText(h),i=y.compareEndPoints(j,a),0==i||r==t)break;if(-1==i){if(t==r+1)break;r=u}else t=t==r+1?r:u;u=Math.floor((r+t)/2),f.removeChild(h)}if(p=h.nextSibling,-1==i&&p&&q(p)){if(y.setEndPoint(c?"EndToStart":"EndToEnd",a),/[\r\n]/.test(p.data))for(w=y.duplicate(),x=w.text.replace(/\r\n/g,"\r").length,v=w.moveStart("character",x);-1==(i=w.compareEndPoints("StartToEnd",w));)v++,w.moveStart("character",1);else v=y.text.length;o=new m(p,v)}else l=(d||!c)&&h.previousSibling,n=(d||c)&&h.nextSibling,o=n&&q(n)?new m(n,0):l&&q(l)?new m(l,l.data.length):new m(f,k.getNodeIndex(h));return h.parentNode.removeChild(h),{boundaryPosition:o,nodeInfo:{nodeIndex:u,containerElement:f}}},h=function(a,b){var c,d,e,f,g=a.offset,h=k.getDocument(a.node),i=o(h).createTextRange(),j=q(a.node);return j?(c=a.node,d=c.parentNode):(f=a.node.childNodes,c=g<f.length?f[g]:null,d=a.node),e=h.createElement("span"),e.innerHTML="&#feff;",c?d.insertBefore(e,c):d.appendChild(e),i.moveToElementText(e),i.collapse(!b),d.removeChild(e),j&&i[b?"moveStart":"moveEnd"]("character",g),i},d=function(a){this.textRange=a,this.refresh()},d.prototype=new n(document),d.prototype.refresh=function(){var a,b,c,d=e(this.textRange);
f(this.textRange)?b=a=g(this.textRange,d,!0,!0).boundaryPosition:(c=g(this.textRange,d,!0,!1),a=c.boundaryPosition,b=g(this.textRange,d,!1,!1,c.nodeInfo).boundaryPosition),this.setStart(a.node,a.offset),this.setEnd(b.node,b.offset)},d.prototype.getName=function(){return"WrappedTextRange"},n.copyComparisonConstants(d),i=function(a){var b,c,d;return a.collapsed?h(new m(a.startContainer,a.startOffset),!0):(b=h(new m(a.startContainer,a.startOffset),!0),c=h(new m(a.endContainer,a.endOffset),!1),d=o(n.getRangeDocument(a)).createTextRange(),d.setEndPoint("StartToStart",b),d.setEndPoint("EndToEnd",c),d)},d.rangeToTextRange=i,d.prototype.toTextRange=function(){return i(this)},a.WrappedTextRange=d,(!a.features.implementsDomRange||a.config.preferTextRange)&&(j=function(){return this}(),void 0===j.Range&&(j.Range=d),a.createNativeRange=function(a){return a=p(a,b,"createNativeRange"),o(a).createTextRange()},a.WrappedRange=d)),a.createRange=function(c){return c=p(c,b,"createRange"),new a.WrappedRange(a.createNativeRange(c))},a.createRangyRange=function(a){return a=p(a,b,"createRangyRange"),new n(a)},a.createIframeRange=function(c){return b.deprecationNotice("createIframeRange()","createRange(iframeEl)"),a.createRange(c)},a.createIframeRangyRange=function(c){return b.deprecationNotice("createIframeRangyRange()","createRangyRange(iframeEl)"),a.createRangyRange(c)},a.addShimListener(function(b){var c=b.document;void 0===c.createRange&&(c.createRange=function(){return a.createRange(c)}),c=b=null})}),H.createCoreModule("WrappedSelection",["DomRange","WrappedRange"],function(a,b){function c(a){return"string"==typeof a?/^backward(s)?$/i.test(a):!!a}function d(a,c){if(a){if(A.isWindow(a))return a;if(a instanceof r)return a.win;var d=A.getContentDocument(a,b,c);return A.getWindow(d)}return window}function e(a){return d(a,"getWinSelection").getSelection()}function f(a){return d(a,"getDocSelection").document.selection}function g(a){var b=!1;return a.anchorNode&&(b=1==A.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset)),b}function h(a,b,c){var d=c?"end":"start",e=c?"start":"end";a.anchorNode=b[d+"Container"],a.anchorOffset=b[d+"Offset"],a.focusNode=b[e+"Container"],a.focusOffset=b[e+"Offset"]}function i(a){var b=a.nativeSelection;a.anchorNode=b.anchorNode,a.anchorOffset=b.anchorOffset,a.focusNode=b.focusNode,a.focusOffset=b.focusOffset}function j(a){a.anchorNode=a.focusNode=null,a.anchorOffset=a.focusOffset=0,a.rangeCount=0,a.isCollapsed=!0,a._ranges.length=0}function k(b){var c;return b instanceof D?(c=a.createNativeRange(b.getDocument()),c.setEnd(b.endContainer,b.endOffset),c.setStart(b.startContainer,b.startOffset)):b instanceof E?c=b.nativeRange:J.implementsDomRange&&b instanceof A.getWindow(b.startContainer).Range&&(c=b),c}function l(a){if(!a.length||1!=a[0].nodeType)return!1;for(var b=1,c=a.length;c>b;++b)if(!A.isAncestorOf(a[0],a[b]))return!1;return!0}function m(a){var c=a.getNodes();if(!l(c))throw b.createError("getSingleElementFromRange: range "+a.inspect()+" did not consist of a single element");return c[0]}function n(a){return!!a&&void 0!==a.text}function o(a,b){var c=new E(b);a._ranges=[c],h(a,c,!1),a.rangeCount=1,a.isCollapsed=c.collapsed}function p(b){var c,d,e,f;if(b._ranges.length=0,"None"==b.docSelection.type)j(b);else if(c=b.docSelection.createRange(),n(c))o(b,c);else{for(b.rangeCount=c.length,e=L(c.item(0)),f=0;f<b.rangeCount;++f)d=a.createRange(e),d.selectNode(c.item(f)),b._ranges.push(d);b.isCollapsed=1==b.rangeCount&&b._ranges[0].collapsed,h(b,b._ranges[b.rangeCount-1],!1)}}function q(a,c){var d,e,f=a.docSelection.createRange(),g=m(c),h=L(f.item(0)),i=M(h).createControlRange();for(d=0,e=f.length;e>d;++d)i.add(f.item(d));try{i.add(g)}catch(j){throw b.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")}i.select(),p(a)}function r(a,b,c){this.nativeSelection=a,this.docSelection=b,this._ranges=[],this.win=c,this.refresh()}function s(a){a.win=a.anchorNode=a.focusNode=a._ranges=null,a.rangeCount=a.anchorOffset=a.focusOffset=0,a.detached=!0}function t(a,b){for(var c,d,e=bb.length;e--;)if(c=bb[e],d=c.selection,"deleteAll"==b)s(d);else if(c.win==a)return"delete"==b?(bb.splice(e,1),!0):d;return"deleteAll"==b&&(bb.length=0),null}function u(a,c){var d,e,f,g=L(c[0].startContainer),h=M(g).createControlRange();for(d=0,f=c.length;f>d;++d){e=m(c[d]);try{h.add(e)}catch(i){throw b.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)")}}h.select(),p(a)}function v(a,b){if(a.win.document!=L(b))throw new F("WRONG_DOCUMENT_ERR")}function w(b){return function(c,d){var e;this.rangeCount?(e=this.getRangeAt(0),e["set"+(b?"Start":"End")](c,d)):(e=a.createRange(this.win.document),e.setStartAndEnd(c,d)),this.setSingleRange(e,this.isBackward())}}function x(a){var b,c,d=[],e=new G(a.anchorNode,a.anchorOffset),f=new G(a.focusNode,a.focusOffset),g="function"==typeof a.getName?a.getName():"Selection";if(void 0!==a.rangeCount)for(b=0,c=a.rangeCount;c>b;++b)d[b]=D.inspect(a.getRangeAt(b));return"["+g+"(Ranges: "+d.join(", ")+")(anchor: "+e.inspect()+", focus: "+f.inspect()+"]"}var y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb;if(a.config.checkSelectionRanges=!0,y="boolean",z="number",A=a.dom,B=a.util,C=B.isHostMethod,D=a.DomRange,E=a.WrappedRange,F=a.DOMException,G=A.DomPosition,J=a.features,K="Control",L=A.getDocument,M=A.getBody,N=D.rangesEqual,O=C(window,"getSelection"),P=B.isHostObject(document,"selection"),J.implementsWinGetSelection=O,J.implementsDocSelection=P,Q=P&&(!O||a.config.preferTextRange),Q?(H=f,a.isSelectionValid=function(a){var b=d(a,"isSelectionValid").document,c=b.selection;return"None"!=c.type||L(c.createRange().parentElement())==b}):O?(H=e,a.isSelectionValid=function(){return!0}):b.fail("Neither document.selection or window.getSelection() detected."),a.getNativeSelection=H,R=H(),S=a.createNativeRange(document),T=M(document),U=B.areHostProperties(R,["anchorNode","focusNode","anchorOffset","focusOffset"]),J.selectionHasAnchorAndFocus=U,V=C(R,"extend"),J.selectionHasExtend=V,W=typeof R.rangeCount==z,J.selectionHasRangeCount=W,X=!1,Y=!0,Z=V?function(b,c){var d=D.getRangeDocument(c),e=a.createRange(d);e.collapseToPoint(c.endContainer,c.endOffset),b.addRange(k(e)),b.extend(c.startContainer,c.startOffset)}:null,B.areHostMethods(R,["addRange","getRangeAt","removeAllRanges"])&&typeof R.rangeCount==z&&J.implementsDomRange&&!function(){var b,c,d,e,f,h,i,j,k,l,m,n=window.getSelection();if(n){for(b=n.rangeCount,c=b>1,d=[],e=g(n),f=0;b>f;++f)d[f]=n.getRangeAt(f);for(h=M(document),i=h.appendChild(document.createElement("div")),i.contentEditable="false",j=i.appendChild(document.createTextNode("   ")),k=document.createRange(),k.setStart(j,1),k.collapse(!0),n.addRange(k),Y=1==n.rangeCount,n.removeAllRanges(),c||(l=window.navigator.appVersion.match(/Chrome\/(.*?) /),l&&parseInt(l[1])>=36?X=!1:(m=k.cloneRange(),k.setStart(j,0),m.setEnd(j,3),m.setStart(j,2),n.addRange(k),n.addRange(m),X=2==n.rangeCount)),h.removeChild(i),n.removeAllRanges(),f=0;b>f;++f)0==f&&e?Z?Z(n,d[f]):(a.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend"),n.addRange(d[f])):n.addRange(d[f])}}(),J.selectionSupportsMultipleRanges=X,J.collapsedNonEditableSelectionsSupported=Y,$=!1,T&&C(T,"createControlRange")&&(_=T.createControlRange(),B.areHostProperties(_,["item","add"])&&($=!0)),J.implementsControlRange=$,I=U?function(a){return a.anchorNode===a.focusNode&&a.anchorOffset===a.focusOffset}:function(a){return a.rangeCount?a.getRangeAt(a.rangeCount-1).collapsed:!1},C(R,"getRangeAt")?ab=function(a,b){try{return a.getRangeAt(b)}catch(c){return null}}:U&&(ab=function(b){var c=L(b.anchorNode),d=a.createRange(c);return d.setStartAndEnd(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset),d.collapsed!==this.isCollapsed&&d.setStartAndEnd(b.focusNode,b.focusOffset,b.anchorNode,b.anchorOffset),d}),r.prototype=a.selectionPrototype,bb=[],cb=function(a){var b,c,e;return a&&a instanceof r?(a.refresh(),a):(a=d(a,"getNativeSelection"),b=t(a),c=H(a),e=P?f(a):null,b?(b.nativeSelection=c,b.docSelection=e,b.refresh()):(b=new r(c,e,a),bb.push({win:a,selection:b})),b)},a.getSelection=cb,a.getIframeSelection=function(c){return b.deprecationNotice("getIframeSelection()","getSelection(iframeEl)"),a.getSelection(A.getIframeWindow(c))},db=r.prototype,!Q&&U&&B.areHostMethods(R,["removeAllRanges","addRange"]))db.removeAllRanges=function(){this.nativeSelection.removeAllRanges(),j(this)},eb=function(a,b){Z(a.nativeSelection,b),a.refresh()},db.addRange=W?function(b,d){var e,f;$&&P&&this.docSelection.type==K?q(this,b):c(d)&&V?eb(this,b):(X?e=this.rangeCount:(this.removeAllRanges(),e=0),this.nativeSelection.addRange(k(b).cloneRange()),this.rangeCount=this.nativeSelection.rangeCount,this.rangeCount==e+1?(a.config.checkSelectionRanges&&(f=ab(this.nativeSelection,this.rangeCount-1),f&&!N(f,b)&&(b=new E(f))),this._ranges[this.rangeCount-1]=b,h(this,b,hb(this.nativeSelection)),this.isCollapsed=I(this)):this.refresh())}:function(a,b){c(b)&&V?eb(this,a):(this.nativeSelection.addRange(k(a)),this.refresh())},db.setRanges=function(a){if($&&P&&a.length>1)u(this,a);else{this.removeAllRanges();for(var b=0,c=a.length;c>b;++b)this.addRange(a[b])}};else{if(!(C(R,"empty")&&C(S,"select")&&$&&Q))return b.fail("No means of selecting a Range or TextRange was found"),!1;db.removeAllRanges=function(){var a,b,c;try{this.docSelection.empty(),"None"!=this.docSelection.type&&(this.anchorNode?a=L(this.anchorNode):this.docSelection.type==K&&(b=this.docSelection.createRange(),b.length&&(a=L(b.item(0)))),a&&(c=M(a).createTextRange(),c.select(),this.docSelection.empty()))}catch(d){}j(this)},db.addRange=function(b){this.docSelection.type==K?q(this,b):(a.WrappedTextRange.rangeToTextRange(b).select(),this._ranges[0]=b,this.rangeCount=1,this.isCollapsed=this._ranges[0].collapsed,h(this,b,!1))},db.setRanges=function(a){this.removeAllRanges();var b=a.length;b>1?u(this,a):b&&this.addRange(a[0])}}if(db.getRangeAt=function(a){if(0>a||a>=this.rangeCount)throw new F("INDEX_SIZE_ERR");return this._ranges[a].cloneRange()},Q)fb=function(b){var c;a.isSelectionValid(b.win)?c=b.docSelection.createRange():(c=M(b.win.document).createTextRange(),c.collapse(!0)),b.docSelection.type==K?p(b):n(c)?o(b,c):j(b)};else if(C(R,"getRangeAt")&&typeof R.rangeCount==z)fb=function(b){if($&&P&&b.docSelection.type==K)p(b);else if(b._ranges.length=b.rangeCount=b.nativeSelection.rangeCount,b.rangeCount){for(var c=0,d=b.rangeCount;d>c;++c)b._ranges[c]=new a.WrappedRange(b.nativeSelection.getRangeAt(c));h(b,b._ranges[b.rangeCount-1],hb(b.nativeSelection)),b.isCollapsed=I(b)}else j(b)};else{if(!U||typeof R.isCollapsed!=y||typeof S.collapsed!=y||!J.implementsDomRange)return b.fail("No means of obtaining a Range or TextRange from the user's selection was found"),!1;fb=function(a){var b,c=a.nativeSelection;c.anchorNode?(b=ab(c,0),a._ranges=[b],a.rangeCount=1,i(a),a.isCollapsed=I(a)):j(a)}}db.refresh=function(a){var b,c=a?this._ranges.slice(0):null,d=this.anchorNode,e=this.anchorOffset;if(fb(this),a){if(b=c.length,b!=this._ranges.length)return!0;if(this.anchorNode!=d||this.anchorOffset!=e)return!0;for(;b--;)if(!N(c[b],this._ranges[b]))return!0;return!1}},gb=function(a,b){var c,d,e=a.getAllRanges();for(a.removeAllRanges(),c=0,d=e.length;d>c;++c)N(b,e[c])||a.addRange(e[c]);a.rangeCount||j(a)},db.removeRange=$&&P?function(a){var b,c,d,e,f,g,h,i;if(this.docSelection.type==K){for(b=this.docSelection.createRange(),c=m(a),d=L(b.item(0)),e=M(d).createControlRange(),g=!1,h=0,i=b.length;i>h;++h)f=b.item(h),f!==c||g?e.add(b.item(h)):g=!0;e.select(),p(this)}else gb(this,a)}:function(a){gb(this,a)},!Q&&U&&J.implementsDomRange?(hb=g,db.isBackward=function(){return hb(this)}):hb=db.isBackward=function(){return!1},db.isBackwards=db.isBackward,db.toString=function(){var a,b,c=[];for(a=0,b=this.rangeCount;b>a;++a)c[a]=""+this._ranges[a];return c.join("")},db.collapse=function(b,c){v(this,b);var d=a.createRange(b);d.collapseToPoint(b,c),this.setSingleRange(d),this.isCollapsed=!0},db.collapseToStart=function(){if(!this.rangeCount)throw new F("INVALID_STATE_ERR");var a=this._ranges[0];this.collapse(a.startContainer,a.startOffset)},db.collapseToEnd=function(){if(!this.rangeCount)throw new F("INVALID_STATE_ERR");var a=this._ranges[this.rangeCount-1];this.collapse(a.endContainer,a.endOffset)},db.selectAllChildren=function(b){v(this,b);var c=a.createRange(b);c.selectNodeContents(b),this.setSingleRange(c)},db.deleteFromDocument=function(){var a,b,c,d,e;if($&&P&&this.docSelection.type==K){for(a=this.docSelection.createRange();a.length;)b=a.item(0),a.remove(b),b.parentNode.removeChild(b);this.refresh()}else if(this.rangeCount&&(c=this.getAllRanges(),c.length)){for(this.removeAllRanges(),d=0,e=c.length;e>d;++d)c[d].deleteContents();this.addRange(c[e-1])}},db.eachRange=function(a,b){for(var c=0,d=this._ranges.length;d>c;++c)if(a(this.getRangeAt(c)))return b},db.getAllRanges=function(){var a=[];return this.eachRange(function(b){a.push(b)}),a},db.setSingleRange=function(a,b){this.removeAllRanges(),this.addRange(a,b)},db.callMethodOnEachRange=function(a,b){var c=[];return this.eachRange(function(d){c.push(d[a].apply(d,b))}),c},db.setStart=w(!0),db.setEnd=w(!1),a.rangePrototype.select=function(a){cb(this.getDocument()).setSingleRange(this,a)},db.changeEachRange=function(a){var b=[],c=this.isBackward();this.eachRange(function(c){a(c),b.push(c)}),this.removeAllRanges(),c&&1==b.length?this.addRange(b[0],"backward"):this.setRanges(b)},db.containsNode=function(a,b){return this.eachRange(function(c){return c.containsNode(a,b)},!0)||!1},db.getBookmark=function(a){return{backward:this.isBackward(),rangeBookmarks:this.callMethodOnEachRange("getBookmark",[a])}},db.moveToBookmark=function(b){var c,d,e,f=[];for(c=0;d=b.rangeBookmarks[c++];)e=a.createRange(this.win),e.moveToBookmark(d),f.push(e);b.backward?this.setSingleRange(f[0],"backward"):this.setRanges(f)},db.toHtml=function(){var a=[];return this.eachRange(function(b){a.push(D.toHtml(b))}),a.join("")},J.implementsTextRange&&(db.getNativeTextRange=function(){var c,d;if(c=this.docSelection){if(d=c.createRange(),n(d))return d;throw b.createError("getNativeTextRange: selection is a control selection")}if(this.rangeCount>0)return a.WrappedTextRange.rangeToTextRange(this.getRangeAt(0));throw b.createError("getNativeTextRange: selection contains no range")}),db.getName=function(){return"WrappedSelection"},db.inspect=function(){return x(this)},db.detach=function(){t(this.win,"delete"),s(this)},r.detachAll=function(){t(null,"deleteAll")},r.inspect=x,r.isDirectionBackward=c,a.Selection=r,a.selectionPrototype=db,a.addShimListener(function(a){void 0===a.getSelection&&(a.getSelection=function(){return cb(a)}),a=null})}),H)},this),function(a,b){"function"==typeof define&&define.amd?define(["rangy"],a):a(b.rangy)}(function(a){a.createModule("SaveRestore",["WrappedRange"],function(a,b){function c(a,b){return(b||document).getElementById(a)}function d(a,b){var c,d="selectionBoundary_"+ +new Date+"_"+(""+Math.random()).slice(2),e=o.getDocument(a.startContainer),f=a.cloneRange();return f.collapse(b),c=e.createElement("span"),c.id=d,c.style.lineHeight="0",c.style.display="none",c.className="rangySelectionBoundary",c.appendChild(e.createTextNode(p)),f.insertNode(c),c}function e(a,d,e,f){var g=c(e,a);g?(d[f?"setStartBefore":"setEndBefore"](g),g.parentNode.removeChild(g)):b.warn("Marker element has been removed. Cannot restore selection.")}function f(a,b){return b.compareBoundaryPoints(a.START_TO_START,a)}function g(b,c){var e,f,g=a.DomRange.getRangeDocument(b),h=""+b;return b.collapsed?(f=d(b,!1),{document:g,markerId:f.id,collapsed:!0}):(f=d(b,!1),e=d(b,!0),{document:g,startMarkerId:e.id,endMarkerId:f.id,collapsed:!1,backward:c,toString:function(){return"original text: '"+h+"', new text: '"+b+"'"}})}function h(d,f){var g,h,i,j=d.document;return void 0===f&&(f=!0),g=a.createRange(j),d.collapsed?(h=c(d.markerId,j),h?(h.style.display="inline",i=h.previousSibling,i&&3==i.nodeType?(h.parentNode.removeChild(h),g.collapseToPoint(i,i.length)):(g.collapseBefore(h),h.parentNode.removeChild(h))):b.warn("Marker element has been removed. Cannot restore selection.")):(e(j,g,d.startMarkerId,!0),e(j,g,d.endMarkerId,!1)),f&&g.normalizeBoundaries(),g}function i(b,d){var e,h,i,j,k=[];for(b=b.slice(0),b.sort(f),i=0,j=b.length;j>i;++i)k[i]=g(b[i],d);for(i=j-1;i>=0;--i)e=b[i],h=a.DomRange.getRangeDocument(e),e.collapsed?e.collapseAfter(c(k[i].markerId,h)):(e.setEndBefore(c(k[i].endMarkerId,h)),e.setStartAfter(c(k[i].startMarkerId,h)));return k}function j(c){var d,e,f,g;return a.isSelectionValid(c)?(d=a.getSelection(c),e=d.getAllRanges(),f=1==e.length&&d.isBackward(),g=i(e,f),f?d.setSingleRange(e[0],"backward"):d.setRanges(e),{win:c,rangeInfos:g,restored:!1}):(b.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus."),null)}function k(a){var b,c=[],d=a.length;for(b=d-1;b>=0;b--)c[b]=h(a[b],!0);return c}function l(b,c){var d,e,f,g;b.restored||(d=b.rangeInfos,e=a.getSelection(b.win),f=k(d),g=d.length,1==g&&c&&a.features.selectionHasExtend&&d[0].backward?(e.removeAllRanges(),e.addRange(f[0],!0)):e.setRanges(f),b.restored=!0)}function m(a,b){var d=c(b,a);d&&d.parentNode.removeChild(d)}function n(a){var b,c,d,e=a.rangeInfos;for(b=0,c=e.length;c>b;++b)d=e[b],d.collapsed?m(a.doc,d.markerId):(m(a.doc,d.startMarkerId),m(a.doc,d.endMarkerId))}var o=a.dom,p="﻿";a.util.extend(a,{saveRange:g,restoreRange:h,saveRanges:i,restoreRanges:k,saveSelection:j,restoreSelection:l,removeMarkerElement:m,removeMarkers:n})})},this),Base=function(){},Base.extend=function(a,b){var c,d,e,f=Base.prototype.extend;return Base._prototyping=!0,c=new this,f.call(c,a),c.base=function(){},delete Base._prototyping,d=c.constructor,e=c.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==e)this._constructing=!0,d.apply(this,arguments),delete this._constructing;else if(null!=arguments[0])return(arguments[0].extend||f).call(arguments[0],c)},e.ancestor=this,e.extend=this.extend,e.forEach=this.forEach,e.implement=this.implement,e.prototype=c,e.toString=this.toString,e.valueOf=function(a){return"object"==a?e:d.valueOf()},f.call(e,b),"function"==typeof e.init&&e.init(),e},Base.prototype={extend:function(a,b){var c,d,e,f,g,h,i;if(arguments.length>1)c=this[a],!c||"function"!=typeof b||c.valueOf&&c.valueOf()==b.valueOf()||!/\bbase\b/.test(b)||(d=b.valueOf(),b=function(){var a,b=this.base||Base.prototype.base;return this.base=c,a=d.apply(this,arguments),this.base=b,a},b.valueOf=function(a){return"object"==a?b:d},b.toString=Base.toString),this[a]=b;else if(a){for(e=Base.prototype.extend,Base._prototyping||"function"==typeof this||(e=this.extend||e),f={toSource:null},g=["constructor","toString","valueOf"],h=Base._prototyping?0:1;i=g[h++];)a[i]!=f[i]&&e.call(this,i,a[i]);for(i in a)f[i]||e.call(this,i,a[i])}return this}},Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,b,c){for(var d in a)void 0===this.prototype[d]&&b.call(c,a[d],d,a)},implement:function(){for(var a=0;a<arguments.length;a++)"function"==typeof arguments[a]?arguments[a](this.prototype):this.prototype.extend(arguments[a]);return this},toString:function(){return this.valueOf()+""}}),wysihtml5.browser=function(){function a(a){return+(/ipad|iphone|ipod/.test(a)&&a.match(/ os (\d+).+? like mac os x/)||[void 0,0])[1]}function b(a){return+(a.match(/android (\d+)/)||[void 0,0])[1]}function c(a,b){var c,d=-1;return"Microsoft Internet Explorer"==navigator.appName?c=RegExp("MSIE ([0-9]{1,}[.0-9]{0,})"):"Netscape"==navigator.appName&&(c=RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})")),c&&null!=c.exec(navigator.userAgent)&&(d=parseFloat(RegExp.$1)),-1===d?!1:a?b?"<"===b?d>a:">"===b?a>d:"<="===b?d>=a:">="===b?a>=d:void 0:a===d:!0}var d=navigator.userAgent,e=document.createElement("div"),f=-1!==d.indexOf("Gecko")&&-1===d.indexOf("KHTML"),g=-1!==d.indexOf("AppleWebKit/"),h=-1!==d.indexOf("Chrome/"),i=-1!==d.indexOf("Opera/");return{USER_AGENT:d,supported:function(){var c=this.USER_AGENT.toLowerCase(),d="contentEditable"in e,f=document.execCommand&&document.queryCommandSupported&&document.queryCommandState,g=document.querySelector&&document.querySelectorAll,h=this.isIos()&&a(c)<5||this.isAndroid()&&b(c)<4||-1!==c.indexOf("opera mobi")||-1!==c.indexOf("hpwos/");return d&&f&&g&&!h},isTouchDevice:function(){return this.supportsEvent("touchmove")},isIos:function(){return/ipad|iphone|ipod/i.test(this.USER_AGENT)},isAndroid:function(){return-1!==this.USER_AGENT.indexOf("Android")},supportsSandboxedIframes:function(){return c()},throwsMixedContentWarningWhenIframeSrcIsEmpty:function(){return!("querySelector"in document)},displaysCaretInEmptyContentEditableCorrectly:function(){return c()},hasCurrentStyleProperty:function(){return"currentStyle"in e},hasHistoryIssue:function(){return f&&"Mac"===navigator.platform.substr(0,3)},insertsLineBreaksOnReturn:function(){return f},supportsPlaceholderAttributeOn:function(a){return"placeholder"in a},supportsEvent:function(a){return"on"+a in e||function(){return e.setAttribute("on"+a,"return;"),"function"==typeof e["on"+a]}()},supportsEventsInIframeCorrectly:function(){return!i},supportsHTML5Tags:function(a){var b=a.createElement("div"),c="<article>foo</article>";return b.innerHTML=c,b.innerHTML.toLowerCase()===c},supportsCommand:function(){var a={formatBlock:c(10,"<="),insertUnorderedList:c(),insertOrderedList:c()},b={insertHTML:f};return function(c,d){var e=a[d];if(!e){try{return c.queryCommandSupported(d)}catch(f){}try{return c.queryCommandEnabled(d)}catch(g){return!!b[d]}}return!1}}(),doesAutoLinkingInContentEditable:function(){return c()},canDisableAutoLinking:function(){return this.supportsCommand(document,"AutoUrlDetect")},clearsContentEditableCorrectly:function(){return f||i||g},supportsGetAttributeCorrectly:function(){var a=document.createElement("td");return"1"!=a.getAttribute("rowspan")},canSelectImagesInContentEditable:function(){return f||c()||i},autoScrollsToCaret:function(){return!g},autoClosesUnclosedTags:function(){var a,b,c=e.cloneNode(!1);return c.innerHTML="<p><div></div>",b=c.innerHTML.toLowerCase(),a="<p></p><div></div>"===b||"<p><div></div></p>"===b,this.autoClosesUnclosedTags=function(){return a},a},supportsNativeGetElementsByClassName:function(){return-1!==(document.getElementsByClassName+"").indexOf("[native code]")},supportsSelectionModify:function(){return"getSelection"in window&&"modify"in window.getSelection()},needsSpaceAfterLineBreak:function(){return i},supportsSpeechApiOn:function(a){var b=d.match(/Chrome\/(\d+)/)||[void 0,0];return b[1]>=11&&("onwebkitspeechchange"in a||"speech"in a)},crashesWhenDefineProperty:function(a){return c(9)&&("XMLHttpRequest"===a||"XDomainRequest"===a)},doesAsyncFocus:function(){return c()},hasProblemsSettingCaretAfterImg:function(){return c()},hasUndoInContextMenu:function(){return f||h||i},hasInsertNodeIssue:function(){return i},hasIframeFocusIssue:function(){return c()},createsNestedInvalidMarkupAfterPaste:function(){return g},supportsMutationEvents:function(){return"MutationEvent"in window},supportsModenPaste:function(){return!("clipboardData"in window)}}}(),wysihtml5.lang.array=function(a){return{contains:function(b){if(Array.isArray(b)){for(var c=b.length;c--;)if(-1!==wysihtml5.lang.array(a).indexOf(b[c]))return!0;return!1}return-1!==wysihtml5.lang.array(a).indexOf(b)},indexOf:function(b){if(a.indexOf)return a.indexOf(b);for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},without:function(b){b=wysihtml5.lang.array(b);for(var c=[],d=0,e=a.length;e>d;d++)b.contains(a[d])||c.push(a[d]);return c},get:function(){for(var b=0,c=a.length,d=[];c>b;b++)d.push(a[b]);return d},map:function(b,c){if(Array.prototype.map)return a.map(b,c);for(var d=a.length>>>0,e=Array(d),f=0;d>f;f++)e[f]=b.call(c,a[f],f,a);return e},unique:function(){for(var b=[],c=a.length,d=0;c>d;)wysihtml5.lang.array(b).contains(a[d])||b.push(a[d]),d++;return b}}},wysihtml5.lang.Dispatcher=Base.extend({on:function(a,b){return this.events=this.events||{},this.events[a]=this.events[a]||[],this.events[a].push(b),this},off:function(a,b){this.events=this.events||{};var c,d,e=0;if(a){for(c=this.events[a]||[],d=[];e<c.length;e++)c[e]!==b&&b&&d.push(c[e]);this.events[a]=d}else this.events={};return this},fire:function(a,b){this.events=this.events||{};for(var c=this.events[a]||[],d=0;d<c.length;d++)c[d].call(this,b);return this},observe:function(){return this.on.apply(this,arguments)},stopObserving:function(){return this.off.apply(this,arguments)}}),wysihtml5.lang.object=function(a){return{merge:function(b){for(var c in b)a[c]=b[c];return this},get:function(){return a},clone:function(b){var c,d={};if(null===a||!wysihtml5.lang.object(a).isPlainObject())return a;for(c in a)a.hasOwnProperty(c)&&(d[c]=b?wysihtml5.lang.object(a[c]).clone(b):a[c]);return d},isArray:function(){return"[object Array]"===Object.prototype.toString.call(a)},isFunction:function(){return"[object Function]"===Object.prototype.toString.call(a)},isPlainObject:function(){return"[object Object]"===Object.prototype.toString.call(a)}}},function(){var a=/^\s+/,b=/\s+$/,c=/[&<>\t"]/g,d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","	":"&nbsp; "};wysihtml5.lang.string=function(e){return e+="",{trim:function(){return e.replace(a,"").replace(b,"")},interpolate:function(a){for(var b in a)e=this.replace("#{"+b+"}").by(a[b]);return e},replace:function(a){return{by:function(b){return e.split(a).join(b)}}},escapeHTML:function(a,b){var f=e.replace(c,function(a){return d[a]});return a&&(f=f.replace(/(?:\r\n|\r|\n)/g,"<br />")),b&&(f=f.replace(/  /gi,"&nbsp; ")),f}}}}(),function(a){function b(a,b){return f(a,b)?a:(a===a.ownerDocument.documentElement&&(a=a.ownerDocument.body),g(a,b))}function c(a){return a.replace(i,function(a,b){var c,d,e=(b.match(j)||[])[1]||"",f=l[e];return b=b.replace(j,""),b.split(f).length>b.split(e).length&&(b+=e,e=""),c=b,d=b,b.length>k&&(d=d.substr(0,k)+"..."),"www."===c.substr(0,4)&&(c="http://"+c),'<a href="'+c+'">'+d+"</a>"+e})}function d(a){var b=a._wysihtml5_tempElement;return b||(b=a._wysihtml5_tempElement=a.createElement("div")),b}function e(b){var e=b.parentNode,f=a.lang.string(b.data).escapeHTML(),g=d(e.ownerDocument);for(g.innerHTML="<span></span>"+c(f),g.removeChild(g.firstChild);g.firstChild;)e.insertBefore(g.firstChild,b);e.removeChild(b)}function f(b,c){for(var d;b.parentNode;){if(b=b.parentNode,d=b.nodeName,b.className&&a.lang.array(b.className.split(" ")).contains(c))return!0;if(h.contains(d))return!0;if("body"===d)return!1}return!1}function g(b,c){if(!(h.contains(b.nodeName)||b.className&&a.lang.array(b.className.split(" ")).contains(c))){if(b.nodeType===a.TEXT_NODE&&b.data.match(i))return e(b),void 0;for(var d=a.lang.array(b.childNodes).get(),f=d.length,j=0;f>j;j++)g(d[j],c);return b}}var h=a.lang.array(["CODE","PRE","A","SCRIPT","HEAD","TITLE","STYLE"]),i=/((https?:\/\/|www\.)[^\s<]{3,})/gi,j=/([^\w\/\-](,?))$/i,k=100,l={")":"(","]":"[","}":"{"};a.dom.autoLink=b,a.dom.autoLink.URL_REG_EXP=i}(wysihtml5),function(a){var b=a.dom;b.addClass=function(a,c){var d=a.classList;return d?d.add(c):(b.hasClass(a,c)||(a.className+=" "+c),void 0)},b.removeClass=function(a,b){var c=a.classList;return c?c.remove(b):(a.className=a.className.replace(RegExp("(^|\\s+)"+b+"(\\s+|$)")," "),void 0)},b.hasClass=function(a,b){var c,d=a.classList;return d?d.contains(b):(c=a.className,c.length>0&&(c==b||RegExp("(^|\\s)"+b+"(\\s|$)").test(c)))}}(wysihtml5),wysihtml5.dom.contains=function(){var a=document.documentElement;return a.contains?function(a,b){return b.nodeType!==wysihtml5.ELEMENT_NODE&&(b=b.parentNode),a!==b&&a.contains(b)}:a.compareDocumentPosition?function(a,b){return!!(16&a.compareDocumentPosition(b))}:void 0}(),wysihtml5.dom.convertToList=function(){function a(a,b){var c=a.createElement("li");return b.appendChild(c),c}function b(a,b){return a.createElement(b)}function c(c,d,e){if("UL"===c.nodeName||"OL"===c.nodeName||"MENU"===c.nodeName)return c;var f,g,h,i,j,k,l,m,n,o=c.ownerDocument,p=b(o,d),q=c.querySelectorAll("br"),r=q.length;for(n=0;r>n;n++)for(i=q[n];(j=i.parentNode)&&j!==c&&j.lastChild===i;){if("block"===wysihtml5.dom.getStyle("display").from(j)){j.removeChild(i);break}wysihtml5.dom.insert(i).after(i.parentNode)}for(f=wysihtml5.lang.array(c.childNodes).get(),g=f.length,n=0;g>n;n++)m=m||a(o,p),h=f[n],k="block"===wysihtml5.dom.getStyle("display").from(h),l="BR"===h.nodeName,!k||e&&wysihtml5.dom.hasClass(h,e)?l?m=m.firstChild?null:m:m.appendChild(h):(m=m.firstChild?a(o,p):m,m.appendChild(h),m=null);return 0===f.length&&a(o,p),c.parentNode.replaceChild(p,c),p}return c}(),wysihtml5.dom.copyAttributes=function(a){return{from:function(b){return{to:function(c){for(var d,e=0,f=a.length;f>e;e++)d=a[e],void 0!==b[d]&&""!==b[d]&&(c[d]=b[d]);return{andTo:arguments.callee}}}}}},function(a){var b=["-webkit-box-sizing","-moz-box-sizing","-ms-box-sizing","box-sizing"],c=function(b){return d(b)?parseInt(a.getStyle("width").from(b),10)<b.offsetWidth:!1},d=function(c){for(var d=0,e=b.length;e>d;d++)if("border-box"===a.getStyle(b[d]).from(c))return b[d]};a.copyStyles=function(d){return{from:function(e){c(e)&&(d=wysihtml5.lang.array(d).without(b));for(var f,g="",h=d.length,i=0;h>i;i++)f=d[i],g+=f+":"+a.getStyle(f).from(e)+";";return{to:function(b){return a.setStyles(g).on(b),{andTo:arguments.callee}}}}}}}(wysihtml5.dom),function(a){a.dom.delegate=function(b,c,d,e){return a.dom.observe(b,d,function(d){for(var f=d.target,g=a.lang.array(b.querySelectorAll(c));f&&f!==b;){if(g.contains(f)){e.call(f,d);break}f=f.parentNode}})}}(wysihtml5),function(a){a.dom.domNode=function(b){var c=[a.ELEMENT_NODE,a.TEXT_NODE],d=function(b){return b.nodeType===a.TEXT_NODE&&/^\s*$/g.test(b.data)};return{prev:function(e){var f=b.previousSibling,g=e&&e.nodeTypes?e.nodeTypes:c;return f?!a.lang.array(g).contains(f.nodeType)||e&&e.ignoreBlankTexts&&d(f)?a.dom.domNode(f).prev(e):f:null},next:function(e){var f=b.nextSibling,g=e&&e.nodeTypes?e.nodeTypes:c;return f?!a.lang.array(g).contains(f.nodeType)||e&&e.ignoreBlankTexts&&d(f)?a.dom.domNode(f).next(e):f:null}}}}(wysihtml5),wysihtml5.dom.getAsDom=function(){var a=function(a,b){var c=b.createElement("div");c.style.display="none",b.body.appendChild(c);try{c.innerHTML=a}catch(d){}return b.body.removeChild(c),c},b=function(a){if(!a._wysihtml5_supportsHTML5Tags){for(var b=0,d=c.length;d>b;b++)a.createElement(c[b]);a._wysihtml5_supportsHTML5Tags=!0}},c=["abbr","article","aside","audio","bdi","canvas","command","datalist","details","figcaption","figure","footer","header","hgroup","keygen","mark","meter","nav","output","progress","rp","rt","ruby","svg","section","source","summary","time","track","video","wbr"];return function(c,d){d=d||document;var e;return"object"==typeof c&&c.nodeType?(e=d.createElement("div"),e.appendChild(c)):wysihtml5.browser.supportsHTML5Tags(d)?(e=d.createElement("div"),e.innerHTML=c):(b(d),e=a(c,d)),e}}(),wysihtml5.dom.getParentElement=function(){function a(a,b){return b&&b.length?"string"==typeof b?a===b:wysihtml5.lang.array(b).contains(a):!0}function b(a){return a.nodeType===wysihtml5.ELEMENT_NODE}function c(a,b,c){var d=(a.className||"").match(c)||[];return b?d[d.length-1]===b:!!d.length}function d(a,b,c){var d=(a.getAttribute("style")||"").match(c)||[];return b?d[d.length-1]===b:!!d.length}return function(e,f,g,h){var i=f.cssStyle||f.styleRegExp,j=f.className||f.classRegExp;for(g=g||50;g--&&e&&"BODY"!==e.nodeName&&(!h||e!==h);){if(b(e)&&a(e.nodeName,f.nodeName)&&(!i||d(e,f.cssStyle,f.styleRegExp))&&(!j||c(e,f.className,f.classRegExp)))return e;e=e.parentNode}return null}}(),wysihtml5.dom.getStyle=function(){function a(a){return a.replace(c,function(a){return a.charAt(1).toUpperCase()
})}var b={"float":"styleFloat"in document.createElement("div").style?"styleFloat":"cssFloat"},c=/\-[a-z]/g;return function(c){return{from:function(d){var e,f,g,h,i,j,k,l,m;if(d.nodeType===wysihtml5.ELEMENT_NODE){if(e=d.ownerDocument,f=b[c]||a(c),g=d.style,h=d.currentStyle,i=g[f],i)return i;if(h)try{return h[f]}catch(n){}return j=e.defaultView||e.parentWindow,k=("height"===c||"width"===c)&&"TEXTAREA"===d.nodeName,j.getComputedStyle?(k&&(l=g.overflow,g.overflow="hidden"),m=j.getComputedStyle(d,null).getPropertyValue(c),k&&(g.overflow=l||""),m):void 0}}}}}(),wysihtml5.dom.getTextNodes=function(a,b){var c=[];for(a=a.firstChild;a;a=a.nextSibling)3==a.nodeType?b&&/^\s*$/.test(a.innerText||a.textContent)||c.push(a):c=c.concat(wysihtml5.dom.getTextNodes(a,b));return c},wysihtml5.dom.hasElementWithTagName=function(){function a(a){return a._wysihtml5_identifier||(a._wysihtml5_identifier=c++)}var b={},c=1;return function(c,d){var e=a(c)+":"+d,f=b[e];return f||(f=b[e]=c.getElementsByTagName(d)),f.length>0}}(),function(a){function b(a){return a._wysihtml5_identifier||(a._wysihtml5_identifier=d++)}var c={},d=1;a.dom.hasElementWithClassName=function(d,e){if(!a.browser.supportsNativeGetElementsByClassName())return!!d.querySelector("."+e);var f=b(d)+":"+e,g=c[f];return g||(g=c[f]=d.getElementsByClassName(e)),g.length>0}}(wysihtml5),wysihtml5.dom.insert=function(a){return{after:function(b){b.parentNode.insertBefore(a,b.nextSibling)},before:function(b){b.parentNode.insertBefore(a,b)},into:function(b){b.appendChild(a)}}},wysihtml5.dom.insertCSS=function(a){return a=a.join("\n"),{into:function(b){var c,d,e=b.createElement("style");return e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(b.createTextNode(a)),c=b.querySelector("head link"),c?(c.parentNode.insertBefore(e,c),void 0):(d=b.querySelector("head"),d&&d.appendChild(e),void 0)}}},function(a){a.dom.lineBreaks=function(b){function c(a){return"BR"===a.nodeName}function d(b){return c(b)?!0:"block"===a.dom.getStyle("display").from(b)?!0:!1}return{add:function(){var c=b.ownerDocument,e=a.dom.domNode(b).next({ignoreBlankTexts:!0}),f=a.dom.domNode(b).prev({ignoreBlankTexts:!0});e&&!d(e)&&a.dom.insert(c.createElement("br")).after(b),f&&!d(f)&&a.dom.insert(c.createElement("br")).before(b)},remove:function(){var d=a.dom.domNode(b).next({ignoreBlankTexts:!0}),e=a.dom.domNode(b).prev({ignoreBlankTexts:!0});d&&c(d)&&d.parentNode.removeChild(d),e&&c(e)&&e.parentNode.removeChild(e)}}}}(wysihtml5),wysihtml5.dom.observe=function(a,b,c){b="string"==typeof b?[b]:b;for(var d,e,f=0,g=b.length;g>f;f++)e=b[f],a.addEventListener?a.addEventListener(e,c,!1):(d=function(b){"target"in b||(b.target=b.srcElement),b.preventDefault=b.preventDefault||function(){this.returnValue=!1},b.stopPropagation=b.stopPropagation||function(){this.cancelBubble=!0},c.call(a,b)},a.attachEvent("on"+e,d));return{stop:function(){for(var e,f=0,g=b.length;g>f;f++)e=b[f],a.removeEventListener?a.removeEventListener(e,c,!1):a.detachEvent("on"+e,d)}}},wysihtml5.dom.parse=function(a,b){function c(a,b){var c,f,g,h,i,j,k,l,m;for(wysihtml5.lang.object(t).merge(s).merge(b.rules).get(),c=b.context||a.ownerDocument||document,f=c.createDocumentFragment(),g="string"==typeof a,h=!1,b.clearInternals===!0&&(h=!0),i=g?wysihtml5.dom.getAsDom(a,c):a,t.selectors&&e(i,t.selectors);i.firstChild;)k=i.firstChild,j=d(k,b.cleanUp,h,b.uneditableClass),j&&f.appendChild(j),k!==j&&i.removeChild(k);if(b.unjoinNbsps)for(l=wysihtml5.dom.getTextNodes(f),m=l.length;m--;)l[m].nodeValue=l[m].nodeValue.replace(/([\S\u00A0])\u00A0/gi,"$1 ");return i.innerHTML="",i.appendChild(f),g?wysihtml5.quirks.getCorrectInnerHTML(i):i}function d(a,b,c,e){var f,g,h,i=a.nodeType,j=a.childNodes,k=j.length,l=p[i],m=0;if(e&&1===i&&wysihtml5.dom.hasClass(a,e))return a;if(g=l&&l(a,c),!g){if(g===!1){for(f=a.ownerDocument.createDocumentFragment(),m=k;m--;)j[m]&&(h=d(j[m],b,c,e),h&&(j[m]===h&&m--,f.insertBefore(h,f.firstChild)));return"block"===wysihtml5.dom.getStyle("display").from(a)&&f.appendChild(a.ownerDocument.createElement("br")),wysihtml5.lang.array(["div","pre","p","table","td","th","ul","ol","li","dd","dl","footer","header","section","h1","h2","h3","h4","h5","h6"]).contains(a.nodeName.toLowerCase())&&a.parentNode.lastChild!==a&&(a.nextSibling&&3===a.nextSibling.nodeType&&/^\s/.test(a.nextSibling.nodeValue)||f.appendChild(a.ownerDocument.createTextNode(" "))),f.normalize&&f.normalize(),f}return null}for(m=0;k>m;m++)j[m]&&(h=d(j[m],b,c,e),h&&(j[m]===h&&m--,g.appendChild(h)));if(b&&g.nodeName.toLowerCase()===q&&(!g.childNodes.length||/^\s*$/gi.test(g.innerHTML)&&(c||"_wysihtml5-temp-placeholder"!==a.className&&"rangySelectionBoundary"!==a.className)||!g.attributes.length)){for(f=g.ownerDocument.createDocumentFragment();g.firstChild;)f.appendChild(g.firstChild);return f.normalize&&f.normalize(),f}return g.normalize&&g.normalize(),g}function e(a,b){var c,d,e,f;for(c in b)if(b.hasOwnProperty(c))for(wysihtml5.lang.object(b[c]).isFunction()?d=b[c]:"string"==typeof b[c]&&z[b[c]]&&(d=z[b[c]]),e=a.querySelectorAll(c),f=e.length;f--;)d(e[f])}function f(a,b){var c,d,e,f=t.tags,h=a.nodeName.toLowerCase(),j=a.scopeName;if(a._wysihtml5)return null;if(a._wysihtml5=1,"wysihtml5-temp"===a.className)return null;if(j&&"HTML"!=j&&(h=j+":"+h),"outerHTML"in a&&(wysihtml5.browser.autoClosesUnclosedTags()||"P"!==a.nodeName||"</p>"===a.outerHTML.slice(-4).toLowerCase()||(h="div")),h in f){if(c=f[h],!c||c.remove)return null;if(c.unwrap)return!1;c="string"==typeof c?{rename_tag:c}:c}else{if(!a.firstChild)return null;c={rename_tag:q}}if(c.one_of_type&&!g(a,t,c.one_of_type,b)){if(!c.remove_action)return null;if("unwrap"===c.remove_action)return!1;if("rename"!==c.remove_action)return null;e=c.remove_action_rename_to||q}return d=a.ownerDocument.createElement(e||c.rename_tag||h),m(a,d,c,b),i(a,d,c),a=null,d.normalize&&d.normalize(),d}function g(a,b,c,d){var e,f;if("SPAN"===a.nodeName&&!d&&("_wysihtml5-temp-placeholder"===a.className||"rangySelectionBoundary"===a.className))return!0;for(f in c)if(c.hasOwnProperty(f)&&b.type_definitions&&b.type_definitions[f]&&(e=b.type_definitions[f],h(a,e)))return!0;return!1}function h(a,b){var c,d,e,f,g,h,i,j,k=a.getAttribute("class"),l=a.getAttribute("style");if(b.methods)for(h in b.methods)if(b.methods.hasOwnProperty(h)&&y[h]&&y[h](a))return!0;if(k&&b.classes)for(k=k.replace(/^\s+/g,"").replace(/\s+$/g,"").split(r),c=k.length,i=0;c>i;i++)if(b.classes[k[i]])return!0;if(l&&b.styles){l=l.split(";");for(d in b.styles)if(b.styles.hasOwnProperty(d))for(j=l.length;j--;)if(g=l[j].split(":"),g[0].replace(/\s/g,"").toLowerCase()===d&&(b.styles[d]===!0||1===b.styles[d]||wysihtml5.lang.array(b.styles[d]).contains(g[1].replace(/\s/g,"").toLowerCase())))return!0}if(b.attrs)for(e in b.attrs)if(b.attrs.hasOwnProperty(e)&&(f=wysihtml5.dom.getAttribute(a,e),"string"==typeof f&&f.search(b.attrs[e])>-1))return!0;return!1}function i(a,b,c){var d,e;if(c&&c.keep_styles)for(d in c.keep_styles)if(c.keep_styles.hasOwnProperty(d)){if(e="float"===d?a.style.styleFloat||a.style.cssFloat:a.style[d],c.keep_styles[d]instanceof RegExp&&!c.keep_styles[d].test(e))continue;"float"===d?b.style[a.style.styleFloat?"styleFloat":"cssFloat"]=e:a.style[d]&&(b.style[d]=e)}}function j(a,b){var c,d=[];for(c in b)b.hasOwnProperty(c)&&0===c.indexOf(a)&&d.push(c);return d}function k(a,b,c,d){var e,f=v[c];return f&&(b||"alt"===a&&"IMG"==d)&&(e=f(b),"string"==typeof e)?e:!1}function l(a,b){var c,d,e,f,g,h=wysihtml5.lang.object(t.attributes||{}).clone(),i=wysihtml5.lang.object(h).merge(wysihtml5.lang.object(b||{}).clone()).get(),l={},m=wysihtml5.dom.getAttributes(a);for(c in i)if(/\*$/.test(c))for(e=j(c.slice(0,-1),m),f=0,g=e.length;g>f;f++)d=k(e[f],m[e[f]],i[c],a.nodeName),d!==!1&&(l[e[f]]=d);else d=k(c,m[c],i[c],a.nodeName),d!==!1&&(l[c]=d);return l}function m(a,b,c,d){var e,f,g,h,i,j={},k=c.set_class,m=c.add_class,n=c.add_style,o=c.set_attributes,p=t.classes,q=0,s=[],u=[],v=[],y=[];if(o&&(j=wysihtml5.lang.object(o).clone()),j=wysihtml5.lang.object(j).merge(l(a,c.check_attributes)).get(),k&&s.push(k),m)for(h in m)i=x[m[h]],i&&(g=i(wysihtml5.dom.getAttribute(a,h)),"string"==typeof g&&s.push(g));if(n)for(h in n)i=w[n[h]],i&&(newStyle=i(wysihtml5.dom.getAttribute(a,h)),"string"==typeof newStyle&&u.push(newStyle));if("string"==typeof p&&"any"===p&&a.getAttribute("class"))if(t.classes_blacklist){for(y=a.getAttribute("class"),y&&(s=s.concat(y.split(r))),e=s.length;e>q;q++)f=s[q],t.classes_blacklist[f]||v.push(f);v.length&&(j["class"]=wysihtml5.lang.array(v).unique().join(" "))}else j["class"]=a.getAttribute("class");else{for(d||(p["_wysihtml5-temp-placeholder"]=1,p._rangySelectionBoundary=1,p["wysiwyg-tmp-selected-cell"]=1),y=a.getAttribute("class"),y&&(s=s.concat(y.split(r))),e=s.length;e>q;q++)f=s[q],p[f]&&v.push(f);v.length&&(j["class"]=wysihtml5.lang.array(v).unique().join(" "))}j["class"]&&d&&(j["class"]=j["class"].replace("wysiwyg-tmp-selected-cell",""),/^\s*$/g.test(j["class"])&&delete j["class"]),u.length&&(j.style=wysihtml5.lang.array(u).unique().join(" "));for(h in j)try{b.setAttribute(h,j[h])}catch(z){}j.src&&(void 0!==j.width&&b.setAttribute("width",j.width),void 0!==j.height&&b.setAttribute("height",j.height))}function n(a){var b,c=a.nextSibling;return c&&c.nodeType===wysihtml5.TEXT_NODE?(c.data=a.data.replace(u,"")+c.data.replace(u,""),void 0):(b=a.data.replace(u,""),a.ownerDocument.createTextNode(b))}function o(a){return t.comments?a.ownerDocument.createComment(a.nodeValue):void 0}var p={1:f,3:n,8:o},q="span",r=/\s+/,s={tags:{},classes:{}},t={},u=/\uFEFF/g,v={url:function(){var a=/^https?:\/\//i;return function(b){return b&&b.match(a)?b.replace(a,function(a){return a.toLowerCase()}):null}}(),src:function(){var a=/^(\/|https?:\/\/)/i;return function(b){return b&&b.match(a)?b.replace(a,function(a){return a.toLowerCase()}):null}}(),href:function(){var a=/^(#|\/|https?:\/\/|mailto:)/i;return function(b){return b&&b.match(a)?b.replace(a,function(a){return a.toLowerCase()}):null}}(),alt:function(){var a=/[^ a-z0-9_\-]/gi;return function(b){return b?b.replace(a,""):""}}(),numbers:function(){var a=/\D/g;return function(b){return b=(b||"").replace(a,""),b||null}}(),any:function(){return function(a){return a}}()},w={align_text:function(){var a={left:"text-align: left;",right:"text-align: right;",center:"text-align: center;"};return function(b){return a[(b+"").toLowerCase()]}}()},x={align_img:function(){var a={left:"wysiwyg-float-left",right:"wysiwyg-float-right"};return function(b){return a[(b+"").toLowerCase()]}}(),align_text:function(){var a={left:"wysiwyg-text-align-left",right:"wysiwyg-text-align-right",center:"wysiwyg-text-align-center",justify:"wysiwyg-text-align-justify"};return function(b){return a[(b+"").toLowerCase()]}}(),clear_br:function(){var a={left:"wysiwyg-clear-left",right:"wysiwyg-clear-right",both:"wysiwyg-clear-both",all:"wysiwyg-clear-both"};return function(b){return a[(b+"").toLowerCase()]}}(),size_font:function(){var a={1:"wysiwyg-font-size-xx-small",2:"wysiwyg-font-size-small",3:"wysiwyg-font-size-medium",4:"wysiwyg-font-size-large",5:"wysiwyg-font-size-x-large",6:"wysiwyg-font-size-xx-large",7:"wysiwyg-font-size-xx-large","-":"wysiwyg-font-size-smaller","+":"wysiwyg-font-size-larger"};return function(b){return a[(b+"").charAt(0)]}}()},y={has_visible_contet:function(){var a,b=["img","video","picture","br","script","noscript","style","table","iframe","object","embed","audio","svg","input","button","select","textarea","canvas"];return function(c){if(a=(c.innerText||c.textContent).replace(/\s/g,""),a&&a.length>0)return!0;for(var d=b.length;d--;)if(c.querySelector(b[d]))return!0;return c.offsetWidth&&c.offsetWidth>0&&c.offsetHeight&&c.offsetHeight>0?!0:!1}}()},z={unwrap:function(a){wysihtml5.dom.unwrap(a)},remove:function(a){a.parentNode.removeChild(a)}};return c(a,b)},wysihtml5.dom.removeEmptyTextNodes=function(a){for(var b,c=wysihtml5.lang.array(a.childNodes).get(),d=c.length,e=0;d>e;e++)b=c[e],b.nodeType===wysihtml5.TEXT_NODE&&""===b.data&&b.parentNode.removeChild(b)},wysihtml5.dom.renameElement=function(a,b){for(var c,d=a.ownerDocument.createElement(b);c=a.firstChild;)d.appendChild(c);return wysihtml5.dom.copyAttributes(["align","className"]).from(a).to(d),a.parentNode.replaceChild(d,a),d},wysihtml5.dom.replaceWithChildNodes=function(a){if(a.parentNode){if(!a.firstChild)return a.parentNode.removeChild(a),void 0;for(var b=a.ownerDocument.createDocumentFragment();a.firstChild;)b.appendChild(a.firstChild);a.parentNode.replaceChild(b,a),a=b=null}},function(a){function b(b){return"block"===a.getStyle("display").from(b)}function c(a){return"BR"===a.nodeName}function d(a){var b=a.ownerDocument.createElement("br");a.appendChild(b)}function e(a,e){if(a.nodeName.match(/^(MENU|UL|OL)$/)){var f,g,h,i,j,k,l=a.ownerDocument,m=l.createDocumentFragment(),n=wysihtml5.dom.domNode(a).prev({ignoreBlankTexts:!0});if(e)for(!n||b(n)||c(n)||d(m);k=a.firstElementChild||a.firstChild;){for(g=k.lastChild;f=k.firstChild;)h=f===g,i=h&&!b(f)&&!c(f),m.appendChild(f),i&&d(m);k.parentNode.removeChild(k)}else for(;k=a.firstElementChild||a.firstChild;){if(k.querySelector&&k.querySelector("div, p, ul, ol, menu, blockquote, h1, h2, h3, h4, h5, h6"))for(;f=k.firstChild;)m.appendChild(f);else{for(j=l.createElement("p");f=k.firstChild;)j.appendChild(f);m.appendChild(j)}k.parentNode.removeChild(k)}a.parentNode.replaceChild(m,a)}}a.resolveList=e}(wysihtml5.dom),function(a){var b=document,c=["parent","top","opener","frameElement","frames","localStorage","globalStorage","sessionStorage","indexedDB"],d=["open","close","openDialog","showModalDialog","alert","confirm","prompt","openDatabase","postMessage","XMLHttpRequest","XDomainRequest"],e=["referrer","write","open","close"];a.dom.Sandbox=Base.extend({constructor:function(b,c){this.callback=b||a.EMPTY_FUNCTION,this.config=a.lang.object({}).merge(c).get(),this.editableArea=this._createIframe()},insertInto:function(a){"string"==typeof a&&(a=b.getElementById(a)),a.appendChild(this.editableArea)},getIframe:function(){return this.editableArea},getWindow:function(){this._readyError()},getDocument:function(){this._readyError()},destroy:function(){var a=this.getIframe();a.parentNode.removeChild(a)},_readyError:function(){throw Error("wysihtml5.Sandbox: Sandbox iframe isn't loaded yet")},_createIframe:function(){var c=this,d=b.createElement("iframe");return d.className="wysihtml5-sandbox",a.dom.setAttributes({security:"restricted",allowtransparency:"true",frameborder:0,width:0,height:0,marginwidth:0,marginheight:0}).on(d),a.browser.throwsMixedContentWarningWhenIframeSrcIsEmpty()&&(d.src="javascript:'<html></html>'"),d.onload=function(){d.onreadystatechange=d.onload=null,c._onLoadIframe(d)},d.onreadystatechange=function(){/loaded|complete/.test(d.readyState)&&(d.onreadystatechange=d.onload=null,c._onLoadIframe(d))},d},_onLoadIframe:function(f){var g,h,i,j,k,l,m;if(a.dom.contains(b.documentElement,f)){if(g=this,h=f.contentWindow,i=f.contentWindow.document,j=b.characterSet||b.charset||"utf-8",k=this._getHtml({charset:j,stylesheets:this.config.stylesheets}),i.open("text/html","replace"),i.write(k),i.close(),this.getWindow=function(){return f.contentWindow},this.getDocument=function(){return f.contentWindow.document},h.onerror=function(a,b,c){throw Error("wysihtml5.Sandbox: "+a,b,c)},!a.browser.supportsSandboxedIframes()){for(l=0,m=c.length;m>l;l++)this._unset(h,c[l]);for(l=0,m=d.length;m>l;l++)this._unset(h,d[l],a.EMPTY_FUNCTION);for(l=0,m=e.length;m>l;l++)this._unset(i,e[l]);this._unset(i,"cookie","",!0)}this.loaded=!0,setTimeout(function(){g.callback(g)},0)}},_getHtml:function(b){var c,d=b.stylesheets,e="",f=0;if(d="string"==typeof d?[d]:d,d)for(c=d.length;c>f;f++)e+='<link rel="stylesheet" href="'+d[f]+'">';return b.stylesheets=e,a.lang.string('<!DOCTYPE html><html><head><meta charset="#{charset}">#{stylesheets}</head><body></body></html>').interpolate(b)},_unset:function(b,c,d,e){try{b[c]=d}catch(f){}try{b.__defineGetter__(c,function(){return d})}catch(f){}if(e)try{b.__defineSetter__(c,function(){})}catch(f){}if(!a.browser.crashesWhenDefineProperty(c))try{var g={get:function(){return d}};e&&(g.set=function(){}),Object.defineProperty(b,c,g)}catch(f){}}})}(wysihtml5),function(a){var b=document;a.dom.ContentEditableArea=Base.extend({getContentEditable:function(){return this.element},getWindow:function(){return this.element.ownerDocument.defaultView},getDocument:function(){return this.element.ownerDocument},constructor:function(b,c,d){this.callback=b||a.EMPTY_FUNCTION,this.config=a.lang.object({}).merge(c).get(),this.element=d?this._bindElement(d):this._createElement()},_createElement:function(){var a=b.createElement("div");return a.className="wysihtml5-sandbox",this._loadElement(a),a},_bindElement:function(a){return a.className=a.className&&""!=a.className?a.className+" wysihtml5-sandbox":"wysihtml5-sandbox",this._loadElement(a,!0),a},_loadElement:function(a,b){var c,d=this;b||(c=this._getHtml(),a.innerHTML=c),this.getWindow=function(){return a.ownerDocument.defaultView},this.getDocument=function(){return a.ownerDocument},this.loaded=!0,setTimeout(function(){d.callback(d)},0)},_getHtml:function(){return""}})}(wysihtml5),function(){var a={className:"class"};wysihtml5.dom.setAttributes=function(b){return{on:function(c){for(var d in b)c.setAttribute(a[d]||d,b[d])}}}}(),wysihtml5.dom.setStyles=function(a){return{on:function(b){var c,d=b.style;if("string"==typeof a)return d.cssText+=";"+a,void 0;for(c in a)"float"===c?(d.cssFloat=a[c],d.styleFloat=a[c]):d[c]=a[c]}}},function(a){a.simulatePlaceholder=function(b,c,d){var e="placeholder",f=function(){var b=c.element.offsetWidth>0&&c.element.offsetHeight>0;c.hasPlaceholderSet()&&(c.clear(),c.element.focus(),b&&setTimeout(function(){var a=c.selection.getSelection();a.focusNode&&a.anchorNode||c.selection.selectNode(c.element.firstChild||c.element)},0)),c.placeholderSet=!1,a.removeClass(c.element,e)},g=function(){c.isEmpty()&&(c.placeholderSet=!0,c.setValue(d),a.addClass(c.element,e))};b.on("set_placeholder",g).on("unset_placeholder",f).on("focus:composer",f).on("paste:composer",f).on("blur:composer",g),g()}}(wysihtml5.dom),function(a){var b=document.documentElement;"textContent"in b?(a.setTextContent=function(a,b){a.textContent=b},a.getTextContent=function(a){return a.textContent}):"innerText"in b?(a.setTextContent=function(a,b){a.innerText=b},a.getTextContent=function(a){return a.innerText}):(a.setTextContent=function(a,b){a.nodeValue=b},a.getTextContent=function(a){return a.nodeValue})}(wysihtml5.dom),wysihtml5.dom.getAttribute=function(a,b){var c,d,e,f=!wysihtml5.browser.supportsGetAttributeCorrectly();return b=b.toLowerCase(),c=a.nodeName,"IMG"==c&&"src"==b&&wysihtml5.dom.isLoadedImage(a)===!0?a.src:f&&"outerHTML"in a?(d=a.outerHTML.toLowerCase(),e=-1!=d.indexOf(" "+b+"="),e?a.getAttribute(b):null):a.getAttribute(b)},wysihtml5.dom.getAttributes=function(a){var b,c=!wysihtml5.browser.supportsGetAttributeCorrectly(),d=a.nodeName,e=[];for(b in a.attributes)(a.attributes.hasOwnProperty&&a.attributes.hasOwnProperty(b)||!a.attributes.hasOwnProperty&&Object.prototype.hasOwnProperty.call(a.attributes,b))&&a.attributes[b].specified&&("IMG"==d&&"src"==a.attributes[b].name.toLowerCase()&&wysihtml5.dom.isLoadedImage(a)===!0?e.src=a.src:wysihtml5.lang.array(["rowspan","colspan"]).contains(a.attributes[b].name.toLowerCase())&&c?1!==a.attributes[b].value&&(e[a.attributes[b].name]=a.attributes[b].value):e[a.attributes[b].name]=a.attributes[b].value);return e},wysihtml5.dom.isLoadedImage=function(a){try{return a.complete&&!a.mozMatchesSelector(":-moz-broken")}catch(b){if(a.complete&&"complete"===a.readyState)return!0}},function(a){function b(a,b){var c,d,e,f,g=[];for(d=0,e=a.length;e>d;d++)if(c=a[d].querySelectorAll(b),c)for(f=c.length;f--;g.unshift(c[f]));return g}function d(a){a.parentNode.removeChild(a)}function e(a,b){a.parentNode.insertBefore(b,a.nextSibling)}function f(a,b){for(var c=a.nextSibling;1!=c.nodeType;)if(c=c.nextSibling,!b||b==c.tagName.toLowerCase())return c;return null}var g=a.dom,h=function(a){this.el=a,this.isColspan=!1,this.isRowspan=!1,this.firstCol=!0,this.lastCol=!0,this.firstRow=!0,this.lastRow=!0,this.isReal=!0,this.spanCollection=[],this.modified=!1},i=function(a,b){a?(this.cell=a,this.table=g.getParentElement(a,{nodeName:["TABLE"]})):b&&(this.table=b,this.cell=this.table.querySelectorAll("th, td")[0])};i.prototype={addSpannedCellToMap:function(a,b,c,d,e,f){var g,i,j=[],k=c+(f?parseInt(f,10)-1:0),l=d+(e?parseInt(e,10)-1:0);for(g=c;k>=g;g++)for(void 0===b[g]&&(b[g]=[]),i=d;l>=i;i++)b[g][i]=new h(a),b[g][i].isColspan=e&&parseInt(e,10)>1,b[g][i].isRowspan=f&&parseInt(f,10)>1,b[g][i].firstCol=i==d,b[g][i].lastCol=i==l,b[g][i].firstRow=g==c,b[g][i].lastRow=g==k,b[g][i].isReal=i==d&&g==c,b[g][i].spanCollection=j,j.push(b[g][i])},setCellAsModified:function(a){if(a.modified=!0,a.spanCollection.length>0)for(var b=0,c=a.spanCollection.length;c>b;b++)a.spanCollection[b].modified=!0},setTableMap:function(){var a,b,c,d,e,f,i,j,k=[],l=this.getTableRows();for(a=0;a<l.length;a++)for(b=l[a],c=this.getRowCells(b),f=0,void 0===k[a]&&(k[a]=[]),d=0;d<c.length;d++){for(e=c[d];void 0!==k[a][f];)f++;i=g.getAttribute(e,"colspan"),j=g.getAttribute(e,"rowspan"),i||j?(this.addSpannedCellToMap(e,k,a,f,i,j),f+=i?parseInt(i,10):1):(k[a][f]=new h(e),f++)}return this.map=k,k},getRowCells:function(c){var d=this.table.querySelectorAll("table"),e=d?b(d,"th, td"):[],f=c.querySelectorAll("th, td"),g=e.length>0?a.lang.array(f).without(e):f;return g},getTableRows:function(){var c=this.table.querySelectorAll("table"),d=c?b(c,"tr"):[],e=this.table.querySelectorAll("tr"),f=d.length>0?a.lang.array(e).without(d):e;return f},getMapIndex:function(a){var b,c,d=this.map.length,e=this.map&&this.map[0]?this.map[0].length:0;for(b=0;d>b;b++)for(c=0;e>c;c++)if(this.map[b][c].el===a)return{row:b,col:c};return!1},getElementAtIndex:function(a){return this.setTableMap(),this.map[a.row]&&this.map[a.row][a.col]&&this.map[a.row][a.col].el?this.map[a.row][a.col].el:null},getMapElsTo:function(a){var b,c,d,e,f,g,h=[];if(this.setTableMap(),this.idx_start=this.getMapIndex(this.cell),this.idx_end=this.getMapIndex(a),(this.idx_start.row>this.idx_end.row||this.idx_start.row==this.idx_end.row&&this.idx_start.col>this.idx_end.col)&&(b=this.idx_start,this.idx_start=this.idx_end,this.idx_end=b),this.idx_start.col>this.idx_end.col&&(c=this.idx_start.col,this.idx_start.col=this.idx_end.col,this.idx_end.col=c),null!=this.idx_start&&null!=this.idx_end)for(d=this.idx_start.row,e=this.idx_end.row;e>=d;d++)for(f=this.idx_start.col,g=this.idx_end.col;g>=f;f++)h.push(this.map[d][f].el);return h},orderSelectionEnds:function(a){var b,c;return this.setTableMap(),this.idx_start=this.getMapIndex(this.cell),this.idx_end=this.getMapIndex(a),(this.idx_start.row>this.idx_end.row||this.idx_start.row==this.idx_end.row&&this.idx_start.col>this.idx_end.col)&&(b=this.idx_start,this.idx_start=this.idx_end,this.idx_end=b),this.idx_start.col>this.idx_end.col&&(c=this.idx_start.col,this.idx_start.col=this.idx_end.col,this.idx_end.col=c),{start:this.map[this.idx_start.row][this.idx_start.col].el,end:this.map[this.idx_end.row][this.idx_end.col].el}},createCells:function(a,b,c){var d,e,f,g=this.table.ownerDocument,h=g.createDocumentFragment();for(e=0;b>e;e++){if(d=g.createElement(a),c)for(f in c)c.hasOwnProperty(f)&&d.setAttribute(f,c[f]);d.appendChild(document.createTextNode(" ")),h.appendChild(d)}return h},correctColIndexForUnreals:function(a,b){var c,d,e=this.map[b],f=-1;for(c=0,d=a;a>c;c++)e[c].isReal&&f++;return f},getLastNewCellOnRow:function(a,b){var c,d,e,f,g=this.getRowCells(a);for(e=0,f=g.length;f>e;e++)if(c=g[e],d=this.getMapIndex(c),d===!1||void 0!==b&&d.row!=b)return c;return null},removeEmptyTable:function(){var a=this.table.querySelectorAll("td, th");return a&&0!=a.length?!1:(d(this.table),!0)},splitRowToCells:function(a){var b,c,d;a.isColspan&&(b=parseInt(g.getAttribute(a.el,"colspan")||1,10),c=a.el.tagName.toLowerCase(),b>1&&(d=this.createCells(c,b-1),e(a.el,d)),a.el.removeAttribute("colspan"))},getRealRowEl:function(a,b){var c,d,e=null,f=null;for(b=b||this.idx,c=0,d=this.map[b.row].length;d>c;c++)if(f=this.map[b.row][c],f.isReal&&(e=g.getParentElement(f.el,{nodeName:["TR"]}),e))return e;return null===e&&a&&(e=g.getParentElement(this.map[b.row][b.col].el,{nodeName:["TR"]})||null),e},injectRowAt:function(a,b,c,d,f){var h,i,j=this.getRealRowEl(!1,{row:a,col:b}),k=this.createCells(d,c);j?(h=this.correctColIndexForUnreals(b,a),h>=0?e(this.getRowCells(j)[h],k):j.insertBefore(k,j.firstChild)):(i=this.table.ownerDocument.createElement("tr"),i.appendChild(k),e(g.getParentElement(f.el,{nodeName:["TR"]}),i))},canMerge:function(a){var b,c,d,e,f,g;for(this.to=a,this.setTableMap(),this.idx_start=this.getMapIndex(this.cell),this.idx_end=this.getMapIndex(this.to),(this.idx_start.row>this.idx_end.row||this.idx_start.row==this.idx_end.row&&this.idx_start.col>this.idx_end.col)&&(b=this.idx_start,this.idx_start=this.idx_end,this.idx_end=b),this.idx_start.col>this.idx_end.col&&(c=this.idx_start.col,this.idx_start.col=this.idx_end.col,this.idx_end.col=c),d=this.idx_start.row,e=this.idx_end.row;e>=d;d++)for(f=this.idx_start.col,g=this.idx_end.col;g>=f;f++)if(this.map[d][f].isColspan||this.map[d][f].isRowspan)return!1;return!0},decreaseCellSpan:function(a,b){var c=parseInt(g.getAttribute(a.el,b),10)-1;c>=1?a.el.setAttribute(b,c):(a.el.removeAttribute(b),"colspan"==b&&(a.isColspan=!1),"rowspan"==b&&(a.isRowspan=!1),a.firstCol=!0,a.lastCol=!0,a.firstRow=!0,a.lastRow=!0,a.isReal=!0)},removeSurplusLines:function(){var a,b,c,e,f,h,i,j;if(this.setTableMap(),this.map){for(c=0,e=this.map.length;e>c;c++){for(a=this.map[c],i=!0,f=0,h=a.length;h>f;f++)if(b=a[f],!(g.getAttribute(b.el,"rowspan")&&parseInt(g.getAttribute(b.el,"rowspan"),10)>1&&b.firstRow!==!0)){i=!1;break}if(i)for(f=0;h>f;f++)this.decreaseCellSpan(a[f],"rowspan")}for(j=this.getTableRows(),c=0,e=j.length;e>c;c++)a=j[c],0==a.childNodes.length&&/^\s*$/.test(a.textContent||a.innerText)&&d(a)}},fillMissingCells:function(){var a,b,c,d=0,f=0,g=null;if(this.setTableMap(),this.map){for(d=this.map.length,a=0;d>a;a++)this.map[a].length>f&&(f=this.map[a].length);for(b=0;d>b;b++)for(c=0;f>c;c++)this.map[b]&&!this.map[b][c]&&c>0&&(this.map[b][c]=new h(this.createCells("td",1)),g=this.map[b][c-1],g&&g.el&&g.el.parent&&e(this.map[b][c-1].el,this.map[b][c].el))}},rectify:function(){return this.removeEmptyTable()?!1:(this.removeSurplusLines(),this.fillMissingCells(),!0)},unmerge:function(){var a,b,c,d,e,f;if(this.rectify()&&(this.setTableMap(),this.idx=this.getMapIndex(this.cell),this.idx)){if(a=this.map[this.idx.row][this.idx.col],b=g.getAttribute(a.el,"colspan")?parseInt(g.getAttribute(a.el,"colspan"),10):1,c=a.el.tagName.toLowerCase(),a.isRowspan){if(d=parseInt(g.getAttribute(a.el,"rowspan"),10),d>1)for(e=1,f=d-1;f>=e;e++)this.injectRowAt(this.idx.row+e,this.idx.col,b,c,a);a.el.removeAttribute("rowspan")}this.splitRowToCells(a)}},merge:function(a){var b,c,e,f,g,h;if(this.rectify())if(this.canMerge(a)){for(b=this.idx_end.row-this.idx_start.row+1,c=this.idx_end.col-this.idx_start.col+1,e=this.idx_start.row,f=this.idx_end.row;f>=e;e++)for(g=this.idx_start.col,h=this.idx_end.col;h>=g;g++)e==this.idx_start.row&&g==this.idx_start.col?(b>1&&this.map[e][g].el.setAttribute("rowspan",b),c>1&&this.map[e][g].el.setAttribute("colspan",c)):(/^\s*<br\/?>\s*$/.test(this.map[e][g].el.innerHTML.toLowerCase())||(this.map[this.idx_start.row][this.idx_start.col].el.innerHTML+=" "+this.map[e][g].el.innerHTML),d(this.map[e][g].el));this.rectify()}else window.console&&void 0},collapseCellToNextRow:function(a){var b,c,d,f=this.getMapIndex(a.el),h=f.row+1,i={row:h,col:f.col};h<this.map.length&&(b=this.getRealRowEl(!1,i),null!==b&&(c=this.correctColIndexForUnreals(i.col,i.row),c>=0?e(this.getRowCells(b)[c],a.el):(d=this.getLastNewCellOnRow(b,h),null!==d?e(d,a.el):b.insertBefore(a.el,b.firstChild)),parseInt(g.getAttribute(a.el,"rowspan"),10)>2?a.el.setAttribute("rowspan",parseInt(g.getAttribute(a.el,"rowspan"),10)-1):a.el.removeAttribute("rowspan")))},removeRowCell:function(a){a.isReal?a.isRowspan?this.collapseCellToNextRow(a):d(a.el):parseInt(g.getAttribute(a.el,"rowspan"),10)>2?a.el.setAttribute("rowspan",parseInt(g.getAttribute(a.el,"rowspan"),10)-1):a.el.removeAttribute("rowspan")},getRowElementsByCell:function(){var a,b,c,d=[];if(this.setTableMap(),this.idx=this.getMapIndex(this.cell),this.idx!==!1)for(a=this.map[this.idx.row],b=0,c=a.length;c>b;b++)a[b].isReal&&d.push(a[b].el);return d},getColumnElementsByCell:function(){var a,b,c=[];if(this.setTableMap(),this.idx=this.getMapIndex(this.cell),this.idx!==!1)for(a=0,b=this.map.length;b>a;a++)this.map[a][this.idx.col]&&this.map[a][this.idx.col].isReal&&c.push(this.map[a][this.idx.col].el);return c},removeRow:function(){var a,b,c,e=g.getParentElement(this.cell,{nodeName:["TR"]});if(e){if(this.setTableMap(),this.idx=this.getMapIndex(this.cell),this.idx!==!1)for(a=this.map[this.idx.row],b=0,c=a.length;c>b;b++)a[b].modified||(this.setCellAsModified(a[b]),this.removeRowCell(a[b]));d(e)}},removeColCell:function(a){a.isColspan?parseInt(g.getAttribute(a.el,"colspan"),10)>2?a.el.setAttribute("colspan",parseInt(g.getAttribute(a.el,"colspan"),10)-1):a.el.removeAttribute("colspan"):a.isReal&&d(a.el)},removeColumn:function(){if(this.setTableMap(),this.idx=this.getMapIndex(this.cell),this.idx!==!1)for(var a=0,b=this.map.length;b>a;a++)this.map[a][this.idx.col].modified||(this.setCellAsModified(this.map[a][this.idx.col]),this.removeColCell(this.map[a][this.idx.col]))},remove:function(a){if(this.rectify()){switch(a){case"row":this.removeRow();break;case"column":this.removeColumn()}this.rectify()}},addRow:function(a){var b,c,d,f,h,i=this.table.ownerDocument;if(this.setTableMap(),this.idx=this.getMapIndex(this.cell),"below"==a&&g.getAttribute(this.cell,"rowspan")&&(this.idx.row=this.idx.row+parseInt(g.getAttribute(this.cell,"rowspan"),10)-1),this.idx!==!1){for(b=this.map[this.idx.row],c=i.createElement("tr"),d=0,f=b.length;f>d;d++)b[d].modified||(this.setCellAsModified(b[d]),this.addRowCell(b[d],c,a));switch(a){case"below":e(this.getRealRowEl(!0),c);break;case"above":h=g.getParentElement(this.map[this.idx.row][this.idx.col].el,{nodeName:["TR"]}),h&&h.parentNode.insertBefore(c,h)}}},addRowCell:function(a,b,d){var e=a.isColspan?{colspan:g.getAttribute(a.el,"colspan")}:null;a.isReal?"above"!=d&&a.isRowspan?a.el.setAttribute("rowspan",parseInt(g.getAttribute(a.el,"rowspan"),10)+1):b.appendChild(this.createCells("td",1,e)):"above"!=d&&a.isRowspan&&a.lastRow?b.appendChild(this.createCells("td",1,e)):c.isRowspan&&a.el.attr("rowspan",parseInt(g.getAttribute(a.el,"rowspan"),10)+1)},add:function(a){this.rectify()&&(("below"==a||"above"==a)&&this.addRow(a),("before"==a||"after"==a)&&this.addColumn(a))},addColCell:function(a,b,d){var f,h=a.el.tagName.toLowerCase();switch(d){case"before":f=!a.isColspan||a.firstCol;break;case"after":f=!a.isColspan||a.lastCol||a.isColspan&&c.el==this.cell}if(f){switch(d){case"before":a.el.parentNode.insertBefore(this.createCells(h,1),a.el);break;case"after":e(a.el,this.createCells(h,1))}a.isRowspan&&this.handleCellAddWithRowspan(a,b+1,d)}else a.el.setAttribute("colspan",parseInt(g.getAttribute(a.el,"colspan"),10)+1)},addColumn:function(a){var b,c,d,e;if(this.setTableMap(),this.idx=this.getMapIndex(this.cell),"after"==a&&g.getAttribute(this.cell,"colspan")&&(this.idx.col=this.idx.col+parseInt(g.getAttribute(this.cell,"colspan"),10)-1),this.idx!==!1)for(d=0,e=this.map.length;e>d;d++)b=this.map[d],b[this.idx.col]&&(c=b[this.idx.col],c.modified||(this.setCellAsModified(c),this.addColCell(c,d,a)))},handleCellAddWithRowspan:function(a,b,c){var d,h,i,j,k=parseInt(g.getAttribute(this.cell,"rowspan"),10)-1,l=g.getParentElement(a.el,{nodeName:["TR"]}),m=a.el.tagName.toLowerCase(),n=this.table.ownerDocument;for(j=0;k>j;j++)if(d=this.correctColIndexForUnreals(this.idx.col,b+j),l=f(l,"tr"),l)if(d>0)switch(c){case"before":h=this.getRowCells(l),d>0&&this.map[b+j][this.idx.col].el!=h[d]&&d==h.length-1?e(h[d],this.createCells(m,1)):h[d].parentNode.insertBefore(this.createCells(m,1),h[d]);
break;case"after":e(this.getRowCells(l)[d],this.createCells(m,1))}else l.insertBefore(this.createCells(m,1),l.firstChild);else i=n.createElement("tr"),i.appendChild(this.createCells(m,1)),this.table.appendChild(i)}},g.table={getCellsBetween:function(a,b){var c=new i(a);return c.getMapElsTo(b)},addCells:function(a,b){var c=new i(a);c.add(b)},removeCells:function(a,b){var c=new i(a);c.remove(b)},mergeCellsBetween:function(a,b){var c=new i(a);c.merge(b)},unmergeCell:function(a){var b=new i(a);b.unmerge()},orderSelectionEnds:function(a,b){var c=new i(a);return c.orderSelectionEnds(b)},indexOf:function(a){var b=new i(a);return b.setTableMap(),b.getMapIndex(a)},findCell:function(a,b){var c=new i(null,a);return c.getElementAtIndex(b)},findRowByCell:function(a){var b=new i(a);return b.getRowElementsByCell()},findColumnByCell:function(a){var b=new i(a);return b.getColumnElementsByCell()},canMerge:function(a,b){var c=new i(a);return c.canMerge(b)}}}(wysihtml5),wysihtml5.dom.query=function(a,b){var c,d,e,f,g=[];for(a.nodeType&&(a=[a]),d=0,e=a.length;e>d;d++)if(c=a[d].querySelectorAll(b),c)for(f=c.length;f--;g.unshift(c[f]));return g},wysihtml5.dom.compareDocumentPosition=function(){var a=document.documentElement;return a.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)}:function(a,b){var c,d,e,f,g,h,i,j,k;if(c=9===a.nodeType?a:a.ownerDocument,d=9===b.nodeType?b:b.ownerDocument,a===b)return 0;if(a===b.ownerDocument)return 20;if(a.ownerDocument===b)return 10;if(c!==d)return 1;if(2===a.nodeType&&a.childNodes&&-1!==wysihtml5.lang.array(a.childNodes).indexOf(b))return 20;if(2===b.nodeType&&b.childNodes&&-1!==wysihtml5.lang.array(b.childNodes).indexOf(a))return 10;for(e=a,f=[],g=null;e;){if(e==b)return 10;f.push(e),e=e.parentNode}for(e=b,g=null;e;){if(e==a)return 20;if(h=wysihtml5.lang.array(f).indexOf(e),-1!==h)return i=f[h],j=wysihtml5.lang.array(i.childNodes).indexOf(f[h-1]),k=wysihtml5.lang.array(i.childNodes).indexOf(g),j>k?2:4;g=e,e=e.parentNode}return 1}}(),wysihtml5.dom.unwrap=function(a){if(a.parentNode){for(;a.lastChild;)wysihtml5.dom.insert(a.lastChild).after(a);a.parentNode.removeChild(a)}},wysihtml5.dom.getPastedHtml=function(a){var b;return a.clipboardData&&(wysihtml5.lang.array(a.clipboardData.types).contains("text/html")?b=a.clipboardData.getData("text/html"):wysihtml5.lang.array(a.clipboardData.types).contains("text/plain")&&(b=wysihtml5.lang.string(a.clipboardData.getData("text/plain")).escapeHTML(!0,!0))),b},wysihtml5.dom.getPastedHtmlWithDiv=function(a,b){var c=a.selection.getBookmark(),d=a.element.ownerDocument,e=d.createElement("DIV");d.body.appendChild(e),e.style.width="1px",e.style.height="1px",e.style.overflow="hidden",e.setAttribute("contenteditable","true"),e.focus(),setTimeout(function(){a.selection.setBookmark(c),b(e.innerHTML),e.parentNode.removeChild(e)},0)},wysihtml5.quirks.cleanPastedHTML=function(){var a=function(a){var b=wysihtml5.lang.string(a).trim(),c=b.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");return RegExp("^((?!^"+c+"$).)*$","i")},b=function(b,c){var d,e,f=wysihtml5.lang.object(b).clone(!0);for(d in f.tags)if(f.tags.hasOwnProperty(d)&&f.tags[d].keep_styles)for(e in f.tags[d].keep_styles)f.tags[d].keep_styles.hasOwnProperty(e)&&c[e]&&(f.tags[d].keep_styles[e]=a(c[e]));return f},c=function(a,b){var c,d,e;if(!a)return null;for(d=0,e=a.length;e>d;d++)if(a[d].condition||(c=a[d].set),a[d].condition&&a[d].condition.test(b))return a[d].set;return c};return function(a,d){var e,f={color:wysihtml5.dom.getStyle("color").from(d.referenceNode),fontSize:wysihtml5.dom.getStyle("font-size").from(d.referenceNode)},g=b(c(d.rules,a)||{},f);return e=wysihtml5.dom.parse(a,{rules:g,cleanUp:!0,context:d.referenceNode.ownerDocument,uneditableClass:d.uneditableClass,clearInternals:!0,unjoinNbsps:!0}),e}}(),wysihtml5.quirks.ensureProperClearing=function(){var a=function(){var a=this;setTimeout(function(){var b=a.innerHTML.toLowerCase();("<p>&nbsp;</p>"==b||"<p>&nbsp;</p><p>&nbsp;</p>"==b)&&(a.innerHTML="")},0)};return function(b){wysihtml5.dom.observe(b.element,["cut","keydown"],a)}}(),function(a){var b="%7E";a.quirks.getCorrectInnerHTML=function(c){var d,e,f,g,h,i=c.innerHTML;if(-1===i.indexOf(b))return i;for(d=c.querySelectorAll("[href*='~'], [src*='~']"),h=0,g=d.length;g>h;h++)e=d[h].href||d[h].src,f=a.lang.string(e).replace("~").by(b),i=a.lang.string(i).replace(f).by(e);return i}}(wysihtml5),function(a){var b="wysihtml5-quirks-redraw";a.quirks.redraw=function(c){a.dom.addClass(c,b),a.dom.removeClass(c,b);try{var d=c.ownerDocument;d.execCommand("italic",!1,null),d.execCommand("italic",!1,null)}catch(e){}}}(wysihtml5),wysihtml5.quirks.tableCellsSelection=function(a,b){function c(){return k.observe(a,"mousedown",function(a){var b=wysihtml5.dom.getParentElement(a.target,{nodeName:["TD","TH"]});b&&d(b)}),l}function d(c){l.start=c,l.end=c,l.cells=[c],l.table=k.getParentElement(l.start,{nodeName:["TABLE"]}),l.table&&(e(),k.addClass(c,m),n=k.observe(a,"mousemove",g),o=k.observe(a,"mouseup",h),b.fire("tableselectstart").fire("tableselectstart:composer"))}function e(){var b,c;if(a&&(b=a.querySelectorAll("."+m),b.length>0))for(c=0;c<b.length;c++)k.removeClass(b[c],m)}function f(a){for(var b=0;b<a.length;b++)k.addClass(a[b],m)}function g(a){var c,d=null,g=k.getParentElement(a.target,{nodeName:["TD","TH"]});g&&l.table&&l.start&&(d=k.getParentElement(g,{nodeName:["TABLE"]}),d&&d===l.table&&(e(),c=l.end,l.end=g,l.cells=k.table.getCellsBetween(l.start,g),l.cells.length>1&&b.composer.selection.deselect(),f(l.cells),l.end!==c&&b.fire("tableselectchange").fire("tableselectchange:composer")))}function h(){n.stop(),o.stop(),b.fire("tableselect").fire("tableselect:composer"),setTimeout(function(){i()},0)}function i(){var c=k.observe(a.ownerDocument,"click",function(a){c.stop(),k.getParentElement(a.target,{nodeName:["TABLE"]})!=l.table&&(e(),l.table=null,l.start=null,l.end=null,b.fire("tableunselect").fire("tableunselect:composer"))})}function j(a,c){l.start=a,l.end=c,l.table=k.getParentElement(l.start,{nodeName:["TABLE"]}),selectedCells=k.table.getCellsBetween(l.start,l.end),f(selectedCells),i(),b.fire("tableselect").fire("tableselect:composer")}var k=wysihtml5.dom,l={table:null,start:null,end:null,cells:null,select:j},m="wysiwyg-tmp-selected-cell",n=null,o=null;return c()},function(a){var b=/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d\.]+)\s*\)/i,c=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i,d=/^#([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])/i,e=/^#([0-9a-f])([0-9a-f])([0-9a-f])/i,f=function(a){return RegExp("(^|\\s|;)"+a+"\\s*:\\s*[^;$]+","gi")};a.quirks.styleParser={parseColor:function(g,h){var i,j,k,l=f(h),m=g.match(l),n=10;if(m){for(k=m.length;k--;)m[k]=a.lang.string(m[k].split(":")[1]).trim();if(i=m[m.length-1],b.test(i))j=i.match(b);else if(c.test(i))j=i.match(c);else if(d.test(i))j=i.match(d),n=16;else if(e.test(i))return j=i.match(e),j.shift(),j.push(1),a.lang.array(j).map(function(a,b){return 3>b?16*parseInt(a,16)+parseInt(a,16):parseFloat(a)});if(j)return j.shift(),j[3]||j.push(1),a.lang.array(j).map(function(a,b){return 3>b?parseInt(a,n):parseFloat(a)})}return!1},unparseColor:function(a,b){if(b){if("hex"==b)return a[0].toString(16).toUpperCase()+a[1].toString(16).toUpperCase()+a[2].toString(16).toUpperCase();if("hash"==b)return"#"+a[0].toString(16).toUpperCase()+a[1].toString(16).toUpperCase()+a[2].toString(16).toUpperCase();if("rgb"==b)return"rgb("+a[0]+","+a[1]+","+a[2]+")";if("rgba"==b)return"rgba("+a[0]+","+a[1]+","+a[2]+","+a[3]+")";if("csv"==b)return a[0]+","+a[1]+","+a[2]+","+a[3]}return a[3]&&1!==a[3]?"rgba("+a[0]+","+a[1]+","+a[2]+","+a[3]+")":"rgb("+a[0]+","+a[1]+","+a[2]+")"},parseFontSize:function(b){var c=b.match(f("font-size"));return c?a.lang.string(c[c.length-1].split(":")[1]).trim():!1}}}(wysihtml5),function(a){function b(a){var b=0;if(a.parentNode)do b+=a.offsetTop||0,a=a.offsetParent;while(a);return b}function c(a,b){for(var c=0;b!==a;)if(c++,b=b.parentNode,!b)throw Error("not a descendant of ancestor!");return c}function d(a){if(!a.canSurroundContents())for(var b=a.commonAncestorContainer,d=c(b,a.startContainer),e=c(b,a.endContainer);!a.canSurroundContents();)d>e?(a.setStartBefore(a.startContainer),d=c(b,a.startContainer)):(a.setEndAfter(a.endContainer),e=c(b,a.endContainer))}var e=a.dom;a.Selection=Base.extend({constructor:function(a,b,c){window.rangy.init(),this.editor=a,this.composer=a.composer,this.doc=this.composer.doc,this.contain=b,this.unselectableClass=c||!1},getBookmark:function(){var a=this.getRange();return a&&d(a),a&&a.cloneRange()},setBookmark:function(a){a&&this.setSelection(a)},setBefore:function(a){var b=rangy.createRange(this.doc);return b.setStartBefore(a),b.setEndBefore(a),this.setSelection(b)},setAfter:function(a){var b=rangy.createRange(this.doc);return b.setStartAfter(a),b.setEndAfter(a),this.setSelection(b)},selectNode:function(b,c){var d=rangy.createRange(this.doc),f=b.nodeType===a.ELEMENT_NODE,g="canHaveHTML"in b?b.canHaveHTML:"IMG"!==b.nodeName,h=f?b.innerHTML:b.data,i=""===h||h===a.INVISIBLE_SPACE,j=e.getStyle("display").from(b),k="block"===j||"list-item"===j;if(i&&f&&g&&!c)try{b.innerHTML=a.INVISIBLE_SPACE}catch(l){}g?d.selectNodeContents(b):d.selectNode(b),g&&i&&f?d.collapse(k):g&&i&&(d.setStartAfter(b),d.setEndAfter(b)),this.setSelection(d)},getSelectedNode:function(a){var b,c;return a&&this.doc.selection&&"Control"===this.doc.selection.type&&(c=this.doc.selection.createRange(),c&&c.length)?c.item(0):(b=this.getSelection(this.doc),b.focusNode===b.anchorNode?b.focusNode:(c=this.getRange(this.doc),c?c.commonAncestorContainer:this.doc.body))},fixSelBorders:function(){var a=this.getRange();d(a),this.setSelection(a)},getSelectedOwnNodes:function(){var a,b,c=this.getOwnRanges(),d=[];for(a=0,b=c.length;b>a;a++)d.push(c[a].commonAncestorContainer||this.doc.body);return d},findNodesInSelection:function(b){var c,d,e,f=this.getOwnRanges(),g=[];for(d=0,e=f.length;e>d;d++)c=f[d].getNodes([1],function(c){return a.lang.array(b).contains(c.nodeName)}),g=g.concat(c);return g},containsUneditable:function(){var a,b,c=this.getOwnUneditables(),d=this.getSelection();for(a=0,b=c.length;b>a;a++)if(d.containsNode(c[a]))return!0;return!1},deleteContents:function(){var a,b=this.getOwnRanges();for(a=b.length;a--;)b[a].deleteContents();this.setSelection(b[0])},getPreviousNode:function(b,c){var d,e,f;return b||(d=this.getSelection(),b=d.anchorNode),b===this.contain?!1:(e=b.previousSibling,e===this.contain?!1:(e&&3!==e.nodeType&&1!==e.nodeType?e=this.getPreviousNode(e,c):e&&3===e.nodeType&&/^\s*$/.test(e.textContent)?e=this.getPreviousNode(e,c):c&&e&&1===e.nodeType&&!a.lang.array(["BR","HR","IMG"]).contains(e.nodeName)&&/^[\s]*$/.test(e.innerHTML)?e=this.getPreviousNode(e,c):e||b===this.contain||(f=b.parentNode,f!==this.contain&&(e=this.getPreviousNode(f,c))),e!==this.contain?e:!1))},getSelectionParentsByTag:function(){var b,c,d,e=this.getSelectedOwnNodes(),f=[];for(c=0,d=e.length;d>c;c++)b=e[c].nodeName&&"LI"===e[c].nodeName?e[c]:a.dom.getParentElement(e[c],{nodeName:["LI"]},!1,this.contain),b&&f.push(b);return f.length?f:null},getRangeToNodeEnd:function(){if(this.isCollapsed()){var a=this.getRange(),b=a.startContainer,c=a.startOffset,d=rangy.createRange(this.doc);return d.selectNodeContents(b),d.setStart(b,c),d}},caretIsLastInSelection:function(){var a=(rangy.createRange(this.doc),this.getSelection(),this.getRangeToNodeEnd().cloneContents()),b=a.textContent;return/^\s*$/.test(b)},caretIsFirstInSelection:function(){var b=rangy.createRange(this.doc),c=this.getSelection(),d=this.getRange(),e=d.startContainer;return e.nodeType===a.TEXT_NODE?this.isCollapsed()&&e.nodeType===a.TEXT_NODE&&/^\s*$/.test(e.data.substr(0,d.startOffset)):(b.selectNodeContents(this.getRange().commonAncestorContainer),b.collapse(!0),this.isCollapsed()&&(b.startContainer===c.anchorNode||b.endContainer===c.anchorNode)&&b.startOffset===c.anchorOffset)},caretIsInTheBeginnig:function(b){var c=this.getSelection(),d=c.anchorNode,e=c.anchorOffset;return b?0===e&&(d.nodeName&&d.nodeName===b.toUpperCase()||a.dom.getParentElement(d.parentNode,{nodeName:b},1)):0===e&&!this.getPreviousNode(d,!0)},caretIsBeforeUneditable:function(){var a,b,c,d,e=this.getSelection(),f=e.anchorNode,g=e.anchorOffset;if(0===g&&(a=this.getPreviousNode(f,!0),a))for(b=this.getOwnUneditables(),c=0,d=b.length;d>c;c++)if(a===b[c])return b[c];return!1},executeAndRestoreRangy:function(a){var b=this.doc.defaultView||this.doc.parentWindow,c=rangy.saveSelection(b);if(c)try{a()}catch(d){setTimeout(function(){throw d},0)}else a();rangy.restoreSelection(c)},executeAndRestore:function(b,c){var d,f,g,h,i,j,k,l,m,n=this.doc.body,o=c&&n.scrollTop,p=c&&n.scrollLeft,q="_wysihtml5-temp-placeholder",r='<span class="'+q+'">'+a.INVISIBLE_SPACE+"</span>",s=this.getRange(!0);if(!s)return b(n,n),void 0;s.collapsed||(k=s.cloneRange(),j=k.createContextualFragment(r),k.collapse(!1),k.insertNode(j),k.detach()),i=s.createContextualFragment(r),s.insertNode(i),j&&(d=this.contain.querySelectorAll("."+q),s.setStartBefore(d[0]),s.setEndAfter(d[d.length-1])),this.setSelection(s);try{b(s.startContainer,s.endContainer)}catch(t){setTimeout(function(){throw t},0)}if(d=this.contain.querySelectorAll("."+q),d&&d.length)for(l=rangy.createRange(this.doc),g=d[0].nextSibling,d.length>1&&(h=d[d.length-1].previousSibling),h&&g?(l.setStartBefore(g),l.setEndAfter(h)):(f=this.doc.createTextNode(a.INVISIBLE_SPACE),e.insert(f).after(d[0]),l.setStartBefore(f),l.setEndAfter(f)),this.setSelection(l),m=d.length;m--;)d[m].parentNode.removeChild(d[m]);else this.contain.focus();c&&(n.scrollTop=o,n.scrollLeft=p);try{d.parentNode.removeChild(d)}catch(u){}},set:function(a,b){var c=rangy.createRange(this.doc);c.setStart(a,b||0),this.setSelection(c)},insertHTML:function(a){var b,c=(rangy.createRange(this.doc),this.doc.createElement("DIV")),d=this.doc.createDocumentFragment();for(c.innerHTML=a,b=c.lastChild;c.firstChild;)d.appendChild(c.firstChild);this.insertNode(d),b&&this.setAfter(b)},insertNode:function(a){var b=this.getRange();b&&b.insertNode(a)},surround:function(a){var b,c,d=this.getOwnRanges(),e=[];if(0==d.length)return e;for(c=d.length;c--;){b=this.doc.createElement(a.nodeName),e.push(b),a.className&&(b.className=a.className),a.cssStyle&&b.setAttribute("style",a.cssStyle);try{d[c].surroundContents(b),this.selectNode(b)}catch(f){b.appendChild(d[c].extractContents()),d[c].insertNode(b)}}return e},deblockAndSurround:function(b){var c,d,e,f=this.doc.createElement("div"),g=rangy.createRange(this.doc);if(f.className=b.className,this.composer.commands.exec("formatBlock",b.nodeName,b.className),c=this.contain.querySelectorAll("."+b.className),c[0])for(c[0].parentNode.insertBefore(f,c[0]),g.setStartBefore(c[0]),g.setEndAfter(c[c.length-1]),d=g.extractContents();d.firstChild;)if(e=d.firstChild,1==e.nodeType&&a.dom.hasClass(e,b.className)){for(;e.firstChild;)f.appendChild(e.firstChild);"BR"!==e.nodeName&&f.appendChild(this.doc.createElement("br")),d.removeChild(e)}else f.appendChild(e);else f=null;return f},scrollIntoView:function(){var c,d=this.doc,e=5,f=d.documentElement.scrollHeight>d.documentElement.offsetHeight,g=d._wysihtml5ScrollIntoViewElement=d._wysihtml5ScrollIntoViewElement||function(){var b=d.createElement("span");return b.innerHTML=a.INVISIBLE_SPACE,b}();f&&(this.insertNode(g),c=b(g),g.parentNode.removeChild(g),c>=d.body.scrollTop+d.documentElement.offsetHeight-e&&(d.body.scrollTop=c))},selectLine:function(){a.browser.supportsSelectionModify()?this._selectLine_W3C():this.doc.selection&&this._selectLine_MSIE()},_selectLine_W3C:function(){var a=this.doc.defaultView,b=a.getSelection();b.modify("move","left","lineboundary"),b.modify("extend","right","lineboundary")},_selectLine_MSIE:function(){var a,b,c,d,e,f=this.doc.selection.createRange(),g=f.boundingTop,h=this.doc.body.scrollWidth;if(f.moveToPoint){for(0===g&&(c=this.doc.createElement("span"),this.insertNode(c),g=c.offsetTop,c.parentNode.removeChild(c)),g+=1,d=-10;h>d;d+=2)try{f.moveToPoint(d,g);break}catch(i){}for(a=g,b=this.doc.selection.createRange(),e=h;e>=0;e--)try{b.moveToPoint(e,a);break}catch(j){}f.setEndPoint("EndToEnd",b),f.select()}},getText:function(){var a=this.getSelection();return a?""+a:""},getNodes:function(a,b){var c=this.getRange();return c?c.getNodes([a],b):[]},fixRangeOverflow:function(a){var b,c;this.contain&&this.contain.firstChild&&a&&(b=a.compareNode(this.contain),2!==b?(1===b&&a.setStartBefore(this.contain.firstChild),0===b&&a.setEndAfter(this.contain.lastChild),3===b&&(a.setStartBefore(this.contain.firstChild),a.setEndAfter(this.contain.lastChild))):this._detectInlineRangeProblems(a)&&(c=a.endContainer.previousElementSibling,c&&a.setEnd(c,this._endOffsetForNode(c))))},_endOffsetForNode:function(a){var b=document.createRange();return b.selectNodeContents(a),b.endOffset},_detectInlineRangeProblems:function(a){var b=e.compareDocumentPosition(a.startContainer,a.endContainer);return 0==a.endOffset&&4&b},getRange:function(a){var b=this.getSelection(),c=b&&b.rangeCount&&b.getRangeAt(0);return a!==!0&&this.fixRangeOverflow(c),c},getOwnUneditables:function(){var b=e.query(this.contain,"."+this.unselectableClass),c=e.query(b,"."+this.unselectableClass);return a.lang.array(b).without(c)},getOwnRanges:function(){var a,b,c,d,e,f,g,h=[],i=this.getRange();if(i&&h.push(i),this.unselectableClass&&this.contain&&i&&(b=this.getOwnUneditables(),b.length>0))for(d=0,e=b.length;e>d;d++)for(a=[],f=0,g=h.length;g>f;f++){if(h[f])switch(h[f].compareNode(b[d])){case 2:break;case 3:c=h[f].cloneRange(),c.setEndBefore(b[d]),a.push(c),c=h[f].cloneRange(),c.setStartAfter(b[d]),a.push(c);break;default:a.push(h[f])}h=a}return h},getSelection:function(){return rangy.getSelection(this.doc.defaultView||this.doc.parentWindow)},setSelection:function(a){var b=this.doc.defaultView||this.doc.parentWindow,c=rangy.getSelection(b);return c.setSingleRange(a)},createRange:function(){return rangy.createRange(this.doc)},isCollapsed:function(){return this.getSelection().isCollapsed},getHtml:function(){return this.getSelection().toHtml()},isEndToEndInNode:function(b){var c=this.getRange(),d=c.commonAncestorContainer,e=c.startContainer,f=c.endContainer;if(d.nodeType===a.TEXT_NODE&&(d=d.parentNode),e.nodeType===a.TEXT_NODE&&!/^\s*$/.test(e.data.substr(c.startOffset)))return!1;if(f.nodeType===a.TEXT_NODE&&!/^\s*$/.test(f.data.substr(c.endOffset)))return!1;for(;e&&e!==d;){if(e.nodeType!==a.TEXT_NODE&&!a.dom.contains(d,e))return!1;if(a.dom.domNode(e).prev({ignoreBlankTexts:!0}))return!1;e=e.parentNode}for(;f&&f!==d;){if(f.nodeType!==a.TEXT_NODE&&!a.dom.contains(d,f))return!1;if(a.dom.domNode(f).next({ignoreBlankTexts:!0}))return!1;f=f.parentNode}return a.lang.array(b).contains(d.nodeName)?d:!1},deselect:function(){var a=this.getSelection();a&&a.removeAllRanges()}})}(wysihtml5),function(a,b){function c(a,b,c){if(!a.className)return!1;var d=a.className.match(c)||[];return d[d.length-1]===b}function d(a,b){if(!a.getAttribute||!a.getAttribute("style"))return!1;a.getAttribute("style").match(b);return a.getAttribute("style").match(b)?!0:!1}function e(a,b,c){a.getAttribute("style")?(h(a,c),a.getAttribute("style")&&!/^\s*$/.test(a.getAttribute("style"))?a.setAttribute("style",b+";"+a.getAttribute("style")):a.setAttribute("style",b)):a.setAttribute("style",b)}function f(a,b,c){a.className?(g(a,c),a.className+=" "+b):a.className=b}function g(a,b){a.className&&(a.className=a.className.replace(b,""))}function h(a,b){var c,d,e=[];if(a.getAttribute("style")){for(c=a.getAttribute("style").split(";"),d=c.length;d--;)c[d].match(b)||/^\s*$/.test(c[d])||e.push(c[d]);e.length?a.setAttribute("style",e.join(";")):a.removeAttribute("style")}}function i(a,b){var c,d,e,f=[],g=b.split(";"),h=a.getAttribute("style");if(h){for(h=h.replace(/\s/gi,"").toLowerCase(),f.push(RegExp("(^|\\s|;)"+b.replace(/\s/gi,"").replace(/([\(\)])/gi,"\\$1").toLowerCase().replace(";",";?").replace(/rgb\\\((\d+),(\d+),(\d+)\\\)/gi,"\\s?rgb\\($1,\\s?$2,\\s?$3\\)"),"gi")),c=g.length;c-->0;)/^\s*$/.test(g[c])||f.push(RegExp("(^|\\s|;)"+g[c].replace(/\s/gi,"").replace(/([\(\)])/gi,"\\$1").toLowerCase().replace(";",";?").replace(/rgb\\\((\d+),(\d+),(\d+)\\\)/gi,"\\s?rgb\\($1,\\s?$2,\\s?$3\\)"),"gi"));for(d=0,e=f.length;e>d;d++)if(h.match(f[d]))return f[d]}return!1}function j(c,d,e,f){return e?i(c,e):f?a.dom.hasClass(c,f):b.dom.arrayContains(d,c.tagName.toLowerCase())}function k(a,b,c,d){for(var e=a.length;e--;)if(!j(a[e],b,c,d))return!1;return a.length?!0:!1}function l(a,b,c){var d=i(a,b);return d?(h(a,d),"remove"):(e(a,b,c),"change")}function m(a,b){return a.className.replace(u," ")==b.className.replace(u," ")}function n(a){for(var b=a.parentNode;a.firstChild;)b.insertBefore(a.firstChild,a);b.removeChild(a)}function o(a,b){if(a.attributes.length!=b.attributes.length)return!1;for(var c,d,e,f=0,g=a.attributes.length;g>f;++f)if(c=a.attributes[f],e=c.name,"class"!=e){if(d=b.attributes.getNamedItem(e),c.specified!=d.specified)return!1;if(c.specified&&c.nodeValue!==d.nodeValue)return!1}return!0}function p(a,c){return b.dom.isCharacterDataNode(a)?0==c?!!a.previousSibling:c==a.length?!!a.nextSibling:!0:c>0&&c<a.childNodes.length}function q(a,c,d,e){var f,g;if(b.dom.isCharacterDataNode(c)&&(0==d?(d=b.dom.getNodeIndex(c),c=c.parentNode):d==c.length?(d=b.dom.getNodeIndex(c)+1,c=c.parentNode):f=b.dom.splitDataNode(c,d)),!(f||e&&c===e)){for(f=c.cloneNode(!1),f.id&&f.removeAttribute("id");g=c.childNodes[d];)f.appendChild(g);b.dom.insertAfter(f,c)}return c==a?f:q(a,f.parentNode,b.dom.getNodeIndex(f),e)}function r(b){this.isElementMerge=b.nodeType==a.ELEMENT_NODE,this.firstTextNode=this.isElementMerge?b.lastChild:b,this.textNodes=[this.firstTextNode]}function s(a,b,c,d,e,f,g){this.tagNames=a||[t],this.cssClass=b||(b===!1?!1:""),this.similarClassRegExp=c,this.cssStyle=e||"",this.similarStyleRegExp=f,this.normalize=d,this.applyToAnyTagName=!1,this.container=g}var t="span",u=/\s+/g;r.prototype={doMerge:function(){var a,b,c,d,e,f=[];for(d=0,e=this.textNodes.length;e>d;++d)a=this.textNodes[d],b=a.parentNode,f[d]=a.data,d&&(b.removeChild(a),b.hasChildNodes()||b.parentNode.removeChild(b));return this.firstTextNode.data=c=f.join(""),c},getLength:function(){for(var a=this.textNodes.length,b=0;a--;)b+=this.textNodes[a].length;return b},toString:function(){var a,b,c=[];for(a=0,b=this.textNodes.length;b>a;++a)c[a]="'"+this.textNodes[a].data+"'";return"[Merge("+c.join(",")+")]"}},s.prototype={getAncestorWithClass:function(d){for(var e;d;){if(e=this.cssClass?c(d,this.cssClass,this.similarClassRegExp):""!==this.cssStyle?!1:!0,d.nodeType==a.ELEMENT_NODE&&"false"!=d.getAttribute("contenteditable")&&b.dom.arrayContains(this.tagNames,d.tagName.toLowerCase())&&e)return d;d=d.parentNode}return!1},getAncestorWithStyle:function(c){for(var e;c;){if(e=this.cssStyle?d(c,this.similarStyleRegExp):!1,c.nodeType==a.ELEMENT_NODE&&"false"!=c.getAttribute("contenteditable")&&b.dom.arrayContains(this.tagNames,c.tagName.toLowerCase())&&e)return c;c=c.parentNode}return!1},getMatchingAncestor:function(a){var b=this.getAncestorWithClass(a),c=!1;return b?this.cssStyle&&(c="class"):(b=this.getAncestorWithStyle(a),b&&(c="style")),{element:b,type:c}},postApply:function(a,b){var c,d,e,f,g,h,i=a[0],j=a[a.length-1],k=[],l=i,m=j,n=0,o=j.length;for(f=0,g=a.length;g>f;++f)d=a[f],e=null,d&&d.parentNode&&(e=this.getAdjacentMergeableTextNode(d.parentNode,!1)),e?(c||(c=new r(e),k.push(c)),c.textNodes.push(d),d===i&&(l=c.firstTextNode,n=l.length),d===j&&(m=c.firstTextNode,o=c.getLength())):c=null;if(j&&j.parentNode&&(h=this.getAdjacentMergeableTextNode(j.parentNode,!0),h&&(c||(c=new r(j),k.push(c)),c.textNodes.push(h))),k.length){for(f=0,g=k.length;g>f;++f)k[f].doMerge();b.setStart(l,n),b.setEnd(m,o)}},getAdjacentMergeableTextNode:function(b,c){var d,e=b.nodeType==a.TEXT_NODE,f=e?b.parentNode:b,g=c?"nextSibling":"previousSibling";if(e){if(d=b[g],d&&d.nodeType==a.TEXT_NODE)return d}else if(d=f[g],d&&this.areElementsMergeable(b,d))return d[c?"firstChild":"lastChild"];return null},areElementsMergeable:function(a,c){return b.dom.arrayContains(this.tagNames,(a.tagName||"").toLowerCase())&&b.dom.arrayContains(this.tagNames,(c.tagName||"").toLowerCase())&&m(a,c)&&o(a,c)},createContainer:function(a){var b=a.createElement(this.tagNames[0]);return this.cssClass&&(b.className=this.cssClass),this.cssStyle&&b.setAttribute("style",this.cssStyle),b},applyToTextNode:function(a){var c,d=a.parentNode;1==d.childNodes.length&&b.dom.arrayContains(this.tagNames,d.tagName.toLowerCase())?(this.cssClass&&f(d,this.cssClass,this.similarClassRegExp),this.cssStyle&&e(d,this.cssStyle,this.similarStyleRegExp)):(c=this.createContainer(b.dom.getDocument(a)),a.parentNode.insertBefore(c,a),c.appendChild(a))},isRemovable:function(c){return b.dom.arrayContains(this.tagNames,c.tagName.toLowerCase())&&""===a.lang.string(c.className).trim()&&(!c.getAttribute("style")||""===a.lang.string(c.getAttribute("style")).trim())},undoToTextNode:function(a,b,c,d){var e,f=c?!1:!0,h=c||d,i=!1;b.containsNode(h)||(e=b.cloneRange(),e.selectNode(h),e.isPointInRange(b.endContainer,b.endOffset)&&p(b.endContainer,b.endOffset)&&(q(h,b.endContainer,b.endOffset,this.container),b.setEndAfter(h)),e.isPointInRange(b.startContainer,b.startOffset)&&p(b.startContainer,b.startOffset)&&(h=q(h,b.startContainer,b.startOffset,this.container))),!f&&this.similarClassRegExp&&g(h,this.similarClassRegExp),f&&this.similarStyleRegExp&&(i="change"===l(h,this.cssStyle,this.similarStyleRegExp)),this.isRemovable(h)&&!i&&n(h)},applyToRange:function(b){var c,d,e,f,g,h;for(d=b.length;d--;){if(c=b[d].getNodes([a.TEXT_NODE]),!c.length)try{return e=this.createContainer(b[d].endContainer.ownerDocument),b[d].surroundContents(e),this.selectNode(b[d],e),void 0}catch(i){}if(b[d].splitBoundaries(),c=b[d].getNodes([a.TEXT_NODE]),c.length){for(g=0,h=c.length;h>g;++g)f=c[g],this.getMatchingAncestor(f).element||this.applyToTextNode(f);b[d].setStart(c[0],0),f=c[c.length-1],b[d].setEnd(f,f.length),this.normalize&&this.postApply(c,b[d])}}},undoToRange:function(b){var c,d,e,f,g,h,i,j;for(f=b.length;f--;){for(c=b[f].getNodes([a.TEXT_NODE]),c.length?(b[f].splitBoundaries(),c=b[f].getNodes([a.TEXT_NODE])):(g=b[f].endContainer.ownerDocument,h=g.createTextNode(a.INVISIBLE_SPACE),b[f].insertNode(h),b[f].selectNode(h),c=[h]),i=0,j=c.length;j>i;++i)b[f].isValid()&&(d=c[i],e=this.getMatchingAncestor(d),"style"===e.type?this.undoToTextNode(d,b[f],!1,e.element):e.element&&this.undoToTextNode(d,b[f],e.element));1==j?this.selectNode(b[f],c[0]):(b[f].setStart(c[0],0),d=c[c.length-1],b[f].setEnd(d,d.length),this.normalize&&this.postApply(c,b[f]))}},selectNode:function(b,c){var d=c.nodeType===a.ELEMENT_NODE,e="canHaveHTML"in c?c.canHaveHTML:!0,f=d?c.innerHTML:c.data,g=""===f||f===a.INVISIBLE_SPACE;if(g&&d&&e)try{c.innerHTML=a.INVISIBLE_SPACE}catch(h){}b.selectNodeContents(c),g&&d?b.collapse(!1):g&&(b.setStartAfter(c),b.setEndAfter(c))},getTextSelectedByRange:function(a,b){var c,d,e=b.cloneRange();return e.selectNodeContents(a),c=e.intersection(b),d=c?""+c:"",e.detach(),d},isAppliedToRange:function(b){var c,d,e,f,g,h,i=[],j="full";for(e=b.length;e--;){if(d=b[e].getNodes([a.TEXT_NODE]),!d.length)return c=this.getMatchingAncestor(b[e].startContainer).element,c?{elements:[c],coverage:j}:!1;for(f=0,g=d.length;g>f;++f)h=this.getTextSelectedByRange(d[f],b[e]),c=this.getMatchingAncestor(d[f]).element,c&&""!=h?(i.push(c),1===a.dom.getTextNodes(c,!0).length?j="full":"full"===j&&(j="inline")):c||(j="partial")}return i.length?{elements:i,coverage:j}:!1},toggleRange:function(a){var b,c=this.isAppliedToRange(a);c?"full"===c.coverage?this.undoToRange(a):"inline"===c.coverage?(b=k(c.elements,this.tagNames,this.cssStyle,this.cssClass),this.undoToRange(a),b||this.applyToRange(a)):(k(c.elements,this.tagNames,this.cssStyle,this.cssClass)||this.undoToRange(a),this.applyToRange(a)):this.applyToRange(a)}},a.selection.HTMLApplier=s}(wysihtml5,rangy),wysihtml5.Commands=Base.extend({constructor:function(a){this.editor=a,this.composer=a.composer,this.doc=this.composer.doc},support:function(a){return wysihtml5.browser.supportsCommand(this.doc,a)},exec:function(a,b){var c=wysihtml5.commands[a],d=wysihtml5.lang.array(arguments).get(),e=c&&c.exec,f=null;if(this.editor.fire("beforecommand:composer"),e)d.unshift(this.composer),f=e.apply(c,d);else try{f=this.doc.execCommand(a,!1,b)}catch(g){}return this.editor.fire("aftercommand:composer"),f},state:function(a){var b=wysihtml5.commands[a],c=wysihtml5.lang.array(arguments).get(),d=b&&b.state;if(d)return c.unshift(this.composer),d.apply(b,c);try{return this.doc.queryCommandState(a)}catch(e){return!1}},stateValue:function(a){var b=wysihtml5.commands[a],c=wysihtml5.lang.array(arguments).get(),d=b&&b.stateValue;return d?(c.unshift(this.composer),d.apply(b,c)):!1}}),wysihtml5.commands.bold={exec:function(a,b){wysihtml5.commands.formatInline.execWithToggle(a,b,"b")},state:function(a,b){return wysihtml5.commands.formatInline.state(a,b,"b")}},function(a){function b(b,c){var g,h,i,j,k,l,m,n,o,p=b.doc,q="_wysihtml5-temp-"+ +new Date,r=/non-matching-class/g,s=0;for(a.commands.formatInline.exec(b,d,e,q,r,d,d,!0,!0),h=p.querySelectorAll(e+"."+q),g=h.length;g>s;s++){i=h[s],i.removeAttribute("class");for(o in c)"text"!==o&&i.setAttribute(o,c[o])}l=i,1===g&&(m=f.getTextContent(i),j=!!i.querySelector("*"),k=""===m||m===a.INVISIBLE_SPACE,!j&&k&&(f.setTextContent(i,c.text||i.href),n=p.createTextNode(" "),b.selection.setAfter(i),f.insert(n).after(i),l=n)),b.selection.setAfter(l)}function c(a,b,c){var d,e,f,g;for(e=b.length;e--;){for(d=b[e].attributes,f=d.length;f--;)b[e].removeAttribute(d.item(f).name);for(g in c)c.hasOwnProperty(g)&&b[e].setAttribute(g,c[g])}}var d,e="A",f=a.dom;a.commands.createLink={exec:function(a,d,e){var f=this.state(a,d);f?a.selection.executeAndRestore(function(){c(a,f,e)}):(e="object"==typeof e?e:{href:e},b(a,e))},state:function(b,c){return a.commands.formatInline.state(b,c,"A")}}}(wysihtml5),function(a){function b(a,b){for(var d,e,f,g=b.length,h=0;g>h;h++)d=b[h],e=c.getParentElement(d,{nodeName:"code"}),f=c.getTextContent(d),f.match(c.autoLink.URL_REG_EXP)&&!e?e=c.renameElement(d,"code"):c.replaceWithChildNodes(d)}var c=a.dom;a.commands.removeLink={exec:function(a,c){var d=this.state(a,c);d&&a.selection.executeAndRestore(function(){b(a,d)})},state:function(b,c){return a.commands.formatInline.state(b,c,"A")}}}(wysihtml5),function(a){var b=/wysiwyg-font-size-[0-9a-z\-]+/g;a.commands.fontSize={exec:function(c,d,e){a.commands.formatInline.execWithToggle(c,d,"span","wysiwyg-font-size-"+e,b)},state:function(c,d,e){return a.commands.formatInline.state(c,d,"span","wysiwyg-font-size-"+e,b)}}}(wysihtml5),function(a){var b=/(\s|^)font-size\s*:\s*[^;\s]+;?/gi;a.commands.fontSizeStyle={exec:function(c,d,e){e="object"==typeof e?e.size:e,/^\s*$/.test(e)||a.commands.formatInline.execWithToggle(c,d,"span",!1,!1,"font-size:"+e,b)},state:function(c,d){return a.commands.formatInline.state(c,d,"span",!1,!1,"font-size",b)},stateValue:function(b,c){var d,e=this.state(b,c);return e&&a.lang.object(e).isArray()&&(e=e[0]),e&&(d=e.getAttribute("style"),d)?a.quirks.styleParser.parseFontSize(d):!1}}}(wysihtml5),function(a){var b=/wysiwyg-color-[0-9a-z]+/g;a.commands.foreColor={exec:function(c,d,e){a.commands.formatInline.execWithToggle(c,d,"span","wysiwyg-color-"+e,b)},state:function(c,d,e){return a.commands.formatInline.state(c,d,"span","wysiwyg-color-"+e,b)}}}(wysihtml5),function(a){var b=/(\s|^)color\s*:\s*[^;\s]+;?/gi;a.commands.foreColorStyle={exec:function(c,d,e){var f,g=a.quirks.styleParser.parseColor("object"==typeof e?"color:"+e.color:"color:"+e,"color");g&&(f="color: rgb("+g[0]+","+g[1]+","+g[2]+");",1!==g[3]&&(f+="color: rgba("+g[0]+","+g[1]+","+g[2]+","+g[3]+");"),a.commands.formatInline.execWithToggle(c,d,"span",!1,!1,f,b))},state:function(c,d){return a.commands.formatInline.state(c,d,"span",!1,!1,"color",b)},stateValue:function(b,c,d){var e,f=this.state(b,c);return f&&a.lang.object(f).isArray()&&(f=f[0]),f&&(e=f.getAttribute("style"),e&&e)?(val=a.quirks.styleParser.parseColor(e,"color"),a.quirks.styleParser.unparseColor(val,d)):!1
}}}(wysihtml5),function(a){var b=/(\s|^)background-color\s*:\s*[^;\s]+;?/gi;a.commands.bgColorStyle={exec:function(c,d,e){var f,g=a.quirks.styleParser.parseColor("object"==typeof e?"background-color:"+e.color:"background-color:"+e,"background-color");g&&(f="background-color: rgb("+g[0]+","+g[1]+","+g[2]+");",1!==g[3]&&(f+="background-color: rgba("+g[0]+","+g[1]+","+g[2]+","+g[3]+");"),a.commands.formatInline.execWithToggle(c,d,"span",!1,!1,f,b))},state:function(c,d){return a.commands.formatInline.state(c,d,"span",!1,!1,"background-color",b)},stateValue:function(b,c,d){var e,f=this.state(b,c),g=!1;return f&&a.lang.object(f).isArray()&&(f=f[0]),f&&(e=f.getAttribute("style"),e)?(g=a.quirks.styleParser.parseColor(e,"background-color"),a.quirks.styleParser.unparseColor(g,d)):!1}}}(wysihtml5),function(a){function b(b,c,e){b.className?(d(b,e),b.className=a.lang.string(b.className+" "+c).trim()):b.className=c}function c(b,c,d){e(b,d),b.getAttribute("style")?b.setAttribute("style",a.lang.string(b.getAttribute("style")+" "+c).trim()):b.setAttribute("style",c)}function d(b,c){var d=c.test(b.className);return b.className=b.className.replace(c,""),""==a.lang.string(b.className).trim()&&b.removeAttribute("class"),d}function e(b,c){var d=c.test(b.getAttribute("style"));return b.setAttribute("style",(b.getAttribute("style")||"").replace(c,"")),""==a.lang.string(b.getAttribute("style")||"").trim()&&b.removeAttribute("style"),d}function f(a){var b=a.lastChild;b&&g(b)&&b.parentNode.removeChild(b)}function g(a){return"BR"===a.nodeName}function h(b,c){var d,e,g;for(b.selection.isCollapsed()&&b.selection.selectLine(),d=b.selection.surround(c),e=0,g=d.length;g>e;e++)a.dom.lineBreaks(d[e]).remove(),f(d[e])}function i(b){return!!a.lang.string(b.className).trim()}function j(b){return!!a.lang.string(b.getAttribute("style")||"").trim()}var k=a.dom,l=["H1","H2","H3","H4","H5","H6","P","PRE","DIV"];a.commands.formatBlock={exec:function(f,g,m,n,o,p,q){var r,s,t,u,v,w=(f.doc,this.state(f,g,m,n,o,p,q)),x=f.config.useLineBreaks,y=x?"DIV":"P";return m="string"==typeof m?m.toUpperCase():m,w.length?(f.selection.executeAndRestoreRangy(function(){var b,c,f;for(b=w.length;b--;){if(o&&(s=d(w[b],o)),q&&(u=e(w[b],q)),(u||s)&&null===m&&w[b].nodeName!=y)return;c=i(w[b]),f=j(w[b]),c||f||!x&&"P"!==m?k.renameElement(w[b],"P"===m?"DIV":y):(a.dom.lineBreaks(w[b]).add(),k.replaceWithChildNodes(w[b]))}}),void 0):((null!==m&&!a.lang.array(l).contains(m)||(r=f.selection.findNodesInSelection(l).concat(f.selection.getSelectedOwnNodes()),f.selection.executeAndRestoreRangy(function(){for(var a=r.length;a--;)v=k.getParentElement(r[a],{nodeName:l}),v==f.element&&(v=null),v&&(m&&(v=k.renameElement(v,m)),n&&b(v,n,o),p&&c(v,p,q),t=!0)}),!t))&&h(f,{nodeName:m||y,className:n||null,cssStyle:p||null}),void 0)},state:function(b,c,d,e,f,g,h){var i,j,l,m=b.selection.getSelectedOwnNodes(),n=[];for(d="string"==typeof d?d.toUpperCase():d,j=0,l=m.length;l>j;j++)i=k.getParentElement(m[j],{nodeName:d,className:e,classRegExp:f,cssStyle:g,styleRegExp:h}),i&&-1==a.lang.array(n).indexOf(i)&&n.push(i);return 0==n.length?!1:n}}}(wysihtml5),wysihtml5.commands.formatCode={exec:function(a,b,c){var d,e,f,g=this.state(a);g?a.selection.executeAndRestore(function(){d=g.querySelector("code"),wysihtml5.dom.replaceWithChildNodes(g),d&&wysihtml5.dom.replaceWithChildNodes(d)}):(e=a.selection.getRange(),f=e.extractContents(),g=a.doc.createElement("pre"),d=a.doc.createElement("code"),c&&(d.className=c),g.appendChild(d),d.appendChild(f),e.insertNode(g),a.selection.selectNode(g))},state:function(a){var b=a.selection.getSelectedNode();return b&&b.nodeName&&"PRE"==b.nodeName&&b.firstChild&&b.firstChild.nodeName&&"CODE"==b.firstChild.nodeName?b:wysihtml5.dom.getParentElement(b,{nodeName:"CODE"})&&wysihtml5.dom.getParentElement(b,{nodeName:"PRE"})}},function(a){function b(a){var b=d[a];return b?[a.toLowerCase(),b.toLowerCase()]:[a.toLowerCase()]}function c(c,d,f,g,h,i){var j=c;return d&&(j+=":"+d),g&&(j+=":"+g),e[j]||(e[j]=new a.selection.HTMLApplier(b(c),d,f,!0,g,h,i)),e[j]}var d={strong:"b",em:"i",b:"strong",i:"em"},e={};a.commands.formatInline={exec:function(a,b,d,e,f,g,h,i,j){var k=a.selection.createRange(),l=a.selection.getOwnRanges();return l&&0!=l.length?(a.selection.getSelection().removeAllRanges(),c(d,e,f,g,h,a.element).toggleRange(l),i?j||a.cleanUp():(k.setStart(l[0].startContainer,l[0].startOffset),k.setEnd(l[l.length-1].endContainer,l[l.length-1].endOffset),a.selection.setSelection(k),a.selection.executeAndRestore(function(){j||a.cleanUp()},!0,!0)),void 0):!1},execWithToggle:function(b,c,d,e,f,g,h){var i,j=this;this.state(b,c,d,e,f,g,h)&&b.selection.isCollapsed()&&!b.selection.caretIsLastInSelection()&&!b.selection.caretIsFirstInSelection()?(i=j.state(b,c,d,e,f)[0],b.selection.executeAndRestoreRangy(function(){i.parentNode;b.selection.selectNode(i,!0),a.commands.formatInline.exec(b,c,d,e,f,g,h,!0,!0)})):this.state(b,c,d,e,f,g,h)&&!b.selection.isCollapsed()?b.selection.executeAndRestoreRangy(function(){a.commands.formatInline.exec(b,c,d,e,f,g,h,!0,!0)}):a.commands.formatInline.exec(b,c,d,e,f,g,h)},state:function(b,e,f,g,h,i,j){var k,l,m=b.doc,n=d[f]||f;return a.dom.hasElementWithTagName(m,f)||a.dom.hasElementWithTagName(m,n)?g&&!a.dom.hasElementWithClassName(m,g)?!1:(k=b.selection.getOwnRanges(),k&&0!==k.length?(l=c(f,g,h,i,j,b.element).isAppliedToRange(k),l&&l.elements?l.elements:!1):!1):!1}}}(wysihtml5),function(a){a.commands.insertBlockQuote={exec:function(b,c){var d=this.state(b,c),e=b.selection.isEndToEndInNode(["H1","H2","H3","H4","H5","H6","P"]);b.selection.executeAndRestore(function(){if(d)b.config.useLineBreaks&&a.dom.lineBreaks(d).add(),a.dom.unwrap(d);else if(b.selection.isCollapsed()&&b.selection.selectLine(),e){var c=e.ownerDocument.createElement("blockquote");a.dom.insert(c).after(e),c.appendChild(e)}else b.selection.surround({nodeName:"blockquote"})})},state:function(b){var c=b.selection.getSelectedNode(),d=a.dom.getParentElement(c,{nodeName:"BLOCKQUOTE"},!1,b.element);return d?d:!1}}}(wysihtml5),wysihtml5.commands.insertHTML={exec:function(a,b,c){a.commands.support(b)?a.doc.execCommand(b,!1,c):a.selection.insertHTML(c)},state:function(){return!1}},function(a){var b="IMG";a.commands.insertImage={exec:function(c,d,e){var f,g,h,i,j;if(e="object"==typeof e?e:{src:e},f=c.doc,g=this.state(c),g)return c.selection.setBefore(g),i=g.parentNode,i.removeChild(g),a.dom.removeEmptyTextNodes(i),"A"!==i.nodeName||i.firstChild||(c.selection.setAfter(i),i.parentNode.removeChild(i)),a.quirks.redraw(c.element),void 0;g=f.createElement(b);for(j in e)g.setAttribute("className"===j?"class":j,e[j]);c.selection.insertNode(g),a.browser.hasProblemsSettingCaretAfterImg()?(h=f.createTextNode(a.INVISIBLE_SPACE),c.selection.insertNode(h),c.selection.setAfter(h)):c.selection.setAfter(g)},state:function(c){var d,e,f,g=c.doc;return a.dom.hasElementWithTagName(g,b)?(d=c.selection.getSelectedNode(),d?d.nodeName===b?d:d.nodeType!==a.ELEMENT_NODE?!1:(e=c.selection.getText(),e=a.lang.string(e).trim(),e?!1:(f=c.selection.getNodes(a.ELEMENT_NODE,function(a){return"IMG"===a.nodeName}),1!==f.length?!1:f[0])):!1):!1}}}(wysihtml5),function(a){var b="<br>"+(a.browser.needsSpaceAfterLineBreak()?" ":"");a.commands.insertLineBreak={exec:function(c,d){c.commands.support(d)?(c.doc.execCommand(d,!1,null),a.browser.autoScrollsToCaret()||c.selection.scrollIntoView()):c.commands.exec("insertHTML",b)},state:function(){return!1}}}(wysihtml5),wysihtml5.commands.insertOrderedList={exec:function(a,b){wysihtml5.commands.insertList.exec(a,b,"OL")},state:function(a,b){return wysihtml5.commands.insertList.state(a,b,"OL")}},wysihtml5.commands.insertUnorderedList={exec:function(a,b){wysihtml5.commands.insertList.exec(a,b,"UL")},state:function(a,b){return wysihtml5.commands.insertList.state(a,b,"UL")}},wysihtml5.commands.insertList=function(a){var b=function(a,b){if(a&&a.nodeName){"string"==typeof b&&(b=[b]);for(var c=b.length;c--;)if(a.nodeName===b[c])return!0}return!1},c=function(c,d,e){var f,g,h={el:null,other:!1};return c&&(f=a.dom.getParentElement(c,{nodeName:"LI"}),g="UL"===d?"OL":"UL",b(c,d)?h.el=c:b(c,g)?h={el:c,other:!0}:f&&(b(f.parentNode,d)?h.el=f.parentNode:b(f.parentNode,g)&&(h={el:f.parentNode,other:!0}))),h.el&&!e.element.contains(h.el)&&(h.el=null),h},d=function(b,c,d){var e,g="UL"===c?"OL":"UL";d.selection.executeAndRestore(function(){var h,i,j=f(g,d);if(j.length)for(h=j.length;h--;)a.dom.renameElement(j[h],c.toLowerCase());else{for(e=f(["OL","UL"],d),i=e.length;i--;)a.dom.resolveList(e[i],d.config.useLineBreaks);a.dom.resolveList(b,d.config.useLineBreaks)}})},e=function(b,c,d){var e="UL"===c?"OL":"UL";d.selection.executeAndRestore(function(){var g,h=[b].concat(f(e,d));for(g=h.length;g--;)a.dom.renameElement(h[g],c.toLowerCase())})},f=function(a,c){var d,e=c.selection.getOwnRanges(),f=[];for(d=e.length;d--;)f=f.concat(e[d].getNodes([1],function(c){return b(c,a)}));return f},g=function(b,c){c.selection.executeAndRestoreRangy(function(){var d,e,f="_wysihtml5-temp-"+(new Date).getTime(),g=c.selection.deblockAndSurround({nodeName:"div",className:f}),h=/\uFEFF/g;g.innerHTML=g.innerHTML.replace(h,""),g&&(d=a.lang.array(["","<br>",a.INVISIBLE_SPACE]).contains(g.innerHTML),e=a.dom.convertToList(g,b.toLowerCase(),c.parent.config.uneditableContainerClassname),d&&c.selection.selectNode(e.querySelector("li"),!0))})};return{exec:function(a,b,f){var h=a.doc,i="OL"===f?"insertOrderedList":"insertUnorderedList",j=a.selection.getSelectedNode(),k=c(j,f,a);k.el?k.other?e(k.el,f,a):d(k.el,f,a):a.commands.support(i)?h.execCommand(i,!1,null):g(f,a)},state:function(a,b,d){var e=a.selection.getSelectedNode(),f=c(e,d,a);return f.el&&!f.other?f.el:!1}}}(wysihtml5),wysihtml5.commands.italic={exec:function(a,b){wysihtml5.commands.formatInline.execWithToggle(a,b,"i")},state:function(a,b){return wysihtml5.commands.formatInline.state(a,b,"i")}},function(a){var b="wysiwyg-text-align-center",c=/wysiwyg-text-align-[0-9a-z]+/g;a.commands.justifyCenter={exec:function(d){return a.commands.formatBlock.exec(d,"formatBlock",null,b,c)},state:function(d){return a.commands.formatBlock.state(d,"formatBlock",null,b,c)}}}(wysihtml5),function(a){var b="wysiwyg-text-align-left",c=/wysiwyg-text-align-[0-9a-z]+/g;a.commands.justifyLeft={exec:function(d){return a.commands.formatBlock.exec(d,"formatBlock",null,b,c)},state:function(d){return a.commands.formatBlock.state(d,"formatBlock",null,b,c)}}}(wysihtml5),function(a){var b="wysiwyg-text-align-right",c=/wysiwyg-text-align-[0-9a-z]+/g;a.commands.justifyRight={exec:function(d){return a.commands.formatBlock.exec(d,"formatBlock",null,b,c)},state:function(d){return a.commands.formatBlock.state(d,"formatBlock",null,b,c)}}}(wysihtml5),function(a){var b="wysiwyg-text-align-justify",c=/wysiwyg-text-align-[0-9a-z]+/g;a.commands.justifyFull={exec:function(d){return a.commands.formatBlock.exec(d,"formatBlock",null,b,c)},state:function(d){return a.commands.formatBlock.state(d,"formatBlock",null,b,c)}}}(wysihtml5),function(a){var b="text-align: right;",c=/(\s|^)text-align\s*:\s*[^;\s]+;?/gi;a.commands.alignRightStyle={exec:function(d){return a.commands.formatBlock.exec(d,"formatBlock",null,null,null,b,c)},state:function(d){return a.commands.formatBlock.state(d,"formatBlock",null,null,null,b,c)}}}(wysihtml5),function(a){var b="text-align: left;",c=/(\s|^)text-align\s*:\s*[^;\s]+;?/gi;a.commands.alignLeftStyle={exec:function(d){return a.commands.formatBlock.exec(d,"formatBlock",null,null,null,b,c)},state:function(d){return a.commands.formatBlock.state(d,"formatBlock",null,null,null,b,c)}}}(wysihtml5),function(a){var b="text-align: center;",c=/(\s|^)text-align\s*:\s*[^;\s]+;?/gi;a.commands.alignCenterStyle={exec:function(d){return a.commands.formatBlock.exec(d,"formatBlock",null,null,null,b,c)},state:function(d){return a.commands.formatBlock.state(d,"formatBlock",null,null,null,b,c)}}}(wysihtml5),wysihtml5.commands.redo={exec:function(a){return a.undoManager.redo()},state:function(){return!1}},wysihtml5.commands.underline={exec:function(a,b){wysihtml5.commands.formatInline.execWithToggle(a,b,"u")},state:function(a,b){return wysihtml5.commands.formatInline.state(a,b,"u")}},wysihtml5.commands.undo={exec:function(a){return a.undoManager.undo()},state:function(){return!1}},wysihtml5.commands.createTable={exec:function(a,b,c){var d,e,f;if(c&&c.cols&&c.rows&&parseInt(c.cols,10)>0&&parseInt(c.rows,10)>0){for(f=c.tableStyle?'<table style="'+c.tableStyle+'">':"<table>",f+="<tbody>",e=0;e<c.rows;e++){for(f+="<tr>",d=0;d<c.cols;d++)f+="<td>&nbsp;</td>";f+="</tr>"}f+="</tbody></table>",a.commands.exec("insertHTML",f)}},state:function(){return!1}},wysihtml5.commands.mergeTableCells={exec:function(a,b){a.tableSelection&&a.tableSelection.start&&a.tableSelection.end&&(this.state(a,b)?wysihtml5.dom.table.unmergeCell(a.tableSelection.start):wysihtml5.dom.table.mergeCellsBetween(a.tableSelection.start,a.tableSelection.end))},state:function(a){if(a.tableSelection){var b=a.tableSelection.start,c=a.tableSelection.end;if(b&&c&&b==c&&(wysihtml5.dom.getAttribute(b,"colspan")&&parseInt(wysihtml5.dom.getAttribute(b,"colspan"),10)>1||wysihtml5.dom.getAttribute(b,"rowspan")&&parseInt(wysihtml5.dom.getAttribute(b,"rowspan"),10)>1))return[b]}return!1}},wysihtml5.commands.addTableCells={exec:function(a,b,c){if(a.tableSelection&&a.tableSelection.start&&a.tableSelection.end){var d=wysihtml5.dom.table.orderSelectionEnds(a.tableSelection.start,a.tableSelection.end);"before"==c||"above"==c?wysihtml5.dom.table.addCells(d.start,c):("after"==c||"below"==c)&&wysihtml5.dom.table.addCells(d.end,c),setTimeout(function(){a.tableSelection.select(d.start,d.end)},0)}},state:function(){return!1}},wysihtml5.commands.deleteTableCells={exec:function(a,b,c){if(a.tableSelection&&a.tableSelection.start&&a.tableSelection.end){var d,e=wysihtml5.dom.table.orderSelectionEnds(a.tableSelection.start,a.tableSelection.end),f=wysihtml5.dom.table.indexOf(e.start),g=a.tableSelection.table;wysihtml5.dom.table.removeCells(e.start,c),setTimeout(function(){d=wysihtml5.dom.table.findCell(g,f),d||("row"==c&&(d=wysihtml5.dom.table.findCell(g,{row:f.row-1,col:f.col})),"column"==c&&(d=wysihtml5.dom.table.findCell(g,{row:f.row,col:f.col-1}))),d&&a.tableSelection.select(d,d)},0)}},state:function(){return!1}},wysihtml5.commands.indentList={exec:function(a){var b=a.selection.getSelectionParentsByTag("LI");return b?this.tryToPushLiLevel(b,a.selection):!1},state:function(){return!1},tryToPushLiLevel:function(a,b){var c,d,e,f,g,h=!1;return b.executeAndRestoreRangy(function(){for(var b=a.length;b--;)f=a[b],c="OL"===f.parentNode.nodeName?"OL":"UL",d=f.ownerDocument.createElement(c),e=wysihtml5.dom.domNode(f).prev({nodeTypes:[wysihtml5.ELEMENT_NODE]}),g=e?e.querySelector("ul, ol"):null,e&&(g?g.appendChild(f):(d.appendChild(f),e.appendChild(d)),h=!0)}),h}},wysihtml5.commands.outdentList={exec:function(a){var b=a.selection.getSelectionParentsByTag("LI");return b?this.tryToPullLiLevel(b,a):!1},state:function(){return!1},tryToPullLiLevel:function(a,b){var c,d,e,f,g,h=!1,i=this;return b.selection.executeAndRestoreRangy(function(){var j,k;for(j=a.length;j--;)if(f=a[j],f.parentNode&&(c=f.parentNode,"OL"===c.tagName||"UL"===c.tagName)){if(h=!0,d=wysihtml5.dom.getParentElement(c.parentNode,{nodeName:["OL","UL"]},!1,b.element),e=wysihtml5.dom.getParentElement(c.parentNode,{nodeName:["LI"]},!1,b.element),d&&e)f.nextSibling&&(g=i.getAfterList(c,f),f.appendChild(g)),d.insertBefore(f,e.nextSibling);else{for(f.nextSibling&&(g=i.getAfterList(c,f),f.appendChild(g)),k=f.childNodes.length;k--;)c.parentNode.insertBefore(f.childNodes[k],c.nextSibling);c.parentNode.insertBefore(document.createElement("br"),c.nextSibling),f.parentNode.removeChild(f)}0===c.childNodes.length&&c.parentNode.removeChild(c)}}),h},getAfterList:function(a,b){for(var c=a.nodeName,d=document.createElement(c);b.nextSibling;)d.appendChild(b.nextSibling);return d}},function(a){var b=90,c=89,d=8,e=46,f=25,g="data-wysihtml5-selection-node",h="data-wysihtml5-selection-offset",i=('<span id="_wysihtml5-undo" class="_wysihtml5-temp">'+a.INVISIBLE_SPACE+"</span>",'<span id="_wysihtml5-redo" class="_wysihtml5-temp">'+a.INVISIBLE_SPACE+"</span>",a.dom);a.UndoManager=a.lang.Dispatcher.extend({constructor:function(a){this.editor=a,this.composer=a.composer,this.element=this.composer.element,this.position=0,this.historyStr=[],this.historyDom=[],this.transact(),this._observe()},_observe:function(){{var a,f=this;this.composer.sandbox.getDocument()}i.observe(this.element,"keydown",function(a){if(!a.altKey&&(a.ctrlKey||a.metaKey)){var d=a.keyCode,e=d===b&&!a.shiftKey,g=d===b&&a.shiftKey||d===c;e?(f.undo(),a.preventDefault()):g&&(f.redo(),a.preventDefault())}}),i.observe(this.element,"keydown",function(b){var c=b.keyCode;c!==a&&(a=c,(c===d||c===e)&&f.transact())}),this.editor.on("newword:composer",function(){f.transact()}).on("beforecommand:composer",function(){f.transact()})},transact:function(){var b,c,d,e,i,j,k,l=this.historyStr[this.position-1],m=this.composer.getValue(!1,!1),n=this.element.offsetWidth>0&&this.element.offsetHeight>0;m!==l&&(j=this.historyStr.length=this.historyDom.length=this.position,j>f&&(this.historyStr.shift(),this.historyDom.shift(),this.position--),this.position++,n&&(b=this.composer.selection.getRange(),c=b&&b.startContainer?b.startContainer:this.element,d=b&&b.startOffset?b.startOffset:0,c.nodeType===a.ELEMENT_NODE?e=c:(e=c.parentNode,i=this.getChildNodeIndex(e,c)),e.setAttribute(h,d),void 0!==i&&e.setAttribute(g,i)),k=this.element.cloneNode(!!m),this.historyDom.push(k),this.historyStr.push(m),e&&(e.removeAttribute(h),e.removeAttribute(g)))},undo:function(){this.transact(),this.undoPossible()&&(this.set(this.historyDom[--this.position-1]),this.editor.fire("undo:composer"))},redo:function(){this.redoPossible()&&(this.set(this.historyDom[++this.position-1]),this.editor.fire("redo:composer"))},undoPossible:function(){return this.position>1},redoPossible:function(){return this.position<this.historyStr.length},set:function(a){var b,c,d,e,f,i;for(this.element.innerHTML="",b=0,c=a.childNodes,d=a.childNodes.length;d>b;b++)this.element.appendChild(c[b].cloneNode(!0));a.hasAttribute(h)?(e=a.getAttribute(h),i=a.getAttribute(g),f=this.element):(f=this.element.querySelector("["+h+"]")||this.element,e=f.getAttribute(h),i=f.getAttribute(g),f.removeAttribute(h),f.removeAttribute(g)),null!==i&&(f=this.getChildNodeByIndex(f,+i)),this.composer.selection.set(f,e)},getChildNodeIndex:function(a,b){for(var c=0,d=a.childNodes,e=d.length;e>c;c++)if(d[c]===b)return c},getChildNodeByIndex:function(a,b){return a.childNodes[b]}})}(wysihtml5),wysihtml5.views.View=Base.extend({constructor:function(a,b,c){this.parent=a,this.element=b,this.config=c,this.config.noTextarea||this._observeViewChange()},_observeViewChange:function(){var a=this;this.parent.on("beforeload",function(){a.parent.on("change_view",function(b){b===a.name?(a.parent.currentView=a,a.show(),setTimeout(function(){a.focus()},0)):a.hide()})})},focus:function(){if(this.element.ownerDocument.querySelector(":focus")!==this.element)try{this.element.focus()}catch(a){}},hide:function(){this.element.style.display="none"},show:function(){this.element.style.display=""},disable:function(){this.element.setAttribute("disabled","disabled")},enable:function(){this.element.removeAttribute("disabled")}}),function(a){var b=a.dom,c=a.browser;a.views.Composer=a.views.View.extend({name:"composer",CARET_HACK:"<br>",constructor:function(a,b,c){this.base(a,b,c),this.config.noTextarea?this.editableArea=b:this.textarea=this.parent.textarea,this.config.contentEditableMode?this._initContentEditableArea():this._initSandbox()},clear:function(){this.element.innerHTML=c.displaysCaretInEmptyContentEditableCorrectly()?"":this.CARET_HACK},getValue:function(b,c){var d=this.isEmpty()?"":a.quirks.getCorrectInnerHTML(this.element);return b!==!1&&(d=this.parent.parse(d,c===!1?!1:!0)),d},setValue:function(a,b){b&&(a=this.parent.parse(a));try{this.element.innerHTML=a}catch(c){this.element.innerText=a}},cleanUp:function(){this.parent.parse(this.element)},show:function(){this.editableArea.style.display=this._displayStyle||"",this.config.noTextarea||this.textarea.element.disabled||(this.disable(),this.enable())},hide:function(){this._displayStyle=b.getStyle("display").from(this.editableArea),"none"===this._displayStyle&&(this._displayStyle=null),this.editableArea.style.display="none"},disable:function(){this.parent.fire("disable:composer"),this.element.removeAttribute("contentEditable")},enable:function(){this.parent.fire("enable:composer"),this.element.setAttribute("contentEditable","true")},focus:function(b){a.browser.doesAsyncFocus()&&this.hasPlaceholderSet()&&this.clear(),this.base();var c=this.element.lastChild;b&&c&&this.selection&&("BR"===c.nodeName?this.selection.setBefore(this.element.lastChild):this.selection.setAfter(this.element.lastChild))},getTextContent:function(){return b.getTextContent(this.element)},hasPlaceholderSet:function(){return this.getTextContent()==(this.config.noTextarea?this.editableArea.getAttribute("data-placeholder"):this.textarea.element.getAttribute("placeholder"))&&this.placeholderSet},isEmpty:function(){var a=this.element.innerHTML.toLowerCase();return/^(\s|<br>|<\/br>|<p>|<\/p>)*$/i.test(a)||""===a||"<br>"===a||"<p></p>"===a||"<p><br></p>"===a||this.hasPlaceholderSet()},_initContentEditableArea:function(){var a=this;this.config.noTextarea?this.sandbox=new b.ContentEditableArea(function(){a._create()},{},this.editableArea):(this.sandbox=new b.ContentEditableArea(function(){a._create()}),this.editableArea=this.sandbox.getContentEditable(),b.insert(this.editableArea).after(this.textarea.element),this._createWysiwygFormField())},_initSandbox:function(){var a,c=this;this.sandbox=new b.Sandbox(function(){c._create()},{stylesheets:this.config.stylesheets}),this.editableArea=this.sandbox.getIframe(),a=this.textarea.element,b.insert(this.editableArea).after(a),this._createWysiwygFormField()},_createWysiwygFormField:function(){if(this.textarea.element.form){var a=document.createElement("input");a.type="hidden",a.name="_wysihtml5_mode",a.value=1,b.insert(a).after(this.textarea.element)}},_create:function(){var d,e,f=this;this.doc=this.sandbox.getDocument(),this.element=this.config.contentEditableMode?this.sandbox.getContentEditable():this.doc.body,this.config.noTextarea?this.cleanUp():(this.textarea=this.parent.textarea,this.element.innerHTML=this.textarea.getValue(!0,!1)),this.selection=new a.Selection(this.parent,this.element,this.config.uneditableContainerClassname),this.commands=new a.Commands(this.parent),this.config.noTextarea||b.copyAttributes(["className","spellcheck","title","lang","dir","accessKey"]).from(this.textarea.element).to(this.element),b.addClass(this.element,this.config.composerClassName),this.config.style&&!this.config.contentEditableMode&&this.style(),this.observe(),d=this.config.name,d&&(b.addClass(this.element,d),this.config.contentEditableMode||b.addClass(this.editableArea,d)),this.enable(),!this.config.noTextarea&&this.textarea.element.disabled&&this.disable(),e="string"==typeof this.config.placeholder?this.config.placeholder:this.config.noTextarea?this.editableArea.getAttribute("data-placeholder"):this.textarea.element.getAttribute("placeholder"),e&&b.simulatePlaceholder(this.parent,this,e),this.commands.exec("styleWithCSS",!1),this._initAutoLinking(),this._initObjectResizing(),this._initUndoManager(),this._initLineBreaking(),this.config.noTextarea||!this.textarea.element.hasAttribute("autofocus")&&document.querySelector(":focus")!=this.textarea.element||c.isIos()||setTimeout(function(){f.focus(!0)},100),c.clearsContentEditableCorrectly()||a.quirks.ensureProperClearing(this),this.initSync&&this.config.sync&&this.initSync(),this.config.noTextarea||this.textarea.hide(),this.parent.fire("beforeload").fire("load")},_initAutoLinking:function(){var d,e,f,g=this,h=c.canDisableAutoLinking(),i=c.doesAutoLinkingInContentEditable();h&&this.commands.exec("autoUrlDetect",!1),this.config.autoLink&&((!i||i&&h)&&(this.parent.on("newword:composer",function(){b.getTextContent(g.element).match(b.autoLink.URL_REG_EXP)&&g.selection.executeAndRestore(function(c,d){var e,f=g.element.querySelectorAll("."+g.config.uneditableContainerClassname),h=!1;for(e=f.length;e--;)a.dom.contains(f[e],d)&&(h=!0);h||b.autoLink(d.parentNode,[g.config.uneditableContainerClassname])})}),b.observe(this.element,"blur",function(){b.autoLink(g.element,[g.config.uneditableContainerClassname])})),d=this.sandbox.getDocument().getElementsByTagName("a"),e=b.autoLink.URL_REG_EXP,f=function(c){var d=a.lang.string(b.getTextContent(c)).trim();return"www."===d.substr(0,4)&&(d="http://"+d),d},b.observe(this.element,"keydown",function(a){if(d.length){var c,h=g.selection.getSelectedNode(a.target.ownerDocument),i=b.getParentElement(h,{nodeName:"A"},4);i&&(c=f(i),setTimeout(function(){var a=f(i);a!==c&&a.match(e)&&i.setAttribute("href",a)},0))}}))},_initObjectResizing:function(){if(this.commands.exec("enableObjectResizing",!0),c.supportsEvent("resizeend")){var d=["width","height"],e=d.length,f=this.element;b.observe(f,"resizeend",function(b){var c,g=b.target||b.srcElement,h=g.style,i=0;if("IMG"===g.nodeName){for(;e>i;i++)c=d[i],h[c]&&(g.setAttribute(c,parseInt(h[c],10)),h[c]="");a.quirks.redraw(f)}})}},_initUndoManager:function(){this.undoManager=new a.UndoManager(this.parent)},_initLineBreaking:function(){function d(a){var c=b.getParentElement(a,{nodeName:["P","DIV"]},2);c&&b.contains(e.element,c)&&e.selection.executeAndRestore(function(){e.config.useLineBreaks?b.replaceWithChildNodes(c):"P"!==c.nodeName&&b.renameElement(c,"p")})}var e=this,f=["LI","P","H1","H2","H3","H4","H5","H6"],g=["UL","OL","MENU"];this.config.useLineBreaks||b.observe(this.element,["focus","keydown"],function(){if(e.isEmpty()){var a=e.doc.createElement("P");e.element.innerHTML="",e.element.appendChild(a),c.displaysCaretInEmptyContentEditableCorrectly()?e.selection.selectNode(a,!0):(a.innerHTML="<br>",e.selection.setBefore(a.firstChild))}}),b.observe(this.element,"keydown",function(c){var h,i=c.keyCode;if(!c.shiftKey&&(i===a.ENTER_KEY||i===a.BACKSPACE_KEY))return h=b.getParentElement(e.selection.getSelectedNode(),{nodeName:f},4),h?(setTimeout(function(){var c,f=e.selection.getSelectedNode();if("LI"===h.nodeName){if(!f)return;c=b.getParentElement(f,{nodeName:g},2),c||d(f)}i===a.ENTER_KEY&&h.nodeName.match(/^H[1-6]$/)&&d(f)},0),void 0):(e.config.useLineBreaks&&i===a.ENTER_KEY&&!a.browser.insertsLineBreaksOnReturn()&&(c.preventDefault(),e.commands.exec("insertLineBreak")),void 0)})}})}(wysihtml5),function(a){var b=a.dom,c=document,d=window,e=c.createElement("div"),f=["background-color","color","cursor","font-family","font-size","font-style","font-variant","font-weight","line-height","letter-spacing","text-align","text-decoration","text-indent","text-rendering","word-break","word-wrap","word-spacing"],g=["background-color","border-collapse","border-bottom-color","border-bottom-style","border-bottom-width","border-left-color","border-left-style","border-left-width","border-right-color","border-right-style","border-right-width","border-top-color","border-top-style","border-top-width","clear","display","float","margin-bottom","margin-left","margin-right","margin-top","outline-color","outline-offset","outline-width","outline-style","padding-left","padding-right","padding-top","padding-bottom","position","top","left","right","bottom","z-index","vertical-align","text-align","-webkit-box-sizing","-moz-box-sizing","-ms-box-sizing","box-sizing","-webkit-box-shadow","-moz-box-shadow","-ms-box-shadow","box-shadow","-webkit-border-top-right-radius","-moz-border-radius-topright","border-top-right-radius","-webkit-border-bottom-right-radius","-moz-border-radius-bottomright","border-bottom-right-radius","-webkit-border-bottom-left-radius","-moz-border-radius-bottomleft","border-bottom-left-radius","-webkit-border-top-left-radius","-moz-border-radius-topleft","border-top-left-radius","width","height"],h=["html                 { height: 100%; }","body                 { height: 100%; padding: 1px 0 0 0; margin: -1px 0 0 0; }","body > p:first-child { margin-top: 0; }","._wysihtml5-temp     { display: none; }",a.browser.isGecko?"body.placeholder { color: graytext !important; }":"body.placeholder { color: #a9a9a9 !important; }","img:-moz-broken      { -moz-force-broken-image-icon: 1; height: 24px; width: 24px; }"],i=function(a){if(a.setActive)try{a.setActive()}catch(e){}else{var f=a.style,g=c.documentElement.scrollTop||c.body.scrollTop,h=c.documentElement.scrollLeft||c.body.scrollLeft,i={position:f.position,top:f.top,left:f.left,WebkitUserSelect:f.WebkitUserSelect};b.setStyles({position:"absolute",top:"-99999px",left:"-99999px",WebkitUserSelect:"none"}).on(a),a.focus(),b.setStyles(i).on(a),d.scrollTo&&d.scrollTo(h,g)}};a.views.Composer.prototype.style=function(){var d,j,k=this,l=c.querySelector(":focus"),m=this.textarea.element,n=m.hasAttribute("placeholder"),o=n&&m.getAttribute("placeholder"),p=m.style.display,q=m.disabled;return this.focusStylesHost=e.cloneNode(!1),this.blurStylesHost=e.cloneNode(!1),this.disabledStylesHost=e.cloneNode(!1),n&&m.removeAttribute("placeholder"),m===l&&m.blur(),m.disabled=!1,m.style.display=d="none",(m.getAttribute("rows")&&"auto"===b.getStyle("height").from(m)||m.getAttribute("cols")&&"auto"===b.getStyle("width").from(m))&&(m.style.display=d=p),b.copyStyles(g).from(m).to(this.editableArea).andTo(this.blurStylesHost),b.copyStyles(f).from(m).to(this.element).andTo(this.blurStylesHost),b.insertCSS(h).into(this.element.ownerDocument),m.disabled=!0,b.copyStyles(g).from(m).to(this.disabledStylesHost),b.copyStyles(f).from(m).to(this.disabledStylesHost),m.disabled=q,m.style.display=p,i(m),m.style.display=d,b.copyStyles(g).from(m).to(this.focusStylesHost),b.copyStyles(f).from(m).to(this.focusStylesHost),m.style.display=p,b.copyStyles(["display"]).from(m).to(this.editableArea),j=a.lang.array(g).without(["display"]),l?l.focus():m.blur(),n&&m.setAttribute("placeholder",o),this.parent.on("focus:composer",function(){b.copyStyles(j).from(k.focusStylesHost).to(k.editableArea),b.copyStyles(f).from(k.focusStylesHost).to(k.element)}),this.parent.on("blur:composer",function(){b.copyStyles(j).from(k.blurStylesHost).to(k.editableArea),b.copyStyles(f).from(k.blurStylesHost).to(k.element)}),this.parent.observe("disable:composer",function(){b.copyStyles(j).from(k.disabledStylesHost).to(k.editableArea),b.copyStyles(f).from(k.disabledStylesHost).to(k.element)}),this.parent.observe("enable:composer",function(){b.copyStyles(j).from(k.blurStylesHost).to(k.editableArea),b.copyStyles(f).from(k.blurStylesHost).to(k.element)}),this}}(wysihtml5),function(a){var b=a.dom,c=a.browser,d={66:"bold",73:"italic",85:"underline"},e=function(a,b,c){var d,e=a.getPreviousNode(b,!0),f=a.getSelectedNode();if(1!==f.nodeType&&f.parentNode!==c&&(f=f.parentNode),e)if(1==f.nodeType){if(d=f.firstChild,1==e.nodeType)for(;f.firstChild;)e.appendChild(f.firstChild);else for(;f.firstChild;)b.parentNode.insertBefore(f.firstChild,b);f.parentNode&&f.parentNode.removeChild(f),a.setBefore(d)}else 1==e.nodeType?e.appendChild(f):b.parentNode.insertBefore(f,b),a.setBefore(f)},f=function(a,b,c,d){var f,g,h;b.isCollapsed()?b.caretIsInTheBeginnig("LI")?(a.preventDefault(),d.commands.exec("outdentList")):b.caretIsInTheBeginnig()?a.preventDefault():(b.caretIsFirstInSelection()&&b.getPreviousNode()&&b.getPreviousNode().nodeName&&/^H\d$/gi.test(b.getPreviousNode().nodeName)&&(f=b.getPreviousNode(),a.preventDefault(),/^\s*$/.test(f.textContent||f.innerText)?f.parentNode.removeChild(f):(g=f.ownerDocument.createRange(),g.selectNodeContents(f),g.collapse(!1),b.setSelection(g))),h=b.caretIsBeforeUneditable(),h&&(a.preventDefault(),e(b,h,c))):b.containsUneditable()&&(a.preventDefault(),b.deleteContents())},g=function(a){if(a.selection.isCollapsed()){if(a.selection.caretIsInTheBeginnig("LI")&&a.commands.exec("indentList"))return}else a.selection.deleteContents();
a.commands.exec("insertHTML","&emsp;")};a.views.Composer.prototype.observe=function(){var e,h,i=this,j=this.getValue(!1,!1),k=this.sandbox.getIframe?this.sandbox.getIframe():this.sandbox.getContentEditable(),l=this.element,m=c.supportsEventsInIframeCorrectly()||this.sandbox.getContentEditable?l:this.sandbox.getWindow(),n=["drop","paste","beforepaste"],o=["drop","paste","mouseup","focus","keyup"];b.observe(k,"DOMNodeRemoved",function(){clearInterval(e),i.parent.fire("destroy:composer")}),c.supportsMutationEvents()||(e=setInterval(function(){b.contains(document.documentElement,k)||(clearInterval(e),i.parent.fire("destroy:composer"))},250)),b.observe(m,o,function(){setTimeout(function(){i.parent.fire("interaction").fire("interaction:composer")},0)}),this.config.handleTables&&(!this.tableClickHandle&&this.doc.execCommand&&a.browser.supportsCommand(this.doc,"enableObjectResizing")&&a.browser.supportsCommand(this.doc,"enableInlineTableEditing")&&(this.sandbox.getIframe?this.tableClickHandle=b.observe(k,["focus","mouseup","mouseover"],function(){i.doc.execCommand("enableObjectResizing",!1,"false"),i.doc.execCommand("enableInlineTableEditing",!1,"false"),i.tableClickHandle.stop()}):setTimeout(function(){i.doc.execCommand("enableObjectResizing",!1,"false"),i.doc.execCommand("enableInlineTableEditing",!1,"false")},0)),this.tableSelection=a.quirks.tableCellsSelection(l,i.parent)),b.observe(m,"focus",function(a){i.parent.fire("focus",a).fire("focus:composer",a),setTimeout(function(){j=i.getValue(!1,!1)},0)}),b.observe(m,"blur",function(a){if(j!==i.getValue(!1,!1)){var b=a;"function"==typeof Object.create&&(b=Object.create(a,{type:{value:"change"}})),i.parent.fire("change",b).fire("change:composer",b)}i.parent.fire("blur",a).fire("blur:composer",a)}),b.observe(l,"dragenter",function(){i.parent.fire("unset_placeholder")}),b.observe(l,n,function(a){i.parent.fire(a.type,a).fire(a.type+":composer",a)}),this.config.copyedFromMarking&&b.observe(l,"copy",function(a){a.clipboardData&&(a.clipboardData.setData("text/html",i.config.copyedFromMarking+i.selection.getHtml()),a.preventDefault()),i.parent.fire(a.type,a).fire(a.type+":composer",a)}),b.observe(l,"keyup",function(b){var c=b.keyCode;(c===a.SPACE_KEY||c===a.ENTER_KEY)&&i.parent.fire("newword:composer")}),this.parent.on("paste:composer",function(){setTimeout(function(){i.parent.fire("newword:composer")},0)}),c.canSelectImagesInContentEditable()||b.observe(l,"mousedown",function(b){var c=b.target,d=l.querySelectorAll("img"),e=l.querySelectorAll("."+i.config.uneditableContainerClassname+" img"),f=a.lang.array(d).without(e);"IMG"===c.nodeName&&a.lang.array(f).contains(c)&&i.selection.selectNode(c)}),c.canSelectImagesInContentEditable()||b.observe(l,"drop",function(){setTimeout(function(){i.selection.getSelection().removeAllRanges()},0)}),c.hasHistoryIssue()&&c.supportsSelectionModify()&&b.observe(l,"keydown",function(a){if(a.metaKey||a.ctrlKey){var b=a.keyCode,c=l.ownerDocument.defaultView,d=c.getSelection();(37===b||39===b)&&(37===b&&(d.modify("extend","left","lineboundary"),a.shiftKey||d.collapseToStart()),39===b&&(d.modify("extend","right","lineboundary"),a.shiftKey||d.collapseToEnd()),a.preventDefault())}}),b.observe(l,"keydown",function(a){var b=a.keyCode,c=d[b];(a.ctrlKey||a.metaKey)&&!a.altKey&&c&&(i.commands.exec(c),a.preventDefault()),8===b?f(a,i.selection,l,i):i.config.handleTabKey&&9===b&&(a.preventDefault(),g(i,l))}),b.observe(l,"keydown",function(b){var c,d=i.selection.getSelectedNode(!0),e=b.keyCode;!d||"IMG"!==d.nodeName||e!==a.BACKSPACE_KEY&&e!==a.DELETE_KEY||(c=d.parentNode,c.removeChild(d),"A"!==c.nodeName||c.firstChild||c.parentNode.removeChild(c),setTimeout(function(){a.quirks.redraw(l)},0),b.preventDefault())}),!this.config.contentEditableMode&&c.hasIframeFocusIssue()&&(b.observe(k,"focus",function(){setTimeout(function(){i.doc.querySelector(":focus")!==i.element&&i.focus()},0)}),b.observe(this.element,"blur",function(){setTimeout(function(){i.selection.getSelection().removeAllRanges()},0)})),h={IMG:"Image: ",A:"Link: "},b.observe(l,"mouseover",function(a){var b,c,d=a.target,e=d.nodeName;("A"===e||"IMG"===e)&&(c=d.hasAttribute("title"),c||(b=h[e]+(d.getAttribute("href")||d.getAttribute("src")),d.setAttribute("title",b)))})}}(wysihtml5),function(a){var b=400;a.views.Synchronizer=Base.extend({constructor:function(a,b,c){this.editor=a,this.textarea=b,this.composer=c,this._observe()},fromComposerToTextarea:function(b){this.textarea.setValue(a.lang.string(this.composer.getValue(!1,!1)).trim(),b)},fromTextareaToComposer:function(a){var b=this.textarea.getValue(!1,!1);b?this.composer.setValue(b,a):(this.composer.clear(),this.editor.fire("set_placeholder"))},sync:function(a){"textarea"===this.editor.currentView.name?this.fromTextareaToComposer(a):this.fromComposerToTextarea(a)},_observe:function(){var c,d=this,e=this.textarea.element.form,f=function(){c=setInterval(function(){d.fromComposerToTextarea()},b)},g=function(){clearInterval(c),c=null};f(),e&&(a.dom.observe(e,"submit",function(){d.sync(!0)}),a.dom.observe(e,"reset",function(){setTimeout(function(){d.fromTextareaToComposer()},0)})),this.editor.on("change_view",function(a){"composer"!==a||c?"textarea"===a&&(d.fromComposerToTextarea(!0),g()):(d.fromTextareaToComposer(!0),f())}),this.editor.on("destroy:composer",g)}})}(wysihtml5),wysihtml5.views.Textarea=wysihtml5.views.View.extend({name:"textarea",constructor:function(a,b,c){this.base(a,b,c),this._observe()},clear:function(){this.element.value=""},getValue:function(a){var b=this.isEmpty()?"":this.element.value;return a!==!1&&(b=this.parent.parse(b)),b},setValue:function(a,b){b&&(a=this.parent.parse(a)),this.element.value=a},cleanUp:function(){var a=this.parent.parse(this.element.value);this.element.value=a},hasPlaceholderSet:function(){var a=wysihtml5.browser.supportsPlaceholderAttributeOn(this.element),b=this.element.getAttribute("placeholder")||null,c=this.element.value,d=!c;return a&&d||c===b},isEmpty:function(){return!wysihtml5.lang.string(this.element.value).trim()||this.hasPlaceholderSet()},_observe:function(){var a=this.element,b=this.parent,c={focusin:"focus",focusout:"blur"},d=wysihtml5.browser.supportsEvent("focusin")?["focusin","focusout","change"]:["focus","blur","change"];b.on("beforeload",function(){wysihtml5.dom.observe(a,d,function(a){var d=c[a.type]||a.type;b.fire(d).fire(d+":textarea")}),wysihtml5.dom.observe(a,["paste","drop"],function(){setTimeout(function(){b.fire("paste").fire("paste:textarea")},0)})})}}),function(a){var b,c={name:b,style:!0,toolbar:b,showToolbarAfterInit:!0,autoLink:!0,handleTables:!0,handleTabKey:!0,parserRules:{tags:{br:{},span:{},div:{},p:{}},classes:{}},pasteParserRulesets:null,parser:a.dom.parse,composerClassName:"wysihtml5-editor",bodyClassName:"wysihtml5-supported",useLineBreaks:!0,stylesheets:[],placeholderText:b,supportTouchDevices:!0,cleanUp:!0,contentEditableMode:!1,uneditableContainerClassname:"wysihtml5-uneditable-container",copyedFromMarking:'<meta name="copied-from" content="wysihtml5">'};a.Editor=a.lang.Dispatcher.extend({constructor:function(b,d){if(this.editableElement="string"==typeof b?document.getElementById(b):b,this.config=a.lang.object({}).merge(c).merge(d).get(),this._isCompatible=a.browser.supported(),"textarea"!=this.editableElement.nodeName.toLowerCase()&&(this.config.contentEditableMode=!0,this.config.noTextarea=!0),this.config.noTextarea||(this.textarea=new a.views.Textarea(this,this.editableElement,this.config),this.currentView=this.textarea),!this._isCompatible||!this.config.supportTouchDevices&&a.browser.isTouchDevice()){var e=this;return setTimeout(function(){e.fire("beforeload").fire("load")},0),void 0}a.dom.addClass(document.body,this.config.bodyClassName),this.composer=new a.views.Composer(this,this.editableElement,this.config),this.currentView=this.composer,"function"==typeof this.config.parser&&this._initParser(),this.on("beforeload",this.handleBeforeLoad)},handleBeforeLoad:function(){this.config.noTextarea||(this.synchronizer=new a.views.Synchronizer(this,this.textarea,this.composer)),this.config.toolbar&&(this.toolbar=new a.toolbar.Toolbar(this,this.config.toolbar,this.config.showToolbarAfterInit))},isCompatible:function(){return this._isCompatible},clear:function(){return this.currentView.clear(),this},getValue:function(a,b){return this.currentView.getValue(a,b)},setValue:function(a,b){return this.fire("unset_placeholder"),a?(this.currentView.setValue(a,b),this):this.clear()},cleanUp:function(){this.currentView.cleanUp()},focus:function(a){return this.currentView.focus(a),this},disable:function(){return this.currentView.disable(),this},enable:function(){return this.currentView.enable(),this},isEmpty:function(){return this.currentView.isEmpty()},hasPlaceholderSet:function(){return this.currentView.hasPlaceholderSet()},parse:function(b,c){var d=this.config.contentEditableMode?document:this.composer?this.composer.sandbox.getDocument():null,e=this.config.parser(b,{rules:this.config.parserRules,cleanUp:this.config.cleanUp,context:d,uneditableClass:this.config.uneditableContainerClassname,clearInternals:c});return"object"==typeof b&&a.quirks.redraw(b),e},_initParser:function(){var b,c=this;a.browser.supportsModenPaste()?this.on("paste:composer",function(d){d.preventDefault(),b=a.dom.getPastedHtml(d),b&&c._cleanAndPaste(b)}):this.on("beforepaste:composer",function(b){b.preventDefault(),a.dom.getPastedHtmlWithDiv(c.composer,function(a){a&&c._cleanAndPaste(a)})})},_cleanAndPaste:function(b){var c=a.quirks.cleanPastedHTML(b,{referenceNode:this.composer.element,rules:this.config.pasteParserRulesets||[{set:this.config.parserRules}],uneditableClass:this.config.uneditableContainerClassname});this.composer.selection.deleteContents(),this.composer.selection.insertHTML(c)}})}(wysihtml5),function(a){var b=a.dom,c="wysihtml5-command-dialog-opened",d="input, select, textarea",e="[data-wysihtml5-dialog-field]",f="data-wysihtml5-dialog-field";a.toolbar.Dialog=a.lang.Dispatcher.extend({constructor:function(a,b){this.link=a,this.container=b},_observe:function(){var e,f,g,h,i,j;if(!this._observed){for(e=this,f=function(a){var b=e._serialize();b==e.elementToChange?e.fire("edit",b):e.fire("save",b),e.hide(),a.preventDefault(),a.stopPropagation()},b.observe(e.link,"click",function(){b.hasClass(e.link,c)&&setTimeout(function(){e.hide()},0)}),b.observe(this.container,"keydown",function(b){var c=b.keyCode;c===a.ENTER_KEY&&f(b),c===a.ESCAPE_KEY&&(e.fire("cancel"),e.hide())}),b.delegate(this.container,"[data-wysihtml5-dialog-action=save]","click",f),b.delegate(this.container,"[data-wysihtml5-dialog-action=cancel]","click",function(a){e.fire("cancel"),e.hide(),a.preventDefault(),a.stopPropagation()}),g=this.container.querySelectorAll(d),h=0,i=g.length,j=function(){clearInterval(e.interval)};i>h;h++)b.observe(g[h],"change",j);this._observed=!0}},_serialize:function(){for(var a=this.elementToChange||{},b=this.container.querySelectorAll(e),c=b.length,d=0;c>d;d++)a[b[d].getAttribute(f)]=b[d].value;return a},_interpolate:function(a){for(var b,c,d,g=document.querySelector(":focus"),h=this.container.querySelectorAll(e),i=h.length,j=0;i>j;j++)b=h[j],b!==g&&(a&&"hidden"===b.type||(c=b.getAttribute(f),d=this.elementToChange&&"boolean"!=typeof this.elementToChange?this.elementToChange.getAttribute(c)||"":b.defaultValue,b.value=d))},show:function(a){if(!b.hasClass(this.link,c)){var e=this,f=this.container.querySelector(d);if(this.elementToChange=a,this._observe(),this._interpolate(),a&&(this.interval=setInterval(function(){e._interpolate(!0)},500)),b.addClass(this.link,c),this.container.style.display="",this.fire("show"),f&&!a)try{f.focus()}catch(g){}}},hide:function(){clearInterval(this.interval),this.elementToChange=null,b.removeClass(this.link,c),this.container.style.display="none",this.fire("hide")}})}(wysihtml5),function(a){var b=a.dom,c={position:"relative"},d={left:0,margin:0,opacity:0,overflow:"hidden",padding:0,position:"absolute",top:0,zIndex:1},e={cursor:"inherit",fontSize:"50px",height:"50px",marginTop:"-25px",outline:0,padding:0,position:"absolute",right:"-4px",top:"50%"},f={"x-webkit-speech":"",speech:""};a.toolbar.Speech=function(g,h){var i,j,k,l=document.createElement("input");return a.browser.supportsSpeechApiOn(l)?(i=g.editor.textarea.element.getAttribute("lang"),i&&(f.lang=i),j=document.createElement("div"),a.lang.object(d).merge({width:h.offsetWidth+"px",height:h.offsetHeight+"px"}),b.insert(l).into(j),b.insert(j).into(h),b.setStyles(e).on(l),b.setAttributes(f).on(l),b.setStyles(d).on(j),b.setStyles(c).on(h),k="onwebkitspeechchange"in l?"webkitspeechchange":"speechchange",b.observe(l,k,function(){g.execCommand("insertText",l.value),l.value=""}),b.observe(l,"click",function(a){b.hasClass(h,"wysihtml5-command-disabled")&&a.preventDefault(),a.stopPropagation()}),void 0):(h.style.display="none",void 0)}}(wysihtml5),function(a){var b="wysihtml5-command-disabled",c="wysihtml5-commands-disabled",d="wysihtml5-command-active",e="wysihtml5-action-active",f=a.dom;a.toolbar.Toolbar=Base.extend({constructor:function(f,g,h){this.editor=f,this.container="string"==typeof g?document.getElementById(g):g,this.composer=f.composer,this._getLinks("command"),this._getLinks("action"),this._observe(),h&&this.show(),null!=f.config.classNameCommandDisabled&&(b=f.config.classNameCommandDisabled),null!=f.config.classNameCommandsDisabled&&(c=f.config.classNameCommandsDisabled),null!=f.config.classNameCommandActive&&(d=f.config.classNameCommandActive),null!=f.config.classNameActionActive&&(e=f.config.classNameActionActive);for(var i=this.container.querySelectorAll("[data-wysihtml5-command=insertSpeech]"),j=i.length,k=0;j>k;k++)new a.toolbar.Speech(this,i[k])},_getLinks:function(b){for(var c,d,e,f,g,h=this[b+"Links"]=a.lang.array(this.container.querySelectorAll("[data-wysihtml5-"+b+"]")).get(),i=h.length,j=0,k=this[b+"Mapping"]={};i>j;j++)c=h[j],e=c.getAttribute("data-wysihtml5-"+b),f=c.getAttribute("data-wysihtml5-"+b+"-value"),d=this.container.querySelector("[data-wysihtml5-"+b+"-group='"+e+"']"),g=this._getDialog(c,e),k[e+":"+f]={link:c,group:d,name:e,value:f,dialog:g,state:!1}},_getDialog:function(b,c){var d,e,f=this,g=this.container.querySelector("[data-wysihtml5-dialog='"+c+"']");return g&&(d=a.toolbar["Dialog_"+c]?new a.toolbar["Dialog_"+c](b,g):new a.toolbar.Dialog(b,g),d.on("show",function(){e=f.composer.selection.getBookmark(),f.editor.fire("show:dialog",{command:c,dialogContainer:g,commandLink:b})}),d.on("save",function(a){e&&f.composer.selection.setBookmark(e),f._execCommand(c,a),f.editor.fire("save:dialog",{command:c,dialogContainer:g,commandLink:b})}),d.on("cancel",function(){f.editor.focus(!1),f.editor.fire("cancel:dialog",{command:c,dialogContainer:g,commandLink:b})})),d},execCommand:function(a,b){if(!this.commandsDisabled){var c=this.commandMapping[a+":"+b];c&&c.dialog&&!c.state?c.dialog.show():this._execCommand(a,b)}},_execCommand:function(a,b){this.editor.focus(!1),this.composer.commands.exec(a,b),this._updateLinkStates()},execAction:function(a){var b=this.editor;"change_view"===a&&b.textarea&&(b.currentView===b.textarea?b.fire("change_view","composer"):b.fire("change_view","textarea")),"showSource"==a&&b.fire("showSource")},_observe:function(){for(var a=this,b=this.editor,d=this.container,e=this.commandLinks.concat(this.actionLinks),g=e.length,h=0;g>h;h++)"A"===e[h].nodeName?f.setAttributes({href:"javascript:;",unselectable:"on"}).on(e[h]):f.setAttributes({unselectable:"on"}).on(e[h]);f.delegate(d,"[data-wysihtml5-command], [data-wysihtml5-action]","mousedown",function(a){a.preventDefault()}),f.delegate(d,"[data-wysihtml5-command]","click",function(b){var c=this,d=c.getAttribute("data-wysihtml5-command"),e=c.getAttribute("data-wysihtml5-command-value");a.execCommand(d,e),b.preventDefault()}),f.delegate(d,"[data-wysihtml5-action]","click",function(b){var c=this.getAttribute("data-wysihtml5-action");a.execAction(c),b.preventDefault()}),b.on("interaction:composer",function(){a._updateLinkStates()}),b.on("focus:composer",function(){a.bookmark=null}),this.editor.config.handleTables&&(b.on("tableselect:composer",function(){a.container.querySelectorAll('[data-wysihtml5-hiddentools="table"]')[0].style.display=""}),b.on("tableunselect:composer",function(){a.container.querySelectorAll('[data-wysihtml5-hiddentools="table"]')[0].style.display="none"})),b.on("change_view",function(e){b.textarea&&setTimeout(function(){a.commandsDisabled="composer"!==e,a._updateLinkStates(),a.commandsDisabled?f.addClass(d,c):f.removeClass(d,c)},0)})},_updateLinkStates:function(){var c,g,h,i,j=this.commandMapping,k=this.actionMapping;for(c in j)i=j[c],this.commandsDisabled?(g=!1,f.removeClass(i.link,d),i.group&&f.removeClass(i.group,d),i.dialog&&i.dialog.hide()):(g=this.composer.commands.state(i.name,i.value),f.removeClass(i.link,b),i.group&&f.removeClass(i.group,b)),i.state!==g&&(i.state=g,g?(f.addClass(i.link,d),i.group&&f.addClass(i.group,d),i.dialog&&("object"==typeof g||a.lang.object(g).isArray()?(!i.dialog.multiselect&&a.lang.object(g).isArray()&&(g=1===g.length?g[0]:!0,i.state=g),i.dialog.show(g)):i.dialog.hide())):(f.removeClass(i.link,d),i.group&&f.removeClass(i.group,d),i.dialog&&i.dialog.hide()));for(c in k)h=k[c],"change_view"===h.name&&(h.state=this.editor.currentView===this.editor.textarea,h.state?f.addClass(h.link,e):f.removeClass(h.link,e))},show:function(){this.container.style.display=""},hide:function(){this.container.style.display="none"}})}(wysihtml5),function(a){a.toolbar.Dialog_createTable=a.toolbar.Dialog.extend({show:function(a){this.base(a)}})}(wysihtml5),function(a){var b=(a.dom,"[data-wysihtml5-dialog-field]"),c="data-wysihtml5-dialog-field";a.toolbar.Dialog_foreColorStyle=a.toolbar.Dialog.extend({multiselect:!0,_serialize:function(){for(var a={},d=this.container.querySelectorAll(b),e=d.length,f=0;e>f;f++)a[d[f].getAttribute(c)]=d[f].value;return a},_interpolate:function(d){for(var e,f=document.querySelector(":focus"),g=this.container.querySelectorAll(b),h=g.length,i=0,j=this.elementToChange?a.lang.object(this.elementToChange).isArray()?this.elementToChange[0]:this.elementToChange:null,k=j?j.getAttribute("style"):null,l=k?a.quirks.styleParser.parseColor(k,"color"):null;h>i;i++)e=g[i],e!==f&&(d&&"hidden"===e.type||"color"===e.getAttribute(c)&&(e.value=l?l[3]&&1!=l[3]?"rgba("+l[0]+","+l[1]+","+l[2]+","+l[3]+");":"rgb("+l[0]+","+l[1]+","+l[2]+");":"rgb(0,0,0);"))}})}(wysihtml5),function(a){a.dom;a.toolbar.Dialog_fontSizeStyle=a.toolbar.Dialog.extend({multiselect:!0,_serialize:function(){return{size:this.container.querySelector('[data-wysihtml5-dialog-field="size"]').value}},_interpolate:function(){var b=document.querySelector(":focus"),c=this.container.querySelector("[data-wysihtml5-dialog-field='size']"),d=this.elementToChange?a.lang.object(this.elementToChange).isArray()?this.elementToChange[0]:this.elementToChange:null,e=d?d.getAttribute("style"):null,f=e?a.quirks.styleParser.parseFontSize(e):null;c&&c!==b&&f&&!/^\s*$/.test(f)&&(c.value=f)}})}(wysihtml5),Handlebars=function(){var a=function(){"use strict";function a(a){this.string=a}var b;return a.prototype.toString=function(){return""+this.string},b=a}(),b=function(a){"use strict";function b(a){return k[a]||"&amp;"}function c(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])}function d(a){return a instanceof j?""+a:a||0===a?(a=""+a,m.test(a)?a.replace(l,b):a):""}function e(a){return a||0===a?h(a)&&0===a.length?!0:!1:!0}var f,g,h,i={},j=a,k={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},l=/[&<>"'`]/g,m=/[&<>"'`]/;return i.extend=c,f=Object.prototype.toString,i.toString=f,g=function(a){return"function"==typeof a},g(/x/)&&(g=function(a){return"function"==typeof a&&"[object Function]"===f.call(a)}),i.isFunction=g,h=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===f.call(a):!1},i.isArray=h,i.escapeExpression=d,i.isEmpty=e,i}(a),c=function(){"use strict";function a(a,b){var d,e,f;for(b&&b.firstLine&&(d=b.firstLine,a+=" - "+d+":"+b.firstColumn),e=Error.prototype.constructor.call(this,a),f=0;f<c.length;f++)this[c[f]]=e[c[f]];d&&(this.lineNumber=d,this.column=b.firstColumn)}var b,c=["description","fileName","lineNumber","message","name","number","stack"];return a.prototype=Error(),b=a}(),d=function(a,b){"use strict";function c(a,b){this.helpers=a||{},this.partials=b||{},d(this)}function d(a){a.registerHelper("helperMissing",function(a){if(2===arguments.length)return void 0;throw new p("Missing helper: '"+a+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse||function(){},e=c.fn;return i(b)&&(b=b.call(this)),b===!0?e(this):b===!1||null==b?d(this):h(b)?b.length>0?a.helpers.each(b,c):d(this):e(b)}),a.registerHelper("each",function(a,b){var c,d,e,f=b.fn,g=b.inverse,j=0,k="";if(i(a)&&(a=a.call(this)),b.data&&(c=m(b.data)),a&&"object"==typeof a)if(h(a))for(d=a.length;d>j;j++)c&&(c.index=j,c.first=0===j,c.last=j===a.length-1),k+=f(a[j],{data:c});else for(e in a)a.hasOwnProperty(e)&&(c&&(c.key=e,c.index=j,c.first=0===j),k+=f(a[e],{data:c}),j++);return 0===j&&(k=g(this)),k}),a.registerHelper("if",function(a,b){return i(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||o.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){return i(a)&&(a=a.call(this)),o.isEmpty(a)?void 0:b.fn(a)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)})}function e(a,b){l.log(a,b)}var f,g,h,i,j,k,l,m,n={},o=a,p=b,q="1.3.0";return n.VERSION=q,f=4,n.COMPILER_REVISION=f,g={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:">= 1.0.0"},n.REVISION_CHANGES=g,h=o.isArray,i=o.isFunction,j=o.toString,k="[object Object]",n.HandlebarsEnvironment=c,c.prototype={constructor:c,logger:l,log:e,registerHelper:function(a,b,c){if(j.call(a)===k){if(c||b)throw new p("Arg not supported with multiple helpers");o.extend(this.helpers,a)}else c&&(b.not=c),this.helpers[a]=b},registerPartial:function(a,b){j.call(a)===k?o.extend(this.partials,a):this.partials[a]=b}},l={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(a,b){if(l.level<=a){var c=l.methodMap[a];"undefined"!=typeof console&&console[c]&&console[c].call(console,b)}}},n.logger=l,n.log=e,m=function(a){var b={};return o.extend(b,a),b},n.createFrame=m,n}(b,c),e=function(a,b,c){"use strict";function d(a){var b,c,d=a&&a[0]||1,e=m;if(d!==e){if(e>d)throw b=n[e],c=n[d],new l("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+b+") or downgrade your runtime to an older version ("+c+").");throw new l("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){if(!b)throw new l("No environment passed to template");var c=function(a,c,d,e,f,g){var h,i=b.VM.invokePartial.apply(this,arguments);if(null!=i)return i;if(b.compile)return h={helpers:e,partials:f,data:g},f[c]=b.compile(a,{data:void 0!==g},b),f[c](d,h);throw new l("The partial "+c+" could not be compiled when running in runtime-only mode")},d={escapeExpression:k.escapeExpression,invokePartial:c,programs:[],program:function(a,b,c){var d=this.programs[a];return c?d=g(a,b,c):d||(d=this.programs[a]=g(a,b)),d},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c={},k.extend(c,b),k.extend(c,a)),c},programWithDepth:b.VM.programWithDepth,noop:b.VM.noop,compilerInfo:null};return function(c,e){var f,g,h,i;return e=e||{},h=e.partial?e:b,e.partial||(f=e.helpers,g=e.partials),i=a.call(d,h,c,f,g,e.data),e.partial||b.VM.checkRevision(d.compilerInfo),i}}function f(a,b,c){var d=Array.prototype.slice.call(arguments,3),e=function(a,e){return e=e||{},b.apply(this,[a,e.data||c].concat(d))};return e.program=a,e.depth=d.length,e}function g(a,b,c){var d=function(a,d){return d=d||{},b(a,d.data||c)};return d.program=a,d.depth=0,d}function h(a,b,c,d,e,f){var g={partial:!0,helpers:d,partials:e,data:f};if(void 0===a)throw new l("The partial "+b+" could not be found");return a instanceof Function?a(c,g):void 0}function i(){return""}var j={},k=a,l=b,m=c.COMPILER_REVISION,n=c.REVISION_CHANGES;return j.checkRevision=d,j.template=e,j.programWithDepth=f,j.program=g,j.invokePartial=h,j.noop=i,j}(b,c,d),f=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c,j=d,k=e,l=function(){var a=new g.HandlebarsEnvironment;return j.extend(a,g),a.SafeString=h,a.Exception=i,a.Utils=j,a.VM=k,a.template=function(b){return k.template(b,a)},a},m=l();return m.create=l,f=m}(d,a,c,b,e);return f}(),this.wysihtml5=this.wysihtml5||{},this.wysihtml5.tpl=this.wysihtml5.tpl||{},this.wysihtml5.tpl.blockquote=Handlebars.template(function(a,b,c,d,e){function f(a){var b,c="";return c+="btn-"+l((b=a&&a.options,b=null==b||b===!1?b:b.toolbar,b=null==b||b===!1?b:b.size,typeof b===k?b.apply(a):b)),c}function g(){return' \n      <span class="fa fa-quote-left"></span>\n    '}function h(){return'\n      <span class="glyphicon glyphicon-quote"></span>\n    '}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var i,j="",k="function",l=this.escapeExpression,m=this;return j+='<li>\n  <a class="btn ',i=c["if"].call(b,(i=b&&b.options,i=null==i||i===!1?i:i.toolbar,null==i||i===!1?i:i.size),{hash:{},inverse:m.noop,fn:m.program(1,f,e),data:e}),(i||0===i)&&(j+=i),j+=' btn-default" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="blockquote" data-wysihtml5-display-format-name="false" tabindex="-1">\n    ',i=c["if"].call(b,(i=b&&b.options,i=null==i||i===!1?i:i.toolbar,null==i||i===!1?i:i.fa),{hash:{},inverse:m.program(5,h,e),fn:m.program(3,g,e),data:e}),(i||0===i)&&(j+=i),j+="\n  </a>\n</li>\n",j}),this.wysihtml5.tpl.color=Handlebars.template(function(a,b,c,d,e){function f(a){var b,c="";return c+="btn-"+j((b=a&&a.options,b=null==b||b===!1?b:b.toolbar,b=null==b||b===!1?b:b.size,typeof b===i?b.apply(a):b)),c}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var g,h="",i="function",j=this.escapeExpression,k=this;return h+='<li class="dropdown">\n  <a class="btn btn-default dropdown-toggle ',g=c["if"].call(b,(g=b&&b.options,g=null==g||g===!1?g:g.toolbar,null==g||g===!1?g:g.size),{hash:{},inverse:k.noop,fn:k.program(1,f,e),data:e}),(g||0===g)&&(h+=g),h+='" data-toggle="dropdown" tabindex="-1">\n    <span class="current-color">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.black,typeof g===i?g.apply(b):g))+'</span>\n    <b class="caret"></b>\n  </a>\n  <ul class="dropdown-menu">\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="black"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="black">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.black,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="silver"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="silver">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.silver,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="gray"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="gray">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.gray,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="maroon"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="maroon">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.maroon,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="red"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="red">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.red,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="purple"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="purple">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.purple,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="green"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="green">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.green,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="olive"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="olive">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.olive,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="navy"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="navy">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.navy,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="blue"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="blue">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.blue,typeof g===i?g.apply(b):g))+'</a></li>\n    <li><div class="wysihtml5-colors" data-wysihtml5-command-value="orange"></div><a class="wysihtml5-colors-title" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="orange">'+j((g=b&&b.locale,g=null==g||g===!1?g:g.colours,g=null==g||g===!1?g:g.orange,typeof g===i?g.apply(b):g))+"</a></li>\n  </ul>\n</li>\n",h}),this.wysihtml5.tpl.emphasis=Handlebars.template(function(a,b,c,d,e){function f(a){var b,c="";return c+="btn-"+k((b=a&&a.options,b=null==b||b===!1?b:b.toolbar,b=null==b||b===!1?b:b.size,typeof b===j?b.apply(a):b)),c}function g(a,b){var d,e="";return e+='\n    <a class="btn ',d=c["if"].call(a,(d=a&&a.options,d=null==d||d===!1?d:d.toolbar,null==d||d===!1?d:d.size),{hash:{},inverse:l.noop,fn:l.program(1,f,b),data:b}),(d||0===d)&&(e+=d),e+=' btn-default" data-wysihtml5-command="small" title="CTRL+S" tabindex="-1">'+k((d=a&&a.locale,d=null==d||d===!1?d:d.emphasis,d=null==d||d===!1?d:d.small,typeof d===j?d.apply(a):d))+"</a>\n    ",e}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var h,i="",j="function",k=this.escapeExpression,l=this;return i+='<li>\n  <div class="btn-group">\n    <a class="btn ',h=c["if"].call(b,(h=b&&b.options,h=null==h||h===!1?h:h.toolbar,null==h||h===!1?h:h.size),{hash:{},inverse:l.noop,fn:l.program(1,f,e),data:e}),(h||0===h)&&(i+=h),i+=' btn-default" data-wysihtml5-command="bold" title="CTRL+B" tabindex="-1">'+k((h=b&&b.locale,h=null==h||h===!1?h:h.emphasis,h=null==h||h===!1?h:h.bold,typeof h===j?h.apply(b):h))+'</a>\n    <a class="btn ',h=c["if"].call(b,(h=b&&b.options,h=null==h||h===!1?h:h.toolbar,null==h||h===!1?h:h.size),{hash:{},inverse:l.noop,fn:l.program(1,f,e),data:e}),(h||0===h)&&(i+=h),i+=' btn-default" data-wysihtml5-command="italic" title="CTRL+I" tabindex="-1">'+k((h=b&&b.locale,h=null==h||h===!1?h:h.emphasis,h=null==h||h===!1?h:h.italic,typeof h===j?h.apply(b):h))+'</a>\n    <a class="btn ',h=c["if"].call(b,(h=b&&b.options,h=null==h||h===!1?h:h.toolbar,null==h||h===!1?h:h.size),{hash:{},inverse:l.noop,fn:l.program(1,f,e),data:e}),(h||0===h)&&(i+=h),i+=' btn-default" data-wysihtml5-command="underline" title="CTRL+U" tabindex="-1">'+k((h=b&&b.locale,h=null==h||h===!1?h:h.emphasis,h=null==h||h===!1?h:h.underline,typeof h===j?h.apply(b):h))+"</a>\n    ",h=c["if"].call(b,(h=b&&b.options,h=null==h||h===!1?h:h.toolbar,h=null==h||h===!1?h:h.emphasis,null==h||h===!1?h:h.small),{hash:{},inverse:l.noop,fn:l.program(3,g,e),data:e}),(h||0===h)&&(i+=h),i+="\n  </div>\n</li>\n",i
}),this.wysihtml5.tpl["font-styles"]=Handlebars.template(function(a,b,c,d,e){function f(a){var b,c="";return c+="btn-"+l((b=a&&a.options,b=null==b||b===!1?b:b.toolbar,b=null==b||b===!1?b:b.size,typeof b===k?b.apply(a):b)),c}function g(){return'\n      <span class="fa fa-font"></span>\n    '}function h(){return'\n      <span class="glyphicon glyphicon-font"></span>\n    '}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var i,j="",k="function",l=this.escapeExpression,m=this;return j+='<li class="dropdown">\n  <a class="btn btn-default dropdown-toggle ',i=c["if"].call(b,(i=b&&b.options,i=null==i||i===!1?i:i.toolbar,null==i||i===!1?i:i.size),{hash:{},inverse:m.noop,fn:m.program(1,f,e),data:e}),(i||0===i)&&(j+=i),j+='" data-toggle="dropdown">\n    ',i=c["if"].call(b,(i=b&&b.options,i=null==i||i===!1?i:i.toolbar,null==i||i===!1?i:i.fa),{hash:{},inverse:m.program(5,h,e),fn:m.program(3,g,e),data:e}),(i||0===i)&&(j+=i),j+='\n    <span class="current-font">'+l((i=b&&b.locale,i=null==i||i===!1?i:i.font_styles,i=null==i||i===!1?i:i.normal,typeof i===k?i.apply(b):i))+'</span>\n    <b class="caret"></b>\n  </a>\n  <ul class="dropdown-menu">\n    <li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="p" tabindex="-1">'+l((i=b&&b.locale,i=null==i||i===!1?i:i.font_styles,i=null==i||i===!1?i:i.normal,typeof i===k?i.apply(b):i))+'</a></li>\n    <li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1" tabindex="-1">'+l((i=b&&b.locale,i=null==i||i===!1?i:i.font_styles,i=null==i||i===!1?i:i.h1,typeof i===k?i.apply(b):i))+'</a></li>\n    <li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2" tabindex="-1">'+l((i=b&&b.locale,i=null==i||i===!1?i:i.font_styles,i=null==i||i===!1?i:i.h2,typeof i===k?i.apply(b):i))+'</a></li>\n    <li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h3" tabindex="-1">'+l((i=b&&b.locale,i=null==i||i===!1?i:i.font_styles,i=null==i||i===!1?i:i.h3,typeof i===k?i.apply(b):i))+'</a></li>\n    <li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h4" tabindex="-1">'+l((i=b&&b.locale,i=null==i||i===!1?i:i.font_styles,i=null==i||i===!1?i:i.h4,typeof i===k?i.apply(b):i))+'</a></li>\n    <li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h5" tabindex="-1">'+l((i=b&&b.locale,i=null==i||i===!1?i:i.font_styles,i=null==i||i===!1?i:i.h5,typeof i===k?i.apply(b):i))+'</a></li>\n    <li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h6" tabindex="-1">'+l((i=b&&b.locale,i=null==i||i===!1?i:i.font_styles,i=null==i||i===!1?i:i.h6,typeof i===k?i.apply(b):i))+"</a></li>\n  </ul>\n</li>\n",j}),this.wysihtml5.tpl.html=Handlebars.template(function(a,b,c,d,e){function f(a){var b,c="";return c+="btn-"+l((b=a&&a.options,b=null==b||b===!1?b:b.toolbar,b=null==b||b===!1?b:b.size,typeof b===k?b.apply(a):b)),c}function g(){return'\n        <span class="fa fa-pencil"></span>\n      '}function h(){return'\n        <span class="glyphicon glyphicon-pencil"></span>\n      '}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var i,j="",k="function",l=this.escapeExpression,m=this;return j+='<li>\n  <div class="btn-group">\n    <a class="btn ',i=c["if"].call(b,(i=b&&b.options,i=null==i||i===!1?i:i.toolbar,null==i||i===!1?i:i.size),{hash:{},inverse:m.noop,fn:m.program(1,f,e),data:e}),(i||0===i)&&(j+=i),j+=' btn-default" data-wysihtml5-action="change_view" title="'+l((i=b&&b.locale,i=null==i||i===!1?i:i.html,i=null==i||i===!1?i:i.edit,typeof i===k?i.apply(b):i))+'" tabindex="-1">\n      ',i=c["if"].call(b,(i=b&&b.options,i=null==i||i===!1?i:i.toolbar,null==i||i===!1?i:i.fa),{hash:{},inverse:m.program(5,h,e),fn:m.program(3,g,e),data:e}),(i||0===i)&&(j+=i),j+="\n    </a>\n  </div>\n</li>\n",j}),this.wysihtml5.tpl.image=Handlebars.template(function(a,b,c,d,e){function f(){return"modal-sm"}function g(a){var b,c="";return c+="btn-"+m((b=a&&a.options,b=null==b||b===!1?b:b.toolbar,b=null==b||b===!1?b:b.size,typeof b===l?b.apply(a):b)),c}function h(){return'\n      <span class="fa fa-file-image-o"></span>\n    '}function i(){return'\n      <span class="glyphicon glyphicon-picture"></span>\n    '}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var j,k="",l="function",m=this.escapeExpression,n=this;return k+='<li>\n  <div class="bootstrap-wysihtml5-insert-image-modal modal fade" data-wysihtml5-dialog="insertImage">\n    <div class="modal-dialog ',j=c["if"].call(b,(j=b&&b.options,j=null==j||j===!1?j:j.toolbar,null==j||j===!1?j:j.smallmodals),{hash:{},inverse:n.noop,fn:n.program(1,f,e),data:e}),(j||0===j)&&(k+=j),k+='">\n      <div class="modal-content">\n        <div class="modal-header">\n          <a class="close" data-dismiss="modal">&times;</a>\n          <h3>'+m((j=b&&b.locale,j=null==j||j===!1?j:j.image,j=null==j||j===!1?j:j.insert,typeof j===l?j.apply(b):j))+'</h3>\n        </div>\n        <div class="modal-body">\n          <div class="form-group">\n            <input value="http://" class="bootstrap-wysihtml5-insert-image-url form-control" data-wysihtml5-dialog-field="src">\n          </div> \n        </div>\n        <div class="modal-footer">\n          <a class="btn btn-default" data-dismiss="modal" data-wysihtml5-dialog-action="cancel" href="#">'+m((j=b&&b.locale,j=null==j||j===!1?j:j.image,j=null==j||j===!1?j:j.cancel,typeof j===l?j.apply(b):j))+'</a>\n          <a class="btn btn-primary" data-dismiss="modal"  data-wysihtml5-dialog-action="save" href="#">'+m((j=b&&b.locale,j=null==j||j===!1?j:j.image,j=null==j||j===!1?j:j.insert,typeof j===l?j.apply(b):j))+'</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <a class="btn ',j=c["if"].call(b,(j=b&&b.options,j=null==j||j===!1?j:j.toolbar,null==j||j===!1?j:j.size),{hash:{},inverse:n.noop,fn:n.program(3,g,e),data:e}),(j||0===j)&&(k+=j),k+=' btn-default" data-wysihtml5-command="insertImage" title="'+m((j=b&&b.locale,j=null==j||j===!1?j:j.image,j=null==j||j===!1?j:j.insert,typeof j===l?j.apply(b):j))+'" tabindex="-1">\n    ',j=c["if"].call(b,(j=b&&b.options,j=null==j||j===!1?j:j.toolbar,null==j||j===!1?j:j.fa),{hash:{},inverse:n.program(7,i,e),fn:n.program(5,h,e),data:e}),(j||0===j)&&(k+=j),k+="\n  </a>\n</li>\n",k}),this.wysihtml5.tpl.link=Handlebars.template(function(a,b,c,d,e){function f(){return"modal-sm"}function g(a){var b,c="";return c+="btn-"+m((b=a&&a.options,b=null==b||b===!1?b:b.toolbar,b=null==b||b===!1?b:b.size,typeof b===l?b.apply(a):b)),c}function h(){return'\n      <span class="fa fa-share-square-o"></span>\n    '}function i(){return'\n      <span class="glyphicon glyphicon-share"></span>\n    '}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var j,k="",l="function",m=this.escapeExpression,n=this;return k+='<li>\n  <div class="bootstrap-wysihtml5-insert-link-modal modal fade" data-wysihtml5-dialog="createLink">\n    <div class="modal-dialog ',j=c["if"].call(b,(j=b&&b.options,j=null==j||j===!1?j:j.toolbar,null==j||j===!1?j:j.smallmodals),{hash:{},inverse:n.noop,fn:n.program(1,f,e),data:e}),(j||0===j)&&(k+=j),k+='">\n      <div class="modal-content">\n        <div class="modal-header">\n          <a class="close" data-dismiss="modal">&times;</a>\n          <h3>'+m((j=b&&b.locale,j=null==j||j===!1?j:j.link,j=null==j||j===!1?j:j.insert,typeof j===l?j.apply(b):j))+'</h3>\n        </div>\n        <div class="modal-body">\n          <div class="form-group">\n            <input value="http://" class="bootstrap-wysihtml5-insert-link-url form-control" data-wysihtml5-dialog-field="href">\n          </div> \n          <div class="checkbox">\n            <label> \n              <input type="checkbox" class="bootstrap-wysihtml5-insert-link-target" checked>'+m((j=b&&b.locale,j=null==j||j===!1?j:j.link,j=null==j||j===!1?j:j.target,typeof j===l?j.apply(b):j))+'\n            </label>\n          </div>\n        </div>\n        <div class="modal-footer">\n          <a class="btn btn-default" data-dismiss="modal" data-wysihtml5-dialog-action="cancel" href="#">'+m((j=b&&b.locale,j=null==j||j===!1?j:j.link,j=null==j||j===!1?j:j.cancel,typeof j===l?j.apply(b):j))+'</a>\n          <a href="#" class="btn btn-primary" data-dismiss="modal" data-wysihtml5-dialog-action="save">'+m((j=b&&b.locale,j=null==j||j===!1?j:j.link,j=null==j||j===!1?j:j.insert,typeof j===l?j.apply(b):j))+'</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <a class="btn ',j=c["if"].call(b,(j=b&&b.options,j=null==j||j===!1?j:j.toolbar,null==j||j===!1?j:j.size),{hash:{},inverse:n.noop,fn:n.program(3,g,e),data:e}),(j||0===j)&&(k+=j),k+=' btn-default" data-wysihtml5-command="createLink" title="'+m((j=b&&b.locale,j=null==j||j===!1?j:j.link,j=null==j||j===!1?j:j.insert,typeof j===l?j.apply(b):j))+'" tabindex="-1">\n    ',j=c["if"].call(b,(j=b&&b.options,j=null==j||j===!1?j:j.toolbar,null==j||j===!1?j:j.fa),{hash:{},inverse:n.program(7,i,e),fn:n.program(5,h,e),data:e}),(j||0===j)&&(k+=j),k+="\n  </a>\n</li>\n",k}),this.wysihtml5.tpl.lists=Handlebars.template(function(a,b,c,d,e){function f(a){var b,c="";return c+="btn-"+r((b=a&&a.options,b=null==b||b===!1?b:b.toolbar,b=null==b||b===!1?b:b.size,typeof b===q?b.apply(a):b)),c}function g(){return'\n      <span class="fa fa-list-ul"></span>\n    '}function h(){return'\n      <span class="glyphicon glyphicon-list"></span>\n    '}function i(){return'\n      <span class="fa fa-list-ol"></span>\n    '}function j(){return'\n      <span class="glyphicon glyphicon-th-list"></span>\n    '}function k(){return'\n      <span class="fa fa-outdent"></span>\n    '}function l(){return'\n      <span class="glyphicon glyphicon-indent-right"></span>\n    '}function m(){return'\n      <span class="fa fa-indent"></span>\n    '}function n(){return'\n      <span class="glyphicon glyphicon-indent-left"></span>\n    '}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var o,p="",q="function",r=this.escapeExpression,s=this;return p+='<li>\n  <div class="btn-group">\n    <a class="btn ',o=c["if"].call(b,(o=b&&b.options,o=null==o||o===!1?o:o.toolbar,null==o||o===!1?o:o.size),{hash:{},inverse:s.noop,fn:s.program(1,f,e),data:e}),(o||0===o)&&(p+=o),p+=' btn-default" data-wysihtml5-command="insertUnorderedList" title="'+r((o=b&&b.locale,o=null==o||o===!1?o:o.lists,o=null==o||o===!1?o:o.unordered,typeof o===q?o.apply(b):o))+'" tabindex="-1">\n    ',o=c["if"].call(b,(o=b&&b.options,o=null==o||o===!1?o:o.toolbar,null==o||o===!1?o:o.fa),{hash:{},inverse:s.program(5,h,e),fn:s.program(3,g,e),data:e}),(o||0===o)&&(p+=o),p+='\n    </a>\n    <a class="btn ',o=c["if"].call(b,(o=b&&b.options,o=null==o||o===!1?o:o.toolbar,null==o||o===!1?o:o.size),{hash:{},inverse:s.noop,fn:s.program(1,f,e),data:e}),(o||0===o)&&(p+=o),p+=' btn-default" data-wysihtml5-command="insertOrderedList" title="'+r((o=b&&b.locale,o=null==o||o===!1?o:o.lists,o=null==o||o===!1?o:o.ordered,typeof o===q?o.apply(b):o))+'" tabindex="-1">\n    ',o=c["if"].call(b,(o=b&&b.options,o=null==o||o===!1?o:o.toolbar,null==o||o===!1?o:o.fa),{hash:{},inverse:s.program(9,j,e),fn:s.program(7,i,e),data:e}),(o||0===o)&&(p+=o),p+='\n    </a>\n    <a class="btn ',o=c["if"].call(b,(o=b&&b.options,o=null==o||o===!1?o:o.toolbar,null==o||o===!1?o:o.size),{hash:{},inverse:s.noop,fn:s.program(1,f,e),data:e}),(o||0===o)&&(p+=o),p+=' btn-default" data-wysihtml5-command="Outdent" title="'+r((o=b&&b.locale,o=null==o||o===!1?o:o.lists,o=null==o||o===!1?o:o.outdent,typeof o===q?o.apply(b):o))+'" tabindex="-1">\n    ',o=c["if"].call(b,(o=b&&b.options,o=null==o||o===!1?o:o.toolbar,null==o||o===!1?o:o.fa),{hash:{},inverse:s.program(13,l,e),fn:s.program(11,k,e),data:e}),(o||0===o)&&(p+=o),p+='\n    </a>\n    <a class="btn ',o=c["if"].call(b,(o=b&&b.options,o=null==o||o===!1?o:o.toolbar,null==o||o===!1?o:o.size),{hash:{},inverse:s.noop,fn:s.program(1,f,e),data:e}),(o||0===o)&&(p+=o),p+=' btn-default" data-wysihtml5-command="Indent" title="'+r((o=b&&b.locale,o=null==o||o===!1?o:o.lists,o=null==o||o===!1?o:o.indent,typeof o===q?o.apply(b):o))+'" tabindex="-1">\n    ',o=c["if"].call(b,(o=b&&b.options,o=null==o||o===!1?o:o.toolbar,null==o||o===!1?o:o.fa),{hash:{},inverse:s.program(17,n,e),fn:s.program(15,m,e),data:e}),(o||0===o)&&(p+=o),p+="\n    </a>\n  </div>\n</li>\n",p}),function(a){"use strict";"function"==typeof define&&define.amd?define("bootstrap.wysihtml5",["jquery","wysihtml5","bootstrap","bootstrap.wysihtml5.templates","bootstrap.wysihtml5.commands"],a):a(jQuery,wysihtml5)}(function(a,b){"use strict";var c=function(a,b){var c,d,e,f=function(a,c,d){return b.tpl[a]?b.tpl[a]({locale:c,options:d}):void 0},g=function(c,e){var f,g;this.el=c,f=a.extend(!0,{},d,e);for(g in f.customTemplates)f.customTemplates.hasOwnProperty(g)&&(b.tpl[g]=f.customTemplates[g]);this.toolbar=this.createToolbar(c,f),this.editor=this.createEditor(f)};g.prototype={constructor:g,createEditor:function(b){b=b||{},b=a.extend(!0,{},b),b.toolbar=this.toolbar[0],this.initializeEditor(this.el[0],b)},initializeEditor:function(a,c){var d,e=new b.Editor(this.el[0],c);if(e.on("beforeload",this.syncBootstrapDialogEvents),e.on("beforeload",this.loadParserRules),e.composer.editableArea.contentDocument?this.addMoreShortcuts(e,e.composer.editableArea.contentDocument.body||e.composer.editableArea.contentDocument,c.shortcuts):this.addMoreShortcuts(e,e.composer.editableArea,c.shortcuts),c&&c.events)for(d in c.events)c.events.hasOwnProperty(d)&&e.on(d,c.events[d]);return e},loadParserRules:function(){"string"===a.type(this.config.parserRules)&&a.ajax({dataType:"json",url:this.config.parserRules,context:this,error:function(a,b,c){void 0},success:function(a){this.config.parserRules=a,void 0}}),this.config.pasteParserRulesets&&"string"===a.type(this.config.pasteParserRulesets)&&a.ajax({dataType:"json",url:this.config.pasteParserRulesets,context:this,error:function(a,b,c){void 0},success:function(a){this.config.pasteParserRulesets=a}})},syncBootstrapDialogEvents:function(){var b=this;a.map(this.toolbar.commandMapping,function(a){return[a]}).filter(function(a){return a.dialog}).map(function(a){return a.dialog}).forEach(function(c){c.on("show",function(){a(this.container).modal("show")}),c.on("hide",function(){a(this.container).modal("hide"),setTimeout(b.composer.focus,0)}),a(c.container).on("shown.bs.modal",function(){a(this).find("input, select, textarea").first().focus()})}),this.on("change_view",function(){a(this.toolbar.container.children).find("a.btn").not('[data-wysihtml5-action="change_view"]').toggleClass("disabled")})},createToolbar:function(b,c){var g,h,i=this,j=a("<ul/>",{"class":"wysihtml5-toolbar",style:"display:none"}),k=c.locale||d.locale||"en";e.hasOwnProperty(k)||(void 0,k="en"),g=a.extend(!0,{},e.en,e[k]);for(h in c.toolbar)c.toolbar[h]&&j.append(f(h,g,c));return j.find('a[data-wysihtml5-command="formatBlock"]').click(function(b){var c=b.delegateTarget||b.target||b.srcElement,d=a(c),e=d.data("wysihtml5-display-format-name"),f=d.data("wysihtml5-format-name")||d.html();(void 0===e||"true"===e)&&i.toolbar.find(".current-font").text(f)}),j.find('a[data-wysihtml5-command="foreColor"]').click(function(b){var c=b.target||b.srcElement,d=a(c);i.toolbar.find(".current-color").text(d.html())}),this.el.before(j),j},addMoreShortcuts:function(a,c,d){b.dom.observe(c,"keydown",function(c){var e,f=c.keyCode,g=d[f];(c.ctrlKey||c.metaKey||c.altKey)&&g&&b.commands[g]&&(e=a.toolbar.commandMapping[g+":null"],e&&e.dialog&&!e.state?e.dialog.show():b.commands[g].exec(a.composer,g),c.preventDefault())})}},c={resetDefaults:function(){a.fn.wysihtml5.defaultOptions=a.extend(!0,{},a.fn.wysihtml5.defaultOptionsCache)},bypassDefaults:function(b){return this.each(function(){var c=a(this);c.data("wysihtml5",new g(c,b))})},shallowExtend:function(b){var d=a.extend({},a.fn.wysihtml5.defaultOptions,b||{},a(this).data()),e=this;return c.bypassDefaults.apply(e,[d])},deepExtend:function(b){var d=a.extend(!0,{},a.fn.wysihtml5.defaultOptions,b||{}),e=this;return c.bypassDefaults.apply(e,[d])},init:function(a){var b=this;return c.shallowExtend.apply(b,[a])}},a.fn.wysihtml5=function(b){return c[b]?c[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?(a.error("Method "+b+" does not exist on jQuery.wysihtml5"),void 0):c.init.apply(this,arguments)},a.fn.wysihtml5.Constructor=g,d=a.fn.wysihtml5.defaultOptions={toolbar:{"font-styles":!0,color:!1,emphasis:{small:!0},blockquote:!0,lists:!0,html:!1,link:!0,image:!0,smallmodals:!1},useLineBreaks:!1,parserRules:{classes:{"wysiwyg-color-silver":1,"wysiwyg-color-gray":1,"wysiwyg-color-white":1,"wysiwyg-color-maroon":1,"wysiwyg-color-red":1,"wysiwyg-color-purple":1,"wysiwyg-color-fuchsia":1,"wysiwyg-color-green":1,"wysiwyg-color-lime":1,"wysiwyg-color-olive":1,"wysiwyg-color-yellow":1,"wysiwyg-color-navy":1,"wysiwyg-color-blue":1,"wysiwyg-color-teal":1,"wysiwyg-color-aqua":1,"wysiwyg-color-orange":1},tags:{b:{},i:{},strong:{},em:{},p:{},br:{},ol:{},ul:{},li:{},h1:{},h2:{},h3:{},h4:{},h5:{},h6:{},blockquote:{},u:1,img:{check_attributes:{width:"numbers",alt:"alt",src:"url",height:"numbers"}},a:{check_attributes:{href:"url"},set_attributes:{target:"_blank",rel:"nofollow"}},span:1,div:1,small:1,code:1,pre:1}},locale:"en",shortcuts:{83:"small",75:"createLink"}},void 0===a.fn.wysihtml5.defaultOptionsCache&&(a.fn.wysihtml5.defaultOptionsCache=a.extend(!0,{},a.fn.wysihtml5.defaultOptions)),e=a.fn.wysihtml5.locale={}};c(a,b)}),function(a){a.commands.small={exec:function(b,c){return a.commands.formatInline.exec(b,c,"small")},state:function(b,c){return a.commands.formatInline.state(b,c,"small")}}}(wysihtml5),function(a){"function"==typeof define&&define.amd?define("bootstrap.wysihtml5.en-US",["jquery","bootstrap.wysihtml5"],a):a(jQuery)}(function(a){a.fn.wysihtml5.locale.en=a.fn.wysihtml5.locale["en-US"]={font_styles:{normal:"Normal text",h1:"Heading 1",h2:"Heading 2",h3:"Heading 3",h4:"Heading 4",h5:"Heading 5",h6:"Heading 6"},emphasis:{bold:"Bold",italic:"Italic",underline:"Underline",small:"Small"},lists:{unordered:"Unordered list",ordered:"Ordered list",outdent:"Outdent",indent:"Indent"},link:{insert:"Insert link",cancel:"Cancel",target:"Open link in new window"},image:{insert:"Insert image",cancel:"Cancel"},html:{edit:"Edit HTML"},colours:{black:"Black",silver:"Silver",gray:"Grey",maroon:"Maroon",red:"Red",purple:"Purple",green:"Green",olive:"Olive",navy:"Navy",blue:"Blue",orange:"Orange"}}});
/*!
 TableTools 2.2.4
 2009-2015 SpryMedia Ltd - datatables.net/license

 ZeroClipboard 1.0.4
 Author: Joseph Huckaby - MIT licensed
*/

var TableTools;
(function(n,k,q){var p=function(m,p){var g={version:"1.0.4-TableTools2",clients:{},moviePath:"",nextId:1,$:function(a){"string"==typeof a&&(a=k.getElementById(a));a.addClass||(a.hide=function(){this.style.display="none"},a.show=function(){this.style.display=""},a.addClass=function(a){this.removeClass(a);this.className+=" "+a},a.removeClass=function(a){this.className=this.className.replace(RegExp("\\s*"+a+"\\s*")," ").replace(/^\s+/,"").replace(/\s+$/,"")},a.hasClass=function(a){return!!this.className.match(RegExp("\\s*"+a+
"\\s*"))});return a},setMoviePath:function(a){this.moviePath=a},dispatch:function(a,b,c){(a=this.clients[a])&&a.receiveEvent(b,c)},register:function(a,b){this.clients[a]=b},getDOMObjectPosition:function(a){var b={left:0,top:0,width:a.width?a.width:a.offsetWidth,height:a.height?a.height:a.offsetHeight};""!==a.style.width&&(b.width=a.style.width.replace("px",""));""!==a.style.height&&(b.height=a.style.height.replace("px",""));for(;a;)b.left+=a.offsetLeft,b.top+=a.offsetTop,a=a.offsetParent;return b},
Client:function(a){this.handlers={};this.id=g.nextId++;this.movieId="ZeroClipboard_TableToolsMovie_"+this.id;g.register(this.id,this);a&&this.glue(a)}};g.Client.prototype={id:0,ready:!1,movie:null,clipText:"",fileName:"",action:"copy",handCursorEnabled:!0,cssEffects:!0,handlers:null,sized:!1,glue:function(a,b){this.domElement=g.$(a);var c=99;this.domElement.style.zIndex&&(c=parseInt(this.domElement.style.zIndex,10)+1);var d=g.getDOMObjectPosition(this.domElement);this.div=k.createElement("div");var f=
this.div.style;f.position="absolute";f.left="0px";f.top="0px";f.width=d.width+"px";f.height=d.height+"px";f.zIndex=c;"undefined"!=typeof b&&""!==b&&(this.div.title=b);0!==d.width&&0!==d.height&&(this.sized=!0);this.domElement&&(this.domElement.appendChild(this.div),this.div.innerHTML=this.getHTML(d.width,d.height).replace(/&/g,"&amp;"))},positionElement:function(){var a=g.getDOMObjectPosition(this.domElement),b=this.div.style;b.position="absolute";b.width=a.width+"px";b.height=a.height+"px";0!==a.width&&
0!==a.height&&(this.sized=!0,b=this.div.childNodes[0],b.width=a.width,b.height=a.height)},getHTML:function(a,b){var c="",d="id="+this.id+"&width="+a+"&height="+b;if(navigator.userAgent.match(/MSIE/))var f=location.href.match(/^https/i)?"https://":"http://",c=c+('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+f+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="'+a+'" height="'+b+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+
g.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+d+'"/><param name="wmode" value="transparent"/></object>');else c+='<embed id="'+this.movieId+'" src="'+g.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+a+'" height="'+b+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+
d+'" wmode="transparent" />';return c},hide:function(){this.div&&(this.div.style.left="-2000px")},show:function(){this.reposition()},destroy:function(){if(this.domElement&&this.div){this.hide();this.div.innerHTML="";var a=k.getElementsByTagName("body")[0];try{a.removeChild(this.div)}catch(b){}this.div=this.domElement=null}},reposition:function(a){a&&((this.domElement=g.$(a))||this.hide());if(this.domElement&&this.div){var a=g.getDOMObjectPosition(this.domElement),b=this.div.style;b.left=""+a.left+
"px";b.top=""+a.top+"px"}},clearText:function(){this.clipText="";this.ready&&this.movie.clearText()},appendText:function(a){this.clipText+=a;this.ready&&this.movie.appendText(a)},setText:function(a){this.clipText=a;this.ready&&this.movie.setText(a)},setCharSet:function(a){this.charSet=a;this.ready&&this.movie.setCharSet(a)},setBomInc:function(a){this.incBom=a;this.ready&&this.movie.setBomInc(a)},setFileName:function(a){this.fileName=a;this.ready&&this.movie.setFileName(a)},setAction:function(a){this.action=
a;this.ready&&this.movie.setAction(a)},addEventListener:function(a,b){a=a.toString().toLowerCase().replace(/^on/,"");this.handlers[a]||(this.handlers[a]=[]);this.handlers[a].push(b)},setHandCursor:function(a){this.handCursorEnabled=a;this.ready&&this.movie.setHandCursor(a)},setCSSEffects:function(a){this.cssEffects=!!a},receiveEvent:function(a,b){var c,a=a.toString().toLowerCase().replace(/^on/,"");switch(a){case "load":this.movie=k.getElementById(this.movieId);if(!this.movie){c=this;setTimeout(function(){c.receiveEvent("load",
null)},1);return}if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){c=this;setTimeout(function(){c.receiveEvent("load",null)},100);this.ready=!0;return}this.ready=!0;this.movie.clearText();this.movie.appendText(this.clipText);this.movie.setFileName(this.fileName);this.movie.setAction(this.action);this.movie.setCharSet(this.charSet);this.movie.setBomInc(this.incBom);this.movie.setHandCursor(this.handCursorEnabled);break;case "mouseover":this.domElement&&this.cssEffects&&
this.recoverActive&&this.domElement.addClass("active");break;case "mouseout":this.domElement&&this.cssEffects&&(this.recoverActive=!1,this.domElement.hasClass("active")&&(this.domElement.removeClass("active"),this.recoverActive=!0));break;case "mousedown":this.domElement&&this.cssEffects&&this.domElement.addClass("active");break;case "mouseup":this.domElement&&this.cssEffects&&(this.domElement.removeClass("active"),this.recoverActive=!1)}if(this.handlers[a])for(var d=0,f=this.handlers[a].length;d<
f;d++){var e=this.handlers[a][d];if("function"==typeof e)e(this,b);else if("object"==typeof e&&2==e.length)e[0][e[1]](this,b);else if("string"==typeof e)n[e](this,b)}}};n.ZeroClipboard_TableTools=g;var e=jQuery;TableTools=function(a,b){!this instanceof TableTools&&alert("Warning: TableTools must be initialised with the keyword 'new'");this.s={that:this,dt:e.fn.dataTable.Api?(new e.fn.dataTable.Api(a)).settings()[0]:a.fnSettings(),print:{saveStart:-1,saveLength:-1,saveScroll:-1,funcEnd:function(){}},
buttonCounter:0,select:{type:"",selected:[],preRowSelect:null,postSelected:null,postDeselected:null,all:!1,selectedClass:""},custom:{},swfPath:"",buttonSet:[],master:!1,tags:{}};this.dom={container:null,table:null,print:{hidden:[],message:null},collection:{collection:null,background:null}};this.classes=e.extend(!0,{},TableTools.classes);this.s.dt.bJUI&&e.extend(!0,this.classes,TableTools.classes_themeroller);this.fnSettings=function(){return this.s};"undefined"==typeof b&&(b={});TableTools._aInstances.push(this);
this._fnConstruct(b);return this};TableTools.prototype={fnGetSelected:function(a){var b=[],c=this.s.dt.aoData,d=this.s.dt.aiDisplay,f;if(a){a=0;for(f=d.length;a<f;a++)c[d[a]]._DTTT_selected&&b.push(c[d[a]].nTr)}else{a=0;for(f=c.length;a<f;a++)c[a]._DTTT_selected&&b.push(c[a].nTr)}return b},fnGetSelectedData:function(){var a=[],b=this.s.dt.aoData,c,d;c=0;for(d=b.length;c<d;c++)b[c]._DTTT_selected&&a.push(this.s.dt.oInstance.fnGetData(c));return a},fnGetSelectedIndexes:function(a){var b=[],c=this.s.dt.aoData,
d=this.s.dt.aiDisplay,f;if(a){a=0;for(f=d.length;a<f;a++)c[d[a]]._DTTT_selected&&b.push(d[a])}else{a=0;for(f=c.length;a<f;a++)c[a]._DTTT_selected&&b.push(a)}return b},fnIsSelected:function(a){a=this.s.dt.oInstance.fnGetPosition(a);return!0===this.s.dt.aoData[a]._DTTT_selected?!0:!1},fnSelectAll:function(a){this._fnRowSelect(a?this.s.dt.aiDisplay:this.s.dt.aoData)},fnSelectNone:function(a){this._fnRowDeselect(this.fnGetSelectedIndexes(a))},fnSelect:function(a){"single"==this.s.select.type&&this.fnSelectNone();
this._fnRowSelect(a)},fnDeselect:function(a){this._fnRowDeselect(a)},fnGetTitle:function(a){var b="";"undefined"!=typeof a.sTitle&&""!==a.sTitle?b=a.sTitle:(a=k.getElementsByTagName("title"),0<a.length&&(b=a[0].innerHTML));return 4>"¡".toString().length?b.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,""):b.replace(/[^a-zA-Z0-9_\.,\-_ !\(\)]/g,"")},fnCalcColRatios:function(a){var b=this.s.dt.aoColumns,a=this._fnColumnTargets(a.mColumns),c=[],d=0,f=0,e,i;e=0;for(i=a.length;e<i;e++)a[e]&&(d=b[e].nTh.offsetWidth,
f+=d,c.push(d));e=0;for(i=c.length;e<i;e++)c[e]/=f;return c.join("\t")},fnGetTableData:function(a){if(this.s.dt)return this._fnGetDataTablesData(a)},fnSetText:function(a,b){this._fnFlashSetText(a,b)},fnResizeButtons:function(){for(var a in g.clients)if(a){var b=g.clients[a];"undefined"!=typeof b.domElement&&b.domElement.parentNode&&b.positionElement()}},fnResizeRequired:function(){for(var a in g.clients)if(a){var b=g.clients[a];if("undefined"!=typeof b.domElement&&b.domElement.parentNode==this.dom.container&&
!1===b.sized)return!0}return!1},fnPrint:function(a,b){b===q&&(b={});a===q||a?this._fnPrintStart(b):this._fnPrintEnd()},fnInfo:function(a,b){var c=e("<div/>").addClass(this.classes.print.info).html(a).appendTo("body");setTimeout(function(){c.fadeOut("normal",function(){c.remove()})},b)},fnContainer:function(){return this.dom.container},_fnConstruct:function(a){var b=this;this._fnCustomiseSettings(a);this.dom.container=k.createElement(this.s.tags.container);this.dom.container.className=this.classes.container;
"none"!=this.s.select.type&&this._fnRowSelectConfig();this._fnButtonDefinations(this.s.buttonSet,this.dom.container);this.s.dt.aoDestroyCallback.push({sName:"TableTools",fn:function(){e(b.s.dt.nTBody).off("click.DTTT_Select",b.s.custom.sRowSelector).off("mousedown.DTTT_Select","tr").off("mouseup.DTTT_Select","tr");e(b.dom.container).empty();var a=e.inArray(b,TableTools._aInstances);-1!==a&&TableTools._aInstances.splice(a,1)}})},_fnCustomiseSettings:function(a){"undefined"==typeof this.s.dt._TableToolsInit&&
(this.s.master=!0,this.s.dt._TableToolsInit=!0);this.dom.table=this.s.dt.nTable;this.s.custom=e.extend({},TableTools.DEFAULTS,a);this.s.swfPath=this.s.custom.sSwfPath;"undefined"!=typeof g&&(g.moviePath=this.s.swfPath);this.s.select.type=this.s.custom.sRowSelect;this.s.select.preRowSelect=this.s.custom.fnPreRowSelect;this.s.select.postSelected=this.s.custom.fnRowSelected;this.s.select.postDeselected=this.s.custom.fnRowDeselected;this.s.custom.sSelectedClass&&(this.classes.select.row=this.s.custom.sSelectedClass);
this.s.tags=this.s.custom.oTags;this.s.buttonSet=this.s.custom.aButtons},_fnButtonDefinations:function(a,b){for(var c,d=0,f=a.length;d<f;d++){if("string"==typeof a[d]){if("undefined"==typeof TableTools.BUTTONS[a[d]]){alert("TableTools: Warning - unknown button type: "+a[d]);continue}c=e.extend({},TableTools.BUTTONS[a[d]],!0)}else{if("undefined"==typeof TableTools.BUTTONS[a[d].sExtends]){alert("TableTools: Warning - unknown button type: "+a[d].sExtends);continue}c=e.extend({},TableTools.BUTTONS[a[d].sExtends],
!0);c=e.extend(c,a[d],!0)}(c=this._fnCreateButton(c,e(b).hasClass(this.classes.collection.container)))&&b.appendChild(c)}},_fnCreateButton:function(a,b){var c=this._fnButtonBase(a,b);if(a.sAction.match(/flash/)){if(!this._fnHasFlash())return!1;this._fnFlashConfig(c,a)}else"text"==a.sAction?this._fnTextConfig(c,a):"div"==a.sAction?this._fnTextConfig(c,a):"collection"==a.sAction&&(this._fnTextConfig(c,a),this._fnCollectionConfig(c,a));if(-1!==this.s.dt.iTabIndex)e(c).attr("tabindex",this.s.dt.iTabIndex).attr("aria-controls",
this.s.dt.sTableId).on("keyup.DTTT",function(a){13===a.keyCode&&(a.stopPropagation(),e(this).trigger("click"))}).on("mousedown.DTTT",function(b){a.sAction.match(/flash/)||b.preventDefault()});return c},_fnButtonBase:function(a,b){var c,d,f;b?(c=a.sTag&&"default"!==a.sTag?a.sTag:this.s.tags.collection.button,d=a.sLinerTag&&"default"!==a.sLinerTag?a.sLiner:this.s.tags.collection.liner,f=this.classes.collection.buttons.normal):(c=a.sTag&&"default"!==a.sTag?a.sTag:this.s.tags.button,d=a.sLinerTag&&"default"!==
a.sLinerTag?a.sLiner:this.s.tags.liner,f=this.classes.buttons.normal);c=k.createElement(c);d=k.createElement(d);var e=this._fnGetMasterSettings();c.className=f+" "+a.sButtonClass;c.setAttribute("id","ToolTables_"+this.s.dt.sInstance+"_"+e.buttonCounter);c.appendChild(d);d.innerHTML=a.sButtonText;e.buttonCounter++;return c},_fnGetMasterSettings:function(){if(this.s.master)return this.s;for(var a=TableTools._aInstances,b=0,c=a.length;b<c;b++)if(this.dom.table==a[b].s.dt.nTable)return a[b].s},_fnCollectionConfig:function(a,
b){var c=k.createElement(this.s.tags.collection.container);c.style.display="none";c.className=this.classes.collection.container;b._collection=c;k.body.appendChild(c);this._fnButtonDefinations(b.aButtons,c)},_fnCollectionShow:function(a,b){var c=this,d=e(a).offset(),f=b._collection,j=d.left,d=d.top+e(a).outerHeight(),i=e(n).height(),h=e(k).height(),o=e(n).width(),g=e(k).width();f.style.position="absolute";f.style.left=j+"px";f.style.top=d+"px";f.style.display="block";e(f).css("opacity",0);var l=k.createElement("div");
l.style.position="absolute";l.style.left="0px";l.style.top="0px";l.style.height=(i>h?i:h)+"px";l.style.width=(o>g?o:g)+"px";l.className=this.classes.collection.background;e(l).css("opacity",0);k.body.appendChild(l);k.body.appendChild(f);i=e(f).outerWidth();o=e(f).outerHeight();j+i>g&&(f.style.left=g-i+"px");d+o>h&&(f.style.top=d-o-e(a).outerHeight()+"px");this.dom.collection.collection=f;this.dom.collection.background=l;setTimeout(function(){e(f).animate({opacity:1},500);e(l).animate({opacity:0.25},
500)},10);this.fnResizeButtons();e(l).click(function(){c._fnCollectionHide.call(c,null,null)})},_fnCollectionHide:function(a,b){!(null!==b&&"collection"==b.sExtends)&&null!==this.dom.collection.collection&&(e(this.dom.collection.collection).animate({opacity:0},500,function(){this.style.display="none"}),e(this.dom.collection.background).animate({opacity:0},500,function(){this.parentNode.removeChild(this)}),this.dom.collection.collection=null,this.dom.collection.background=null)},_fnRowSelectConfig:function(){if(this.s.master){var a=
this,b=this.s.dt;e(b.nTable).addClass(this.classes.select.table);"os"===this.s.select.type&&(e(b.nTBody).on("mousedown.DTTT_Select","tr",function(a){if(a.shiftKey)e(b.nTBody).css("-moz-user-select","none").one("selectstart.DTTT_Select","tr",function(){return!1})}),e(b.nTBody).on("mouseup.DTTT_Select","tr",function(){e(b.nTBody).css("-moz-user-select","")}));e(b.nTBody).on("click.DTTT_Select",this.s.custom.sRowSelector,function(c){var d=this.nodeName.toLowerCase()==="tr"?this:e(this).parents("tr")[0],
f=a.s.select,j=a.s.dt.oInstance.fnGetPosition(d);if(d.parentNode==b.nTBody&&b.oInstance.fnGetData(d)!==null){if(f.type=="os")if(c.ctrlKey||c.metaKey)a.fnIsSelected(d)?a._fnRowDeselect(d,c):a._fnRowSelect(d,c);else if(c.shiftKey){var i=a.s.dt.aiDisplay.slice(),h=e.inArray(f.lastRow,i),o=e.inArray(j,i);if(a.fnGetSelected().length===0||h===-1)i.splice(e.inArray(j,i)+1,i.length);else{if(h>o)var g=o,o=h,h=g;i.splice(o+1,i.length);i.splice(0,h)}if(a.fnIsSelected(d)){i.splice(e.inArray(j,i),1);a._fnRowDeselect(i,
c)}else a._fnRowSelect(i,c)}else if(a.fnIsSelected(d)&&a.fnGetSelected().length===1)a._fnRowDeselect(d,c);else{a.fnSelectNone();a._fnRowSelect(d,c)}else if(a.fnIsSelected(d))a._fnRowDeselect(d,c);else if(f.type=="single"){a.fnSelectNone();a._fnRowSelect(d,c)}else f.type=="multi"&&a._fnRowSelect(d,c);f.lastRow=j}});b.oApi._fnCallbackReg(b,"aoRowCreatedCallback",function(c,d,f){b.aoData[f]._DTTT_selected&&e(c).addClass(a.classes.select.row)},"TableTools-SelectAll")}},_fnRowSelect:function(a,b){var c=
this._fnSelectData(a),d=[],f,j;f=0;for(j=c.length;f<j;f++)c[f].nTr&&d.push(c[f].nTr);if(null===this.s.select.preRowSelect||this.s.select.preRowSelect.call(this,b,d,!0)){f=0;for(j=c.length;f<j;f++)c[f]._DTTT_selected=!0,c[f].nTr&&e(c[f].nTr).addClass(this.classes.select.row);null!==this.s.select.postSelected&&this.s.select.postSelected.call(this,d);TableTools._fnEventDispatch(this,"select",d,!0)}},_fnRowDeselect:function(a,b){var c=this._fnSelectData(a),d=[],f,j;f=0;for(j=c.length;f<j;f++)c[f].nTr&&
d.push(c[f].nTr);if(null===this.s.select.preRowSelect||this.s.select.preRowSelect.call(this,b,d,!1)){f=0;for(j=c.length;f<j;f++)c[f]._DTTT_selected=!1,c[f].nTr&&e(c[f].nTr).removeClass(this.classes.select.row);null!==this.s.select.postDeselected&&this.s.select.postDeselected.call(this,d);TableTools._fnEventDispatch(this,"select",d,!1)}},_fnSelectData:function(a){var b=[],c,d,f;if(a.nodeName)c=this.s.dt.oInstance.fnGetPosition(a),b.push(this.s.dt.aoData[c]);else if("undefined"!==typeof a.length){d=
0;for(f=a.length;d<f;d++)a[d].nodeName?(c=this.s.dt.oInstance.fnGetPosition(a[d]),b.push(this.s.dt.aoData[c])):"number"===typeof a[d]?b.push(this.s.dt.aoData[a[d]]):b.push(a[d])}else"number"===typeof a?b.push(this.s.dt.aoData[a]):b.push(a);return b},_fnTextConfig:function(a,b){var c=this;null!==b.fnInit&&b.fnInit.call(this,a,b);""!==b.sToolTip&&(a.title=b.sToolTip);e(a).hover(function(){b.fnMouseover!==null&&b.fnMouseover.call(this,a,b,null)},function(){b.fnMouseout!==null&&b.fnMouseout.call(this,
a,b,null)});null!==b.fnSelect&&TableTools._fnEventListen(this,"select",function(d){b.fnSelect.call(c,a,b,d)});e(a).click(function(d){b.fnClick!==null&&b.fnClick.call(c,a,b,null,d);b.fnComplete!==null&&b.fnComplete.call(c,a,b,null,null);c._fnCollectionHide(a,b)})},_fnHasFlash:function(){try{if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return!0}catch(a){if(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"]!==q&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)return!0}return!1},
_fnFlashConfig:function(a,b){var c=this,d=new g.Client;null!==b.fnInit&&b.fnInit.call(this,a,b);d.setHandCursor(!0);"flash_save"==b.sAction?(d.setAction("save"),d.setCharSet("utf16le"==b.sCharSet?"UTF16LE":"UTF8"),d.setBomInc(b.bBomInc),d.setFileName(b.sFileName.replace("*",this.fnGetTitle(b)))):"flash_pdf"==b.sAction?(d.setAction("pdf"),d.setFileName(b.sFileName.replace("*",this.fnGetTitle(b)))):d.setAction("copy");d.addEventListener("mouseOver",function(){b.fnMouseover!==null&&b.fnMouseover.call(c,
a,b,d)});d.addEventListener("mouseOut",function(){b.fnMouseout!==null&&b.fnMouseout.call(c,a,b,d)});d.addEventListener("mouseDown",function(){b.fnClick!==null&&b.fnClick.call(c,a,b,d)});d.addEventListener("complete",function(f,e){b.fnComplete!==null&&b.fnComplete.call(c,a,b,d,e);c._fnCollectionHide(a,b)});null!==b.fnSelect&&TableTools._fnEventListen(this,"select",function(d){b.fnSelect.call(c,a,b,d)});this._fnFlashGlue(d,a,b.sToolTip)},_fnFlashGlue:function(a,b,c){var d=this,f=b.getAttribute("id");
k.getElementById(f)?a.glue(b,c):setTimeout(function(){d._fnFlashGlue(a,b,c)},100)},_fnFlashSetText:function(a,b){var c=this._fnChunkData(b,8192);a.clearText();for(var d=0,f=c.length;d<f;d++)a.appendText(c[d])},_fnColumnTargets:function(a){var b=[],c=this.s.dt,d,f=c.aoColumns;d=f.length;if("function"==typeof a){a=a.call(this,c);for(c=0;c<d;c++)b.push(-1!==e.inArray(c,a)?!0:!1)}else if("object"==typeof a){for(c=0;c<d;c++)b.push(!1);c=0;for(d=a.length;c<d;c++)b[a[c]]=!0}else if("visible"==a)for(c=0;c<
d;c++)b.push(f[c].bVisible?!0:!1);else if("hidden"==a)for(c=0;c<d;c++)b.push(f[c].bVisible?!1:!0);else if("sortable"==a)for(c=0;c<d;c++)b.push(f[c].bSortable?!0:!1);else for(c=0;c<d;c++)b.push(!0);return b},_fnNewline:function(a){return"auto"==a.sNewLine?navigator.userAgent.match(/Windows/)?"\r\n":"\n":a.sNewLine},_fnGetDataTablesData:function(a){var b,c,d,f,j,i=[],h="",g=this.s.dt,k,l=RegExp(a.sFieldBoundary,"g"),n=this._fnColumnTargets(a.mColumns);d="undefined"!=typeof a.bSelectedOnly?a.bSelectedOnly:
!1;if(a.bHeader){j=[];b=0;for(c=g.aoColumns.length;b<c;b++)n[b]&&(h=g.aoColumns[b].sTitle.replace(/\n/g," ").replace(/<.*?>/g,"").replace(/^\s+|\s+$/g,""),h=this._fnHtmlDecode(h),j.push(this._fnBoundData(h,a.sFieldBoundary,l)));i.push(j.join(a.sFieldSeperator))}d=!0;var m;f=this.fnGetSelectedIndexes();m=(d="none"!==this.s.select.type&&d&&0!==f.length)?f:p.Api?(new p.Api(g)).rows(a.oSelectorOpts).indexes().flatten().toArray():g.oInstance.$("tr",a.oSelectorOpts).map(function(a,b){return g.oInstance.fnGetPosition(b)}).get();
d=0;for(f=m.length;d<f;d++){k=g.aoData[m[d]].nTr;j=[];b=0;for(c=g.aoColumns.length;b<c;b++)n[b]&&(h=g.oApi._fnGetCellData(g,m[d],b,"display"),a.fnCellRender?h=a.fnCellRender(h,b,k,m[d])+"":"string"==typeof h?(h=h.replace(/\n/g," "),h=h.replace(/<img.*?\s+alt\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+)).*?>/gi,"$1$2$3"),h=h.replace(/<.*?>/g,"")):h+="",h=h.replace(/^\s+/,"").replace(/\s+$/,""),h=this._fnHtmlDecode(h),j.push(this._fnBoundData(h,a.sFieldBoundary,l)));i.push(j.join(a.sFieldSeperator));a.bOpenRows&&
(b=e.grep(g.aoOpenRows,function(a){return a.nParent===k}),1===b.length&&(h=this._fnBoundData(e("td",b[0].nTr).html(),a.sFieldBoundary,l),i.push(h)))}if(a.bFooter&&null!==g.nTFoot){j=[];b=0;for(c=g.aoColumns.length;b<c;b++)n[b]&&null!==g.aoColumns[b].nTf&&(h=g.aoColumns[b].nTf.innerHTML.replace(/\n/g," ").replace(/<.*?>/g,""),h=this._fnHtmlDecode(h),j.push(this._fnBoundData(h,a.sFieldBoundary,l)));i.push(j.join(a.sFieldSeperator))}return i.join(this._fnNewline(a))},_fnBoundData:function(a,b,c){return""===
b?a:b+a.replace(c,b+b)+b},_fnChunkData:function(a,b){for(var c=[],d=a.length,f=0;f<d;f+=b)f+b<d?c.push(a.substring(f,f+b)):c.push(a.substring(f,d));return c},_fnHtmlDecode:function(a){if(-1===a.indexOf("&"))return a;var b=k.createElement("div");return a.replace(/&([^\s]*?);/g,function(a,d){if("#"===a.substr(1,1))return String.fromCharCode(Number(d.substr(1)));b.innerHTML=a;return b.childNodes[0].nodeValue})},_fnPrintStart:function(a){var b=this,c=this.s.dt;this._fnPrintHideNodes(c.nTable);this.s.print.saveStart=
c._iDisplayStart;this.s.print.saveLength=c._iDisplayLength;a.bShowAll&&(c._iDisplayStart=0,c._iDisplayLength=-1,c.oApi._fnCalculateEnd&&c.oApi._fnCalculateEnd(c),c.oApi._fnDraw(c));if(""!==c.oScroll.sX||""!==c.oScroll.sY)this._fnPrintScrollStart(c),e(this.s.dt.nTable).bind("draw.DTTT_Print",function(){b._fnPrintScrollStart(c)});var d=c.aanFeatures,f;for(f in d)if("i"!=f&&"t"!=f&&1==f.length)for(var g=0,i=d[f].length;g<i;g++)this.dom.print.hidden.push({node:d[f][g],display:"block"}),d[f][g].style.display=
"none";e(k.body).addClass(this.classes.print.body);""!==a.sInfo&&this.fnInfo(a.sInfo,3E3);a.sMessage&&e("<div/>").addClass(this.classes.print.message).html(a.sMessage).prependTo("body");this.s.print.saveScroll=e(n).scrollTop();n.scrollTo(0,0);e(k).bind("keydown.DTTT",function(a){if(a.keyCode==27){a.preventDefault();b._fnPrintEnd.call(b,a)}})},_fnPrintEnd:function(){var a=this.s.dt,b=this.s.print;this._fnPrintShowNodes();if(""!==a.oScroll.sX||""!==a.oScroll.sY)e(this.s.dt.nTable).unbind("draw.DTTT_Print"),
this._fnPrintScrollEnd();n.scrollTo(0,b.saveScroll);e("div."+this.classes.print.message).remove();e(k.body).removeClass("DTTT_Print");a._iDisplayStart=b.saveStart;a._iDisplayLength=b.saveLength;a.oApi._fnCalculateEnd&&a.oApi._fnCalculateEnd(a);a.oApi._fnDraw(a);e(k).unbind("keydown.DTTT")},_fnPrintScrollStart:function(){var a=this.s.dt;a.nScrollHead.getElementsByTagName("div")[0].getElementsByTagName("table");var b=a.nTable.parentNode,c;c=a.nTable.getElementsByTagName("thead");0<c.length&&a.nTable.removeChild(c[0]);
null!==a.nTFoot&&(c=a.nTable.getElementsByTagName("tfoot"),0<c.length&&a.nTable.removeChild(c[0]));c=a.nTHead.cloneNode(!0);a.nTable.insertBefore(c,a.nTable.childNodes[0]);null!==a.nTFoot&&(c=a.nTFoot.cloneNode(!0),a.nTable.insertBefore(c,a.nTable.childNodes[1]));""!==a.oScroll.sX&&(a.nTable.style.width=e(a.nTable).outerWidth()+"px",b.style.width=e(a.nTable).outerWidth()+"px",b.style.overflow="visible");""!==a.oScroll.sY&&(b.style.height=e(a.nTable).outerHeight()+"px",b.style.overflow="visible")},
_fnPrintScrollEnd:function(){var a=this.s.dt,b=a.nTable.parentNode;""!==a.oScroll.sX&&(b.style.width=a.oApi._fnStringToCss(a.oScroll.sX),b.style.overflow="auto");""!==a.oScroll.sY&&(b.style.height=a.oApi._fnStringToCss(a.oScroll.sY),b.style.overflow="auto")},_fnPrintShowNodes:function(){for(var a=this.dom.print.hidden,b=0,c=a.length;b<c;b++)a[b].node.style.display=a[b].display;a.splice(0,a.length)},_fnPrintHideNodes:function(a){for(var b=this.dom.print.hidden,c=a.parentNode,d=c.childNodes,f=0,g=d.length;f<
g;f++)if(d[f]!=a&&1==d[f].nodeType){var i=e(d[f]).css("display");"none"!=i&&(b.push({node:d[f],display:i}),d[f].style.display="none")}"BODY"!=c.nodeName.toUpperCase()&&this._fnPrintHideNodes(c)}};TableTools._aInstances=[];TableTools._aListeners=[];TableTools.fnGetMasters=function(){for(var a=[],b=0,c=TableTools._aInstances.length;b<c;b++)TableTools._aInstances[b].s.master&&a.push(TableTools._aInstances[b]);return a};TableTools.fnGetInstance=function(a){"object"!=typeof a&&(a=k.getElementById(a));
for(var b=0,c=TableTools._aInstances.length;b<c;b++)if(TableTools._aInstances[b].s.master&&TableTools._aInstances[b].dom.table==a)return TableTools._aInstances[b];return null};TableTools._fnEventListen=function(a,b,c){TableTools._aListeners.push({that:a,type:b,fn:c})};TableTools._fnEventDispatch=function(a,b,c,d){for(var f=TableTools._aListeners,e=0,g=f.length;e<g;e++)a.dom.table==f[e].that.dom.table&&f[e].type==b&&f[e].fn(c,d)};TableTools.buttonBase={sAction:"text",sTag:"default",sLinerTag:"default",
sButtonClass:"DTTT_button_text",sButtonText:"Button text",sTitle:"",sToolTip:"",sCharSet:"utf8",bBomInc:!1,sFileName:"*.csv",sFieldBoundary:"",sFieldSeperator:"\t",sNewLine:"auto",mColumns:"all",bHeader:!0,bFooter:!0,bOpenRows:!1,bSelectedOnly:!1,oSelectorOpts:q,fnMouseover:null,fnMouseout:null,fnClick:null,fnSelect:null,fnComplete:null,fnInit:null,fnCellRender:null};TableTools.BUTTONS={csv:e.extend({},TableTools.buttonBase,{sAction:"flash_save",sButtonClass:"DTTT_button_csv",sButtonText:"CSV",sFieldBoundary:'"',
sFieldSeperator:",",fnClick:function(a,b,c){this.fnSetText(c,this.fnGetTableData(b))}}),xls:e.extend({},TableTools.buttonBase,{sAction:"flash_save",sCharSet:"utf16le",bBomInc:!0,sButtonClass:"DTTT_button_xls",sButtonText:"Excel",fnClick:function(a,b,c){this.fnSetText(c,this.fnGetTableData(b))}}),copy:e.extend({},TableTools.buttonBase,{sAction:"flash_copy",sButtonClass:"DTTT_button_copy",sButtonText:"Copy",fnClick:function(a,b,c){this.fnSetText(c,this.fnGetTableData(b))},fnComplete:function(a,b,c,
d){a=d.split("\n").length;b.bHeader&&a--;null!==this.s.dt.nTFoot&&b.bFooter&&a--;this.fnInfo("<h6>Table copied</h6><p>Copied "+a+" row"+(1==a?"":"s")+" to the clipboard.</p>",1500)}}),pdf:e.extend({},TableTools.buttonBase,{sAction:"flash_pdf",sNewLine:"\n",sFileName:"*.pdf",sButtonClass:"DTTT_button_pdf",sButtonText:"PDF",sPdfOrientation:"portrait",sPdfSize:"A4",sPdfMessage:"",fnClick:function(a,b,c){this.fnSetText(c,"title:"+this.fnGetTitle(b)+"\nmessage:"+b.sPdfMessage+"\ncolWidth:"+this.fnCalcColRatios(b)+
"\norientation:"+b.sPdfOrientation+"\nsize:"+b.sPdfSize+"\n--/TableToolsOpts--\n"+this.fnGetTableData(b))}}),print:e.extend({},TableTools.buttonBase,{sInfo:"<h6>Print view</h6><p>Please use your browser's print function to print this table. Press escape when finished.</p>",sMessage:null,bShowAll:!0,sToolTip:"View print view",sButtonClass:"DTTT_button_print",sButtonText:"Print",fnClick:function(a,b){this.fnPrint(!0,b)}}),text:e.extend({},TableTools.buttonBase),select:e.extend({},TableTools.buttonBase,
{sButtonText:"Select button",fnSelect:function(a){0!==this.fnGetSelected().length?e(a).removeClass(this.classes.buttons.disabled):e(a).addClass(this.classes.buttons.disabled)},fnInit:function(a){e(a).addClass(this.classes.buttons.disabled)}}),select_single:e.extend({},TableTools.buttonBase,{sButtonText:"Select button",fnSelect:function(a){1==this.fnGetSelected().length?e(a).removeClass(this.classes.buttons.disabled):e(a).addClass(this.classes.buttons.disabled)},fnInit:function(a){e(a).addClass(this.classes.buttons.disabled)}}),
select_all:e.extend({},TableTools.buttonBase,{sButtonText:"Select all",fnClick:function(){this.fnSelectAll()},fnSelect:function(a){this.fnGetSelected().length==this.s.dt.fnRecordsDisplay()?e(a).addClass(this.classes.buttons.disabled):e(a).removeClass(this.classes.buttons.disabled)}}),select_none:e.extend({},TableTools.buttonBase,{sButtonText:"Deselect all",fnClick:function(){this.fnSelectNone()},fnSelect:function(a){0!==this.fnGetSelected().length?e(a).removeClass(this.classes.buttons.disabled):e(a).addClass(this.classes.buttons.disabled)},
fnInit:function(a){e(a).addClass(this.classes.buttons.disabled)}}),ajax:e.extend({},TableTools.buttonBase,{sAjaxUrl:"/xhr.php",sButtonText:"Ajax button",fnClick:function(a,b){var c=this.fnGetTableData(b);e.ajax({url:b.sAjaxUrl,data:[{name:"tableData",value:c}],success:b.fnAjaxComplete,dataType:"json",type:"POST",cache:!1,error:function(){alert("Error detected when sending table data to server")}})},fnAjaxComplete:function(){alert("Ajax complete")}}),div:e.extend({},TableTools.buttonBase,{sAction:"div",
sTag:"div",sButtonClass:"DTTT_nonbutton",sButtonText:"Text button"}),collection:e.extend({},TableTools.buttonBase,{sAction:"collection",sButtonClass:"DTTT_button_collection",sButtonText:"Collection",fnClick:function(a,b){this._fnCollectionShow(a,b)}})};TableTools.buttons=TableTools.BUTTONS;TableTools.classes={container:"DTTT_container",buttons:{normal:"DTTT_button",disabled:"DTTT_disabled"},collection:{container:"DTTT_collection",background:"DTTT_collection_background",buttons:{normal:"DTTT_button",
disabled:"DTTT_disabled"}},select:{table:"DTTT_selectable",row:"DTTT_selected selected"},print:{body:"DTTT_Print",info:"DTTT_print_info",message:"DTTT_PrintMessage"}};TableTools.classes_themeroller={container:"DTTT_container ui-buttonset ui-buttonset-multi",buttons:{normal:"DTTT_button ui-button ui-state-default"},collection:{container:"DTTT_collection ui-buttonset ui-buttonset-multi"}};TableTools.DEFAULTS={sSwfPath:"../swf/copy_csv_xls_pdf.swf",sRowSelect:"none",sRowSelector:"tr",sSelectedClass:null,
fnPreRowSelect:null,fnRowSelected:null,fnRowDeselected:null,aButtons:["copy","csv","xls","pdf","print"],oTags:{container:"div",button:"a",liner:"span",collection:{container:"div",button:"a",liner:"span"}}};TableTools.defaults=TableTools.DEFAULTS;TableTools.prototype.CLASS="TableTools";TableTools.version="2.2.4";e.fn.dataTable.Api&&e.fn.dataTable.Api.register("tabletools()",function(){var a=null;0<this.context.length&&(a=TableTools.fnGetInstance(this.context[0].nTable));return a});"function"==typeof e.fn.dataTable&&
"function"==typeof e.fn.dataTableExt.fnVersionCheck&&e.fn.dataTableExt.fnVersionCheck("1.9.0")?e.fn.dataTableExt.aoFeatures.push({fnInit:function(a){var b=a.oInit;return(new TableTools(a.oInstance,b?b.tableTools||b.oTableTools||{}:{})).dom.container},cFeature:"T",sFeature:"TableTools"}):alert("Warning: TableTools requires DataTables 1.9.0 or newer - www.datatables.net/download");e.fn.DataTable.TableTools=TableTools;"function"==typeof m.fn.dataTable&&"function"==typeof m.fn.dataTableExt.fnVersionCheck&&
m.fn.dataTableExt.fnVersionCheck("1.9.0")?m.fn.dataTableExt.aoFeatures.push({fnInit:function(a){a=new TableTools(a.oInstance,"undefined"!=typeof a.oInit.oTableTools?a.oInit.oTableTools:{});TableTools._aInstances.push(a);return a.dom.container},cFeature:"T",sFeature:"TableTools"}):alert("Warning: TableTools 2 requires DataTables 1.9.0 or newer - www.datatables.net/download");m.fn.dataTable.TableTools=TableTools;return m.fn.DataTable.TableTools=TableTools};"function"===typeof define&&define.amd?define(["jquery",
"datatables"],p):"object"===typeof exports?p(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.TableTools&&p(jQuery,jQuery.fn.dataTable)})(window,document);
!function e(t,n,r){function i(s,a){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(o)return o(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[s]={exports:{}};t[s][0].call(u.exports,function(e){var n=t[s][1][e];return i(n?n:e)},u,u.exports,e,t,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t){!function(){"use strict";function e(t,n){function i(e,t){return function(){return e.apply(t,arguments)}}var o;if(n=n||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=n.touchBoundary||10,this.layer=t,this.tapDelay=n.tapDelay||200,this.tapTimeout=n.tapTimeout||700,!e.notNeeded(t)){for(var s=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,c=0,l=s.length;l>c;c++)a[s[c]]=i(a[s[c]],a);r&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,r){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,r):i.call(t,e,n,r)},t.addEventListener=function(e,n,r){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),r):i.call(t,e,n,r)}),"function"==typeof t.onclick&&(o=t.onclick,t.addEventListener("click",function(e){o(e)},!1),t.onclick=null)}}var n=navigator.userAgent.indexOf("Windows Phone")>=0,r=navigator.userAgent.indexOf("Android")>0&&!n,i=/iP(ad|hone|od)/.test(navigator.userAgent)&&!n,o=i&&/OS 4_\d(_\d)?/.test(navigator.userAgent),s=i&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(i&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!r;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return r&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;i&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,r;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],i){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!o){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,n,a,c,l,u=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,s&&(l=e.changedTouches[0],u=document.elementFromPoint(l.pageX-window.pageXOffset,l.pageY-window.pageYOffset)||u,u.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=u.tagName.toLowerCase(),"label"===a){if(t=this.findControl(u)){if(this.focus(u),r)return!1;u=t}}else if(this.needsFocus(u))return e.timeStamp-n>100||i&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(u),this.sendClick(u,e),i&&"select"===a||(this.targetElement=null,e.preventDefault()),!1);return i&&!o&&(c=u.fastClickScrollParent,c&&c.fastClickLastScrollTop!==c.scrollTop)?!0:(this.needsClick(u)||(e.preventDefault(),this.sendClick(u,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;r&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,n,i,o;if("undefined"==typeof window.ontouchstart)return!0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!r)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(n>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(o=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],o>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction?!0:!1)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof t&&t.exports?(t.exports=e.attach,t.exports.FastClick=e):window.FastClick=e}()},{}],2:[function(e){window.Origami={fastclick:e("./bower_components/fastclick/lib/fastclick.js")}},{"./bower_components/fastclick/lib/fastclick.js":1}]},{},[2]);;(function() {function trigger(){document.dispatchEvent(new CustomEvent('o.load'))};document.addEventListener('load',trigger);if (document.readyState==='ready') trigger();}());(function() {function trigger(){document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'))};document.addEventListener('DOMContentLoaded',trigger);if (document.readyState==='interactive') trigger();}())
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//



;
