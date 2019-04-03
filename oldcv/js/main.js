loaded = false;
$(window).on("load", function(){
  loaded = true;
})


setTimeout(function(){
  if (loaded) {
    TweenMax.to("#loader", 1, {x: "200%", skewX: "45deg", ease: Power2.easeIn});
    TweenMax.from("#diagonal", 1.5, {y: "100vh"});
    TweenMax.from("#accueil img", 1.5, {x: "-20%"});
    TweenMax.from("#accueil .desc", 1.5, {x: "20%"});
  }
  else {
    $(window).on('load', function(){
      TweenMax.to("#loader", 2, {x: "200%", skewX: "45deg", ease: Power2.easeIn});
      TweenMax.from("#diagonal", 1.5, {y: "100vh"});
      TweenMax.from("#accueil img", 1.5, {x: "-20%"});
      TweenMax.from("#accueil .desc", 1.5, {x: "20%"});
    })
  }
}, 2000)


$(document).ready(function () {

  TweenMax.staggerTo(".point", 0.5, {opacity: "1"}, 0.5)

  $('body').on("mousewheel", function () {
  event.preventDefault();

  var wheelDelta = event.wheelDelta;

  var currentScrollPosition = window.pageYOffset;
  window.scrollTo(0, currentScrollPosition - wheelDelta);
});


  //Parallax landing


  // slidetoggle sur formations

  $("#form .grid").click(function () {
    $(this).children().children("p").slideToggle();
  });


  // Initialisation d'un controleur ScrollMagic

  var controller = new ScrollMagic.Controller();

  //Anim menu

  new ScrollMagic.Scene({
    triggerHook: 1,
    triggerElement: "#contenu",
    duration: "90%"
  })
    .setTween("#menu",0.4, {fontSize: "40px", letterSpacing:"0px", height:"50px", ease: Power2.easeIn})
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerHook: 0.3,
    triggerElement: "#contenu"
  })
    .setClassToggle("#logo", "logo")
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerHook: 0.3,
    triggerElement: "#contenu"
  })
    .setTween("#logo", 0.2, {marginRight: "-100px"})
    .addTo(controller);

    TweenMax.set("#slide-menu", {x: "200%", opacity:1}),

    $(".burger svg").click(function(){
      TweenMax.to("#slide-menu", 1, {x: "0%", ease: Power2.easeOut})
    });

    $("#close-menu").click(function(){
      TweenMax.to("#slide-menu", 1, {x: "200%"});
    });


    // Anim click menu

    $("#slide-menu a").click(function(e){
      e.preventDefault();
      lien = e.target.parentElement.getAttribute("href");
      // lien = '"'+lien+'"'
      TweenMax.to("#slide-menu", 1, {x: "200%", opacity:1})
      TweenMax.to(window, 1, {scrollTo:lien});
    });

    // Anim section présentation

  TweenMax.set("#pres h1", {opacity:0})

  new ScrollMagic.Scene({
    triggerElement: "#pres h1",
    triggerHook: 0.7,
    reverse: false
  })
    .setTween("#pres h1", 0.5, {left:"0px", opacity:"1"})
    .addTo(controller);

  TweenMax.set("#pres p", {opacity:0})

  new ScrollMagic.Scene({
    triggerElement: "#pres p",
    triggerHook: 0.7,
    reverse: false
  })
    .setTween("#pres p", 0.5, {left:"0px", opacity:"1"})
    .addTo(controller);

    // Création d'une timaline pour avoir des animations en chaine

    TweenMax.set(".form", {position:"relative", opacity:0, left: -20})

    var tween = new TweenMax.staggerFromTo(".form", 0.5, {opacity:0, left:"-20"}, {opacity:1, left: 0}, 0.2)

  new ScrollMagic.Scene({
    triggerElement: "#form",
    triggerHook: 0.6,
    reverse: false,
  })
    .setTween(tween)
    .tweenChanges(true)
    .addTo(controller);

    // Cacher la page d'accueil

    new ScrollMagic.Scene({
      triggerElement: "#contenu",
      triggerHook: 0,
      duration: '1'
    })
      .setTween("#accueil", {opacity: '0'})
      .addTo(controller);


      // Anim page compétences

  var comp = new TimelineMax();
  comp.from("#comp", 0.5, {scaleX:0, transformOrigin:"left", ease: Power2.easeOut})
      .from("#comp span", 0.5, {opacity:0});

  new ScrollMagic.Scene({
    triggerElement: "#comp",
    triggerHook: '0.9'
  })
  .setTween(comp)
  .addTo(controller);

  new ScrollMagic.Scene({
      triggerElement: '#competences',
      duration: '800',
      triggerHook: "0.3"
    })
    .setTween("#bgblur", {opacity:"1"})
    .tweenChanges(true)
    .addTo(controller);

    //text shadow
    //
    // var ombre = "1px 1px #001388,";
    //
    // for(var i=2; i<90; i++){
    //   ombre += i+"px "+i+"px #001388,"
    // }
    //
    // ombre += " 50px 50px #001388"
    // $('.lang').css("text-shadow", ombre)
    // $('#comp').css("text-shadow", ombre)


    // Partie projets

var proj = new TimelineMax();
proj.to("#bgblur img", 2, {opacity: 0})
    .from("#projets h1", 1, {opacity:0, x: "-150px"}, "-=2");

    new ScrollMagic.Scene({
      triggerElement: '#projets',
      triggerHook: '1',
      duration: "100%"
    })
    .setTween(proj)
    .tweenChanges(true)
    .addTo(controller);

    //Parallax projets

    var prj1 = document.getElementById('scene2');
    var parallaxInstance = new Parallax(prj1, {
      relativeInput: true
    });

    var prj2 = document.getElementById('scene3');
    var parallaxInstance = new Parallax(prj2, {
      relativeInput: true
    });

    var prj3 = document.getElementById('scene4');
    var parallaxInstance = new Parallax(prj3, {
      relativeInput: true
    });

    var prj4 = document.getElementById('scene5');
    var parallaxInstance = new Parallax(prj4, {
      relativeInput: true
    });


    // galerie

    var gal = TweenMax.from("#galerie h1", 1, {opacity:0, x:"-100px"});

    new ScrollMagic.Scene({
      triggerElement: "#galerie",
      triggerHook: "1"
    })
    .setTween(gal)
    .addTo(controller);

    var galerie = true

    $(".galerie_boutons").click(function(e){
      if (e.target.parentElement.className == "web" || e.target.parentElement.className == "graphisme" && galerie == true) {
        galerie = false;
        bouton = e.target.parentElement
        $(bouton).css("cursor", "auto")
        $(bouton.children[0]).hide();
        TweenMax.to($(bouton.children[1]), 0.5, {color: "black", position:"static", width:"100%", textAlign:"left", paddingLeft:'20%', paddingBottom:'50px'});
        $(bouton).siblings().hide();
        $(bouton.children[2]).css("display", "flex");
        $(bouton).css({"width": "100%", "justify-content": "flex-start", "flex-direction": "column"});
        TweenMax.staggerFrom(".galerie_graph div", 1, {x:window.outerWidth/2, opacity:0}, 0.1)
        TweenMax.staggerFrom(".galerie_web div", 1, {x:window.outerWidth/2, opacity:0}, 0.1)
        var fermer = document.createElement("button");
        fermer.setAttribute("class", "fermer");
        var croix = document.createElement("i");
        croix.setAttribute("class", "fa fa-window-close" );
        fermer.appendChild(croix);
        bouton.appendChild(fermer);
        TweenMax.to(window, 0.2, {scrollTo:"#galerie"});
      }
      $(".fermer").click(function(){
        galerie = true;
        $(bouton).css("cursor", "pointer");
        $(bouton.children[0]).show();
        $(bouton.children[1]).removeAttr("style");
        $(bouton).siblings().show();
        $(bouton.children[2]).removeAttr("style");
        $(bouton).removeAttr("style");
        $(".fermer").remove();
      })

    })


    // Partie Contact

    var ctc = document.getElementById('scene6');
    var parallaxInstance = new Parallax(ctc, {
      relativeInput: true
    });

    $(".galerie_web").Chocolat();
    $(".galerie_graph").Chocolat();


});
