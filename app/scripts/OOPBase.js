/**
 *  Define a pattern for implementing OOP inheritance in javascript
 *
 *  should be able to call extend on an OOP object to create a child object which inherits from
 *  the default instance of the object
 */
 (function() {

    // Insure that all extended classes are stored so that they operate as static classes should
    var OOPUtil = {};
    OOPUtil.classes = {};
    OOPUtil.classes.Base = new Base();
    OOPUtil.headers = {};

    if (define) {
        define({
            Base: Base
        });
    } else {
        console.log('Loading OOPBase.js without AMD');
        window.OOPUtil = OOPUtil;
    }

    // The Base Object containing basic OOP functionality
    function Base() {

        this.className = 'Base';

        this.uber = function() {

            var current = this;
            var caller = this.uber.caller;
            if (!this[caller.name]) {
                throw "Uber must be called from context of a Named Member Function";
            }

            do {
                current = current.__proto__.__proto__;
                var parentFunction = current[caller.name];
            } while ( parentFunction == caller);

            return (parentFunction) ? parentFunction.apply( this, arguments ) : undefined;
            
        };

        // Requires all extensions of Base to be NAMED FUNCTIONS
        this.isInstanceOf = function( className ) {

            var nextClass = this.__proto__.__proto__;
            return ( className === this.className ||
                (nextClass.isInstanceOf ? this.isInstanceOf.call(nextClass, className) : false ));

        };

    }
    Base.extend = function( Class ) {
        if (!Class.name) {
            throw "You can only extend named functions";
        }

        function Header() {
            this.className = Class.name;
        }
        Header.prototype = OOPUtil.classes[this.name];
        var h = new Header();
        Class.prototype = h;

        OOPUtil.headers[Class.name] = h;
        OOPUtil.classes[Class.name] = new Class();

        // Pass on Class Methods to the extended constructor Class
        for ( var method in this ) {
            if ( this.hasOwnProperty(method) ) {
                Class[method] = this[method];
            }
        }

    };
    Base.set = function( keyVal ) {

        var prot = OOPUtil.headers[this.name];
        if ( !prot ) return;

        for (var key in keyVal) {
            if ( keyVal.hasOwnProperty(key) && key !== 'className' ) {
                prot[key] = keyVal[key];
            }
        }

    };
    Base.unset = function( keys ) {

        var prot = OOPUtil.headers[this.name];
        console.log(prot);
        if ( !prot ) return;

        var keysArray = keys;
        if (typeof keys != 'object') {
            keysArray = [keys];
        }

        for ( var i in keysArray ) {
            console.log(keysArray[i]);
            if ( prot.hasOwnProperty(keysArray[i]) &&
                keysArray.hasOwnProperty(i) &&
                keysArray[i] !== 'className' ) {
                delete prot[keysArray[i]];
            }
        }
    }
})();




