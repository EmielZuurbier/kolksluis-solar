<?php
/**
 * hero.php
 */

?>

<header class="hero hero--front-page">
	<figure class="hero__thumbnail">
		<img class="image image--cover" src="<?php the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>"/>
	</figure>
	<div class="hero__container">
		<div class="hero__content">
			<h4>Dit is</h4>
			<h1 class="title title--hero">Kolksluis</span> <span>Solar</span></h1>
			<p><em>Een project van de familie Zuurbier:</em> <br>
			Eén van de eerste particuliere zonneparken in Noord-Holland.</p>
		</div>
		<div class="tooltip tooltip--hero">
			<a href="#" class="tooltip__icon" aria-describedby="tooltip">i</a>
			<span id="tooltip" class="tooltip__info" role="tooltip">
				<p>Dit is een stockfoto en is niet per definitie een indicatie hoe het zonnepark van Kolksluis Solar eruit komt te zien.</p>
			</span>
		</div>
	</div>
</header>