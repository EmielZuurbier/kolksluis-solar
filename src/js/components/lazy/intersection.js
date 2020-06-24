import { 
	lazyLoadImage,
	lazyLoadPicture,
	lazyLoadMedia
} from 'Utilities/lazy.js';

/**
 * Functions to execute per tagName value.
 */
const tagHandlers = {
	'IMG': lazyLoadImage,
	'PICTURE': lazyLoadPicture,
	'VIDEO': lazyLoadMedia,
	'AUDIO': lazyLoadMedia
};

/**
 * Create the on intersection callback.
 * 
 * @function	createOnIntersectionCallback
 * @param 		{EventTarget} eventTarget 
 * @returns		{function} onIntersection callback
 */
export const createOnIntersectionCallback = function (eventTarget) {
	if (!(eventTarget instanceof EventTarget)) throw new TypeError(`${eventTarget} is not an instance of EventTarget`);
	return function onIntersection(entries, observer) {
		const loadingTargets = [];
		for (const { target, isIntersecting, intersectionRatio } of entries) {
			const { tagName } = target;
			if (isIntersecting || intersectionRatio > 0) {
				const loadingTarget = tagHandlers[tagName];
				loadingTargets.push(loadingTarget(target));
				observer.unobserve(target);
			}
		}
		Promise.all(loadingTargets).then(loadedTargets => {
			const loadEvent = new CustomEvent('load', {
				detail: {
					loadedTargets
				}
			});
			eventTarget.dispatchEvent(loadEvent);
		});
	}
};