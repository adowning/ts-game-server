var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.SIMPLE_FROUND_POLYFILL = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, t, a) {
    e != Array.prototype && e != Object.prototype && (e[t] = a.value)
}, $jscomp.getGlobal = function(e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
}, $jscomp.global = $jscomp.getGlobal(this), $jscomp.polyfill = function(e, t, a, n) {
    if (t) {
        for (a = $jscomp.global, e = e.split("."), n = 0; n < e.length - 1; n++) {
            var s = e[n];
            s in a || (a[s] = {}), a = a[s]
        }(t = t(n = a[e = e[e.length - 1]])) != n && null != t && $jscomp.defineProperty(a, e, {
            configurable: !0,
            writable: !0,
            value: t
        })
    }
}, $jscomp.polyfill("Object.is", (function(e) {
    return e || function(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
    }
}), "es6", "es3"), $jscomp.polyfill("Array.prototype.includes", (function(e) {
    return e || function(e, t) {
        var a = this;
        a instanceof String && (a = String(a));
        var n = a.length;
        for (0 > (t = t || 0) && (t = Math.max(t + n, 0)); t < n; t++) {
            var s = a[t];
            if (s === e || Object.is(s, e)) return !0
        }
        return !1
    }
}), "es7", "es3"), $jscomp.checkStringArgs = function(e, t, a) {
    if (null == e) throw new TypeError("The 'this' value for String.prototype." + a + " must not be null or undefined");
    if (t instanceof RegExp) throw new TypeError("First argument to String.prototype." + a + " must not be a regular expression");
    return e + ""
}, $jscomp.polyfill("String.prototype.includes", (function(e) {
    return e || function(e, t) {
        return -1 !== $jscomp.checkStringArgs(this, e, "includes").indexOf(e, t || 0)
    }
}), "es6", "es3"), (window.webpackJsonp = window.webpackJsonp || []).push([
    [0], {
        1067: function(e, t) {
            nge.appNS = "Cloverstones", nge.App[nge.appNS] = {}
        },
        1068: function(e, t, a) {
            nge.realPathPrefix = "../../", nge.appPath = "app/cloverstones.7/", nge.gameCode = "249", nge.loaderTpl = "netgame", nge.loaderShowGamePreview = !1, nge.loadCfg = []
        },
        1069: function(e, t) {
            nge.App[nge.appNS].Run = nge.App.DjGameBase.Run.extend((function() {
                var e = [20];
                nge.App.addSysInstancesMode("SlimJackpot"), nge.App.addSysInstancesMode("lang_" + nge.Cfg.Main.lang);
                var t = nge.Cfg.Main.lang;
                nge.Lib.Helper.makeReactive(nge.Cfg.Main, "lang", (function(e) {
                    nge.App.removeSysInstancesMode("lang_" + t), nge.App.addSysInstancesMode("lang_" + nge.Cfg.Main.lang), t = e
                })), nge.App.DjGameBase && (nge.App[nge.appNS] = nge.Lib.Helper.mergeObjsRecursive(nge.App.DjGameBase, nge.App[nge.appNS])), this.applyClassicGameBase(), this.run = function() {
                    this.runDefault(), nge.localData.set("lines.cfg", e)
                }, this.statesReplacements.play.push("background", "blinker", "bigWin", "leprechaun", "luckyMill", "mushroom", "popup")
            })), nge.Cfg.Main.project = "cloverstones", nge.Cfg.Main.title = "Cloverstones", nge.Cfg.Main.gameCode = "249", nge.Cfg.Main.gameType = "slot", nge.Cfg.Main.slotType = "standart", nge.Cfg.Main.gameVersion = "0.19"
        },
        1070: function(e, t) {
            nge.App[nge.appNS].Cfg = {}
        },
        1071: function(e, t) {
            nge.App[nge.appNS].Cfg.Sounds = Class.extend((function() {
                this.contents = {
                    bs_wheel_spin_0: "game:/sounds/all_symbols_gone_and_come",
                    bs_background: "game:sounds/ambient_basic_game",
                    bn_background: "game:sounds/ambient_free_spins",
                    ambient: "game:sounds/ambient_sfx",
                    intro_big_win: "game:/sounds/intro_big_win",
                    big_win: "game:/sounds/big_win",
                    big_win_start: "game:/sounds/big_win_start",
                    big_win_ending: "game:/sounds/big_win_end",
                    bell_0: "game:sounds/bell_0",
                    bell_1: "game:sounds/bell_1",
                    bell_2: "game:sounds/bell_2",
                    symbol_explosion_0: "game:sounds/symbol_explosion_0",
                    symbol_explosion_1: "game:sounds/symbol_explosion_1",
                    symbol_explosion_2: "game:sounds/symbol_explosion_2",
                    symbol_explosion_3: "game:sounds/symbol_explosion_3",
                    symbol_explosion_4: "game:sounds/symbol_explosion_4",
                    symbol_explosion_5: "game:sounds/symbol_explosion_0",
                    symbol_explosion_6: "game:sounds/symbol_explosion_1",
                    symbol_explosion_7: "game:sounds/symbol_explosion_2",
                    symbol_explosion_8: "game:sounds/symbol_explosion_3",
                    symbol_explosion_9: "game:sounds/symbol_explosion_4",
                    symbol_drop_0: "game:sounds/symbol_drop_0",
                    symbol_drop_1: "game:sounds/symbol_drop_1",
                    symbol_drop_2: "game:sounds/symbol_drop_2",
                    symbol_drop_3: "game:sounds/symbol_drop_3",
                    symbol_drop_4: "game:sounds/symbol_drop_4",
                    symbol_drop_5: "game:sounds/symbol_drop_0",
                    symbol_drop_6: "game:sounds/symbol_drop_1",
                    symbol_drop_7: "game:sounds/symbol_drop_2",
                    symbol_drop_8: "game:sounds/symbol_drop_3",
                    symbol_drop_9: "game:sounds/symbol_drop_4",
                    big_symbol_separate: "game:sounds/big_symbol_separate",
                    start_freespins_popup: "game:/sounds/start_fs_popup",
                    end_freespins_popup: "game:/sounds/end_fs_popup",
                    lucky_mill_end_popup: "game:/sounds/end_bonus_wheel_popup",
                    popup_disappear: "game:/sounds/pop_up_disappear",
                    wheel_collect: "game:sounds/wheel_collect",
                    wheel_background: "game:sounds/bonus_wheel_background",
                    wheel_start: "game:sounds/wheel_screech_start",
                    wheel_rotate: "game:sounds/wheel_screech_loop",
                    wheel_stop: "game:sounds/wheel_screech_finish",
                    wheel_multiplier_fly: "game:sounds/wheel_multiplier_fly",
                    hover_0: "game:sounds/default_btn_hover",
                    hover_1: "game:sounds/default_btn_hover",
                    hover_2: "game:sounds/default_btn_hover",
                    click: "game:sounds/default_btn",
                    spin_click: "game:/sounds/button_start",
                    spin_stop: "game:/sounds/button_stop",
                    win_regularWinHigh: "game:/sounds/sr_win_2",
                    win_regularWinMid: "game:sounds/sr_win_1",
                    win_regularWinLow: "game:sounds/sr_win_0",
                    jackpot_online_background: "game:sounds/jackpot_online_background",
                    jackpot_online_coincidence_1: "game:sounds/jackpot_online_coincidence_1",
                    jackpot_online_coincidence_2: "game:sounds/jackpot_online_coincidence_2",
                    jackpot_online_coincidence_3: "game:sounds/jackpot_online_coincidence_3",
                    jackpot_online_finish_jackpot_popup: "game:sounds/jackpot_online_finish_jackpot_popup",
                    jackpot_online_won_jackpot_movie: "game:sounds/jackpot_online_won_jackpot_movie"
                }
            }))
        },
        1072: function(e, t) {
            nge.App[nge.appNS].Cfg.Spine = nge.Cfg.Spine.extend((function() {
                this.preloadForStates = {
                    play: [{
                        spineName: "m00_Anim",
                        animationName: "m00"
                    }, {
                        spineName: "m01_Anim",
                        animationName: "m01"
                    }, {
                        spineName: "m02_Anim",
                        animationName: "m02"
                    }, {
                        spineName: "m03_Anim",
                        animationName: "m03"
                    }, {
                        spineName: "m04_Anim",
                        animationName: "m04"
                    }, {
                        spineName: "m05_Anim",
                        animationName: "m05"
                    }, {
                        spineName: "m06_Anim",
                        animationName: "m06"
                    }, {
                        spineName: "m07_Anim",
                        animationName: "m07"
                    }, {
                        spineName: "m08_Anim",
                        animationName: "m08"
                    }, {
                        spineName: "m09_Anim",
                        animationName: "m09"
                    }, {
                        spineName: "m10_Anim",
                        animationName: "m10"
                    }, {
                        spineName: "symbol_bang",
                        animationName: "bang"
                    }, {
                        spineName: "symbol_bang_fs",
                        animationName: "bang"
                    }, {
                        spineName: "symbol_dust",
                        animationName: "dust"
                    }, {
                        spineName: "symbol_big_divide",
                        animationName: "divide"
                    }, {
                        spineName: "bigWinAnim",
                        animationName: "big_win_start_3s"
                    }, {
                        spineName: "bigWinAnim",
                        animationName: "big_win_start_6s"
                    }, {
                        spineName: "bigWinAnim",
                        animationName: "big_win_start_9s"
                    }, {
                        spineName: "bigWinAnim",
                        animationName: "big_win_end_3_6_9"
                    }, {
                        spineName: "bigWinAnim",
                        animationName: "big_win_loop"
                    }, {
                        spineName: "bigWinFlareAnim",
                        animationName: "count_flare"
                    }, {
                        spineName: "bigWinGlowwormsAnim",
                        animationName: "glowworms"
                    }, {
                        spineName: "waterfall_animation",
                        animationName: "waterfall"
                    }, {
                        spineName: "leaves_animation",
                        animationName: "leaves"
                    }, {
                        spineName: "flash_animation",
                        animationName: "flash"
                    }, {
                        spineName: "multipliers_animation",
                        animationName: "multiplier_fly_0"
                    }, {
                        spineName: "multipliers_animation",
                        animationName: "multiplier_fly_1"
                    }, {
                        spineName: "multipliers_animation",
                        animationName: "multiplier_fly_2"
                    }, {
                        spineName: "multipliers_animation",
                        animationName: "multiplier_fly_3"
                    }, {
                        spineName: "multipliers_animation",
                        animationName: "multiplier_fly_4"
                    }, {
                        spineName: "mushroom_bang",
                        animationName: "bang_1"
                    }, {
                        spineName: "mushroom_bang",
                        animationName: "bang_2"
                    }, {
                        spineName: "mushroom_bang",
                        animationName: "bang_3"
                    }, {
                        spineName: "mushroom_bang",
                        animationName: "bang_4"
                    }, {
                        spineName: "mushroom_bang",
                        animationName: "bang_5"
                    }, {
                        spineName: "mushroom_bang",
                        animationName: "bang_6"
                    }, {
                        spineName: "mushroom_bang",
                        animationName: "bang_7"
                    }, {
                        spineName: "mushroom_effect",
                        animationName: "mushroom_effect"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_on_1"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_on_2"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_on_3"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_on_4"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_on_5"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_on_6"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_on_7"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_off_1"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_off_2"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_off_3"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_off_4"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_off_5"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_off_6"
                    }, {
                        spineName: "mushroom_multiplier",
                        animationName: "stage_off_7"
                    }]
                }, this.preloadForEvents = []
            }))
        },
        1073: function(e, t) {
            nge.App[nge.appNS].Com = {}
        },
        1074: function(e, t) {
            nge.App[nge.appNS].Com.Autospin = {}
        },
        1075: function(e, t) {
            nge.App[nge.appNS].Com.Autospin.Controller = nge.App.DjGameBase.Com.Autospin.Controller.extend((function() {
                this.autospinRunExceptions.push((function() {
                    return nge.localData.get("bonusWon")
                }))
            }))
        },
        1076: function(e, t) {
            nge.App[nge.appNS].Com.Autospin.View = nge.App.DjGameBase.Com.Autospin.View.extend((function() {
                this.firstPanelElementTopYOffset = 0, this.yPanelOffset = 4, this.infinityTextYOffset = 3, this.staticMask = {
                    x: 20,
                    y: -255,
                    width: 116,
                    height: 426,
                    debug: !1
                }
            }))
        },
        1077: function(e, t) {
            nge.App[nge.appNS].Com.Autospin.Mobile = {}
        },
        1078: function(e, t) {
            nge.App[nge.appNS].Com.Autospin.Mobile.Controller = nge.App.DjGameBase.Com.Autospin.Mobile.Controller.extend((function() {
                this.autospinRunExceptions.push((function() {
                    return nge.localData.get("bonusWon")
                }))
            }))
        },
        1079: function(e, t) {
            nge.App[nge.appNS].Com.Background = {}
        },
        1080: function(e, t) {
            nge.App[nge.appNS].Com.Background.Controller = nge.Com.Base.extend((function() {
                function e(e, t, a, n, s, o, l, i) {
                    return e = nge.Mlm.Objects.Spine({
                        assetKey: e,
                        name: t,
                        x: a,
                        y: n,
                        isVisible: !1
                    }), s = nge.findOne("^" + s), s = nge.objects.create(e, s, !0), o && s.setAnimationByName(0, o, l, i), s
                }

                function t(t) {
                    l = e("birds", "bg_spine_birds", 960, 480, "backgroundMainAnimationContainer"), i = e("fog", "bg_spine_fog", 900, 430, "backgroundMainAnimationContainer"), p = e("fs_glow", "bg_spine_fs_glow", 960, 540, "backgroundFreespinAnimationContainer")
                }

                function a(e, t, a) {
                    (e = nge.tween.add(e).to({
                        alpha: t
                    }, 1e3)).onComplete.addOnce((function() {
                        a && a()
                    })), e.start()
                }

                function n(e) {
                    "freespinStartPopup" === e ? (m.visible = !0, m.alpha = 1, a(r, 0, (function() {
                        r.visible = !1, r.alpha = 1
                    })), a(u, 0, (function() {
                        u.visible = !1, u.alpha = 1, p.setAnimationByName(0, "bg_fs", !0)
                    })), c.visible = !0, c.alpha = 0, p.setAnimationByName(0, "bg_fs", !0), a(c, 1, null)) : "gameFreeSpin" === e ? (l.stop(!1), i.stop(!1), _ = !1, p.setAnimationByName(0, "bg_fs", !0)) : "freespinEndPopup" === e ? (r.visible = !0, r.alpha = 0, a(r, 1, (function() {
                        m.visible = !1, m.alpha = 1
                    })), a(c, 0, (function() {
                        c.visible = !1, c.alpha = 1
                    })), u.visible = !0, u.alpha = 0, l.setAnimationByName(0, "birds", !0), i.setAnimationByName(0, "fog", !0), _ = !0, a(u, 1, null)) : _ || "game" !== e && "gameOffer" !== e && "luckyMill" !== e || (l.setAnimationByName(0, "birds", !0), i.setAnimationByName(0, "fog", !0), p.stop(!1), _ = !0)
                }

                function s(e) {
                    f || (f = !0, nge.localData.get("freespin.inProgress") ? h.forEach((function(t) {
                        e ? d(t) : x(t)
                    })) : b.forEach((function(t) {
                        e ? d(t) : x(t)
                    })))
                }

                function o() {
                    f = !1
                }
                var l, i, p, r, m, u, c, g = this,
                    y = !1,
                    b = [],
                    h = [],
                    f = !1,
                    _ = !1,
                    x = function(e) {
                        nge.tween.add(e).to({
                            y: 0
                        }, 70).to({
                            y: 5
                        }, 40).to({
                            y: 1
                        }, 50).to({
                            y: 4
                        }, 40).to({
                            y: 2
                        }, 50).to({
                            y: 5
                        }, 40).to({
                            y: 2
                        }, 50).to({
                            y: 4
                        }, 40).to({
                            y: 0
                        }, 100).start()
                    },
                    d = function(e) {
                        nge.tween.add(e).to({
                            y: 0
                        }, 120).to({
                            y: 4
                        }, 50).to({
                            y: 0
                        }, 50).start()
                    };
                this.create = function() {
                    this.createDefault(), y || (g.subscribe(), y = !0), h = [], (b = []).push(nge.findOne("^slotMachineFrameMainGame")), b.push(nge.findOne("^leprechaunAnimationContainer")), h.push(nge.findOne("^slotMachineFrameFreeSpinGame")), h.push(nge.findOne("^leprechaunAnimationContainer")), (r = nge.findOne("^bgArea")).alpha = 1, (m = nge.findOne("^bgAreaFreeSpins")).alpha = 1, u = nge.findOne("^backgroundMainAnimationContainer"), c = nge.findOne("^backgroundFreespinAnimationContainer"), _ = !1
                }, this.subscribe = function() {
                    nge.observer.add("StatesManager.create.end", t), nge.observer.add("layersSwitcher.switched", n), nge.observer.add("background.showBackgroundShakingAnimation", s), nge.observer.add("slotMachine.spinCommand", o)
                }
            }))
        },
        1081: function(e, t) {
            nge.App[nge.appNS].Com.Background.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {}
                }
            }
        },
        1082: function(e, t) {
            nge.App[nge.appNS].Com.Balance = {}
        },
        1083: function(e, t) {
            nge.App[nge.appNS].Com.Balance.Controller = nge.App.DjGameBase.Com.Balance.Controller.extend((function() {
                var e = this;
                this.showBalance = function() {
                    var t = nge.localData.get("balance.totalAmount"),
                        a = nge.localData.get("cascades.inProgress"),
                        n = nge.localData.get("freespin.inProgress");
                    a || n || t && e.drawText(t)
                }, this.showBalanceAfterLuckyMill = function(t) {
                    t && t.totalAmount && e.drawText(t.totalAmount)
                }, this.customSubscribe = function() {
                    this.super.customSubscribe(), nge.observer.add("balance.showBalanceAfterLuckyMill", e.showBalanceAfterLuckyMill)
                }
            }))
        },
        1084: function(e, t) {
            nge.App[nge.appNS].Com.Balance.Mobile = {}
        },
        1085: function(e, t) {
            nge.App[nge.appNS].Com.Balance.Mobile.Controller = nge.App[nge.appNS].Com.Balance.Controller.extend((function() {}))
        },
        1086: function(e, t) {
            nge.App[nge.appNS].Com.BetSettings = {}
        },
        1087: function(e, t) {
            nge.App[nge.appNS].Com.BetSettings.Controller = nge.App.DjGameBase.Com.BetSettings.Controller.extend((function() {
                this.betBlockLayers = ["gameFreeSpin", "gameOffer", "luckyMill"]
            }))
        },
        1088: function(e, t) {
            nge.App[nge.appNS].Com.BigWin = {}
        },
        1089: function(e, t) {
            nge.App[nge.appNS].Com.BigWin.Cfg = nge.App.DjGameBase.Com.BigWin.Cfg.extend((function() {
                this.params = this.super.get(), this.params.animation.loopTrackName = "big_win_loop", this.params.followSlotName = "txt_holder", this.params.odometerDurations = [{
                    duration: 25e3,
                    name: "9s",
                    mult: 4
                }, {
                    duration: 15e3,
                    name: "9s",
                    mult: 2
                }, {
                    duration: 9e3,
                    name: "9s",
                    mult: 1
                }]
            }))
        },
        1090: function(e, t) {
            nge.App[nge.appNS].Com.BigWin.Controller = nge.App.DjGameBase.Com.BigWin.Controller.extend((function() {
                var e, t, a, n = this;
                this.create = function() {
                    this.super.create(), e = nge.findOne("^bigWinAnim_glowworms"), t = nge.findOne("^bigWinAnim_leaves"), a = nge.findOne("^leavesContainer"), n.mainAnim.onEvent.add((function(n, s) {
                        switch (s.data.name) {
                            case "tree_disappear":
                                (n = nge.tween.add(e).to({
                                    y: 800
                                }, 150, nge.Lib.Tween.Easing.Linear.None)).onComplete.addOnce((function() {
                                    e.stop(!1, !1), e.visible = !1
                                })), n.start();
                                break;
                            case "leaves_show":
                                a.alpha = 1, a.visible = !0, t.setAnimationByName(0, "leaves", !0);
                                break;
                            case "leaves_hide":
                                (n = nge.tween.add(a).to({
                                    alpha: 0
                                }, 500, nge.Lib.Tween.Easing.Linear.None)).onComplete.addOnce((function() {
                                    a.alpha = 1, a.visible = !1, t.stop(!1, !1), t.visible = !1
                                })), n.start()
                        }
                    }), n)
                }, this.show = function(t) {
                    this.super.show(t), e.y = 800, nge.tween.add(e).to({
                        y: 0
                    }, 450, nge.Lib.Tween.Easing.Linear.None).start(), e.setAnimationByName(0, "glowworms", !0)
                }
            }))
        },
        1091: function(e, t) {
            nge.App[nge.appNS].Com.BigWin.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {
                        contents: [{
                            type: 1,
                            name: "bigWinContainer",
                            anchorX: .5,
                            anchorY: .5,
                            x: 960,
                            y: 540,
                            isVisible: !1,
                            contents: [{
                                type: 6,
                                assetKey: "bigWinGlowwormsAnim",
                                name: "bigWinAnim_glowworms",
                                anchorX: .5,
                                anchorY: .5,
                                y: 0,
                                isVisible: !1
                            }, {
                                type: 1,
                                name: "leavesContainer",
                                isVisible: !1,
                                contents: [{
                                    type: 6,
                                    assetKey: "bigWinLeavesAnim",
                                    name: "bigWinAnim_leaves",
                                    anchorX: .5,
                                    anchorY: .5,
                                    y: 0,
                                    isVisible: !1
                                }]
                            }, {
                                type: 6,
                                assetKey: "bigWinFlareAnim",
                                name: "bigWinAnim_flare",
                                anchorX: .5,
                                anchorY: .5,
                                y: 0,
                                isVisible: !1
                            }, {
                                type: 7,
                                name: "bigWinAmount",
                                anchorX: .5,
                                anchorY: 0,
                                text: "0",
                                assetKey: "yellow_font",
                                size: 180
                            }, {
                                type: 6,
                                assetKey: "bigWinAnim",
                                name: "bigWinAnim",
                                anchorX: .5,
                                anchorY: .5,
                                y: 0,
                                isVisible: !1
                            }]
                        }]
                    }
                }
            }
        },
        1092: function(e, t) {
            nge.App[nge.appNS].Com.Blinker = {}
        },
        1093: function(e, t) {
            nge.App[nge.appNS].Com.Blinker.Cfg = nge.App.DjGameBase.Com.Blinker.Cfg.extend((function() {
                this.params = this.super.get(), this.params.startAlpha = .1
            }))
        },
        1094: function(e, t) {
            nge.App[nge.appNS].Com.Blinker.Controller = nge.App.DjGameBase.Com.Blinker.Controller.extend((function() {
                var e = this;
                this.blinkerShow = function() {
                    nge.localData.get("settings.turboMode") || e.super.blinkerShow()
                }
            }))
        },
        1095: function(e, t) {
            nge.App[nge.appNS].Com.Buttons = {}
        },
        1096: function(e, t) {
            nge.App[nge.appNS].Com.Buttons.Cfg = nge.App.DjGameBase.Com.Buttons.Cfg.extend((function() {
                delete this.params.freeSpinStart, delete this.params.finalPopup
            }))
        },
        1097: function(e, t) {
            nge.App[nge.appNS].Com.Buttons.Mobile = {}
        },
        1098: function(e, t) {
            nge.App[nge.appNS].Com.Buttons.Mobile.Cfg = nge.App.DjGameBase.Com.Buttons.Mobile.Cfg.extend((function() {
                delete this.params.freeSpinStart, delete this.params.finalPopup
            }))
        },
        1099: function(e, t) {
            nge.App[nge.appNS].Com.Freespin = {}
        },
        1100: function(e, t) {
            nge.App[nge.appNS].Com.Freespin.Cfg = nge.App.DjGameBase.Com.Freespin.Cfg.extend((function() {
                this.params.counterNotUpdateOnBonusGameName = "FreeSpins"
            }))
        },
        1101: function(e, t) {
            nge.App[nge.appNS].Com.Freespin.Controller = nge.App.DjGameBase.Com.Freespin.Controller.extend((function() {
                var e = this;
                this.createAdditionalPopupEntity = function() {}, this.createFreespinEndPopupEntity = function() {}, this.startFreespinsOnWinlinesComplete = function() {
                    e.freespinsInProgress || nge.rafSetTimeout((function() {
                        nge.observer.fire("freespin.popupStart.show");
                        var e = nge.localData.get("freespinsCountForStartPopup");
                        nge.observer.fire("popup.show", {
                            popupName: "freespinStartPopup",
                            layerName: "freespinStartPopup",
                            onClick: function() {
                                nge.observer.fire("layersSwitcher.show", "gameFreeSpin"), nge.observer.fire("popup_disappear.play")
                            },
                            freespinsCounter: e
                        })
                    }), 1e3)
                }, this.winlinesCompleteHandler = function() {
                    if (nge.localData.get("freespin.inProgress")) {
                        e.startFreespinsOnCycleComplete && (e.startFreespinsOnCycleComplete = !1, e.startFreespinsOnWinlinesComplete());
                        var t = nge.localData.get("cascades.inProgress");
                        e.finishFreespinsOnCycleComplete && e.winAnimationComplete && !t && (e.finishFreespinsOnCycleComplete = !1, e.prepareFreespinsToEnd())
                    }
                }, this.getForAdditionalBonusGame = function(e, t) {
                    return e = null, nge.localData.get("bonusGame.freespins") && (e = "FreeSpins", t.name = e, t.params = +nge.localData.get("bonusGame.freespins")), e
                }, this.checkForAdditionalFreespin = function() {
                    nge.localData.get("additionalPopup.willBeShownNext") && !nge.localData.get("cascades.inProgress") && nge.observer.fire("freespin.additional", nge.localData.get("bonusGame.freespins"))
                }, this.onAdditionalFreespins = function() {
                    var e = nge.localData.get("bonusGame.freespins");
                    nge.observer.fire("freespin.additional.show"), nge.observer.fire("popup.show", {
                        popupName: "freespinAdditionalPopup",
                        freespinsCounter: e,
                        onClick: function() {
                            nge.observer.fire("popup_disappear.play")
                        },
                        onHide: function() {
                            nge.localData.set("additionalPopup.willBeShownNext", !1), nge.observer.fire("freespin.counterUpdateEvent"), nge.observer.fire("freespin.additionalHide.start"), nge.observer.fire("freespin.additionalHide.end"), nge.localData.set("bonusGame.freespins", !1), nge.observer.fire("freespin.resume")
                        }
                    })
                }, this.prepareFreespinsToEnd = function() {
                    var e = nge.localData.get("slotMachine.totalBonusWin") || 0;
                    isNaN(e) ? console.error("Total bonus win is NaN") : nge.localData.set("freespins.totalWin", nge.Lib.Money.toCoins(e));
                    var t, a = nge.Lib.Money.toCoins(e);
                    t = 1e5 > a ? "freespinEndPopupS" : 1e6 > a ? "freespinEndPopupM" : "freespinEndPopupL", nge.observer.fire("popupFinish.animate.start"), nge.rafSetTimeout((function() {
                        nge.observer.fire("winlines.stopAnimation"), nge.observer.fire("popup.show", {
                            popupName: t,
                            layerName: "freespinEndPopup",
                            onClick: function() {
                                nge.observer.fire("freespins.changeSymbols", !1), nge.observer.fire("freespin.press.endPopupButton"), nge.observer.fire("slotMachine.sortAfterFreespins", null, 1), nge.observer.fire("popup_disappear.play")
                            },
                            freespinTotalWinCounter: a
                        }, 20)
                    }), 800)
                };
                var t = function() {
                        if (nge.localData.get("freespin.inProgress")) {
                            var e = nge.localData.get("freespin"),
                                t = {};
                            e && (t.freeSpinsTotal = e.spinsTotal, t.freeSpinRemain = +e.spinsLeft - 1, nge.observer.fire("shamrock.freespin.counterUpdateEvent", t))
                        }
                    },
                    a = function(e) {
                        "freespinStartPopup" === e && nge.localData.get("freeGame.inProgress") && (e = nge.findOne("^offersFreespinCounter")) && (e.visible = !0)
                    };
                this.subscribe = function() {
                    this.super.subscribe(), nge.observer.add("slotMachine.spinCommand", t), nge.observer.add("layersSwitcher.show", a)
                }
            }))
        },
        1102: function(e, t) {
            nge.App[nge.appNS].Com.Freespin.Mobile = {}
        },
        1103: function(e, t) {
            nge.App[nge.appNS].Com.Freespin.Mobile.Controller = nge.App[nge.appNS].Com.Freespin.Controller.extend((function() {}))
        },
        1104: function(e, t) {
            nge.App[nge.appNS].Com.InfoSwipe = {}
        },
        1105: function(e, t) {
            nge.App[nge.appNS].Com.InfoSwipe.Controller = nge.App.DjGameBase.Com.InfoSwipe.Controller.extend((function() {
                this.pageNames = "pageInfoOneContainer pageInfoTwoContainer pageInfoThreeContainer pageInfoFourContainer pageInfoFiveContainer pageInfoSixContainer pageInfoSevenContainer pageInfoEightContainer".split(" ")
            }))
        },
        1106: function(e, t) {
            nge.App[nge.appNS].Com.Intro = {}
        },
        1107: function(e, t) {
            nge.App[nge.appNS].Com.Intro.Controller = nge.App.DjGameBase.Com.Intro.Controller.extend((function() {
                this.lastStateToLayer = {
                    FreeSpins: "gameFreeSpin",
                    PickBonus: "luckyMill"
                }
            }))
        },
        1108: function(e, t) {
            nge.App[nge.appNS].Com.JackpotStatusPanel = {}
        },
        1109: function(e, t) {
            nge.App[nge.appNS].Com.JackpotStatusPanel.Cfg = nge.App.DjGameBase.Com.JackpotStatusPanel.Cfg.extend((function() {
                this.params.animateTransition = !0, this.params.animateDistance = -90, this.params.animateInEasing = nge.Lib.Tween.Easing.Bounce.Out, this.params.animateOutEasing = nge.Lib.Tween.Easing.Quintic.Out
            }))
        },
        1110: function(e, t) {
            nge.App[nge.appNS].Com.LayersSwitcher = {}
        },
        1111: function(e, t) {
            nge.App[nge.appNS].Com.LayersSwitcher.Cfg = nge.Com.LayersSwitcher.Cfg.extend((function() {
                this.scenes = {
                    play: {
                        defaultLayer: "game",
                        allContainers: "winPopupContainer popupAnimationOkButtonContainer UISpinPanelsContainer UISpinPanel_Manual_FreespinGame_Container UISpinPanel_Manual_MainGame_Container UIQuickSettingsPanelContainer UIBottomPanelsContainer UIWinContainer UIFreespinWinContainer luckyMillContainer gameScreenContainer slotMachineFrameMainGame slotMachineFrameContainer slotMachineGrassMainGame slotMachineFrameFreeSpinGame backgroundContainer leprechaunAnimationContainer mushroomAnimationContainer backgroundMainAnimationContainer backgroundFreespinAnimationContainer bgArea bgAreaFreeSpins customButtonsVerticalMobileContainer offersFreespinCounter offers1Container".split(" "),
                        layers: {
                            intro: {},
                            game: {
                                static: "UISpinPanelsContainer UISpinPanel_Manual_MainGame_Container UIQuickSettingsPanelContainer UIBottomPanelsContainer UIWinContainer winPopupContainer gameScreenContainer backgroundContainer slotMachineFrameContainer slotMachineFrameMainGame luckyMillContainer slotMachineGrassMainGame backgroundMainAnimationContainer leprechaunAnimationContainer mushroomAnimationContainer bgArea".split(" ")
                            },
                            luckyMill: {
                                static: "UISpinPanelsContainer UISpinPanel_Manual_MainGame_Container UIQuickSettingsPanelContainer UIBottomPanelsContainer UIWinContainer winPopupContainer gameScreenContainer backgroundContainer slotMachineFrameContainer slotMachineFrameMainGame luckyMillContainer slotMachineGrassMainGame backgroundMainAnimationContainer leprechaunAnimationContainer mushroomAnimationContainer bgArea".split(" ")
                            },
                            freespinStartPopup: {
                                static: "UISpinPanelsContainer UISpinPanel_Manual_MainGame_Container UIQuickSettingsPanelContainer UIBottomPanelsContainer UIWinContainer winPopupContainer slotMachineFrameContainer gameScreenContainer leprechaunAnimationContainer mushroomAnimationContainer backgroundContainer slotMachineFrameFreeSpinGame backgroundMainAnimationContainer backgroundFreespinAnimationContainer bgArea".split(" ")
                            },
                            gameFreeSpin: {
                                static: "UISpinPanelsContainer UISpinPanel_Manual_FreespinGame_Container UIWinContainer UIQuickSettingsPanelContainer UIBottomPanelsContainer winPopupContainer slotMachineFrameContainer leprechaunAnimationContainer mushroomAnimationContainer gameScreenContainer backgroundContainer slotMachineFrameFreeSpinGame backgroundFreespinAnimationContainer bgAreaFreeSpins".split(" ")
                            },
                            freespinEndPopup: {
                                static: "UISpinPanelsContainer UISpinPanel_Manual_FreespinGame_Container UIWinContainer UIQuickSettingsPanelContainer UIBottomPanelsContainer winPopupContainer slotMachineFrameContainer gameScreenContainer leprechaunAnimationContainer mushroomAnimationContainer backgroundContainer slotMachineFrameFreeSpinGame backgroundMainAnimationContainer backgroundFreespinAnimationContainer bgAreaFreeSpins".split(" ")
                            },
                            gameOfferPopup: {
                                static: "UISpinPanelsContainer UISpinPanel_Manual_MainGame_Container UIQuickSettingsPanelContainer UIBottomPanelsContainer UIWinContainer winPopupContainer gameScreenContainer backgroundContainer slotMachineFrameContainer slotMachineFrameMainGame luckyMillContainer slotMachineGrassMainGame backgroundMainAnimationContainer leprechaunAnimationContainer mushroomAnimationContainer bgArea offers1Container".split(" ")
                            },
                            gameOffer: {
                                static: "UISpinPanelsContainer UISpinPanel_Manual_MainGame_Container UIQuickSettingsPanelContainer UIBottomPanelsContainer UIWinContainer winPopupContainer gameScreenContainer backgroundContainer slotMachineFrameContainer slotMachineFrameMainGame luckyMillContainer slotMachineGrassMainGame backgroundMainAnimationContainer leprechaunAnimationContainer mushroomAnimationContainer bgArea offersFreespinCounter".split(" ")
                            }
                        }
                    }
                }
            }))
        },
        1112: function(e, t) {
            nge.App[nge.appNS].Com.LayersSwitcher.Mobile = {}
        },
        1113: function(e, t) {
            nge.App[nge.appNS].Com.LayersSwitcher.Mobile.Cfg = nge.Com.LayersSwitcher.Cfg.extend((function() {
                this.scenes = {
                    play: {
                        defaultLayer: "game",
                        allContainers: "winPopupContainer popupAnimationOkButtonContainer luckyMillContainer gameScreenContainer slotMachineFrameMainGame slotMachineFrameContainer slotMachineGrassMainGame slotMachineFrameFreeSpinGame leprechaunAnimationContainer mushroomAnimationContainer backgroundContainer backgroundMainAnimationContainer backgroundFreespinAnimationContainer bgArea bgAreaFreeSpins autoSpinMobileContainer offers1Container customButtonsVerticalMobileContainer".split(" "),
                        layers: {
                            intro: {},
                            game: {
                                static: "autoSpinMobileContainer winPopupContainer gameScreenContainer backgroundContainer slotMachineFrameContainer slotMachineFrameMainGame luckyMillContainer slotMachineGrassMainGame backgroundMainAnimationContainer leprechaunAnimationContainer mushroomAnimationContainer bgArea".split(" ")
                            },
                            luckyMill: {
                                static: "autoSpinMobileContainer winPopupContainer gameScreenContainer backgroundContainer slotMachineFrameContainer slotMachineFrameMainGame luckyMillContainer slotMachineGrassMainGame backgroundMainAnimationContainer leprechaunAnimationContainer mushroomAnimationContainer bgArea".split(" ")
                            },
                            freespinStartPopup: {
                                static: "winPopupContainer slotMachineFrameContainer gameScreenContainer leprechaunAnimationContainer mushroomAnimationContainer backgroundContainer slotMachineFrameFreeSpinGame backgroundFreespinAnimationContainer bgAreaFreeSpins".split(" ")
                            },
                            gameFreeSpin: {
                                static: "winPopupContainer slotMachineFrameContainer leprechaunAnimationContainer mushroomAnimationContainer gameScreenContainer backgroundContainer slotMachineFrameFreeSpinGame backgroundFreespinAnimationContainer bgAreaFreeSpins".split(" ")
                            },
                            freespinEndPopup: {
                                static: "winPopupContainer slotMachineFrameContainer gameScreenContainer backgroundContainer leprechaunAnimationContainer mushroomAnimationContainer slotMachineFrameFreeSpinGame backgroundFreespinAnimationContainer bgAreaFreeSpins".split(" ")
                            },
                            gameOfferPopup: {
                                static: "autoSpinMobileContainer winPopupContainer gameScreenContainer backgroundContainer slotMachineFrameContainer slotMachineFrameMainGame luckyMillContainer slotMachineGrassMainGame backgroundMainAnimationContainer leprechaunAnimationContainer mushroomAnimationContainer bgArea offers1Container".split(" ")
                            },
                            gameOffer: {
                                static: "autoSpinMobileContainer winPopupContainer gameScreenContainer backgroundContainer slotMachineFrameContainer slotMachineFrameMainGame luckyMillContainer slotMachineGrassMainGame backgroundMainAnimationContainer leprechaunAnimationContainer mushroomAnimationContainer bgArea".split(" ")
                            }
                        }
                    }
                }
            }))
        },
        1114: function(e, t) {
            nge.App[nge.appNS].Com.Leprechaun = {}
        },
        1115: function(e, t) {
            nge.App[nge.appNS].Com.Leprechaun.Controller = nge.Com.Base.extend((function() {
                function e() {
                    m = [], o.setAnimationByName(0, "win")
                }

                function t() {
                    nge.observer.fire("leprechaun.playWinAnimation", null, 100)
                }

                function a() {
                    "raise_lamp" !== r && "idle_top" !== r || (m = []).push("lower_lamp")
                }

                function n(e, t, a, n) {
                    (o = function(e, t, a, n, s, o, l, i) {
                        return e = nge.Mlm.Objects.Spine({
                            assetKey: e,
                            name: t,
                            x: a,
                            y: n,
                            isVisible: !1
                        }), s = nge.findOne("^" + s), s = nge.objects.create(e, s, !0), o && s.setAnimationByName(0, o, l, i), s
                    }(e, t, 215, 755, a, n)).onComplete.add((function() {
                        if (0 < m.length) {
                            var e = m[0];
                            m.splice(0, 1), r = e
                        } else "growing" === (e = 15 <= (e = nge.Lib.Helper.getRandomInt(0, 100)) && 35 > e && "lower_lamp" !== r ? "raise_lamp" : 0 <= e && 15 > e && "growing" !== r ? "growing" : "idle_bottom") ? (m.push("growing"), m.push("growing")) : "raise_lamp" === e && (50 <= nge.Lib.Helper.getRandomInt(0, 100) && m.push("idle_top"), m.push("lower_lamp")), r = e;
                        o.setAnimationByName(0, r)
                    }))
                }

                function s(e) {
                    n("leprechaun", "bg_spine_leprechaun", "leprechaunAnimationContainer", "idle_bottom")
                }
                var o, l = this,
                    i = !1,
                    p = !1,
                    r = !1,
                    m = [];
                this.create = function() {
                    p = nge.Lib.Helper.mobileAndTabletCheck(), this.createDefault(), i || (l.subscribe(), i = !0), m = [], r = !1
                }, this.subscribe = function() {
                    p || (nge.observer.add("StatesManager.create.end", s), nge.observer.add("slotMachine.spinCommand", a), nge.observer.add("winlines.animateAll", t), nge.observer.add("leprechaun.playWinAnimation", e))
                }
            }))
        },
        1116: function(e, t) {
            nge.App[nge.appNS].Com.Leprechaun.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {}
                }
            }
        },
        1117: function(e, t) {
            nge.App[nge.appNS].Com.Load = {}
        },
        1118: function(e, t) {
            nge.App[nge.appNS].Com.Load.Cfg = nge.App.DjGameBase.Com.Load.Cfg.extend((function() {
                var e = nge.appPath + "img/fonts/";
                this.fonts.introBlack = nge.appPath + "css/fonts/introBlack", this.atlasesGroups = ["atlases", "atlases_demo", "atlases_play"], this.bitmapFonts.yellow_font = {
                    type: mt.assets.BITMAP_FONT,
                    textureURL: e + "yellow_font.png",
                    bitmapFont: e + "yellow_font.fnt"
                }
            }))
        },
        1119: function(e, t) {
            nge.App[nge.appNS].Com.LoadAssets = {}
        },
        1120: function(e, t) {
            nge.App[nge.appNS].Com.LoadAssets.Controller = nge.App.ClassicGameBase.Com.LoadAssets.Controller.extend((function() {
                this.preload = function() {
                    if (this.super.preload(), !nge.wrap.cache.checkImageKey("1pxBlendingFix")) {
                        var e = nge.Lib.Helper.create1PxPng(0, 0, 0, 1, !0);
                        nge.wrap.cache.addTexture("1pxBlendingFix", PIXI.Texture.fromImage(e))
                    }
                    nge.wrap.cache.checkImageKey("settingsContainerBg") || nge.wrap.load.image("settingsContainerBg", nge.Lib.Helper.create1PxPng(58, 54, 66, 230, !0))
                }
            }))
        },
        1121: function(e, t) {
            nge.App[nge.appNS].Com.LuckyMill = {}
        },
        1122: function(e, t) {
            nge.App[nge.appNS].Com.LuckyMill.Cfg = Class.extend((function() {
                this.wheel = {
                    containerSelector: "^wheelContainer",
                    pointerAngle: 0
                }, this.wheelSectors = [{
                    index: 0,
                    value: 1
                }, {
                    index: 1,
                    value: 3
                }, {
                    index: 2,
                    value: 2
                }, {
                    index: 3,
                    value: 10
                }, {
                    index: 4,
                    value: "collect"
                }, {
                    index: 5,
                    value: 1
                }, {
                    index: 6,
                    value: 5
                }, {
                    index: 7,
                    value: 2
                }, {
                    index: 8,
                    value: 30
                }, {
                    index: 9,
                    value: "collect"
                }], this.loopTime = 1600, this.minLoops = 1, this.speedUpAngle = 60, this.slowDownAngle = 260
            }))
        },
        1123: function(e, t) {
            nge.App[nge.appNS].Com.LuckyMill.Controller = nge.Com.Base.extend((function() {
                var e, t;

                function a(e, t, a, n, s, o, l, i) {
                    return e = nge.Mlm.Objects.Spine({
                        assetKey: e,
                        name: t,
                        x: a,
                        y: n,
                        isVisible: !1
                    }), s = nge.findOne("^" + s), s = nge.objects.create(e, s, !0), o && s.setAnimationByName(0, o, l, i), s
                }

                function n() {
                    g.setAnimationByName(0, "flash", !1)
                }

                function s(e) {
                    "luckyMill" === e && nge.localData.get("luckyMill.restored") && nge.localData.get("luckyMill.symbolPosition") && j(), ("luckyMill" === e || "game" === e) && nge.localData.get("freeGame.inProgress") && (e = nge.findOne("^offersFreespinCounter")) && (e.visible = !0)
                }
                var o, l, i, p, r, m, u, c, g, y, b, h, f, _ = this,
                    x = !1,
                    d = !1,
                    N = [],
                    S = !1,
                    w = [],
                    M = 0,
                    A = 0,
                    k = 0,
                    v = !1,
                    C = !1;
                this.create = function() {
                    this.createDefault(), x || (_.subscribe(), x = !0), o = this.getInstance("Cfg"), l = nge.findOne("^luckyMill"), h = nge.findOne("^glowMultiplierAnimationContainer"), N = [];
                    for (var e = 0; 10 > e; e++) N.push(nge.findOne("^wheelMultiplier" + e));
                    i = nge.findOne("^wheelMaskContainer"), (e = nge.objects.create(new nge.Mlm.Objects.Mask({
                        rects: [
                            [-350, -350, 750, 600]
                        ]
                    }))).cacheAsBitmap = !0, e.dirty = !0, i.add(e), i.mask = e, p = nge.findOne("^multipliersMaskContainer"), (e = nge.objects.create(new nge.Mlm.Objects.Mask({
                        rects: [
                            [-330, -330, 750, 600]
                        ]
                    }))).cacheAsBitmap = !0, e.dirty = !0, p.add(e), p.mask = e, r = nge.findOne(o.wheel.containerSelector), m = a("waterfall_animation", "waterfall_animation", 365, 340, "waterfallAnimationContainer"), u = a("leaves_animation", "leaves_animation", 370, 330, "leavesAnimationContainer"), c = a("flash_animation", "flash_top_animation", 375, 180, "flashAnimationContainer"), g = a("flash_animation", "flash_bottom_animation", 375, 580, "flashAnimationContainer"), y = a("multipliers_animation", "multipliers_animation", 0, 180, "movingMultipliersContainer"), b = a("multipliers_animation", "multiplier_glow_animation", 20, 55, "glowMultiplierAnimationContainer"), v = S = d = !1
                };
                var P = function(a) {
                    nge.localData.get("pickBonusWon") && (v && v.isRunning && (v.stop(!0), l.y = 800, d = l.visible = !1, m.stop(), u.stop()), F(), e = a.reel, t = a.row, l.x = 232 * (a.reel - 1) + 689, l.y = 200 * (a.row - 1) + 395, l.visible = !0, m.setAnimationByName(0, "waterfall", !0), u.setAnimationByName(0, "leaves", !0), d = !0, nge.localData.set("luckyMill.showed", !0))
                };
                this.correctFinalPosition = function(e) {
                    return 0 === k ? e : 1 === k ? 1.3 * e : 2 === k ? 1.1 * e : void 0
                };
                var T = function(e, t, a, n) {
                        0 === k ? ((e = nge.tween.add(t).to({
                            angle: a
                        }, 6e3, nge.Lib.Tween.Easing.Back.Out, !1)).onComplete.addOnce((function() {
                            n && n()
                        }), this), e.start()) : 1 === k ? ((e = nge.tween.add(t).to({
                            angle: a
                        }, 6e3, nge.Lib.Tween.Easing.Quintic.Out, !1)).onUpdateCallback((function(e, s) {
                            .99 < s && (e.stop(), e = a - 7.2, (e = nge.tween.add(t).to({
                                angle: e
                            }, 1600, nge.Lib.Tween.Easing.Sinusoidal.Out, !1)).onComplete.addOnce((function() {
                                n && n()
                            }), this), e.start())
                        })), e.start()) : 2 === k && ((e = nge.tween.add(t).to({
                            angle: a
                        }, 6e3, nge.Lib.Tween.Easing.Quintic.Out, !1)).onUpdateCallback((function(e, t) {
                            .99 < t && (e.stop(), n && n())
                        })), e.start())
                    },
                    B = function() {
                        nge.localData.set("bonusWheel.spinning", !0), nge.observer.fire("buttons.updateState"), k = nge.Lib.Helper.getRandomInt(0, 2), f = null;
                        var e = o.wheelSectors.length,
                            t = 360 / e,
                            a = o.minLoops;
                        C = nge.tween.add(r), nge.observer.fire("luckyMill.started"), C.to({
                            angle: r.angle + o.speedUpAngle
                        }, 1550, nge.Lib.Tween.Easing.Back.In, !1), C.onComplete.addOnce((function() {
                            nge.observer.fire("luckyMill.loopStarted"), (C = nge.tween.add(r).to({
                                angle: r.angle + 360
                            }, o.loopTime, nge.Lib.Tween.Easing.Linear.None, !1)).loop(!0), C.onLoop.add((function() {
                                if (!(0 < --a) && f) {
                                    C.stop(), r.angle %= 360;
                                    for (var n = r.angle, s = parseInt(f.index, 10), l = (e - s - 1) * t + o.wheel.pointerAngle + _.correctFinalPosition(t), i = l - o.slowDownAngle; i < n;) i += 360, l += 360;
                                    n = (i - n) / 360 * o.loopTime, (C = nge.tween.add(r).to({
                                        angle: i
                                    }, n, nge.Lib.Tween.Easing.Linear.None, !1)).onComplete.addOnce((function() {
                                        nge.observer.fire("luckyMill.stopStarted"), T(C, r, l, (function() {
                                            nge.observer.fire("luckyMill.stopped", {
                                                sector: s,
                                                value: f.value
                                            })
                                        }))
                                    }), this), C.start()
                                }
                            }), this), C.start()
                        }), this), C.start()
                    },
                    I = function() {
                        if (d) {
                            var t = e;
                            (v = nge.tween.add({
                                y: 0
                            })).to({
                                y: 800
                            }, 620), v.onUpdateCallback((function(e, a) {
                                l.y += 117.6 * a + 3.5 * (4 - t)
                            })), v.onComplete.addOnce((function() {
                                l.y = 800, d = l.visible = !1, m.stop(), u.stop()
                            })), v.start(), nge.localData.set("luckyMill.showed", !1)
                        }
                    },
                    E = function() {
                        if (d) {
                            var a = 40 * e + (160 - 40 * t),
                                n = nge.Lib.Helper.getRandomInt(0, 1);
                            n = 0 === n ? -1 : 1, nge.tween.add(l).to({
                                angle: 0
                            }, a).to({
                                angle: .5 * n
                            }, 80).to({
                                angle: -1.5 * n
                            }, 60).to({
                                angle: 2 * n
                            }, 60).to({
                                angle: -2 * n
                            }, 80).to({
                                angle: 1.5 * n
                            }, 80).to({
                                angle: -1 * n
                            }, 80).to({
                                angle: .5
                            }, 80).to({
                                angle: 0
                            }, 80).start()
                        }
                    },
                    G = function(e) {
                        f = e.bonusItem, "true" !== e.lastPick && (e = parseInt(f.index, 10), M += +o.wheelSectors[e].value)
                    },
                    W = function() {
                        S = !1;
                        var e = nge.localData.get("bonusGame.lastResponse"),
                            t = nge.Lib.Money.toCoinsInt(nge.localData.get("totalBet.value")),
                            a = nge.Lib.Money.toCoinsInt(e.params.totalBonusWin);
                        nge.localData.set("pickBonus.totalWin", e.params.totalBonusWin), nge.observer.fire("luckyMill.winField.showVFX"), nge.observer.fire("luckyMill.endPopup.play"), b.stop(), nge.observer.fire("popup.show", {
                            popupName: "luckyMillEndPopup",
                            totalWin: a,
                            totalMultiplier: M,
                            totalBet: t,
                            onClick: function() {
                                nge.observer.fire("popup_disappear.play"), nge.localData.set("bonusWheel.spinning", !1)
                            },
                            onHide: function() {
                                nge.observer.fire("luckyMill.popupHided")
                            }
                        })
                    },
                    O = function(e, t, a) {
                        var n = {
                            step: 0
                        };
                        N.forEach((function(s) {
                            var o = nge.tween.add(n).to({
                                step: 1
                            }, a);
                            o.onUpdateCallback((function() {
                                s.alpha = nge.Lib.Math.linear(e, t, n.step)
                            })), o.onComplete.add((function() {
                                s.alpha = t
                            })), o.start()
                        }))
                    },
                    Y = function(e, t) {
                        return e = nge.Mlm.Objects.Image({
                            assetKey: "wheelCell_x" + t,
                            name: "movingMultiplier" + e,
                            x: 0,
                            y: 0,
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !0
                        }), t = nge.findOne("^movingMultipliersContainer"), nge.objects.create(e, t, !0)
                    },
                    K = function() {
                        1 === A ? (b.x = 15, nge.rafSetTimeout((function() {
                            b.setAnimationByName(0, "multiplier_glow", !0)
                        }), 1)) : b.x = 2 === A ? 85 : 3 === A ? 160 : 4 === A ? 225 : 295
                    },
                    D = function(e) {
                        var t = nge.localData.get("bonusGame.lastResponse");
                        t && "true" === t.lastPick ? (nge.observer.fire("luckyMill.stageComplete", A), function(e) {
                            e = nge.findOne("^wheelMultiplier" + e.sector);
                            var t = 1 / nge.assets.getQualityFactor(),
                                a = 1.15 / nge.assets.getQualityFactor();
                            nge.tween.add(e.scale).to({
                                x: a,
                                y: a
                            }, 500).to({
                                x: t,
                                y: t
                            }, 500).start(), nge.observer.fire("luckyMill.collect.play")
                        }(e)) : (c.setAnimationByName(0, "flash", !1), O(1, .6, 300), e = Y(A, e.value), S = !0, y.onEvent.add((function(e, t) {
                            "flash_bottom_animation" === t.data.name && (e = 375, 2 === A ? e = 510 : 3 === A ? e = 594 : 4 <= A && (e = 650), g.x = e, nge.observer.fire("luckyMill.playFlashAnimation", null, 1))
                        }), _), y.setAnimationByName(0, "multiplier_fly_" + (5 > A ? A : "unlimited"), !1, !0), 0 !== A && nge.tween.add(h).to({
                            alpha: 0
                        }, 200).start(), nge.observer.fire("luckyMill.multiplierFly.play", null, 1), y.onComplete.addOnce((function() {
                            nge.observer.fire("luckyMill.stageComplete", A),
                                function(e) {
                                    if (5 <= e) {
                                        S = !1, (e = w.shift()).followSlot.currentSprite.parent.removeChild(e.item), nge.Lib.Helper.objectDelete(e.item, !0);
                                        var t = 0;
                                        w.forEach((function(e) {
                                            e.followSlot = y.findSprite("multiplier_" + t), t++
                                        }))
                                    }
                                }(A), A++, O(.6, 1, 300), nge.tween.add(h).to({
                                    alpha: 1
                                }, 200).start(), K()
                        })), t = y.findSprite("multiplier_" + (5 > A ? A : "unlimited")), w.push({
                            item: e,
                            followSlot: t
                        }))
                    };
                this.update = function() {
                    S && w.forEach((function(e) {
                        if (e.followSlot) {
                            var t = e.followSlot.currentSprite;
                            e.item.parent !== t.parent && (t.visible = !1, e.item.scale.y = -1 / nge.assets.getQualityFactor(), t.parent.addChild(e.item))
                        }
                    }))
                };
                var F = function() {
                        M = A = 0, S = !1, w.forEach((function(e) {
                            e.item.visible = !1, e.item.x = 0, e.item.y = 0
                        })), w.forEach((function(e) {
                            e.followSlot.currentSprite.parent.removeChild(e.item), nge.Lib.Helper.objectDelete(e.item, !0)
                        })), w = [], r.angle = 0, N.forEach((function(e) {
                            e.visible = !0
                        }))
                    },
                    j = function() {
                        var e = nge.localData.get("luckyMill.symbolPosition");
                        P(e), nge.localData.set("slotMachine.state", "PickBonus"), nge.observer.fire("buttons.updateState"), nge.observer.fire("luckyMill.enableButton");
                        var t = nge.localData.get("luckyMill.items");
                        if (A = t.length || 0, M = 0, 0 !== A) {
                            for (e = 0; e < t.length; e++) M += +t[e].value;
                            e = o.wheelSectors.length, r.angle = 360 / e * (e - +t[0].index - 1) + 360 / e, e = "multiplier_static_" + (5 > A ? A - 1 : 4), y.setAnimationByName(0, e, !1, !0), t = t.slice(0, 5).reverse();
                            for (var a = 0; a < t.length; a++) {
                                var n = Y(a, t[a].value),
                                    s = y.findSprite("multiplier_" + a);
                                w.push({
                                    item: n,
                                    followSlot: s
                                })
                            }
                            S = !0, y.setAnimationByName(0, e, !1, !0), y.onComplete.addOnce((function() {
                                S = !1
                            })), K(), b.setAnimationByName(0, "multiplier_glow", !0)
                        }
                    },
                    R = function() {
                        C && C.isRunning && C.stop(), nge.localData.set("bonusWheel.spinning", !1)
                    };
                this.subscribe = function() {
                    nge.observer.add("luckyMill.showLuckyMillContainer", P), nge.observer.add("pickBonus.sendRequest", B), nge.observer.add("pickBonus.actionResponse", G), nge.observer.add("pickBonus.lastStage", W), nge.observer.add("luckyMill.stopped", D, !1, !0), nge.observer.add("slotMachine.spinStart", I), nge.observer.add("slotMachine.spinCommandAnimation", E), nge.observer.add("luckyMill.playFlashAnimation", n), nge.observer.add("layersSwitcher.switched", s), nge.observer.add("Transport.close", R)
                }
            }))
        },
        1124: function(e, t) {
            nge.App[nge.appNS].Com.LuckyMill.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            key: "luckyMillGrassMask",
                            fullPath: nge.appPath + "img/playarea/luckyMillGrassMask.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: 1,
                            name: "luckyMill",
                            isVisible: !1,
                            contents: [{
                                type: 0,
                                name: "luckyMillGrassMask",
                                assetKey: "luckyMillGrassMask",
                                x: -350,
                                y: 135
                            }, {
                                type: 1,
                                name: "multipliersMaskContainer",
                                contents: [{
                                    type: 1,
                                    name: "movingMultipliersContainer",
                                    x: 13,
                                    y: -167,
                                    contents: []
                                }]
                            }, {
                                type: 1,
                                name: "flashAnimationContainer",
                                x: -350,
                                y: -350,
                                contents: []
                            }, {
                                type: 1,
                                name: "glowMultiplierAnimationContainer",
                                x: 0,
                                y: 0,
                                contents: []
                            }, {
                                type: 0,
                                name: "luckyMillName",
                                assetKey: "luckyMillName",
                                x: -269,
                                y: -316
                            }, {
                                type: 0,
                                name: "grass",
                                assetKey: "grass",
                                x: -350,
                                y: 133
                            }, {
                                type: 0,
                                name: "arrow",
                                assetKey: "arrow",
                                x: -70,
                                y: -159
                            }, {
                                type: 0,
                                name: "water",
                                assetKey: "water",
                                x: -315,
                                y: 148
                            }, {
                                type: 1,
                                name: "wheelMaskContainer",
                                contents: [{
                                    type: 1,
                                    name: "wheelContainer",
                                    x: 16,
                                    y: 136,
                                    contents: [{
                                        type: 0,
                                        name: "wheelMultiplier0",
                                        assetKey: "wheelCell_x1",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: -5,
                                        y: -301,
                                        angle: 1.5
                                    }, {
                                        type: 0,
                                        name: "wheelMultiplier1",
                                        assetKey: "wheelCell_x3",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: 178,
                                        y: -242,
                                        angle: 39
                                    }, {
                                        type: 0,
                                        name: "wheelMultiplier2",
                                        assetKey: "wheelCell_x2",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: 284,
                                        y: -93,
                                        angle: 73
                                    }, {
                                        type: 0,
                                        name: "wheelMultiplier3",
                                        assetKey: "wheelCell_x10",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: 283,
                                        y: 87,
                                        angle: 106.5
                                    }, {
                                        type: 0,
                                        name: "wheelMultiplier4",
                                        assetKey: "wheelCell_collect",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: 176,
                                        y: 243,
                                        angle: 143.5
                                    }, {
                                        type: 0,
                                        name: "wheelMultiplier5",
                                        assetKey: "wheelCell_x1",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: -1,
                                        y: 299,
                                        angle: 179.5
                                    }, {
                                        type: 0,
                                        name: "wheelMultiplier6",
                                        assetKey: "wheelCell_x5",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: -174,
                                        y: 243,
                                        angle: -145.5
                                    }, {
                                        type: 0,
                                        name: "wheelMultiplier7",
                                        assetKey: "wheelCell_x2",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: -285,
                                        y: 95,
                                        angle: -109
                                    }, {
                                        type: 0,
                                        name: "wheelMultiplier8",
                                        assetKey: "wheelCell_x30",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: -285,
                                        y: -90,
                                        angle: -69
                                    }, {
                                        type: 0,
                                        name: "wheelMultiplier9",
                                        assetKey: "wheelCell_collect",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: -177,
                                        y: -242,
                                        angle: -36
                                    }, {
                                        type: 0,
                                        name: "wheel",
                                        assetKey: "wheel",
                                        anchorX: .5,
                                        anchorY: .5
                                    }]
                                }]
                            }, {
                                type: 1,
                                name: "waterfallAnimationContainer",
                                x: -350,
                                y: -350,
                                contents: []
                            }, {
                                type: 1,
                                name: "leavesAnimationContainer",
                                x: -350,
                                y: -350,
                                contents: []
                            }, {
                                type: 0,
                                name: "leaves",
                                assetKey: "leaves",
                                x: -350,
                                y: -350
                            }]
                        }]
                    }
                }
            }
        },
        1125: function(e, t) {
            nge.App[nge.appNS].Com.Mushroom = {}
        },
        1126: function(e, t) {
            nge.App[nge.appNS].Com.Mushroom.Controller = nge.Com.Base.extend((function() {
                function e(e, t, a, n, s, o, l, i) {
                    return e = nge.Mlm.Objects.Spine({
                        assetKey: e,
                        name: t,
                        x: a,
                        y: n,
                        isVisible: !1
                    }), s = nge.findOne("^" + s), s = nge.objects.create(e, s, !0), o && s.setAnimationByName(0, o, l, i), s
                }

                function t(e) {
                    p.setAnimationByName(0, "bang_" + e, !1), r.setAnimationByName(0, "mushroom_effect", !1), m.setAnimationByName(0, "stage_on_" + e, !1, !0),
                        function() {
                            c.alpha = 0, c.visible = !0;
                            var e = nge.tween.add(c).to({
                                alpha: .5
                            }, 400, nge.Lib.Tween.Easing.Sinusoidal.Out).to({
                                alpha: 0
                            }, 500, nge.Lib.Tween.Easing.Sinusoidal.Out);
                            e.onComplete.addOnce((function() {
                                c.alpha = 0, c.visible = !1
                            })), e.start()
                        }()
                }

                function a(t, a) {
                    m = e("mushroom_multiplier", "bg_spine_mushroom_multiplier", t, a, "mushroomAnimationContainer")
                }

                function n(t, a) {
                    p = e("mushroom_bang", "bg_spine_mushroom_bang", t, a, "mushroomAnimationContainer")
                }

                function s(t, a) {
                    r = e("mushroom_effect", "bg_spine_mushroom_effect", t, a, "mushroomAnimationContainer")
                }

                function o() {
                    0 !== h && m.setAnimationByName(0, "stage_off_" + h, !1), h = 0
                }

                function l() {
                    7 <= h || (h++, nge.observer.fire("mushroom.playAnimationOn", h, 300))
                }

                function i(e) {
                    b && u ? (u.x = 10, u.y = 50, c && (c.x = 10, c.y = 50), a(-591, 520), n(-591, 500), s(-591, 530)) : (a(960, 540), n(960, 520), s(960, 550))
                }
                var p, r, m, u, c, g = this,
                    y = !1,
                    b = !1,
                    h = 0;
                this.create = function() {
                    this.createDefault(), y || (g.subscribe(), y = !0), b = nge.Lib.Helper.mobileAndTabletCheck(), u = nge.findOne("^slotMachineMushroom"), (c = nge.findOne("^slotMachineMushroomAdditive")) && (c.visible = !1, c.blendMode = PIXI.BLEND_MODES.ADD), h = 0
                }, this.subscribe = function() {
                    nge.observer.add("StatesManager.create.end", i), nge.observer.add("slotMachine.spinCommand", o), nge.observer.add("winlines.animateAll", l), nge.observer.add("mushroom.playAnimationOn", t)
                }
            }))
        },
        1127: function(e, t) {
            nge.App[nge.appNS].Com.Leprechaun.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {}
                }
            }
        },
        1128: function(e, t) {
            nge.App[nge.appNS].Com.Popup = {}
        },
        1129: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Cfg = nge.App.DjGameBase.Com.Popup.Cfg.extend((function() {
                var e = {
                        font: "60pt introBlack",
                        fill: 15590332,
                        stroke: 9449728,
                        strokeThickness: 8,
                        shadowColor: 0,
                        shadowStroke: !0,
                        shadowFill: !1,
                        shadowBlur: 10,
                        shadowOffsetY: .1,
                        align: "center"
                    },
                    t = {
                        font: "46pt introBlack",
                        fill: "#EDE3BC",
                        stroke: "#903100",
                        strokeThickness: 6,
                        shadowColor: "#000000",
                        shadowStroke: !0,
                        shadowFill: !1,
                        shadowBlur: 6,
                        shadowOffsetY: .1,
                        align: "center"
                    },
                    a = {
                        font: "44pt introBlack",
                        fill: "#EDE3BC",
                        stroke: "#903100",
                        strokeThickness: 6,
                        shadowColor: "#000000",
                        shadowStroke: !0,
                        shadowFill: !1,
                        shadowBlur: 8,
                        shadowOffsetY: .1,
                        align: "center"
                    },
                    n = {
                        font: "30pt introBlack",
                        fill: "#EDE3BC",
                        stroke: "#903100",
                        strokeThickness: 4,
                        shadowColor: "#000000",
                        shadowStroke: !0,
                        shadowFill: !1,
                        shadowBlur: 8,
                        shadowOffsetY: .1,
                        lineHeight: 45,
                        align: "center"
                    },
                    s = {
                        color: 0,
                        a: .7,
                        showDuration: 300,
                        hideDuration: 250,
                        hideDelay: 250
                    },
                    o = {
                        show: "popup_fs_appear",
                        loop: "popup_fs_loop",
                        hide: "popup_fs_disappear"
                    },
                    l = {
                        type: 4,
                        name: "okButton",
                        x: -10,
                        y: 343,
                        anchorX: .502,
                        anchorY: .497,
                        isVisible: !1,
                        class: "popupButton",
                        pixelPerfectOver: !1,
                        pixelPerfectClick: !1,
                        assetKey: "popupOkButtonAsset"
                    };
                this.cfg.popups = {
                    freespinStartPopup: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .58,
                                anchorY: .03,
                                size: 150,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinsCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_FREE_SPINS"),
                                anchorX: .5,
                                anchorY: -.2,
                                style: t
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    freespinAdditionalPopup: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .6,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .58,
                                anchorY: .15,
                                size: 150,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinsCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_ADDITIONAL"),
                                anchorX: .5,
                                anchorY: .2,
                                style: t
                            },
                            followSlotName: "ft_free_spins_text"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_FREE_SPINS"),
                                anchorX: .5,
                                anchorY: -.6,
                                style: a
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    freespinEndPopupS: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .52,
                                anchorY: 0,
                                size: 150,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinTotalWinCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_CREDITS"),
                                anchorX: .5,
                                anchorY: -.2,
                                style: t
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    freespinEndPopupM: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .52,
                                anchorY: 0,
                                size: 125,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinTotalWinCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_CREDITS"),
                                anchorX: .5,
                                anchorY: -.2,
                                style: t
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    freespinEndPopupL: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .52,
                                anchorY: 0,
                                size: 110,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinTotalWinCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_CREDITS"),
                                anchorX: .5,
                                anchorY: -.2,
                                style: t
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    luckyMillEndPopup: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: {
                                show: "popup_bonus_appear",
                                loop: "popup_bonus_loop",
                                hide: "popup_bonus_disappear"
                            }
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .85,
                                style: a
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .52,
                                anchorY: 1,
                                size: 115,
                                assetKey: "yellow_font"
                            },
                            dataKey: "totalWin",
                            followSlotName: "ft_credits_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_TOTAL_MULTIPLIER"),
                                anchorX: .5,
                                anchorY: .5,
                                style: n
                            },
                            followSlotName: "ft_with_text"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .5,
                                anchorY: .4,
                                size: 80,
                                assetKey: "yellow_font"
                            },
                            dataKey: "totalMultiplier",
                            followSlotName: "ft_xMult_text"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "x",
                                anchorX: .5,
                                anchorY: 1.15,
                                size: 90,
                                assetKey: "yellow_font"
                            },
                            followSlotName: "ft_credits_text"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_TOTAL_BET"),
                                anchorX: .46,
                                anchorY: .5,
                                style: n
                            },
                            followSlotName: "ft_mult_text"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .5,
                                anchorY: .4,
                                size: 80,
                                assetKey: "yellow_font"
                            },
                            dataKey: "totalBet",
                            followSlotName: "ft_mult_text2"
                        }]
                    },
                    insufficientFundsPopup: {
                        shadow: s,
                        background: {
                            type: "static",
                            assetKey: "notificationPopupBackground",
                            durations: {
                                show: 500,
                                hide: 510
                            }
                        },
                        button: {
                            type: 4,
                            name: "okButton",
                            x: 0,
                            y: 300,
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1,
                            class: "popupButton",
                            assetKey: "notificationOkButtonAsset",
                            pixelPerfectOver: !1,
                            pixelPerfectClick: !1
                        },
                        content: [{
                            model: {
                                type: 2,
                                text: nge.i18n.get("INSUFFICIENT_FUNDS"),
                                anchorX: .5,
                                anchorY: .5,
                                y: -45,
                                maxWidth: 670,
                                style: {
                                    font: "52pt futuraptheavy",
                                    fill: "#fff"
                                }
                            }
                        }, {
                            model: {
                                type: 2,
                                text: nge.i18n.get("Please_deposit_more"),
                                anchorX: .5,
                                maxWidth: 870,
                                anchorY: .5,
                                y: 55,
                                style: {
                                    font: "30pt futuraptheavy",
                                    fill: "#efe1bf",
                                    align: "center"
                                }
                            }
                        }]
                    }
                }
            }))
        },
        1130: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Tpl = function(e) {
                var t = e;
                return t || (t = nge.appPath + "img/"), (e = nge.App.DjGameBase.Com.Popup.Tpl(e)).assets.contents = [{
                    type: mt.assets.IMAGE,
                    key: "notificationPopupBackground",
                    fullPath: t + "playarea/popupNotificationsBg.png"
                }, {
                    type: mt.assets.IMAGE,
                    key: "popupOkButtonAsset",
                    width: 732,
                    height: 112,
                    frameWidth: 244,
                    fullPath: t + "playarea/popupAnimationOkButton.png"
                }, {
                    type: mt.assets.IMAGE,
                    key: "notificationOkButtonAsset",
                    width: 900,
                    height: 140,
                    frameWidth: 300,
                    fullPath: t + "playarea/popupNotificationsOkButton(spritesX=3)_button.png"
                }], e
            }
        },
        1131: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Lang_ru = {}
        },
        1132: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Lang_ru.Cfg = nge.App.DjGameBase.Com.Popup.Cfg.extend((function() {
                var e = {
                        font: "52pt introBlack",
                        fill: "#EDE3BC",
                        stroke: "#903100",
                        strokeThickness: 6,
                        shadowColor: "#000000",
                        shadowStroke: !0,
                        shadowFill: !1,
                        shadowBlur: 8,
                        shadowOffsetY: .1,
                        align: "center"
                    },
                    t = {
                        font: "46pt introBlack",
                        fill: "#EDE3BC",
                        stroke: "#903100",
                        strokeThickness: 6,
                        shadowColor: "#000000",
                        shadowStroke: !0,
                        shadowFill: !1,
                        shadowBlur: 8,
                        shadowOffsetY: .1,
                        align: "center"
                    },
                    a = {
                        font: "41pt introBlack",
                        fill: "#EDE3BC",
                        stroke: "#903100",
                        strokeThickness: 6,
                        shadowColor: "#000000",
                        shadowStroke: !0,
                        shadowFill: !1,
                        shadowBlur: 8,
                        shadowOffsetY: .1,
                        align: "center"
                    },
                    n = {
                        font: "28pt introBlack",
                        fill: "#EDE3BC",
                        stroke: "#903100",
                        strokeThickness: 4,
                        shadowColor: "#000000",
                        shadowStroke: !0,
                        shadowFill: !1,
                        shadowBlur: 8,
                        shadowOffsetY: .1,
                        lineHeight: 45,
                        align: "center"
                    },
                    s = {
                        color: 0,
                        a: .7,
                        showDuration: 300,
                        hideDuration: 250,
                        hideDelay: 250
                    },
                    o = {
                        show: "popup_fs_appear",
                        loop: "popup_fs_loop",
                        hide: "popup_fs_disappear"
                    },
                    l = {
                        type: 4,
                        name: "okButton",
                        x: -10,
                        y: 343,
                        anchorX: .502,
                        anchorY: .497,
                        isVisible: !1,
                        class: "popupButton",
                        pixelPerfectOver: !1,
                        pixelPerfectClick: !1,
                        assetKey: "popupOkButtonAsset"
                    };
                this.cfg.popups = {
                    freespinStartPopup: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .58,
                                anchorY: .03,
                                size: 150,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinsCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_FREE_SPINS"),
                                anchorX: .5,
                                anchorY: -.2,
                                style: t
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    freespinAdditionalPopup: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .6,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .58,
                                anchorY: .15,
                                size: 150,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinsCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_ADDITIONAL"),
                                anchorX: .5,
                                anchorY: .2,
                                style: a
                            },
                            followSlotName: "ft_free_spins_text"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_FREE_SPINS"),
                                anchorX: .5,
                                anchorY: -.6,
                                style: a
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    freespinEndPopupS: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .52,
                                anchorY: 0,
                                size: 150,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinTotalWinCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_CREDITS"),
                                anchorX: .5,
                                anchorY: -.2,
                                style: t
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    freespinEndPopupM: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .52,
                                anchorY: 0,
                                size: 125,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinTotalWinCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_CREDITS"),
                                anchorX: .5,
                                anchorY: -.2,
                                style: t
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    freespinEndPopupL: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: o
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .52,
                                anchorY: 0,
                                size: 110,
                                assetKey: "yellow_font"
                            },
                            dataKey: "freespinTotalWinCounter",
                            followSlotName: "ft_freespin_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_CREDITS"),
                                anchorX: .5,
                                anchorY: -.2,
                                style: t
                            },
                            followSlotName: "ft_free_spins_text"
                        }]
                    },
                    luckyMillEndPopup: {
                        shadow: s,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: {
                                show: "popup_bonus_appear",
                                loop: "popup_bonus_loop",
                                hide: "popup_bonus_disappear"
                            }
                        },
                        button: l,
                        content: [{
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_YOU_WON"),
                                anchorX: .5,
                                anchorY: .85,
                                style: {
                                    font: "44pt introBlack",
                                    fill: "#EDE3BC",
                                    stroke: "#903100",
                                    strokeThickness: 6,
                                    shadowColor: "#000000",
                                    shadowStroke: !0,
                                    shadowFill: !1,
                                    shadowBlur: 8,
                                    shadowOffsetY: .1,
                                    align: "center"
                                }
                            },
                            followSlotName: "ft_you_won"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .52,
                                anchorY: 1.05,
                                size: 115,
                                assetKey: "yellow_font"
                            },
                            dataKey: "totalWin",
                            followSlotName: "ft_credits_counter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_TOTAL_MULTIPLIER"),
                                anchorX: .5,
                                anchorY: .5,
                                style: n
                            },
                            followSlotName: "ft_with_text"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .5,
                                anchorY: .5,
                                size: 80,
                                assetKey: "yellow_font"
                            },
                            dataKey: "totalMultiplier",
                            followSlotName: "ft_xMult_text"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "x",
                                anchorX: .5,
                                anchorY: 1.15,
                                size: 90,
                                assetKey: "yellow_font"
                            },
                            followSlotName: "ft_credits_text"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_TOTAL_BET"),
                                anchorX: .46,
                                anchorY: .5,
                                style: n
                            },
                            followSlotName: "ft_mult_text"
                        }, {
                            model: {
                                type: 7,
                                isVisible: !1,
                                text: "12",
                                anchorX: .5,
                                anchorY: .5,
                                size: 80,
                                assetKey: "yellow_font"
                            },
                            dataKey: "totalBet",
                            followSlotName: "ft_mult_text2"
                        }]
                    },
                    insufficientFundsPopup: {
                        shadow: s,
                        background: {
                            type: "static",
                            assetKey: "notificationPopupBackground",
                            durations: {
                                show: 500,
                                hide: 510
                            }
                        },
                        button: {
                            type: 4,
                            name: "okButton",
                            x: 0,
                            y: 300,
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1,
                            class: "popupButton",
                            assetKey: "notificationOkButtonAsset",
                            pixelPerfectOver: !1,
                            pixelPerfectClick: !1
                        },
                        content: [{
                            model: {
                                type: 2,
                                text: nge.i18n.get("INSUFFICIENT_FUNDS"),
                                anchorX: .5,
                                anchorY: .5,
                                y: -45,
                                maxWidth: 670,
                                style: {
                                    font: "52pt futuraptheavy",
                                    fill: "#fff"
                                }
                            }
                        }, {
                            model: {
                                type: 2,
                                text: nge.i18n.get("Please_deposit_more"),
                                anchorX: .5,
                                maxWidth: 870,
                                anchorY: .5,
                                y: 55,
                                style: {
                                    font: "30pt futuraptheavy",
                                    fill: "#efe1bf",
                                    align: "center"
                                }
                            }
                        }]
                    }
                }
            }))
        },
        1133: function(e, t) {
            nge.App[nge.appNS].Com.RegularWin = {}
        },
        1134: function(e, t) {
            nge.App[nge.appNS].Com.RegularWin.Controller = nge.App.DjGameBase.Com.RegularWin.Controller.extend((function() {
                var e = this;
                this.showWinlinesOnComplete = function() {
                    e.rafAnimateByOneId = nge.rafSetTimeout((function() {
                        nge.observer.fire("winlines.animateByOne.cycleComplete")
                    }), 500)
                }
            }))
        },
        1135: function(e, t) {
            nge.App[nge.appNS].Com.RegularWin.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {
                        contents: [{
                            type: 1,
                            name: "regularWinContainer",
                            x: 932,
                            y: 480,
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1,
                            contents: [{
                                type: 7,
                                name: "regularWinCounter",
                                isVisible: !1,
                                x: 0,
                                y: 0,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "yellow_font",
                                size: 130
                            }]
                        }]
                    }
                }
            }
        },
        1136: function(e, t) {
            nge.App[nge.appNS].Com.SettingsScreen = {}
        },
        1137: function(e, t) {
            nge.App[nge.appNS].Com.SettingsScreen.Controller = nge.App.DjGameBase.Com.SettingsScreen.Controller.extend((function() {
                var e = this;
                this.switchTurboMode = function(t) {
                    e.super.switchTurboMode(t), e.slotMachineConfig.th = e.thOld
                }
            }))
        },
        1138: function(e, t) {
            nge.App[nge.appNS].Com.SettingsSimple = {}
        },
        1139: function(e, t) {
            nge.App[nge.appNS].Com.SettingsSimple.Controller = nge.Com.Base.extend((function() {
                var e, t = !1,
                    a = !1,
                    n = void 0;
                this.create = function() {
                    this.createDefault(), nge.localData.set("settings.initAudioSliderDone", !1), a = nge.Lib.Helper.mobileAndTabletCheck(), t = nge.App.getInstance("Mlm.StatesManager.Cfg").params.lazyLoad, void 0 !== (n = nge.Lib.Helper.parseGetParams("soundForceState")) && -1 !== "on off true false enable disable".split(" ").indexOf(n.toLowerCase()) && (n = -1 !== ["on", "true", "enable"].indexOf(n.toLowerCase()));
                    var u = nge.Lib.Helper.getCookie("audioVolume");
                    return void 0 === u && (u = 1), u = parseFloat(u), i(u), u = nge.localData.get("visibilityStatus.isInvisible"), nge.localData.set("settings.soundsInvisible", u), void 0 === (u = nge.localData.get("settings.soundsRequested")) && (u = !a, void 0 !== n && (u = n), nge.localData.set("settings.soundsRequested", u)), void 0 === (u = nge.localData.get("settings.soundsTurnedOn")) && (u = "true" === nge.Lib.Helper.getCookie("audioTurnedOff"), a || nge.Lib.Helper.getCookie("audioTurnedOff"), u = !u && (void 0 !== n ? n : !a), nge.localData.set("settings.soundsTurnedOn", u)), r(), p(), e || (nge.observer.add("sounds.preloaded", m), nge.observer.add("settings.soundSwitch", g), nge.observer.add("StatesManager.create.end", s), nge.observer.add("window.visibilitychange", o), nge.observer.add("settingsSimple.volumeChangedBySlider", l), nge.observer.add("settings.initAudioSlider.done", y)), e = !0
                };
                var s = function(e) {
                        "play" === e && (void 0 === (e = nge.localData.get("sounds.preload")) && !t || "done" === e || nge.observer.fire("sounds.preload.start"), nge.observer.fire("settings.initAudioSlider"), p(), a && n && nge.soundManager.preload())
                    },
                    o = function(e) {
                        nge.localData.set("settings.soundsInvisible", "visible" !== e), p()
                    },
                    l = function(e) {
                        nge.localData.get("settings.initAudioSliderDone") && (0 != +e && (nge.localData.set("settings.soundsRequested", !0), c()), u(.01 < e), i(e), r(), p())
                    },
                    i = function(e) {
                        nge.localData.set("settings.soundsVolume", e), nge.Lib.Helper.setCookie("audioVolume", e)
                    },
                    p = function() {
                        var e = nge.localData.get("settings.soundsVolume"),
                            t = nge.localData.get("settings.soundsEnabled"),
                            a = nge.localData.get("settings.soundsInvisible");
                        nge.observer.fire("sound.volumeAll", t && !a ? e : 0)
                    },
                    r = function() {
                        var e = nge.localData.get("settings.soundsRequested"),
                            t = "done" === nge.localData.get("sounds.preload"),
                            a = nge.localData.get("settings.soundsTurnedOn");
                        nge.localData.set("settings.soundsEnabled", e && t && a)
                    },
                    m = function() {
                        r(), p()
                    },
                    u = function(e) {
                        nge.localData.set("settings.soundsTurnedOn", e), nge.Lib.Helper.setCookie("audioTurnedOff", !e)
                    },
                    c = function() {
                        var e = nge.localData.get("sounds.preload");
                        void 0 === e && (u(!0), t || (nge.observer.fire("sounds.preload.start"), nge.soundManager.preload())), "done" === e && (e = nge.localData.get("settings.soundsTurnedOn"), u(!e), r(), p())
                    },
                    g = function() {
                        nge.localData.set("settings.soundsRequested", !0), .01 > nge.localData.get("settings.soundsVolume") && i(1), c()
                    },
                    y = function() {
                        nge.localData.set("settings.initAudioSliderDone", !0)
                    }
            }))
        },
        1140: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine = {}
        },
        1141: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.BigSymbol = Class.extend((function() {
                var e, t, a, n, s = ["1_big", "2_big", "3_big", "4_big", "5_big"];
                this.setContext = function(t) {
                    n = (e = t).setSymbolBase.bind(e), e.setSymbolBase = o
                };
                var o = function(a) {
                    n(a), e._texture.anchor.x = .5, e._texture.anchor.y = .5, s.includes(a.name) && (e._texture.anchor.x = .725, e._texture.anchor.y = .305, t = nge.findOne("^symbolTopContainer"))
                };
                this.divideAnimationShow = function(n, s, o) {
                    a || function() {
                        if (e.getConfig().spine && e._symbolConfig.spine.animation_divide_atlas) {
                            var n = nge.Mlm.Objects.Spine({
                                assetKey: e._symbolConfig.spine.animation_divide_atlas,
                                anchorX: .725,
                                anchorY: .305,
                                isVisible: !1
                            });
                            a = nge.objects.create(n, t, !0)
                        }
                    }(), e.changeTint(e.slotMachineCfg.tintNormal, e.slotMachineCfg.tintNormalAlpha, 0), a.onEvent.addOnce((function(e, t) {
                        "big_symbol_texture_hide" === t.data.name && s && s()
                    })), a.play({
                        name: e._symbolConfig.spine.animation_divide,
                        mode: nge.spine.DESTROY,
                        x: e.texture.x + e.texture.parent.x - .22 * e.texture.width,
                        y: e.texture.y + e.texture.parent.y + .2 * e.texture.height,
                        z: e.texture.z + (e._symbolConfig.animationOnTop ? 500 : 1)
                    }), a.setSpeed(n), a.onComplete.addOnce((function() {
                        o && o(), a && (a.stop(), a = nge.Lib.Helper.objectDelete(a, !0))
                    })), t.sort()
                }
            }))
        },
        1142: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Cfg = nge.App.DjGameBase.Com.SlotMachine.Cfg.extend((function() {
                this.params.wildSymbol = "0", this.params.tintDark = 10066329, this.params.tintNormal = 16777215, this.params.tintDarkAlpha = 1, this.params.tintNormalAlpha = 1, this.params.tweenType = "default", this.params.speedUpReelsFactor = 5, this.params.spinCompleteDelay = 200, this.params.maskName = "slotMachineMaskContainer", this.params.recyclerView.enabled = !1, this.params.symbolsBlurKeys = ["blank"], this.params.tweenDuration.newSymbols = 1200, this.params.tweenDuration.oldSymbols = 600, this.params.th = [4, 4, 4, 4, 4], this.params.tweenStartInterval = 0, this.params.mw = 5, this.params.mh = 4, this.params.imageHeight = "original", this.params.imageWidth = "original"
            }))
        },
        1143: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Controller = nge.App.DjGameBase.Com.SlotMachine.Controller.extend((function() {
                function e(e) {
                    m._service._view.animateSymbolBang(e)
                }

                function t(e) {
                    m._service._view.animateBigSymbolDivide(e)
                }

                function a(e) {
                    e = r[e];
                    var t = 0;
                    e.children.forEach((function(e) {
                        e.z = 10 - t, t += 1, -1 !== u.indexOf(e.getData().class) ? e.z += 10 : -1 !== c.indexOf(e.getData().class) ? e.z += 20 : -1 !== g.indexOf(e.getData().class) && (e.z += 30)
                    })), e.sort("z")
                }

                function n(e) {
                    var t = (e = r[e]).children;
                    t.forEach((function(e) {
                        e.y -= 30, e.z = 0
                    })), e.sort("z"), t = t.slice(Math.max(t.length - 4, 1));
                    var a = 0;
                    for (a = 0; a < t.length; a++) t[a].z = 8 - a, t[a].customData = {
                        row: 8 - (8 - a)
                    }, -1 !== u.indexOf(t[a].getData().class) ? t[a].z += 10 : -1 !== c.indexOf(t[a].getData().class) ? t[a].z += 20 : -1 !== g.indexOf(t[a].getData().class) && (t[a].z += 30);
                    e.sort("z")
                }

                function s(e) {
                    (e = r[e.symbolPosition.reel]).children.forEach((function(e) {
                        e.z = e.customData.row, -1 !== u.indexOf(e.getData().class) ? e.z = 10 - e.z + 10 : -1 !== c.indexOf(e.getData().class) ? e.z = 10 - e.z + 20 : -1 !== g.indexOf(e.getData().class) && (e.z = 10 - e.z + 30)
                    })), e.sort("z")
                }

                function o() {
                    p.sort()
                }
                var l, i, p, r, m = this,
                    u = ["3", "3_fs"],
                    c = ["3_big"],
                    g = ["1", "1_fs"];
                this.create = function() {
                    this.super.create(), l = this.getInstance("Cfg").get(), i = m._service._view, r = nge.findOne("^slotMachineGameContainer").children[0].children.slice(), p = nge.findOne("^symbolTopContainer"), r.forEach((function(e, t) {
                        a(t)
                    })), d(), m._service.setAnimationDelay(100)
                }, this.update = function() {
                    this.super.update && this.super.update(), this._service._view.update && this._service._view.update()
                }, this.createWinCoordsMap = function() {
                    var e = nge.localData.get("cascades.inProgress"),
                        t = nge.localData.get("cascades.currentIndex"),
                        a = nge.localData.get("slotMachine.slotWin.lineWinAmounts");
                    if (e && 0 !== t && (a = nge.localData.get("slotMachine.slotWin.lineWinAmountsStage" + (t + 1))), a && a.length) {
                        var n = [];
                        for (e && 0 !== t ? (e = nge.localData.get("slotMachine.spinResultStage" + (t + 1)), n = nge.Lib.Helper.jsObjClone(nge.Lib.Helper.rowsToColumns(e))) : n = nge.Lib.Helper.jsObjClone(nge.localData.get("slotMachine.spinResult.columns")), e = 0; e < n.length; e++)
                            for (t = 0; t < n[e].length; t++) n[e][t] = 0;
                        for (e = 0; e < a.length; e++)(t = a[e].wonSymbols) && t.forEach((function(e) {
                            n[e[0]][e[1]] = 1
                        }));
                        return nge.localData.set("slotMachine.winMap", n), n
                    }
                };
                var y = function() {
                        m._service.setAnimationDelay(50), m._service._view.spinStopHandler()
                    },
                    b = function() {
                        m._service.setAnimationDelay(100)
                    },
                    h = function() {
                        m._service._view.spinCompleteHandler()
                    },
                    f = function(e) {
                        m._service._view.changeSymbols(e)
                    },
                    _ = function(e) {
                        m._service._view.customSymbolStop(e.symbolObject, e.defaultY)
                    },
                    x = function() {
                        r.forEach((function(e, t) {
                            a(t)
                        })), d()
                    },
                    d = function() {
                        for (var e = 0; e < l.mw; e++)
                            for (var t = 0; t < l.mh; t++) {
                                var a = i.getSymbolByPosition({
                                    reel: e,
                                    row: t
                                });
                                a && (a.texture.customData = {
                                    row: t
                                })
                            }
                    },
                    N = function() {
                        for (var e = 0; e < l.mw; e++)
                            for (var t = 0; t < l.mh; t++) {
                                var a = i.getSymbolByPosition({
                                    reel: e,
                                    row: t
                                });
                                if (a) {
                                    var n = 40 * e + (160 - 40 * t),
                                        s = nge.Lib.Helper.getRandomInt(0, 1);
                                    s = 0 === s ? -1 : 1, nge.tween.add(a.texture).to({
                                        angle: 0
                                    }, n).to({
                                        angle: .5 * s
                                    }, 80).to({
                                        angle: -1.5 * s
                                    }, 60).to({
                                        angle: 2 * s
                                    }, 60).to({
                                        angle: -2 * s
                                    }, 80).to({
                                        angle: 1.5 * s
                                    }, 80).to({
                                        angle: -1 * s
                                    }, 80).to({
                                        angle: .5
                                    }, 80).to({
                                        angle: 0
                                    }, 80).start()
                                }
                            }
                    };
                this.customSubscribe = function() {
                    this.super.customSubscribe(), nge.observer.add("slotMachine.reel.newSymbolsAppended", n), nge.observer.add("cascade.appendSymbolsAnimationStart", s), nge.observer.add("winlines.show", o), nge.observer.add("slotMachine.sortAfterFreespins", x), nge.observer.add("slotMachine.animateSymbolBang", e), nge.observer.add("slotMachine.bigSymbol.divide", t), nge.observer.add("slotMachine.spinCommandAnimation", N), nge.observer.add("slotMachine.spinComplete", h), nge.observer.add("slotMachine.stopCommand", y), nge.observer.add("slotMachine.customSymbolStop", _), nge.observer.add("slotMachine.spinCommand", b), nge.observer.add("slotMachine.spinComplete", d), nge.observer.add("pickBonus.endGame", d), nge.observer.add("freespins.changeSymbols", f)
                }
            }))
        },
        1144: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Service = nge.Com.SlotMachine.Service.extend((function() {
                var e, t = this,
                    a = this.super.animateSymbol;
                this.animateSymbol = function(n, s) {
                    if (nge.localData.get("slotMachineSpinning") && !s) return !1;
                    var o = t._view.getSymbolByPosition(n);
                    return !(!o || !o.animate) && (nge.rafSetTimeout((function() {
                        a(n, s);
                        var e = nge.localData.get("symbol.animationSpeed");
                        e && o.setAnimationSpeed(e)
                    }), n.reel * e), !0)
                }, this.setAnimationDelay = function(t) {
                    e = t
                }
            }))
        },
        1145: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Symbol = nge.App.DjGameBase.Com.SlotMachine.Symbol.extend((function() {
                var e, t, a = this,
                    n = 1;
                this.init = function(e, a, n, s) {
                    return this.super.init(e, a, n, s), t = nge.findOne("^symbolTopContainer"), !0
                }, this.setAnimationSpeed = function(e) {
                    var t = a.getSymbolWinAnimation();
                    t && (t.setSpeed(e), n = e)
                }, this.animationCreate = function() {
                    if (this.super.animationCreate(), a.getConfig().spine && a._symbolConfig.spine.animation_bang_atlas) {
                        var n = nge.Mlm.Objects.Spine({
                            assetKey: a._symbolConfig.spine.animation_bang_atlas,
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1
                        });
                        e = nge.objects.create(n, t, !0)
                    }
                }, this.textureAnimationShow = function(e, n) {
                    this.super.textureAnimationShow(e, n), e = a.getSymbolWinAnimation(), t || (t = nge.findOne("^symbolTopContainer")), t && (t.add(e), e.x = a.texture.x + a.texture.parent.x, e.y = a.texture.y + a.texture.parent.y), e.z = 100 + .1 * e.x - .01 * e.y
                }, this.bangAnimationShow = function(n, s) {
                    e && (a.changeTint(a.slotMachineCfg.tintNormal, a.slotMachineCfg.tintNormalAlpha, 0), a.texture.visible = !1, e.play({
                        name: a._symbolConfig.spine.animation_bang,
                        mode: nge.spine.DESTROY,
                        x: a.texture.x + a.texture.parent.x,
                        y: a.texture.y + a.texture.parent.y,
                        z: a.texture.z + (a._symbolConfig.animationOnTop ? 500 : 0)
                    }), e.setSpeed(n), e.onComplete.addOnce((function() {
                        a.texture.visible = !0, s && s(), e && (e.stop(), e = nge.Lib.Helper.objectDelete(e, !0))
                    })), t.sort())
                };
                var s = function() {
                    var e = a.getSymbolWinAnimation();
                    e && e.setSpeed(2 * n)
                };
                this._subscribe = function() {
                    this.super._subscribe(), nge.observer.add("spinButton.speedUpSymbolsAnimation", s, "slotMachine.symbol." + a._sid + ".speedUp")
                }, this._unsubscribe = function() {
                    this.super._unsubscribe(), nge.observer.remove("spinButton.speedUpSymbolsAnimation", !1, "slotMachine.symbol." + a._sid + ".speedUp")
                }
            }))
        },
        1146: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Symbol1_big = nge.App[nge.appNS].Com.SlotMachine.BigSymbol.extend((function() {}))
        },
        1147: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Symbol2_big = nge.App[nge.appNS].Com.SlotMachine.BigSymbol.extend((function() {}))
        },
        1148: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Symbol3_big = nge.App[nge.appNS].Com.SlotMachine.BigSymbol.extend((function() {}))
        },
        1149: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Symbol4_big = nge.App[nge.appNS].Com.SlotMachine.BigSymbol.extend((function() {}))
        },
        1150: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Symbol5_big = nge.App[nge.appNS].Com.SlotMachine.BigSymbol.extend((function() {}))
        },
        1151: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Symbols = nge.Com.SlotMachine.Symbols.extend((function() {
                this.items = [{
                    name: "0",
                    textureUrl: "m00_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m00",
                        atlas: "m00_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "1",
                    textureUrl: "m01_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m01",
                        atlas: "m01_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "1_big",
                    textureUrl: "m01_big_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation_divide: "divide",
                        animation_divide_atlas: "symbol_big_divide"
                    },
                    repeat: 1
                }, {
                    name: "2",
                    textureUrl: "m02_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m02",
                        atlas: "m02_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "2_big",
                    textureUrl: "m02_big_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation_divide: "divide",
                        animation_divide_atlas: "symbol_big_divide"
                    },
                    repeat: 1
                }, {
                    name: "3",
                    textureUrl: "m03_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m03",
                        atlas: "m03_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "3_big",
                    textureUrl: "m03_big_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation_divide: "divide",
                        animation_divide_atlas: "symbol_big_divide"
                    },
                    repeat: 1
                }, {
                    name: "4",
                    textureUrl: "m04_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m04",
                        atlas: "m04_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "4_big",
                    textureUrl: "m04_big_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation_divide: "divide",
                        animation_divide_atlas: "symbol_big_divide"
                    },
                    repeat: 1
                }, {
                    name: "5",
                    textureUrl: "m05_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m05",
                        atlas: "m05_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "5_big",
                    textureUrl: "m05_big_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation_divide: "divide",
                        animation_divide_atlas: "symbol_big_divide"
                    },
                    repeat: 1
                }, {
                    name: "6",
                    textureUrl: "m06_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m06",
                        atlas: "m06_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "7",
                    textureUrl: "m07_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m07",
                        atlas: "m07_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "8",
                    textureUrl: "m08_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m08",
                        atlas: "m08_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "9",
                    textureUrl: "m09_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m09",
                        atlas: "m09_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "10",
                    textureUrl: "m10_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m10",
                        atlas: "m10_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "11",
                    textureUrl: "m11_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m11",
                        atlas: "m11_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "12",
                    textureUrl: "m12_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m12",
                        atlas: "m12_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "13",
                    textureUrl: "m13_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m13",
                        atlas: "m13_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "14",
                    textureUrl: "m14_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m14",
                        atlas: "m14_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "15",
                    textureUrl: "m15_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m15",
                        atlas: "m15_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "16",
                    textureUrl: "m16_000.png",
                    winlineTime: 1e3,
                    repeat: 1
                }, {
                    name: "0_fs",
                    textureUrl: "m00_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m00",
                        atlas: "m00_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "1_fs",
                    textureUrl: "m01_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m01_fs",
                        atlas: "m01_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "2_fs",
                    textureUrl: "m02_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m02_fs",
                        atlas: "m02_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "3_fs",
                    textureUrl: "m03_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m03_fs",
                        atlas: "m03_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "4_fs",
                    textureUrl: "m04_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m04_fs",
                        atlas: "m04_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "5_fs",
                    textureUrl: "m05_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m05_fs",
                        atlas: "m05_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "6_fs",
                    textureUrl: "m06_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m06_fs",
                        atlas: "m06_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "7_fs",
                    textureUrl: "m07_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m07_fs",
                        atlas: "m07_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "8_fs",
                    textureUrl: "m08_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m08_fs",
                        atlas: "m08_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "9_fs",
                    textureUrl: "m09_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m09_fs",
                        atlas: "m09_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "10_fs",
                    textureUrl: "m10_fs_000.png",
                    winlineTime: 1e3,
                    spine: {
                        animation: "m10_fs",
                        atlas: "m10_fs_Anim",
                        animation_bang: "bang",
                        animation_bang_atlas: "symbol_bang_fs"
                    },
                    animationOnTop: !0,
                    repeat: 1
                }, {
                    name: "blank",
                    textureUrl: "blank.png",
                    repeat: 1
                }, {
                    name: "blank_bottom",
                    textureUrl: "blank.png",
                    repeat: 1
                }]
            }))
        },
        1152: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: 1,
                            x: 0,
                            name: "dustAnimationContainer"
                        }, {
                            type: 1,
                            x: 0,
                            name: "symbolTopContainer"
                        }, {
                            type: 1,
                            name: "slotMachineMaskContainer",
                            x: -30,
                            y: -90,
                            width: 1220,
                            height: 900,
                            contents: [{
                                type: 1,
                                id: "slotMachineGameContainer",
                                name: "slotMachineGameContainer",
                                x: 30,
                                y: 90,
                                width: 1160,
                                height: 800
                            }]
                        }]
                    }
                }
            }
        },
        1153: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.View = nge.App.DjGameBase.Com.SlotMachine.View.extend((function() {
                function e(e, a, n) {
                    var s = e.getData().class;
                    if ("16" === s && nge.observer.fire("slotMachine.luckyMillSymbol.stopped"), n) {
                        n = !0;
                        for (var o = e.parent.x, l = 0; l < r.length; l++)
                            if (r[l].x === o && r[l].y === a) {
                                n = !1;
                                break
                            } n && t(s, e, a)
                    }
                }

                function t(e, t, o) {
                    -1 === s.indexOf(e) && t && t.parent && (e = t.parent.x, void 0 === p[e] && (p[e] = {}), void 0 === p[e][o] && (t = nge.Mlm.Objects.Spine({
                        assetKey: "symbol_dust",
                        anchorX: .5,
                        anchorY: .5,
                        isVisible: !1
                    }), p[e][o] = nge.objects.create(t, a, !0)), p[e][o].play({
                        name: "dust",
                        x: e + .5 * n._symbolSize.width,
                        y: o + .5 * n._symbolSize.height
                    }), nge.observer.fire("slotMachine.showDustAnimation"), nge.observer.fire("background.showBackgroundShakingAnimation", !1), r.push({
                        x: e,
                        y: o
                    }))
                }
                var a, n = this,
                    s = "1_big 2_big 3_big 4_big 5_big blank 16".split(" "),
                    o = !1,
                    l = !1,
                    i = {},
                    p = {},
                    r = [];
                this.update = function() {
                    if (!l) return !1;
                    var t, a = ["jump", "none"];
                    for (t in i)
                        if (i[t].s) {
                            i[t].updateType || (i[t].updateType = a[Math.floor(Math.random() * a.length)]);
                            var n = i[t].updated;
                            switch ("16" === i[t].s.getData().class && (e(i[t].s, i[t].y, !1), i[t] = !1), i[t].updateType) {
                                case "jump":
                                    i[t].yMod = -20 * Math.sin(2 / 9 * n * Math.PI / 2);
                                    break;
                                case "none":
                                    i[t] = !1
                            }
                            i[t].updated++, 9 < i[t].updated && (i[t] = !1, m())
                        }
                }, this.customReelStartCallback = function(e, t, a, n) {}, this.customReelStopCallback = function(t, a) {
                    if (o)
                        for (t = t.children, a = 0; a < t.length; a++) e(t[a], (t.length - 1 - a + .5) * n._symbolSize.height, !0)
                }, this.reelSpinsStartTweenOnUpdateCallback = function(e, t, a) {
                    var n = e.target;
                    e = n.children.slice(0, 4), a = n.parent.children.indexOf(n) + 1, n = n.parent.children.length;
                    for (var s = 0; s < e.length; s++) {
                        var o = e[s],
                            l = o.customData.row;
                        o.y += (n - a) / a * 38.25 * Math.sin(.45 * l + .05625) * (1 + t - .45) + 114.75 * t - 4 * a + 4 * l
                    }
                }, this.reelSpinsFinishTweenOnUpdateCallback = function(e, t, a) {
                    a = (e = e.target).children.slice(Math.max(e.children.length - 4, 1));
                    for (var s = e.parent.children.indexOf(e) + 1, o = e.parent.children.length, l = 0; l < a.length; l++) {
                        var p = a[l],
                            r = 0;
                        p.customData && (r = p.customData.row), p.y += (o - s) / s * 19.5 * Math.sin(.3 * r + .3 / 7) * (1 + t - .3) + 58.5 * t - 6 * s + 4 * r;
                        var m = (r + .5) * n._symbolSize.height;
                        e.y + p.y > m - 50 && (p.y = (r + .5) * n._symbolSize.height - e.y, r = p.getData().name, void 0 === i[r] ? n.customSymbolStop(p, m) : i[r] && (i[r].y = m), i[r].yMod && (p.y += i[r].yMod, i[r].yMod = 0))
                    }
                }, this.customSymbolStop = function(e, a) {
                    a || (a = e.y);
                    var n = e.getData().name;
                    i[n] = {
                        s: e,
                        updated: 0,
                        y: a,
                        yMod: 0
                    }, l = !o, o || t(e.getData().class, e, a)
                };
                var m = function() {
                    if (0 === nge.Lib.Helper.getObjSize(i)) return l = !1;
                    for (var e in i)
                        if (i[e]) return l = !0;
                    return l = !1
                };
                this.spinStopHandler = function() {
                    u(), o = !0, nge.observer.fire("background.showBackgroundShakingAnimation", !0)
                }, this.spinCompleteHandler = function(e, t) {
                    u(), o = !1, r = []
                };
                var u = function() {
                    for (var e in l = !1, i)
                        if (i[e]) {
                            var t = i[e];
                            t.s.angle = 0, t.s.y = t.y
                        } i = {}
                };
                this.animateSymbolBang = function(e) {
                    var t = n.getSymbolByPosition(e.symbolPosition);
                    null !== t && t.bangAnimationShow(e.speed, (function() {
                        nge.observer.fire("slotMachine.animateSymbolBangComplete", e.symbolPosition)
                    }))
                }, this.animateBigSymbolDivide = function(e) {
                    var t = e.bigSymbol;
                    e = e.speed;
                    var a = {
                            reel: t.rootSymbol[0],
                            row: t.rootSymbol[1]
                        },
                        s = n.getSymbolByPosition(a);
                    null !== s && s.divideAnimationShow(e, (function() {
                        t.symbolsPosition.forEach((function(e) {
                            nge.observer.fire("slotMachine.setSymbol", {
                                coords: [e[0], e[1]],
                                key: t.rootKey
                            })
                        }))
                    }), (function() {
                        nge.observer.fire("bigSymbol.divideAnimation.completed"), nge.observer.fire("slotMachine.setSymbolRowValue", a)
                    }))
                }, this.changeSymbols = function(e) {
                    for (var t = 0; t < n._cfg.mw; t++)
                        for (var a = 0; a < n._cfg.mh; a++) {
                            var s = n.getSymbolByPosition({
                                reel: t,
                                row: a
                            });
                            s && (s = s.getName().replace("_fs", ""), nge.observer.fire("slotMachine.setSymbol", {
                                coords: [t, a],
                                key: s + (e ? "_fs" : "")
                            }))
                        }
                }, this.createSlotMachine = function(e, t, n) {
                    return this.super.createSlotMachine(e, t, n), a = nge.findOne("^dustAnimationContainer"), p = {}, !0
                }
            }))
        },
        1154: function(e, t) {
            nge.App[nge.appNS].Com.WinField = {}
        },
        1155: function(e, t) {
            nge.App[nge.appNS].Com.WinField.Controller = nge.App.DjGameBase.Com.WinField.Controller.extend((function() {
                var e = this;
                this.showVFX = function() {
                    var t, a = nge.localData.get("slotMachine"),
                        n = nge.localData.get("cascades.totalWin") || 0;
                    if (nge.localData.get("freespin.inProgress")) {
                        var s = a.totalBonusWin || 0;
                        a = a.slotWin.totalWin || 0, 0 < s && 0 < a && (t = s - a), t += n
                    } else t = nge.localData.get("pickBonusWon") ? nge.localData.get("pickBonus.totalWin") || 0 : n;
                    t = nge.Lib.Money.toCoins(t), e.setText(t)
                }, this.preWin = function() {
                    nge.localData.get("freespin.inProgress") || nge.localData.get("cascades.inProgress") || e.setText(e.defaultText)
                }, this.layersSwitcher = function(t) {
                    nge.localData.get("luckyMill.showed") || "PickBonus" === nge.localData.get("slotMachine.state") || "game" !== t && "freespinEndPopup" !== t || e.super.layersSwitcher(t)
                }, this.subscribe = function() {
                    this.super.subscribe(), nge.observer.add("luckyMill.winField.showVFX", e.showVFX)
                }
            }))
        },
        1156: function(e, t) {
            nge.App[nge.appNS].Com.WinField.Mobile = {}
        },
        1157: function(e, t) {
            nge.App[nge.appNS].Com.WinField.Mobile.Controller = nge.App.DjGameBase.Com.WinField.Mobile.Controller.extend((function() {
                var e = this;
                this.showVFX = function() {
                    var t, a = nge.localData.get("slotMachine"),
                        n = nge.localData.get("cascades.totalWin") || 0;
                    if (nge.localData.get("freespin.inProgress")) {
                        var s = a.totalBonusWin || 0;
                        a = a.slotWin.totalWin || 0, 0 < s && 0 < a && (t = s - a), t += n
                    } else t = nge.localData.get("pickBonusWon") ? nge.localData.get("pickBonus.totalWin") || 0 : n;
                    t = nge.Lib.Money.toCoins(t), e.setText(t)
                }, this.preWin = function() {
                    nge.localData.get("freespin.inProgress") || nge.localData.get("cascades.inProgress") || e.setText(e.defaultText)
                }, this.layersSwitcher = function(t) {
                    nge.localData.get("luckyMill.showed") || "PickBonus" === nge.localData.get("slotMachine.state") || "game" !== t && "freespinEndPopup" !== t || e.super.layersSwitcher(t)
                }, this.subscribe = function() {
                    this.super.subscribe(), nge.observer.add("luckyMill.winField.showVFX", e.showVFX)
                }
            }))
        },
        1158: function(e, t) {
            nge.App[nge.appNS].Com.Winlines = {}
        },
        1159: function(e, t) {
            nge.App[nge.appNS].Com.Winlines.Cfg = nge.App.DjGameBase.Com.Winlines.Cfg.extend((function() {
                this.subcycles = 1, this.animationAllDuration = 1450
            }))
        },
        1160: function(e, t) {
            nge.App[nge.appNS].Com.WinlinesText = {}
        },
        1161: function(e, t) {
            nge.App[nge.appNS].Com.WinlinesText.Cfg = nge.App.DjGameBase.Com.WinlinesText.Cfg.extend((function() {
                this.params = this.super.get(), this.params.maxRows = 4
            }))
        },
        1162: function(e, t) {
            nge.App[nge.appNS].Com.WinlinesText.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    styles: {},
                    objects: {
                        contents: [{
                            type: 1,
                            name: "lineWinContainer",
                            x: 932,
                            y: 485,
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1,
                            contents: [{
                                type: 7,
                                name: "lineWinAmount0",
                                isVisible: !1,
                                x: 0,
                                y: -300,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "yellow_font",
                                size: 102
                            }, {
                                type: 7,
                                name: "lineWinAmount1",
                                isVisible: !1,
                                x: 0,
                                y: -100,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "yellow_font",
                                size: 102
                            }, {
                                type: 7,
                                name: "lineWinAmount2",
                                isVisible: !1,
                                x: 0,
                                y: 100,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "yellow_font",
                                size: 102
                            }, {
                                type: 7,
                                name: "lineWinAmount3",
                                isVisible: !1,
                                x: 0,
                                y: 300,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "yellow_font",
                                size: 102
                            }]
                        }]
                    }
                }
            }
        },
        1163: function(e, t) {
            nge.App[nge.appNS].Mlm = {}
        },
        1164: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain = {}
        },
        1165: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.SpinButton = nge.App.DjGameBase.Mlm.Brain.SpinButton.extend((function() {
                var e = this,
                    t = !1;
                this.bonusLayers = ["luckyMill"], this.spinButtonEnableEvents.push("freespin.additionalHide.start"), this.spinButtonEnableEvents.push("luckyMill.enableButton"), this.spinButtonDisableEvents.push("cascades.winBonus"), this.spinButtonDisableEvents.push("luckyMill.disableButton"), this.spinButtonDisableEvents.push("spinButton.speedUpCascades.disableButton");
                var a = function() {
                    nge.observer.fire("spinButton.speedUpCascades.disableButton"), nge.observer.fire("spinButton.speedUpCascades", null, 1)
                };
                this.spinEnableBlockers = [function() {
                    return !nge.localData.get("spinButton.firstBalanceResponsed")
                }, function() {
                    return nge.localData.get("autospin.inProgress")
                }, function() {
                    return nge.localData.get("slotMachineResponseBonusSpin")
                }, function() {
                    return nge.localData.get("respin.inProgress")
                }, function() {
                    return nge.localData.get("freespin.inProgress") && "Ready" === nge.localData.get("slotMachine.state")
                }, function() {
                    return nge.localData.get("freeGame.showingOfferMenu")
                }, function() {
                    return nge.localData.get("pickBonusWon") && !nge.localData.get("luckyMill.restored")
                }, function() {
                    return nge.localData.get("freeGame.inProgress") && !nge.localData.get("freespin.inProgress") && "Ready" === nge.localData.get("slotMachine.state") && ("0" === nge.localData.get("freeGame.amount") || 0 === nge.localData.get("freeGame.amount"))
                }], this.pressHandlerForSpinGame = function(t) {
                    if (nge.observer.fire("sound.spin_click.stop"), nge.observer.fire("sound.stop_click.stop"), e.modeSpin) {
                        var n = nge.localData.get("regularWinInProgress"),
                            s = nge.localData.get("cascades.inProgress");
                        n ? (nge.localData.get("autospin"), nge.observer.fire("win.abortWin"), nge.observer.fire("spinButton.speedUpSymbolsAnimation"), a()) : s ? a() : e.checkSpinBlockers(e.spinEnableBlockers) || (e.disableButton(t + "by press //to start slot machine//", e.modeSpin, e.spinFrames), nge.observer.fire("slotMachine.spinCommandAnimation"), nge.observer.fire("slotMachine.spinCommand", null, 400)), nge.observer.fire("button.spin.pressed"), nge.observer.fire("sound.spin_click.play")
                    } else e.onStopButtonDisable(t + "by press //to stop slot machine//"), nge.observer.fire("slotMachine.stopCommand"), nge.observer.fire("sound.stop_click.play")
                }, this.pressHandlerForFreespinGame = function(t) {
                    if (nge.observer.fire("sound.spin_click.stop"), nge.observer.fire("sound.stop_click.stop"), e.modeSpin) {
                        if (e.freespinsInProgress) {
                            var n = nge.localData.get("regularWinInProgress"),
                                s = nge.localData.get("cascades.inProgress");
                            n ? (nge.observer.fire("win.abortWin"), nge.observer.fire("spinButton.speedUpSymbolsAnimation"), a()) : s ? a() : (e.disableButton(t + "by press //to spin slot machine in fs game//", e.modeSpin, e.spinFrames), nge.observer.fire("slotMachine.spinCommandAnimation"), nge.observer.fire("freespin.makeSpin", null, 400))
                        } else {
                            if (e.checkSpinBlockers(e.spinEnableBlockers)) return;
                            e.freespinsInProgress = !0, e.disableButton(t + "by press //to launch fs game//", e.modeSpin, e.spinFrames), nge.observer.fire("slotMachine.spinCommandAnimation"), nge.observer.fire("freespin.press.spinButton", null, 400)
                        }
                        nge.observer.fire("button.spin.pressed"), nge.observer.fire("sound.spin_click.play")
                    } else e.onStopButtonDisable("by press //to stop slot machine from fs game"), nge.observer.fire("slotMachine.stopCommand"), nge.observer.fire("sound.stop_click.play")
                }, this.pressHandlerForBonusWheelGame = function() {
                    e.disableButton("press", !0, e.stopFrames), nge.observer.fire("pickBonus.sendRequest")
                }, this.layerSwitchedHandler = function(a) {
                    t = !1, e.bonusLayers.includes(a) && (t = !0), this.super.layerSwitchedHandler(a)
                }, this.pressHandler = function(a, n) {
                    this.super.pressHandler(a, n), t && "spin" === n && e.pressHandlerForBonusWheelGame()
                };
                var n = function() {
                    nge.localData.get("settings.turboMode") && !nge.localData.get("freespin.inProgress") && nge.observer.fire("spinButton.pressFromCode", null, 200)
                };
                this.subscribe = function() {
                    this.super.subscribe(), nge.observer.add("slotMachine.spinResponse", n, !1, !0)
                }
            }))
        },
        1166: function(e, t) {
            nge.Mlm.Brain.Cascade = Class.extend((function() {
                var e = [],
                    t = 0,
                    a = 0,
                    n = 0,
                    s = 0,
                    o = !1,
                    l = [],
                    i = !1,
                    p = function(e) {
                        if (o = !1, l = [], nge.localData.set("cascades.inProgress", !1), nge.localData.set("cascades.completed", !1), nge.localData.set("cascades.currentIndex", 0), nge.localData.set("cascades.all", []), s = n = a = t = 0, i = !1, e && e.slotWin) {
                            var p = [];
                            e.slotWin.lineWinAmounts && p.push(e.slotWin.lineWinAmounts);
                            for (var m = 2; e.slotWin["lineWinAmountsStage" + m];) p.push(e.slotWin["lineWinAmountsStage" + m]), m++;
                            var u = [];
                            for (u.push(e.spinResult.rows), m = 2; e["spinResultStage" + m];) u.push(e["spinResultStage" + m].rows), m++;
                            for (e = [], m = 0; p[m] && u[m + 1];) {
                                for (var c = p[m], g = u[m + 1], y = {
                                        symbolsToRemove: []
                                    }, b = [0, 0, 0, 0, 0], h = 0; h < c.length; h++)
                                    for (var f = c[h].wonSymbols, _ = 0; _ < f.length; _++) {
                                        var x = {
                                            reel: f[_][0],
                                            row: f[_][1]
                                        };
                                        r(y.symbolsToRemove, x) || (y.symbolsToRemove.push(x), b[+x.reel]++)
                                    }
                                for (y.symbolsToAdd = [], h = 0; 5 > h; h++)
                                    for (_ = 0; _ < b[h]; _++) y.symbolsToAdd.push({
                                        symbolPosition: {
                                            reel: h,
                                            row: _
                                        },
                                        key: g[_][h]
                                    });
                                c = y, p[m + 1] && (c.lineWinAmounts = p[m + 1]), e.push(c), m++
                            }
                            nge.localData.set("cascades.all", e), 0 < e.length && (nge.localData.set("cascades.inProgress", !0), nge.observer.fire("buttons.updateState"))
                        }
                    },
                    r = function(e, t) {
                        return 0 !== e.filter((function(e) {
                            return e.reel === t.reel && e.row === t.row
                        })).length
                    },
                    m = function() {
                        if (!i) {
                            i = !0;
                            var n = nge.localData.get("cascades.all"),
                                s = nge.localData.get("cascades.currentIndex");
                            if (!n || !n.length || s >= n.length) nge.localData.set("cascades.inProgress", !1), nge.observer.fire("buttons.updateState");
                            else {
                                nge.observer.fire("winlines.stopAnimation"), nge.observer.fire("win.hide"), nge.observer.fire("slotmachine.tint.restore"), n = n[s], t = n.symbolsToRemove.length, a = 0, e = [], s = 1.1;
                                var l = 80;
                                o && (l = 40, s = 1.4);
                                for (var p = 0; p < n.symbolsToRemove.length; p++) nge.observer.fire("slotMachine.animateSymbolBang", {
                                    symbolPosition: n.symbolsToRemove[p],
                                    speed: s
                                }, +n.symbolsToRemove[p].reel * l + 1)
                            }
                        }
                    },
                    u = function(t) {
                        for (var a = 0; a < e.length; a++)
                            if (e[a].reel === t.reel && e[a].row === t.row) return;
                        e.push(t), nge.observer.fire("slotMachine.destroySymbol", {
                            symbolPosition: t,
                            animation: null
                        })
                    },
                    c = function(e) {
                        if (++a === t) {
                            e = nge.localData.get("cascades.all");
                            var n = nge.localData.get("cascades.currentIndex");
                            !e || !e.length || n >= e.length ? (nge.localData.set("cascades.inProgress", !1), nge.observer.fire("buttons.updateState")) : nge.observer.fire("cascades.checkBigSymbolDivide", e[n].symbolsToRemove)
                        }
                    },
                    g = function() {
                        nge.observer.fire("cascades.state.destroySymbolsComplete"), a = t = 0, l = [], nge.rafSetTimeout((function() {
                            nge.observer.fire("slotMachine.normalizeReelsSymbolsPositions", {
                                animation: y
                            })
                        }), 1)
                    },
                    y = function(e, t, a, n) {
                        var s = e.getSize().height,
                            i = {
                                y: (.5 + t.row) * s
                            },
                            p = (.5 + a.row) * s;
                        t = 200 + 50 * t.reel + (200 - 50 * t.row), a = 120, o && (t /= 2, a = 60), s = 0 === (s = nge.Lib.Helper.getRandomInt(0, 1)) ? -1 : 1, s = nge.tween.add(e.texture).to({
                            angle: 0
                        }, t / 2).to({
                            angle: .3 * s
                        }, 80).to({
                            angle: -.9 * s
                        }, 60).to({
                            angle: 1.6 * s
                        }, 60).to({
                            angle: -.5 * s
                        }, 80).to({
                            angle: 0
                        }, 80), o || s.start(), e.texture.y = i.y, (t = nge.tween.add(i).to({
                            y: p
                        }, a, nge.Lib.Tween.Easing.Default, !1, t)).onUpdateCallback((function() {
                            e.texture.y = this.y
                        }), i), t.start(), t.onComplete.add((function() {
                            e.texture.y = p, nge.observer.fire("slotMachine.customSymbolStop", {
                                symbolObject: e.texture
                            }), n && n()
                        })), l.push(t)
                    },
                    b = function() {
                        var e = nge.localData.get("cascades.all");
                        l = [];
                        var t = nge.localData.get("cascades.currentIndex");
                        if (!e || !e.length || t >= e.length) nge.localData.set("cascades.inProgress", !1), nge.observer.fire("buttons.updateState");
                        else {
                            var a = e[t];
                            n = a.symbolsToAdd.length, s = 0, nge.localData.set("cascades.state.appendSymbols", !0), nge.rafSetTimeout((function() {
                                nge.rafSetTimeout((function() {
                                    for (var e = 0; e < a.symbolsToAdd.length; e++) a.symbolsToAdd[e].animation = h, nge.observer.fire("slotMachine.appendSymbol", a.symbolsToAdd[e])
                                }), 1)
                            }), 1)
                        }
                    },
                    h = function(e, t, a) {
                        nge.observer.fire("cascade.appendSymbolsAnimationStart", {
                            symbol: e,
                            symbolPosition: t
                        });
                        var n = e.getSize().height,
                            s = {
                                y: -n
                            },
                            i = (.5 + t.row) * n;
                        n = 40 * (3 - t.row) + 40 * t.reel;
                        var p = 110;
                        o && (n /= 2, p = 55), e.texture.customData = {
                            row: t.row
                        }, e.texture.z = 100 - t.row, e.texture.y = s.y, (t = nge.tween.add(s).to({
                            y: i
                        }, p, nge.Lib.Tween.Easing.Linear.None, !1, n)).onUpdateCallback((function() {
                            e.texture.y = this.y
                        }), s), t.start(), t.onComplete.add((function() {
                            e.texture.y = i, nge.observer.fire("slotMachine.customSymbolStop", {
                                symbolObject: e.texture
                            }), a && a()
                        })), l.push(t)
                    },
                    f = function() {
                        if (!(++s < n)) {
                            l = [], nge.localData.set("cascades.state.appendSymbols", !1);
                            var e = nge.localData.get("cascades.all"),
                                t = nge.localData.get("cascades.currentIndex");
                            !e || !e.length || t >= e.length ? (nge.localData.set("cascades.inProgress", !1), nge.observer.fire("buttons.updateState")) : (e = e[t], i = !1, e.lineWinAmounts ? nge.observer.fire("winlines.setNewQuery", {
                                slotWin: {
                                    lineWinAmounts: e.lineWinAmounts
                                }
                            }) : (nge.localData.set("cascades.inProgress", !1), nge.localData.set("cascades.completed", !0), nge.observer.fire("cascades.state.completed"), nge.observer.fire("winlines.setNewQuery", {
                                slotWin: {}
                            }), nge.observer.fire("buttons.updateState")), nge.observer.fire("slotMachine.spinComplete", null, 1), o = !1, s = n = 0, t++, nge.localData.set("cascades.currentIndex", t))
                        }
                    },
                    _ = function() {
                        o = !0, l.forEach((function(e) {
                            e.isRunning && !e.speedUpCascade && (e.timeScale = 2, e.speedUpCascade = !0)
                        }))
                    },
                    x = function() {
                        nge.localData.set("cascades.inProgress", !1), nge.localData.set("cascades.completed", !1), nge.localData.set("cascades.currentIndex", 0), nge.localData.set("cascades.all", [])
                    };
                this.subscribe = function() {
                    nge.observer.add("slotMachine.spinResponse", p, !1, !0), nge.observer.add("winlines.animateByOne.cycleComplete.firstTime", m, !1, !0), nge.observer.add("slotMachine.animateSymbolBangComplete", u, !1, !0), nge.observer.add("slotMachine.destroySymbolComplete", c, !1, !0), nge.observer.add("bigSymbol.cascadeDivide.complete", g, !1, !0), nge.observer.add("slotMachine.normalizeReelsSymbolsPositionsComplete", b, !1, !0), nge.observer.add("slotMachine.appendSymbolComplete", f, !1, !0), nge.observer.add("spinButton.speedUpCascades", _, !1, !0), nge.observer.add("Transport.close", x, !1, !0)
                }
            }))
        },
        1167: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Controller = nge.App.DjGameBase.Mlm.Brain.Controller.extend((function() {
                this._logicBlocks.push("cascade", "pickBonus")
            }))
        },
        1168: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Main = nge.Mlm.Brain.Main.extend((function() {
                var e = ["11", "12", "13", "14", "15"],
                    t = function(e) {
                        e && 5 === e.length && e.splice(0, 1)
                    },
                    a = function(a) {
                        if (a && a.data && a.data.lastResponse) {
                            var n = a.data.lastResponse,
                                s = n.state;
                            "PickBonus" === s ? (nge.localData.set("bonusWon", !0), nge.localData.set("pickBonusWon", !0), !(s = !!n.spinResult && n.spinResult.rows) && a.data.gameParameters && a.data.gameParameters.initialSymbols && (s = a.data.gameParameters.initialSymbols), t(s), a = function(e) {
                                for (var t = 0, a = 0, n = +e[t][a], s = 0; s < e.length - 2; s++)
                                    for (var o = 0; o < e[s].length - 2; o++) + e[s][o] >= n && (a = o, n = +e[t = s][a]);
                                return {
                                    reel: t + 1,
                                    row: a + 1
                                }
                            }(a = nge.Lib.Helper.rowsToColumns(s)), function(e, t) {
                                var a = t.reel;
                                e[(t = t.row) - 1][a - 1] = "blank", e[t - 1][a] = "blank", e[t - 1][a + 1] = "blank_bottom", e[t][a - 1] = "blank", e[t][a] = "blank", e[t][a + 1] = "blank_bottom", e[t + 1][a - 1] = "blank", e[t + 1][a] = "blank", e[t + 1][a + 1] = "blank_bottom"
                            }(s, a), nge.localData.set("luckyMill.started", !0), nge.localData.set("luckyMill.restored", !0), nge.localData.set("luckyMill.symbolPosition", a), nge.localData.set("luckyMill.items", n.items || [])) : "FreeSpins" === s && (n.spinResult && (t(n.spinResult.rows), n.spinResult.rows = n.spinResult.rows.map((function(t) {
                                return t.map((function(t) {
                                    return e.includes(t) ? t : t + "_fs"
                                }))
                            }))), a.data.gameParameters && a.data.gameParameters.initialSymbols && (t(a.data.gameParameters.initialSymbols), a.data.gameParameters.initialSymbols = a.data.gameParameters.initialSymbols.map((function(t) {
                                return t.map((function(t) {
                                    return e.includes(t) ? t : t + "_fs"
                                }))
                            }))))
                        }
                    };
                this.subscribe = function() {
                    nge.observer.add("transportMessage.AuthResponse", a, !1, !0), this.super.subscribe()
                }
            }))
        },
        1169: function(e, t) {
            nge.Mlm.Brain.PickBonus = Class.extend((function() {
                var e = !1,
                    t = function(t) {
                        "play" === t && (e = !1)
                    },
                    a = function() {
                        nge.observer.fire("layersSwitcher.show", "luckyMill"), nge.observer.fire("luckyMill.disableButton"), nge.observer.fire("buttons.updateState"), nge.observer.fire("pickBonus.sendRequest"), nge.localData.set("luckyMill.started", !0)
                    },
                    n = function() {
                        nge.observer.fire("buttons.resetBalanceReceivedFlag"), nge.localData.set("pickBonusWon", !1), nge.localData.set("bonusWon", !1), nge.localData.set("luckyMill.started", !1), nge.localData.set("luckyMill.restored", !1), nge.localData.set("luckyMill.symbolPosition", !1), nge.localData.set("luckyMill.items", !1), nge.localData.set("slotMachine.lastResponse", !1), nge.localData.set("slotMachine.state", "Ready"), nge.observer.fire("pickBonus.endGame"), nge.observer.fire("winlines.animateAllDone"), nge.observer.fire("winlines.animateByOne.cycleComplete"), nge.observer.fire("layersSwitcher.show", "game"), nge.observer.fire("luckyMill.balanceRequest"), nge.observer.add("balance.amount", (function() {
                            nge.observer.fire("buttons.resetBalanceReceivedFlag"), nge.observer.fire("buttons.updateState", null, 1), nge.observer.remove("balance.amount", !1, "balanceAmountPickBonus", !0)
                        }), "balanceAmountPickBonus", !0)
                    },
                    s = function() {
                        if (!e) {
                            var t = nge.localData.get("bonusGame.lastResponse");
                            t && "true" !== t.lastPick ? nge.observer.fire("pickBonus.sendRequest") : nge.observer.fire("pickBonus.lastStage", null, 1e3)
                        }
                    },
                    o = function() {
                        nge.localData.set("bonusWheelWon", !1), nge.localData.set("pickBonusWon", !1), nge.localData.set("luckyMill.started", !1), nge.localData.set("luckyMill.restored", !1), nge.localData.set("luckyMill.symbolPosition", !1), nge.localData.set("luckyMill.items", !1), e = !0
                    };
                this.subscribe = function() {
                    nge.observer.add("pickBonus.start", a, !1, !0), nge.observer.add("luckyMill.popupHided", n, !1, !0), nge.observer.add("luckyMill.stageComplete", s, !1, !0), nge.observer.add("StatesManager.create.end", t, !1, !0), nge.observer.add("Transport.close", o, !1, !0), nge.observer.add("pickBonus.sendRequest", (function() {
                        var e = nge.App.getInstance("Mlm.Transport.Models.PickBonusItemRequest", !1, {
                            result: !0,
                            data: {
                                index: 1
                            }
                        });
                        nge.transport.send(e)
                    }), !1, !0), nge.observer.add("transportMessage.PickBonusItemResponse", (function(e) {
                        e = e.data, nge.localData.set("bonusGame.lastResponse", e), nge.observer.fire("pickBonus.actionResponse", e)
                    }), !1, !0)
                }
            }))
        },
        1170: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Slot = nge.App.DjGameBase.Mlm.Brain.Slot.extend((function() {
                var e, t, a = this,
                    n = ["1", "2", "3", "4", "5"],
                    s = ["11", "12", "13", "14", "15"],
                    o = 1.25,
                    l = [],
                    i = 0,
                    p = 0,
                    r = null;
                this._wasLuckyMill = !1;
                var m = function(t) {
                    if (nge.localData.set("cascades.totalWin", 0), e = null, t = t.spinResult.columns, l = [], !nge.localData.get("freespin.inProgress") && !r)
                        for (var a = 0; a < t.length - 1; a++)
                            for (var s = 0; s < t[a].length - 1; s++)
                                if (n.includes(t[a][s]) && t[a][s] === t[a][s + 1] && t[a][s] === t[a + 1][s] && t[a][s + 1] === t[a + 1][s + 1]) {
                                    var o = a,
                                        i = s,
                                        p = {
                                            rootKey: t[a + 1][s],
                                            rootSymbol: [o + 1, i],
                                            divided: !1,
                                            symbolsPosition: []
                                        };
                                    p.symbolsPosition.push([o, i]), p.symbolsPosition.push([o, i + 1]), p.symbolsPosition.push([o + 1, i]), p.symbolsPosition.push([o + 1, i + 1]), l.push(p), t[a][s] = "blank", t[a + 1][s] += "_big", t[a][s + 1] = "blank_bottom", t[a + 1][s + 1] = "blank_bottom"
                                } if (r && "PickBonus" === r.bonusName) {
                        for (s = a = 0, o = +t[a][s], i = 0; i < t.length - 2; i++)
                            for (p = 0; p < t[i].length - 2; p++) + t[i][p] >= o && (s = p, o = +t[a = i][s]);
                        a = (e = {
                            reel: a + 1,
                            row: s + 1
                        }).reel, s = e.row, t[a - 1][s - 1] = "blank", t[a - 1][s] = "blank", t[a - 1][s + 1] = "blank_bottom", t[a][s - 1] = "blank", t[a][s] = "16", t[a][s + 1] = "blank_bottom", t[a + 1][s - 1] = "blank", t[a + 1][s] = "blank", t[a + 1][s + 1] = "blank_bottom"
                    }
                };
                this.winlinesAllDone = function() {
                    var e = a.getLastData();
                    if (!(e && e.slotWin && e.slotWin.linePickBonus && e.slotWin.linePickBonus.length && e.slotWin.Bonus && e.slotWin.Bonus.length)) {
                        var t = 0,
                            n = nge.localData.get("cascades.inProgress"),
                            s = nge.localData.get("cascades.completed"),
                            o = nge.localData.get("cascades.currentCascade.win");
                        if (!s && n && o && (t = +o), n = this.checkIfBonus(), nge.localData.get("freespin.inProgress") && n && 0 == +t && nge.localData.get("additionalPopup.willBeShownNext")) return void nge.observer.fire("spinComplete.noWinButHasBonusInFreespins");
                        if (a.isBigWin) return nge.observer.fire("win", t), void nge.observer.fire("winData", {
                            totalWin: t,
                            isBigWin: !0
                        });
                        n && 0 == +t && nge.observer.fire("winlines.animateByOne")
                    }
                    e && a.super.winlinesAllDone()
                }, this.winlinesAnimateByOneCycleCompleteSubscription = function() {
                    nge.observer.add("winlines.animateByOne.cycleComplete", (function() {
                        t && (t = !1, a.spinAndWinComplete())
                    }), !1, !0)
                };
                var u = function(e) {
                        var t = !1;
                        l.forEach((function(a) {
                            var n;
                            if (n = !a.divided) e: {
                                n = a.symbolsPosition;
                                for (var s = 0; s < e.length; s++)
                                    for (var l = e[s].wonSymbols, i = 0; i < l.length; i++)
                                        for (var p = l[i], r = 0; r < n.length; r++)
                                            if (+p[0] === n[r][0] && +p[1] === n[r][1]) {
                                                n = !0;
                                                break e
                                            } n = !1
                            }
                            n && (a.divided = !0, nge.observer.fire("slotMachine.bigSymbol.divide", {
                                bigSymbol: a,
                                speed: o
                            }), t = !0)
                        }));
                        var a = 0;
                        return t && (a = 1.25 === o ? 2e3 : 1200), a
                    },
                    c = function(e) {
                        p = i = 0;
                        var t = !1,
                            a = function(t) {
                                var a = t.rootSymbol,
                                    n = 0,
                                    s = 0;
                                return e.forEach((function(e) {
                                    var t = +e.reel;
                                    e = +e.row, t === a[0] - 1 && e > a[1] && n++, t === a[0] && e > a[1] && s++
                                })), n !== s
                            };
                        l.forEach((function(e) {
                            !e.divided && a(e) && (e.divided = !0, nge.observer.fire("slotMachine.bigSymbol.divide", {
                                bigSymbol: e,
                                speed: o
                            }), t = !0, i++)
                        })), y(e), t || nge.observer.fire("bigSymbol.cascadeDivide.complete")
                    },
                    g = function() {
                        p++, i === p && (p = i = 0, nge.observer.fire("bigSymbol.cascadeDivide.complete"))
                    },
                    y = function(e) {
                        e.forEach((function(e) {
                            var t = +e.reel,
                                a = +e.row;
                            for (e = 0; e < l.length; e++) {
                                var n = l[e];
                                n.divided || (t === n.rootSymbol[0] && a > n.rootSymbol[1] && n.rootSymbol[1]++, n.symbolsPosition.forEach((function(e) {
                                    t === e[0] && a > e[1] && e[1]++
                                })))
                            }
                        }))
                    };
                this.checkIfBonus = function() {
                    if (null !== r)
                        if ("FreeSpins" === r.bonusName) {
                            if (nge.localData.get("cascades.completed")) return !0
                        } else if ("PickBonus" === r.bonusName) return !0;
                    return !1
                };
                var b = function() {
                    a.winlinesAnimateAll()
                };
                this.spinCompleteHandler = function() {
                    var e = 0;
                    a.isBigWin = !1, t = !0, o = 1.25;
                    var n = a.getLastData(),
                        s = a.checkIfBonus();
                    if (nge.localData.set("bonusWon", !1), !s || (nge.observer.fire("cascades.winBonus"), a.processAutospinOnFeatureStart(), a.runBonusRoutine(n))) {
                        var l = 0,
                            i = null;
                        if (n.slotWin && n.slotWin.lineWinAmounts) {
                            i = n.slotWin.lineWinAmounts;
                            var p = nge.localData.get("cascades.inProgress"),
                                r = nge.localData.get("cascades.completed"),
                                m = nge.localData.get("cascades.currentIndex");
                            for (var c in r ? i = null : p && 0 !== m && (i = n.slotWin["lineWinAmountsStage" + (m + 1)]), i)(p = i[c]).amount && (l += +p.amount)
                        }
                        c = +l, p = nge.localData.get("totalBet.value"), nge.localData.set("symbol.animationSpeed", c <= 2.5 * p ? 1.05 : c <= 5 * p ? 1 : c <= 7.5 * p ? .95 : .9), c = nge.localData.get("cascades.totalWin") || 0, nge.localData.set("cascades.totalWin", c + l), nge.localData.set("cascades.currentCascade.win", l), n.slotWin && i ? (i.length || n.slotWin.jackpotWin) && ((e = u(i)) ? nge.observer.fire("winlines.animateAllWithDelay", null, e) : a.winlinesAnimateAll()) : (nge.observer.fire("winlines.animateAllDone"), nge.observer.fire("winlines.animateByOne.cycleComplete")), nge.localData.set("lastReelSymbolLanding", !1), 0 < l || s ? (a.isBigWin = a.checkBigWin(l, s), a.isBigWin ? (nge.observer.fire("win.big.preWinEvent", s), nge.observer.fire("sounds.win.intro_big_win.play", null, e)) : (nge.localData.set("isSpinReadyToProceed", !0), nge.observer.fire("win.regular.preWinEvent"), nge.observer.fire("win", l, e), nge.observer.fire("winData", {
                            totalWin: l,
                            isBigWin: !1,
                            isBonus: s
                        }, e))) : s || 0 !== l || nge.observer.fire("spinComplete.noWin")
                    }
                }, this.runBonusGame = function() {
                    var e = a.getLastData() ? a.getLastData() : a.getLastPickBonusItemResponse();
                    e || (e = a.getLastPickCoverItemResponse());
                    var t = e.state;
                    if (!t) return !1;
                    switch (e.state) {
                        case "FreeSpins":
                            for (var n in nge.observer.fire("infoPanel.show", "YOU'VE WON FREE SPINS!"), e.slotWin.lineWinAmounts);
                            for (t = 2; e.slotWin["lineWinAmountsStage" + t];) {
                                var s = e.slotWin["lineWinAmountsStage" + t];
                                for (n in s);
                                t++
                            }
                            nge.observer.fire("freespin.start", r.freeSpinsCount);
                            break;
                        case "PickBonus":
                            nge.observer.fire("pickBonus.start");
                            break;
                        default:
                            nge.observer.fire("brain.runBonusGame", t)
                    }
                }, this.restoreBonusGame = function(e) {
                    "PickBonus" === e.state && (nge.observer.add("StatesManager.create.end", (function() {
                        nge.observer.remove("StatesManager.create.end", !1, "playStateBonusRun", !0)
                    }), "playStateBonusRun", !0), nge.brain.do("showDefaultPlayState"))
                };
                var h = function(e) {
                        if (r = null, e.data) {
                            var t = e.data;
                            for (n in t)
                                if (t.hasOwnProperty(n) && n.includes("spinResult")) {
                                    var a = t[n];
                                    a.rows && 5 === a.rows.length && a.rows.splice(0, 1)
                                } if (e.data.slotWin && e.data.slotWin.lineWinAmounts)
                                for (t = 0; e.data.slotWin["lineWinAmounts" + (0 === t ? "" : "Stage" + (t + 1))];) {
                                    var n = e.data.slotWin["lineWinAmounts" + (0 === t ? "" : "Stage" + (t + 1))];
                                    e: {
                                        for (var s = (a = n).length; s--;) {
                                            var o = a[s];
                                            if ("Bonus" === o.type) {
                                                if ("FreeSpins" === o.bonusName) {
                                                    a.splice(s, 1), r = {
                                                        bonusName: "FreeSpins",
                                                        freeSpinsCount: o.params.freeSpins
                                                    }, nge.localData.get("freespin.inProgress") && nge.localData.set("bonusGame.freespins", o.params.freeSpins), a = !0;
                                                    break e
                                                }
                                                if ("BonusWheel" === o.bonusName) {
                                                    a.splice(s, 1), r = {
                                                        bonusName: "PickBonus"
                                                    }, nge.localData.set("pickBonusWon", !0), nge.localData.set("bonusWon", !0), a = !0;
                                                    break e
                                                }
                                                "Multiplier" === o.bonusName && a.splice(s, 1)
                                            }
                                        }
                                        a = !1
                                    }
                                    if (a && (r.cascadeNumber = t), 0 === n.length) {
                                        delete e.data.slotWin["lineWinAmounts" + (0 === t ? "" : "Stage" + (t + 1))];
                                        break
                                    }
                                    t++
                                }
                        }
                    },
                    f = function(e) {
                        if (e.data && e.data.spinResult && nge.localData.get("freespin.inProgress")) {
                            e.data.spinResult.rows = e.data.spinResult.rows.map((function(e) {
                                return e.map((function(e) {
                                    return s.includes(e) ? e : e + "_fs"
                                }))
                            }));
                            for (var t = 2; e.data["spinResultStage" + t];) e.data["spinResultStage" + t].rows = e.data["spinResultStage" + t].rows.map((function(e) {
                                return e.map((function(e) {
                                    return s.includes(e) ? e : e + "_fs"
                                }))
                            })), t++
                        }
                    };
                this.onBalanceResponseHandler = function(e) {
                    this.super.onBalanceResponseHandler(e), a._wasLuckyMill && (a._wasLuckyMill = !1, nge.observer.fire("balance.showBalanceAfterLuckyMill", e.data))
                }, this.winProcessingFinish = function() {
                    nge.localData.get("cascades.inProgress") || this.super.winProcessingFinish()
                };
                var _ = function() {
                        r = null
                    },
                    x = function() {
                        a._wasLuckyMill = !0, a.balanceRequest()
                    },
                    d = function() {
                        e && nge.observer.fire("luckyMill.showLuckyMillContainer", e)
                    },
                    N = function() {
                        e && nge.observer.fire("slotMachine.setSymbol", {
                            coords: [e.reel, e.row],
                            key: "blank"
                        })
                    },
                    S = function() {
                        o = 1.25
                    },
                    w = function() {
                        o = 1.625
                    },
                    M = function() {
                        o = 1.625
                    };
                this.subscribe = function() {
                    nge.observer.add("transportMessage.SpinResponse", h, !1, !0), nge.observer.add("transportMessage.FreeSpinResponse", h, !1, !0), nge.observer.add("transportMessage.FreeSpinResponse", f, !1, !0), a.super.subscribe()
                }, this.onTransportCloseHandler = function() {
                    this.super.onTransportCloseHandler(), a._wasLuckyMill = !1, r = null
                }, this.customSubscribe = function() {
                    a.super.customSubscribe(), nge.observer.add("slotMachine.spinResponse", m, !1, !0), nge.observer.add("slotMachine.luckyMillSymbol.stopped", d, !1, !0), nge.observer.add("slotMachine.spinComplete", N, !1, !0), nge.observer.add("pickBonus.endGame", _, !1, !0), nge.observer.add("luckyMill.balanceRequest", x, !1, !0), nge.observer.add("cascades.checkBigSymbolDivide", c, !1, !0), nge.observer.add("bigSymbol.divideAnimation.completed", g, !1, !0), nge.observer.add("slotMachine.stopCommand", w, !1, !0), nge.observer.add("slotMachine.spinCommand", S, !1, !0), nge.observer.add("spinButton.speedUpCascades", M, !1, !0), nge.observer.add("winlines.animateAllWithDelay", b, !1, !0)
                }
            }))
        },
        1171: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Sounds = nge.App.DjGameBase.Mlm.Brain.Sounds.extend((function() {
                var e = this,
                    t = 0,
                    a = 0,
                    n = 0;
                this.reelsCount = 0, this.wheelSpinSoundCount = 1, this.loopedSounds.push("wheel_background"), this.introSounds = [], this.scatterSounds = [], this.counterSounds = [], this.bellSound = [{
                    s: "bell_0",
                    e: "bell_0.play"
                }, {
                    s: "bell_1",
                    e: "bell_1.play"
                }, {
                    s: "bell_2",
                    e: "bell_2.play"
                }], this.popupSounds.push({
                    s: "lucky_mill_end_popup",
                    e: "luckyMill.endPopup.play"
                }, {
                    s: "lucky_mill_end_popup",
                    e: "Transport.close",
                    action: "stop"
                }, {
                    s: "start_freespins_popup",
                    e: "freespin.popupStart.show"
                }, {
                    s: "start_freespins_popup",
                    e: "freespin.additional.show"
                }, {
                    s: "popup_disappear",
                    e: "popup_disappear.play"
                }), this.buttonsClickSounds = [{
                    s: "click",
                    e: "button.clickSound",
                    relaunch: !0
                }, {
                    s: "click",
                    e: "button.click",
                    relaunch: !0
                }, {
                    s: "hover_0",
                    e: "button.hover_0"
                }, {
                    s: "hover_1",
                    e: "button.hover_1"
                }, {
                    s: "hover_2",
                    e: "button.hover_2"
                }, {
                    s: "spin_click",
                    e: "sound.spin_click.play",
                    relaunch: !0
                }, {
                    s: "spin_stop",
                    e: "sound.stop_click.play",
                    relaunch: !0
                }], this.bigWinSounds.push({
                    s: "big_win_start",
                    e: "win.big.show"
                }), this.regularWinSounds = [{
                    s: "win_regularWinLow",
                    e: "sounds.win.regularWinLow",
                    action: "play",
                    relaunch: !0
                }, {
                    s: "win_regularWinMid",
                    e: "sounds.win.regularWinMid",
                    action: "play",
                    relaunch: !0
                }, {
                    s: "win_regularWinHigh",
                    e: "sounds.win.regularWinHigh",
                    action: "play",
                    relaunch: !0
                }], this.soundExt.push({
                    s: "ambient",
                    e: "ambient.play",
                    loop: !0
                }, {
                    s: "ambient",
                    e: "Transport.close",
                    action: "stop"
                }, {
                    s: "wheel_background",
                    e: "wheelBackground.play",
                    loop: !0
                }, {
                    s: "wheel_background",
                    e: "wheelBackground.stop",
                    action: "stop"
                }, {
                    s: "wheel_background",
                    e: "Transport.close",
                    action: "stop"
                }, {
                    s: "wheel_multiplier_fly",
                    e: "luckyMill.multiplierFly.play",
                    action: "play"
                }, {
                    s: "big_symbol_separate",
                    e: "slotMachine.bigSymbol.divide",
                    action: "play"
                }, {
                    s: "wheel_collect",
                    e: "luckyMill.collect.play",
                    relaunch: !0
                }, {
                    s: "wheel_start",
                    e: "luckyMill.started",
                    relaunch: !0
                }, {
                    s: "wheel_rotate",
                    e: "luckyMill.loopStarted",
                    loop: !0,
                    relaunch: !0
                }, {
                    s: "wheel_rotate",
                    e: "luckyMill.stopStarted",
                    action: "stop"
                }, {
                    s: "wheel_rotate",
                    e: "Transport.close",
                    action: "stop"
                }, {
                    s: "wheel_stop",
                    e: "luckyMill.stopStarted",
                    relaunch: !0
                }), this.constructor = function() {
                    e.super.constructor();
                    for (var t = 0; 10 > t; t++) e.soundExt.push({
                        s: "symbol_explosion_" + t,
                        e: "symbol_explosion_" + t + ".play",
                        relaunch: !0
                    });
                    for (t = 0; 10 > t; t++) e.soundExt.push({
                        s: "symbol_drop_" + t,
                        e: "symbol_drop_" + t + ".play",
                        relaunch: !0
                    })
                }, this.layerSwitcherHandler = function(e) {
                    switch (e) {
                        case "game":
                        case "gameOffer":
                            nge.observer.fire("bs_background.play"), nge.observer.fire("sound.volume", {
                                s: "bs_background",
                                volume: 1
                            }), nge.observer.fire("sound.volume", {
                                s: "bn_background",
                                volume: 1
                            }), nge.observer.fire("wheelBackground.stop");
                            break;
                        case "gameFreeSpin":
                            nge.observer.fire("bs_background.stop"), nge.observer.fire("bn_background.play"), nge.observer.fire("wheelBackground.stop");
                            break;
                        case "luckyMill":
                            nge.observer.fire("bs_background.stop"), nge.observer.fire("bn_background.stop"), nge.observer.fire("wheelBackground.play")
                    }
                };
                var s = function(e) {
                        "play" === e && nge.observer.fire("ambient.play")
                    },
                    o = function() {
                        e.loopedSounds.forEach((function(t) {
                            e.fadeSound(t, .65, 100)
                        }))
                    },
                    l = function() {
                        e.loopedSounds.forEach((function(t) {
                            e.fadeSound(t, 1, 200)
                        }))
                    },
                    i = function(t) {
                        var a = "luckyMillEndPopup" === t ? 0 : .2;
                        e.loopedSounds.forEach((function(t) {
                            e.fadeSound(t, a, 200)
                        }))
                    },
                    p = function() {
                        e.loopedSounds.forEach((function(t) {
                            e.fadeSound(t, 1, 300)
                        }))
                    },
                    r = function() {
                        nge.observer.fire("wheelBackground.stop"), e.loopedSounds.forEach((function(t) {
                            e.fadeSound(t, 1, 300)
                        }))
                    },
                    m = function() {
                        nge.observer.fire("symbol_explosion_" + t + ".play"), 10 <= ++t && (t = 0)
                    },
                    u = function() {
                        nge.observer.fire("symbol_drop_" + a + ".play"), 10 <= ++a && (a = 0)
                    },
                    c = function(e) {
                        5 === e ? nge.observer.fire("bell_0.play") : 6 === e ? nge.observer.fire("bell_1.play") : 7 === e && nge.observer.fire("bell_2.play")
                    },
                    g = function() {
                        nge.observer.fire("button.hover_" + n), 3 <= ++n && (n = 0)
                    };
                this.customSubscribe = function() {
                    e.super.customSubscribe(), nge.observer.add("StatesManager.create.end", s, !1, !0), nge.observer.add("popup.showStart", i, !1, !0), nge.observer.add("sound.stopped.lucky_mill_end_popup", r, !1, !0), nge.observer.add("sound.stopped.end_freespins_popup", p, !1, !0), nge.observer.add("sound.stopped.start_freespins_popup", p, !1, !0), nge.observer.add("slotMachine.animateSymbolBang", m, !1, !0), nge.observer.add("slotMachine.showDustAnimation", u, !1, !0), nge.observer.add("sounds.win.regularWinLow", o, !1, !0), nge.observer.add("sounds.win.regularWinMid", o, !1, !0), nge.observer.add("sounds.win.regularWinHigh", o, !1, !0), nge.observer.add("sound.stopped.win_regularWinLow", l, !1, !0), nge.observer.add("sound.stopped.win_regularWinMid", l, !1, !0), nge.observer.add("sound.stopped.win_regularWinHigh", l, !1, !0), nge.observer.add("mushroom.playAnimationOn", c, !1, !0), nge.observer.add("button.hover", g, !1, !0)
                }
            }))
        },
        1172: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Win = nge.App.DjGameBase.Mlm.Brain.Win.extend((function() {
                this.bigWinHideHandler = function() {
                    nge.observer.fire("winlines.animateByOne.cycleComplete")
                }, this.showLineWinHandler = function() {}, this.regularWinSound = function(e) {
                    e = nge.localData.get("totalBet.value");
                    var t = +nge.localData.get("cascades.currentCascade.win");
                    t <= 1.99 * e ? nge.observer.fire("sounds.win.regularWinLow") : t <= 4.99 * e ? nge.observer.fire("sounds.win.regularWinMid") : t < 9.99 * e && nge.observer.fire("sounds.win.regularWinHigh")
                }
            }))
        },
        1173: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.ButtonsNewLogic = {}
        },
        1174: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.ButtonsNewLogic.Cfg = nge.App.DjGameBase.Mlm.Brain.ButtonsNewLogic.Cfg.extend((function() {
                this.slotMachineStates = {
                    demo: {
                        DEMO: []
                    },
                    play: {
                        SPIN: ["@PAYTABLE", "@SETTINGS_SCREEN", "BONUS_WHEEL", "SPIN", "FREESPIN"],
                        BONUS_WHEEL: ["SPIN"],
                        FREESPIN: ["SPIN"],
                        PAYTABLE: ["SPIN"],
                        SETTINGS_SCREEN: ["SPIN"]
                    }
                }, delete this.buttons.play.freeSpinStart, delete this.buttons.play.finalPopup, this.sharedStates = {
                    play: ["SHARED"]
                }, this.sharedButtons.play.linesChanger = {
                    name: "linesChanger",
                    enabled: !1,
                    visible: !0
                }
            }))
        },
        1175: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.ButtonsNewLogic.States = {}
        },
        1176: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.ButtonsNewLogic.States.BonusWheelState = nge.App.DjGameBase.Mlm.Brain.ButtonsNewLogic.States.BonusWheelState.extend((function() {
                this.model = {
                    order: ["SHOWED"],
                    actions: {
                        SHOWED: {
                            quickSettingsPanel: {
                                callback: function() {
                                    nge.observer.fire("quickSettings.panelSwitch")
                                }
                            },
                            sound: {
                                callback: function() {
                                    nge.observer.fire("settings.soundSwitch")
                                }
                            },
                            fullscreen: {
                                callback: function() {
                                    nge.observer.fire("fullscreen.btnClicked")
                                }
                            },
                            turboModeUI: {
                                title: nge.i18n.get("TURBO"),
                                enabled: ["!auto", "!offerInProgress"],
                                visible: ["!offerInProgress"]
                            }
                        }
                    }
                }, this.validityCheckHandler = function() {
                    return nge.localData.get("luckyMill.started")
                }, this.actionUpdateHandlers = {
                    onShowed: function() {
                        return "luckyMill" === nge.localData.get("layersSwitcher.currentLayer")
                    }
                }
            }))
        },
        1177: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.ButtonsNewLogic.States.SpinState = nge.App.DjGameBase.Mlm.Brain.ButtonsNewLogic.States.SpinState.extend((function() {
                this.subscribeCfgExt["buttons.resetBalanceReceivedFlag"] = "resetBalanceReceivedFlag", this.validityCheckHandler = function() {
                    var e = this.super.validityCheckHandler();
                    return !nge.localData.get("luckyMill.started") && e
                }, this.propUpdateHandlers.cascadesInProgress = function() {
                    return nge.localData.get("cascades.inProgress")
                }
            }))
        },
        1178: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.ButtonsNewLogic.States.SharedState = nge.App.DjGameBase.Mlm.Brain.ButtonsNewLogic.States.SharedState.extend((function() {
                var e = this,
                    t = nge.brain.do("getAllSpinLayers")[0],
                    a = nge.brain.do("getAllFreespinLayers")[0],
                    n = nge.brain.do("getAllBonusLayers")[0];
                this.propUpdateHandlers.showSettingsAndInfo = function() {
                    var e = nge.localData.get("autospin"),
                        s = nge.localData.get("slotMachine.state"),
                        o = nge.localData.get("layersSwitcher.currentLayer"),
                        l = !s,
                        i = nge.localData.get("isSpinReadyToProceed"),
                        p = nge.localData.get("bonusWheel.spinning"),
                        r = nge.localData.get("freespin.inProgress"),
                        m = nge.localData.get("cascades.inProgress"),
                        u = "big" === nge.localData.get("win.winType") || "regular" === nge.localData.get("win.winType");
                    return "Ready" === s && t.includes(o) || "FreeSpins" === s && a.includes(o) ? l = !0 : "PickBonus" !== s || p || !n.includes(o) && !a.includes(o) ? "BonusWheel" === s && (n.includes(o) || a.includes(o)) && (l = !0) : i = l = !0, !e && l && i && !m && !r && !u
                }, this.spinCompleteHandler = function() {
                    nge.localData.get("cascades.inProgress") || (e._spinInProgress = !1)
                }
            }))
        },
        1179: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Mobile = {}
        },
        1180: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Mobile.ButtonsNewLogic = {}
        },
        1181: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Mobile.ButtonsNewLogic.Cfg = nge.App.DjGameBase.Mlm.Brain.Mobile.ButtonsNewLogic.Cfg.extend((function() {
                this.slotMachineStates = {
                    demo: {
                        DEMO: []
                    },
                    play: {
                        SPIN: ["@PAYTABLE", "@SETTINGS_SCREEN", "BONUS_WHEEL", "SPIN", "FREESPIN"],
                        BONUS_WHEEL: ["SPIN"],
                        FREESPIN: ["SPIN"],
                        PAYTABLE: ["SPIN"],
                        SETTINGS_SCREEN: ["SPIN"]
                    }
                }, this.sharedStates = {
                    play: ["SHARED"]
                }, delete this.buttons.play.freeSpinStart, delete this.buttons.play.finalPopup
            }))
        },
        1182: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Mobile.ButtonsNewLogic.States = {}
        },
        1183: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Mobile.ButtonsNewLogic.States.SpinState = nge.App.DjGameBase.Mlm.Brain.Mobile.ButtonsNewLogic.States.SpinState.extend((function() {
                this.subscribeCfgExt["buttons.resetBalanceReceivedFlag"] = "resetBalanceReceivedFlag", this.validityCheckHandler = function() {
                    var e = this.super.validityCheckHandler();
                    return !nge.localData.get("luckyMill.started") && e
                }, this.propUpdateHandlers.cascadesInProgress = function() {
                    return nge.localData.get("cascades.inProgress")
                }
            }))
        },
        1184: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Mobile.ButtonsNewLogic.States.SharedState = nge.App.DjGameBase.Mlm.Brain.Mobile.ButtonsNewLogic.States.SharedState.extend((function() {
                var e = this,
                    t = nge.brain.do("getAllSpinLayers")[0],
                    a = nge.brain.do("getAllFreespinLayers")[0],
                    n = nge.brain.do("getAllBonusLayers")[0];
                this.propUpdateHandlers.showSettingsAndInfo = function() {
                    var e = nge.localData.get("autospin"),
                        s = nge.localData.get("slotMachine.state"),
                        o = nge.localData.get("layersSwitcher.currentLayer"),
                        l = !s,
                        i = nge.localData.get("isSpinReadyToProceed"),
                        p = nge.localData.get("freespin.inProgress"),
                        r = nge.localData.get("bonusWheel.spinning"),
                        m = nge.localData.get("cascades.inProgress"),
                        u = "big" === nge.localData.get("win.winType") || "regular" === nge.localData.get("win.winType");
                    return "Ready" === s && t.includes(o) || "FreeSpins" === s && a.includes(o) ? l = !0 : "PickBonus" !== s || r || !n.includes(o) && !a.includes(o) ? "BonusWheel" === s && (n.includes(o) || a.includes(o)) && (l = !0) : i = l = !0, !e && l && i && !m && !p && !u
                }, this.spinCompleteHandler = function() {
                    nge.localData.get("cascades.inProgress") || (e._spinInProgress = !1)
                }
            }))
        },
        1185: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Mobile.ButtonsNewLogic.States.BonusWheelState = nge.App[nge.appNS].Mlm.Brain.ButtonsNewLogic.States.BonusWheelState.extend((function() {
                this.model.actions.SHOWED.auto = {
                    visible: ["false"]
                }
            }))
        },
        1186: function(e, t) {
            nge.App[nge.appNS].Tpl = {}
        },
        1187: function(e, t) {
            nge.App[nge.appNS].Tpl.PsdAliases = Class.extend((function() {
                this.singleton = !0, this.data = {
                    introScreenTextArrow_aliases: "introScreenTextArrow(text=show_next_time, font=30pt futuraptheavy, fill=#fcf774, anchorY=0.5, maxWidth=380)_text",
                    introScreenText_aliases: "introScreenText(text=INTRO_TEXT, font=24pt futuraptheavy, fill=#fbd15e, stroke=#cd795f, strokeThickness=2, class=coloredText, shadowBlur=2, shadowOffsetY=2, shadowColor=#4c3718, align=center, anchorX=0.5, anchorY=0.5, lineHeight=40)_text",
                    demoPlayButtonText_aliases: "demoPlayButtonText(text=PLAY_BUTTON, font=45pt futuraptheavy, anchorX=0.5, anchorY=0.5, fill=#fec36d, maxWidth=180)_text",
                    popupNotificationsHeadText_aliases: "popupNotificationsHeadText(text=INSUFFICIENT_FUNDS, font=52pt futuraptheavy, anchorX=0.5, anchorY=0.5, fill=#fff, maxWidth=670)_text",
                    popupNotificationsContent_aliases: "popupNotificationsContent(text=Please_deposit_more, font=30pt futuraptheavy, anchorX=0.5, anchorY=0.5, fill=#efe1bf, align=center, maxWidth=870)_text",
                    menuElementOver_aliases: "menuElementOver(fill=#fff)_style",
                    menuElementBase_aliases: "menuElementBase(font=17pt futuraptheavy, anchorX=0.5, anchorY=0.5, fill=#fff)_style",
                    menuElementInfinity_aliases: "menuElementInfinity(font=40pt futuraptheavy, anchorX=0.5, anchorY=0.55, fill=#fff)_style",
                    autoButtonAmountTextInfinity_aliases: "autoButtonAmountTextInfinity(font=44pt futuraptheavy, anchorX=0.5, anchorY=0.5, fill=#e5e7db)_style",
                    autoButtonAmountTextBase_aliases: "autoButtonAmountTextBase(font=24pt futuraptheavy, anchorX=0.5, anchorY=0.5, fill=#e5e7db)_style",
                    winplanNameText_aliases: "winplanNameText(text=PAYTABLE_help, font=60pt futuraptmedium, fill=#eee0bf, anchorX=0.5, anchorY=0.5)_text",
                    pageOneText_aliases: "pageOneText(text=SUBSTITUTES_ALL_SYMBOLS, font=26pt futuraptheavy, fill=#fff, anchorX=0.1, anchorY=0.5, lineHeight=40, maxWidth=230)_text",
                    freefallBonusNameText_aliases: "freefallBonusNameText(text=DROPDOWN BONUS, font=60pt futuraptmedium, fill=#eee0bf, anchorX=0.5, anchorY=0.5)_text",
                    pageThreeText_aliases: "pageThreeText(text=All_symbols_from_winning_combinations, font=28pt futuraptmedium, fill=#fff, anchorX=0.5, anchorY=0.5, align=center, lineHeight=40)_text",
                    luckyMillBonusText_aliases: "luckyMillBonusText(text=LUCKY MILL BONUS, font=60pt futuraptmedium, fill=#eee0bf, anchorX=0.5, anchorY=0.5)_text",
                    pageFourText_aliases: "pageFourText(text=Lucky_Mill_Bonus_Game, font=28pt futuraptmedium, fill=#fff, anchorX=0.5, anchorY=0.5, align=center, lineHeight=35)_text",
                    freeSpinsBonusText_aliases: "freeSpinsBonusText(text=FREE SPINS BONUS, font=60pt futuraptmedium, fill=#eee0bf, anchorX=0.5, anchorY=0.5)_text",
                    pageFiveText_aliases: "pageFiveText(text=Following_your_initial_reel_win, font=28pt futuraptmedium, fill=#fff, anchorX=0.5, anchorY=0.5, align=center, lineHeight=40)_text",
                    wildName_aliases: "wildName(text=WILD SYMBOLS, font=60pt futuraptmedium, fill=#eee0bf, anchorX=0.5, anchorY=0.5)_text",
                    pageSixText0_aliases: "pageSixText0(text=ARE_WILD_CAN_APPEAR, font=30pt futuraptmedium, fill=#fff, anchorX=0.5, anchorY=0.5, align=center, lineHeight=40)_text",
                    pageSixText1_aliases: "pageSixText1(text=ONLY_AVAILABLE_IN, font=30pt futuraptmedium, fill=#fff, anchorX=0.5, anchorY=0.5, align=center, lineHeight=40)_text",
                    winLinesName_aliases: "winLinesName(text=WIN LINES, font=60pt futuraptmedium, fill=#eee0bf, anchorX=0.5, anchorY=0.5)_text",
                    rulesName_aliases: "rulesName(text=RULES_help, font=60pt futuraptmedium, fill=#eee0bf, anchorX=0.5, anchorY=0.5)_text",
                    pageEightText_aliases: "pageEightText(text=All_prizes_are_for_combinations, font=30pt futuraptmedium, fill=#fff, anchorX=0.5, anchorY=0.5, align=center, lineHeight=40)_text",
                    rtpTextEN_aliases: "rtpTextEN(text=rtpEN, font=30pt futuraptmedium, align=center, fill=#fff, anchorX=0.5, anchorY=0.5, class=rtpInfo)_text",
                    rtpTextRU_aliases: "rtpTextRU(text=rtpRU, font=30pt futuraptmedium, align=center, fill=#fff, anchorX=0.5, anchorY=0.5, class=rtpInfo)_text"
                }
            }))
        },
        1188: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups = {}
        },
        1189: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Atlases_demo = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {}
                }
            }
        },
        1190: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Atlases_play = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {}
                }
            }
        },
        1191: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Intro = function() {
                var e = nge.appPath + "img/";
                return {
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            key: "frameIntroScreen",
                            fullPath: e + "playarea/frameIntroScreen.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "introScreenArrow",
                            fullPath: e + "playarea/introScreenArrow.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "introScreenTextArrow_aliases",
                            fullPath: e + "playarea/introScreenTextArrow_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "autoStart(width=430, height=30, class=autoStartCheckBox)_clickableArea",
                            fullPath: e + "playarea/autoStart(width=430, height=30, class=autoStartCheckBox)_clickableArea.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "introScreenText_aliases",
                            fullPath: e + "playarea/introScreenText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "demoPlayButton(spritesX=3)_button",
                            fullPath: e + "playarea/demoPlayButton(spritesX=3)_button.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "demoPlayButtonText_aliases",
                            fullPath: e + "playarea/demoPlayButtonText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotification(scaleX=1920, scaleY=1080, color=#181223, class=cover)_cover",
                            fullPath: e + "playarea/popupNotification(scaleX=1920, scaleY=1080, color=#181223, class=cover)_cover.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotificationsBg",
                            fullPath: e + "playarea/popupNotificationsBg.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotificationsOkButton(spritesX=3)_button",
                            fullPath: e + "playarea/popupNotificationsOkButton(spritesX=3)_button.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotificationsContent_aliases",
                            fullPath: e + "playarea/popupNotificationsContent_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotificationsHeadText_aliases",
                            fullPath: e + "playarea/popupNotificationsHeadText_aliases.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: 1,
                            name: "popupNotificationsContainer",
                            alpha: "1",
                            contents: [{
                                type: 1,
                                name: "popupNotificationsNameContainer",
                                alpha: "1",
                                contents: [{
                                    type: 0,
                                    name: "popupNotificationsHeadText_aliases",
                                    assetKey: "popupNotificationsHeadText_aliases",
                                    x: "958",
                                    y: "491",
                                    alpha: "1"
                                }, {
                                    type: 0,
                                    name: "popupNotificationsContent_aliases",
                                    assetKey: "popupNotificationsContent_aliases",
                                    x: "958",
                                    y: "578",
                                    alpha: "1"
                                }]
                            }, {
                                type: 1,
                                name: "popupNotificationsButton",
                                alpha: "1",
                                contents: [{
                                    type: 0,
                                    name: "popupNotificationsOkButton(spritesX=3)_button",
                                    assetKey: "popupNotificationsOkButton(spritesX=3)_button",
                                    x: "810",
                                    y: "771",
                                    alpha: "1"
                                }]
                            }, {
                                type: 0,
                                name: "popupNotificationsBg",
                                assetKey: "popupNotificationsBg",
                                x: "401",
                                y: "232",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "popupNotification(scaleX=1920, scaleY=1080, color=#181223, class=cover)_cover",
                                assetKey: "popupNotification(scaleX=1920, scaleY=1080, color=#181223, class=cover)_cover",
                                x: "0",
                                y: "0",
                                alpha: "0.850980392156863"
                            }]
                        }, {
                            type: 1,
                            name: "introScreenContainer",
                            alpha: "1",
                            contents: [{
                                type: 1,
                                name: "introScreenButtonContainer",
                                alpha: "1",
                                contents: [{
                                    type: 0,
                                    name: "demoPlayButtonText_aliases",
                                    assetKey: "demoPlayButtonText_aliases",
                                    x: "962",
                                    y: "887",
                                    alpha: "1"
                                }, {
                                    type: 0,
                                    name: "demoPlayButton(spritesX=3)_button",
                                    assetKey: "demoPlayButton(spritesX=3)_button",
                                    x: "811",
                                    y: "814",
                                    alpha: "1"
                                }]
                            }, {
                                type: 0,
                                name: "introScreenText_aliases",
                                assetKey: "introScreenText_aliases",
                                x: "960",
                                y: "700",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "autoStart(width=430, height=30, class=autoStartCheckBox)_clickableArea",
                                assetKey: "autoStart(width=430, height=30, class=autoStartCheckBox)_clickableArea",
                                x: "762",
                                y: "981",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "introScreenTextArrow_aliases",
                                assetKey: "introScreenTextArrow_aliases",
                                x: "788",
                                y: "996",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "introScreenArrow",
                                assetKey: "introScreenArrow",
                                x: "748",
                                y: "986",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "frameIntroScreen",
                                assetKey: "frameIntroScreen",
                                x: "747",
                                y: "982",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "introScreenBg",
                                assetKey: "introScreenBg",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }]
                        }]
                    }
                }
            }
        },
        1192: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Help = function() {
                var e = nge.appPath + "img/";
                return {
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            key: "infoNextButton",
                            fullPath: e + "playarea/infoNextButton.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageInfoPlate",
                            fullPath: e + "playarea/pageInfoPlate.png",
                            frameHeight: 40
                        }, {
                            type: mt.assets.IMAGE,
                            key: "nameBg1_asset",
                            fullPath: e + "playarea/nameBg1_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageEightText_aliases",
                            fullPath: e + "playarea/pageEightText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "rulesName_aliases",
                            fullPath: e + "playarea/rulesName_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven19_content",
                            fullPath: e + "playarea/pageSeven19_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven18_content",
                            fullPath: e + "playarea/pageSeven18_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven17_content",
                            fullPath: e + "playarea/pageSeven17_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven16_content",
                            fullPath: e + "playarea/pageSeven16_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven15_content",
                            fullPath: e + "playarea/pageSeven15_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven14_content",
                            fullPath: e + "playarea/pageSeven14_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven13_content",
                            fullPath: e + "playarea/pageSeven13_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven12_content",
                            fullPath: e + "playarea/pageSeven12_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven11_content",
                            fullPath: e + "playarea/pageSeven11_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven10_content",
                            fullPath: e + "playarea/pageSeven10_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven9_content",
                            fullPath: e + "playarea/pageSeven9_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven8_content",
                            fullPath: e + "playarea/pageSeven8_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven7_content",
                            fullPath: e + "playarea/pageSeven7_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven6_content",
                            fullPath: e + "playarea/pageSeven6_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven5_content",
                            fullPath: e + "playarea/pageSeven5_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven4_content",
                            fullPath: e + "playarea/pageSeven4_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven3_content",
                            fullPath: e + "playarea/pageSeven3_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven2_content",
                            fullPath: e + "playarea/pageSeven2_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven1_content",
                            fullPath: e + "playarea/pageSeven1_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven0_content",
                            fullPath: e + "playarea/pageSeven0_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "winLinesName_aliases",
                            fullPath: e + "playarea/winLinesName_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix10_content",
                            fullPath: e + "playarea/pageSix10_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix9_content",
                            fullPath: e + "playarea/pageSix9_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix8_content",
                            fullPath: e + "playarea/pageSix8_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix7_content",
                            fullPath: e + "playarea/pageSix7_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix6_content",
                            fullPath: e + "playarea/pageSix6_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix5_content",
                            fullPath: e + "playarea/pageSix5_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix4_content",
                            fullPath: e + "playarea/pageSix4_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix3_content",
                            fullPath: e + "playarea/pageSix3_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix2_content",
                            fullPath: e + "playarea/pageSix2_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix1_content",
                            fullPath: e + "playarea/pageSix1_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix0_content",
                            fullPath: e + "playarea/pageSix0_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSixText1_aliases",
                            fullPath: e + "playarea/pageSixText1_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSixText0_aliases",
                            fullPath: e + "playarea/pageSixText0_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wildName_aliases",
                            fullPath: e + "playarea/wildName_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageFive_content",
                            fullPath: e + "playarea/pageFive_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageFiveText_aliases",
                            fullPath: e + "playarea/pageFiveText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "freeSpinsBonusText_aliases",
                            fullPath: e + "playarea/freeSpinsBonusText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageFour_content",
                            fullPath: e + "playarea/pageFour_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageFourText_aliases",
                            fullPath: e + "playarea/pageFourText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "luckyMillBonusText_aliases",
                            fullPath: e + "playarea/luckyMillBonusText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageThree1_content",
                            fullPath: e + "atlases/pageThree1_content.jpg"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageThree0_content",
                            fullPath: e + "atlases/pageThree0_content.jpg"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageThreeText_aliases",
                            fullPath: e + "playarea/pageThreeText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "freefallBonusNameText_aliases",
                            fullPath: e + "playarea/freefallBonusNameText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo4_content",
                            fullPath: e + "playarea/pageTwo4_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo3_content",
                            fullPath: e + "playarea/pageTwo3_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo2_content",
                            fullPath: e + "playarea/pageTwo2_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo1_content",
                            fullPath: e + "playarea/pageTwo1_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo0_content",
                            fullPath: e + "playarea/pageTwo0_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber14(class=ps10-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber14(class=ps10-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber13(class=ps10-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber13(class=ps10-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber12(class=ps10-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber12(class=ps10-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber11(class=ps9-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber11(class=ps9-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber10(class=ps9-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber10(class=ps9-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber9(class=ps9-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber9(class=ps9-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber8(class=ps8-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber8(class=ps8-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber7(class=ps8-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber7(class=ps8-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber6(class=ps8-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber6(class=ps8-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber5(class=ps7-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber5(class=ps7-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber4(class=ps7-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber4(class=ps7-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber3(class=ps7-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber3(class=ps7-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber2(class=ps6-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber2(class=ps6-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber1(class=ps6-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber1(class=ps6-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber0(class=ps6-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber0(class=ps6-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "winplanNameText_aliases",
                            fullPath: e + "playarea/winplanNameText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne5_content",
                            fullPath: e + "playarea/pageOne5_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne4_content",
                            fullPath: e + "playarea/pageOne4_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne3_content",
                            fullPath: e + "playarea/pageOne3_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne2_content",
                            fullPath: e + "playarea/pageOne2_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne1_content",
                            fullPath: e + "playarea/pageOne1_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne0_content",
                            fullPath: e + "playarea/pageOne0_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber8(class=ps5-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber8(class=ps5-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber7(class=ps5-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber7(class=ps5-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber6(class=ps5-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber6(class=ps5-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber5(class=ps4-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber5(class=ps4-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber4(class=ps4-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber4(class=ps4-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber3(class=ps4-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber3(class=ps4-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber11(class=ps2-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber11(class=ps2-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber10(class=ps2-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber10(class=ps2-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber9(class=ps2-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber9(class=ps2-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber14(class=ps3-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber14(class=ps3-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber13(class=ps3-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber13(class=ps3-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber12(class=ps3-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber12(class=ps3-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber17(class=ps1-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber17(class=ps1-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber16(class=ps1-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber16(class=ps1-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber15(class=ps1-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber15(class=ps1-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneText_aliases",
                            fullPath: e + "playarea/pageOneText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumbersYellow(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#fec36d)_style",
                            fullPath: e + "playarea/textNumbersYellow(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#fec36d)_style.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "paytableNumbersWhite(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#ffffff)_style",
                            fullPath: e + "playarea/paytableNumbersWhite(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#ffffff)_style.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "winplanNameText_aliases",
                            fullPath: e + "playarea/winplanNameText_aliases.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: 1,
                            name: "info_container",
                            alpha: "1",
                            contents: [{
                                type: 1,
                                name: "pagesInfo_container",
                                alpha: "1",
                                contents: [{
                                    type: 1,
                                    name: "pageInfoOne_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "winplanNameText_aliases",
                                        assetKey: "winplanNameText_aliases",
                                        x: "960",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "paytableNumbersWhite(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#ffffff)_style",
                                        assetKey: "paytableNumbersWhite(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#ffffff)_style",
                                        x: "583",
                                        y: "-43",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumbersYellow(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#fec36d)_style",
                                        assetKey: "textNumbersYellow(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#fec36d)_style",
                                        x: "583",
                                        y: "-43",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneText_aliases",
                                        assetKey: "pageOneText_aliases",
                                        x: "497",
                                        y: "350",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber15(class=ps1-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber15(class=ps1-5 paytableNumbersWhite)_text",
                                        x: "1072",
                                        y: "299",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber16(class=ps1-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber16(class=ps1-4 paytableNumbersWhite)_text",
                                        x: "1072",
                                        y: "349",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber17(class=ps1-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber17(class=ps1-3 paytableNumbersWhite)_text",
                                        x: "1072",
                                        y: "404",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1037",
                                        y: "299",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1037",
                                        y: "349",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1037",
                                        y: "404",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber12(class=ps3-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber12(class=ps3-5 paytableNumbersWhite)_text",
                                        x: "1615",
                                        y: "299",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber13(class=ps3-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber13(class=ps3-4 paytableNumbersWhite)_text",
                                        x: "1615",
                                        y: "349",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber14(class=ps3-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber14(class=ps3-3 paytableNumbersWhite)_text",
                                        x: "1615",
                                        y: "404",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1580",
                                        y: "299",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1580",
                                        y: "349",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1580",
                                        y: "404",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber9(class=ps2-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber9(class=ps2-5 paytableNumbersWhite)_text",
                                        x: "532",
                                        y: "644",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber10(class=ps2-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber10(class=ps2-4 paytableNumbersWhite)_text",
                                        x: "532",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber11(class=ps2-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber11(class=ps2-3 paytableNumbersWhite)_text",
                                        x: "532",
                                        y: "749",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "497",
                                        y: "644",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "497",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "497",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber3(class=ps4-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber3(class=ps4-5 paytableNumbersWhite)_text",
                                        x: "1071",
                                        y: "645",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber4(class=ps4-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber4(class=ps4-4 paytableNumbersWhite)_text",
                                        x: "1071",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber5(class=ps4-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber5(class=ps4-3 paytableNumbersWhite)_text",
                                        x: "1071",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1036",
                                        y: "645",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1036",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1036",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber6(class=ps5-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber6(class=ps5-5 paytableNumbersWhite)_text",
                                        x: "1615",
                                        y: "645",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber7(class=ps5-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber7(class=ps5-4 paytableNumbersWhite)_text",
                                        x: "1615",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber8(class=ps5-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber8(class=ps5-3 paytableNumbersWhite)_text",
                                        x: "1615",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1580",
                                        y: "645",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1580",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1580",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne0_content",
                                        assetKey: "pageOne0_content",
                                        x: "163",
                                        y: "215",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne1_content",
                                        assetKey: "pageOne1_content",
                                        x: "701",
                                        y: "224",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne2_content",
                                        assetKey: "pageOne2_content",
                                        x: "1236",
                                        y: "211",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne3_content",
                                        assetKey: "pageOne3_content",
                                        x: "172",
                                        y: "566",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne4_content",
                                        assetKey: "pageOne4_content",
                                        x: "705",
                                        y: "567",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne5_content",
                                        assetKey: "pageOne5_content",
                                        x: "1250",
                                        y: "567",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoTwo_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "winplanNameText_aliases",
                                        assetKey: "winplanNameText_aliases",
                                        x: "960",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber0(class=ps6-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber0(class=ps6-5 paytableNumbersWhite)_text",
                                        x: "547",
                                        y: "310",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber1(class=ps6-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber1(class=ps6-4 paytableNumbersWhite)_text",
                                        x: "547",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber2(class=ps6-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber2(class=ps6-3 paytableNumbersWhite)_text",
                                        x: "547",
                                        y: "420",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "512",
                                        y: "310",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "512",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "512",
                                        y: "420",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber3(class=ps7-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber3(class=ps7-5 paytableNumbersWhite)_text",
                                        x: "1085",
                                        y: "310",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber4(class=ps7-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber4(class=ps7-4 paytableNumbersWhite)_text",
                                        x: "1085",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber5(class=ps7-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber5(class=ps7-3 paytableNumbersWhite)_text",
                                        x: "1085",
                                        y: "419",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1050",
                                        y: "310",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1050",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1050",
                                        y: "419",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber6(class=ps8-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber6(class=ps8-5 paytableNumbersWhite)_text",
                                        x: "1627",
                                        y: "309",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber7(class=ps8-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber7(class=ps8-4 paytableNumbersWhite)_text",
                                        x: "1627",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber8(class=ps8-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber8(class=ps8-3 paytableNumbersWhite)_text",
                                        x: "1627",
                                        y: "420",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1588",
                                        y: "309",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1588",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1588",
                                        y: "420",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber9(class=ps9-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber9(class=ps9-5 paytableNumbersWhite)_text",
                                        x: "796",
                                        y: "642",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber10(class=ps9-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber10(class=ps9-4 paytableNumbersWhite)_text",
                                        x: "796",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber11(class=ps9-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber11(class=ps9-3 paytableNumbersWhite)_text",
                                        x: "796",
                                        y: "752",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "761",
                                        y: "642",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "761",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "761",
                                        y: "752",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber12(class=ps10-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber12(class=ps10-5 paytableNumbersWhite)_text",
                                        x: "1376",
                                        y: "647",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber13(class=ps10-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber13(class=ps10-4 paytableNumbersWhite)_text",
                                        x: "1376",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber14(class=ps10-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber14(class=ps10-3 paytableNumbersWhite)_text",
                                        x: "1376",
                                        y: "752",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1341",
                                        y: "647",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1341",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1341",
                                        y: "752",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo0_content",
                                        assetKey: "pageTwo0_content",
                                        x: "185",
                                        y: "235",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo1_content",
                                        assetKey: "pageTwo1_content",
                                        x: "721",
                                        y: "238",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo2_content",
                                        assetKey: "pageTwo2_content",
                                        x: "1260",
                                        y: "242",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo3_content",
                                        assetKey: "pageTwo3_content",
                                        x: "434",
                                        y: "576",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo4_content",
                                        assetKey: "pageTwo4_content",
                                        x: "1014",
                                        y: "571",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoThree_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "freefallBonusNameText_aliases",
                                        assetKey: "freefallBonusNameText_aliases",
                                        x: "960",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageThreeText_aliases",
                                        assetKey: "pageThreeText_aliases",
                                        x: "960",
                                        y: "814",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageThree0_content",
                                        assetKey: "pageThree0_content",
                                        x: "209",
                                        y: "264",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageThree1_content",
                                        assetKey: "pageThree1_content",
                                        x: "991",
                                        y: "264",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoFour_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "luckyMillBonusText_aliases",
                                        assetKey: "luckyMillBonusText_aliases",
                                        x: "960",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageFourText_aliases",
                                        assetKey: "pageFourText_aliases",
                                        x: "960",
                                        y: "846",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageFour_content",
                                        assetKey: "pageFour_content",
                                        x: "544",
                                        y: "88",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoFive_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "freeSpinsBonusText_aliases",
                                        assetKey: "freeSpinsBonusText_aliases",
                                        x: "960",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageFiveText_aliases",
                                        assetKey: "pageFiveText_aliases",
                                        x: "960",
                                        y: "814",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageFive_content",
                                        assetKey: "pageFive_content",
                                        x: "98",
                                        y: "201",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoSix_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "wildName_aliases",
                                        assetKey: "wildName_aliases",
                                        x: "960",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSixText0_aliases",
                                        assetKey: "pageSixText0_aliases",
                                        x: "959",
                                        y: "484",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSixText1_aliases",
                                        assetKey: "pageSixText1_aliases",
                                        x: "961",
                                        y: "838",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix0_content",
                                        assetKey: "pageSix0_content",
                                        x: "120",
                                        y: "166",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix1_content",
                                        assetKey: "pageSix1_content",
                                        x: "419",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix2_content",
                                        assetKey: "pageSix2_content",
                                        x: "692",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix3_content",
                                        assetKey: "pageSix3_content",
                                        x: "964",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix4_content",
                                        assetKey: "pageSix4_content",
                                        x: "1237",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix5_content",
                                        assetKey: "pageSix5_content",
                                        x: "1509",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix6_content",
                                        assetKey: "pageSix6_content",
                                        x: "1376",
                                        y: "541",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix7_content",
                                        assetKey: "pageSix7_content",
                                        x: "1104",
                                        y: "541",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix8_content",
                                        assetKey: "pageSix8_content",
                                        x: "832",
                                        y: "541",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix9_content",
                                        assetKey: "pageSix9_content",
                                        x: "560",
                                        y: "541",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix10_content",
                                        assetKey: "pageSix10_content",
                                        x: "283",
                                        y: "541",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoSeven_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "winLinesName_aliases",
                                        assetKey: "winLinesName_aliases",
                                        x: "960",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven0_content",
                                        assetKey: "pageSeven0_content",
                                        x: "270",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven1_content",
                                        assetKey: "pageSeven1_content",
                                        x: "569",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven2_content",
                                        assetKey: "pageSeven2_content",
                                        x: "867",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven3_content",
                                        assetKey: "pageSeven3_content",
                                        x: "1165",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven4_content",
                                        assetKey: "pageSeven4_content",
                                        x: "1465",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven5_content",
                                        assetKey: "pageSeven5_content",
                                        x: "270",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven6_content",
                                        assetKey: "pageSeven6_content",
                                        x: "569",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven7_content",
                                        assetKey: "pageSeven7_content",
                                        x: "867",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven8_content",
                                        assetKey: "pageSeven8_content",
                                        x: "1165",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven9_content",
                                        assetKey: "pageSeven9_content",
                                        x: "1465",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven10_content",
                                        assetKey: "pageSeven10_content",
                                        x: "270",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven11_content",
                                        assetKey: "pageSeven11_content",
                                        x: "569",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven12_content",
                                        assetKey: "pageSeven12_content",
                                        x: "867",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven13_content",
                                        assetKey: "pageSeven13_content",
                                        x: "1165",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven14_content",
                                        assetKey: "pageSeven14_content",
                                        x: "1465",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven15_content",
                                        assetKey: "pageSeven15_content",
                                        x: "270",
                                        y: "716",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven16_content",
                                        assetKey: "pageSeven16_content",
                                        x: "569",
                                        y: "716",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven17_content",
                                        assetKey: "pageSeven17_content",
                                        x: "867",
                                        y: "716",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven18_content",
                                        assetKey: "pageSeven18_content",
                                        x: "1165",
                                        y: "716",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven19_content",
                                        assetKey: "pageSeven19_content",
                                        x: "1465",
                                        y: "716",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoEight_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "rulesName_aliases",
                                        assetKey: "rulesName_aliases",
                                        x: "960",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageEightText_aliases",
                                        assetKey: "pageEightText_aliases",
                                        x: "960",
                                        y: "492",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "rtpTextEN_aliases",
                                        assetKey: "pageEightText_aliases",
                                        x: "960",
                                        y: "872",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "rtpTextRU_aliases",
                                        assetKey: "pageEightText_aliases",
                                        x: "960",
                                        y: "810",
                                        alpha: "1"
                                    }]
                                }]
                            }, {
                                type: mt.objects.IMAGE,
                                name: "nameBg1_asset",
                                assetKey: "nameBg1_asset"
                            }, {
                                type: mt.objects.NINE_SLICE,
                                name: "nameBg",
                                assetKey: "nameBg1",
                                bottom: 12,
                                top: 12,
                                left: 12,
                                right: 12,
                                height: 100,
                                width: 1920
                            }, {
                                type: mt.objects.GROUP,
                                name: "paginationInfo_container",
                                y: 900,
                                x: 764,
                                contents: [{
                                    type: 14,
                                    name: "pageInfoOnePlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 0,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    action: "function(){nge.observer.fire('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoTwoPlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 1,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 50,
                                    action: "function(){nge.observer.fire('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoThreePlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 2,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 100,
                                    action: "function(){nge.observer.fire('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoFourPlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 3,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 150,
                                    action: "function(){nge.observer.fire('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoFivePlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 4,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 200,
                                    action: "function(){nge.observer.fire('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoSixPlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 5,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 250,
                                    action: "function(){nge.observer.fire('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoSevenPlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 6,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 300,
                                    action: "function(){nge.observer.fire('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoEightPlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 7,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 350,
                                    action: "function(){nge.observer.fire('radiobutton.click.helpCarousel', _selectPage);}"
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "buttonsHelpContainer",
                                y: 469,
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "leftButtonsHelpContainer",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "infoPrevButtonButton",
                                        assetKey: "infoNextButton",
                                        btnFrames: {
                                            over: 2,
                                            out: 1,
                                            down: 0
                                        },
                                        pixelPerfectClick: !1,
                                        pixelPerfectOver: !1,
                                        x: 132,
                                        scaleX: -1,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "infoPrev");}'
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "rightButtonsHelpContainer",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "infoNextButtonButton",
                                        assetKey: "infoNextButton",
                                        btnFrames: {
                                            over: 2,
                                            out: 1,
                                            down: 0
                                        },
                                        pixelPerfectClick: !1,
                                        pixelPerfectOver: !1,
                                        x: 1788,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "infoNext");}'
                                    }]
                                }]
                            }]
                        }]
                    }
                }
            }
        },
        1193: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Ui = function() {
                var e = nge.App.DjGameBase.Tpl.Groups.Ui();
                return e.styles[".titleTextStyle"].style.font = "18pt futuraptheavy", e.styles[".titleButtonStyle"].style.fill = 16696173, e.styles[".titleButtonStyle"].style.stroke = 1710098, e.styles[".titleButtonStyle"].style.strokeThickness = 4, e.styles[".titleButtonStyle"].style.lineHeight = 37, e.styles[".titleTextStyle"].style.font = "18pt futuraptheavy", e.styles[".titleTextStyle"].style.fill = 16766049, e.styles[".titleTextStyle"].style.strokeThickness = 6, e.styles[".freespinTextStyle"].style.fill = 16696173, ["autoButtonText", "turboModeUIButtonText"].forEach((function(t) {
                    (t = nge.Lib.Helper.customRecursiveFind("name", t, "contents", e.objects, !1, !0, !1)) && (t.y = +t.y + 3)
                })), e
            }
        },
        1194: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Mobile = {}
        },
        1195: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Mobile.Ui = function() {
                var e = nge.appPath + "img/",
                    t = {
                        font: "39pt futuraptheavy",
                        fill: 16777215,
                        shadowColor: 2429709
                    },
                    a = {
                        font: "30pt futuraptheavy",
                        fill: 16777215,
                        shadowColor: 2429709
                    };
                return {
                    styles: {
                        ".titleStyleMobile": {
                            style: {
                                font: "26pt futuraptheavy",
                                fill: 14997173,
                                stroke: 4335900,
                                strokeThickness: 8
                            }
                        },
                        ".freeSpinsStyleMobile": {
                            style: {
                                font: "20pt futuraptheavy",
                                fill: 16696173,
                                shadowColor: 2429709
                            }
                        }
                    },
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            key: "panelbg",
                            fullPath: e + "playarea/panelbg.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "winbg",
                            fullPath: e + "playarea/winbg.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "autoSpinButtonMobile",
                            fullPath: e + "playarea/autoSpinButtonMobile.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "cash_asset",
                            fullPath: e + "playarea/cash_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "home_asset",
                            fullPath: e + "playarea/home_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "settingPanelMobileBackBg1_asset",
                            fullPath: e + "playarea/settingPanelMobileBackBg1_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "betPlusButtonMobile",
                            fullPath: e + "playarea/betPlusButtonMobile.png",
                            frameWidth: 84
                        }, {
                            type: mt.assets.IMAGE,
                            key: "betMinusButtonMobile",
                            fullPath: e + "playarea/betMinusButtonMobile.png",
                            frameWidth: 84
                        }, {
                            type: mt.assets.IMAGE,
                            key: "helpMobileButton",
                            fullPath: e + "playarea/helpMobileButton.png",
                            frameWidth: 92
                        }, {
                            type: mt.assets.IMAGE,
                            key: "settingsMobileButton",
                            fullPath: e + "playarea/settingsMobileButton.png",
                            frameWidth: 92
                        }, {
                            type: mt.assets.IMAGE,
                            key: "soundMobileButton",
                            fullPath: e + "playarea/soundMobileButton.png",
                            frameWidth: 92
                        }, {
                            type: mt.assets.IMAGE,
                            key: "quickSettingsPanelMobileButton",
                            fullPath: e + "playarea/quickSettingsPanelMobileButton.png",
                            frameWidth: 140
                        }, {
                            type: mt.assets.IMAGE,
                            key: "betSettingButtonMobile",
                            fullPath: e + "playarea/betSettingButtonMobile.png",
                            frameWidth: 136
                        }, {
                            type: mt.assets.IMAGE,
                            key: "spinButton",
                            fullPath: e + "playarea/spinButton.png",
                            frameWidth: 296,
                            frameHeight: 296
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: mt.objects.GROUP,
                            name: "buttonsMobileContainer",
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "customButtonsMobileContainer",
                                class: "customButtonsMobileContainer",
                                contents: []
                            }, {
                                type: mt.objects.GROUP,
                                name: "autoSpinMobileContainer",
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "autoSpinButtonMobile",
                                    contents: [{
                                        type: mt.objects.TEXT,
                                        name: "autoSpinButtonName2",
                                        text: "AUTO",
                                        style: {
                                            align: "center",
                                            font: "23pt futuraptheavy",
                                            fill: 16696173
                                        },
                                        class: "buttonStyleNormal",
                                        lineHeight: 32,
                                        anchorX: .5,
                                        anchorY: .5,
                                        maxWidth: 105,
                                        x: 1739,
                                        y: 224
                                    }, {
                                        type: mt.objects.BUTTON,
                                        name: "autoSpinButtonMobileButton",
                                        assetKey: "autoSpinButtonMobile",
                                        btnFrames: {
                                            over: 2,
                                            out: 1,
                                            down: 0
                                        },
                                        pixelPerfectClick: !1,
                                        pixelPerfectOver: !1,
                                        x: 1650,
                                        y: 133,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "autoSpinMobile");}'
                                    }]
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "playButtonMobileContainer",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "spinButtonButton",
                                    assetKey: "spinButton",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 1592,
                                    y: 329,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "spin");}'
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "betSettingButtonMobile",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "betSettingButtonMobileButton",
                                    assetKey: "betSettingButtonMobile",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 1754,
                                    y: 941,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "betSettingButtonMobile");}'
                                }]
                            }]
                        }, {
                            type: mt.objects.GROUP,
                            name: "settingBottomUIMobileContainer",
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "settingPanelMobileBackBg1_asset",
                                assetKey: "settingPanelMobileBackBg1_asset",
                                x: 39,
                                y: 598,
                                alpha: .501960784313725
                            }, {
                                type: mt.objects.GROUP,
                                name: "infoPanelPlusMobileButton",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "quickSettingsPanelMobileButtonButton",
                                    assetKey: "quickSettingsPanelMobileButton",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 33,
                                    y: 935,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "quickSettingsPanel");}'
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "soundOffOnMobileButtonButton",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "soundMobileButtonButton",
                                    assetKey: "soundMobileButton",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 58,
                                    y: 627,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "soundMobile");}'
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "settingPanelMobileButtonButton",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "settingsMobileButtonButton",
                                    assetKey: "settingsMobileButton",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 58,
                                    y: 737,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "settings");}'
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "helpMobileButtonButtonPanel",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "helpMobileButtonButton",
                                    assetKey: "helpMobileButton",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 58,
                                    y: 847,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "paytable");}'
                                }]
                            }, {
                                type: mt.objects.NINE_SLICE,
                                name: "settingPanelMobileBackBg",
                                assetKey: "settingPanelMobileBackBg1",
                                alpha: .8,
                                anchorX: 0,
                                anchorY: 0,
                                height: 464,
                                width: 128,
                                left: 64,
                                right: 64,
                                top: 64,
                                bottom: 64,
                                x: 166,
                                y: 1069,
                                scaleX: 1 / nge.assets.getQualityFactor(),
                                scaleY: 1 / nge.assets.getQualityFactor()
                            }]
                        }, {
                            type: mt.objects.GROUP,
                            name: "gameFreeSpinMobileContainer",
                            contents: [{
                                type: mt.objects.TEXT,
                                name: "counterFreeSpinsText",
                                text: "FREE GAME: 2 OF 2",
                                class: "freeSpinAmount freeSpinsStyleMobile",
                                anchorX: .5,
                                anchorY: .5,
                                x: 960,
                                y: 1020
                            }]
                        }, {
                            type: mt.objects.GROUP,
                            name: "infoPanelMobileContainer",
                            contents: [{
                                type: mt.objects.TEXT,
                                name: "balanceMobileName",
                                text: "BALANCE",
                                class: "titleStyleMobile",
                                anchorX: .5,
                                anchorY: .5,
                                x: 1495,
                                y: 933
                            }, {
                                type: mt.objects.TEXT,
                                name: "winMobileName",
                                text: "WIN",
                                class: "titleStyleMobile",
                                anchorX: .5,
                                anchorY: .5,
                                x: 960,
                                y: 904
                            }, {
                                type: mt.objects.TEXT,
                                name: "totalBetMobileName",
                                text: "TOTAL BET",
                                class: "titleStyleMobile",
                                anchorX: .5,
                                anchorY: .5,
                                x: 424,
                                y: 933
                            }, {
                                type: mt.objects.GROUP,
                                name: "betMinusButtonMobile",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "betMinusButtonMobileButton",
                                    assetKey: "betMinusButtonMobile",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 214,
                                    y: 962,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "betMinus");}'
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "betPlusButtonMobile",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "betPlusButtonMobileButton",
                                    assetKey: "betPlusButtonMobile",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 552,
                                    y: 962,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "betPlus");}'
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "totalBetMobileContaner",
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "totalBetMobileContent_container",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "totalBetMobileContainerArea",
                                        assetKey: "areaEmpty",
                                        class: "currencyChanger",
                                        alpha: 0,
                                        anchorX: .5,
                                        anchorY: .5,
                                        scaleX: 232,
                                        scaleY: 96,
                                        pixelPerfectClick: 0,
                                        pixelPerfectOver: 0,
                                        x: 425,
                                        y: 1007,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "currencyChanger");}'
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "totalBetMobilleNumber",
                                        style: a,
                                        class: "playAreaTextMobile totalBetNumber",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: 425,
                                        y: 1007
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "totalBetMobileCoinsContent_container",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "totalBetMobileContainerArea",
                                        assetKey: "areaEmpty",
                                        class: "currencyChanger",
                                        alpha: 0,
                                        anchorX: .5,
                                        anchorY: .5,
                                        pixelPerfectClick: 0,
                                        pixelPerfectOver: 0,
                                        scaleX: 232,
                                        scaleY: 96,
                                        x: 425,
                                        y: 1007,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "currencyChanger");}'
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "totalBetCoinsMobileNumber",
                                        style: a,
                                        class: "playAreaTextMobile creditsTotalBetNumber",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: 425,
                                        y: 1007
                                    }]
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "winBottomlUIMobileContainer",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "winMobileContainerArea",
                                    assetKey: "areaEmpty",
                                    class: "currencyChanger",
                                    alpha: 0,
                                    anchorX: .5,
                                    anchorY: .5,
                                    pixelPerfectClick: 0,
                                    pixelPerfectOver: 0,
                                    scaleX: 556,
                                    scaleY: 140,
                                    x: 960,
                                    y: 989,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "currencyChanger");}'
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "winMobileContentContainer",
                                    contents: [{
                                        type: mt.objects.TEXT,
                                        name: "winMobileNumber",
                                        style: t,
                                        class: "playAreaTextMobile winNumber",
                                        anchorX: .5,
                                        anchorY: .5,
                                        maxWidth: 460,
                                        x: 960,
                                        y: 989
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "winMobileCoinsContentContainer",
                                    contents: [{
                                        type: mt.objects.TEXT,
                                        name: "creditsWinMobileNumber",
                                        style: t,
                                        class: "playAreaTextMobile creditsWinNumber",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: 960,
                                        y: 989
                                    }]
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "balanceMobileContainer",
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "balanceMobileCoinsContent_container",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "balanceCoinsMobileContainerArea",
                                        assetKey: "areaEmpty",
                                        class: "currencyChanger",
                                        alpha: 0,
                                        anchorX: .5,
                                        anchorY: .5,
                                        pixelPerfectClick: 0,
                                        pixelPerfectOver: 0,
                                        scaleX: 440,
                                        scaleY: 96,
                                        x: 1497,
                                        y: 1007,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "currencyChanger");}'
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "balanceCoinsMobileNumber",
                                        style: a,
                                        class: "playAreaTextMobile creditsNumber",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: 1497,
                                        y: 1007
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "balanceMobileContent_container",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "balanceMobileContainerArea",
                                        assetKey: "areaEmpty",
                                        class: "currencyChanger",
                                        alpha: 0,
                                        anchorX: .5,
                                        anchorY: .5,
                                        pixelPerfectClick: 0,
                                        pixelPerfectOver: 0,
                                        scaleX: 440,
                                        scaleY: 96,
                                        x: 1497,
                                        y: 1007,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "currencyChanger");}'
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "balanceMobileNumber",
                                        style: a,
                                        class: "playAreaTextMobile balanceNumber",
                                        anchorX: .5,
                                        anchorY: .5,
                                        x: 1497,
                                        y: 1007
                                    }]
                                }]
                            }, {
                                type: mt.objects.IMAGE,
                                name: "winbg",
                                assetKey: "winbg",
                                x: 683,
                                y: 924
                            }, {
                                type: mt.objects.IMAGE,
                                name: "panelbg",
                                assetKey: "panelbg",
                                x: 1274,
                                y: 950
                            }, {
                                type: mt.objects.IMAGE,
                                name: "panelbg",
                                assetKey: "panelbg",
                                x: 203,
                                y: 950
                            }]
                        }]
                    }
                }
            }
        },
        1196: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Mobile.Help = function() {
                var e = nge.appPath + "img/";
                return {
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            key: "1px_empty",
                            fullPath: e + "blank.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "fake_end_px",
                            fullPath: e + "blank.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "infoMobileNextButton",
                            fullPath: e + "playarea/infoMobileNextButton.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageInfoPlate",
                            fullPath: e + "playarea/pageInfoPlate.png",
                            frameHeight: 40
                        }, {
                            type: mt.assets.IMAGE,
                            key: "nameBg1_asset",
                            fullPath: e + "playarea/nameBg1_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageEightText_aliases",
                            fullPath: e + "playarea/pageEightText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "rulesName_aliases",
                            fullPath: e + "playarea/rulesName_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven19_content",
                            fullPath: e + "playarea/pageSeven19_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven18_content",
                            fullPath: e + "playarea/pageSeven18_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven17_content",
                            fullPath: e + "playarea/pageSeven17_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven16_content",
                            fullPath: e + "playarea/pageSeven16_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven15_content",
                            fullPath: e + "playarea/pageSeven15_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven14_content",
                            fullPath: e + "playarea/pageSeven14_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven13_content",
                            fullPath: e + "playarea/pageSeven13_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven12_content",
                            fullPath: e + "playarea/pageSeven12_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven11_content",
                            fullPath: e + "playarea/pageSeven11_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven10_content",
                            fullPath: e + "playarea/pageSeven10_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven9_content",
                            fullPath: e + "playarea/pageSeven9_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven8_content",
                            fullPath: e + "playarea/pageSeven8_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven7_content",
                            fullPath: e + "playarea/pageSeven7_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven6_content",
                            fullPath: e + "playarea/pageSeven6_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven5_content",
                            fullPath: e + "playarea/pageSeven5_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven4_content",
                            fullPath: e + "playarea/pageSeven4_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven3_content",
                            fullPath: e + "playarea/pageSeven3_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven2_content",
                            fullPath: e + "playarea/pageSeven2_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven1_content",
                            fullPath: e + "playarea/pageSeven1_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSeven0_content",
                            fullPath: e + "playarea/pageSeven0_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "winLinesName_aliases",
                            fullPath: e + "playarea/winLinesName_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix10_content",
                            fullPath: e + "playarea/pageSix10_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix9_content",
                            fullPath: e + "playarea/pageSix9_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix8_content",
                            fullPath: e + "playarea/pageSix8_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix7_content",
                            fullPath: e + "playarea/pageSix7_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix6_content",
                            fullPath: e + "playarea/pageSix6_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix5_content",
                            fullPath: e + "playarea/pageSix5_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix4_content",
                            fullPath: e + "playarea/pageSix4_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix3_content",
                            fullPath: e + "playarea/pageSix3_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix2_content",
                            fullPath: e + "playarea/pageSix2_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix1_content",
                            fullPath: e + "playarea/pageSix1_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSix0_content",
                            fullPath: e + "playarea/pageSix0_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSixText1_aliases",
                            fullPath: e + "playarea/pageSixText1_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageSixText0_aliases",
                            fullPath: e + "playarea/pageSixText0_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wildName_aliases",
                            fullPath: e + "playarea/wildName_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageFive_content",
                            fullPath: e + "playarea/pageFive_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageFiveText_aliases",
                            fullPath: e + "playarea/pageFiveText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "freeSpinsBonusText_aliases",
                            fullPath: e + "playarea/freeSpinsBonusText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageFour_content",
                            fullPath: e + "playarea/pageFour_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageFourText_aliases",
                            fullPath: e + "playarea/pageFourText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "luckyMillBonusText_aliases",
                            fullPath: e + "playarea/luckyMillBonusText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageThree1_content",
                            fullPath: e + "atlases/pageThree1_content.jpg"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageThree0_content",
                            fullPath: e + "atlases/pageThree0_content.jpg"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageThreeText_aliases",
                            fullPath: e + "playarea/pageThreeText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "freefallBonusNameText_aliases",
                            fullPath: e + "playarea/freefallBonusNameText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo4_content",
                            fullPath: e + "playarea/pageTwo4_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo3_content",
                            fullPath: e + "playarea/pageTwo3_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo2_content",
                            fullPath: e + "playarea/pageTwo2_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo1_content",
                            fullPath: e + "playarea/pageTwo1_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwo0_content",
                            fullPath: e + "playarea/pageTwo0_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber14(class=ps10-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber14(class=ps10-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber13(class=ps10-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber13(class=ps10-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber12(class=ps10-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber12(class=ps10-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber11(class=ps9-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber11(class=ps9-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber10(class=ps9-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber10(class=ps9-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber9(class=ps9-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber9(class=ps9-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber8(class=ps8-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber8(class=ps8-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber7(class=ps8-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber7(class=ps8-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber6(class=ps8-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber6(class=ps8-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber5(class=ps7-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber5(class=ps7-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber4(class=ps7-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber4(class=ps7-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber3(class=ps7-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber3(class=ps7-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber2(class=ps6-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber2(class=ps6-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber1(class=ps6-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber1(class=ps6-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageTwoNumber0(class=ps6-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageTwoNumber0(class=ps6-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "winplanNameText_aliases",
                            fullPath: e + "playarea/winplanNameText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne5_content",
                            fullPath: e + "playarea/pageOne5_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne4_content",
                            fullPath: e + "playarea/pageOne4_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne3_content",
                            fullPath: e + "playarea/pageOne3_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne2_content",
                            fullPath: e + "playarea/pageOne2_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne1_content",
                            fullPath: e + "playarea/pageOne1_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOne0_content",
                            fullPath: e + "playarea/pageOne0_content.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber8(class=ps5-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber8(class=ps5-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber7(class=ps5-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber7(class=ps5-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber6(class=ps5-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber6(class=ps5-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber5(class=ps4-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber5(class=ps4-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber4(class=ps4-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber4(class=ps4-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber3(class=ps4-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber3(class=ps4-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber11(class=ps2-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber11(class=ps2-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber10(class=ps2-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber10(class=ps2-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber9(class=ps2-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber9(class=ps2-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber14(class=ps3-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber14(class=ps3-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber13(class=ps3-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber13(class=ps3-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber12(class=ps3-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber12(class=ps3-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber3(text=3 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber3(text=3 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber4(text=4 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber4(text=4 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumber5(text=5 , class=textNumbersYellow)_text",
                            fullPath: e + "playarea/textNumber5(text=5 , class=textNumbersYellow)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber17(class=ps1-3 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber17(class=ps1-3 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber16(class=ps1-4 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber16(class=ps1-4 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneNumber15(class=ps1-5 paytableNumbersWhite)_text",
                            fullPath: e + "playarea/pageOneNumber15(class=ps1-5 paytableNumbersWhite)_text.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "pageOneText_aliases",
                            fullPath: e + "playarea/pageOneText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "textNumbersYellow(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#fec36d)_style",
                            fullPath: e + "playarea/textNumbersYellow(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#fec36d)_style.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "paytableNumbersWhite(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#ffffff)_style",
                            fullPath: e + "playarea/paytableNumbersWhite(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#ffffff)_style.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "winplanNameText_aliases",
                            fullPath: e + "playarea/winplanNameText_aliases.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: 1,
                            name: "info_container",
                            alpha: "1",
                            contents: [{
                                type: 1,
                                name: "pagesInfo(x=100, width=1720, height=1080, swipe=2, dragScrollSensivity=0.0001)_container",
                                alpha: "1",
                                contents: [{
                                    type: 1,
                                    name: "pageInfoOne_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "winplanNameText_aliases",
                                        assetKey: "winplanNameText_aliases",
                                        x: "860",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "paytableNumbersWhite(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#ffffff)_style",
                                        assetKey: "paytableNumbersWhite(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#ffffff)_style",
                                        x: "483",
                                        y: "-43",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumbersYellow(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#fec36d)_style",
                                        assetKey: "textNumbersYellow(font=30pt futuraptmedium, anchorX=0.05, anchorY=0.5, fill=#fec36d)_style",
                                        x: "483",
                                        y: "-43",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneText_aliases",
                                        assetKey: "pageOneText_aliases",
                                        x: "397",
                                        y: "350",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber15(class=ps1-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber15(class=ps1-5 paytableNumbersWhite)_text",
                                        x: "972",
                                        y: "299",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber16(class=ps1-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber16(class=ps1-4 paytableNumbersWhite)_text",
                                        x: "972",
                                        y: "349",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber17(class=ps1-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber17(class=ps1-3 paytableNumbersWhite)_text",
                                        x: "972",
                                        y: "404",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "937",
                                        y: "299",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "937",
                                        y: "349",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "937",
                                        y: "404",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber12(class=ps3-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber12(class=ps3-5 paytableNumbersWhite)_text",
                                        x: "1515",
                                        y: "299",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber13(class=ps3-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber13(class=ps3-4 paytableNumbersWhite)_text",
                                        x: "1515",
                                        y: "349",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber14(class=ps3-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber14(class=ps3-3 paytableNumbersWhite)_text",
                                        x: "1515",
                                        y: "404",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1480",
                                        y: "299",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1480",
                                        y: "349",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1480",
                                        y: "404",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber9(class=ps2-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber9(class=ps2-5 paytableNumbersWhite)_text",
                                        x: "432",
                                        y: "644",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber10(class=ps2-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber10(class=ps2-4 paytableNumbersWhite)_text",
                                        x: "432",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber11(class=ps2-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber11(class=ps2-3 paytableNumbersWhite)_text",
                                        x: "432",
                                        y: "749",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "397",
                                        y: "644",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "397",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "397",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber3(class=ps4-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber3(class=ps4-5 paytableNumbersWhite)_text",
                                        x: "971",
                                        y: "645",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber4(class=ps4-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber4(class=ps4-4 paytableNumbersWhite)_text",
                                        x: "971",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber5(class=ps4-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber5(class=ps4-3 paytableNumbersWhite)_text",
                                        x: "971",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "936",
                                        y: "645",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "936",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "936",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber6(class=ps5-5 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber6(class=ps5-5 paytableNumbersWhite)_text",
                                        x: "1515",
                                        y: "645",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber7(class=ps5-4 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber7(class=ps5-4 paytableNumbersWhite)_text",
                                        x: "1515",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOneNumber8(class=ps5-3 paytableNumbersWhite)_text",
                                        assetKey: "pageOneNumber8(class=ps5-3 paytableNumbersWhite)_text",
                                        x: "1515",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1480",
                                        y: "645",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1480",
                                        y: "698",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1480",
                                        y: "750",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne0_content",
                                        assetKey: "pageOne0_content",
                                        x: "63",
                                        y: "215",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne1_content",
                                        assetKey: "pageOne1_content",
                                        x: "601",
                                        y: "224",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne2_content",
                                        assetKey: "pageOne2_content",
                                        x: "1136",
                                        y: "211",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne3_content",
                                        assetKey: "pageOne3_content",
                                        x: "72",
                                        y: "566",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne4_content",
                                        assetKey: "pageOne4_content",
                                        x: "605",
                                        y: "567",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageOne5_content",
                                        assetKey: "pageOne5_content",
                                        x: "1150",
                                        y: "567",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoTwo_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "winplanNameText_aliases",
                                        assetKey: "winplanNameText_aliases",
                                        x: "860",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber0(class=ps6-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber0(class=ps6-5 paytableNumbersWhite)_text",
                                        x: "447",
                                        y: "310",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber1(class=ps6-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber1(class=ps6-4 paytableNumbersWhite)_text",
                                        x: "447",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber2(class=ps6-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber2(class=ps6-3 paytableNumbersWhite)_text",
                                        x: "447",
                                        y: "420",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "412",
                                        y: "310",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "412",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "412",
                                        y: "420",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber3(class=ps7-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber3(class=ps7-5 paytableNumbersWhite)_text",
                                        x: "985",
                                        y: "310",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber4(class=ps7-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber4(class=ps7-4 paytableNumbersWhite)_text",
                                        x: "985",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber5(class=ps7-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber5(class=ps7-3 paytableNumbersWhite)_text",
                                        x: "985",
                                        y: "419",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "950",
                                        y: "310",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "950",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "950",
                                        y: "419",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber6(class=ps8-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber6(class=ps8-5 paytableNumbersWhite)_text",
                                        x: "1527",
                                        y: "309",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber7(class=ps8-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber7(class=ps8-4 paytableNumbersWhite)_text",
                                        x: "1527",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber8(class=ps8-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber8(class=ps8-3 paytableNumbersWhite)_text",
                                        x: "1527",
                                        y: "420",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1488",
                                        y: "309",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1488",
                                        y: "365",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1488",
                                        y: "420",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber9(class=ps9-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber9(class=ps9-5 paytableNumbersWhite)_text",
                                        x: "696",
                                        y: "642",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber10(class=ps9-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber10(class=ps9-4 paytableNumbersWhite)_text",
                                        x: "696",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber11(class=ps9-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber11(class=ps9-3 paytableNumbersWhite)_text",
                                        x: "696",
                                        y: "752",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "661",
                                        y: "642",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "661",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "661",
                                        y: "752",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber12(class=ps10-5 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber12(class=ps10-5 paytableNumbersWhite)_text",
                                        x: "1276",
                                        y: "647",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber13(class=ps10-4 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber13(class=ps10-4 paytableNumbersWhite)_text",
                                        x: "1276",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwoNumber14(class=ps10-3 paytableNumbersWhite)_text",
                                        assetKey: "pageTwoNumber14(class=ps10-3 paytableNumbersWhite)_text",
                                        x: "1276",
                                        y: "752",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber5(text=5 , class=textNumbersYellow)_text",
                                        x: "1241",
                                        y: "647",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber4(text=4 , class=textNumbersYellow)_text",
                                        x: "1241",
                                        y: "697",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        assetKey: "textNumber3(text=3 , class=textNumbersYellow)_text",
                                        x: "1241",
                                        y: "752",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo0_content",
                                        assetKey: "pageTwo0_content",
                                        x: "85",
                                        y: "235",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo1_content",
                                        assetKey: "pageTwo1_content",
                                        x: "621",
                                        y: "238",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo2_content",
                                        assetKey: "pageTwo2_content",
                                        x: "1160",
                                        y: "242",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo3_content",
                                        assetKey: "pageTwo3_content",
                                        x: "334",
                                        y: "576",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageTwo4_content",
                                        assetKey: "pageTwo4_content",
                                        x: "914",
                                        y: "571",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoThree_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "freefallBonusNameText_aliases",
                                        assetKey: "freefallBonusNameText_aliases",
                                        x: "860",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageThreeText_aliases",
                                        assetKey: "pageThreeText_aliases",
                                        x: "860",
                                        y: "814",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageThree0_content",
                                        assetKey: "pageThree0_content",
                                        x: "109",
                                        y: "264",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageThree1_content",
                                        assetKey: "pageThree1_content",
                                        x: "891",
                                        y: "264",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoFour_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "luckyMillBonusText_aliases",
                                        assetKey: "luckyMillBonusText_aliases",
                                        x: "860",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageFourText_aliases",
                                        assetKey: "pageFourText_aliases",
                                        x: "860",
                                        y: "846",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageFour_content",
                                        assetKey: "pageFour_content",
                                        x: "444",
                                        y: "88",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoFive_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "freeSpinsBonusText_aliases",
                                        assetKey: "freeSpinsBonusText_aliases",
                                        x: "860",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageFiveText_aliases",
                                        assetKey: "pageFiveText_aliases",
                                        x: "860",
                                        y: "814",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageFive_content",
                                        assetKey: "pageFive_content",
                                        x: "-2",
                                        y: "201",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoSix_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "wildName_aliases",
                                        assetKey: "wildName_aliases",
                                        x: "860",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSixText0_aliases",
                                        assetKey: "pageSixText0_aliases",
                                        x: "859",
                                        y: "484",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSixText1_aliases",
                                        assetKey: "pageSixText1_aliases",
                                        x: "861",
                                        y: "838",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix0_content",
                                        assetKey: "pageSix0_content",
                                        x: "20",
                                        y: "166",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix1_content",
                                        assetKey: "pageSix1_content",
                                        x: "319",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix2_content",
                                        assetKey: "pageSix2_content",
                                        x: "592",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix3_content",
                                        assetKey: "pageSix3_content",
                                        x: "864",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix4_content",
                                        assetKey: "pageSix4_content",
                                        x: "1137",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix5_content",
                                        assetKey: "pageSix5_content",
                                        x: "1409",
                                        y: "188",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix6_content",
                                        assetKey: "pageSix6_content",
                                        x: "1276",
                                        y: "541",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix7_content",
                                        assetKey: "pageSix7_content",
                                        x: "1004",
                                        y: "541",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix8_content",
                                        assetKey: "pageSix8_content",
                                        x: "732",
                                        y: "541",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix9_content",
                                        assetKey: "pageSix9_content",
                                        x: "460",
                                        y: "541",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSix10_content",
                                        assetKey: "pageSix10_content",
                                        x: "183",
                                        y: "541",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoSeven_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "winLinesName_aliases",
                                        assetKey: "winLinesName_aliases",
                                        x: "860",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven0_content",
                                        assetKey: "pageSeven0_content",
                                        x: "170",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven1_content",
                                        assetKey: "pageSeven1_content",
                                        x: "469",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven2_content",
                                        assetKey: "pageSeven2_content",
                                        x: "767",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven3_content",
                                        assetKey: "pageSeven3_content",
                                        x: "1065",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven4_content",
                                        assetKey: "pageSeven4_content",
                                        x: "1365",
                                        y: "168",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven5_content",
                                        assetKey: "pageSeven5_content",
                                        x: "170",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven6_content",
                                        assetKey: "pageSeven6_content",
                                        x: "469",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven7_content",
                                        assetKey: "pageSeven7_content",
                                        x: "767",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven8_content",
                                        assetKey: "pageSeven8_content",
                                        x: "1065",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven9_content",
                                        assetKey: "pageSeven9_content",
                                        x: "1365",
                                        y: "351",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven10_content",
                                        assetKey: "pageSeven10_content",
                                        x: "170",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven11_content",
                                        assetKey: "pageSeven11_content",
                                        x: "469",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven12_content",
                                        assetKey: "pageSeven12_content",
                                        x: "767",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven13_content",
                                        assetKey: "pageSeven13_content",
                                        x: "1065",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven14_content",
                                        assetKey: "pageSeven14_content",
                                        x: "1365",
                                        y: "533",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven15_content",
                                        assetKey: "pageSeven15_content",
                                        x: "170",
                                        y: "716",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven16_content",
                                        assetKey: "pageSeven16_content",
                                        x: "469",
                                        y: "716",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven17_content",
                                        assetKey: "pageSeven17_content",
                                        x: "767",
                                        y: "716",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven18_content",
                                        assetKey: "pageSeven18_content",
                                        x: "1065",
                                        y: "716",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageSeven19_content",
                                        assetKey: "pageSeven19_content",
                                        x: "1365",
                                        y: "716",
                                        alpha: "1"
                                    }]
                                }, {
                                    type: 1,
                                    name: "pageInfoEight_container",
                                    alpha: "1",
                                    contents: [{
                                        type: 0,
                                        name: "rulesName_aliases",
                                        assetKey: "rulesName_aliases",
                                        x: "860",
                                        y: "52",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "pageEightText_aliases",
                                        assetKey: "pageEightText_aliases",
                                        x: "860",
                                        y: "492",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "rtpTextEN_aliases",
                                        assetKey: "pageEightText_aliases",
                                        x: "860",
                                        y: "872",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "rtpTextRU_aliases",
                                        assetKey: "pageEightText_aliases",
                                        x: "860",
                                        y: "810",
                                        alpha: "1"
                                    }, {
                                        type: 0,
                                        name: "fake_end_px",
                                        assetKey: "fake_end_px",
                                        x: "0",
                                        y: "0",
                                        alpha: "1"
                                    }]
                                }]
                            }, {
                                type: mt.objects.IMAGE,
                                name: "nameBg1_asset",
                                assetKey: "nameBg1_asset"
                            }, {
                                type: mt.objects.NINE_SLICE,
                                name: "nameBg",
                                assetKey: "nameBg1",
                                bottom: 12,
                                top: 12,
                                left: 12,
                                right: 12,
                                height: 100,
                                width: 1920
                            }, {
                                type: mt.objects.GROUP,
                                name: "paginationInfoContainer",
                                y: 910,
                                x: 764,
                                contents: [{
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoOnePlate",
                                    assetKey: "pageInfoPlate"
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoTwoPlate",
                                    assetKey: "pageInfoPlate",
                                    x: 50
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoThreePlate",
                                    assetKey: "pageInfoPlate",
                                    x: 100
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoFourPlate",
                                    assetKey: "pageInfoPlate",
                                    x: 150
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoFivePlate",
                                    assetKey: "pageInfoPlate",
                                    x: 200
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoSixPlate",
                                    assetKey: "pageInfoPlate",
                                    x: 250
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoSevenPlate",
                                    assetKey: "pageInfoPlate",
                                    x: 300
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoEightPlate",
                                    assetKey: "pageInfoPlate",
                                    x: 350
                                }]
                            }]
                        }, {
                            type: mt.objects.GROUP,
                            name: "buttonsHelpContainer",
                            y: 219,
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "leftButtonsHelpContainer",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "infoPrevButtonButton",
                                    assetKey: "infoMobileNextButton",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 132,
                                    scaleX: -1,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "infoPrev");}'
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "rightButtonsHelpContainer",
                                contents: [{
                                    type: mt.objects.BUTTON,
                                    name: "infoNextButtonButton",
                                    assetKey: "infoMobileNextButton",
                                    btnFrames: {
                                        over: 2,
                                        out: 1,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 1788,
                                    action: 'function(){nge.observer.fire("buttons.pressCommand", "infoNext");}'
                                }]
                            }]
                        }, {
                            type: 0,
                            name: "1px_empty",
                            assetKey: "1px_empty",
                            x: "0",
                            y: "0",
                            alpha: "1"
                        }]
                    }
                }
            }
        },
        1197: function(e, t) {
            nge.App[nge.appNS].Tpl.States = {}
        },
        1198: function(e, t) {
            nge.App[nge.appNS].Tpl.States.Demo = function() {
                var e = nge.appPath + "img/";
                return {
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            key: "frameIntroScreen",
                            fullPath: e + "playarea/frameIntroScreen.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "introScreenArrow",
                            fullPath: e + "playarea/introScreenArrow.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "introScreenTextArrow_aliases",
                            fullPath: e + "playarea/introScreenTextArrow_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "autoStart(width=430, height=30, class=autoStartCheckBox)_clickableArea",
                            fullPath: e + "playarea/autoStart(width=430, height=30, class=autoStartCheckBox)_clickableArea.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "introScreenText_aliases",
                            fullPath: e + "playarea/introScreenText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "demoPlayButton(spritesX=3)_button",
                            fullPath: e + "playarea/demoPlayButton(spritesX=3)_button.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "demoPlayButtonText_aliases",
                            fullPath: e + "playarea/demoPlayButtonText_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotification(scaleX=1920, scaleY=1080, color=#181223, class=cover)_cover",
                            fullPath: e + "playarea/popupNotification(scaleX=1920, scaleY=1080, color=#181223, class=cover)_cover.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotificationsBg",
                            fullPath: e + "playarea/popupNotificationsBg.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotificationsOkButton(spritesX=3)_button",
                            fullPath: e + "playarea/popupNotificationsOkButton(spritesX=3)_button.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotificationsContent_aliases",
                            fullPath: e + "playarea/popupNotificationsContent_aliases.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupNotificationsHeadText_aliases",
                            fullPath: e + "playarea/popupNotificationsHeadText_aliases.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: []
                    }
                }
            }
        },
        1199: function(e, t) {
            nge.App[nge.appNS].Tpl.States.LoadAssets = function() {
                var e = nge.appPath + "img/",
                    t = nge.Lib.Helper.mobileAndTabletCheck(),
                    a = {
                        name: "assets",
                        contents: []
                    };
                return ["psd_atlases_help", "psd_atlases_play"].forEach((function(t) {
                    a.contents.push({
                        type: mt.assets.ATLAS,
                        key: t,
                        atlas: e + "atlases/" + t + ".json",
                        fullPath: e + "atlases/" + t + ".png"
                    })
                })), a.contents.push({
                    type: mt.assets.ATLAS,
                    subtype: "noPngQuant",
                    key: "symbols_static",
                    atlas: e + "atlases/symbols_static.json",
                    fullPath: e + "atlases/symbols_static.png"
                }), t = t ? "psd_atlases_ui_mobile" : "psd_atlases_ui", a.contents.push({
                    type: mt.assets.ATLAS,
                    subtype: "noPngQuant",
                    key: t,
                    atlas: e + "atlases/" + t + ".json",
                    fullPath: e + "atlases/" + t + ".png"
                }), a.contents.push({
                    type: mt.assets.IMAGE,
                    key: "bgArea",
                    fullPath: e + "atlases/bgArea.jpg"
                }, {
                    type: mt.assets.IMAGE,
                    key: "bgAreaFreeSpins",
                    fullPath: e + "atlases/bgAreaFreeSpins.jpg"
                }, {
                    type: mt.assets.IMAGE,
                    key: "introScreenBg",
                    fullPath: e + "atlases/introScreenBg.jpg"
                }, {
                    type: mt.assets.IMAGE,
                    key: "pageThree1_content",
                    fullPath: e + "atlases/pageThree1_content.jpg"
                }, {
                    type: mt.assets.IMAGE,
                    key: "pageThree0_content",
                    fullPath: e + "atlases/pageThree0_content.jpg"
                }, {
                    type: mt.assets.IMAGE,
                    key: "popupJackpot",
                    fullPath: e + "jackpot/images/jackpotPopup.png"
                }, {
                    type: mt.assets.SPINE,
                    key: "m00_Anim",
                    spine: e + "spine/symbols/m00.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m01_Anim",
                    spine: e + "spine/symbols/m01.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m02_Anim",
                    spine: e + "spine/symbols/m02.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m03_Anim",
                    spine: e + "spine/symbols/m03.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m04_Anim",
                    spine: e + "spine/symbols/m04.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m05_Anim",
                    spine: e + "spine/symbols/m05.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m06_Anim",
                    spine: e + "spine/symbols/m06.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m07_Anim",
                    spine: e + "spine/symbols/m07.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m08_Anim",
                    spine: e + "spine/symbols/m08.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m09_Anim",
                    spine: e + "spine/symbols/m09.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m10_Anim",
                    spine: e + "spine/symbols/m10.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m11_Anim",
                    spine: e + "spine/symbols/m11.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m12_Anim",
                    spine: e + "spine/symbols/m12.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m13_Anim",
                    spine: e + "spine/symbols/m13.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m14_Anim",
                    spine: e + "spine/symbols/m14.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m15_Anim",
                    spine: e + "spine/symbols/m15.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m01_fs_Anim",
                    spine: e + "spine/symbols/m01_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m02_fs_Anim",
                    spine: e + "spine/symbols/m02_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m03_fs_Anim",
                    spine: e + "spine/symbols/m03_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m04_fs_Anim",
                    spine: e + "spine/symbols/m04_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m05_fs_Anim",
                    spine: e + "spine/symbols/m05_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m06_fs_Anim",
                    spine: e + "spine/symbols/m06_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m07_fs_Anim",
                    spine: e + "spine/symbols/m07_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m08_fs_Anim",
                    spine: e + "spine/symbols/m08_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m09_fs_Anim",
                    spine: e + "spine/symbols/m09_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "m10_fs_Anim",
                    spine: e + "spine/symbols/m10_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "symbol_bang",
                    spine: e + "spine/symbols/symbol_bang.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "symbol_bang_fs",
                    spine: e + "spine/symbols/symbol_bang_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "symbol_dust",
                    spine: e + "spine/symbols/symbol_dust.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "symbol_big_divide",
                    spine: e + "spine/symbols/symbol_big_divide.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "bigWinAnim",
                    spine: e + "spine/bigWin/big_win.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "bigWinFlareAnim",
                    spine: e + "spine/bigWin/big_win_flare.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "bigWinGlowwormsAnim",
                    spine: e + "spine/bigWin/big_win_glowworms.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "bigWinLeavesAnim",
                    spine: e + "spine/bigWin/big_win_leaves.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "birds",
                    spine: e + "spine/bg/main_bg_birds.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "fog",
                    spine: e + "spine/bg/main_bg_fog.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "fs_glow",
                    spine: e + "spine/bg/bg_anim_fs.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "leprechaun",
                    spine: e + "spine/leprechaun/leprechaun.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "mushroom_bang",
                    spine: e + "spine/mushroom/mushroom_bang.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "mushroom_effect",
                    spine: e + "spine/mushroom/mushroom_effect.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "mushroom_multiplier",
                    spine: e + "spine/mushroom/mushroom_multiplier.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "waterfall_animation",
                    spine: e + "spine/luckyMill/waterfall.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "leaves_animation",
                    spine: e + "spine/luckyMill/leaves.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "flash_animation",
                    spine: e + "spine/luckyMill/flash.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "multipliers_animation",
                    spine: e + "spine/luckyMill/multipliers.json"
                }, {
                    type: mt.assets.SPINE,
                    key: "popupSpineBackground",
                    spine: e + "spine/animatedPopup/animatedPopup.json"
                }), {
                    assets: a,
                    objects: {
                        name: "objects",
                        contents: []
                    }
                }
            }
        },
        1200: function(e, t) {
            nge.App[nge.appNS].Tpl.States.Play = function() {
                var e = nge.appPath + "img/";
                return {
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            key: "slotMachine_container",
                            fullPath: e + "playarea/slotMachine_container.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "slotMachineMushroom",
                            fullPath: e + "playarea/slotMachineMushroom.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "slotMachineGrassFreeSpinGame",
                            fullPath: e + "playarea/slotMachineGrassFreeSpinGame.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "slotMachineGrassMainGame",
                            fullPath: e + "playarea/slotMachineGrassMainGame.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "leaves_asset",
                            fullPath: e + "playarea/leaves_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wheel_asset",
                            fullPath: e + "playarea/wheel_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "water_asset",
                            fullPath: e + "playarea/water_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "arrow_asset",
                            fullPath: e + "playarea/arrow_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "grass_asset",
                            fullPath: e + "playarea/grass_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "luckyMillName_asset",
                            fullPath: e + "playarea/luckyMillName_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wheelCenter_asset",
                            fullPath: e + "playarea/wheelCenter_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wheelCell_x30_asset",
                            fullPath: e + "playarea/wheelCell_x30_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wheelCell_x5_asset",
                            fullPath: e + "playarea/wheelCell_x5_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wheelCell_collect_asset",
                            fullPath: e + "playarea/wheelCell_collect_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wheelCell_x10_asset",
                            fullPath: e + "playarea/wheelCell_x10_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wheelCell_x2_asset",
                            fullPath: e + "playarea/wheelCell_x2_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wheelCell_x3_asset",
                            fullPath: e + "playarea/wheelCell_x3_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "wheelCell_x1_asset",
                            fullPath: e + "playarea/wheelCell_x1_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "playareaLogo",
                            fullPath: e + "playarea/playareaLogo.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "ui_group",
                            fullPath: e + "playarea/ui_group.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "tabs_group",
                            fullPath: e + "playarea/tabs_group.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "popupAnimationOkButton",
                            fullPath: e + "playarea/popupAnimationOkButton.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "offers_group",
                            fullPath: e + "playarea/offers_group.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "jackpotPopup_group",
                            fullPath: e + "playarea/jackpotPopup_group.png"
                        }, {
                            type: mt.assets.IMAGE,
                            key: "intro_group",
                            fullPath: e + "playarea/intro_group.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: 0,
                            name: "intro_group",
                            assetKey: "intro_group",
                            x: "0",
                            y: "0",
                            alpha: "1"
                        }, {
                            type: 0,
                            name: "jackpotPopup_group",
                            assetKey: "jackpotPopup_group",
                            x: "0",
                            y: "0",
                            alpha: "1"
                        }, {
                            type: 0,
                            name: "offers_group",
                            assetKey: "offers_group",
                            x: "0",
                            y: "0",
                            alpha: "1"
                        }, {
                            type: 1,
                            name: "popupAnimationOkButtonContainer",
                            alpha: "1",
                            contents: [{
                                type: 0,
                                name: "popupAnimationOkButton",
                                assetKey: "popupAnimationOkButton",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }]
                        }, {
                            type: mt.objects.GROUP,
                            name: "blinkerContainer"
                        }, {
                            type: 1,
                            name: "winPopupContainer",
                            alpha: "1",
                            contents: []
                        }, {
                            type: 0,
                            name: "tabs_group",
                            assetKey: "tabs_group",
                            x: "0",
                            y: "0",
                            alpha: "1"
                        }, {
                            type: 0,
                            name: "ui_group",
                            assetKey: "ui_group",
                            x: "0",
                            y: "0",
                            alpha: "1"
                        }, {
                            type: 1,
                            name: "jackpotStatusPanelContainer",
                            alpha: "1",
                            contents: []
                        }, {
                            type: 1,
                            name: "gameLogoContainer",
                            alpha: "1",
                            contents: [{
                                type: 0,
                                name: "playareaLogo",
                                assetKey: "playareaLogo",
                                x: "605",
                                y: "0",
                                alpha: "1"
                            }]
                        }, {
                            type: 1,
                            name: "luckyMillAssets",
                            alpha: "1",
                            contents: [{
                                type: 0,
                                name: "wheelCell_x1_asset",
                                assetKey: "wheelCell_x1_asset",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "wheelCell_x3_asset",
                                assetKey: "wheelCell_x3_asset",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "wheelCell_x2_asset",
                                assetKey: "wheelCell_x2_asset",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "wheelCell_x10_asset",
                                assetKey: "wheelCell_x10_asset",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "wheelCell_collect_asset",
                                assetKey: "wheelCell_collect_asset",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "wheelCell_x5_asset",
                                assetKey: "wheelCell_x5_asset",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "wheelCell_x30_asset",
                                assetKey: "wheelCell_x30_asset",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "wheelCenter_asset",
                                assetKey: "wheelCenter_asset",
                                x: "1174",
                                y: "530",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "luckyMillName_asset",
                                assetKey: "luckyMillName_asset",
                                x: "889",
                                y: "78",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "grass_asset",
                                assetKey: "grass_asset",
                                x: "809",
                                y: "527",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "arrow_asset",
                                assetKey: "arrow_asset",
                                x: "1089",
                                y: "235",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "water_asset",
                                assetKey: "water_asset",
                                x: "844",
                                y: "542",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "wheel_asset",
                                assetKey: "wheel_asset",
                                x: "833",
                                y: "189",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "leaves_asset",
                                assetKey: "leaves_asset",
                                x: "809",
                                y: "44",
                                alpha: "1"
                            }]
                        }, {
                            type: 1,
                            name: "slotMachineFrameContainer",
                            alpha: "1",
                            contents: [{
                                type: 1,
                                name: "leprechaunAnimationContainer",
                                alpha: "1",
                                contents: []
                            }, {
                                type: 1,
                                name: "slotMachineFrameMainGame",
                                alpha: "1",
                                contents: [{
                                    type: 0,
                                    name: "slotMachineGrassMainGame",
                                    assetKey: "slotMachineGrassMainGame",
                                    x: "0",
                                    y: "685",
                                    alpha: "1"
                                }]
                            }, {
                                type: 1,
                                name: "slotMachineFrameFreeSpinGame",
                                alpha: "1",
                                contents: [{
                                    type: 0,
                                    name: "slotMachineGrassFreeSpinGame",
                                    assetKey: "slotMachineGrassFreeSpinGame",
                                    x: "0",
                                    y: "684",
                                    alpha: "1"
                                }]
                            }, {
                                type: 1,
                                name: "mushroomAnimationContainer",
                                alpha: "1",
                                contents: []
                            }, {
                                type: 0,
                                name: "slotMachineMushroomAdditive",
                                assetKey: "slotMachineMushroom",
                                x: "1561",
                                y: "72",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "slotMachineMushroom",
                                assetKey: "slotMachineMushroom",
                                x: "1561",
                                y: "72",
                                alpha: "1"
                            }]
                        }, {
                            type: 1,
                            name: "luckyMillContainer",
                            alpha: "1",
                            contents: []
                        }, {
                            type: 1,
                            name: "gameScreenContainer",
                            alpha: "1",
                            contents: [{
                                type: 0,
                                name: "slotMachine_container",
                                assetKey: "slotMachine_container",
                                x: "361",
                                y: "85",
                                alpha: "1"
                            }]
                        }, {
                            type: 1,
                            name: "backgroundContainer",
                            alpha: "1",
                            contents: [{
                                type: 1,
                                name: "backgroundMainAnimationContainer",
                                alpha: "1",
                                contents: []
                            }, {
                                type: 1,
                                name: "backgroundFreespinAnimationContainer",
                                alpha: "1",
                                contents: []
                            }, {
                                type: 0,
                                name: "bgArea",
                                assetKey: "bgArea",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }, {
                                type: 0,
                                name: "bgAreaFreeSpins",
                                assetKey: "bgAreaFreeSpins",
                                x: "0",
                                y: "0",
                                alpha: "1"
                            }]
                        }, {
                            type: mt.objects.GROUP,
                            name: "customButtonsVerticalMobileContainer",
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "customButtons01VerticalMobileContainer"
                            }, {
                                type: mt.objects.GROUP,
                                name: "customButtons02VerticalMobileContainer"
                            }]
                        }]
                    }
                }
            }
        },
        1201: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport = {}
        },
        1202: function(e, t) {
            nge.Mlm.Transport.Helper.bonusWinlinesFields.Bonus.Multiplier = ["params.value"], nge.Mlm.Transport.Helper.bonusWinlinesFields.Bonus.BonusWheel = []
        },
        1203: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport.Models = {}
        },
        1204: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport.Models.AuthResponse = nge.Mlm.Transport.Models.AuthResponse.extend((function() {
                this.customConstructor = function(e) {
                    this.super.customConstructor(e), (e = nge.Lib.Helper.recursiveGet("data", e, !1)) && e.lastResponse && e.lastResponse.items && (nge.Lib.Helper.typeCheck.isArray(e.lastResponse.items) ? this.data.lastResponse.items = e.lastResponse.items : this.data.lastResponse.items = [])
                }
            }))
        },
        1205: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport.Models.PickBonusItemResponse = nge.Mlm.Transport.Models.PickBonusItemResponse.extend((function() {
                this.customConstructor = function(e) {
                    this.super.customConstructor(e);
                    var t = nge.Lib.Helper.recursiveGet("data.params.totalBonusWin", e, !1);
                    t && (this.data.params = {}, this.data.params.totalBonusWin = t), (e = nge.Lib.Helper.recursiveGet("data.gameParameters.initialSymbols", e, !1)) && (this.data.gameParameters = {}, this.data.gameParameters.initialSymbols = e)
                }
            }))
        },
        1206: function(e, t, a) {
            a(1207), a(1208), a(1209), a(1210), a(1211), a(1212)
        },
        1207: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport.APIMockup = {}
        },
        1208: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport.APIMockup.Models = {}
        },
        1209: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport.APIMockup.Models.AuthResponse = nge.App.ClassicGameBase.Mlm.Transport.APIMockup.Models.AuthResponse.extend((function() {
                this.get = function() {
                    var e = this.super.get();
                    return e.data.gameParameters.initialSymbols = e.data.gameParameters.initialSymbols[0], e
                }
            }))
        },
        1210: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport.APIMockup.Models.SpinResponse = nge.App.ClassicGameBase.Mlm.Transport.APIMockup.Models.SpinResponse.extend((function() {
                this.get = function() {
                    var e = this.data.requestData;
                    if (this.checkErrors(e)) return !1;
                    this.chargeForSpin(e);
                    var t = this.data.baseResponse;
                    t.result = "true", t.sesId = nge.localData.get("apiMockup.sesId"), t.data.state = "Ready", this.response = t, this.spinSymbols = this.getSpinSymbols(), t.data.spinResult = {
                        type: "SpinResult",
                        rows: this.spinSymbols[0]
                    };
                    for (var a = 1; a < this.spinSymbols.length; a++) t.data["spinResultStage" + (a + 1)] = {
                        type: "SpinResult",
                        rows: this.spinSymbols[a]
                    };
                    for (this.winResult = {
                            slotWin: {
                                totalWin: 0,
                                canGamble: "false"
                            }
                        }, a = 0; a < this.spinSymbols.length; a++) {
                        if (!(t = this.generateSlotWin(this.spinSymbols[a], e)).slotWin) {
                            5 <= a && (e = 7 < a ? 7 : a, e = nge.localData.get("apiMockup.gameSettings").freespinsForCascades[e], this.winResult.slotWin["lineWinAmountsStage" + (a + 1)] = [{
                                type: "Bonus",
                                bonusName: "FreeSpins",
                                params: {
                                    freeSpins: e
                                }
                            }], this.winResult.bonusGameData = {
                                newState: "FreeSpins",
                                freespinsCount: e
                            });
                            break
                        }
                        this.winResult.slotWin["lineWinAmounts" + (0 === a ? "" : "Stage" + (a + 1))] = t.slotWin.lineWinAmounts, this.winResult.bonusGameData = t.bonusGameData, this.winResult.slotWin.totalWin += parseFloat(t.slotWin.totalWin)
                    }
                    return this.winResult.slotWin.totalWin += "", this.winResult.slotWin.lineWinAmounts ? (this.response.data.slotWin = this.winResult.slotWin, this.processBonusGameData(), this.payForWin(this.response.data.slotWin.totalWin)) : delete this.response.data.slotWin, nge.localData.set("apiMockup.gamble.tryCount", 0), nge.localData.set("apiMockup.gamble.lastWin", 0), nge.localData.set("apiMockup.slotMachine.spinResult", this.response.data.spinResult), nge.localData.set("apiMockup.slotMachine.slotWin", this.response.data.slotWin), this.response
                }, this.generateSlotWin = function(e, t, a) {
                    if (t = this.super.generateSlotWin(e, t, a), !nge.localData.get("freespin.inProgress")) {
                        var n = 0;
                        for (a = 0; a < e.length; a++)
                            for (var s = 0; s < e[a].length; s++) "16" === e[a][s] && n++;
                        if (9 === n) {
                            for (t.slotWin = {}, n = [], a = 0; a < e.length; a++)
                                for (s = 0; s < e[a].length; s++) "16" === e[a][s] && n.push([a, s]);
                            t.slotWin.lineWinAmounts = [], t.slotWin.lineWinAmounts.push({
                                wonSymbols: n,
                                amount: "0",
                                type: "Bonus",
                                bonusName: "PickBonus"
                            }), t.slotWin.totalWin = "0", t.bonusGameData = {
                                newState: "PickBonus"
                            }
                        }
                    }
                    return t
                }, this.processBonusGameData = function() {
                    if (this.winResult.bonusGameData) {
                        this.response.data.state = this.winResult.bonusGameData.newState, this.response.data.slotWin.canGamble = nge.App.getInstance("nge.Mlm.Transport.APIMockup.Helpers.Gamble").getCanGamble("false");
                        var e = nge.localData.get("apiMockup.gameSettings");
                        if ("FreeSpins" === this.winResult.bonusGameData.newState) this.super.processBonusGameData(), e.bonusGameRequest = "FreeSpinRequest", nge.localData.set("apiMockup.freespins.totalBonusWin", +this.winResult.slotWin.totalWin);
                        else if ("PickBonus" === this.winResult.bonusGameData.newState) {
                            e.bonusGameRequest = "PickBonusItemRequest", nge.localData.set("apiMockup.bonusGame.inProgress", !0), nge.localData.set("apiMockup.shamrockTreasure.lastSpinRequestData", this.data.requestData);
                            var t = [],
                                a = e.luckyMillSectors;
                            e = e.luckyMillResults;
                            for (var n = 0; n < e.length; n++) t.push({
                                type: "IndexedItem",
                                index: a[e[n]].index,
                                value: a[e[n]].value,
                                picked: "false"
                            });
                            nge.localData.set("apiMockup.shamrockTreasure.bonusGameData", {
                                fields: t,
                                openedFieldCounts: []
                            })
                        }
                    }
                }
            }))
        },
        1211: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport.APIMockup.Models.FreeSpinResponse = nge.App.ClassicGameBase.Mlm.Transport.APIMockup.Models.FreeSpinResponse.extend((function() {
                this.get = function() {
                    var e = this.super.get();
                    return 0 === nge.localData.get("apiMockup.freespins.freespinRemain") && (e.data.gameParameters = {}, e.data.gameParameters.initialSymbols = {}), e
                }
            }))
        },
        1212: function(e, t) {
            nge.App[nge.appNS].Mlm.Transport.APIMockup.Models.PickBonusItemResponse = Class.extend((function() {
                this.data = !1, this.constructor = function(e) {
                    this.data = e
                }, this.get = function() {
                    var e = this.data.baseResponse;
                    e.result = "true", e.sesId = nge.localData.get("apiMockup.sesId"), e.data = {};
                    var t = this.data.requestData.data.index,
                        a = nge.localData.get("apiMockup.shamrockTreasure.bonusGameData"),
                        n = a.fields[t];
                    return e.data.bonusItem = n, e.data.items = a.fields, a.openedFieldCounts.push(n.index), a.fields[t].picked = "true", "collect" === n.value ? (e.data.state = "Ready", e.data.lastPick = "true", nge.localData.set("apiMockup.bonusGame.inProgress", !1)) : (e.data.state = "PickBonus", e.data.lastPick = "false"), e
                }
            }))
        },
        5: function(e, t, a) {
            a(1067), a(1068), a(1069), a(1070), a(1071), a(1072), a(1073), a(1074), a(1075), a(1076), a(1077), a(1078), a(1079), a(1080), a(1081), a(1082), a(1083), a(1084), a(1085), a(1086), a(1087), a(1088), a(1089), a(1090), a(1091), a(1092), a(1093), a(1094), a(1095), a(1096), a(1097), a(1098), a(1099), a(1100), a(1101), a(1102), a(1103), a(1104), a(1105), a(1106), a(1107), a(1108), a(1109), a(1110), a(1111), a(1112), a(1113), a(1114), a(1115), a(1116), a(1117), a(1118), a(1119), a(1120), a(1121), a(1122), a(1123), a(1124), a(1125), a(1126), a(1127), a(1128), a(1129), a(1130), a(1131), a(1132), a(1133), a(1134), a(1135), a(1136), a(1137), a(1138), a(1139), a(1140), a(1141), a(1142), a(1143), a(1144), a(1145), a(1146), a(1147), a(1148), a(1149), a(1150), a(1151), a(1152), a(1153), a(1154), a(1155), a(1156), a(1157), a(1158), a(1159), a(1160), a(1161), a(1162), a(1163), a(1164), a(1165), a(1166), a(1167), a(1168), a(1169), a(1170), a(1171), a(1172), a(1173), a(1174), a(1175), a(1176), a(1177), a(1178), a(1179), a(1180), a(1181), a(1182), a(1183), a(1184), a(1185), a(1186), a(1187), a(1188), a(1189), a(1190), a(1191), a(1192), a(1193), a(1194), a(1195), a(1196), a(1197), a(1198), a(1199), a(1200), a(1201), a(1202), a(1203), a(1204), a(1205), a(1206)
        }
    }
]);