const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const packageRoot = path.join(root, 'packages/react-maplibre');
const templateRoot = path.join(root, 'apps/template');
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mapcomponents-package-smoke-'));
const appRoot = path.join(tempRoot, 'consumer');

function run(command, args, cwd, options = {}) {
	const result = spawnSync(command, args, {
		cwd,
		encoding: 'utf8',
		stdio: options.capture ? 'pipe' : 'inherit',
		env: { ...process.env, ...options.env },
	});

	if (result.error) throw result.error;
	if (result.status !== 0) {
		if (options.capture) process.stderr.write(result.stderr);
		throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`);
	}

	return result.stdout;
}

function write(file, contents) {
	const filePath = path.join(appRoot, file);
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, contents);
}

function getFreePort() {
	return new Promise((resolve, reject) => {
		const server = net.createServer();
		server.once('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			server.close((error) => {
				if (error) reject(error);
				else resolve(address.port);
			});
		});
	});
}

function waitForServer(url, child) {
	return new Promise((resolve, reject) => {
		const deadline = Date.now() + 60_000;

		const check = () => {
			if (child.exitCode !== null) {
				reject(new Error(`Preview server exited with code ${child.exitCode}`));
				return;
			}
			if (Date.now() >= deadline) {
				reject(new Error(`Timed out waiting for ${url}`));
				return;
			}

			const request = http.get(url, (response) => {
				response.resume();
				if (response.statusCode >= 200 && response.statusCode < 400) resolve();
				else setTimeout(check, 250);
			});
			request.on('error', () => setTimeout(check, 250));
		};

		check();
	});
}

async function withServer(args, port) {
	const vite = path.join(appRoot, 'node_modules/vite/bin/vite.js');
	const child = spawn(
		process.execPath,
		[vite, ...args, '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
		{ cwd: appRoot, stdio: 'inherit' }
	);

	try {
		const url = `http://127.0.0.1:${port}`;
		await waitForServer(url, child);
		run(
			path.join(root, 'node_modules/.bin/cypress'),
			[
				'run',
				'--project',
				appRoot,
				'--config-file',
				path.join(appRoot, 'cypress.config.cjs'),
				'--browser',
				'electron',
			],
			root,
			{ env: { MAPCOMPONENTS_SMOKE_BASE_URL: url } }
		);
	} finally {
		if (child.exitCode === null) {
			child.kill('SIGTERM');
			await new Promise((resolve) => child.once('exit', resolve));
		}
	}
}

async function main() {
	try {
		fs.mkdirSync(appRoot);
		run('pnpm', ['exec', 'nx', 'run', 'react-maplibre:build'], root);

		const packed = run('npm', ['pack', '--json', '--pack-destination', tempRoot], packageRoot, {
			capture: true,
		});
		const tarballName = JSON.parse(packed)[0].filename;
		const tarballPath = path.join(tempRoot, tarballName);
		fs.cpSync(templateRoot, appRoot, {
			recursive: true,
			filter(source) {
				const parts = path.relative(templateRoot, source).split(path.sep);
				return !parts.some((part) => part === 'node_modules' || part === 'dist');
			},
		});

		const appManifestPath = path.join(appRoot, 'package.json');
		const appManifest = JSON.parse(fs.readFileSync(appManifestPath, 'utf8'));
		appManifest.dependencies['@mapcomponents/react-maplibre'] = `file:${tarballPath}`;
		fs.writeFileSync(appManifestPath, `${JSON.stringify(appManifest, null, 2)}\n`);

		const viteConfigPath = path.join(appRoot, 'vite.config.ts');
		const originalViteConfig = fs.readFileSync(viteConfigPath, 'utf8');
		const viteConfig = originalViteConfig
			.replace("cacheDir: '../../node_modules/.vite/apps/template',", "cacheDir: './node_modules/.vite',")
			.replace("outDir: '../../dist/apps/template',", "outDir: 'dist',");
		if (viteConfig === originalViteConfig) {
			throw new Error('Could not make the copied template Vite paths local to the temporary project');
		}
		fs.writeFileSync(viteConfigPath, viteConfig);

		const tsconfigPath = path.join(appRoot, 'tsconfig.json');
		const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
		tsconfig.include = ['src/**/*.ts', 'src/**/*.tsx'];
		delete tsconfig.references;
		fs.writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`);

		run('npm', ['install', '--no-audit', '--no-fund'], appRoot);

		write(
			'cypress.config.cjs',
			`module.exports = {
  video: false,
  e2e: {
    baseUrl: process.env.MAPCOMPONENTS_SMOKE_BASE_URL,
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl');
        }
        if (browser.name === 'electron') {
          launchOptions.preferences.webPreferences = {
            ...launchOptions.preferences.webPreferences,
            webgl: true,
          };
        }
        return launchOptions;
      });
    },
  },
};
`
		);
		write(
			'cypress/e2e/package-smoke.cy.js',
			`describe('installed package startup and assets', () => {
  it('starts the map without runtime errors and loads every local asset', () => {
    const assetResponses = [];
    cy.intercept({ url: '**', middleware: true }, (request) => {
      if (request.url === 'https://wms.wheregroup.com/tileserver/style/osm-bright.json') {
        request.alias = 'mapStyle';
        request.reply({
          statusCode: 200,
          headers: { 'access-control-allow-origin': '*' },
          body: {
            version: 8,
            sources: {},
            layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#fff' } }],
          },
        });
      } else if (new URL(request.url).origin === new URL(Cypress.config('baseUrl')).origin) {
        request.continue((response) => {
          assetResponses.push({ url: request.url, status: response.statusCode });
        });
      } else {
        request.continue();
      }
    });

    cy.visit('/', {
      onBeforeLoad(window) {
        window.__mapcomponentsRuntimeErrors = [];
        window.addEventListener('error', (event) => {
          window.__mapcomponentsRuntimeErrors.push(event.message || 'Resource load error');
        });
        window.addEventListener('unhandledrejection', (event) => {
          window.__mapcomponentsRuntimeErrors.push(String(event.reason));
        });
      },
    });

    cy.wait('@mapStyle').its('response.statusCode').should('equal', 200);
    cy.get('.maplibregl-canvas').should('be.visible');
    cy.window().its('_map').should('exist').then((map) => {
      expect(map.loaded()).to.equal(true);
    });
    cy.document().then((document) => {
      const mapLibreCssLoaded = Array.from(document.styleSheets).some((sheet) => {
        try {
          return Array.from(sheet.cssRules).some((rule) => rule.cssText.includes('.maplibregl-canvas'));
        } catch {
          return false;
        }
      });
      expect(mapLibreCssLoaded).to.equal(true);
    });
    cy.then(() => {
      expect(assetResponses).not.to.be.empty;
      expect(assetResponses.filter(({ status }) => status < 200 || status >= 400)).to.deep.equal([]);
    });
    cy.window().then((window) => {
      expect(window.__mapcomponentsRuntimeErrors).to.deep.equal([]);
    });
  });
});
`
		);

		run('npm', ['run', 'build'], appRoot);
		await withServer(['--mode', 'development'], await getFreePort());
		await withServer(['preview'], await getFreePort());
	} finally {
		fs.rmSync(tempRoot, { recursive: true, force: true });
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
