var w5e = w5e || {};

w5e.rootScene = cc.Scene.extend({
    _nodeGrid: null,
    onEnter: function () {
        this._super();
        // var layer = new cc.LayerColor(cc.color(cc.random0To1() * 100 + 155, cc.random0To1() * 100 + 155, cc.random0To1() * 100 + 155, 255));
        var layer = new cc.LayerColor(cc.color("#ffffff"));
        this.addChild(layer);

        var size = cc.director.getWinSize();

        var self = this;
        var sprite = null;
        cc.loader.load(["logo.jpg"], function (err) {
            if (err) cc.log("load logo.jpg failed");
            sprite = cc.Sprite.create("w5e_logo_64.png");
            sprite.setPosition(size.width / 2, size.height / 2 + 40);
            self.addChild(sprite, 0);

            // var orbit = cc.orbitCamera(5, 1, 0, 0, 360, 0, 0);
            // var a = cc.sequence(orbit);
            // sprite.runAction(a.repeatForever());
            // sprite.runAction(orbit);
        });


        var label = cc.LabelTTF.create("Loading...", "Arial", 56);
        label.setPosition(size.width / 2, size.height / 2 - 40);
        label.setColor(cc.color("#000"));
        this.addChild(label, 1);
        // label.scale = 0;


        // label.runAction(cc.sequence(cc.scaleTo(1.5, 1.1), cc.scaleTo(1.5, 1)).repeatForever());
        // label.runAction(cc.scaleTo(0.3, 0.5));
        // label.runAction(cc.sequence(cc.fadeTo(0.3, 155), cc.fadeIn(0.2), cc.fadeOut(0.5)));

        cc.loader.load(["res/g.js"], function (err) {
            if (err) cc.log("load g.js failed");
            //label.opacity = 0;
            label.setString("Ready");
            label.runAction(
                cc.sequence(
                    cc.fadeOut(0.5),
                    cc.callFunc(function () {
                        label.setString(w5e.res.title);
                    })
                )
            );
        });


        this.scheduleOnce(function () {
            if (sprite) {
                // var margin = 10;
                // sprite.runAction(cc.moveTo(1,cc.p(sprite.width/2 + margin,layer.height - sprite.height - margin)));
                var totalW = sprite.width + label.width;
                var totalX = size.width / 2 - totalW / 2 + sprite.width / 2;
                sprite.runAction(
                    cc.sequence(
                        cc.spawn(
                            cc.scaleTo(0.2, 0),
                            cc.fadeOut(0.5),
                            cc.moveTo(0.2, cc.p(size.width / 2, size.height / 2))
                        ),
                        cc.delayTime(1.05),
                        cc.spawn(
                            cc.scaleTo(0.2, 1),
                            cc.moveTo(0.15, cc.p(totalX, size.height / 2)),
                            cc.fadeIn(0.5)
                        )
                    ));
                label.runAction(
                    cc.sequence(
                        cc.spawn(
                            cc.fadeTo(0.5, 255),
                            cc.moveTo(0.2, cc.p(size.width / 2, size.height / 2)),
                            cc.scaleTo(0.2, 1)
                        ),
                        cc.delayTime(1.05),
                        cc.moveTo(0.15, cc.p(totalX + sprite.width + label.width / 2, size.height / 2))
                    ));
                //label.removeAllActions();
            }
        }, 1);


        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    layer.setColor(cc.color(cc.random0To1() * 100 + 155, cc.random0To1() * 100 + 155, cc.random0To1() * 100 + 155, 255));
                    // if (!cc.sys.isNative) {
                    //     window.open("http://w5e.me/blog", "_blank");
                    // }
                    if (!cc.sys.isNative) {
                        window.location.href = "http://w5e.me/blog";
                    }
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    }
});

w5e.start = function () {

    cc.view.adjustViewPort(true);
    cc.view.enableAutoFullScreen(false);
    // UC browser on many android devices have performance issue with retina display
    if (cc.sys.os !== cc.sys.OS_ANDROID || cc.sys.browserType !== cc.sys.BROWSER_TYPE_UC) {
        cc.view.enableRetina(true);
    }
    cc.director.setProjection(cc.Director.PROJECTION_2D);
    var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.NO_BORDER);

    if (!cc.sys.isMobile)
        cc.view.setDesignResolutionSize(1920, 1080, policy);
    else
        cc.view.setDesignResolutionSize(1080, 1920, policy);

    cc.view.resizeWithBrowserSize(true);

    cc.log("w5e");

    cc.director.runScene(new w5e.rootScene());

}

window.onload = function () {
    cc.game.onStart = function () {
        w5e.start(this);
    };
    cc.game.run("w5e");
};