
var React = require('react');
var _ = require('underscore');

var ReactBootstrap = require('react-bootstrap');
var Panel = ReactBootstrap.Panel;

var VariantSwitcher = require('../element/VariantSwitcher.js');

var NumericSpinnerProperty = require('../element/NumericSpinnerProperty.js');
var DigitalProperty = require('../element/DigitalProperty.js');
var TextProperty = require('../element/TextProperty.js');
var ObjectProperty = require('../element/ObjectProperty.js');
var ArrayProperty = require('../element/ArrayProperty.js');

var PanelQuickOptionsActions = require('../../action/panel/PanelQuickOptionsActions.js');

/**
 * This defines a sidebar panel for quickly changing property values
 * of components from inside the builder
 */
var PropEditorPanel = React.createClass({

    // Handler for when the user changes one of the property values
    _handleChangeProperty: function(e){
        var name = e.target.name;
        var value = e.target.value;
        var newProps = {};
        newProps[name] = value;
        PanelQuickOptionsActions.changeProps(newProps);
    },

    // Handler for the user selecting a new variant
    _handleSelectVariant: function(e){
        PanelQuickOptionsActions.overrideProps(e.props);
    },

    // Creates property editor components based on property metadata
    _createListOfElements: function(propertyArray){
        var elements = propertyArray.map((property, index) => {
            if(property.type === null) {
                return;
            }

            if(property.type === 'digital'){
                return (
                    <DigitalProperty key={'prop' + property.name}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>

                );
            }

            if(property.type === 'number') {
                return (
                    <NumericSpinnerProperty key={'prop' + property.name}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>
                );
            }

            if(property.type === 'text') {
                return (
                    <TextProperty key={'prop' + property.name}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>
                );
            }

            if(property.type === 'object') {
                return (
                    <ObjectProperty key={'prop' + property.name}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>
                );
            }

            if(property.type === 'array') {
                return (
                    <ArrayProperty key={'prop' + property.name}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>
                );
            }
        });
        return elements;
    },

    render: function() {
        // Gather metadata about the component's properties
        var properties = _.map(this.props.props, (item, key) => {
            var propertyInfo = {
              name: key,
              value: item,
              type: 'text',
              readOnly: false
            };
            if(_.isNumber(item)) propertyInfo.type = 'number';
            if(_.isBoolean(item)) propertyInfo.type = 'digital';
            if(_.isObject(item)) propertyInfo.type = 'object';
            if(_.isArray(item)) propertyInfo.type = 'array';

            // Hide the following props
            if(key === 'data-umyid') propertyInfo.type = null;
            if(key === 'style') propertyInfo.type = null;

            return propertyInfo;
        });

        var elements = this._createListOfElements(properties);

        return (
            <Panel header="React Props" collapsable={ true } expanded={ true } key="panelReactProps">
                <div>
                  <VariantSwitcher onSelectVariant={this._handleSelectVariant} key="variantSwitcher" />

                  { elements }
                </div>
            </Panel>
        );
    }

});

module.exports = PropEditorPanel;
