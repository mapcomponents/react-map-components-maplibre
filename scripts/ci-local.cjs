const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pnpmVersion = '12.18.0';
const skipInstall = process.argv.includes('--skip-install');
const unknownArgs = process.argv.slice(2).filter((arg) => arg !== '--' && arg !== '--skip-install');

if (unknownArgs.length > 0) {
	console.error(`Unknown option(s): ${unknownArgs.join(', ')}`);
	console.error('Supported option: --skip-install');
	process.exit(1);
}

function run(command, args, label, preservePaths = []) {
	console.log(`\n=== ${label} ===`);
	console.log(`$ ${command} ${args.join(' ')}`);

	const snapshots = preservePaths.map((relativePath) => {
		const filePath = path.join(root, relativePath);
		return {
			filePath,
			contents: fs.existsSync(filePath) ? fs.readFileSync(filePath) : null,
			mode: fs.existsSync(filePath) ? fs.statSync(filePath).mode : undefined,
		};
	});

	try {
		const result = spawnSync(command, args, {
			cwd: root,
			env: process.env,
			stdio: 'inherit',
		});

		if (result.error) {
			console.error(`Unable to start ${command}: ${result.error.message}`);
			process.exitCode = 1;
			return false;
		}

		if (result.status !== 0) {
			console.error(`${label} failed with ${result.signal || `exit code ${result.status}`}`);
			process.exitCode = result.status || 1;
			return false;
		}

		return true;
	} finally {
		for (const { filePath, contents, mode } of snapshots) {
			if (contents === null) {
				if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
				continue;
			}

			fs.writeFileSync(filePath, contents);
			fs.chmodSync(filePath, mode);
		}
	}
}

const version = spawnSync('pnpm', ['--version'], {
	cwd: root,
	encoding: 'utf8',
	stdio: ['ignore', 'pipe', 'inherit'],
});

if (version.error) throw version.error;
if (version.status !== 0) process.exit(version.status || 1);
if (version.stdout.trim() !== pnpmVersion) {
	console.error(
		`Expected pnpm ${pnpmVersion}, received ${version.stdout.trim() || 'no version output'}.`
	);
	process.exit(1);
}

console.log(`Node.js ${process.version}; pnpm ${pnpmVersion}`);
console.log(
	'Runs CI validation/build steps for the current Node.js version; no publishing or deployment.'
);
console.log('Dependency installation uses the official npm registry.');
console.log('Cypress steps use Chrome, and catalogue metadata validation requires network access.');
console.log('Catalogue metadata validation output is restored to its pre-run state.');
if (skipInstall)
	console.log(
		'Skipping package installation; existing node_modules must match the frozen lockfile.'
	);

const steps = [
	[
		skipInstall
			? 'Frozen lockfile and supply-chain policy'
			: 'Frozen install and supply-chain policy',
		'pnpm',
		skipInstall
			? ['install', '--frozen-lockfile', '--lockfile-only', '--registry=https://registry.npmjs.org']
			: ['install', '--frozen-lockfile', '--registry=https://registry.npmjs.org'],
	],
	[
		'Unit and component tests',
		'pnpm',
		[
			'exec',
			'nx',
			'run-many',
			'-t',
			'test:noninteractive',
			'--all',
			'--skip-nx-cache',
			'--verbose',
		],
	],
	[
		'Lint',
		'pnpm',
		['exec', 'nx', 'run-many', '--target=lint', '--all', '--exclude', 'docs', '--verbose'],
	],
	['Formatting', 'pnpm', ['run', 'prettier:check']],
	[
		'Cypress component tests',
		'pnpm',
		[
			'exec',
			'nx',
			'run-many',
			'-t',
			'component-test',
			'--parallel=false',
			'--verbose',
			'--browser=chrome',
		],
	],
	['Installed-package smoke test', 'node', ['scripts/package-smoke-test.cjs']],
	[
		'Workspace builds',
		'pnpm',
		[
			'exec',
			'nx',
			'run-many',
			'-t',
			'build',
			'--all',
			'--exclude=storybook-composition,docs',
			'--verbose',
		],
	],
	[
		'Catalogue metadata validation',
		'pnpm',
		['exec', 'nx', 'run-many', '-t', 'build-catalogue-meta', '--verbose'],
		[
			'packages/deck-gl/public/catalogue/mc_meta.json',
			'packages/react-maplibre/public/catalogue/mc_meta.json',
			'packages/three/public/catalogue/mc_meta.json',
		],
	],
	[
		'Storybook builds',
		'pnpm',
		['exec', 'nx', 'run-many', '-t', 'build-storybook', '--all', '--exclude', 'docs', '--verbose'],
	],
	['Developer manual build', 'pnpm', ['exec', 'nx', 'run', 'developer-manual:build']],
];

for (const [label, command, args, preservePaths = []] of steps) {
	if (!run(command, args, label, preservePaths)) process.exit(process.exitCode);
}

console.log('\nAll local CI validation and build steps passed.');
