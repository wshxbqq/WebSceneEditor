/// <reference path="../../../Libs/underscore-min.js" />
/// <reference path="../../../Libs/mustache.js" />
/// <reference path="../../../Libs/jquery-1.7.2.min.js" />


define(['../../Common', './drag-ico'], function(common, DragIco) {
    var Ico = function() {

    }
    Ico.prototype.init = function(obj) {
        _.extend(this, obj);
        this.cfg = obj;
        this.initDom();

    };
    Ico.prototype.initDom = function() {
        var _this = this;
        this.HTML = Mustache.render(Ico.prototype.Template, this);
        this.dom = common.parseDom(this.HTML)[0];
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


        $(this.dom).find("div[ico_img_bg_div]").css({
            "-webkit-transform": css,
            "-moz-transform": css,
            "-o-transform": css,
            "-ms-transform": css
        });
        $(this.dom).bind("mousedown", function(e) {
            if (e.which == 1) {
                var dIco = _this.createDragIco();
                dIco.drag();
                $("#main-stage-editor").append(dIco.dom);
            };



        });

    };











    Ico.prototype.createDragIco = function() {
        var dragIco = new DragIco();
        dragIco.init(this.cfg);
        return dragIco;
    };


    Ico.prototype.Template = [
        '<li class="span5 clearfix pull-left">                                                                   ',
        '  <div class="thumbnail clearfix">                                                            ',
        '    <div ico_img_bg_div class="pull-left span2 clearfix ico-img" ><div class="inner-mask"></div><img src="{{&img}}"></div>  ',
        '    <div class="caption pull-left" >                                                          ',
        '      <h4>                                                                                    ',
        '      <a>                                                                                     ',
        '      <small>快捷键:</small>                                                                  ',
        '      <a class="btn btn-primary">{{hotKey}}</a>                                                        ',
        '      </a>                                                                                    ',
        '      </h4>                                                                                   ',
        '      <small><b>名称: </b>{{name}}</small>                                                    ',
        '    </div>                                                                                    ',
        '  </div>                                                                                      ',
        '</li>                                                                                         '
    ].join('');


    return Ico;

});