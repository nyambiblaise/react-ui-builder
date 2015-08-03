'use strict';

var React = require('react');

var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;

var DigitalProperty = React.createClass({
    /**
     * _handlerForSet returns a handler function
     * for changing the digital value to true or false.
     * _handlerForSetValue(true) => function<true>(event)
     * _handlerForSetValue(false) => function<false>(event)
     */
    _handlerForSetValue: function(newValue){
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
                                            onClick={this._handlerForSetValue(true)}>
                                        <span>True</span>
                                    </Button>
                                    <Button className="btn btn-default btn-xs"
                                            type="button"
                                            active={this.state.inputValue === false}
                                            disabled={this.state.isDisabled}
                                            onClick={this._handlerForSetValue(false)}>
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
