var myForm = document.getElementById("myForm");
myForm.addEventListener("submit", addSite);
var sitesContainer = document.querySelector(".sites");
var siteName = document.getElementById("mySiteName");
var siteUrl = document.getElementById("mySiteUrl");
var sites = [];
function addSite(e) {
  var site = {
    name: siteName.value,
    url: siteUrl.value
  };
  e.preventDefault();
  if (!validateForm(siteName.value, siteUrl.value)) {
    return false;
  }
  if (localStorage.getItem("sites") === null) {
    sites = [];
    sites.push(site);
    localStorage.setItem("sites", JSON.stringify(sites));
  } else {
    sites = JSON.parse(localStorage.getItem("sites"));
    sites.push(site);
    sites = localStorage.setItem("sites", JSON.stringify(sites));
  }
  myForm.reset();
  displaySite();
}
function displaySite() {
  if (localStorage.getItem("sites") != null) {
    sites = JSON.parse(localStorage.getItem("sites"));
    var temp = "";
    for (var i = 0; i < sites.length; i++) {
      temp += `<div class="site rounded my-3 py-3 px-2">
    <span class="h5 text-muted ml-2">${sites[i].name}</span><a href="${addhttp(
        sites[i].url
      )}" class="btn btn-light ml-2">Visit</a
    ><button class="btn btn-danger ml-2" onclick="deleteSite('${
      sites[i].url
    }')">Delete</button>
  </div>`;
    }
    sitesContainer.innerHTML = temp;
  }
}
function deleteSite(url) {
  sites = JSON.parse(localStorage.getItem("sites"));
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].url == url) {
      sites.splice(i, 1);
    }
  }
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySite();
}
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill the empty fields");
    return false;
  }
  for (var i = 0; i < sites.length; i++) {
    if (siteName == sites[i].name) {
      alert("this site already exist");
    } else {
      return true;
    }
  }

  var expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}
function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}
displaySite();
