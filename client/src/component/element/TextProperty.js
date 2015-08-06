'use strict';

var React = require('react');

var ReactBootstrap = require('react-bootstrap');

var TextProperty = React.createClass({
    _handleOnChange: function(e){
        this._setValue(e.target.value);
    },

    _setValue: function(newValue) {
        this.setState({
            inputValue: newValue
        });

        if(this.props.onChangeValue){
            this.props.onChangeValue({
                target: {
                    name: this.props.label,
                    value: newValue
                }
            });
        }
    },

    componentWillReceiveProps: function(newProps) {
        this.setState({
            inputValue: newProps.inputValue
        });
    },

    getInitialState: function () {
        return {
            inputValue: this.props.inputValue
        };
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
                                value={this.state.inputValue}
                                onChange={this._handleOnChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = TextProperty;
