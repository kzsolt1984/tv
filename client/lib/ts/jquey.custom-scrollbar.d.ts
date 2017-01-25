interface IScrollbarOptions {
    /**
     * Jquery Plugin
     * https://github.com/mzubala/jquery-custom-scrollbar
     */

    /** 
     * Speed of the animation of programmatic scrolling. It’s possible to edit it with setAnimationSpeed method. Animation speed equal to 0 means no animation.
     */
    animationSpeed?: number;
    /** 
     * By default thumb height (in case of vertical scrollbar) is calculated automatically depending on viewport and overview height but you can fix thumb height 
     * to your chosen pixel value by setting this option. Make sure to not set min-height in css if you set fixedThumbHeight because min-height has priority.
     */
    fixedThumbHeight?: number;
    /**
     * Option analogical to fixedThumbHeight but applied to thumbs of horizontal scrollbars.
     */
    fixedThumbWidth?: number;
    /**
     * Indicates whether or not, horizontal scrollbar should be shown when it’s necessary.
     */
    hScroll?: boolean;
    /**
     * When the scrolling event occurs (e.g. down arrow key, mouse wheel) and it doesn’t cause the scrollbar to move (e.g. because the scrollbar is in extreme position), 
     * the event is propagated further which will cause the parent container to scroll. If it does cause the scrollbar movement then such event is stopped from propagating further 
     * and the parent container won’t scroll. This default behaviour can be changed by setting preventDefaultScroll: true. 
     * It will cause the custom scrollbar to always stop scrolling event propagation no matter if the scrollbar changed or didn’t change its position.
     */
    preventDefaultScroll?: boolean;
    /**
     * A css skin class that will be added to the scrolled container. You can define it in html as well as here in options. Note that skin has to be defined in one of those ways.
     */
    skin?: string;
    /**
     * Indicates how fast touch scroll should be. When you swipe your finger by x pixels the content will be scrolled by swipeSpeed * x pixels.
     */
    swipeSpeed?: number;
    /**
     * Indicates whether scrollbar should recalculate thumb size when window is resized. See demos/resize.html for an example.
     */
    updateOnWindowResize?: boolean;
    /**
     * Same as above but applies to vertical scrollbar.
     */
    vScroll?: boolean;
    /**
     * Indicates how fast mouse wheel scroll should be. When you make the smallest possible mouse wheel move, the content will be scrolled by wheelSpeed pixels.
     */
    wheelSpeed?: number;
}

interface JQuery {
    customScrollbar(params?: IScrollbarOptions): JQuery;
    customScrollbar(event?: string, data?: any): JQuery;
}