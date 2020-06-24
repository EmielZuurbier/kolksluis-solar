/**
 * @function	onClick
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onClick = function onClick(event) {

	const button = event.target.closest('button[slot="tab"]');
	if (button !== null) {
		const { value } = button;
		for (const tab of this.tabs) {
			if (tab === button) {
				tab.classList.add('is-active');
			} else {
				tab.classList.remove('is-active');
			}
		}
		this.active = value;
	}
	
	event.preventDefault();

};

/**
 * @function	onSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange({ target }) {
	const { name } = target;
	const tabs = target.assignedElements();

	try {
		if (name === 'tab') {
			for (const tab of tabs) {
				
				if (tab.id === '') {
					throw Error('Tab elements need an id attribute value');
				}
	
				const panel = tab.nextElementSibling;
				if (panel !== null) {
	
					if (panel.id === '') {
						throw Error('Panel elements need an id attribute value');
					}
	
					tab.setAttribute('aria-controls', panel.id);
					panel.setAttribute('aria-labelledby', tab.id);

					this.map.set(tab, panel);
	
				}
	
			}
		}
	} catch(error) {
		console.error(error);
	}


};