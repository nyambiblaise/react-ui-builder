'use strict';

var React = require('react');

var ReactBootstrap = require('react-bootstrap');

var ObjectProperty = React.createClass({
    render: function () {
        return (
            <div {...this.props}>
                <p style={{marginBottom: '3px'}}>{this.props.label}</p>
                <div>
                    <div style={{display: 'table-row'}}>
                        <div style={{display: 'table-cell', width: '100%', paddingLeft: '15px', paddingRight: '15px'}}>
                          <input readOnly value={JSON.stringify(this.props.inputValue)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ObjectProperty;
