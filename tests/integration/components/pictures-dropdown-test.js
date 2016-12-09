import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pictures-dropdown', 'Integration | Component | pictures dropdown', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pictures-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pictures-dropdown}}
      template block text
    {{/pictures-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
