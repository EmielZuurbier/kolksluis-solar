/**
 * Observes elements queried by the selector and fires 
 * a callback whenever only one of those elements is in the view.
 *
 * @param 	{string} selector
 * @param	{string} property
 * @param 	{function} callback
 * @returns {IntersectionObserver}
 */
export const whenSingleEntryInView = (selector, callback) => {

	/**
	 * Store elements that are in view in a Set.
	 */
	const elementsInView = new Set();
  
	/**
	 * Callback that runs whenever observed elements intersect.
	 *
	 * @param {IntersectionObserverEntry[]} entries
	 */
	const intersectionCallback = entries => {
  
		/**
		 * Check if current entries are in view.
		 * If they are add them to the elementsInView array and remove them if they are not.
		 */
		entries.forEach(entry => {
			const { target } = entry;
			if (entry.isIntersecting) {
				elementsInView.add(target);
			} else {
				elementsInView.delete(target);
			}
		});
  
		/**
		 * Whenever there is only one element in the view fire the callback and pass
		 * the element that is in view to the callback.
		 */
	  	if (elementsInView.size === 1) {
			for (const element of elementsInView.values()) {
				if ('function' === typeof callback) {
					callback(element);
				}
			}
	  	}
  
	}
  
	/**
	 * Options for the observer
	 */
	const options = {
		root: null,
		rootMargin: '50px 0px',
		threshold: [0, 1]
	};
  
	/**
	 * Create observer
	 */
	const observer = new IntersectionObserver(intersectionCallback, options);
  
	/**
	 * Observer elements based on the selector argument
	 */
	const elements = document.querySelectorAll(selector);
	elements.forEach(element => observer.observe(element));
	return observer;
	
}

export const parallax = (elements) => {

	const elementsInView = new Set();
	const offsetMap = new Map();
	
	const calculateOffsetsOfElements = (elements, map) => {
	  const bodyTop = document.body.getBoundingClientRect().top;
	  elements.forEach(element => {
		const elementTop = element.getBoundingClientRect().top;
		const offset = elementTop - bodyTop;
		map.set(element, offset);
	  });
	};
	
	const intersectionCallback = entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting === true) {
		  elementsInView.add(entry.target);
		} else {
		  elementsInView.delete(entry.target);
		}
	  });
	}
	
	const observer = new IntersectionObserver(intersectionCallback, {
	  root: null,
	  rootMargin: '0px',
	  threshold: [0]
	});

	for (const element of elements) {
		observer.observe(element);
	}
	
	calculateOffsetsOfElements(elements, offsetMap);
	
	window.addEventListener('resize', function(e) {
	  calculateOffsetsOfElements(sections, offsetMap);
	});
	
	window.addEventListener('scroll', function(e) {
		for (const element of elementsInView) {
			const target = element.querySelector('.scroll');
			if (offsetMap.has(element)) {
				const offset = offsetMap.get(element);
				var rate = Math.round((window.pageYOffset - offset) * -0.5);
				target.style.transform = 'translate3d(0px, ' + rate + 'px, 0px)';
			}
	  }
	}, {passive: true});

};