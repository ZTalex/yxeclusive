"use strict";

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var n = 0,
            e = Array(t.length); n < t.length; n++) e[n] = t[n];
        return e
    }
    return Array.from(t)
}


var letter = new Vue({
    el: "#letter",
    data: {
        showimg: false,
    },
    methods: {
        Visible: function () {
            this.showimg = true;
        },
        Disvisible: function () {
            this.showimg = false;
        }
    }
})
var music= new Vue({
    el: "#music",
    data: {
        shoes:true,
        audios:'<head><audio id="bgm" src="/img/bgm.mp3" play="true" loop="true" autoplay="autoplay"/>  </head>',
    },
    methods: {
        handleClick:function(){
            if(this.shoes == false){
                this.shoes = true;
                // if(this.audios==''){
                //     // this.audios='<head><audio id="bgm" src="/img/bgm.mp3" play="true" loop="true" autoplay="autoplay"/>  </head>';
                // }else{
                document.getElementById("bgm").play();
                // }
            }else if(this.shoes ==true){
                 this.shoes = false;
                 document.getElementById("bgm").pause();
                // this.audios="";
            }
        }
    }
})


!function () {
    var t = "author",
        n = "me";
    new Vue({
        el: "#mobile",
        data: {
            messages: [],
            dialogs: null,
            lastDialog: null,
            msgChain: Promise.resolve(),
            isTyping: !1,
            nextTopics: [],
            hasPrompt: !1,
            latestMsgContent: null,
        },
        mounted: function () {
            var t = this;
            $.getJSON("./assets/dialog.json",
                function (n) {
                    t.dialogs = n,
                        t.nextTopics = t.dialogs.fromUser,
                        t.appendDialog("0000")
                })
        },
        methods: {
            appendDialog: function (n) {
                var o = this;
                if ("object" === (void 0 === n ? "undefined" : _typeof(n)) && n.length > 0) n.forEach(function (t) {
                    return o.appendDialog(t)
                });
                else {
                    if (null != n) {
                        this.isTyping = !0;
                        var i = this.getDialog(n);
                        return e(i.details).forEach(function (n) {
                            o.msgChain = o.msgChain.then(function () {
                                return r(700)
                            }).then(function () {
                                return o.sendMsg(n, t)
                            })
                        }),
                            i.nextAuthor ? this.appendDialog(i.nextAuthor) : this.msgChain.then(function () {
                                o.lastDialog = i,
                                    o.isTyping = !1
                            })
                    }
                    this.lastDialog.responses = null
                }
            },
            sendMsg: function (t, n) {
                switch (n) {
                    case "me":
                        return this.sendUserMsg(t);
                    default:
                        return this.sendFriendMsg(t, n)
                }
            },
            sendFriendMsg: function (t, n) {
                var s = this,
                    a = e(t),
                    u = a.replace(/<[^>]+>/g, "").length,
                    l = /<img[^>]+>/.test(a),
                    h = u > 2 || l,
                    c = {
                        author: n,
                        content: h ? '\n        <div class="dot"></div>\n        <div class="dot"></div>\n        <div class="dot"></div>\n    ' : a,
                        isImg: l
                    };
                return this.messages.push(c),
                    h ? (this.markMsgSize(c), setTimeout(i), r(Math.min(100 * u, 2e3)).then(function () {
                        return s.markMsgSize(c, a)
                    }).then(function () {
                        return r(150)
                    }).then(function () {
                        c.content = a,
                            o()
                    })) : (o(), Promise.resolve())
            },
            sendUserMsg: function (t) {
                return this.messages.push({
                    author: n,
                    content: t
                }),
                    o(),
                    Promise.resolve()
            },
            markMsgSize: function (t) {
                var n = this,
                    e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                return this.latestMsgContent = e || t.content,
                    r(0).then(function () {
                        return t.isImg && s($("#mock-msg img"))
                    }).then(function () {
                        var e;
                        Object.assign(t, {
                            width: (e = $("#mock-msg")).width(),
                            height: e.height()
                        }),
                            n.messages = [].concat(_toConsumableArray(n.messages))
                    })
            },
            getDialog: function (t) {
                var n = this.dialogs.fromMe.filter(function (n) {
                    return n.id === t
                });
                return n ? n[0] : null
            },
            getDialogFromUser: function (t) {
                var n = this.dialogs.fromUser.filter(function (n) {
                    return n.id === t
                });
                return n ? n[0] : null
            },
            togglePrompt: function (t) {
                this.isTyping || (this.hasPrompt = t)
            },
            respond: function (res) {
                //信件
                if (res.nextAuthor == "0071") {
                    letter.Visible();
                    return 0;
                }//抱抱
                else if (res.nextAuthor == "0051") {
                    res.content = "<img src='img/baobao.jpg'>";

                }
                //亲亲
                else if (res.nextAuthor == "0061") {
                    res.content = "<img src='img/qinqin.jpg'>";

                }
                return this.say(res.content, res.nextAuthor);

            },
            ask: function (t) {
                var n = e(t.details);
                return this.say(n, t.nextAuthor)
            },
            say: function (t, e) {
                var o = this;
                return this.hasPrompt = !1,
                    r(200).then(function () {
                        return o.sendMsg(t, n)
                    }).then(function () {
                        return r(300)
                    }).then(function () {
                        return o.appendDialog(e)
                    })
            },

        }
    });
    function e(t) {
        return "string" != typeof t && t.length ? t[Math.floor(Math.random() * t.length)] : t
    }
    function o() {
        setTimeout(function () {
            i();
            var t = $("#mobile-body-content .msg-row:last-child .msg");
            t.find("a").attr("target", "_blank"),
                s(t).then(i)
        })
    }
    function i() {
        var t = $("#mobile-body-content"),
            n = t[0].scrollHeight - t.height() - t.scrollTop(),
            e = Date.now();
        requestAnimationFrame(function o() {
            var i = Math.min(1, (Date.now() - e) / 250);
            t.scrollTop(t.scrollTop() + n * i),
                i < 1 && requestAnimationFrame(o)
        })
    }
    function r() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        return new Promise(function (n) {
            setTimeout(n, t)
        })
    }
    function s(t) {
        return new Promise(function (n) {
            t.one("load", n).each(function (t, n) {
                n.complete && $(n).trigger("load")
            })
        })
    }
}();
