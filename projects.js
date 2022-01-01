const workContainer = document.getElementById('work');

const projectsData = [
	{ name: 'Audio Player' },
	{ name: 'Custom Video Player' },
	{ name: 'DOM Array Methods' },
	{ name: 'Exchange Rates' },
	{ name: 'Expense Tracker' },
	{ name: 'Form Validation' },
	{ name: 'Hangman' },
	{ name: 'Modal Menu Slider' },
	{ name: 'Movie Seat Booking' },
	{ name: 'Recipe Finder' },
	{ name: 'Typing Game' },
];

const githubRepoBaseUrl = `https://github.com/Pika-Pool/pika-pool.github.io/tree/main`;

workContainer.innerHTML = projectsData
	.map(({ name: projectName }) => {
		const repoLink = encodeURI(`${githubRepoBaseUrl}/${projectName}`);

		return `<div class="project" data-name="${projectName}">
	<img src="./images/ss/${projectName}.webp" alt="${projectName}"
		title="${projectName}" />
	<div class="info">
		<h5>${projectName}</h5>
		<div class="links">
			<a href="/${projectName}/index.html">Live Demo</a>
			<a href="${repoLink}">
				<img src="./images/GitHub-Mark-Light-32px.png" alt="github link"
					title="github link" />
			</a>
		</div>
	</div>
</div>
`;
	})
	.join('\n');
