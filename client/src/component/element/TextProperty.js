'use strict';

var React = require('react');

var ReactBootstrap = require('react-bootstrap');

var TextProperty = React.createClass({
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

    _handleOnChange: function(e){
      this._handleChange(e.target.value);
    },

    getInitialState: function () {
        return {
            inputValue: this.props.inputValue,
            isDisabled: false
        }
    },

    getDefaultProps: function () {
        return {
            inputValue: '',
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
                            <input
                                type="text"
                                ref="input"
                                disabled={this.state.isDisabled}
                                defaultValue={this.state.inputValue}
                                onBlur={this._handleOnChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = TextProperty;
