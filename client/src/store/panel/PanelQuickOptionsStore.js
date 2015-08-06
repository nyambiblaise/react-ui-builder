'use strict';

var _ = require('underscore');
var Reflux = require('reflux');
var PanelQuickOptionsActions = require('../../action/panel/PanelQuickOptionsActions.js');
var DeskPageFrameActions = require('../../action/desk/DeskPageFrameActions.js');
var Common = require('../../api/Common.js');
var Repository = require('../../api/Repository.js');

var defaultModel = {
    activeStylePanel: 1,
    activeStylePane: 1
};

var PanelQuickOptionsStore = Reflux.createStore({
    model: defaultModel,
    listenables: PanelQuickOptionsActions,

    onSetActiveLayout: function(options){
        this.model = _.extend(this.model, options);
    },

    onSelectItem: function(modelNode, selectedUmyId){
        this.model.selectedUmyId = selectedUmyId;
        this.model.props = modelNode.found.props;
        this.model.componentType = modelNode.found.type;
        this.trigger(this.model);
    },

    onDeselectItem: function(){
        this.model.selectedUmyId = null;
        this.model.props = null;
        this.model.componentType = null;
        this.trigger(this.model);
    },

    /**
     * The 'changeStyleOptions' action is triggered when a style property
     * is changed from the style sidebar panels
     */
    onChangeStyleOptions: function(newStyle){
        var projectModel = Repository.getCurrentProjectModel();
        var searchResult = null;
        for(var i = 0; i < projectModel.pages.length; i++){
            if(!searchResult){
                searchResult = Common.findByUmyId(projectModel.pages[i], this.model.selectedUmyId);
            }
        }
        if(searchResult){
            searchResult.found.props.style = searchResult.found.props.style || {};
            searchResult.found.props.style = _.extend(searchResult.found.props.style, newStyle);
            Repository.renewCurrentProjectModel(projectModel);
            DeskPageFrameActions.renderPageFrame();
            this.trigger(this.model);
        }
        //console.log(JSON.stringify(newStyle, null, 4));
    },

    /**
     * The 'removeStyleOptions' action is triggered when style property
     * is disabled using a checkbox from the style sidebar panels
     */
    onRemoveStyleOptions: function(removeStyle){
        var projectModel = Repository.getCurrentProjectModel();
        var searchResult = null;
        for(var i = 0; i < projectModel.pages.length; i++){
            if(!searchResult){
                searchResult = Common.findByUmyId(projectModel.pages[i], this.model.selectedUmyId);
            }
        }
        if(searchResult && searchResult.found.props.style){
            var newStyle = {};
            _.mapObject(searchResult.found.props.style, function(value, prop){
                if(removeStyle !== prop){
                    newStyle[prop] = value;
                }
            });
            searchResult.found.props.style = newStyle;
            Repository.renewCurrentProjectModel(projectModel);
            DeskPageFrameActions.renderPageFrame();
        }

    },

    onChangeProps: function(newProps) {
        var projectModel = Repository.getCurrentProjectModel();
        var searchResult = null;
        for(var i = 0; i < projectModel.pages.length; i++){
            if(!searchResult){
                searchResult = Common.findByUmyId(projectModel.pages[i], this.model.selectedUmyId);
            }
        }
        if(searchResult){
            searchResult.found.props = searchResult.found.props || {};
            searchResult.found.props = _.extend(searchResult.found.props, newProps);
            Repository.renewCurrentProjectModel(projectModel);
            DeskPageFrameActions.renderPageFrame();
            this.model.props = searchResult.found.props;
            this.trigger(this.model);
        }
    },

    onOverrideProps: function(newProps) {
        var projectModel = Repository.getCurrentProjectModel();
        var searchResult = null;
        for(var i = 0; i < projectModel.pages.length; i++){
            if(!searchResult){
                searchResult = Common.findByUmyId(projectModel.pages[i], this.model.selectedUmyId);
            }
        }
        if(searchResult){
            searchResult.found.props = searchResult.found.props || {};
            // Even if overriding, need to keep the umyid
            var umyId = searchResult.found.props['data-umyid'];
            var keep = {
              'data-umyid': umyId
            }
            searchResult.found.props = _.extend(newProps, keep);
            Repository.renewCurrentProjectModel(projectModel);
            DeskPageFrameActions.renderPageFrame();
            this.model.props = searchResult.found.props;
            this.trigger(this.model);
        }
    },

    onProbeAction: function() {
        this.trigger(this.model);
    }

});

module.exports = PanelQuickOptionsStore;
