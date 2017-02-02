///<reference path="../../controller/commonController.ts" />
///<reference path="../../util/mobileUtil.ts" />
///<reference path="../../../lib/ts/jquey.custom-scrollbar.d.ts" />

module component {
    export class PageBarComponent {
        private _$closeMenuBar: JQuery;
        private _$leftMenuBar: JQuery;
        private _$rightPageBar: JQuery;
        private _$contentWithBars: JQuery;
        private _$window: JQuery;
        private _$isMobileView: boolean;
        private _leftBarValueToClose = 980;
        private _rightBarValueToClose = 850;

        constructor() {
            this._$window = $(window);
            this._$closeMenuBar = $('.close-bar-btn');
            this._$leftMenuBar = $('.left-menu-bar');
            this._$rightPageBar = $('.right-page-bar');
            this._$contentWithBars = $('.content-with-bars');
            this._$isMobileView = util.MobileUtil.detectIsMobileView();

            this._bind();
        }

        protected _bind(): void {
            this._setSiteElementDimension();

            this._$window.on('resize', () => {
                this._setSiteElementDimension();
            });

            this._$closeMenuBar.on('click', (e: JQueryEventObject) => {
                var data: any = $(e.currentTarget).data('side');

                if (data === 'left') {
                    this._setLeftBarSize(!(this._$leftMenuBar.hasClass('closed')), false);
                }
                else {
                    this._setRightBarSize(!(this._$rightPageBar.hasClass('closed')), false);
                }

                return false;
            });

            this._$leftMenuBar.find('.search-btn').on('click', (e) => {
                this._setLeftBarSize(false, false);
                this._$leftMenuBar.find('.search-form input[type="text"]').focus();
                return false;
            });

            this._$leftMenuBar.find('.search-form input[type="text"]').on('blur', () => {
                if (this._$window.width() < this._leftBarValueToClose) {
                    this._setLeftBarSize(true, false);
                }
            });

            // this._$rightPageBar.find('.auth-content').customScrollbar();
        }

        /**
         * Set left bar visibility
         * 
         * @param close {boolean}   close or open the bar
         * @param changeCloseBtnVisibility {boolean}   close btn hide or not
         */
        protected _setLeftBarSize(close: boolean, changeCloseBtnVisibility: boolean): void {
            
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
        }

        /**
         * Set right bar visibility
         * 
         * @param close {boolean}   close or open the bar
         * @param changeCloseBtnVisibility {boolean}   close btn hide or not
         */
        protected _setRightBarSize(close: boolean, changeCloseBtnVisibility: boolean): void {
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
        }

        /**
         * Bars visibility depend window width
         */
        protected _setSiteElementDimension(): void {
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
        }
    }
}
