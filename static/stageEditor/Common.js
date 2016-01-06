define(['./Config'], function(CFG) {
    var common = {};
    window.COMMON=common;

    common.resetWorkZone = function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        $("#left-item-container").css({
            width: CFG.environment.width + 70 + "px",
            "height": height + "px"
        });
        $("#main-stage-editor").css({
            width: CFG.environment.width + "px",
            "height": CFG.environment.height + "px"
        })
        $("#right-item-list-container").css({
            "width": (width - CFG.environment.width - 70) + "px",
            "height": height + "px"
        });
    }

    common.parseDom = function(arg) {
        var objE = document.createElement("div");
        objE.innerHTML = arg;
        return objE.childNodes;
    };




    $("#save_btn").on("click", function() {
        $('#save_scence_modal').modal({
            backdrop: true,
            keyboard: true,
            show: true
        });
    });



    window.stage_container = $("#left-item-container");

    $("#save_scence_btn").on("click", function() {
        if (window.ajaxing) {
            return;
        }
        window.ajaxing = true;
        var jsonData = common.getJsonData();
        var scence_title = $("#scence_name").val();
        scence_title = scence_title ? scence_title : "默认场景";
        if (window.STAGEID == null) {
            $.post("/SaveStageScence/" + window.DIFFCULT_ID + "/", {
                "jsonData": jsonData,
                "scence_name": scence_title
            }, function(data) {
                window.STAGEID = data;
                window.ajaxing = false;
                alert("保存成功！");
                location.href = "/ModiflyStageScence/" + window.STAGEID + "/"

            });
        } else {
            $.post("/UpdateStageScence/" + window.STAGEID + "/", {
                "jsonData": jsonData,
                "scence_name": scence_title,
                "": ""
            }, function(data) {
                window.STAGEID = data;
                window.ajaxing = false;
                alert("更新成功！");

            });
        }

    });



    $(document).bind("mousemove", function(e) {
        window.CURRENT_MOUSE_POINTER_POSITION = {
            x: e.clientX,
            y: e.clientY
        };

        var position = {
            x: e.clientX,
            y: e.clientY
        };



        if (window.CURRENT_ITEM) {
            if (window.CURRENT_ITEM.adjusting) {
                window.CURRENT_ITEM.adjust(position.x, position.y);
            } else {
                if ($("#grid_switch_btn")[0].checked) {
                    position = common.parseToGrid(position);
                }
                window.CURRENT_ITEM.setPosition(position.x, position.y);
            }
        }
        //clientX


    });
    $(document).bind("mouseup", function(e) {

        if (!window.IS_MOUSE_IN) {
            if (window.CURRENT_ITEM) {
                window.CURRENT_ITEM.remove();
                return;
            }

        }

        if (window.CURRENT_ITEM) {
            var even = _.find(window.ITEM_ARRAY, function(dIco) {
                return window.CURRENT_ITEM.id == dIco.id;
            });
            if (even) {

            } else {
                window.ITEM_ARRAY.push(window.CURRENT_ITEM);
            }

            window.CURRENT_ITEM.drop();
        }



    });
    common.showCfgPanel = function() {
        $("#config_current_item_panel input").val("");
        $("#config_current_item_panel").show(100);

        if (window.CURRENT_CFGING_ITEM.rotate !== undefined) {
            $("#rotate_c").val(window.CURRENT_CFGING_ITEM.rotate)
        }

        if (window.CURRENT_CFGING_ITEM.scaleX !== undefined) {
            $("#ScaleX_c").val(window.CURRENT_CFGING_ITEM.scaleX)
        }
        if (window.CURRENT_CFGING_ITEM.scaleY !== undefined) {
            $("#ScaleY_c").val(window.CURRENT_CFGING_ITEM.scaleY)
        }
        if (window.CURRENT_CFGING_ITEM.skewX !== undefined) {
            $("#skewX_c").val(window.CURRENT_CFGING_ITEM.skewX)
        }
        if (window.CURRENT_CFGING_ITEM.skewY !== undefined) {
            $("#skewY_c").val(window.CURRENT_CFGING_ITEM.skewY)
        }
    };


    common.updateCurrentDom = function() {

        var r = [];




        r.push("rotate(" + (window.CURRENT_ITEM.rotate || 0) + "deg)  ");

        r.push("scaleX(" + (window.CURRENT_ITEM.scaleX || 1) + ")  ");

        r.push("scaleY(" + (window.CURRENT_ITEM.scaleY || 1) + ")  ");

        r.push("skewX(" + (window.CURRENT_ITEM.skewX || 0) + ")  ");

        r.push("skewY(" + (window.CURRENT_ITEM.skewY || 0) + ")  ");





        var css = r.join('');


        window.CURRENT_ITEM.dom.style["MozTransform"] = css;
        window.CURRENT_ITEM.dom.style["webkitTransform"] = css;
        window.CURRENT_ITEM.dom.style["msTransition"] = css;





    };



    common.initCfgItem = function() {
        var r = [];


        if ($("#rotate_c").val() != "") {
            window.CURRENT_CFGING_ITEM.rotate = parseFloat($("#rotate_c").val());
            r.push("rotate(" + $("#rotate_c").val() + "deg)  ");
        }


        if ($("#ScaleX_c").val() != "") {
            window.CURRENT_CFGING_ITEM.scaleX = parseFloat($("#ScaleX_c").val());
            r.push("scaleX(" + $("#ScaleX_c").val() + ")  ");
        }


        if ($("#ScaleY_c").val() != "") {
            window.CURRENT_CFGING_ITEM.scaleY = parseFloat($("#ScaleY_c").val());
            r.push("scaleY(" + $("#ScaleY_c").val() + ")  ");
        }

        if ($("#skewX_c").val() != "") {
            window.CURRENT_CFGING_ITEM.skewX = parseFloat($("#skewX_c").val());
            r.push("skewX(" + $("#skewX_c").val() + "deg)  ");
        }

        if ($("#skewY_c").val() != "") {
            window.CURRENT_CFGING_ITEM.skewY = parseFloat($("#skewY_c").val());
            r.push("skewY(" + $("#skewY_c").val() + "deg)  ");
        }
        var css = r.join('');
        console.log(css);

        $(window.CURRENT_CFGING_ITEM.dom).css({
            "-webkit-transform": css,
            "-moz-transform": css,
            "-o-transform": css,
            "-ms-transform": css
        });

    }

    $("#transform_ok_btn").on("click", function() {
        common.initCfgItem();
        $("#config_current_item_panel").hide(100);
        delete(window.CURRENT_CFGING_ITEM);

    });

    $("#config_current_item_panel input").bind("keyup", function() {
        common.initCfgItem();
    });



    common.parseToGrid = function(position) {
        var modX = position.x % window.CFG.GridSize;
        var modY = position.y % window.CFG.GridSize;
        position.x -= modX;
        position.y -= modY;
        return position;
    }





    $("#transform_close_btn").on("click", function() {
        $("#config_current_item_panel").hide(100);
        delete(CURRENT_CFGING_ITEM);
    })

    common.getJsonData = function() {
        var array = [];
        _.each(window.ITEM_ARRAY, function(i) {
            var obj = {};
            _.extend(obj, i);
            obj.dom = obj.dom.outerHTML;
            array.push(obj);
        });
        return JSON.stringify(array);

    }

    //simple 
    common.getJsonData1 = function() {
        var array = [];
        _.each(window.ITEM_ARRAY, function(i) {
            var obj = {};
            obj.img=i.name.split('.')[0];
            obj.x=window.parseInt(i.left);
            obj.y=window.parseInt(i.bottom)+window.parseInt(i.height);
            array.push(obj);
        });
        return JSON.stringify(array);

    }

      common.getJsonData2 = function() {
        var array = [];
        _.each(window.ITEM_ARRAY, function(i) {
            var obj = {};
            var img=i.name.split('.')[0];
            obj.x=window.parseInt(i.left)+window.parseInt(i.width)/2;
            obj.y=window.parseInt(i.bottom)+window.parseInt(i.height)/2;
            obj.img=i.name;
            if(img=="gan"){
                obj.type= 1;
                obj.gap=i.rotate||300;
            }
            if(img.indexOf("qiu")>-1){
                obj.type= 2;
                obj.direction=i.scaleX||1;
                obj.speed_bet=i.rotate||1.5;
            }

            if(img=="kuwu"){
                obj.type= 0;
            }

            if(img=="sha"){
                obj.type= 3;
                obj.e_type=0;

            }

             
            array.push(obj);
        });
        return JSON.stringify(array);

    }


    $("#cfg_btn_1").bind("click", function() {
        $("#config_modal").modal('show');



    });

    $("#change_size_btn_ok").bind("click", function() {

        $("#config_modal").modal('hide');
        var width = $("#scence_width_txt").val();
        var height = $("#scence_height_txt").val();

        if (width) {
            window.CFG.environment.width = parseInt(width);

        }
        if (height) {
            window.CFG.environment.height = parseInt(height);

        }


        common.resetWorkZone();
    });


    window.addEventListener("resize", function(e) {
        common.resetWorkZone();

    });

    window.IS_MOUSE_IN = false;
    $("#main-stage-editor").on("mouseover", function(e) {
        window.IS_MOUSE_IN = true;
    })

    $("#main-stage-editor").on("mouseout", function(e) {
        window.IS_MOUSE_IN = false;
    })
    return common;
});