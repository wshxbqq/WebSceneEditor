/// <reference path="../../../Libs/underscore-min.js" />
/// <reference path="../../../Libs/mustache.js" />
/// <reference path="../../../Libs/jquery-1.7.2.min.js" />


define(['../../Common', '../../Config'], function (common,cfg) {
    var DragIco = function () {

    }
    DragIco.prototype.init = function (obj) {
        _.extend(this, obj);
        this.cfg = obj;
        this.id ="item_r_"+Math.random();
        this.initDom();
        var reg=/\w+?.png/;
        if (this.img.match(reg)) {
            this.coco2d_img = this.img.match(reg)[0];
        }
       
    };
    DragIco.prototype.initDom = function () {
        var _this=this;
        this.HTML =this.dom?this.dom:Mustache.render(DragIco.prototype.Template, this)
        this.dom = common.parseDom(this.HTML)[0];
        this.dom.m_parent = this;
         var r = [];
         if (this.rotate !== undefined) {
            r.push("rotate(" + this.rotate + "deg)  ");
        }

        if (this.scaleX !== undefined) {
           r.push("scaleX(" + this.scaleX + ")  ");
        }
        if (this.scaleY !== undefined) {
            r.push("scaleY(" + this.scaleY + ")  ");
        }
        if (this.skewX !== undefined) {
            r.push("skewX(" + this.skewX + "deg)  ");
        }
        if (this.skewY !== undefined) {
           r.push("skewY(" + this.skewY + "deg)  ");
        }
        var css = r.join('');
        

        $(this.dom).css({
            "-webkit-transform": css,
            "-moz-transform": css,
            "-o-transform": css,
            "-ms-transform": css
        });

        this.dom.addEventListener("contextmenu", function (e) { e.preventDefault(); console.log(e) });
     
        $(this.dom).bind("mousedown", function (e) {
            if (e.which == 1) {
                _this.adjusting = true;
                window.CURRENT_MOUSE_X = e.clientX;
                window.CURRENT_MOUSE_Y = e.clientY;
                _this.drag();
                
            }  
            if (e.which == 3) {
                window.CURRENT_CFGING_ITEM = _this;
                common.showCfgPanel();
               
            }
        });
   
    };
    DragIco.prototype.adjust = function (x,y) {
        var differ_x = x - window.CURRENT_MOUSE_X;
        var differ_y = y - window.CURRENT_MOUSE_Y;

        this.bottom += -differ_y;
        this.left += differ_x;
        this.top += differ_y;

        this.cocos2dX += differ_x;
        this.cocos2dY += -differ_y;
        $(this.dom).css({ "left": this.left + "px", "bottom": this.bottom + "px" });

        window.CURRENT_MOUSE_X = x;
        window.CURRENT_MOUSE_Y = y;

    }
    DragIco.prototype.drag = function (e) {
        var _this = this;
        window.CURRENT_ITEM = _this;
        $(_this.dom).addClass("box-shadow-2");

         
    }
    DragIco.prototype.drop = function () {
        var _this = this;
        window.CURRENT_ITEM = 0;
        $(_this.dom).removeClass("box-shadow-2");
        _this.adjusting = false;
        window.CURRENT_MOUSE_X = undefined;
        window.CURRENT_MOUSE_Y = undefined;
    }

    DragIco.prototype.setPosition = function (x, y) { //
        this.adjustPosition = { x: this.width / 2, y: this.height / 2 };
        window.stage_container = $("#left-item-container");
        var top = window.stage_container.scrollTop();
        var stageHeight = cfg.environment.height;




        var position = { x: x, y: y };
       
 


        this.convetPosition(position);
        $(this.dom).css({ "left": this.left + "px", "bottom": this.bottom + "px" });
    };

    DragIco.prototype.setPositionABS = function (x, y) { // cocos 绝对位置 定位  只用于  water
        var position = { x: x, y: y };
        this.adjustPosition = { x: this.width / 2, y: this.height / 2 };
 
        var scroll_top = window.stage_container.scrollTop();
        var stageHeight = cfg.environment.height;



        this.bottom =  position.y - this.adjustPosition.y;
        this.left = position.x - this.adjustPosition.x;
        this.top = stageHeight - this.bottom - this.height;

        this.cocos2dX = this.width / 2 + this.left;
        this.cocos2dY = this.height / 2 + this.bottom;


        $(this.dom).css({ "left": this.left + "px", "bottom": this.bottom + "px" });



    } 

    DragIco.prototype.convetPosition = function (position) {

        var scroll_top = window.stage_container.scrollTop();
        var stageHeight = cfg.environment.height;

        this.bottom = stageHeight - scroll_top - position.y - this.adjustPosition.y;
        this.left = position.x - this.adjustPosition.x;
        this.top = stageHeight - this.bottom - this.height;
        
        this.cocos2dX = this.width / 2 + this.left;
        this.cocos2dY = this.height / 2 + this.bottom;

 
    };
    
    DragIco.prototype.remove = function () {
        window.ITEM_ARRAY = _.without(window.ITEM_ARRAY, this);
        $(this.dom).remove();
        delete (window.CURRENT_ITEM);

    }

    DragIco.prototype.Template = [
       '<div style="position:absolute;height:{{height}}px;width:{{width}}px;background:url({{img}}); left:0px;bottom:0px" id="{{id}}"></div>'

    ].join('');


    window.getDragIcoWithSingleCFG_imgSrc = function (imgSrc) {

        var a = _.filter(CFG.icos, function (item) {

            return item.img.indexOf("/" + imgSrc) > -1
        });
        var a = a[0];
        if (a) {
            var dragIco = new DragIco();
            dragIco.init(a);
            return dragIco;
        } else {
            console.log("no type of this img");
        }


    }

    return DragIco;

});