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
      return (e) => {
        e.stopPropagation();
        e.preventDefault();

        var incrementedTimes = 0;
        var multiplier = 1;

        var doIncrement = () => {
          if(incrementedTimes == 10) {
            incrementedTimes = 0;
            multiplier *= 2;
          }

          this._setValue(this.state.inputValue + (incrementBy * multiplier));
          incrementedTimes++;
        };

        doIncrement();
        this._mouseDownInterval = setInterval(doIncrement, 150);
      };
    },

    _stopIncrement: function() {
        clearInterval(this._mouseDownInterval);
    },

    _formatValue: function(value) {
      if(value === '') return 0;
      return parseFloat(value);
    },

    _handleChange: function(e) {
      this._setValue(this._formatValue(e.target.value));
    },

    _setValue: function(newValue){
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

    getInitialState: function () {
        return {
          inputValue: this.props.inputValue
        };
    },

    getDefaultProps: function () {
        return {
            inputValue: null,
            stepValue: 1,
            label: 'Prop value'
        };
    },

    componentWillReceiveProps: function (newProps) {
      this.setState({
        inputValue: newProps.inputValue
      });
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
                                            onMouseDown={this._handlerForIncrement(1)}
                                            onMouseUp={this._stopIncrement}
                                            onMouseOut={this._stopIncrement}>
                                        <span className="fa fa-plus"></span>
                                    </button>
                                    <button className="btn btn-default btn-xs"
                                            type="button"
                                            onMouseDown={this._handlerForIncrement(-1)}
                                            onMouseUp={this._stopIncrement}
                                            onMouseOut={this._stopIncrement}>
                                        <span className="fa fa-minus"></span>
                                    </button>
                                </div>
                                <input ref="inputElement"
                                       type="text"
                                       className="form-control"
                                       value={this.state.inputValue}
                                       style={{textAlign: 'right', height: '1.85em', paddingTop: '2px', paddingBottom: '2px'}}
                                       onChange={this._handleChange}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = NumericSpinnerProperty;
