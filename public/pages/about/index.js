import styles from './style.module.css';

const About = ({ query }) => (
	<section class={styles.about}>
		<h1>Cóż to</h1>
		<p>22 września 2022 roku <a href="https://www.facebook.com/MemeidaObscura">Satuk Gamma</a> został zbanowany</p>
		<p>Tak się szczęśliwie złożyło, że raptem kilka dni wcześniej udało mi się zescrapować wszystkie jego posty.</p>
		<p>Czuję się jak B. Rosenberger Rosenberg:</p>
		<p>"Neurotic failed film critic B. Rosenberger Rosenberg stumbles upon what may be the greatest artistic
			achievement in human history: a three-month-long film, complete with scheduled sleeping, eating,
			and bathroom breaks, that took its reclusive auteur, a psychotic African-American man named Ingo Cutbirth,
			ninety years to complete. B makes it his mission to show it to the rest of humanity.
			The only problem: The film is destroyed when he stops for a soda, leaving just a single frame
			from which B must somehow attempt to recall the film that might just be
			the last great hope of civilization." (<a href="https://en.wikipedia.org/wiki/Antkind">Wikipedia</a>)</p>
		<p>Andrzej Głuszak</p>
	</section>
);

export default About;
