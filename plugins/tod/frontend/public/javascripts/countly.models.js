(function (countlyOurplugin, $) {

  //we will store our data here
  var _data = {};

  //Initializing model
  countlyOurplugin.initialize = function () {
  
    //returning promise
    return $.ajax({
        type:"GET",
        url:"/o",
        data:{
          //providing current user's api key
          "api_key":countlyGlobal.member.api_key,
          //providing current app's id
          "app_id":countlyCommon.ACTIVE_APP_ID,
          //specifying method param
          "method":"ourplugin"
        },
        success:function (json) {
           //got our data, let's store it
           _data = json;
        }
    });
    
    return true;
  };
  
  //return data that we have
  countlyOurplugin.getData = function () {
    return _data;
  };
  
}(window.countlyOurplugin = window.countlyOurplugin || {}, jQuery));