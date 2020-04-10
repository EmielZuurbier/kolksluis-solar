/**
 * @module		./utilities/lazy
 */

/**
 * Checks if an image has a data-src or data-srcset attribute
 * and returns the answer in a Promise.
 * 
 * @function	isImageLazyLoadable
 * @param 		{HTMLImageElement} image The image to check
 * @returns		{boolean} True when data attributes are present, false when not.
 */
export const isImageLazyLoadable = image => 
	image.getAttribute('data-src') !== null || image.getAttribute('data-srcset' !== null);

/**
 * Checks if the source tags of a media element has a data-src tags
 * and returns the answer in a Promise.
 * 
 * @function	isMediaLazyLoadable
 * @param 		{(HTMLPictureElement|HTMLMediaElement)} media Picture, Video or Audio element.
 * @returns		{boolean} True when data attributes are present, false when not.
 */
export const isMediaLazyLoadable = media => 
	Array.from(media.querySelectorAll('source')).some(source => 
		source.getAttribute('data-src') !== null);

/**
 * Change the data-src attributes of the sources into src attributes.
 * Returns an array with all the sources.
 * 
 * @function	lazyLoadSources
 * @param 		{HTMLSourceElement[]} sources List of <source> elements.
 * @returns		{HTMLSourceElement[]}
 */
export const lazyLoadSources = sources => 
	Array.from(sources).forEach(source => {
		const src = source.getAttribute('data-src');
		if (src !== null) {
			source.src = src;
			source.removeAttribute('data-src');
		}
	});

/**
 * Lazy load an image by adding a src attribute with the value from the data-src attribute.
 * Also checks if the element has a srcset that needs to be lazyloaded.
 * Returns a Promise with the image element on resolve.
 * 
 * @function	lazyLoadImage
 * @param 		{HTMLImageElement} image Image element to lazyload.
 * @returns		{Promise<HTMLImageElement>} Promise with the image element on resolve.
 */
export const lazyLoadImage = image => 
	new Promise(resolve => {
		const pseudo = new Image();
		const sizes = image.getAttribute('sizes');
		const srcset = image.getAttribute('data-srcset');
		const src = image.getAttribute('data-src');
		const imageOnLoad = () => {
			image.srcset = srcset ? srcset : '';
			image.src = src;
			image.removeAttribute('data-src');
			resolve(image);
		};
		pseudo.addEventListener('load', imageOnLoad, {once: true});
		pseudo.sizes = sizes !== null ? sizes : '';
		pseudo.srcset = srcset !== null ? srcset : '';
		pseudo.src = src !== null ? src : '';
	});


/**
 * Lazy load a background-image by setting the property as a inline CSS.
 * Returns a Promise with the element on resolve.
 * 
 * @function	lazyLoadBackgroundImage
 * @param 		{HTMLElement} image Image element to lazyload.
 * @returns		{Promise<HTMLElement>} Promise with the image element on resolve.
 */
export const lazyLoadBackgroundImage = element =>
	new Promise(resolve => {
		const pseudo = new Image();
		const src = element.getAttribute('data-src');
		const imageOnLoad = () => {
			element.style.backgroundImage = `url(${src})`;
			element.removeAttribute('data-src');
			resolve(element);
		};
		pseudo.addEventListener('load', imageOnLoad, {once: true});
		pseudo.src = src !== null ? src : '';
	});

/**
 * Lazy load a picture element by changing the data-src of the sources and image inside
 * the picture element. The function returns a Promise with the picture element on resolve.
 * 
 * @function	lazyLoadPicture
 * @uses		lazyLoadSources
 * @uses		lazyLoadImage
 * @param 		{HTMLPictureElement} picture Picture element to lazyload. 
 * @returns		{Promise<HTMLPictureElement>} Promise with the picture element on resolve.
 */
export const lazyLoadPicture = picture =>
	new Promise(async resolve => {
		const sources = picture.querySelectorAll('source');
		const image = picture.querySelector('img');
		lazyLoadSources(sources);
		if (image !== null && isImageLazyLoadable(image)) await lazyLoadImage(image);
		resolve(picture);
	});

/**
 * Lazy load a media element like Video or Audio by adding a adding a src attribute with the value 
 * from the data-src attribute that is found on the <source> tags inside the media element. 
 * The media is then loaded. When the media can be played through to the end without too
 * much buffering it will resolve a promise with the media element as its value.
 * 
 * @function	lazyLoadVideo
 * @uses		lazyLoadSources
 * @param 		{HTMLMediaElement} media Video or Audio element to lazy load.
 * @returns		{Promise<HTMLMediaElement>} Promise with the video element on resolve.
 */
export const lazyLoadMedia = media => 
	new Promise(resolve => {
		const videoOnCanPlayThrough = () => resolve(media);
		const sources = media.querySelectorAll('source');
		lazyLoadSources(sources);
		media.addEventListener('canplaythrough', videoOnCanPlayThrough, {once: true});
		media.load();
	});

/**
 * Lazy loads images that contain a data-src attribute. 
 * Returns a Promise that resolves with the image elements when all loads have resolved.
 * 
 * @function	lazyLoadAllImages
 * @uses		lazyLoadImage
 * @param 		{HTMLImageElement[]} [images=document.images] Array of image elements to load.
 * @returns		{Promise<HTMLImageElement[]>}
 */
export const lazyLoadAllImages = (images = document.images) => 
	Promise.all([...images].map(lazyLoadImage));

/**
 * Lazy loads media element that have sources that contain a data-src attribute and.
 * Returns a Promise that resolves with the media elements when all loads have resolved.
 * 
 * @function	lazyLoadAllMedia
 * @uses		lazyLoadMedia
 * @param 		{HTMLImageElement[]} media Array of media elements to load.
 * @returns		{Promise<HTMLImageElement[]>}
 */
export const lazyLoadAllMedia = media => 
	Promise.all([...media].map(lazyLoadMedia));