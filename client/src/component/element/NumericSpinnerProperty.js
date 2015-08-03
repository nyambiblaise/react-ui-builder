'use strict';

var React = require('react');

var ReactBootstrap = require('react-bootstrap');

var NumericSpinnerProperty = React.createClass({

    /**
     * _handlerForIncrement returns an event handler for incrementing
     * or decrementing the inputValue by the specified amount.
     * _handlerForIncrement(1) => function<1>(event)
     * _handlerForIncrement(-1) => function<-1>(event)
     */
    _handlerForIncrement: function (incrementBy){
      return function (e) {
        e.stopPropagation();
        e.preventDefault();
        var f = function (){
            var value = this.state.inputValue ? this.state.inputValue : 0;
            this.setState({
                inputValue: (value + incrementBy)
            });
        }.bind(this);
        f();
        this._mouseDownIntervalPid = setInterval(f, 150);
      }.bind(this);
    },

    _handleChangeInputValue: function (e) {
        var value = React.findDOMNode(this.refs.inputElement).value;
        if (value !== null && typeof value !== 'undefined' && value.length > 0) {
            value = value.replace(/,/, '.');
            var checkChar = value.charAt(value.length - 1);
            if(checkChar !== '.' && checkChar !== '0'){
                value = parseFloat(value);
                if(!value){
                    value = 0;
                }
            }
        } else {
            value = null;
        }
        this.setState({
            inputValue: value
        });
    },

    _handleBlur: function(){
        if(this._mouseDownIntervalPid){
            clearInterval(this._mouseDownIntervalPid);
        }
        this._handleChange(this.state.inputValue);
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

    getInitialState: function () {
        var inputValue = null;
        var isDisabled = true;
        if(this.props.inputValue !== null
          && typeof this.props.inputValue !== 'undefined'){
            inputValue = parseFloat(this.props.inputValue);
            isDisabled = false;
        }
        return {
            inputValue: inputValue,
            isDisabled: isDisabled
        }
    },

    getDefaultProps: function () {
        return {
            inputValue: null,
            stepValue: 1,
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
                                    <button className="btn btn-default btn-xs"
                                            type="button"
                                            disabled={this.state.isDisabled}
                                            onMouseDown={this._handlerForIncrement(1)}
                                            onMouseUp={this._handleBlur}>
                                        <span className="fa fa-plus"></span>
                                    </button>
                                    <button className="btn btn-default btn-xs"
                                            type="button"
                                            disabled={this.state.isDisabled}
                                            onMouseDown={this._handlerForIncrement(-1)}
                                            onMouseUp={this._handleBlur}>
                                        <span className="fa fa-minus"></span>
                                    </button>
                                </div>
                                <input ref="inputElement"
                                       type="text"
                                       disabled={this.state.isDisabled}
                                       className="form-control"
                                       value={this.state.inputValue}
                                       style={{textAlign: 'right', height: '1.85em', paddingTop: '2px', paddingBottom: '2px'}}
                                       onChange={this._handleChangeInputValue}
                                       onKeyDown={this._handleOnKeyDown}
                                       onBlur={this._handleBlur}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = NumericSpinnerProperty;
