// Rebuilds the "What I've built" section in README.md from the portfolio's projects.json.
// Run by .github/workflows/update-readme.yml and by the local sync script; zero dependencies.
//   PROJECTS_FILE=path/to/projects.json  read a local file instead of the network
//   PROJECTS_URL=https://...             read from another URL
import { readFileSync, writeFileSync } from 'node:fs';

const PORTFOLIO = 'https://tveittheghost.github.io/';
// The GitHub API serves the file straight from the repo, so a fresh push shows up
// immediately (the Pages site and raw.githubusercontent.com can lag for minutes).
const DEFAULT_URL = 'https://api.github.com/repos/TveitTheGhost/TveitTheGhost.github.io/contents/projects.json';
const README = new URL('../README.md', import.meta.url);
const START = /<!-- PROJECTS:START[^>]*-->/;
const END = '<!-- PROJECTS:END -->';
const NEW_FOR_DAYS = 14;

const CATEGORY_LABELS = [
  ['security', '🔐', 'security tool'],
  ['ai', '🤖', 'AI app'],
  ['app', '🌐', 'web app'],
  ['cli', '⌨️', 'CLI'],
  ['game', '🎮', 'game'],
];

// Keep table cells on one line and stop text from breaking out of its cell.
const cell = (text) => String(text ?? '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const formatDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function isNew(project, today) {
  if (!project.added) return false;
  const days = (Date.parse(today) - Date.parse(project.added)) / 86400000;
  return days >= 0 && days <= NEW_FOR_DAYS;
}

function buildSection(projects, today) {
  const sorted = [...projects].sort((a, b) => (b.updated ?? '').localeCompare(a.updated ?? ''));
  const totalTests = projects.reduce((sum, p) => sum + (p.tests ?? 0), 0);
  const breakdown = CATEGORY_LABELS
    .map(([key, emoji, word]) => [emoji, word, projects.filter((p) => p.categories?.includes(key)).length])
    .filter(([, , n]) => n > 0)
    .map(([emoji, word, n]) => `${emoji} ${plural(n, word)}`)
    .join(' · ');

  const newest = [...projects].sort((a, b) => (b.added ?? '').localeCompare(a.added ?? ''))[0];
  const lastUpdate = sorted[0]?.updated;

  const rows = sorted.map((p) => {
    const title = p.private ? `**${cell(p.name)}**` : `**[${cell(p.name)}](${p.repo})**`;
    const badge = isNew(p, today) ? ' 🆕' : '';
    const live = p.live ? ` **[Try it →](${p.live})**` : '';
    return `| ${cell(p.emoji)} | ${title}${badge} | ${cell(p.description)}${live} | ${cell(p.builtWith ?? (p.tags ?? []).join(' · '))} |`;
  });

  return [
    `**${plural(projects.length, 'project')}** · **${totalTests} automated tests** · all hand-built, no frameworks`,
    '',
    breakdown,
    '',
    newest ? `> 🆕 **Latest:** ${cell(newest.emoji)} **${cell(newest.name)}**: ${cell(newest.description)}` : '',
    '',
    '| | Project | What it does | Built with |',
    '| :-: | --- | --- | --- |',
    ...rows,
    `| 👻 | **[Portfolio](${PORTFOLIO})** | My personal site showing all of the above. **[Visit it live →](${PORTFOLIO})** | HTML · CSS · JavaScript |`,
    '',
    lastUpdate ? `<sub>Last project update: ${formatDate(lastUpdate)}</sub>` : '',
  ].filter((line, i, all) => !(line === '' && all[i - 1] === '')).join('\n');
}

function replaceSection(readme, section) {
  const start = readme.match(START);
  const endIndex = readme.indexOf(END);
  if (!start || endIndex === -1 || endIndex < start.index) {
    throw new Error('README is missing the PROJECTS:START / PROJECTS:END markers.');
  }
  const head = readme.slice(0, start.index + start[0].length);
  return `${head}\n${section}\n${readme.slice(endIndex)}`;
}

async function loadProjects() {
  if (process.env.PROJECTS_FILE) return JSON.parse(readFileSync(process.env.PROJECTS_FILE, 'utf8'));
  const url = process.env.PROJECTS_URL ?? DEFAULT_URL;
  const headers = { Accept: 'application/vnd.github.raw+json', 'User-Agent': 'profile-readme-updater' };
  if (process.env.GITHUB_TOKEN && url.startsWith('https://api.github.com/')) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Fetching ${url} failed: HTTP ${res.status}`);
  return res.json();
}

async function main() {
  const projects = await loadProjects();
  if (!Array.isArray(projects) || projects.length === 0) throw new Error('projects.json is empty or not a list.');

  const today = process.env.TODAY ?? new Date().toISOString().slice(0, 10);
  const before = readFileSync(README, 'utf8');
  const after = replaceSection(before, buildSection(projects, today));
  if (after === before) {
    console.log('Project table is already up to date.');
    return;
  }
  writeFileSync(README, after);
  console.log(`Updated the project table (${projects.length} projects).`);
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
});
