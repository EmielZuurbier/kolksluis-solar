/**
 * @module		./components/slider/events
 */

import { 
	createDirections,
	getRailsOffset,
	getEventScreenValues
} from './functions.js';

export const onDragStart = function onDragStart(event) {
	event.dataTransfer.setData('application/node type', this);
	const { screenX, screenY } = event;
	this.drag.start = { x: screenX, y: screenY };
	this.drag.move = null;
	this.drag.end = null;
	this.drag.distance = null;
	console.log(event);
};

export const onDrag = function onDrag(event) {
	if (this.moving === true) {
		return false;
	}
	const { screenX, screenY } = event;
	this.drag.move = { x: screenX, y: screenY };
	this.drag.distance = createDirections(
		this.drag.start.x - this.drag.move.x,
		this.drag.start.y - this.drag.move.y
	);
	const offset = getRailsOffset.call(this);
	const distance = createDirections(
		offset.x + this.drag.distance.horizontal, 
		offset.y + this.drag.distance.vertical,
		Math.round
	);
	this.moveTo(`${-distance[this.axis]}px`);
	console.log(event);
};

export const onDragEnd = function onDragEnd(event) {
	if (this.drag.distance === null || this.moving === true) { 
		return false;
	}
	const { screenX, screenY } = event;
	const absDragDistances = createDirections(
		this.drag.distance.horizontal, 
		this.drag.distance.vertical, 
		Math.abs
	);
	if (absDragDistances[this.axis] >= this.dragThreshold) {
		if (this.drag.distance[this.axis] < 0) {
			this.prevSlide(); // Prev
		} else {
			this.nextSlide(); // Next
		} 
	} else {
		this.slideToIndex(this.index);
	}
	console.log(event);
};

/**
 * @function	onTouchStart
 * @param		{Event} event
 * @returns		{void}
 */
export const onTouchStart = function onTouchStart(event) {
	this.touch.start = getEventScreenValues(event.changedTouches[0]);
	this.touch.move = null;
	this.touch.end = null;
	this.touch.distance = null;
};

/**
 * @function	onTouchMove
 * @param		{Event} event
 * @returns		{void}
 */
export const onTouchMove = function onTouchMove(event) {
	if (this.moving === true) {
		return false;
	}
	this.touch.move = getEventScreenValues(event.changedTouches[0]);
	this.touch.distance = createDirections(
		this.touch.start.x - this.touch.move.x,
		this.touch.start.y - this.touch.move.y
	);
	const offset = getRailsOffset.call(this);
	const distance = createDirections(
		offset.x + this.touch.distance.horizontal, 
		offset.y + this.touch.distance.vertical,
		Math.round
	);
	this.moveTo(`${-distance[this.axis]}px`);
};

/**
 * @function 	onTouchEnd
 * @param		{Event} event
 * @returns		{void}
 */
export const onTouchEnd = function onTouchEnd(event) {
	if (this.touch.distance === null || this.moving === true) { 
		return false;
	}
	this.touch.end = getEventScreenValues(event.changedTouches[0]);
	const absTouchDistances = createDirections(
		this.touch.distance.horizontal, 
		this.touch.distance.vertical, 
		Math.abs
	);
	if (absTouchDistances[this.axis] >= this.touchThreshold) {
		if (this.touch.distance[this.axis] < 0) {
			this.prevSlide(); // Prev
		} else {
			this.nextSlide(); // Next
		} 
	} else {
		this.slideToIndex(this.index);
	}
};

/**
 * @function	onWheel
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onWheel = function onWheel({ deltaY }) {
	const absoluteDelta = Math.abs(deltaY);
	if (this.moving === null && absoluteDelta >= this.wheelThreshold) {
		if (deltaY < 0) {
			this.prevSlide();
		} else if (deltaY > 0) {
			this.nextSlide();
		}
	}
};

/**
 * @function	onKeyDown
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onKeyDown = function onKeyDown({ keyCode }) {
	if (this.axis === 'horizontal') {
		switch(keyCode) {
			case 37: // Arrow left
				this.prevSlide();
				break;
			case 39: // Arrow right
				this.nextSlide();
				break;
		}
	} else if (this.axis === 'vertical') {
		switch(keyCode) {
			case 38: // Arrow up
				this.prevSlide();
				break;
			case 40: // Arrow down
				this.nextSlide();
				break;
		}
	}
};

/**
 * @function	onMouseEnter
 * @param		{Event} event
 * @returns		{void}
 */
export const onMouseEnter = function onMouseEnter() {
	this.hover = true;
};

/**
 * @function	onMouseLeave
 * @param		{Event} event
 * @returns		{void}
 */
export const onMouseLeave = function onMouseLeave() {
	this.hover = false;
};

/**
 * @function	onClick
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onClick = function onClick(event) {

	// Get clicked slide.
	const { target } = event;
	const slide = target.closest('[slot="slide"]');

	// If a slide is clicked.
	if (slide !== null) {

		// If the slide was not active when clicked.
		if (slide.active === false) {

			// Slide to it.
			this.index = slide.index;
			event.preventDefault();

		}
	}
};

/**
 * @function    clickPrev
 * @param       {Event} event
 * @returns     {void}
 */
const clickPrev = function clickPrev(event) {
	this.prevSlide();
	event.preventDefault();
}

/**
 * @function    clickNext
 * @param       {Event} event
 * @returns     {void}
 */
const clickNext = function clickNext(event) {
	this.nextSlide();
	event.preventDefault();
}

/**
 * @function	onSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange(event) {
	const { target } = event;
	if (target.name === 'slide') {

		// Set tabindex
		this.slides.forEach((slide, i) => {
			slide.index = i;
			slide.setAttribute('tabIndex', i);
		});

		// Set starting index.
		if (isNaN(this.index)) {
			this.index = 0;
		}

		// Set default amount.
		if (isNaN(this.amount)) {
			this.amount = 1;
		}

	} else if (target.name === 'prev') {

		// Add click event listener to assigned elements.
		this.prev.forEach(element => element.addEventListener('click', clickPrev.bind(this)));

	} else if (target.name === 'next') {

		// Add click event listener to assigned elements.
		this.next.forEach(element => element.addEventListener('click', clickNext.bind(this)));

	}
};