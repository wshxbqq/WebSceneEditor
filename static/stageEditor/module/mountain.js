define(['../Config', './Ico/drag-ico'], function (CFG, DragIco) {
    var mountain = {};

    mountain.init = function () {
        var mountainsCfg = _.filter(CFG.icos, function (item) { return item.type == "mountain" })

        var getMountainRandom = function () {
            var res = mountainsCfg[_.random(mountainsCfg.length - 1)];
            return res;
        }

        var height = CFG.environment.height;

        var leftX = CFG.environment.mountain.left;

        var rightX = CFG.environment.mountain.right;

        var m_count= window.parseInt( height/256)+1;
        for (var i = 0; i < m_count; i++) {
            var y = height - 256 * i - 128;
            var dIco = new DragIco();
            var _cfg_inner = getMountainRandom();
            _.extend(dIco, _cfg_inner);
            dIco.scaleX = -1;
            dIco.init(_cfg_inner);
            dIco.setPosition(leftX, y);
            window.ITEM_ARRAY.push(dIco);
            $("#main-stage-editor").append(dIco.dom);



            var dIco = new DragIco();
            var _cfg_inner = getMountainRandom();
            _.extend(dIco, _cfg_inner);

            dIco.init(_cfg_inner);
            dIco.setPosition(rightX, y);
            window.ITEM_ARRAY.push(dIco);
            $("#main-stage-editor").append(dIco.dom);
        }

    }

    return mountain;
});