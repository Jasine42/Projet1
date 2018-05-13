/*
############################################################################
##                                                                        ##
##        Copyright (C) 2012  AnsuzPeorth (ansuzpeorth@gmail.com)         ##
##                                                                        ##
## This program is free software: you can redistribute it and/or modify   ##
## it under the terms of the GNU General Public License as published by   ##
## the Free Software Foundation, either version 3 of the License, or      ##
## (at your option) any later version.                                    ##
##                                                                        ##
## This program is distributed in the hope that it will be useful,        ##
## but WITHOUT ANY WARRANTY; without even the implied warranty of         ##
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the          ##
## GNU General Public License for more details.                           ##
##                                                                        ##
## You should have received a copy of the GNU General Public License      ##
## along with this program.  If not, see <http://www.gnu.org/licenses/>.  ##
##                                                                        ##
############################################################################

version 3: amélioration proposé par iguypouf du site http://www.javascriptfr.com
           passage en argument de la liste d'images
           utilisation de plus de css via fichier.
           100 % pour la taille plutot que des px (webkit n'aime pas trop !)

Merci également à kazma du même site pour ses précisions.
*/

function ClassSlideshow(liste) {
    // -------------------------------------------------------------------------
    // ---------------------- utility ------------------------------------------
    // -------------------------------------------------------------------------
    this.returnType = function() {
        if(this.currentElement.textPosition == 'left') {
            return 'right';
        } else{
            return 'left';
        }
    }
    this.hideDivText = function(div, type) {
        // @type str: left,right or true if opacity
        // @div  obj: the current div text
        //#~FIXME if type == true ou 'opacity' ne fonctionne pas en mode manuel !!!
        if(div.className == 'content-text') {
            div.style.opacity = 0.0;
        }else  {
            eval('div.style.'+type+' = "2000px"');
        }
        if(this.flagSliding) {
            this.manageSlides();
        }
    }
    this.clearAllTimeout = function() {
        // @brief pour la navigation manuel et les excités qui se croient dans un clicodrome :)
        window.clearTimeout(this.animateTimeout);
        window.clearTimeout(this.animeTextTimeout);
        window.clearTimeout(this.textAnimationDelay);
    }
    function cloneObject(source) {
        // http://www.hardcode.nl/category_1/article_414.htm
        for (i in source) {
            if (typeof source[i] == 'source') {
                this[i] = new cloneObject(source[i]);
            }
            else{
                this[i] = source[i];
            }
        }
    }
    this.returnSlideshowImagesList = function(liste) {
        // @brief retourne une copie de la listeImages passée en argument
        var list = new Array();
        for(l in liste) {
            var clone = new cloneObject(liste[l]);
            console.log(clone)
            list.push(clone);
        }
        return list;
    }
    // -------------------------------------------------------------------------
    // ---------------------- class variable -----------------------------------
    // -------------------------------------------------------------------------
    this.currentSlide = 0;
    this.flagSliding  = true;
    this.slideshowImages = this.returnSlideshowImagesList(liste);
    var _self = this;
    // -------------------------------------------------------------------------
    // ---------------------- liste management ---------------------------------
    // -------------------------------------------------------------------------
    this.refreshOrderSlideList = function() {
        // @brief enleve le premier div de la liste et ajoute un nouveau à la fin
        this.orderSlideListe[0].div.style.zIndex = -2;
        this.orderSlideListe.shift();
        this.currentSlide += 1;
        if(this.currentSlide == this.slideshowImages.length) {this.currentSlide=0 };
        this.refreshOrderTool();
    }
    this.refreshOrderSlideListInvert = function() {
        // @brief tri de la liste inversée
        this.orderSlideListe[0] = this.orderSlideListe[1];
        this.orderSlideListe[1] = this.orderSlideListe[2];
        this.currentSlide -= 1;
        if(this.currentSlide == -1) {
            this.currentSlide = this.slideshowImages.length-1;
        }
        this.refreshOrderTool();
    }
    this.refreshOrderTool= function() {
        this.currentElement = this.slideshowImages[this.currentSlide];
        this.orderSlideListe[2] = this.currentElement;
        this.orderSlideListe[1].div.style.zIndex = 1;
        this.orderSlideListe[0].div.style.zIndex = 0;
    }
    
    // -------------------------------------------------------------------------
    // ----------------------- sliding management ------------------------------
    // ----------------------- loop iteration beginning ------------------------
    // -------------------------------------------------------------------------
    this.manageSlides = function(sens) {
        // @sens bool: sort direction
        if(sens){
            this.refreshOrderSlideListInvert();
        }else {
            this.refreshOrderSlideList();
        }
        var curDiv      = this.currentElement.div;
        var curDivStyle = curDiv.style;
        //var t = 'this.'+this.currentElement.sliding+'SlidingLauncher'
        //#~FIXME eval(t) do not work !!!'
        try {
            eval('this.'+this.currentElement.sliding+'SlidingLauncher')
            (curDiv, curDivStyle);
        }catch(e){
            curDivStyle.zIndex = 2;
            this.animateSlide(this.currentElement.sliding, curDiv, curDivStyle,
                              this.slideHeight, this.currentElement.animationPas,
                              this.currentElement.animationProgress, false);
        }
    }
    
    // -------------------------------------------------------------------------
    // ---------------------- launch animation ---------------------------------
    // -------------------------------------------------------------------------
    this.opacitySlidingLauncher = function(curDiv, curDivStyle) {
        curDivStyle.opacity = 0.0;
        curDivStyle.zIndex  = 2;
        _self.opacitySlide(0.0, _self.currentElement.animationPas,
                           _self.currentElement.animationProgress, curDiv,
                           curDivStyle, false);
    }
    this.hGrowingSlidingLauncher = function(curDiv, curDivStyle) {
        var defaultHeight  = curDiv.offsetHeight;
        curDivStyle.height = '0px';
        curDivStyle.zIndex = 2;
        _self.growingSlide(0, _self.currentElement.animationPas,
                           _self.currentElement.animationProgress, curDiv,
                           curDivStyle, defaultHeight, _self.hGrowingTool, false);
    }
     this.vGrowingSlidingLauncher = function(curDiv, curDivStyle) {
        var defaultWidth   = curDiv.offsetWidth;
        curDivStyle.width  = '0px';
        curDivStyle.zIndex = 2;
        _self.growingSlide(0, _self.currentElement.animationPas,
                           _self.currentElement.animationProgress, curDiv,
                           curDivStyle, defaultWidth, _self.vGrowingTool, false);
    }
    
    // -------------------------------------------------------------------------
    // ---------------------- text animation -----------------------------------
    // -------------------------------------------------------------------------
    this.launchTextAnimation = function() {
        var textDelay = this.currentElement.textDelay;
        if(textDelay) {
            var delay = textDelay;
        }else {
            var delay = 0;
        }
        this.textAnimationDelay = window.setTimeout(function() {
                    _self.animationTextStart();
                },delay);
    }
    this.animationTextStart = function() {
        var type              = this.returnType();
        var divText           = this.currentElement.divText;
        var divTextStyle      = divText.style;
        divTextStyle.top      = this.currentElement.textTop+'px';
        divTextStyle.cssFloat = this.currentElement.textPosition;
        if(this.currentElement.slidingText == 'opacity'){
            divTextStyle.opacity = 0.0;
            this.opacitySlide(0.0, this.currentElement.animationTextPas,
                              this.currentElement.animationTextProgress,
                              divText, divTextStyle, true);
        }else {
            eval('divTextStyle.'+type+' = "'+divText.offsetWidth+'px"');
            this.animateSlide(type, divText, divTextStyle, divText.offsetWidth,
                              this.currentElement.animationTextPas,
                              this.currentElement.animationTextProgress, true);
        }
    }
    
    // -------------------------------------------------------------------------
    // ---------------------- animations ---------------------------------------
    // -------------------------------------------------------------------------
    
    // ----------------------- growing animation -------------------------------
    this.hGrowingTool = function(n, size, divStyle) {
        var top = (size - n) / 2;
        divStyle.top    = top+'px';
        divStyle.height = n +'px';
        if(n >= size){
            divStyle.top = '0px';
            divStyle.height = size +'px';
            return true;
        }else {
            return false;
        }
    }
    this.vGrowingTool = function(n, size, divStyle) {
        var left = (size - n) / 2;
        divStyle.left  = left+'px';
        divStyle.width = n +'px';
        if(n >= size){
            divStyle.left = '0px';
            divStyle.width = size +'px';
            return true;
        }else {
            return false;
        }
    }
    this.growingSlide = function(n, pas, progress, div, divStyle, size, fonction, flag) {
        // @n        int: current size
        // @size     int: default size
        // @fonction obj: function to call (hGrowingTool or vGrowingTool)
        // @flag    bool: if divText or not (not used, bug with text size height)
        n += pas;
        if(fonction(n, size, divStyle)) {
            /*if(flag) {
                if(this.flagSliding) {
                    this.animeTextTimeout = window.setTimeout(function(){
                        _self.hideDivText(div, true);
                    }, this.slideChangeDelay);
                }
            }else {*/
                this.launchTextAnimation();
            //}
        }else {
            this.animateTimeout = window.setTimeout(function() {
                _self.growingSlide(n, pas, progress, div, divStyle, size, fonction, flag);
            }, progress);
        }
    }
    
    // ----------------------- sliding animation -------------------------------
    this.animateSlide = function(type, div, divStyle, pos, pas, progress, flag) {
        // @type     str: top,bottom,left,right
        // @div      obj: the current div image
        // @divStyle obj: current div style
        // @pos      int: the position in pixel
        // @pas      int: the pas of progress
        // @progress int: the delay
        // @flag    bool: if divText or not
        if(pos <= 0){
            if(flag) {
                if(this.flagSliding) {
                    this.animeTextTimeout = window.setTimeout(function(){
                        _self.hideDivText(div, type);
                    }, this.slideChangeDelay);
                }
            }else {
                eval('divStyle.'+type +' = "0px"');
                this.launchTextAnimation();
            }
        } else {
            eval('divStyle.'+type +' = "'+pos+'px"');
            this.animateTimeout = window.setTimeout(function() {
                _self.animateSlide(type, div, divStyle, pos-pas, pas,
                                   progress, flag);
            },progress);
        }
    }
    // ---------------------- opacity animation --------------------------------
    this.opacitySlide = function(op, pas, progress, div, divStyle, flag) {
        // @op     float: opacity value 0.0 > 1.0
        // @pas      int: le level of progress
        // @div      obj: the current div image
        // @divStyle obj: current div style
        // @progress int: the delay
        // @flag    bool: if divText or not
        op += pas;
        if(op >= 1.1) {
            if(flag) {
                if(this.flagSliding) {
                    this.animeTextTimeout = window.setTimeout(function(){
                        _self.hideDivText(div, true);
                    }, this.slideChangeDelay);
                }
            }else {
                this.launchTextAnimation();
            }
        }else {
            divStyle.opacity = op;
            this.animateTimeout = window.setTimeout(function() {
                    _self.opacitySlide(op, pas, progress, div, divStyle, flag);
                },progress);
        }
    }
    
    // -------------------------------------------------------------------------
    // ---------------------- creation slideshow -------------------------------
    // -------------------------------------------------------------------------
    this.createSlideshow = function() {
        var divContainer      = document.getElementById(this.slideContentDiv);
        var divContainerStyle = divContainer.style;
        divContainerStyle.width    = this.slideWidth+'px';
        divContainerStyle.height   = this.slideHeight+'px';
        divContainerStyle.margin   = 'auto';
        divContainerStyle.overflow = 'hidden';
        divContainerStyle.position = 'relative';
        divContainer.setAttribute('onmouseover', this.name+'.mouseOverCb()');
        divContainer.setAttribute('onmouseout',  this.name+'.mouseOutCb()');
        var regex = /Growing|opacity/
        for(var i in this.slideshowImages) {
            divContainer.appendChild(this.newElementSlideshow(i, regex));
        }
        divContainer.appendChild(this.createPlayer());
        // chargement de la liste de reference des slideimage.(3 necessaires,zIndex)
        this.orderSlideListe = [ this.slideshowImages[this.slideshowImages.length-2],
                                 this.slideshowImages[this.slideshowImages.length-1],
                                 this.slideshowImages[0],
                                ];
        this.currentElement = this.slideshowImages[0];
        this.currentElement.div.style.zIndex = 2;
        this.launchTextAnimation();
    }
    this.newElementSlideshow = function(i, regex) {
        var element   = this.slideshowImages[i];
        var container = document.createElement('div');
        container.className = 'slideshow-img';
        container.style.backgroundImage = 'url("'+element.url+'")';
        var divText = document.createElement('div');
        var divTextStyle = divText.style;
        /*if(element.slidingText.match(regex)) {
            divText.className = 'content-text';
            if(element.sliding == 'opacity') {
                divTextStyle.opacity = 0.0;
            }*/
        if(element.slidingText == 'opacity') {
            divText.className = 'content-text';
            divTextStyle.opacity = 0.0;
        }else {
            divText.className = 'content-text pos-'+element.textPosition;
        }
        if(element.textLeft) {
            divTextStyle.marginLeft = element.textLeft +'px';
        }
        if(element.textRight) {
            divTextStyle.marginRight = element.textRight +'px';
        }
        divText.innerHTML = '<div class="back-trans"></div>'+element.text;
        container.appendChild(divText);
        element.div     = container;
        element.divText = divText;
        return container;
    }
    // -------------------------------------------------------------------------
    // ---------------------- slideshow callbacks ------------------------------
    // -------------------------------------------------------------------------
    this.mouseOverCb = function() {
        this.lecteur.style.top = this.slideHeight - 22 +'px';
    }
    this.mouseOutCb = function() {
        this.lecteur.style.top = this.slideHeight - 2 +'px';
    }
    // -------------------------------------------------------------------------
    // ---------------------- creation player ----------------------------------
    // -------------------------------------------------------------------------
    this.createPlayer = function() {
        this.lecteur = document.createElement('div');
        this.lecteur.className        = 'lecteurSlideShow';
        this.lecteur.style.marginLeft = (this.slideWidth / 2) - 70 +'px';
        this.lecteur.style.top        = this.slideHeight - 2 +'px';
        this.playButton           = document.createElement('div');
        this.playButton.className = 'triangle triangle-play';
        this.playButton.setAttribute('onclick', this.name +'.playerPlayClickedCb(this)');
        this.lecteur.appendChild(this.playButton);
        this.lecteur.appendChild(
            this.newPlayerContainDouble('gauche', 0, 
                                        '.playerPrecedentClickedCb()'));
        this.lecteur.appendChild(
            this.newPlayerContainDouble('droit', 10, 
                                        '.playerSuivantClickedCb()'));
        return this.lecteur;
    }
    this.newPlayerContainDouble = function(pos, left, cb) {
        // @pos  str: left,right
        // @left int: margin left, px
        // @cb   str: callback function name
        var contain_double        = document.createElement('div');
        contain_double.className  = 'container-double';
        contain_double.style.left = left+'px';
        var triangle       = document.createElement('div');
        triangle.className = 'triangle triangle-'+pos;
        contain_double.appendChild(triangle);
        var second_triangle       = document.createElement('div');
        second_triangle.className = 'triangle triangle-'+pos+' second-triangle-'+pos;
        contain_double.appendChild(second_triangle);
        contain_double.setAttribute('onclick', this.name +cb);
        return contain_double
    }
    // -------------------------------------------------------------------------
    // ---------------------- player callbacks ---------------------------------
    // -------------------------------------------------------------------------
    this.playerPlayClickedCb = function(div) {
        // @div obj: the div of play button
        if(this.flagSliding) {
            this.clearAllTimeout();
            this.flagSliding     = false;
            div.style.borderLeft = '12px solid red';
        }else {
            this.flagSliding     = true;
            div.style.borderLeft = '12px solid green';
            this.hideDivText(this.currentElement.divText, this.returnType());
        }
    }
    this.playerSuivantClickedCb = function(flag) {
        // @flag bool: sort direction
        this.clearAllTimeout();
        if(this.flagSliding) {
            this.playerPlayClickedCb(this.playButton);
        }
        this.hideDivText(this.currentElement.divText, this.returnType());
        this.manageSlides(flag);
    }
    this.playerPrecedentClickedCb = function() {
        this.playerSuivantClickedCb(true);
    }
    
}

