window.OurpluginView = countlyView.extend({
  
  //need to provide at least empty initialize function
  //to prevent using default template
	initialize:function (){
		//we can initialize stuff here
	},
  
  beforeRender: function() {
    
    	//Loading d3
    	if(!production){
    	  CountlyHelpers.loadJS("tod/javascripts/d3.js");
    	  CountlyHelpers.loadJS("tod/javascripts/tod.js");
    	  //CountlyHelpers.loadCSS("ourplugin/stylesheets/external.min.css");
    	}

		//check if we already have template
		if(this.template)
      
			//then lets initialize our mode
			return $.when(countlyOurplugin.initialize()).then(function () {});
		else{
      
			//else let's fetch our template and initialize our mode in paralel
			var self = this;
			return $.when($.get(countlyGlobal["path"]+'/tod/templates/default.html', function(src){
        
				//precompiled our template
				self.template = Handlebars.compile(src);
			}), countlyOurplugin.initialize()).then(function () {});
		}
  },
  
	//here we need to render our view
  renderCommon:function () {
		
				//provide template data
        this.templateData = {
            "page-title":"OurPlugin",
            "logo-class":"",
						"data":countlyOurplugin.getData()
        };
		
				//populate template with data and attach it to page's content element
        $(this.el).html(this.template(this.templateData));
  },
  
	//here we need to refresh data
  /*refresh:function () {
      var self = this;
      $.when(countlyOurplugin.initialize()).then(function () {
		
				//our view is not active
        if (app.activeView != self) {
            return false;
        }
			
				//here basically we want to do the same we did in renderCommon method
        self.renderCommon();
      });
    }*/
});

//create view
app.ourpluginView = new OurpluginView();
//register route
app.route('/tod', 'tod', function () {
	this.renderWhenReady(this.ourpluginView);
	//res.send("HEY");
});