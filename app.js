document.addEventListener('DOMContentLoaded', () => {
	// -----------------------------
	// Configuration - edit these
	// -----------------------------
	const GITHUB_USERNAME = 'BeatrizCordazzo';
	const GITHUB_REPO_URL = 'https://github.com/BeatrizCordazzo/BeatrizCordazzo.github.io';
	const CV_PDF_URL = './documents/Cv_En.pdf';

	const container = document.getElementById('github-repos');
	const downloadBtn = document.getElementById('download-cv');
	const repoLink = document.getElementById('portfolio-repo-link');

	if (downloadBtn) {
		downloadBtn.href = CV_PDF_URL;
		downloadBtn.setAttribute('download', 'Beatriz_Moreira_Cordazzo_CV.pdf');
	}
	if (repoLink) repoLink.href = GITHUB_REPO_URL;

	if (!container) return;

	// Fetch only the selected repositories (preserves the order in the array)
	const SELECTED_REPOS = [
		'ModerniWeb',
		'Angular_Bootstrap',
		'ReservasProyecto',
		'APPMVC',
		'Reservas',
		'ProyectoAngular',
		'gymProyecto',
		'TiendaDiscos'
	];

	async function fetchSelectedRepos(owner, repoNames) {
		try {
			const promises = repoNames.map(name =>
				fetch(`https://api.github.com/repos/${owner}/${name}`).then(res => res.ok ? res.json() : null).catch(() => null)
			);
			const results = await Promise.all(promises);
			const repos = results.filter(r => r !== null);
			if (repos.length === 0) {
				container.innerHTML = '<div class="col-12"><p class="text-muted">No selected repositories could be loaded.</p></div>';
				return;
			}
			renderRepos(repos);
		} catch (err) {
			container.innerHTML = `<div class="col-12"><p class="text-danger">Unable to load repositories. Check network or repository visibility.</p></div>`;
			console.error(err);
		}
	}

	function renderRepos(repos) {
		// Build a lookup from repo name -> repo data
		const repoMap = {};
		(repos || []).forEach(r => { if (r && r.name) repoMap[r.name] = r; });

		// Preserve the requested order using SELECTED_REPOS
		const html = SELECTED_REPOS.map(name => {
			const repo = repoMap[name];
			if (!repo) {
				return `
					<div class="col-md-6 col-lg-4">
						<div class="card repo-card">
							<div class="card-body">
								<h5 class="card-title">${escapeHtml(name)}</h5>
								<p class="text-muted small">Repository not found or private.</p>
								<a class="btn btn-sm btn-outline-secondary mt-2" href="https://github.com/${GITHUB_USERNAME}/${encodeURIComponent(name)}" target="_blank" rel="noreferrer">View on GitHub</a>
							</div>
						</div>
					</div>
				`;
			}

			return `
				<div class="col-md-6 col-lg-4">
					<div class="card repo-card h-100">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title"><a href="${repo.html_url}" target="_blank" rel="noreferrer">${escapeHtml(repo.name)}</a></h5>
							<p class="card-text small text-muted mb-2">${repo.description ? escapeHtml(repo.description) : ''}</p>

							<ul class="list-inline mt-auto mb-2">
								<li class="list-inline-item repo-meta">${repo.language || '—'}</li>
								<li class="list-inline-item repo-meta">★ ${repo.stargazers_count}</li>
								<li class="list-inline-item repo-meta">Forks: ${repo.forks_count}</li>
							</ul>

							<div class="mt-2">
								<a class="btn btn-sm btn-primary me-2" href="${repo.html_url}" target="_blank" rel="noreferrer">View Repo</a>
								${repo.homepage ? `<a class="btn btn-sm btn-outline-success" href="${repo.homepage}" target="_blank" rel="noreferrer">Live Site</a>` : ''}
							</div>

							<p class="text-muted small mt-3">Updated ${new Date(repo.updated_at).toLocaleDateString()}</p>
						</div>
					</div>
				</div>
			`;
		}).join('');

		container.innerHTML = html;
	}

	function escapeHtml(text){
		return text ? text.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])) : '';
	}

	// Kick off fetch for the specific repositories
	if (GITHUB_USERNAME) {
		fetchSelectedRepos(GITHUB_USERNAME, SELECTED_REPOS);
	} else {
		container.innerHTML = '<div class="col-12"><p class="text-muted">Set your GitHub username in <code>app.js</code> to load repos.</p></div>';
	}
});
