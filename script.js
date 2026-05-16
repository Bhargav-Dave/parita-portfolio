const grid = document.querySelector("#project-grid");
const contentPanel = document.querySelector("#content-panel");
const aboutTemplate = document.querySelector("#about").outerHTML;
let projects = [];
let activeProjectId = null;

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) {
      throw new Error(`Unable to load projects: ${response.status}`);
    }
    projects = await response.json();
    renderProjectIndex(projects);
  } catch (error) {
    grid.innerHTML = `<p class="project-meta">Project data could not be loaded.</p>`;
    console.error(error);
  }
}

function renderProjectIndex(items) {
  grid.innerHTML = items
    .map((project, index) => {
      const activeClass = project.id === activeProjectId ? " is-active" : "";
      const isActive = project.id === activeProjectId;
      return `
        <button class="project-card${activeClass}" type="button" data-project-id="${project.id}" aria-pressed="${isActive}" aria-current="${isActive ? "true" : "false"}" aria-label="Open project: ${project.title}">
          <img src="${project.image}" alt="${project.alt}" loading="lazy">
          <span class="project-caption">
            <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
            <span>${project.title}</span>
          </span>
        </button>
      `;
    })
    .join("");
}

function showAbout() {
  activeProjectId = null;
  contentPanel.innerHTML = aboutTemplate;
  renderProjectIndex(projects);
  movePanelToTop();
}

function showProject(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  activeProjectId = project.id;
  renderProjectIndex(projects);
  contentPanel.innerHTML = `
    <article class="project-view" aria-labelledby="project-title">
      <button class="back-button" type="button" data-view="about" aria-label="Return to about and index view">Return to Index</button>
      <img class="project-hero" src="${project.image}" alt="${project.alt}">
      <header class="project-heading">
        <h2 id="project-title">${project.title}</h2>
        <p class="project-meta">${project.subtitle}</p>
      </header>
      <dl class="project-detail-list">
        <div>
          <dt>Year</dt>
          <dd>${project.year}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>${project.location}</dd>
        </div>
        <div>
          <dt>Type</dt>
          <dd>${project.category}</dd>
        </div>
      </dl>
      <div class="project-description">
        <p>${project.description}</p>
        <p>${project.credits}</p>
      </div>
    </article>
  `;
  movePanelToTop();
}

function movePanelToTop() {
  contentPanel.scrollTo({ top: 0, behavior: "smooth" });
  if (window.matchMedia("(max-width: 900px)").matches) {
    contentPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  contentPanel.focus({ preventScroll: true });
}

document.addEventListener("click", (event) => {
  const projectButton = event.target.closest("[data-project-id]");
  if (projectButton) {
    showProject(projectButton.dataset.projectId);
    return;
  }

  const viewButton = event.target.closest("[data-view='about']");
  if (viewButton) {
    event.preventDefault();
    showAbout();
  }
});

loadProjects();
