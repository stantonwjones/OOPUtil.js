require(['../app/scripts/OOPBase'], function(OOPBase) {

	/*
	window.Base = OOPBase.Base;
	window.Child = Child;
	window.NamedChild = NamedChild;
	*/
	function Child() {
	}
	OOPBase.Base.extend(Child);

	function NamedChild( name ) {
		this.name = name;
		this.sayName = function () {
			this.uber(this.name);
		};
	}
	Child.extend(NamedChild);
	describe("Retention of Prototypal Inheritance", function() {

		describe("Multiple instances of the same class", function() {

			it('should modify all instances if the prototype changes', function() {
				var c0 = new Child();
				var c1 = new Child();

				Child.set({
					age: 20
				});

				expect( c0.age ).to.be( 20 );
				expect( c1.age ).to.be( 20 );
			});

			it('should modify all children if the prototype changes', function() {
				var n0 = new NamedChild('name0');
				var n1 = new NamedChild('name1');

				Child.set({
					age: 25
				});

				expect( n0.age ).to.be( 25 );
				expect( n1.age ).to.be( 25 );

			});

			it ('should be able to unset prototype properties', function() {

				var c = new Child();
				var n = new NamedChild();
				Child.unset( 'age' );
				NamedChild.unset( 'age' );

				expect(c.age).to.be( undefined );
				expect(n.age).to.be( undefined );

			});

			it('should not be able to modify Base', function() {

				var c = new Child();
				var n = new NamedChild();
				OOPBase.Base.set({
					age: 27
				});

				expect(c.age).to.be(undefined);
				expect(n.age).to.be(undefined);

			});

			it('should not be able to modify className', function() {

				var c = new Child();
				Child.set({
					className: 'error'
				})
				expect(c.className).to.be('Child');

				Child.unset('className');
				expect(c.className).to.be('Child');
				
			});
		});

	});
});