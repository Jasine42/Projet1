Slideshow images et textes en pur javascript--------------------------------------------
Url     : http://codes-sources.commentcamarche.net/source/54198-slideshow-images-et-textes-en-pur-javascriptAuteur  : ansuzpeorthDate    : 05/08/2013
Licence :
=========

Ce document intitulé « Slideshow images et textes en pur javascript » issu de CommentCaMarche
(codes-sources.commentcamarche.net) est mis à disposition sous les termes de
la licence Creative Commons. Vous pouvez copier, modifier des copies de cette
source, dans les conditions fixées par la licence, tant que cette note
apparaît clairement.

Description :
=============

Bjr,
<br /> Voulant me frotter de plus pr&ecirc;t &agrave; javascript, j'ai cod
&eacute; un slideshow 'par recouvrement' (z-index).
<br /> On peut choisir la d
irection du recouvrement et l'emplacement du texte.
<br /> La vitesse de d&eacu
te;filement des images et du texte sont r&eacute;glables s&eacute;par&eacute;men
t.
<br /> La d&eacute;mo se trouve sur cette page: <a href='http://ansuzpeorth.
perso.sfr.fr/slideshow.xml' target='_blank'>http://ansuzpeorth.perso.sfr.fr/slid
eshow.xml</a>
<br /><a name='source-exemple'></a><h2> Source / Exemple : </h2>

<br /><pre class='code' data-mode='basic'>
/* CSS (slideshow.css) */

/* 

--------------------------------------------------------------------------------

------------- slideshow CSS --------------------------------------------------
--
----------------------------------------------------------------------------
----

<ul><li>/</li></ul>
.slideshow-img {
    background-color: white;
   
 background-repeat: no-repeat;
    background-position: center;
}
.content-te
xt {
    overflow:hidden;
    position:relative;
    color:black; /* You can 
change */
    text-align:center; /* You can change */
    padding:5px; /* You 
can change */
    margin-left:20px; /* You can change */
    margin-right:20px
; /* You can change */
    z-index:0;
}
.back-trans {
    z-index:-1;
    p
osition:absolute;
    overflow:hidden;
    top:0px;
    bottom:0px;
    left
:0px;
    right:0px;
    background-color:white; /* You can change color &amp;
 opacity */
    filter:alpha(opacity=70);
    opacity:0.7;
}
.pos-left {
  
  right: 9999px;
}
.pos-right {
    left: 9999px;
}

/* 
----------------
----------------------------------------------------------------
------------- 
player CSS -------------------------------------------------------
------------
--------------------------------------------------------------------

<ul><li>
/</li></ul>
.triangle {
    width:0; height:0;
    border:8px solid transpare
nt;
}

.triangle-droit {
    border-left:8px solid #323536;
}
.triangle-ga
uche {
    border-right:8px solid #323536;
}
.triangle-play {
    border-lef
t:12px solid green;
    float:left;
    cursor: pointer;
}
.container-double
 {
    cursor: pointer;
    position:relative;
    float:left;
    z-index:1
1;
}
.second-triangle-droit {
    position:absolute;
    left:8px;
    top:
0px;
}
.second-triangle-gauche {
    position:absolute;
    right:8px;
    
top:0px;
}
.lecteurSlideShow {
    position:relative;
    background-color:w
hite;
    filter:alpha(opacity=70);
    opacity:0.7;
    overflow:auto;
    
padding: 5px 0px 2px 8px;
    width:70px;
    z-index:10;
}

/* END CSS */


/* JAVASCRIPT (slideshow.js) */

/*
######################################
######################################
##                                      
                                  ##
##    Copyright (C) 2012  AnsuzPeorth (ans
uzpeorth AT gmail DOT com)      ##
##                                          
                              ##
## This program is free software: you can redi
stribute it and/or modify   ##
## it under the terms of the GNU General Public 
License as published by   ##
## the Free Software Foundation, either version 3 
of the License, or      ##
## (at your option) any later version.              
                      ##
##                                                    
                    ##
## This program is distributed in the hope that it will 
be useful,        ##
## but WITHOUT ANY WARRANTY; without even the implied warr
anty of         ##
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See
 the          ##
## GNU General Public License for more details.               
            ##
##                                                              
          ##
## You should have received a copy of the GNU General Public Licen
se      ##
## along with this program.  If not, see &lt;<a href='http://www.gnu
.org/licenses/&gt;.' target='_blank'>http://www.gnu.org/licenses/&gt;.</a>  ##

##                                                                        ##
##
##########################################################################

<u
l><li>/</li></ul>

function ClassSlideshow() {
    // -----------------------
--------------------------------------------------
    // ---------------------
- class variable -----------------------------------
    // -------------------
------------------------------------------------------
    this.currentSlide = 
0;
    this.flagSliding = true;
    var _self = this;
    
    // ----------
---------------------------------------------------------------
    // --------
-------------- utility ------------------------------------------
    // ------
-------------------------------------------------------------------
    this.re
turnType = function() {
        if(this.currentElement.textPosition == 'left') 
{
            var type  = 'right';
        } else{
            var type = 'le
ft';
        }
        return type;
    }
    
    // ---------------------
----------------------------------------------------
    // -------------------
--- image animation ----------------------------------
    // -----------------
--------------------------------------------------------
    this.refreshOrderS
lideList = function() {
        // enleve le premier div de la liste et ajoute 
un nouveau à la fin
        this.orderSlideListe[0].div.style.zIndex = -2;
   
     this.orderSlideListe.shift();
        this.currentSlide += 1;
        if(
this.currentSlide == this.slideshowImages.length) {this.currentSlide=0 };
     
   this.currentElement = this.slideshowImages[this.currentSlide];
        this.
orderSlideListe[2] = this.currentElement;
        this.orderSlideListe[1].div.s
tyle.zIndex = 1;
        this.orderSlideListe[0].div.style.zIndex = 0;
    }

    this.refreshOrderSlideListInvert = function() {
        // tri de la liste 
inversée
        this.orderSlideListe[0] = this.orderSlideListe[1];
        th
is.orderSlideListe[1] = this.orderSlideListe[2];
        this.currentSlide -= 1
;
        if(this.currentSlide == -1) {this.currentSlide = this.slideshowImages
.length-1};
        this.currentElement = this.slideshowImages[this.currentSlid
e];
        this.orderSlideListe[2] = this.currentElement;
        this.orderS
lideListe[1].div.style.zIndex = 1;
        this.orderSlideListe[0].div.style.zI
ndex = 0;
    }
    this.manageSlides = function(sens) {
        // @sens boo
l
        if(sens){
            this.refreshOrderSlideListInvert();
        }
else {
            this.refreshOrderSlideList();
        }
        this.curre
ntElement.div.style.zIndex = 2;
        this.animateSlide(this.currentElement.s
liding, this.currentElement.div,
                          this.slideHeight, th
is.currentElement.animationPas,
                          this.currentElement.a
nimationProgress);
    }
    this.animateSlide = function(type, div, pos, pas,
 timing) {
        // @type top,bottom,left,right
        // @div the current 
div image
        // @pos the position in pixel
        // @pas the pas of pro
gress
        // @timing the delay
        if(pos &lt;= 0){
            eval(
'div.style.'+type +' = &quot;0px&quot;');
            this.launchTextAnimation(
);
        } else {
            eval('div.style.'+type +' = &quot;'+pos+'px&qu
ot;');
            this.animateTimeout = window.setTimeout(function() {
      
          _self.animateSlide(type, div, pos-pas, pas, timing);
            },ti
ming);
        }
    }
    
    // -----------------------------------------
--------------------------------
    // ---------------------- texte animation 
----------------------------------
    // -------------------------------------
------------------------------------
    this.launchTextAnimation = function() 
{
        var div_text = this.currentElement.divText;
        var type = this.
returnType();
        div_text.style.cssFloat = this.currentElement.textPositio
n;
        div_text.style.top = this.currentElement.textTop+'px';
        eval
('div_text.style.'+type+' = &quot;'+div_text.offsetWidth+'px&quot;');
        t
his.animateText( div_text, type, div_text.offsetWidth,
                        
  this.currentElement.animationTextPas,
                          this.currentE
lement.animationTextProgress);
    }
    this.animateText = function(div_text,
 type, pos, pas, timing) {
        // @type left,right
        // @div_text th
e current div text
        // @pos the position in pixel
        // @pas the p
as of progress
        // @timing the delay
        if(pos &lt;= 0) {
       
     eval('div_text.style.'+type+' = &quot;0px&quot;');
            if(this.fla
gSliding) {
                this.animeTextTimeout = window.setTimeout(function(
){
                    _self.hideDivText(div_text, type);
                }, t
his.slideChangeDelay);
            }
        }else {
            eval('div_te
xt.style.'+type+' = &quot;'+pos+'px&quot;');
            this.timeOutText = win
dow.setTimeout(function(){
                _self.animateText(div_text, type, po
s-pas, pas, timing);
            }, timing);
        }
    }
    this.hideDi
vText = function(div, type) {
        // @type left,right
        // @div the 
current div text
        eval('div.style.'+type+' = &quot;9999px&quot;');
    
    if(this.flagSliding) {
            this.manageSlides();
        }
    }

    
    // -------------------------------------------------------------------
------
    // ---------------------- creation slideshow -----------------------
--------
    // ---------------------------------------------------------------
----------
    this.createSlideshow = function() {
        var divContainer = 
document.getElementById(this.slideContentDiv);
        divContainer.style.width
 = this.slideWidth+'px';
        divContainer.style.height = this.slideHeight+'
px';
        divContainer.style.margin = 'auto';
        divContainer.style.ov
erflow = 'hidden';
        divContainer.style.position = 'relative';
        d
ivContainer.setAttribute('onmouseover', this.name+'.mouseOverCb()');
        di
vContainer.setAttribute('onmouseout', this.name+'.mouseOutCb()');
        for(v
ar i in this.slideshowImages) {
            var element = this.slideshowImages[
i]
            var container = document.createElement('div');
            cont
ainer.style.width = this.slideWidth+'px';
            container.style.height = 
this.slideHeight+'px';
            container.style.zIndex = -2;
            co
ntainer.style.position = 'absolute';
            container.style.backgroundImag
e = 'url(&quot;'+element.url+'&quot;)';
            container.className = 'slid
eshow-img';
            var div_text = document.createElement('div');
        
    div_text.className = 'content-text pos-'+element.textPosition;
            
div_text.innerHTML = '&lt;div class=&quot;back-trans&quot;&gt;&lt;/div&gt;'+elem
ent.text;
            container.appendChild(div_text);
            divContaine
r.appendChild(container);
            this.slideshowImages[i].div = container;

            this.slideshowImages[i].divText = div_text;
        }
        div
Container.appendChild(this.createPlayer());
        // chargement de la liste d
e reference des slideimage.(3 necessaires,zIndex)
        this.orderSlideListe 
= [ this.slideshowImages[this.slideshowImages.length-2],
                      
           this.slideshowImages[this.slideshowImages.length-1],
               
                  this.slideshowImages[0],
                                ];

        this.currentElement = this.slideshowImages[0];
        this.currentElem
ent.div.style.zIndex = 2;
        this.launchTextAnimation();
    }
    
   
 // -------------------------------------------------------------------------
 
   // ---------------------- slideshow callbacks ------------------------------

    // ------------------------------------------------------------------------
-
    this.mouseOverCb = function() {
        this.lecteur.style.top = this.sl
ideHeight - 22 +'px';
    }
    this.mouseOutCb = function() {
        this.l
ecteur.style.top = this.slideHeight - 2 +'px';
    }
    
    // ------------
-------------------------------------------------------------
    // ----------
------------ creation player ----------------------------------
    // --------
-----------------------------------------------------------------
    this.crea
tePlayer = function() {
        this.lecteur = document.createElement('div');

        this.lecteur.className = 'lecteurSlideShow';
        this.lecteur.style
.marginLeft = (this.slideWidth / 2) - 70 +'px';
        this.lecteur.style.top 
= this.slideHeight - 2 +'px';
        this.playButton = document.createElement(
'div');
        this.playButton.className = 'triangle triangle-play';
        
this.playButton.setAttribute('onclick', this.name +'.playerPlayClickedCb(this)')
;
        this.lecteur.appendChild(this.playButton);
        
        var con
tain_double = document.createElement('div');
        contain_double.className =
 'container-double';
        var triangle = document.createElement('div');
   
     triangle.className = 'triangle triangle-gauche';
        contain_double.ap
pendChild(triangle);
        var second_triangle = document.createElement('div'
);
        second_triangle.className = 'triangle triangle-gauche second-triangl
e-gauche';
        contain_double.appendChild(second_triangle);
        contai
n_double.setAttribute('onclick', this.name +'.playerPrecedentClickedCb()');
   
     this.lecteur.appendChild(contain_double);
        
        var contain_do
uble = document.createElement('div');
        contain_double.className = 'conta
iner-double';
        contain_double.style.left = '10px';
        var triangle
 = document.createElement('div');
        triangle.className = 'triangle triang
le-droit';
        contain_double.appendChild(triangle);
        var second_tr
iangle = document.createElement('div');
        second_triangle.className = 'tr
iangle triangle-droit second-triangle-droit';
        contain_double.appendChil
d(second_triangle);
        contain_double.setAttribute('onclick', this.name +'
.playerSuivantClickedCb()');
        this.lecteur.appendChild(contain_double);

        return this.lecteur;
    }
    
    // -----------------------------
--------------------------------------------
    // ---------------------- play
er callbacks ---------------------------------
    // -------------------------
------------------------------------------------
    this.playerPlayClickedCb =
 function(div) {
        // @div the div of play button
        if(this.flagSl
iding) {
            window.clearTimeout(this.animeTextTimeout);
            w
indow.clearTimeout(this.timeOutText);
            this.flagSliding = false;
  
          div.style.borderLeft = '12px solid red';
        }else {
           
 this.flagSliding = true;
            div.style.borderLeft = '12px solid green'
;
            this.hideDivText(this.currentElement.divText, this.returnType());

        }
    }
    this.playerSuivantClickedCb = function(flag) {
        
// @flag bool sens of sort
        window.clearTimeout(this.timeOutText);
    
    window.clearTimeout(this.animeTextTimeout);
        if(this.flagSliding) {

            this.playerPlayClickedCb(this.playButton);
        }
        this
.hideDivText(this.currentElement.divText, this.returnType());
        this.mana
geSlides(flag);
    }
    this.playerPrecedentClickedCb = function() {
      
  this.playerSuivantClickedCb(true)
    }
    
}

/* END JAVASCRIPT */

/
* HTML (slideshow.html) */

&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD HTML 4.
01//EN&quot; &quot;<a href='http://www.w3.org/TR/html4/strict.dtd' target='_blan
k'>http://www.w3.org/TR/html4/strict.dtd</a>&quot;&gt;
&lt;html&gt;&lt;head&gt;

&lt;meta content=&quot;text/html; charset=UTF-8&quot; http-equiv=&quot;content
-type&quot;&gt;
&lt;script src=&quot;slideshow.js&quot; type=&quot;text/javascr
ipt&quot;&gt;&lt;/script&gt;
&lt;link href=&quot;slideshow.css&quot; rel=&quot;
stylesheet&quot; type=&quot;text/css&quot; /&gt;
&lt;title&gt;Ansuz Slideshow&l
t;/title&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
/* reference pour
 une image
--------------------------------------------------------------------
------------
{ url:'visuel_1.jpg', 
  sliding: 'top/bottom/left/right',
  tex
t: 'Le texte',
  textPosition: 'left/right',
  textTop: '70', =&gt; position d
u texte par le haut en pixel
  animationPas:'10', =&gt; le nombre de pixel à ch
aque itérations, en pixel
  animationProgress:'50', =&gt; itération en ms
  an
imationTextPas:'5', =&gt; le nombre de pixel à chaque itérations, en pixel
  an
imationTextProgress:'5', =&gt; itération en ms
}
-----------------------------
---------------------------------------------------

<ul><li>/</li></ul>

va
r listeImages = [
    { url:'visuel_1.jpg', 
      sliding: 'top',
      text
: 'Visitez nos cotes sauvages',
      textPosition: 'left',
      textTop: '70
',
      animationPas:'10',
      animationProgress:'50',
      animationText
Pas:'5',
      animationTextProgress:'5',
    },
    {
      url:'visuel_2.j
pg',
      sliding:'bottom',
      text:'Nos falaises remarquables',
      te
xtPosition:'left',
      textTop:'20',
      animationPas:'10',
      animati
onProgress:'50',
      animationTextPas:'5',
      animationTextProgress:'5',

    },
    {
      url:'visuel_3.jpg',
      sliding:'top',
      text:'Pro
tégée du grand large',
      textPosition:'right',
      textTop:'100',
     
 animationPas:'10',
      animationProgress:'50',
      animationTextPas:'5',

      animationTextProgress:'5',
    },
    {
      url:'visuel_4.jpg',
   
   sliding:'bottom',
      text:'Notre lagon de mer turquoise',
      textPosi
tion:'left',
      textTop:'100',
      animationPas:'10',
      animationPro
gress:'50',
      animationTextPas:'5',
      animationTextProgress:'5',
    
},
    {
      url:'visuel_5.jpg',
      sliding:'top',
      text:'Sans oub
lier nos plages de sables fin&lt;br&gt;et nos filles dénudées !',
      textPos
ition:'right',
      textTop:'20',
      animationPas:'10',
      animationPr
ogress:'50',
      animationTextPas:'5',
      animationTextProgress:'5',
   
 },
];

var monSlideshow = new ClassSlideshow();
monSlideshow.slideshowImage
s = listeImages;
monSlideshow.name = 'monSlideshow'; //indiquer nom de la var u
tiliser pour la class
monSlideshow.slideHeight = 150;
monSlideshow.slideWidth 
= 700;
monSlideshow.slideChangeDelay = 3000; // 3 secondes entre chaque image

monSlideshow.slideContentDiv = 'slideshow'; //la div contenant le slideshow

i
f (window.attachEvent) {
    window.attachEvent(&quot;onload&quot;, monSlidesho
w.createSlideshow());
} else {
    window.onload = function() {
        monSl
ideshow.createSlideshow();
    }
}
&lt;/script&gt;
&lt;/head&gt;
&lt;body&g
t;

    &lt;br&gt;
    
    &lt;div id=&quot;slideshow&quot;&gt;
    &lt;/d
iv&gt;
    
&lt;/body&gt;&lt;/html&gt;

/* END HTML */
</pre>
<br /><a nam
e='conclusion'></a><h2> Conclusion : </h2>
<br />Version actuelle: 3 (code ci-
dessus version 1)
<br /> L'archive en PJ contient des images pour pouvoir teste
r de suite ;) 
<br /> Je n'ai pas essay&eacute; sous IE (le player est en CSS, 
et les border transparent sous ie, je sais pas...!), si qql'un peut me donner un
 retour &agrave; ce sujet ? 
<br /> Toutes critiques bienvenues, je ne suis pas
 expert en javascript (ni en autre choses d'ailleurs !)
<br />
<br />Thx,
