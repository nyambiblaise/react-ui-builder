
var React = require('react');
var _ = require('underscore');

var ReactBootstrap = require('react-bootstrap');
var Panel = ReactBootstrap.Panel;

var NumericSpinnerProperty = require('../element/NumericSpinnerProperty.js');
var DigitalProperty = require('../element/DigitalProperty.js');
var TextProperty = require('../element/TextProperty.js');
var ObjectProperty = require('../element/ObjectProperty.js');
var ArrayProperty = require('../element/ArrayProperty.js');

var PanelQuickOptionsActions = require('../../action/panel/PanelQuickOptionsActions.js');

var PropEditorPanel = React.createClass({

    _handleChangeProperty: function(e){
        var name = e.target.name;
        var value = e.target.value;
        var newProps = {};
        newProps[name] = value;
        PanelQuickOptionsActions.changeProps(newProps);
    },

    _createListOfElements: function(propertyArray){
        var elements = propertyArray.map(function(property, index){
            if(property.name === 'data-umyid') {
                // umyid property is for internal use only
                return;
            }
            if(property.name === 'style') {
                // Style properties are edited by the other panels
                return;
            }
            if(property.type === 'digital'){
                return (
                    <DigitalProperty key={'prop' + index}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>

                );
            }

            if(property.type === 'number') {
                return (
                    <NumericSpinnerProperty key={'prop' + index}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>
                );
            }

            if(property.type === 'text') {
                return (
                    <TextProperty key={'prop' + index}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>
                );
            }

            if(property.type === 'object') {
                return (
                    <ObjectProperty key={'prop' + index}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>
                );
            }

            if(property.type === 'array') {
                return (
                    <ArrayProperty key={'prop' + index}
                                     style={{marginTop: '1em'}}
                                     label={property.name}
                                     inputValue={property.value}
                                     onChangeValue={this._handleChangeProperty}/>
                );
            }
        }.bind(this));
        return elements;
    },

    getInitialState: function(){
        return {
            activeStylePane: this.props.activeStylePane
        }
    },

    componentDidMount: function(){
        $(React.findDOMNode(this)).find('.panel-body').css({
            'padding': '5px'
        });
    },

    render: function() {
        // Gather information about the selected component's properties
        this.properties = [];
        _.map(this.props.props, function(item, key){
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
            if(key === 'data-umyid') propertyInfo.readOnly = true;
            this.properties.push(propertyInfo);
        }.bind(this));

        return (
            <Panel header="React Props" collapsable={ true } expanded={ true }>
                <div style={{ padding: '0.5em 0.5em 1.5em 0.5em' }}>
                  <p>{ this._createListOfElements(this.properties) }</p>
                </div>
            </Panel>
        );
    }

});

module.exports = PropEditorPanel;
