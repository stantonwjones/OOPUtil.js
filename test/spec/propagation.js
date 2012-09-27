require(['../app/scripts/OOPBase'], function(OOPBase) {

	function Child() {
		this.sayName = function ( name ) {
			return name;
		};
	}
	OOPBase.Base.extend(Child);

	function NamedChild( name ) {
		this.name = name;
		this.sayName = function sayName() {
			return this.uber(this.name);
		};
	}
	Child.extend(NamedChild);

	function Arb0() {
		this.arbFunc = function arbFunc() {
			return true;
		};
	}
	OOPBase.Base.extend(Arb0);

	function Arb1() {};
	Arb0.extend(Arb1);

	function Arb2() {
		this.arbFunc = function arbFunc() {
			return this.uber();
		};
	}
	Arb1.extend(Arb2);

	function Arb3() {};
	Arb2.extend(Arb3);

	function Arb4() {};
	Arb3.extend(Arb4);

	function Arb5() {
		this.arbFunc = function arbFunc() {
			return this.uber();
		};
		this.failingFunction = function() {
			return uber();
		}
	}
	Arb4.extend(Arb5);

	describe('Functional Inheritance', function() {

		it("Should call function of parent class with uber", function() {
			var name = 'someRandomName';
			var c = new Child();
			var n = new NamedChild( name );

			expect(c.sayName(name)).to.be(n.sayName());

			var arb5 = new Arb5();
			expect(arb5.arbFunc()).to.be(true);

		});

		it("Should throw an error if uber is called outside of named function", function() {

			var arb5 = new Arb5();
			expect(arb5.failingFunction).to.throwError();

		});

	});

});