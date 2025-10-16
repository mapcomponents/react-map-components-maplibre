import { promises as fs } from 'fs';

interface PackageChanges {
	version: string;
	packageName: string;
	changes: string;
}

async function resolveChangeLog(): Promise<PackageChanges[]> {
	const finalChanges: PackageChanges[] = [];
	const data = await fs.readFile('CHANGELOG.md', 'utf-8');
	const formatedData: string = data;
	const splitByVersion: string[] = formatedData.split('[v');
	for (const versionEntry of splitByVersion) {
		if (versionEntry !== '') {
			const completeVersionEntry: string = '[v' + versionEntry;
			const changesInVersion: string[] | undefined =
				completeVersionEntry.split('## @mapcomponents/');
			const version: string = changesInVersion[0];
			if (changesInVersion) {
				const packageChangeList: string[] = changesInVersion.slice(1);
				for (const changesInPackage of packageChangeList) {
					const changesInPackageSplit = changesInPackage.split('\n');
					finalChanges.push({
						version,
						packageName: changesInPackageSplit[0],
						changes: changesInPackage.split(changesInPackageSplit[0])[1],
					});
				}
			}
		}
	}
	return finalChanges;
}

async function sortChanges(changeEntries: PackageChanges[]) {
	const sortedChangeEntries: { [key: string]: PackageChanges[] } = {};
	for (const changeEntry of changeEntries) {
		const packageName = changeEntry.packageName;
		if (packageName in sortedChangeEntries) {
			sortedChangeEntries[packageName].push(changeEntry);
		} else {
			sortedChangeEntries[packageName] = [changeEntry];
		}
	}
	return sortedChangeEntries;
}

async function findProject(packageName: string) {
	const apps = await fs.readdir('apps');
	const packages = await fs.readdir('packages');
	if (apps.includes(packageName)) return `apps/${packageName}/CHANGELOG.md`;
	if (packages.includes(packageName)) return `packages/${packageName}/CHANGELOG.md`;
	else return '';
}

async function writeChangelog(sortetEntries: { [key: string]: PackageChanges[] }) {
	for (const [key, value] of Object.entries(sortetEntries)) {
		const pathToChangeLog: string = await findProject(key);
		if (pathToChangeLog !== '') {
			await fs.writeFile(pathToChangeLog, '');
			for (const entry of value) {
				const trimmedVersion = entry.version.trim();
				if (trimmedVersion !== '') {
					await fs.appendFile(pathToChangeLog, '## ' + trimmedVersion);
				}
				for (const change of entry.changes.split('\n')) {
					if (change.match(/^##\s+/i)) continue;
					if (change.match(/^###\s+(added|fixed|removed|changed)/i))
						await fs.appendFile(pathToChangeLog, `${change}\n`);
					else await fs.appendFile(pathToChangeLog, change + '\n');
				}
			}
		}
	}
}

(async () => {
	const entries = await resolveChangeLog();
	const sortedEntries = await sortChanges(entries);
	await writeChangelog(sortedEntries);
})();
