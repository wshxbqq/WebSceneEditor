define([
    './Config',
    './Common',
    './module/water/RiverBlock'
], function (CFG, common, RiverBlock) {
   
    var res = {};
    res.init = function () {
        document.onkeydown = function (e) {
            console.log(e);


            function preSet() {
                if (window.CURRENT_ITEM.scaleY === undefined) {
                    window.CURRENT_ITEM.scaleY = 1;
                }

                if (window.CURRENT_ITEM.scaleX === undefined) {
                    window.CURRENT_ITEM.scaleX = 1;
                }
                if (window.CURRENT_ITEM.rotate === undefined) {
                    window.CURRENT_ITEM.rotate = 0;
                }
            }

            if (e.keyCode == 46) {
                if (window.CURRENT_ITEM) {
                    window.CURRENT_ITEM.remove();
                }
            }
            if (e.keyCode == 37) {

                preSet();
                window.CURRENT_ITEM.scaleX = -1 * Math.abs(window.CURRENT_ITEM.scaleX);
                common.updateCurrentDom();
                e.preventDefault();
            }

            if (e.keyCode == 39) {
                preSet();
                window.CURRENT_ITEM.scaleX = Math.abs(window.CURRENT_ITEM.scaleX);
                common.updateCurrentDom();
                e.preventDefault();
            }
            if (e.keyCode == 38) {

                preSet();
                window.CURRENT_ITEM.scaleY = Math.abs(window.CURRENT_ITEM.scaleY);
                common.updateCurrentDom();
                e.preventDefault();
            }

            if (e.keyCode == 40) {
                preSet();
                window.CURRENT_ITEM.scaleY = -1 * Math.abs(window.CURRENT_ITEM.scaleY);
                common.updateCurrentDom();
                e.preventDefault();
            }

            if (e.keyCode == 83) { //s
                preSet();
                window.CURRENT_ITEM.scaleX = window.CURRENT_ITEM.scaleX * 0.9;
                window.CURRENT_ITEM.scaleY = window.CURRENT_ITEM.scaleY * 0.9;
                common.updateCurrentDom();
                e.preventDefault();
            }


            if (e.keyCode == 87) { //  w
                preSet();
                window.CURRENT_ITEM.scaleX = window.CURRENT_ITEM.scaleX * 1.1;
                window.CURRENT_ITEM.scaleY = window.CURRENT_ITEM.scaleY * 1.1;
                common.updateCurrentDom();
                e.preventDefault();
            }



            if (e.keyCode == 65) { //a
                preSet();
                window.CURRENT_ITEM.rotate -= 10;
                common.updateCurrentDom();
                e.preventDefault();
            }


            if (e.keyCode == 68) { //s
                preSet();
                window.CURRENT_ITEM.rotate += 10;
                common.updateCurrentDom();
                e.preventDefault();
            }


            if (e.keyCode == 49) { // 1
                window.clipBoard = {};
                _.extend(window.clipBoard, window.CURRENT_ITEM);
            }


            if (e.keyCode == 50) { //  2
                var attr = ["rotate", "scaleX", "scaleY"];
                _.each(attr, function (i) {
                    window.CURRENT_ITEM[i] = window.clipBoard[i];
                });
                common.updateCurrentDom();
            }



            if (e.keyCode == 192) { //  `
                $(".title-control-bar").toggle(100)
            }


            if (e.keyCode == 112) {    //F1 start river desigin
                e.preventDefault();
                if ($(".river-container").size()) {
                    return;
                }
                var riverContainer = document.createElement("div");
                riverContainer.className = "river-container";
                $("#main-stage-editor").prepend(riverContainer);
                RiverBlock.init(riverContainer);
            }

            if (e.keyCode == 113) {   //F2 insert river 
                e.preventDefault();
                var scroll_top = window.stage_container.scrollTop();
                var stageHeight = CFG.environment.height;
                var A = _.union(AllCells, SelectedCells);
                _.each(A, function (i) {
                    var dIco = window.getDragIcoWithSingleCFG_imgSrc(i.waterType);
                    dIco.setPositionABS(i.centerPosition.x, i.centerPosition.y);
                    $("#main-stage-editor").append(dIco.dom);
                    window.ITEM_ARRAY.push(dIco);
                    $(".river-container").remove();
                    window.RiverGrid = [];
                    window.SelectedCells = [];
                    window.AllCells = [];
                });



            }

            if (e.keyCode == 114) {   //F3    cancel current river 
                e.preventDefault();
                $(".river-container").remove();
                window.RiverGrid = [];
                window.SelectedCells = [];
                window.AllCells = [];
            }
            return res;

        }

    }

    return res;


});