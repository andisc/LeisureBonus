function w3_open() {

    if(window.innerWidth <= 400){ //in case of the screen phone the sidebar is wider
        document.getElementById("mySidebar").style.width = "70%";
    }
    else{
        document.getElementById("mySidebar").style.width = "25%";
    }
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("mySidebar").style["boxShadow"] = "-4px 0px 10px -1px rgba(0,0,0,0.54)";
  }
  
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }

/*
  $(document).ready(function () {
   
    $(window).scroll(function (e) {
      var scrollTop = $(window).scrollTop();
      var docHeight = $(document).height();
      var winHeight = $(window).height();
      var scrollPercent = scrollTop / (docHeight - winHeight);
      var scrollPercentRounded = Math.round(scrollPercent * 100);

      if(scrollPercentRounded >= 3){
        document.getElementById("full-nav-bar").style.display = "none";
      }

      if(scrollPercentRounded < 3){
        document.getElementById("full-nav-bar").style.display = "block";
      }
  
      
    });
  });*/
  

  function changeMenuColor() {
    if(document.URL.includes("/about/") || document.URL.includes("/MyAccount/") || document.URL.includes("/terms-conditions/")  || document.URL.includes("/privacy-policy/")  || document.URL.includes("/Register/")){
        document.getElementById("menu-top-navigation-link-1").style.color = "black";
        document.getElementById("menu-top-navigation-link-2").style.color = "black";
        document.getElementById("hamburger-nav-g").style.stroke = "black";
    }
  }


  $(document).ready(function () {
      
    changeMenuColor();
  });

  $(function() {
 
    var navBar = $('nav'); //Targets nav element
    var myWindow = $(window);
    var myPosition;
    var navScroll;

    //navBar.hide();

    myWindow.on('scroll', function() {
        navScroll = myWindow.scrollTop();
        if (navScroll < myPosition) { //height from top to trigger slideDown
            navBar.slideDown();  
            document.getElementById("full-nav-bar").style.backgroundColor = "white";
            document.getElementById("full-nav-bar").style["boxShadow"] = "0px 3px 5px grey";
            document.getElementById("menu-top-navigation-link-1").style.color = "black";
            document.getElementById("menu-top-navigation-link-2").style.color = "black";
            document.getElementById("hamburger-nav-g").style.stroke = "black";

        }
        else {
            navBar.slideUp();
        }
        myPosition = myWindow.scrollTop();
        if ($(this).scrollTop() === 0) { //hides when reached top
            navBar.slideDown(); 
            document.getElementById("full-nav-bar").style.backgroundColor = "transparent";
            document.getElementById("full-nav-bar").style["boxShadow"] = "none";
            document.getElementById("menu-top-navigation-link-1").style.color = "";
            document.getElementById("menu-top-navigation-link-2").style.color = "";
            document.getElementById("hamburger-nav-g").style.stroke = "";

            changeMenuColor();
        }
    });
});

  

