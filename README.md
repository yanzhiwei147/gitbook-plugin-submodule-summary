# gitbook-plugin-submodule-summary[![Build Status](https://travis-ci.org/yanzhiwei147/gitbook-plugin-submodule-summary.svg?branch=master)](https://travis-ci.org/yanzhiwei147/gitbook-plugin-submodule-summary)
A gitbook plugin for merge git submodule summary.md.1. [Installation](#installation)2. [Usage](#usage)3. [Example](#example)## Installationbook.json```json{  "plugins": [    "submodule-summary"  ]}```and```shgitbook install```## Usage### General usage:

> Host Repo(HR): origin gitbook repo.
> Submodule Repo(SR): git submodule gitbook repo.

1. HR add a git submodule from SR.
2. Edit HR `SUMMARY.md`.
3. Enjoy it!

#### Add git submodule

```bash
git submodule add git@github.com/yourname/repo.git path/to/submodule
```

#### Edit `SUMMARY.md`

Edit the HR `SUMMARY.md`, replace specific location with the placeholder string `<!-- SUBMODULE-SUMMARY path/to/submodule/SUMMARY.md -->`

#### Build

Now you can build the gitbook, the HR `SUMMARY.md` contain pre-step string will replace with `path/to/submodule/SUMMARY.md` content.
## Tests    npm test## Contributing1. Fork it!2. Create your feature branch: `git checkout -b my-new-feature`3. Commit your changes: `git commit -am 'Add some feature'`4. Push to the branch: `git push origin my-new-feature`5. Submit a pull request :D## LicenseMIT