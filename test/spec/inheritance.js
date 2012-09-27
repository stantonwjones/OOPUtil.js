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
	}
	Child.extend(NamedChild);

	describe('Inheritance Verification', function(){

		describe( 'Base', function() {
			it('should be an instance of "Base"', function(){

				expect((new OOPBase.Base()).isInstanceOf(OOPBase.Base.name)).to.be(true);

			});
			it('should not be an instance of "Child" or "NamedChild"', function() {
				var b = new OOPBase.Base();

				expect(b.isInstanceOf(Child.name)).to.be(false);
				expect(b.isInstanceOf(NamedChild.name)).to.be(false);

			});
		});

		describe( 'Child', function() {
			it('should be an instance of "Child", and "Base"', function() {

				var c = new Child();
				expect(c.className).to.be('Child');

				expect(c.isInstanceOf(OOPBase.Base.name)).to.be(true);
				expect(c.isInstanceOf(Child.name)).to.be(true);

			});
			it('should not be an instance of "NamedChild"', function() {
				var c = new Child();
				expect(c.isInstanceOf(NamedChild.name)).to.be(false);
			})
		});

		describe( 'NamedChild', function() {
			it('should be an instance of "NamedChild", "Child", and "Base"', function() {
				var n = new NamedChild();
				expect(n.className).to.be('NamedChild');

				expect(n.isInstanceOf('Base')).to.be(true);
				expect(n.isInstanceOf(Child.name)).to.be(true);
				expect(n.isInstanceOf(NamedChild.name)).to.be(true);

			});
		});

	});

});
