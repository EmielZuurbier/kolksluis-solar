<?php
/**
 * Theme:				
 * Template:			splash.php
 * Description:			Splash screen for loading of page, uses inline styles to load extremely fast
 */

/**
 * Animation duration in milliseconds.
 */
$transition_duration = 350;

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
            opacity: 1;
            visibility: visible;
            transition: opacity <?php echo $transition_duration; ?>ms <?php echo $transition_duration; ?>ms ease-in-out, transform <?php echo $transition_duration; ?>ms ease-in-out, visibility <?php echo $transition_duration; ?>ms <?php echo $transition_duration; ?>ms ease-in-out;
            z-index: 99;
        }

        body.page-ready #splash {
            opacity: 0;
            visibility: hidden;
        }

        html.no-js #splash {
            display: none;
        }

    </style>

    <script>

    /**
     * Timeout
     */
    let timeout = null;

    /**
     * pageReadyClass
     * @type    {String}
     */
    const pageReadyClass = 'page-ready';

    /**
     * pageReady
     * 
     * Add a ready class to the page.
     * This will make the splashscreen
     * disappear.
     * 
     * @since   1.0
     * @returns void
     */
    const pageReady = function pageReady() {
        document.body.classList.add(pageReadyClass);
        setTimeout(function() {
            document.body.removeChild(document.getElementById('splash'));
            if (timeout) clearTimeout(timeout);
        }, <?php echo $transition_duration; ?>);
    };

    /**
     * Add load event
     */
    window.addEventListener('load', pageReady);

    /**
     * Remove the splash after 4 seconds - fallback
     */
    timeout = setTimeout(function() {
        pageReady();
        window.removeEventListener('load', pageReady);
    }, <?php echo $timeout; ?>);

    </script>

    <div class="splash-inner"></div>
</div>
