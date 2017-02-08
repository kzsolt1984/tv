var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var conf;
(function (conf) {
    var Config = (function () {
        function Config() {
        }
        Config.init = function () {
            Config._config['global'] = {};
            Config._config['local'] = {};
            var $gConfig = $('#global-js-variables'), gConfigText = $gConfig.text(), $lConfig = $('#local-js-variables'), lConfigText = $lConfig.text()
                .replace(/"{/g, '\{').replace(/}"/g, '\}')
                .replace(/"\[\{/g, '\[\{').replace(/}]"/g, '\}]');
            if (gConfigText.length) {
                Config._config['global'] = JSON.parse(gConfigText);
            }
            if (lConfigText.length) {
                Config._config['local'] = JSON.parse(lConfigText);
            }
        };
        Config.get = function (key, isGlobalVar) {
            if (isGlobalVar === void 0) { isGlobalVar = true; }
            if (Config._config) {
                if (isGlobalVar && Config._config['global'][key]) {
                    return Config._config['global'][key];
                }
                else if (!isGlobalVar && Config._config['local'][key]) {
                    return Config._config['local'][key];
                }
            }
            return null;
        };
        return Config;
    }());
    Config._config = {};
    conf.Config = Config;
})(conf || (conf = {}));
///<reference path="../../lib/ts/lodash.d.ts" />
var component;
(function (component) {
    var Bootstrap = (function () {
        function Bootstrap() {
            this._bodyId = document.querySelector('body').getAttribute('id');
            this._setController();
        }
        /**
         * Set active controller
         * @private
         */
        Bootstrap.prototype._setController = function () {
            var controllerName = _.upperFirst(this._bodyId + 'Controller'), win = window; // compailer semantic error protection
            if (win['controller'][controllerName]) {
                new win['controller'][controllerName];
            }
            else {
                new win['controller']['CommonController'];
                if (console['info']) {
                    console['info']('Controller no exist', controllerName);
                }
                else {
                    console.log('Controller no exist', controllerName);
                }
            }
        };
        return Bootstrap;
    }());
    component.Bootstrap = Bootstrap;
})(component || (component = {}));
///<reference path="../lib/ts/jquery.d.ts" />
///<reference path="./core/config.ts" />
///<reference path="./core/bootstrap.ts" />
var main;
(function (main) {
    var Main = (function () {
        function Main() {
            /* system init */
            conf.Config.init();
            new component.Bootstrap();
            /* system init end */
            this.recommender();
            this.otherRecommender($('.other-recommender-container li'), $('.other-recommender-container > ul'), 7);
            this.otherRecommender($('.result-container li'), $('.result-container > ul'), 7);
        }
        Main.prototype.recommender = function () {
            var $box = $('.recommend-block'), $cont = $('.live-recommender-container > div');
            for (var i = 0; i < 2; i++) {
                var $clone = $box.clone();
                $cont.append($clone);
            }
        };
        Main.prototype.otherRecommender = function ($box, $cont, elementNumb) {
            for (var i = 0; i < elementNumb; i++) {
                var $clone = $box.clone();
                $cont.append($clone);
            }
        };
        return Main;
    }());
    main.Main = Main;
})(main || (main = {}));
document.addEventListener('DOMContentLoaded', function () {
    new main.Main();
});
var util;
(function (util) {
    var MobileUtil = (function () {
        function MobileUtil() {
        }
        MobileUtil.detectIsMobileView = function () {
            if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)) {
                return true;
            }
            else {
                return false;
            }
        };
        return MobileUtil;
    }());
    util.MobileUtil = MobileUtil;
})(util || (util = {}));
///<reference path="../../controller/commonController.ts" />
///<reference path="../../util/mobileUtil.ts" />
///<reference path="../../../lib/ts/jquey.custom-scrollbar.d.ts" />
var component;
(function (component) {
    var PageBarComponent = (function () {
        function PageBarComponent() {
            this._leftBarValueToClose = 980;
            this._rightBarValueToClose = 850;
            this._$window = $(window);
            this._$closeMenuBar = $('.close-bar-btn');
            this._$leftMenuBar = $('.left-menu-bar');
            this._$rightPageBar = $('.right-page-bar');
            this._$contentWithBars = $('.content-with-bars');
            this._$isMobileView = util.MobileUtil.detectIsMobileView();
            this._$leftMenuBar.find('.sidebar-expanded .sidebar-content').customScrollbar({
                preventDefaultScroll: true,
                updateOnWindowResize: true
            });
            this._bind();
        }
        PageBarComponent.prototype._bind = function () {
            var _this = this;
            this._setSiteElementDimension();
            this._$window.on('resize', function () {
                _this._setSiteElementDimension();
            });
            this._$closeMenuBar.on('click', function (e) {
                var data = $(e.currentTarget).data('side');
                if (data === 'left') {
                    _this._setLeftBarSize(!(_this._$leftMenuBar.hasClass('closed')), false);
                }
                else {
                    _this._setRightBarSize(!(_this._$rightPageBar.hasClass('closed')), false);
                }
                return false;
            });
            this._$leftMenuBar.find('.search-btn').on('click', function (e) {
                _this._setLeftBarSize(false, false);
                _this._$leftMenuBar.find('.search-form input[type="text"]').focus();
                return false;
            });
            this._$leftMenuBar.find('.search-form input[type="text"]').on('blur', function () {
                if (_this._$window.width() < _this._leftBarValueToClose) {
                    _this._setLeftBarSize(true, false);
                }
            });
            // this._$rightPageBar.find('.auth-content').customScrollbar();
        };
        /**
         * Set left bar visibility
         *
         * @param close {boolean}   close or open the bar
         * @param changeCloseBtnVisibility {boolean}   close btn hide or not
         */
        PageBarComponent.prototype._setLeftBarSize = function (close, changeCloseBtnVisibility) {
            if (close) {
                if (changeCloseBtnVisibility) {
                    this._$leftMenuBar.addClass('closed disable-expand');
                }
                else {
                    this._$leftMenuBar.addClass('closed');
                }
                this._$contentWithBars.addClass('expanded-left');
            }
            else {
                if (changeCloseBtnVisibility) {
                    this._$leftMenuBar.removeClass('closed disable-expand');
                }
                else {
                    this._$leftMenuBar.removeClass('closed');
                }
                this._$contentWithBars.removeClass('expanded-left');
            }
        };
        /**
         * Set right bar visibility
         *
         * @param close {boolean}   close or open the bar
         * @param changeCloseBtnVisibility {boolean}   close btn hide or not
         */
        PageBarComponent.prototype._setRightBarSize = function (close, changeCloseBtnVisibility) {
            if (close) {
                if (changeCloseBtnVisibility) {
                    this._$rightPageBar.addClass('closed disable-expand');
                }
                else {
                    this._$rightPageBar.addClass('closed');
                }
                this._$contentWithBars.addClass('expanded-right');
            }
            else {
                if (changeCloseBtnVisibility) {
                    this._$rightPageBar.removeClass('closed disable-expand');
                }
                else {
                    this._$rightPageBar.removeClass('closed');
                }
                this._$contentWithBars.removeClass('expanded-right');
            }
        };
        /**
         * Bars visibility depend window width
         */
        PageBarComponent.prototype._setSiteElementDimension = function () {
            if (this._$window.width() < this._leftBarValueToClose) {
                this._setLeftBarSize(true, true);
            }
            else {
                this._setLeftBarSize(false, true);
            }
            if (this._$window.width() < this._rightBarValueToClose) {
                this._setRightBarSize(true, true);
            }
            else {
                this._setRightBarSize(false, true);
            }
        };
        return PageBarComponent;
    }());
    component.PageBarComponent = PageBarComponent;
})(component || (component = {}));
///<reference path="../component/pagebar/pageBarComponent.ts" />
var controller;
(function (controller) {
    var CommonController = (function () {
        function CommonController() {
            console.log('CommonController init done');
            new component.PageBarComponent();
            // this._bind();
        }
        CommonController.prototype._bind = function () {
            var $mobileMenuButton = $('header').find('.mobile-menu-button'), $mobileMenu = $('nav');
            $mobileMenuButton.on('click', function () {
                // set mobile menu visibility
                if ($mobileMenu.is(':hidden')) {
                    $mobileMenu.slideDown('fast');
                }
                else {
                    $mobileMenu.slideUp('fast');
                }
                return false;
            });
        };
        return CommonController;
    }());
    controller.CommonController = CommonController;
})(controller || (controller = {}));
///<reference path="../../../lib/ts/jquey.custom-scrollbar.d.ts" />
var component;
(function (component) {
    var ChatComponent = (function () {
        function ChatComponent() {
            this._isScrolled = false;
            this._selectedColor = 'color-1';
            this._$chatContainer = $('.chat-container');
            this._$chatContent = this._$chatContainer.find('ul');
            this._$chatSendBtn = $('.chat-interface .chat-send-btn');
            this._$chatTextarea = $('.chat-interface textarea');
            this._$chatSettingsBtn = $('.chat-buttons .setting-btn');
            this._$chatSettingsPanel = $('.chat-interface .chat-settings');
            this._$chatContainer.customScrollbar({
                preventDefaultScroll: true,
                updateOnWindowResize: true
            });
            this._scrollToChatBottom();
            this._bind();
            console.log('ChatComponent init done');
        }
        ChatComponent.prototype.sendMessage = function () {
            if (!this._$chatTextarea.val().length) {
                return;
            }
            this._$chatContent.append(this._getMessageTemplate('Béna Béla', this._$chatTextarea.val()));
            this._$chatTextarea.val('');
            this._$chatContainer.customScrollbar('resize', true);
            if (!this._isScrolled) {
                this._scrollToChatBottom();
            }
        };
        ChatComponent.prototype._bind = function () {
            var _this = this;
            this._$chatContainer.on('customScroll', function (event, scrollData) {
                if (scrollData.scrollPercent < 100) {
                    _this._isScrolled = true;
                }
                else {
                    _this._isScrolled = false;
                }
            });
            this._$chatSendBtn.on('click', function () {
                _this.sendMessage();
                return false;
            });
            this._$chatSettingsBtn.on('click', function () {
                _this._setSettingsPanelVisibility();
                return false;
            });
            this._$chatSettingsPanel.find('a').on('click', function (e) {
                var selectedE = $(e.currentTarget);
                _this._selectedColor = selectedE.data('color');
                _this._$chatSettingsPanel.find('a').removeClass('selected');
                selectedE.addClass('selected');
                _this._setSettingsPanelVisibility();
                return false;
            });
        };
        ChatComponent.prototype._scrollToChatBottom = function () {
            this._$chatContainer
                .customScrollbar('scrollToY', (this._$chatContainer.find('.overview').height() - this._$chatContainer.height()));
        };
        ChatComponent.prototype._setSettingsPanelVisibility = function () {
            if (this._$chatSettingsPanel.is(':hidden')) {
                this._$chatSettingsPanel.show();
            }
            else {
                this._$chatSettingsPanel.hide();
            }
        };
        ChatComponent.prototype._getMessageTemplate = function (user, message) {
            return '<li>'
                + '<span class="info ' + this._selectedColor + '">' + _.escape(user) + ': &nbsp;</span>'
                + '<span class="text">' + _.escape(message) + '</span>'
                + '</li>';
        };
        return ChatComponent;
    }());
    component.ChatComponent = ChatComponent;
})(component || (component = {}));
///<reference path="../../../lib/ts/jquery-ui.d.ts" />
///<reference path="../../util/mobileUtil.ts" />
var component;
(function (component) {
    var VideoPlayerComponent = (function () {
        function VideoPlayerComponent($videoContainer, allowMinimizeVideo) {
            this._allowMinimizeVideo = false;
            this._prevVolume = 100;
            this._$videoContainer = $videoContainer;
            this._videoContainer = $videoContainer.get(0);
            this._$videoElement = $videoContainer.find('video');
            this._videoElement = this._$videoElement.get(0);
            this._playStopBtn = $videoContainer.find('.control-playing');
            this._volumeBtn = $videoContainer.find('.control-volume');
            this._fullScreenBtn = $videoContainer.find('.control-full-screen');
            this._audioSlider = $videoContainer.find('.volume-slider');
            this._videoBigSreenBtn = $videoContainer.find('.control-big-screen');
            this._allowMinimizeVideo = allowMinimizeVideo;
            this._fullScreenEnabled = !!(document.fullscreenEnabled
                || document.mozFullScreenEnabled
                || document.msFullscreenEnabled
                || document.webkitSupportsFullscreen
                || document.webkitFullscreenEnabled
                || document.createElement('video').webkitRequestFullScreen);
            // full screen disabled
            if (!this._fullScreenEnabled) {
                this._fullScreenBtn.hide();
            }
            var supportsVideo = (this._videoElement.canPlayType('video/mp4').length > 0)
                || (this._videoElement.canPlayType('video/webm').length > 0)
                || (this._videoElement.canPlayType('video/ogg').length > 0);
            if (!supportsVideo) {
                // TODO: show error text without video tag
                return;
            }
            this._bind();
        }
        /**
         * Play or stop video
         * @returns void
         */
        VideoPlayerComponent.prototype.setVideoRunningState = function () {
            if (this._videoElement.paused || this._videoElement.ended) {
                this._videoElement.play();
                this._changeVideoPlayIconState(true);
            }
            else {
                this._videoElement.pause();
                this._changeVideoPlayIconState(false);
            }
        };
        /**
         * Fullscreen on/off handler
         */
        VideoPlayerComponent.prototype.setFullScreenState = function () {
            if (this._isFullscreen()) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                else if (document['msExitFullscreen']) {
                    document.msExitFullscreen();
                }
            }
            else {
                if (this._videoContainer.requestFullscreen) {
                    this._videoContainer.requestFullscreen();
                }
                else if (this._videoContainer.mozRequestFullScreen) {
                    this._videoContainer.mozRequestFullScreen();
                }
                else if (this._videoContainer.webkitRequestFullScreen) {
                    this._videoContainer.webkitRequestFullScreen();
                }
                else if (this._videoContainer.msRequestFullscreen) {
                    this._videoContainer.msRequestFullscreen();
                }
            }
        };
        /**
         * Events binding
         */
        VideoPlayerComponent.prototype._bind = function () {
            var _this = this;
            /** Video events */
            this._playStopBtn.on('click', function (e) {
                _this.setVideoRunningState();
                return false;
            });
            this._$videoElement.on('ended', function () {
                _this._changeVideoPlayIconState(false);
            });
            /** Audio events */
            this._volumeBtn.on('click', function (e) {
                var muted = _this._audioSlider.slider('value') === 0;
                if (muted) {
                    _this._audioSlider.slider('value', _this._prevVolume || 100);
                    _this._updateVolume(false);
                }
                else {
                    _this._prevVolume = _this._videoElement.volume * 100;
                    _this._audioSlider.slider('value', 0);
                    _this._updateVolume(true);
                }
                return false;
            });
            this._audioSlider.slider({
                value: this._videoElement.volume * 100,
                step: 1,
                range: 'min',
                min: 0,
                max: 100,
                change: function () {
                    var volumeVar = _this._audioSlider.slider('value');
                    _this._videoElement.volume = (volumeVar / 100);
                    if (volumeVar) {
                        _this._updateVolume(false);
                    }
                    else {
                        _this._updateVolume(true);
                    }
                }
            });
            /** Fullscreen events */
            this._fullScreenBtn.on('click', function (e) {
                if (!_this._fullScreenEnabled) {
                    _this._fullScreenBtn.hide();
                    return false;
                }
                _this.setFullScreenState();
                return false;
            });
            document.addEventListener('fullscreenchange', function () {
                _this._setFullScreenClass(!!(document.fullScreen || document.fullscreenElement));
            });
            document.addEventListener('webkitfullscreenchange', function () {
                _this._setFullScreenClass(!!document.webkitIsFullScreen);
            });
            document.addEventListener('mozfullscreenchange', function () {
                _this._setFullScreenClass(!!document.mozFullScreen);
            });
            document.addEventListener('msfullscreenchange', function () {
                _this._setFullScreenClass(!!document.msFullscreenElement);
            });
            /**
             * Minimize Events
             */
            if (this._allowMinimizeVideo) {
                $(window).on('scroll', function (e) {
                    _this._setVideoMinimizedStatus();
                });
                this._videoBigSreenBtn.on('click', function () {
                    $('html, body').animate({ scrollTop: '0px' }, 300, function () {
                        _this._setVideoMinimizedStatus();
                    });
                    return false;
                });
            }
        };
        /**
         * Show play or pause btn icon
         *
         * @param pause {boolean}
         */
        VideoPlayerComponent.prototype._changeVideoPlayIconState = function (pause) {
            var $playIcon = this._playStopBtn.find('.video-play-icon'), $pauseIcon = this._playStopBtn.find('.video-pause-icon');
            if (pause) {
                $playIcon.hide();
                $pauseIcon.show();
            }
            else {
                $pauseIcon.hide();
                $playIcon.show();
            }
        };
        /**
         * Get fullscreen is supported or not
         */
        VideoPlayerComponent.prototype._isFullscreen = function () {
            return !!(document.fullScreen
                || document.webkitIsFullScreen
                || document.mozFullScreen
                || document.msFullscreenElement
                || document.fullscreenElement);
        };
        /**
         * Add or remove fullscreen class
         */
        VideoPlayerComponent.prototype._setFullScreenClass = function (isFullscreen) {
            if (isFullscreen) {
                this._$videoContainer.addClass('full-screen');
            }
            else {
                this._$videoContainer.removeClass('full-screen');
            }
        };
        /**
         * Show mute or volume btn icon
         *
         * @param mute {boolean}   muted or not
         */
        VideoPlayerComponent.prototype._updateVolume = function (mute) {
            var $volumeIcon = this._volumeBtn.find('.video-volume-up-icon'), $muteIcon = this._volumeBtn.find('.video-volume-down-icon');
            if (mute) {
                $volumeIcon.hide();
                $muteIcon.css('display', 'inline-block');
            }
            else {
                $muteIcon.hide();
                $volumeIcon.show();
            }
        };
        /**
         * Add/removed minimized video class from scrollTop value
         */
        VideoPlayerComponent.prototype._setVideoMinimizedStatus = function () {
            var top = $(document).scrollTop(), videoHeight = this._$videoContainer.height();
            if (top > (videoHeight)) {
                this._$videoContainer.addClass('scrolled');
            }
            else {
                this._$videoContainer.removeClass('scrolled');
            }
        };
        return VideoPlayerComponent;
    }());
    component.VideoPlayerComponent = VideoPlayerComponent;
})(component || (component = {}));
///<reference path="./commonController.ts" />
///<reference path="../component/chat/chatComponent.ts" />
///<reference path="../component/videoplayer/videoPlayerComponent.ts" />
var controller;
(function (controller) {
    var MainPageController = (function (_super) {
        __extends(MainPageController, _super);
        function MainPageController() {
            var _this = _super.call(this) || this;
            new component.VideoPlayerComponent($('.video-box'), false);
            new component.ChatComponent();
            _this._bind();
            return _this;
        }
        return MainPageController;
    }(controller.CommonController));
    controller.MainPageController = MainPageController;
})(controller || (controller = {}));
///<reference path="../../lib/ts/jquey.custom-scrollbar.d.ts" />
///<reference path="./commonController.ts" />
///<reference path="../component/chat/chatComponent.ts" />
///<reference path="../component/videoplayer/videoPlayerComponent.ts" />
var controller;
(function (controller) {
    var UserPageController = (function (_super) {
        __extends(UserPageController, _super);
        // private _scrollContainer: JQuery;
        function UserPageController() {
            var _this = _super.call(this) || this;
            /*this._scrollContainer = $('.content-with-bars .middle-content');
            this._scrollContainer.customScrollbar();*/
            new component.VideoPlayerComponent($('.video-box'), true);
            new component.ChatComponent();
            return _this;
        }
        return UserPageController;
    }(controller.CommonController));
    controller.UserPageController = UserPageController;
})(controller || (controller = {}));

//# sourceMappingURL=maps/main.js.map
