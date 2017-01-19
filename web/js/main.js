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
            var controllerName = _.capitalize(this._bodyId + 'Controller'), win = window; // compailer semantic error protection
            if (win['controller'][controllerName]) {
                new win['controller'][controllerName];
            }
            else {
                new win['controller']['CommonController'];
                console.error('Controller no exist', controllerName);
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
            this.otherRecommender();
        }
        Main.prototype.recommender = function () {
            var $box = $('.recommend-block'), $cont = $('.live-recommender-container > div');
            for (var i = 0; i < 2; i++) {
                var $clone = $box.clone();
                $cont.append($clone);
            }
        };
        Main.prototype.otherRecommender = function () {
            var $box = $('.other-recommender-container .thumbnail-big'), $cont = $('.other-recommender-container > div');
            for (var i = 0; i < 7; i++) {
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
var component;
(function (component) {
    var VideoPlayerComponent = (function () {
        function VideoPlayerComponent($videoContainer) {
            this._volumeDrag = false;
            this._$videoContainer = $videoContainer;
            this._videoContainer = $videoContainer.get(0);
            this._videoElement = $videoContainer.find('video').get(0);
            this._playStopBtn = $videoContainer.find('.control-playing');
            this._volumeBtn = $videoContainer.find('.control-volume');
            this._fullScreenBtn = $videoContainer.find('.control-full-screen');
            this._audioSlider = $videoContainer.find('.volume-slider');
            var supportsVideo = (this._videoElement.canPlayType('video/mp4').length > 0);
            if (!supportsVideo) {
                return;
            }
            // set default value
            this.updateVolume(0, this._videoElement.volume);
            this._bind();
        }
        /**
         * Play or stop video
         * @returns void
         */
        VideoPlayerComponent.prototype.setVideoRunningState = function () {
            var $playIcon = this._playStopBtn.find('.video-play-icon'), $pauseIcon = this._playStopBtn.find('.video-pause-icon');
            if (this._videoElement.paused || this._videoElement.ended) {
                this._videoElement.play();
                $playIcon.hide();
                $pauseIcon.show();
            }
            else {
                this._videoElement.pause();
                $pauseIcon.hide();
                $playIcon.show();
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
                else if (document['mozCancelFullScreen']) {
                    document['mozCancelFullScreen']();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                else if (document['msExitFullscreen']) {
                    document['msExitFullscreen']();
                }
            }
            else {
                if (this._videoContainer.requestFullscreen) {
                    this._videoContainer.requestFullscreen();
                }
                else if (this._videoContainer['mozRequestFullScreen']) {
                    this._videoContainer['mozRequestFullScreen']();
                }
                else if (this._videoContainer.webkitRequestFullScreen) {
                    this._videoContainer.webkitRequestFullScreen();
                }
                else if (this._videoContainer['msRequestFullscreen']) {
                    this._videoContainer['msRequestFullscreen']();
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
            /** Audio events */
            this._volumeBtn.on('click', function (e) {
                _this._videoElement.muted = !_this._videoElement.muted;
                return false;
            });
            this._audioSlider.on('mousedown', function (e) {
                _this._volumeDrag = true;
                _this._videoElement.muted = false;
                console.log('down', e.offsetX);
                _this.updateVolume(e.offsetX);
            });
            $(document).on('mouseup', function (e) {
                if (_this._volumeDrag) {
                    _this._volumeDrag = false;
                    _this.updateVolume(e.offsetX);
                    console.log('up', e.offsetX);
                }
            });
            /*$(document).on('mouseleave', (e: JQueryEventObject) => {
                this._volumeDrag = false;
            });*/
            this._audioSlider.on('mousemove', function (e) {
                if (_this._volumeDrag) {
                    _this.updateVolume(e.offsetX);
                    console.log('move', e.offsetX);
                }
            });
            /** Fullscreen events */
            this._fullScreenBtn.on('click', function (e) {
                var fullScreenEnabled = !!(document.fullscreenEnabled
                    || document['mozFullScreenEnabled']
                    || document['msFullscreenEnabled']
                    || document['webkitSupportsFullscreen']
                    || document['webkitFullscreenEnabled']
                    || document.createElement('video').webkitRequestFullScreen);
                if (!fullScreenEnabled) {
                    _this._fullScreenBtn.hide();
                    return false;
                }
                _this.setFullScreenState();
                return false;
            });
            document.addEventListener('fullscreenchange', function () {
                _this._setFullScreenClass(!!(document['fullScreen'] || document.fullscreenElement));
            });
            document.addEventListener('webkitfullscreenchange', function () {
                _this._setFullScreenClass(!!document.webkitIsFullScreen);
            });
            document.addEventListener('mozfullscreenchange', function () {
                _this._setFullScreenClass(!!document['mozFullScreen']);
            });
            document.addEventListener('msfullscreenchange', function () {
                _this._setFullScreenClass(!!document['msFullscreenElement']);
            });
        };
        /**
         * Get fullscreen is supported or not
         */
        VideoPlayerComponent.prototype._isFullscreen = function () {
            return !!(document['fullScreen ']
                || document.webkitIsFullScreen
                || document['mozFullScreen']
                || document['msFullscreenElement']
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
        VideoPlayerComponent.prototype.updateVolume = function (offsetX, volume) {
            var percentage = 0, $volumeIcon = this._volumeBtn.find('.video-volume-up-icon'), $muteIcon = this._volumeBtn.find('.video-volume-down-icon');
            if (offsetX > 100) {
                offsetX = 100;
            }
            if (offsetX < 0) {
                offsetX = 0;
            }
            // if only volume have specificed then direct update volume
            if (volume) {
                percentage = volume * 100;
            }
            else {
                percentage = 100 * offsetX / this._audioSlider.width();
            }
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            // update volume bar and video volume
            this._audioSlider.find('.volume-slider-range').css('width', percentage + '%');
            this._audioSlider.find('.volume-slider-handle').css('left', percentage + '%');
            this._videoElement.volume = percentage / 100;
            if (this._videoElement.volume === 0) {
                $volumeIcon.hide();
                $muteIcon.css('display', 'inline-block');
            }
            else {
                $muteIcon.hide();
                $volumeIcon.show();
            }
        };
        return VideoPlayerComponent;
    }());
    component.VideoPlayerComponent = VideoPlayerComponent;
})(component || (component = {}));
///<reference path="../component/videoplayer/videoPlayerComponent.ts" />
var controller;
(function (controller) {
    var CommonController = (function () {
        function CommonController() {
            console.log('CommonController init done');
            // temporarily place
            new component.VideoPlayerComponent($('.video-content'));
        }
        return CommonController;
    }());
    controller.CommonController = CommonController;
})(controller || (controller = {}));

//# sourceMappingURL=maps/main.js.map
