$(document).ready(function () {

  // SVG Chargement

  var charge = new TimelineMax({repeat:-1});
  var i = 0;
  $('.cls-1').each( function(){
    TweenMax.to( $(this), 0, {opacity: 1, delay:i*0.1});
    TweenMax.to( $(this), 1.2, { opacity:0, delay:i*0.1 }).
    repeat(-1);
    i++;
  })

  //Animation glitch sur le text

  function flicker() {
    setTimeout(function(){
      TweenMax.to(".glitch", 0.01 , {textShadow: Math.random()*2+2+"px 0px red, "+ (Math.random()*-2-2)+"px 0px cyan", onComplete:flicker});
    }, 50 + Math.random()*200)
  }

  flicker();

  // Effet de bruit

  function noise() {
    setTimeout(function(){
      TweenMax.to(".noise", 0, {left:Math.random()*-300, top:Math.random()*-300, onComplete:noise});
    }, 0)
  }

  noise();

  TweenMax.to('.glitch', 1, {opacity:0.8, ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: true})});

  // Texts en intro

  var textintro = new TimelineMax();

  textintro.to(".msg1", 0.5, {opacity:0.6});
  textintro.to(".msg1", 0.5, {opacity:0, display:"none"}, '+=2');
  textintro.to(".msg2", 0.5, {opacity:0.6, display:"block"});


// Fonction der click après loading


  setTimeout(function(){
    TweenMax.to("svg", 0.5, {opacity:0})
    var click = new TimelineMax({repeat:-1, delay:-0.5});
    click.to(".continue", 0, {opacity: 0.6, delay:1});
    click.to('.continue', 0, {opacity:0, delay:1});
    $(".loading").click(function(){
      $(".loading").css("background", "none");
      $(".loading").css("background-color", "#333333");
      TweenMax.to(".loading", 1, {ease: Power2.easeInOut, top:"50px", right:"100px", width:"30px", height:"30px", borderRadius:"30px"});
      TweenMax.to(".loading", 1, {backgroundColor:'white', ease: Power2.easeIn})
      TweenMax.to(".glitch", 1, {fontSize:0});
      TweenMax.to(".msg", 1, {fontSize:0});
      TweenMax.to(".continue p", 1, {fontSize:0})
      TweenMax.to("svg", 1, {width:0, height:0, onComplete:pouf});
      player.play();
    })
  }, 4000)

  function pouf() {
    TweenMax.to(".loading", 0.5, {opacity:0, display:"none"});
    TweenMax.to("#infos", 0.5, {display:"block"});
  }

  $('.video>div').mouseenter(function(){
    TweenMax.to($(this), 0.5, {transform:'scale(1.1)'})
  })

  $('.video>div').mouseleave(function(){
    TweenMax.to($(this), 0.5, {transform:'scale(1)'})
  })

  var info=true;
  $("#infos").click(function(){
    if (info) {
      $(".informations").css("display", "block");
      $("#infos").text("X");
      $(".conférence").hide();
      var tl = new TimelineMax();
      tl.to(".informations", 0.5, {ease: Power2.easeOut, top:"0px", right:"0px", width:"100%", height:"100vh", borderRadius:"0px", padding:"50px"})
      tl.to(".neutralité", 0.2, {opacity:1});
      tl.to("#active", 0.2, {opacity:1, display:"flex"}, '-=0.2');
      info=false;
    }
    else {
      TweenMax.to(".informations", 0.5, {ease: Power2.easeOut, top:"50px", right:"100px", width:"30px", height:"30px", borderRadius:"30px", padding:0})
      $("#active").css("opacity","0", "display", "none");
      $(".neutralité").css("opacity","0");
      $("#infos").text("?");
      info=true;
    }

  })

  $("body").click(function(e){
    if (e.target == $("#menuButton")[0] || e.target == $(".fa-bars")[0]) {
      TweenMax.to(".playlist", 0.5, {ease: Power2.easeInOut, height:'300px'});
    }
    else if (e.target == $(".haut")[0] || e.target == $(".fa-angle-down")[0]){
      TweenMax.to(".playlist", 0.5, {ease: Power2.easeInOut, height:'0px'})
    }
  })

  	var video_compteur = 1;

  $("body").click(function(e){
    if (e.target == $("#forwardButton")[0] || e.target == $(".fa-step-forward")[0]) {
      	video_compteur++;
      if(video_compteur == 6) {
  			video_compteur = 1;
  		}
      $(".conférence").removeAttr('id')
      $("."+video_compteur).attr('id', 'active')
      var path ='./assets/video/video' + video_compteur + '.mp4';
      player.src(path);
  		player.play();
    }
  })

  $("body").click(function(e){
    if (e.target == $("#backwardButton")[0] || e.target == $(".fa-step-backward")[0]) {
      video_compteur--;
      if(video_compteur == 0) {
  			video_compteur = 5;
  		}
      $(".conférence").removeAttr('id')
      $("."+video_compteur).attr('id', 'active')
      var path ='./assets/video/video' + video_compteur + '.mp4';
      player.src(path);
  		player.play();
    }
  })


  //Videojs


  videojs('my-player', {
    controls: true,
	  autoplay: true,
	  fluid: true,
	  preload: 'auto',
	  controlBar: {
        children: [
            'playToggle',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
		        'muteToggle',
		        'fullscreenToggle',
		        'progressControl'
        ]
    }
	});

	var player = videojs('my-player');

	var video_compteur = 1;

	$(".video").click(function() {
		var dataVid = $(this).attr('data-name');
		var path ='./assets/video/video' + dataVid + '.mp4';
    video_compteur = dataVid;
		player.src(path);
		player.play();
	});

  player.pause();

	/* Nouveau button */
	function addNewButton(data) {

		var myPlayer = data.player,
			controlBar,
			newElement = document.createElement('div'),
			newLink = document.createElement('a');

		newElement.id = data.id;
		newElement.className = 'vjs-control';

		newLink.innerHTML = "<i class='fa " + data.icon + " line-height' aria-hidden='true'></i>";
		newElement.appendChild(newLink);
		controlBar = document.getElementsByClassName('vjs-control-bar')[0];
		insertBeforeNode = document.getElementsByClassName('vjs-fullscreen-control')[0];
		controlBar.insertBefore(newElement, insertBeforeNode);

		return newElement;

	}

	var btna = addNewButton({
		player: player,
		icon: "fa-step-backward",
		id: "backwardButton"
	});


	var btnb = addNewButton({
		player: player,
		icon: "fa-step-forward",
		id: "forwardButton"
	});

	var btnc = addNewButton({
		player: player,
		icon: "fa-bars",
		id: "menuButton"
	});



});
