'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Select = require('react-select');

var SelectStyleProperty = React.createClass({

    getInitialState: function(){
        return {
            value: this.props.value
        }
    },

    getDefaultProps: function(){
        return {
            label: 'Label',
            listValue: [
                {value: 'one', label: 'One'},
                {value: 'two', label: 'Two'}
            ]
        }
    },

    _handleDisabled: function(e){
        e.stopPropagation();
        if(this._isDisabled()){
            this._handleChange(this.props.listValue[0].value);
        } else {
            this._handleChange(null);

            if(this.props.onRemoveValue){
              this.props.onRemoveValue({
                  target: {
                      name: this.props.label
                  }
              });
            }
        }
    },

    _handleChange: function(val){
        this.setState({
          value: val
        });

        if(this.props.onChangeValue){
            this.props.onChangeValue({
                target: {
                    name: this.props.label,
                    value: val
                }
            });
        }
    },

    _isDisabled: function(){
        return this.state.value === null || typeof this.state.value === 'undefined';
    },

    render: function() {
        var _isDisabled = this._isDisabled();

        var _value = this.state.value;
        if(_isDisabled){
            _value = '';
        }
        return (
            <div {...this.props}>
                <p style={{marginBottom: '3px'}}>{this.props.label}</p>
                <div style={{display: 'table', width: '100%'}}>
                    <div style={{display: 'table-row'}}>
                        <div style={{display: 'table-cell', width: '10%', textAlign: 'left', verticalAlign: 'middle'}}>
                            <input type='checkbox'
                                   style={{margin: '0'}}
                                   checked={!_isDisabled}
                                   onChange={this._handleDisabled} />
                        </div>
                        <div style={{display: 'table-cell', width: '80%', paddingLeft: '15px', paddingRight: '15px'}}>
                            <Select options={this.props.listValue}
                                    clearable={false}
                                    disabled={_isDisabled}
                                    value={_value}
                                    onChange={this._handleChange}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = SelectStyleProperty;
