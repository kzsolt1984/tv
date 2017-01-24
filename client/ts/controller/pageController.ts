///<reference path="./commonController.ts" />

module controller {
    export class PageController extends CommonController {
        private _$closeMenuBar: JQuery;
        private _$leftMenuBar: JQuery;
        private _$rightPageBar: JQuery;
        private _$contentWithBars: JQuery;
        private _$window: JQuery;

        constructor() {
            super();

            this._$window = $(window);
            this._$closeMenuBar = $('.close-bar-btn');
            this._$leftMenuBar = $('.left-menu-bar');
            this._$rightPageBar = $('.right-page-bar');
            this._$contentWithBars = $('.content-with-left-menu');

            this._bind();
        }

        protected _bind(): void {
            super._bind();

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
        }

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

        protected _setSiteElementDimension(): void {
            if (this._$window.width() < 980) {
                this._setLeftBarSize(true, true);
            }
            else {
                this._setLeftBarSize(false, true);
            }

            if (this._$window.width() < 850) {
                this._setRightBarSize(true, true);
            }
            else {
                this._setRightBarSize(false, true);
            }
        }
    }
}
