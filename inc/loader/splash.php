<?php
/**
 * Theme:				
 * Template:			splash.php
 * Description:			Splash screen for loading of page, uses inline styles to load extremely fast
 */

/**
 * Animation duration in milliseconds.
 */
$transition_duration = 1000;

/**
 * Time before splash is forced away in milliseconds.
 */
$timeout = 4000;

?>

<div id="splash">

	<style>

		#splash {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #000000;
			opacity: 1;
			visibility: visible;
			transition: opacity <?php echo $transition_duration; ?>ms ease-in-out, transform <?php echo $transition_duration; ?>ms ease-in-out, visibility <?php echo $transition_duration; ?>ms ease-in-out;
			z-index: 99;
		}

		body.page-ready #splash {
			opacity: 0;
			visibility: hidden;
		}

		html.no-js #splash {
			display: none;
		}

		.splash-inner {
			display: grid;
			height: 100%;
		}

		.splash-logo {
			display: block;
			width: 25em;
			width: clamp(16em, 40vw, 30em);
			margin: auto;
		}

		.splash-logo text {
			font-family: 'Ailerons';
			font-size: 72px;
			fill: #ffffff;
		}

		.splash-logo rect,
		.splash-logo polyline {
			stroke-width: 6;
		}

		.splash-logo rect,
		.splash-logo .step-one,
		.splash-logo .step-two,
		.splash-logo .step-three {
			animation-fill-mode: forwards;
			animation-timing-function: cubic-bezier(0.42, 0, 0.12, 0.97);
		}

		.splash-logo rect {
			/* stroke: #CB8037; */
			stroke: #FF9936;
			stroke-dasharray: 148px;
			stroke-dashoffset: 148px;
			animation-name: rect-in;
			animation-delay: 500ms;
			animation-duration: 750ms;
		}

		.splash-logo .panel-small-1 {
			/* stroke: #4D2BA8; */
			stroke: #5D28EA;
		}

		.splash-logo .panel-small-2 {
			/* stroke: #742828; */
			stroke: #B01717;
		}

		.splash-logo .panel-small-3 {
			/* stroke: #B04A51; */
			stroke: #E75761;
		}

		.splash-logo .step-one,
		.splash-logo .step-two,
		.splash-logo .step-three {
			animation-name: polyline-in;
			animation-duration: 500ms;
			transform: translate3d(-23px, 0, 0);
			opacity: 0;
		}

		.splash-logo .step-one {
			animation-delay: 1200ms;
		}

		.splash-logo .step-two {
			animation-delay: 1400ms;
		}

		.splash-logo .step-three {
			animation-delay: 1600ms;
		}

		.splash-logo .word-one,
		.splash-logo .word-two {
			animation-name: text-in;
			animation-duration: 2500ms;
			animation-fill-mode: forwards;
			animation-timing-function: cubic-bezier(0.42, 0, 0.12, 0.97);
			opacity: 0;
		}

		.splash-logo .word-one {
			animation-delay: 1700ms;
		}

		.splash-logo .word-two {
			animation-delay: 2000ms;
		}

		@keyframes rect-in {

			from {
				stroke-dashoffset: 148px;
			}

			to {
				stroke-dashoffset: 0px;
			}

		}

		@keyframes polyline-in {

			from {
				opacity: 1;
				transform: translate3d(-23px, 0, 0);
			}

			to {
				opacity: 1;
				transform: translate3d(0, 0, 0);
			}

		}

		@keyframes text-in {
  
			from {
				opacity: 0;
			}
			
			to {
				opacity: 1;
			}
		
		}

	</style>

	<div class="splash-inner">
		<div class="splash-logo">

			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 391 162">
				<g fill-rule="evenodd">
					<text>
						<tspan class="word-one" x="0" y="72">KOLKSLUIS</tspan> 
						<tspan id="animation-trigger" class="word-two" x="167" y="153"> SOLAR</tspan>
					</text>
					<g class="shapes" transform="translate(15 102)">
						<g class="panels" transform="translate(36)">
							<g class="step-one">
								<g class="step-two">
									<g class="step-three">
										<polyline class="panel-small-1" points="45.5275591 0 59 0 59 48 45.5275591 48"/>          
									</g>
									<polyline class="panel-small-2" points="22.7637795 0 36.2362205 0 36.2362205 48 22.7637795 48"/>
								</g>
								<polyline class="panel-small-3" points="0 0 13.4724409 0 13.4724409 48 0 48"/>
							</g>
						</g>
						<rect width="26" height="48" x="0.4231"/>
					</g>
				</g>
			</svg>

		</div>
	</div>

	<script>

	/**
	 * pageReadyClass
	 * @type    {string}
	 */
	const pageReadyClass = 'page-ready';

	/**
	 * pageLoad
	 * 
	 * Promise that resolves whenever the load event on the window
	 * has been fired.
	 */
	const pageLoad = new Promise(resolve => {
	    window.addEventListener('load', resolve, { once: true });
	}).then(() => {
		console.log('page loaded');
	});

	/**
	 * animationEnd
	 * 
	 * Promise that resolves whenever the last element that is 
	 * animated has finished its animation.
	 */
	const animationEnd = new Promise(resolve => {
		const animationTrigger = document.getElementById('animation-trigger');
		animationTrigger.addEventListener('animationend', resolve, { once: true });
	}).then(() => {
		console.log('animation done');
	});

	/**
	 * Wait for page to load and animations to finish.
	 * Then set a ready class on the body and remove the splash from the DOM.
	 */
	Promise.all([pageLoad, animationEnd]).then(() => {
		const splash = document.getElementById('splash');
		document.body.classList.add(pageReadyClass);
		setTimeout(() => {	
			splash.remove();
		}, <?php echo $transition_duration; ?>);
	});

	</script>

</div>
