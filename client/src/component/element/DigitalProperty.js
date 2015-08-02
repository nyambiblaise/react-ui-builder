'use strict';

var React = require('react');

var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;

var DigitalProperty = React.createClass({
    _handleSet: function(newValue){
      return function(event){
        this.setState({
          inputValue: newValue
        });
        this._handleChange(newValue);
      }.bind(this);
    },

    _handleChange: function(inputValue){
        if(this.props.onChangeValue){
            this.props.onChangeValue({
                target: {
                    name: this.props.label,
                    value: inputValue
                }
            });
        }
    },

    _handleOnKeyDown: function(e){
        if(e.keyCode == 13 || e.keyCode == 27){
            this._handleBlur();
        }
    },

    _handleDisabled: function(e){
        e.stopPropagation();
        if(this.props.onRemoveValue){
            if(!this.state.isDisabled){
                this.props.onRemoveValue({
                    target: {
                        name: this.props.label
                    }
                })
            } else {
                this._handleChange(5, unitsList[0]);
            }
        } else {
            this.setState({
                isDisabled: !this.state.isDisabled
            });
        }
    },

    getInitialState: function () {
        return {
            inputValue: this.props.inputValue,
            isDisabled: false
        }
    },

    getDefaultProps: function () {
        return {
            inputValue: null,
            label: 'Prop value'
        };
    },

    render: function () {

        return (
            <div {...this.props}>
                <p style={{marginBottom: '3px'}}>{this.props.label}</p>
                <div style={{display: 'table', width: '100%'}}>
                    <div style={{display: 'table-row'}}>
                        <div style={{display: 'table-cell', width: '100%', paddingLeft: '15px', paddingRight: '15px'}}>
                            <div className="input-group">
                                <div className="input-group-btn">
                                    <Button className="btn btn-default btn-xs"
                                            type="button"
                                            active={this.state.inputValue === true}
                                            disabled={this.state.isDisabled}
                                            onClick={this._handleSet(true)}>
                                        <span>True</span>
                                    </Button>
                                    <Button className="btn btn-default btn-xs"
                                            type="button"
                                            active={this.state.inputValue === false}
                                            disabled={this.state.isDisabled}
                                            onClick={this._handleSet(false)}>
                                        <span>False</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = DigitalProperty;
