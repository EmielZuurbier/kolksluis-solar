/**
 * @function	onSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange({ target }) {
	const { name } = target;
	const elements = target.assignedElements();
	for (const element of elements) {

		switch(name) {
			case 'video':
				element.addEventListener('loadedmetadata', event => {
					const seeker = this.seekerElement;
					seeker.min = 0;
					seeker.max = element.duration;
					seeker.step = 0.1;
					this.pauseElement.classList.add('button--active');
				});
				element.addEventListener('timeupdate', event => {
					if (this.isSeeking === false) {
						this.seekerElement.value = element.currentTime;
					}
				});
				element.addEventListener('ended', event => {
					this.seekerElement.value = 0;
				});
				break;
			case 'seeker':
				element.addEventListener('input', ({ target }) => {
					this.isSeeking = true;
				});
				element.addEventListener('change', ({ target }) => {
					this.videoElement.currentTime = target.value;
					this.isSeeking = false;
				});
				break;
			case 'play':
				element.addEventListener('click', event => {
					this.play();
				});
				break;
			case 'pause':
				element.addEventListener('click', event => {
					this.pause();
				});
				break;
			case 'mute':
				element.addEventListener('click', event => {
					if (this.videoElement.volume === 0) {
						this.videoElement.volume = 1;
						element.classList.remove('button--active');
					} else {
						this.videoElement.volume = 0;
						element.classList.add('button--active');
					}
				});
				break;
		}

	}

	
};