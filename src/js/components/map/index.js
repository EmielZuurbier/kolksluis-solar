import BaseElement from 'Classes/custom-elements/base-element.js';
import { getRestData } from 'Utilities/rest.js';
import { template } from './template.js';
import mapboxgl from 'mapbox-gl';

// Create a template.
template.render();

// /**
//  * Map element
//  * 
//  * @class
//  * @extends	BaseElement
//  */
// export default class MapElement extends BaseElement {

// 	/**
// 	 * Attributes to trigger the attributeChangedCallback on.
// 	 * 
// 	 * @static
// 	 * @get
// 	 * @method	observedAttributes
// 	 * @returns	{string[]}
// 	 */
// 	static get observedAttributes() {
// 		return ['in-view'];
// 	}

// 	/**
// 	 * @constructor
// 	 */
// 	constructor() {
// 		super();
		
// 		const shadow = this.attachShadow({ mode: 'open' });
// 		shadow.appendChild(template.clone());
//     }

//     /**
// 	 * Gets and sets the in-view attribute.
// 	 * @property
// 	 */
// 	get inView() {
// 		return this.getAttribute('in-view');
// 	}

// 	set inView(value) {
// 		if (value === true) {
// 			this.setAttribute('in-view', '');
// 		} else {
// 			this.removeAttribute('in-view');
// 		}
// 	}

// 	/**
// 	 * Gets the map element from the Shadow DOM.
// 	 * @property
// 	 */
// 	get map() {
// 		return this.shadowRoot.querySelector('.map');
// 	}

// 	/**
// 	 * Fires when an attribute has been changed.
// 	 * 
// 	 * @method	attributeChangedCallback
// 	 * @param 	{string} attrName Name of attribute.
// 	 * @param 	{*} oldValue Old value of attribute.
// 	 * @param 	{*} newValue New value of attribute.
// 	 */
// 	attributeChangedCallback(attrName, oldValue, newValue) {

//         switch(attrName) {
//         	case 'in-view':
// 				this.#getAccessToken();
// 				break;
//         }

//     }

// 	/**
// 	 * Fires when the element has been connected.
// 	 * 
// 	 * @method	connectedCallback
// 	 * @returns	{void}
// 	 */
// 	connectedCallback() {
	
// 		/**
// 		 * Intersection Observer callback.
// 		 * 
// 		 * @param 	{IntersectionObserverEntry[]} entries 
// 		 * @returns	{void}
// 		 */
// 		const onIntersection = (entries, observer) => {
// 			for (const { target, isIntersecting } of entries) {
// 				if (isIntersecting) {
// 					this.inView = true;
// 					observer.unobserve(target);
// 				}
// 			}
// 		}

// 		// Create instance of observer.
// 		const observer = new IntersectionObserver(onIntersection, {
// 			root: null,
// 			rootMargin: '0px',
// 			threshold: [0]
// 		});

// 		// Observer the current element.
// 		observer.observe(this);

// 	}

// 	/**
// 	 * Fires when the element has been disconnected.
// 	 * 
// 	 * @method	disconnectedCallback
// 	 * @returns	{void}
// 	 */
// 	disconnectedCallback() {

// 	}

// 	/**
// 	 * Fires when the element has been adopted in a new document.
// 	 * 
// 	 * @method	connectedCallback
// 	 * @returns	{void}
// 	 */
// 	adoptedCallback() {

// 	}

// }

/**
 * MapBox element
 * 
 * @class
 * @extends	BaseElement
 */
export default class MapBoxElement extends BaseElement {

	/**
	 * @private
	 */
	#mapboxInstance = null;

	/**
	 * @private
	 */
	#observeMap = () => {

		/**
		 * Intersection Observer callback.
		 * 
		 * @param 	{IntersectionObserverEntry[]} entries 
		 * @returns	{void}
		 */
		const onIntersection = (entries, observer) => {
			for (const { target, isIntersecting } of entries) {
				if (isIntersecting) {
					this.inView = true;
					observer.unobserve(target);
				}
			}
		}

		// Create instance of observer.
		const observer = new IntersectionObserver(onIntersection, {
			root: null,
			rootMargin: '0px',
			threshold: [0]
		});

		// Observer the current element.
		observer.observe(this);

	}

	#initMap = () => {

		// Create the map.
		this.#mapboxInstance = new mapboxgl.Map({
			container: this.map,
			style: this.mapStyle,
			center: this.center,
			interactive: false,
			zoom: 10
		});

		const map = this.#mapboxInstance;

		// Add lines when map has been loaded.
		map.on('load', () => {

			// Set loaded state to true.
			this.loaded = true;

			// Add source from GeoJSON file.
			map.addSource('kolksluis-solar', {
				"type": "geojson",
				"lineMetrics": true,
				"data": wp.rest + 'kss/v1/geojson'
			});

			// Add polygon layer.
			map.addLayer({
				'id': 'kolksluis-solar-polygon',
				'type': 'fill',
				'source': 'kolksluis-solar',
				'layout': {},
				'paint': {
					'fill-color': '#fff',
					'fill-opacity': 0.25
				}
			});

			// Add line layer.
			map.addLayer({
				'id': 'kolksluis-solar-line',
				'type': 'line',
				'source': 'kolksluis-solar',
				'layout': {
					'line-cap': 'round',
					'line-join': 'round'
				},
				'paint': {
					'line-gradient': [
						'interpolate',
						['linear'],
						['line-progress'],
						0, '#cb8037',
						0.2, '#b04a51',
						0.4, '#742828',
						0.6, '#602168',
						0.8, '#4d2ba8'
					],
					'line-width': 6,
					'line-opacity': 1
				}
			});

			map.flyTo({
				center: this.center,
				zoom: 15,
				speed: 0.5
			});

		});

	}

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['in-view', 'access-token', 'center', 'fit-to-bounds', 'zoom'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(template.clone());
		
	}

	/**
	 * Gets and sets the loaded attribute.
	 * @property
	 */
	get loaded() {
		return this.getAttribute('loaded');
	}

	set loaded(value) {
		if (value === true) {
			this.setAttribute('loaded', '');
		} else {
			this.removeAttribute('loaded');
		}
	}

	/**
	 * Gets and sets the in-view attribute.
	 * @property
	 */
	get inView() {
		return this.getAttribute('in-view');
	}

	set inView(value) {
		if (value === true) {
			this.setAttribute('in-view', '');
		} else {
			this.removeAttribute('in-view');
		}
	}

	/**
	 * Gets the map element from the Shadow DOM.
	 * @property
	 */
	get map() {
		return this.shadowRoot.querySelector('.map');
	}

	/**
	 * Gets and sets the access-token attribute.
	 * @property
	 */
	get accessToken() {
		return this.getAttribute('access-token');
	}

	set accessToken(value) {
		if ('string' === typeof value) {
			this.setAttribute('access-token', value);
		} else {
			this.removeAttribute('access-token');
		}
	}

	/**
	 * Gets and sets the center attribute.
	 * @property
	 */
	get center() {
		const { lng, lat } = JSON.parse(this.getAttribute('center'));
		return new mapboxgl.LngLat(
			parseFloat(lng),
			parseFloat(lat)
		);
	}

	set center(value) {
		if ('object' === typeof value) {
			this.setAttribute('center', JSON.stringify(value));
		} else {
			this.removeAttribute('center');
		}
	}

	/**
	 * Gets and sets the map-style attribute.
	 * @property
	 */
	get mapStyle() {
		return this.getAttribute('map-style');
	}

	set mapStyle(value) {
		if ('string' === typeof value) {
			this.setAttribute('map-style', value);
		} else {
			this.removeAttribute('map-style');
		}
	}

	/**
	 * Gets and sets the fit-to-bounds attribute.
	 * @property
	 */
	get fitToBounds() {
		return this.getAttribute('fit-to-bounds');
	}

	set fitToBounds(value) {
		if (value === true) {
			this.setAttribute('fit-to-bounds', '');
		} else {
			this.removeAttribute('fit-to-bounds');
		}
	}

	/**
	 * Gets and sets the min-zoom attribute.
	 * @property
	 */
	get minZoom() {
		return parseInt(this.getAttribute('min-zoom'));
	}

	set minZoom(value) {
		if ('number' === typeof value) {
			this.setAttribute('min-zoom', value);
		} else {
			this.removeAttribute('min-zoom');
		}
	}

	/**
	 * Gets and sets the max-zoom attribute.
	 * @property
	 */
	get maxZoom() {
		return parseInt(this.getAttribute('max-zoom'));
	}

	set maxZoom(value) {
		if ('number' === typeof value) {
			this.setAttribute('max-zoom', value);
		} else {
			this.removeAttribute('max-zoom');
		}
	}

	/**
	 * Gets and sets the hash attribute.
	 * @property
	 */
	get hash() {
		return this.getAttribute('hash');
	}

	set hash(value) {
		if (value === true) {
			this.setAttribute('hash', '');
		} else {
			this.removeAttribute('hash');
		}
	}

	/**
	 * Gets and sets the interactive attribute.
	 * @property
	 */
	get interactive() {
		return this.getAttribute('interactive');
	}

	set interactive(value) {
		if (value === true) {
			this.setAttribute('interactive', '');
		} else {
			this.removeAttribute('interactive');
		}
	}

	/**
	 * Gets and sets the bearing-snap attribute.
	 * @property
	 */
	get bearingSnap() {
		return parseInt(this.getAttribute('bearing-snap'));
	}

	set bearingSnap(value) {
		if ('number' === typeof value) {
			this.setAttribute('bearing-snap', value);
		} else {
			this.removeAttribute('bearing-snap');
		}
	}

	/**
	 * Gets and sets the pitch-with-rotate attribute.
	 * @property
	 */
	get pitchWithRotate() {
		return this.getAttribute('pitch-with-rotate');
	}

	set pitchWithRotate(value) {
		if (value === true) {
			this.setAttribute('pitch-with-rotate', '');
		} else {
			this.removeAttribute('pitch-with-rotate');
		}
	}

	/**
	 * Gets and sets the click-tolerance attribute.
	 * @property
	 */
	get clickTolerance() {
		return parseInt(this.getAttribute('click-tolerance'));
	}

	set clickTolerance(value) {
		if ('number' === typeof value) {
			this.setAttribute('click-tolerance', value);
		} else {
			this.removeAttribute('click-tolerance');
		}
	}

	/**
	 * Gets and sets the attribution-control attribute.
	 * @property
	 */
	get attributionControl() {
		return this.getAttribute('attribution-control');
	}

	set attributionControl(value) {
		if (value === true) {
			this.setAttribute('attribution-control', '');
		} else {
			this.removeAttribute('attribution-control');
		}
	}

	/**
	 * Gets and sets the custom-attrition attribute.
	 * @property
	 */
	get customAttribution() {
		const value = this.getAttribute('custom-attrition');
		let json = false;
		try {
			json = JSON.parse(value);
			return json;
		} catch(e) {
			return value;
		}
	}

	set customAttribution(value) {
		if ('string' === typeof value) {
			this.setAttribute('custom-attrition', JSON.stringify(value));
		} else {
			this.removeAttribute('custom-attrition');
		}
	}

	/**
	 * Gets and sets the logo-position attribute.
	 * @property
	 */
	get logoPosition() {
		return this.getAttribute('logo-position');
	}

	set logoPosition(value) {
		if ('string' === typeof value) {
			this.setAttribute('logo-position', value);
		} else {
			this.removeAttribute('logo-position');
		}
	}

	/**
	 * Gets and sets the fail-if-major-performance-caveat attribute.
	 * @property
	 */
	get failIfMajorPerformanceCaveat() {
		return this.getAttribute('fail-if-major-performance-caveat');
	}

	set failIfMajorPerformanceCaveat(value) {
		if (value === true) {
			this.setAttribute('fail-if-major-performance-caveat', '');
		} else {
			this.removeAttribute('fail-if-major-performance-caveat');
		}
	}

	/**
	 * Gets and sets the preserve-drawing-buffer attribute.
	 * @property
	 */
	get preserveDrawingBuffer() {
		return this.getAttribute('preserve-drawing-buffer');
	}

	set preserveDrawingBuffer(value) {
		if (value === true) {
			this.setAttribute('preserve-drawing-buffer', '');
		} else {
			this.removeAttribute('preserve-drawing-buffer');
		}
	}

	/**
	 * Gets and sets the anti-alias attribute.
	 * @property
	 */
	get antialias() {
		return this.getAttribute('anti-alias');
	}

	set antialias(value) {
		if (value === true) {
			this.setAttribute('anti-alias', '');
		} else {
			this.removeAttribute('anti-alias');
		}
	}

	/**
	 * Gets and sets the refresh-expired-tiles attribute.
	 * @property
	 */
	get refreshExpiredTiles() {
		return this.getAttribute('refresh-expired-tiles');
	}

	set refreshExpiredTiles(value) {
		if (value === true) {
			this.setAttribute('refresh-expired-tiles', '');
		} else {
			this.removeAttribute('refresh-expired-tiles');
		}
	}

	/**
	 * Gets and sets the zoom attribute.
	 * @property
	 */
	get zoom() {
		return parseInt(this.getAttribute('zoom'));
	}

	set zoom(value) {
		if ('number' === typeof value) {
			this.setAttribute('zoom', value);
		} else {
			this.removeAttribute('zoom');
		}
	}

	/**
	 * Gets and sets the bearing attribute.
	 * @property
	 */
	get bearing() {
		return parseInt(this.getAttribute('bearing'));
	}

	set bearing(value) {
		if ('number' === typeof value) {
			this.setAttribute('bearing', value);
		} else {
			this.removeAttribute('bearing');
		}
	}
	/**
	 * Gets and sets the pitch attribute.
	 * @property
	 */
	get pitch() {
		return parseInt(this.getAttribute('pitch'));
	}

	set pitch(value) {
		if ('number' === typeof value) {
			this.setAttribute('pitch', value);
		} else {
			this.removeAttribute('pitch');
		}
	}

	/**
	 * Fires when an attribute has been changed.
	 * 
	 * @method	attributeChangedCallback
	 * @param 	{String} attrName Name of attribute.
	 * @param 	{*} oldValue Old value of attribute.
	 * @param 	{*} newValue New value of attribute.
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {

		switch(attrName) {
			case 'in-view':
				this.#initMap();
				break;
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		if (this.accessToken === null) {
			throw new Error('access-token attribute must be set.');
		}

		// Set the access token.
		mapboxgl.accessToken = this.accessToken;

		this.#observeMap();

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		this.#mapboxInstance = null;

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

}