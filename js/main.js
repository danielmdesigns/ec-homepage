var numPages; 
var activePage; 
    
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) 
        {
            return sParameterName[1];
        }
    }
}       

$(document).ready(function() { 

    var auto = getUrlParameter('auto');
    if (auto){
      $.cookie('auto', auto, { expires: 14, path: '/' });
    }

    if ($(".slider").length > 0) { 
        var sliders = $('.slider');
        sliders.noUiSlider({
        	start: 3825,
        	connect: "lower",
        	step: 25,
        	range: {
        		'min': 500,
        		'max': 12600
        	},
        	serialization: {
        	    lower: [
        	        $.Link({
            	        target: $("#sliderValue")  
        	        })
        	    ],
        		format: {
        			thousand: ',',
        			decimals: 0,
        			prefix: '$'
        		}
        	}
        });
        sliders.on('slide', calcTotal);
    }

    calcTotal();

    slideSlider();
    addNavi();


    $("#sliderWrapper").hover(function() {
       if ($(".sliderInner.active").is(':animated')) {
            $(".sliderInner.active").stop(true); 
       }
    }, function() {
        if ($(".sliderInner.active").not(':animated')) {
            slideSlider();
        }
    });
    
    $("#loginButton").click(function (){
      /*var qp = "";
      var auto = "30NEW";
      if ($(this).hasClass("autoPromo")){
        qp = "?auto=" + auto;
        $.cookie('auto', auto, { expires: 14, path: '/' });
      }
      window.location.href = "/account-login.php" + qp;*/
	  window.location.href = "/account-login.php";
    });
 
    $(".joinButton").click(function (){
      /*var qp = "";
      var auto = "30NEW";
      if ($(this).hasClass("autoPromo")){
        qp = "?auto=30NEW";
        $.cookie('auto', auto, { expires: 14, path: '/' });
      }
      window.location.href = "/join/start.php" + qp;*/
	  window.location.href = "/join/start.php";
    });
 
}); // END DOC READY 

$("#menuSelect").change(function() {
      document.location.href = $("#menuSelect option:selected" ).val(); 
});

$("body").on("click", ".navi li.prevBtn", function() { 
    numPages = 0; 
    activePage = 0;
    $(this).parents(".tabWrapper").find(".panes .pane").each(function() {
        numPages++; 
        if ($(this).is(".active")) { 
            activePage = numPages; 
        } 
    });
    if (activePage === 1) { 
        activePage = numPages; 
    } else { 
        activePage --; 
    }
/*     alert("showing " + activePage + " of " + numPages); */
    if ($(this).parents(".tabWrapper").find("ul.tabs").length > 0) {
        $(this).parents(".tabWrapper").find("ul.tabs li:nth-child("+activePage+") a").click();          
    } else { 
        $(this).parents(".tabWrapper").find(".panes").height('');
        $(this).parents(".tabWrapper").find(".pane.active").removeClass("active").hide();
        $(this).parents(".tabWrapper").find(".pane:nth-child("+activePage+")").addClass("active").show();
    }

});

$("body").on("click", ".navi li.nextBtn", function() { 
    numPages = 0; 
    activePage = 0;
    $(this).parents(".tabWrapper").find(".panes .pane").each(function() {
        numPages++; 
        if ($(this).is(".active")) { 
            activePage = numPages; 
        } 
    });
    if (activePage === numPages) { 
        activePage = 1; 
    } else { 
        activePage ++; 
    }
/*     alert("showing " + activePage + " of " + numPages); */
    if ($(this).parents(".tabWrapper").find("ul.tabs").length > 0) {
        $(this).parents(".tabWrapper").find("ul.tabs li:nth-child("+activePage+") a").click();          
    } else { 
        $(this).parents(".tabWrapper").find(".panes").height('');
        $(this).parents(".tabWrapper").find(".pane.active").removeClass("active").hide();
        $(this).parents(".tabWrapper").find(".pane:nth-child("+activePage+")").addClass("active").show();
    }

});

function addNavi() { 
    $(".tabWrapper").each(function() { 
       $(this).find(".panes").append("<ul class='navi'><li class='prevBtn'>&lt;</li><li class='nextBtn'>&gt;</li></ul>"); 
    });
}





function calcTotal() {
  //new way
    if ($(".slider").length > 0) {
      var advanceValue = $(".slider").val().replace(/[^0-9]/g, ''); //actual slider amt
      var dueValue = Math.ceil(Number(advanceValue) * 1.19047619); //regular due amount
      var feeValue = Math.round(dueValue - advanceValue , 2); //regular fee amount
      var promoValue = Math.ceil(feeValue / 2); //promo amount
      var newFee = Math.round(feeValue - promoValue , 2); //new fee amount
      var newdueValue = Math.round(dueValue - promoValue , 2); //new due amount
      
      //advanceAmount, newRegularAmount, newFeeAmount, newDueAmount
      $("#advanceAmount").html('$'+advanceValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $("#dueAmount").html('$'+dueValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $("#feeAmount").html('$'+feeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $("#newRegularAmount").html('$'+feeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $("#newFeeAmount").html('$'+newFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      $("#newDueAmount").html('$'+newdueValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    }
}

function slideSlider() { 
    if ($("#logoSlider").length > 0) {
       if ($(".sliderInner").length <= 1) { 
        $(".sliderInner" ).clone().appendTo( "#logoSlider");
        $(".sliderInner:first-child").addClass("active"); 
       } 
        $(".sliderInner.active").stop().animate({
            marginLeft: '-='+ $(".sliderInner.active").width() + 'px'
        }, 50000, 'linear', function()  {
            $(".sliderInner.active").remove();
            slideSlider();
        });
    }    
}

$(window).load(function() {
    $(".tabs li.active a").click();
});

$(window).scroll(function() {

   if($(window).scrollTop() > 20) { 
       $("#navBar .inner").addClass("scrolled");
   } else {
       $("#navBar .inner").removeClass("scrolled");
   }

   if($(window).scrollTop() > 700) {
       $("body").addClass("highlight"); 
   } else { 
       $("body").removeClass("highlight"); 
   } 
   
});

$(window).resize(function() {
     $(".panes").height($(".panes .pane.active"));
});

var currentTab;

$(".tabs li a").on("click",function(e) {
    var myId  = $(this).attr("href");
    var newHeight = $(myId).height();
    currentTab = $(this); 
    $(currentTab).parents(".tabWrapper").find(".pane.active").fadeOut(function() {
        $(currentTab).parents(".tabWrapper").find(".panes").animate({
           height: newHeight + 'px' 
        }, 500);
        $(currentTab).parents(".tabWrapper").find("li.active").removeClass("active");
        $(currentTab).parents("li").addClass("active");
        $(currentTab).parents(".tabWrapper").find(".pane.active").removeClass("active");
        $(myId).addClass("active").fadeIn();
        e.preventDefault();
    });  
});

/* djs showAlert function */
function showAlert(alertElement, alertType, hasClose, alertDuration) {
  alertType = (typeof alertType === "undefined") ? "info" : alertType;
  hasClose = (typeof hasClose === "undefined") ? true : hasClose;
  alertDuration = (typeof alertDuration === "undefined") ? 0 : alertDuration;
  $(alertElement).addClass("alert-" + alertType);
  if (hasClose) {
    $(alertElement + " .close").bind("click",function () {
      $(alertElement).slideUp("slow");
    });
  }else{
    $(alertElement + " .close").hide();
  }//suppress close button
  $(alertElement).slideDown("slow"); //show alert
  if (alertDuration !== 0) {
    setTimeout (function () { $(alertElement).slideUp("slow"); }, alertDuration * 1000);
  }
}
