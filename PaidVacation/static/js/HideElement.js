

function funcShowChooseBonus() {
  var x1 = document.getElementById("subcontainerChooseBonus");
  var x2 = document.getElementById("subcontainerMyHistory");
  var x3 = document.getElementById("subcontainerPersonalProfile");
  
    x1.style.display = "block";
    x2.style.display = "none";
    x3.style.display = "none";
}

function funcShowMyHistory() {
  var x1 = document.getElementById("subcontainerChooseBonus");
  var x2 = document.getElementById("subcontainerMyHistory");
  var x3 = document.getElementById("subcontainerPersonalProfile");
  
    x1.style.display = "none";
    x2.style.display = "block";
    x3.style.display = "none";
}

function funcShowPersonalProfile() {
  var x1 = document.getElementById("subcontainerChooseBonus");
  var x2 = document.getElementById("subcontainerMyHistory");
  var x3 = document.getElementById("subcontainerPersonalProfile");
  
    x1.style.display = "none";
    x2.style.display = "none";
    x3.style.display = "block";
}