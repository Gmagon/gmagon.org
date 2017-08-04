(function($) { 
  'use strict';
   var DateDiff = function (sDate1){
      var  aDate,  oDate1,  oDate2,  iDays;
      aDate  =  sDate1.split("-")  
      oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
      oDate2  =  new  Date()  
      iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)
      return  iDays  
  }

  var GmagonUtils = {};

  GmagonUtils.$verNote = function(releaseDate){
      var text = "Released this version " + DateDiff(releaseDate) +  " days ago. -  (" + releaseDate + ")";
      document.write(text)
  }

  window.GmagonUtils = GmagonUtils;
})(jQuery);