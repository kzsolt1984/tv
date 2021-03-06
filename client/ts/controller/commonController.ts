///<reference path="../component/pagebar/pageBarComponent.ts" />

module controller {
    export class CommonController {
        constructor() {
            console.log('CommonController init done');

            new component.PageBarComponent();

            // this._bind();
        }

        protected _bind() {
            var $mobileMenuButton = $('header').find('.mobile-menu-button'),
                $mobileMenu = $('nav');

            $mobileMenuButton.on('click', () => {
                // set mobile menu visibility
                if ( $mobileMenu.is(':hidden')) {
                    $mobileMenu.slideDown('fast');
                } 
                else {
                    $mobileMenu.slideUp('fast');
                }

                return false;
            });
        }
    }
}
