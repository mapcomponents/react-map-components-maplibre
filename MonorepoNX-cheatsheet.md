# MapComponents Monorepo

## Sync `package.json` Files with Syncpack

Keep your dependencies consistent across your monorepo using [Syncpack](https://github.com/JamieMason/syncpack):

### List Mismatched Dependency Versions

```bash
  npx syncpack list-mismatches
```

### Automatically Fix Mismatched Versions

```bash
  npx syncpack fix-mismatches
```

## Use Depcheck to Find Unused Dependencies

Go to your package directory and run:

```sh
  npx depcheck --skip-missing
```

## Run Tasks

To run the dev server for your app, use:

```sh
  npx nx serve {package-name}
```

To create a production bundle:

```sh
  npx nx build {package-name}
```

To see all available targets to run for a project, run:

```sh
  npx nx show project {package-name}
```

To run any task from any package, run:

```sh
  npx nx run {package-name}:{task-name}
```

Alternatively, you can also use:

```sh
  npx nx {task-name} {package-name}
```

To run all tasks in parallel, use:

```sh
  npx nx run-many --target={task-name} --all
```

## Add New Projects


To generate a new application, use:

```sh
  npx nx g @nx/react:application --directory=apps/my-app --name=my-app --no-interactive --e2eTestRunner=none
```

To generate a new library, use:

```sh
  npx nx g @nx/react:library --directory=packages/my-package --bundler=vite --name=my-package --importPath=@mapcomponents/my-package --no-interactive
```

Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to use the generator form.

Nx uses `project.json` for its own configuration—keep its name simple, like `my-app`.
For publishing, you need a `package.json` with the full package name, e.g., `@mapcomponents/my-app`.
Both files are needed, but serve different purposes.

## Import from Other Packages in This Monorepo

Instead of using relative paths to import from other packages in this monorepo, you can use the package name as an alias.
Ensure that Nx added the alias correctly to the `tsconfig.base.json` file.

It should look like this:

```json
{
	"compilerOptions": {
		"paths": {
			"@mapcomponents/deck-gl": ["packages/deck-gl/src/index.ts"],
			"@mapcomponents/ra-geospatial": ["packages/ra-geospatial/src/index.ts"],
			"@mapcomponents/{app/package name}": ["path/{app/package name}/src/index.ts"]
		}
	}
}
```

Also, don't forget to set the type to `module` in the `package.json` of the package you want to import from:

```json
{
	"name": "@mapcomponents/{app/package name}",
	"version": "0.0.1",
	"type": "module",
	"...": "..."
}
```

Then, you can import from other packages like this:

```ts
import { component } from '@mapcomponents/{app/package name}';
```

You also need to ensure that the `tsconfig.package/app.json` file in the current package includes the other package.
Example:

```json
{
	// rest of the tsconfig.package/app.json
	"include": ["src/**/*", "../path/to/package/src/**/*"]
}
```

## Add Storybook to an existing project

```sh
  npx nx g @nx/react:storybook-configuration --project=my-package --generateStories=false --interactionTests=false --no-interactive
```

## Storybook Composition: How to Use It

Add a `refs` object to the `.storybook/main.ts` file in your host Storybook and add the links for the composed Storybooks.
You can adjust the composition based on the current development environment (e.g., development, production) as in the following example:

```ts
{
	refs: (config, { configType }) => {
		if (configType === 'DEVELOPMENT') {
			return {
				'react-maplibre': {
					title: 'React MapLibreMap',
					url: 'http://localhost:4400',
				},
				'deck-gl': {
					title: 'Deck.gl',
					url: 'http://localhost:4401',
				},
				'ra-geospatial': {
					title: 'Ra Geospatial',
					url: 'http://localhost:4402',
				},
			};
		}
		return {
			'react-maplibre': {
				title: 'React MapLibreMap',
				url: 'https://mapcomponents.github.io/react-map-components-maplibre/',
			},
			'deck-gl': {
				title: 'Deck.gl',
				url: 'https://mapcomponents.github.io/mapcomponents/deck-gl/',
			},
			'ra-geospatial': {
				title: 'React Admin Geospatial',
				url: 'https://mapcomponents.github.io/mapcomponents/ra-geospatial/',
			},
		};
	};
}
```

It is necessary to statically set a different port for each project in the `project.json` file of the respective project.

You need to statically set a different port for each project in the `project.json` file of the respective project.

```json
{
	"targets": {
		"storybook": {
			"options": {
				"port": 4401 // set a different port than for the other projects
			}
		}
	}
}
```

### Run the Local Storybook Composition

This is the command to run all the Storybooks in composition mode locally and in parallel:

```shell
  npx nx run storybook-composition:storybook-composition
```

Then, in a new terminal, run:

```shell
  npx nx run storybook-composition:storybook
```

If a new Storybook is added, make sure to add it to the run command in the `project.json` under `apps/storybook-composition/targets/storybook-composition/options/commands`.

This is how it should look:

```json
{
	"targets": {
		"storybook-composition": {
			"executor": "nx:run-commands",
			"options": {
				"commands": [
					"nx storybook deck-gl",
					"nx storybook ra-geospatial",
					"nx storybook my-new-storybook" // <--- Add new Storybooks here
				],
				"parallel": true
			}
		}
	}
}
```

## Add Cypress Component Testing to an Existing Project

Before running the command, go to the `project.json` and add the following to the `"targets"` parameter:

```json
{
	"targets": {
		"build": {
			"executor": "@nx/vite:build",
			"options": {
				"outputPath": "dist/packages/my-package"
			}
		}
	}
}
```

```sh
  npx nx g @nx/react:cypress-component-configuration --project=my-package --build-target=my-package:build --no-interactive
```

## Increase Version and Publish

Before publishing change the out dir in the build setting of the `vite.config.js` to `dist`

```
{
	// rest of the vite.config.js
	"build": {
		"outDir": "dist" 
	}
	// rest of the vite.config.js`
}
```

Make sure not to forget this flag: `--skip-publish`

```sh
  npx nx release --skip-publish
```
### *Don't forget to Push the automatically commited tag*
Make sure to replace "This was a version bump only, there were no code changes." with the relevant changes in the `CHANGELOG.md`.
