/// <reference path="../Libs/jquery-1.10.2.min.js" />
define(['../../Common', '../../Config'], function (common, cfg) {

    window.RiverGrid = [];
    window.SelectedCells = [];
    window.AllCells = [];
    function RiverBlock(cfg) {
        this.dom = document.createElement("div");
        this.img = null;
        this.cfg = cfg;
        this.position = { x: "", y: "" };
        this.centerPosition = { x: "", y: "" };
    };

    RiverBlock.prototype.init = function (cfg) {
        this.img = document.createElement("img");
        this.img.className = "abs-img";
        $(this.dom).addClass("river-block-div").html("*");
        this.dom.ref = this;
        this.dom.addEventListener("click", function () {
            var rb = this.ref;
            if (_.contains(SelectedCells, rb)) {
                SelectedCells = _.without(SelectedCells, rb);
                $(rb.img).remove();
                window.createRiver();
                return;
            }
           
            rb.setType(5);
            SelectedCells.push(rb);
            window.createRiver();
        });
    }

 
    RiverBlock.prototype.setType = function (type) {
        this.waterType = type + "_" + window.parseInt(Math.random() * 100 % 3)+".png";
        this.img.src = [
             "/static/art/runner/water/",
            this.waterType 
        ].join("");
        $(".river-container").append(this.img);

    }

    RiverBlock.prototype.setWrite = function () {
        $(this.dom).css("background", "#fff");
    }
    RiverBlock.prototype.setPositionUseCenter = function (cpoint) {
        this.centerPosition = cpoint;
        this.position.x = cpoint.x - 32;
        this.position.y = cpoint.y - 11.75;
        $(this.dom).css("bottom", this.position.y + "px");
        $(this.dom).css("left", this.position.x + "px");

        $(this.img).css("bottom", this.position.y - 11.75 + "px");
        $(this.img).css("left", this.position.x + "px");
    }


    //static  

    RiverBlock.initWithContainer = function (container) {
        var containerWidth = $(container).width();
        var containerHeight = $(container).height();

        x_count = containerWidth / 64 + 3;
        y_count = parseInt(containerHeight / 23.5 + 3);

        for (var i = 0; i < y_count; i++) {
            var rowArray = [];
            for (var j = 0; j < x_count; j++) {
                var p = {};

                p.x = 32 + j * 64;
                p.y = 11.75 + i * 23.5;
                if (i % 2) {
                    p.x -= 32;
                }
                var rb = new RiverBlock();
                rb.init();
                rb.setPositionUseCenter(p);
                rowArray.push(rb);
                $(".river-container").append(rb.dom);
            }
            RiverGrid.push(rowArray);
        }
    }

    RiverBlock.initRelation = function () {
        for (var i = 0; i < RiverGrid.length; i++) {
            var row = RiverGrid[i];
            for (var j = 0; j < row.length; j++) {

                var rb = row[j];
                if (i % 2) {
                    rb["r_1"] = row[j - 1];
                    rb["r_2"] = RiverGrid[i + 1] ? RiverGrid[i + 1][j - 1] : null;
                    rb["r_3"] = RiverGrid[i + 2] ? RiverGrid[i + 2][j] : null;
                    rb["r_4"] = RiverGrid[i - 1] ? RiverGrid[i - 1][j - 1] : null;
                    rb["r_5"] = rb;
                    rb["r_6"] = RiverGrid[i + 1] ? RiverGrid[i + 1][j] : null;
                    rb["r_7"] = RiverGrid[i - 2] ? RiverGrid[i - 2][j] : null;
                    rb["r_8"] = RiverGrid[i - 1] ? RiverGrid[i - 1][j] : null;
                    rb["r_9"] = row[j + 1];
                } else {
                    rb["r_1"] = row[j - 1];
                    rb["r_2"] = RiverGrid[i + 1] ? RiverGrid[i + 1][j] : null;
                    rb["r_3"] = RiverGrid[i + 2] ? RiverGrid[i + 2][j] : null;
                    rb["r_4"] = RiverGrid[i - 1] ? RiverGrid[i - 1][j] : null;
                    rb["r_5"] = rb;
                    rb["r_6"] = RiverGrid[i + 1] ? RiverGrid[i + 1][j + 1] : null;
                    rb["r_7"] = RiverGrid[i - 2] ? RiverGrid[i - 2][j] : null;
                    rb["r_8"] = RiverGrid[i - 1] ? RiverGrid[i - 1][j + 1] : null;
                    rb["r_9"] = row[j + 1];
                }


            }
        }

    }

    RiverBlock.init = function (container) {
        RiverBlock.initWithContainer(container);
        RiverBlock.initRelation();

    }

    var riverType = {
        t_1: [0, 0, 0, 0, 0, 0, 0, 0, 1],



        t_2: [0, 0, 0, 0, 0, 0, 0, 1, 0],
        t_2_1: [0, 0, 0, 0, 0, 0, 0, 1, 1],
        t_2_2: [0, 0, 0, 0, 0, 0, 1, 1, 1],
        t_2_3: [0, 0, 0, 0, 0, 0, 1, 1, 0],


        t_3: [0, 0, 0, 0, 0, 0, 1, 0, 0],


        t_4: [0, 0, 0, 0, 0, 1, 0, 0, 0],
        t_4_1: [0, 0, 0, 0, 0, 1, 0, 0, 1],
        t_4_2: [0, 0, 1, 0, 0, 1, 0, 0, 1],
        t_4_3: [0, 0, 1, 0, 0, 1, 0, 0, 0],



        t_6: [0, 0, 0, 1, 0, 0, 0, 0, 0],
        t_6_1: [1, 0, 0, 1, 0, 0, 1, 0, 0],
        t_6_2: [1, 0, 0, 1, 0, 0, 0, 0, 0],
        t_6_3: [0, 0, 0, 1, 0, 0, 1, 0, 0],



        t_7: [0, 0, 1, 0, 0, 0, 0, 0, 0],


        t_8: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        t_8_1: [1, 1, 0, 0, 0, 0, 0, 0, 0],
        t_8_2: [1, 1, 1, 0, 0, 0, 0, 0, 0],
        t_8_3: [0, 1, 1, 0, 0, 0, 0, 0, 0],








        t_9: [1, 0, 0, 0, 0, 0, 0, 0, 0],








        t_10_up: [0, 0, 0, 0, 0, 0, 1, 0, 0],
        t_10_down: [1, 1, 1, 0, 0, 1, 0, 0, 1],
        t_10_down_1: [0, 1, 1, 0, 0, 1, 0, 0, 1],
        t_10_down_2: [0, 1, 1, 0, 0, 1, 0, 0, 0],
        t_10_down_3: [1, 1, 1, 0, 0, 1, 0, 0, 0],




        t_11_up: [1, 0, 0, 1, 0, 0, 1, 1, 1],
        t_11_up_1: [0, 0, 0, 1, 0, 0, 1, 1, 0],
        t_11_up_2: [1, 0, 0, 1, 0, 0, 1, 1, 1],
        t_11_up_3: [0, 0, 0, 1, 0, 0, 1, 1, 1],
        t_11_up_4: [1, 0, 0, 1, 0, 0, 1, 1, 0],



        t_12_left: [0, 0, 1, 0, 0, 1, 0, 1, 1],
        t_12_left_1: [0, 0, 1, 0, 0, 1, 1, 1, 1],
        t_12_left_2: [0, 0, 0, 0, 0, 1, 1, 1, 1],
        t_12_left_3: [0, 0, 1, 0, 0, 1, 0, 1, 1],
        t_12_left_4: [0, 0, 0, 0, 0, 1, 0, 1, 1],


        t_13_1: [1, 1, 0, 1, 0, 0, 0, 0, 0],
        t_13_2: [1, 1, 1, 1, 0, 0, 0, 0, 0],
        t_13_3: [1, 1, 0, 1, 0, 0, 1, 0, 0],
        t_13_4: [1, 1, 1, 1, 0, 0, 1, 0, 0]

    };

    function getMatchType(rb) {
        function isMatchThisType(_type, _rb) {
            var flag = true;
            for (var i = 0; i < 9; i++) {
                var r_x = "r_" + (i + 1);
                if (_type[i] != _.contains(SelectedCells, _rb[r_x])) {
                    flag = false;
                }
            }
            return flag;
        };



        for (pro in riverType) {
            var t = riverType[pro];
            var result = isMatchThisType(t, rb);
            if (result) {
                return pro;
            }
        }

        return 0;

    }


    window.createRiver = function () {
        window.AllCells = [];
        for (var i = 0; i < RiverGrid.length; i++) {
            var row = RiverGrid[i];
            for (var j = 0; j < row.length; j++) {
                var rb = row[j];
                var rbType = getMatchType(rb);
                if (rbType) {
                    var t = rbType.split('_')[1];
                    rb.setType(t);
                    window.AllCells.push(rb);
                }
            }
        }

    };


    return RiverBlock;

});
