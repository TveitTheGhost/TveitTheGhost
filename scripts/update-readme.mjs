// Rebuilds the "What I've built" table in README.md from the portfolio's projects.json.
// Run by .github/workflows/update-readme.yml; zero dependencies (Node 18+ for fetch).
import { readFileSync, writeFileSync } from 'node:fs';

const PORTFOLIO = 'https://tveittheghost.github.io/';
const SOURCE = process.env.PROJECTS_URL ?? `${PORTFOLIO}projects.json`;
const README = new URL('../README.md', import.meta.url);
const START = /<!-- PROJECTS:START[^>]*-->/;
const END = '<!-- PROJECTS:END -->';

// Keep table cells on one line and stop text from breaking out of its cell.
const cell = (text) => String(text ?? '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();

function buildTable(projects) {
  const totalTests = projects.reduce((sum, p) => sum + (p.tests ?? 0), 0);
  const rows = projects.map((p) => {
    const name = p.private ? `**${cell(p.name)}**` : `**[${cell(p.name)}](${p.repo})**`;
    const live = p.live ? ` **[Try it →](${p.live})**` : '';
    return `| ${cell(p.emoji)} | ${name} | ${cell(p.description)}${live} | ${cell(p.builtWith ?? (p.tags ?? []).join(' · '))} |`;
  });
  return [
    `**${projects.length} projects** · **${totalTests} automated tests** · all hand-built, no frameworks`,
    '',
    '| | Project | What it does | Built with |',
    '| :-: | --- | --- | --- |',
    ...rows,
    `| 👻 | **[Portfolio](${PORTFOLIO})** | My personal site showing all of the above. **[Visit it live →](${PORTFOLIO})** | HTML · CSS · JavaScript |`,
  ].join('\n');
}

function replaceSection(readme, table) {
  const start = readme.match(START);
  const endIndex = readme.indexOf(END);
  if (!start || endIndex === -1 || endIndex < start.index) {
    throw new Error('README is missing the PROJECTS:START / PROJECTS:END markers.');
  }
  const head = readme.slice(0, start.index + start[0].length);
  return `${head}\n${table}\n${readme.slice(endIndex)}`;
}

async function main() {
  const res = await fetch(SOURCE, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Fetching ${SOURCE} failed: HTTP ${res.status}`);
  const projects = await res.json();
  if (!Array.isArray(projects) || projects.length === 0) throw new Error('projects.json is empty or not a list.');

  const before = readFileSync(README, 'utf8');
  const after = replaceSection(before, buildTable(projects));
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
