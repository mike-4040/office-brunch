nvm is not compatible with the "NPM_CONFIG_PREFIX" environment variable: currently set to "/Users/drewsov/.npm-global"
Run `unset NPM_CONFIG_PREFIX` to unset it.

The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
Andreys-MBP:office-brunch drewsov$ git checkout -b helper
M       utils/_helpers.js
Switched to a new branch 'helper'
Andreys-MBP:office-brunch drewsov$ git checkout -b helper
fatal: A branch named 'helper' already exists.
Andreys-MBP:office-brunch drewsov$ git brunch
git: 'brunch' is not a git command. See 'git --help'.

The most similar command is
        branch
Andreys-MBP:office-brunch drewsov$ git branch
* helper
  staging 
Andreys-MBP:office-brunch drewsov$ git add .
Andreys-MBP:office-brunch drewsov$ git commit
hint: Waiting for your editor to close the file... 
[1]+  Stopped                 git commit
Andreys-MBP:office-brunch drewsov$ git commit -m "start helper"
[helper 8f79ccd] start helper
 3 files changed, 31 insertions(+)
 create mode 100644 .vscode/tasks.json
 create mode 100644 Read.me
Andreys-MBP:office-brunch drewsov$ git push origin helper
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 16 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (7/7), 1.01 KiB | 1.01 MiB/s, done.
Total 7 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
remote: 
remote: Create a pull request for 'helper' on GitHub by visiting:
remote:      https://github.com/mike-4040/office-brunch/pull/new/helper
remote: 
To https://github.com/mike-4040/office-brunch.git
 * [new branch]      helper -> helper
Andreys-MBP:office-brunch drewsov$ 


1. git add .
2. git commit -m "helper update"
3. git push 


## Git 
setting.json

{
 "git.enabled": true,
}