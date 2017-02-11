import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import DrawControlComponent from 'ember-leaflet-draw/components/draw-control';
let drawControl;

moduleForComponent('draw-control', 'Integration | Component | draw control', {
  integration: true,
  beforeEach() {
    this.register('component:draw-control', DrawControlComponent.extend({
      init() {
        this._super(...arguments);
        drawControl = this;
      }
    }));

    // Set any properties with this.set('myProperty', 'value');
    this.setProperties({
      lat: 38,
      lng: -78,
      zoom: 8
    });

    // Handle any actions with this.on('myAction', function(val) { ... });

  }
});

test('it renders', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control is not empty
  assert.notEqual(this.$('.leaflet-draw.leaflet-control').text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{#draw-control}}
        <span class="test-insertion">template block text</span>
      {{/draw-control}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control is not empty
  assert.notEqual(this.$('.leaflet-draw.leaflet-control').text().trim(), '');

  // Ensure nested element is found
  assert.equal(this.$('.test-insertion').text().trim(), 'template block text');
});

test('it responds to boolean option for enableEditing', function(assert) {
  assert.expect(4);

  // Template block usage: (can't enableEditing without showDrawingLayer set to true)
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control enableEditing=true showDrawingLayer=true}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control enables enableEditing
  assert.ok(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-edit').length, "setting enableEditing to true fails to render edit button");
  assert.ok(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-remove').length, "setting enableEditing to true fails to render delete button");


  // Template block usage: (set showDrawingLayer to true to prove that enableEditing as false works)
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control enableEditing=false showDrawingLayer=true}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control disables enableEditing
  assert.notOk(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-edit').length, "setting enableEditing to false fails to hide edit button");
  assert.notOk(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-remove').length, "setting enableEditing to false fails to hide delete button");

});

test('it has deafult value for enableEditing set to false', function(assert) {
  assert.expect(2);

  // Template block usage: (set showDrawingLayer to true to prove that enableEditing defaults false)
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control showDrawingLayer=true}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control defaults to enabling enableEditing
  assert.notOk(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-edit').length, "default enableEditing should be false and not render edit button");
  assert.notOk(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-remove').length, "setting enableEditing should be false and not render delete button");

});

test('it responds to boolean option for showDrawingLayer', function(assert) {
  assert.expect(2);

  // Template block usage:
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control showDrawingLayer=true}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control enables showDrawingLayer. If enabled, _layer will be created.
  assert.ok(drawControl._layer, 'failed to find drawing layer');

  // Template block usage:
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control showDrawingLayer=false}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control disables showDrawingLayer. If disabled, _layer will not be created.
  assert.notOk(drawControl._layer, 'failed to find drawing layer');
});

test('it needs showDrawingLayer to be true for enableEditing to work', function(assert) {
  assert.expect(4);

  // Template block usage:
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control showDrawingLayer=true enableEditing=true}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control enables showDrawingLayer. If enabled (while edit is defaulted/true) the edit buttons will display becaue there is a layer to edit.
  assert.ok(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-edit').length, "setting enableEditing to true fails to render edit button");
  assert.ok(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-remove').length, "setting enableEditing to true fails to render delete button");

  // Template block usage:
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control showDrawingLayer=false enableEditing=true}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control disables showDrawingLayer. If disabled (while edit is defaulted/true) the edit buttons will not display becaue there is no layer to edit.
  assert.notOk(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-edit').length, "setting showDrawingLayer to false fails to hide edit button");
  assert.notOk(this.$('.leaflet-draw.leaflet-control .leaflet-draw-edit-remove').length, "setting showDrawingLayer to false fails to hide delete button");
});

test('it has deafult value for showDrawingLayer set to false', function(assert) {
  assert.expect(1);

  // Template block usage:
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control enables showDrawingLayer. If enabled, _layer will be created.
  assert.notOk(drawControl._layer, 'should not have found drawing layer');
  });

test('it responds to all options for position', function(assert) {
  assert.expect(4);

  // Set new position to topleft
  this.set('position', 'topleft');

  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control position=position}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control is in topleft location
  assert.ok(this.$('.leaflet-top.leaflet-left .leaflet-draw.leaflet-control').length, "topleft location fails");

  // Set new position to topright
  this.set('position', 'topright');

  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control position=position}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control is in topright location
  assert.ok(this.$('.leaflet-top.leaflet-right .leaflet-draw.leaflet-control').length, "topright location fails");

  // Set new position to bottomleft
  this.set('position', 'bottomleft');

  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control position=position}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control is in bottomleft location
  assert.ok(this.$('.leaflet-bottom.leaflet-left .leaflet-draw.leaflet-control').length, "bottomleft location fails");

  // Set new position to bottomright
  this.set('position', 'bottomright');

  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control position=position}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control is in bottomright location
  assert.ok(this.$('.leaflet-bottom.leaflet-right .leaflet-draw.leaflet-control').length, "bottomright location fails");
});

test('it has deafult value for position set to topleft', function(assert) {
  assert.expect(1);

  // Template block usage:
  this.render(hbs`
    {{#leaflet-map lat=lat lng=lng zoom=zoom}}
      {{draw-control}}
    {{/leaflet-map}}
  `);

  // Ensure draw-control is in topleft location
  assert.ok(this.$('.leaflet-top.leaflet-left .leaflet-draw.leaflet-control').length, "defaulting to topleft location fails");
});
