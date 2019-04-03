$(document).ready(function () {



  // Introduction

  var start = true;

  var jour = document.getElementById("jour");
  TweenLite.from(jour, 1, {height: "0px"  });
  TweenLite.from(".loader div", 0.5, {opacity: 0, delay: 0.7})

  var $chargeText = $(".loading-text");

  TweenLite.set($chargeText[0], {opacity:1})


  // Text précisant la partie du chargement

  function loadingText(i) {
    var j = i + 1;
    var tl = new TimelineLite();
    tl.to($chargeText[i], 0.2, {opacity:0});
    tl.to($chargeText[j], 0.2, {opacity:1});
    tl.delay(i)
  }

  // Pourcentage de chargement

  function loadingPercent(x, y){
    var Count= {val:x};
    TweenLite.to(Count,1,{val:y,roundProps:"val",onUpdate:function(){
      document.getElementsByClassName("loading-percent")[0].innerHTML=Count.val+"%"
    }});
  }

  loadingPercent(0, 50);


  // Boules sautantes

  var loading = new TimelineLite( {onComplete: function(){
    this.restart();
  }});
  loading.delay(0.7)
  loading.add( TweenLite.to(".loader div", 0.1, {scaleY:1, ease: Power2.easeIn}))
  loading.add( TweenLite.to(".loader div", 0.5, {y: "-100px", ease: Power2.easeOut}))
  loading.add( TweenLite.to(".loader div", 0.5, {y: "0px", ease: Power2.easeIn}))
  loading.add( TweenLite.to(".loader div", 0.1, {scaleY:0.2, ease: Power2.easeOut}))
  loading.add( TweenLite.fromTo(".loader div", 1, {x: "-50px"}, {x: "50px", ease: Power0.easeInOut}), "=-1.1")
  loading.add( TweenLite.to(".loader div", 0.1, {scaleY:1, ease: Power2.easeIn,}))
  loading.add( TweenLite.to(".loader div", 0.5, {y: "-100px", ease: Power2.easeOut,}))
  loading.add( TweenLite.to(".loader div", 0.5, {y: "0px", ease: Power2.easeIn}))
  loading.add( TweenLite.to(".loader div", 0.1, {scaleY:0.2, ease: Power2.easeOut}))
  loading.add( TweenLite.fromTo(".loader div", 1, {x: "50px"}, {x: "-50px", ease: Power0.easeInOut}), "=-1.1")

  function weatherLoaded(){

    setTimeout(function(){
      TweenLite.to(".loader", 0.5, {opacity: 0, onComplete: function(){
        $(".loader").remove();
      }})

      setTimeout(function(){
        var days = $("li")
        $.each( days, function(key){
          console.log(key)
          var delai = 0.2*key;
          TweenLite.to(days[key], 0.5, {opacity: 1, scaleY: 1, delay: delai})
        })

        var today = $(".jour").children()
        TweenLite.to(today, 0.5, {opacity: 1})
      }, 500)
    }, 2000)

    start = false;
  }

  var ville = "Bamako"

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userPosition = position.coords.latitude+", "+position.coords.longitude;
      console.log(userPosition);
      townName();
      loadingText(0);
      loadingPercent(50, 70);
    }, errorCallback);
  }
  else {
    townWeather();
  }

  function errorCallback(error) {
    if (error.code == error.PERMISSION_DENIED) {
      townWeather();
    }
  }

  function townName(){
    linkGoogle = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+userPosition+"&key=AIzaSyB2rXBHbqF6goiUdNpbzAWYsvDkqZnXFO8";
    $.getJSON(linkGoogle, function(data){
      ville = data.results[1].address_components[0].long_name;
      townWeather()
    });
  }

  function townWeather(){
    var linkYahoo = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+ville+"') and u='c'&format=json"
    $.getJSON(linkYahoo, function(data){
      console.log(data.query);
      var chemin = data.query.results.channel.item.condition;
      var cheminForecast = data.query.results.channel.item.forecast;
      var temp = chemin.temp+"°";
      var text = chemin.text;
      var ville = data.query.results.channel.location.city;
      var pays = data.query.results.channel.location.country;
      var code = chemin.code;
      var date = chemin.date;
      var icone = "http://l.yimg.com/a/i/us/we/52/"+code+".gif";
      console.log($(".jour img"))
      $(".jour > #icon").attr("class", "wi wi-yahoo-"+code);
      $("#date").append(date);
      $("#text").append(text);
      $("#ville").append(ville+", "+pays);
      $("#temp").append(temp);
      console.log(temp);

      for(i=1; i<6; i++){
        var previsions = document.createElement("li");
        var jour = cheminForecast[i].day;
        var tempMax = cheminForecast[i].high+"°";
        var tempMin = cheminForecast[i].low+"°";
        var dateJour = cheminForecast[i].date;
        var codeJour = cheminForecast[i].code;
        var iconeJour = "http://l.yimg.com/a/i/us/we/52/"+codeJour+".gif";

        var pJour = document.createElement("p");
        var pMax = document.createElement("p");
        var pMin = document.createElement("p");
        var pDate = document.createElement("p");
        var imgJour = document.createElement("i")

        var jourNode = document.createTextNode(jour);
        var tempMaxNode = document.createTextNode(tempMax);
        var tempMinNode = document.createTextNode(tempMin);
        var dateNode = document.createTextNode(dateJour);

        pJour.appendChild(jourNode);
        pMax.appendChild(tempMaxNode);
        pMin.appendChild(tempMinNode);
        pDate.appendChild(dateNode);
        imgJour.setAttribute("class", "wi wi-yahoo-"+codeJour);

        previsions.appendChild(pJour);
        previsions.appendChild(pDate);
        previsions.appendChild(pMin);
        previsions.appendChild(pMax);
        previsions.appendChild(imgJour);

        $("ul").append(previsions)

      }

      if (start) {

      weatherLoaded();

      loadingPercent(70, 100);
      loadingText(1);

      }

    })

  }



  function emptyWeather(){
	  $("#date").empty();
      $("#text").empty();
      $("#ville").empty();
      $("#temp").empty();
	  $("ul").empty();
  }

  $("input").change( function() {
	  ville = $(this).val();
	  emptyWeather();
	  townWeather();
  })

  $("#open").click(function(){
    $(this).hide()
    $("#close").show()
    $(".search input").show();
    $(".search input").focus();
    TweenLite.to(".search input", 1, {width: "80%"})
  })

  $("#close").click(function(){
    $(this).hide()
    $("#open").show()
    TweenLite.to(".search input", 1, {width: "0px"})
    setTimeout(function(){
      $(".search input").hide();
      $(".search input").val('');
    }, 1000)
  })


});
