'use strict';

var _ = require('underscore');
var React = require('react');

var ReactBootstrap = require('react-bootstrap');
var PanelQuickOptionsStore = require('../../store/panel/PanelQuickOptionsStore.js');
var Server = require('../../api/Server.js');

var ButtonGroup = ReactBootstrap.ButtonGroup;
var Button = ReactBootstrap.Button;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var Glyphicon = ReactBootstrap.Glyphicon;

/**
 * This component provides a quick way to switch component variants after
 * the component has been placed on the page
 */
var VariantSwitcher = React.createClass({
    _handlerForClickVariant: function(variant) {
        return function(event){
            if(this.props.onSelectVariant){
                this.props.onSelectVariant({
                    props: variant.props
                });
            }
        }.bind(this);
    },

    getInitialState: function () {
        return {
          variants: {}
        };
    },

    getDefaultProps: function () {
      return {};
    },

    onModelChange: function (modelNode) {
        this._loadVariants(modelNode.componentType);
    },

    // Retrieve the user defined variants available for the selected component
    _loadVariants: function(componentType) {
        if (typeof componentType === 'undefined' || componentType === null){
            this.setState({variants: {}});
        }else{
            Server.invoke('loadComponentDefaults', {componentName: componentType},
            function(err){
              console.error('Error loading defaults:', err);
            },
            function(data){
              this.setState({variants: data.model});
            }.bind(this));
        }
    },

    componentDidMount: function () {
        this._loadVariants(PanelQuickOptionsStore.model.componentType);
        this.unsubscribe = PanelQuickOptionsStore.listen(this.onModelChange);
    },

    componentWillUnmount: function () {
        this.unsubscribe();
    },

    render: function(){
        var variantList = _.map(this.state.variants, function(variant, index){
          var variantName = variant.variantName || 'Variant #' + index
            return (
              <MenuItem eventKey={'variant'+index}
                onClick={ this._handlerForClickVariant(variant) }>{ variantName }</MenuItem>
            );
        }.bind(this));

        return (
            <DropdownButton title="Load Variant" key="btnSelectVariant">
              {variantList}
            </DropdownButton>
        );
    }
});

module.exports = VariantSwitcher;
