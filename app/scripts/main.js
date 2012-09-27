require.config({
  shim: {
  },

  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min'
  }
});
 
require(['app', 'OOPBase'], function(app, Base) {
	// use app here
	console.log(app);
	console.log(Base);
	window.Base = Base.Base;

	window.A0 = function Arb0() {
		this.arbFunc = function arbFunc() {
			return true;
		};
	}
	window.Base.extend(A0);

	window.A1 = function Arb1() {};
	A0.extend(A1);

	window.A2 = function Arb2() {
		this.arbFunc = function arbFunc() {
			return this.uber();
		};
	}
	A1.extend(A2);

	window.A3 = function Arb3() {};
	A2.extend(A3);

	window.A4 = function Arb4() {};
	A3.extend(A4);

	window.A5 = function Arb5() {
		this.arbFunc = function arbFunc() {
			return this.uber();
		};
	}
	A4.extend(A5);
	window.arbs = [];
	for (var i = 0; i < 6; i++) {
		window.arbs.push(new window['A' + i]);
	}
});