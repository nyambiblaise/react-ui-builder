'use strict';

var Reflux = require('reflux');

var PanelQuickOptionsActions = Reflux.createActions([
    'setActiveLayout',
    'selectItem',
    'deselectItem',
    'changeProps',
    'changeStyleOptions',
    'removeStyleOptions',
    'probeAction'
]);

module.exports = PanelQuickOptionsActions;
