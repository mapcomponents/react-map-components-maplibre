## How to write the root changelog

**You only need to change the root changelog. There is a script that will migrate all changes from
the root changelog to each package or app. Here are some rules you should follow to ensure the
migration
process works.**

## 1. Release first:

Before you change the changelog, create a release with this command: `npx nx release --skip-publish`
Nx will write the latest commits in the root changelog. **Check if all commits are listed and
don't forget to push and push the tags! If the new entry does not follow the rules below, the
migration process will not work.**

## 2. Version label format: [vX.X.X] e.g. [v1.6.0]

## 3. Sort changes by package

List all changes under the package they relate to. **Always write the
relevant package label like this: @mapcomponents/{package/app name}. If a change is made at the root
or
is not assignable, write @mapcomponents/root.
Its important that the package/app name is equal to the folder name the package/app is in!**

## 4. Only use the following keywords to categorize your changes

- Added
- Fixed
- Changed
- Removed

**Always write a headline for a category when there is a commit for it. Use '##' for the category
headline.**

## 5. Commit message

To keep it organized, the commit message is split into three parts:

1. The first seven digits of the commit ID
2. The relevant category, written in the **imperative**
3. The commit message

### Example

```markdown
- 1234567: add example of 5.Commit message to HowToChangelog.md
```

## 6. Start Migration
If everything is listed in the root changelog, you are ready to run the following command:

```shell
  pnpm migrate-changelog
```
