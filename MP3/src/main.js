import "./style.css";

const skills = {
  languages: ["JavaScript", "HTML", "CSS"],
  tools: ["VS Code", "Git", "GitHub"],
  technologies: ["Tailwind CSS", "APIs", "GitHub Pages"],
};

const projects = [
  {
    title: "API Explorer",
    description: "A client-side application that retrieves and displays public API data.",
    tech: ["JavaScript", "Tailwind", "API"],
    category: "JavaScript",
    url: "#",
  },
  {
    title: "Portfolio Website",
    description: "A professional portfolio built as a dynamic client-side application.",
    tech: ["JavaScript", "Tailwind", "GitHub Pages"],
    category: "JavaScript",
    url: "#",
  },
];

const state = {
  search: "",
  filter: "all",
  repos: [],
  githubStatus: "idle",
};

function createSkillPill(text) {
  const span = document.createElement("span");
  span.className =
    "rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200";
  span.textContent = text;
  return span;
}

function renderSkills() {
  const languageContainer = document.getElementById("skills-languages");
  const toolContainer = document.getElementById("skills-tools");
  const techContainer = document.getElementById("skills-technologies");

  languageContainer.innerHTML = "";
  toolContainer.innerHTML = "";
  techContainer.innerHTML = "";

  skills.languages.forEach((item) => languageContainer.appendChild(createSkillPill(item)));
  skills.tools.forEach((item) => toolContainer.appendChild(createSkillPill(item)));
  skills.technologies.forEach((item) => techContainer.appendChild(createSkillPill(item)));
}

function getFilteredProjects() {
  return projects.filter((project) => {
    const matchesFilter =
      state.filter === "all" || project.category.toLowerCase() === state.filter.toLowerCase();

    const searchText = `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase();
    const matchesSearch = searchText.includes(state.search.toLowerCase());

    return matchesFilter && matchesSearch;
  });
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  const filteredProjects = getFilteredProjects();

  if (filteredProjects.length === 0) {
    grid.innerHTML = `
      <div class="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
        No projects matched your current search or filter.
      </div>
    `;
    return;
  }

  filteredProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "rounded-3xl border border-white/10 bg-white/5 p-6";

    card.innerHTML = `
      <h3 class="mb-3 text-xl font-semibold">${project.title}</h3>
      <p class="mb-4 leading-7 text-slate-300">${project.description}</p>
      <div class="mb-5 flex flex-wrap gap-2">
        ${project.tech
          .map(
            (tech) =>
              `<span class="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">${tech}</span>`
          )
          .join("")}
      </div>
      <a class="font-medium text-cyan-300 transition hover:text-cyan-200" href="${project.url}">
        View Project
      </a>
    `;

    grid.appendChild(card);
  });
}

function renderGitHubStatus(message) {
  const status = document.getElementById("github-status");
  status.textContent = message;
}

function renderRepos() {
  const grid = document.getElementById("github-grid");
  grid.innerHTML = "";

  if (state.githubStatus === "loading") {
    renderGitHubStatus("Loading repositories...");
    return;
  }

  if (state.githubStatus === "error") {
    renderGitHubStatus("Could not load repositories. Please try again later.");
    return;
  }

  if (state.githubStatus === "success" && state.repos.length === 0) {
    renderGitHubStatus("No repositories were returned.");
    return;
  }

  if (state.githubStatus === "success") {
    renderGitHubStatus("Repositories loaded successfully.");
  }

  state.repos.forEach((repo) => {
    const card = document.createElement("article");
    card.className = "rounded-3xl border border-white/10 bg-white/5 p-6";

    card.innerHTML = `
      <h3 class="mb-3 text-xl font-semibold">${repo.name}</h3>
      <p class="mb-4 leading-7 text-slate-300">${repo.description ?? "No description provided."}</p>
      <p class="mb-4 text-sm text-slate-400">Language: ${repo.language ?? "Not specified"}</p>
      <a class="font-medium text-cyan-300 transition hover:text-cyan-200" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
        View Repository
      </a>
    `;

    grid.appendChild(card);
  });
}

async function loadRepos(username) {
  try {
    state.githubStatus = "loading";
    renderRepos();

    const response = await fetch(`https://api.github.com/users/${username}/repos`);

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const data = await response.json();

    state.repos = data.slice(0, 6);
    state.githubStatus = "success";
    renderRepos();
  } catch (error) {
    console.error(error);
    state.githubStatus = "error";
    renderRepos();
  }
}

function wireEvents() {
  const searchInput = document.getElementById("project-search");
  const filterAll = document.getElementById("filter-all");
  const filterJs = document.getElementById("filter-js");

  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderProjects();
  });

  filterAll.addEventListener("click", () => {
    state.filter = "all";
    renderProjects();
  });

  filterJs.addEventListener("click", () => {
    state.filter = "javascript";
    renderProjects();
  });
}

function init() {
  renderSkills();
  renderProjects();
  renderRepos();
  wireEvents();

  // Replace with your actual GitHub username
  loadRepos("your-github-username");
}

init();