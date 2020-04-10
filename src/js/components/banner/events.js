/**
 * @function	onScroll
 * @param		{Event} event
 * @returns		{void}
 */
export const onScroll = function onScroll() {
    requestAnimationFrame(() => {
        const top = document.scrollingElement.scrollTop || document.documentElement.scrollTop;
        if (top >= this.threshold) {
            if (this.room !== null) {
                if (top > this.lastScrollTop) {
                    if (this.up !== null) {
                        this.up = false;
                    }
                    this.down = true;
                } else if (top < this.lastScrollTop) {
                    if (this.down !== null) {
                        this.down = false;
                    }
                    this.up = true;
                }
            }
            if (this.scrolled === null) {
                this.scrolled = true;
            }
        } else {
            if (this.room !== null) {
                if (this.up !== null) {
                    this.up = false;
                }
                if (this.down !== null) {
                    this.down = false;
                }
            }
            if (this.scrolled !== null) {
                this.scrolled = false;
            }
        }
        this.lastScrollTop = top;
    });
};