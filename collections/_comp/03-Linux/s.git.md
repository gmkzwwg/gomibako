---
category: Sheet
title: git - Quick Reference and Minimal Tutorial
tags: Linux
---

A useful and brief Git cheatsheet.


<table style="table-layout:fixed;">
  <tr>
    <th colspan="2">1.Initialization</th>
  </tr>
  <tr>
    <td>Init a local repo</td>
    <td>git init</td>
  </tr>
  <tr>
    <td>Associate it with a Github repo</td>
    <td>git remote add origin &lt;url&gt;</td>
  </tr>
  <tr>
    <td>Change the URL</td>
    <td>git remote set-url origin &lt;url&gt;</td>
  </tr>
  <tr>
    <td>Download a remote repo</td>
    <td>git clone &lt;url&gt; &lt;path&gt;</td>
  </tr>
  <tr>
    <td>Check the URL</td>
    <td>git remote -v</td>
  </tr>
  <tr>
    <td colspan="2">2.Update</td>
  </tr>
  <tr>
    <td>Track all changes</td>
    <td>git add .</td>
  </tr>
  <tr>
    <td>Delete files</td>
    <td>git rm &lt;filename&gt;</td>
  </tr>
  <tr>
    <td>Commit all untracked changes</td>
    <td>git commit -am &lt;commit message&gt;</td>
  </tr>
  <tr>
    <td>Push to remote repo</td>
    <td>git push origin &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td>Update to local repo</td>
    <td>git pull</td>
  </tr>
  <tr>
    <td colspan="2">3.Branch Management</td>
  </tr>
  <tr>
    <td>Create a branch</td>
    <td>git branch &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td>Switch to branch</td>
    <td>git checkout &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td>Create and switch to a branch</td>
    <td>git checkout -b &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td>Check all branches</td>
    <td>git branch</td>
  </tr>
  <tr>
    <td>Merge a branch back into the master branch</td>
    <td>git checkout master &amp;&amp; git merge &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td>Update a branch from remote repo</td>
    <td>git pull orgin &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td>Delete a local branch</td>
    <td>git branch -d &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td>Delete a remote branch</td>
    <td>git push origin --delete &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td colspan="2">4.Log and History</td>
  </tr>
  <tr>
    <td>See the commit history</td>
    <td>git log</td>
  </tr>
  <tr>
    <td>Show details of a specific commit</td>
    <td>git show &lt;commit id&gt;</td>
  </tr>
  <tr>
    <td>Show changes of a file in a specific commit</td>
    <td>git show &lt;commit id&gt; &lt;file name&gt;</td>
  </tr>
  <tr>
    <td>Checkout form a previous commit</td>
    <td>git checkout &lt;commit code&gt;</td>
  </tr>
  <tr>
    <td>Force pushing</td>
    <td>git push -f origin master</td>
  </tr>
  <tr>
    <td>Combine n local commits</td>
    <td>git rebase -i HEAD~&lt;n&gt;</td>
  </tr>
  <tr>
    <td>Change commit message</td>
    <td>git commit -amend</td>
  </tr>
  <tr>
    <td>Check changed files</td>
    <td>git status</td>
  </tr>
  <tr>
    <td>Compare changed files</td>
    <td>git diff --stat</td>
  </tr>
  <tr>
    <td colspan="2">5.Search in the repo</td>
  </tr>
  <tr>
    <td>Show the line number of the keyword</td>
    <td>git grep -n &lt;keyword&gt;</td>
  </tr>
  <tr>
    <td>Show the appearence number of the keyword</td>
    <td>git grep -c &lt;keyword&gt;</td>
  </tr>
  <tr>
    <td colspan="2">6.Rolling back</td>
  </tr>
  <tr>
    <td>Roll back to a commit locally</td>
    <td>git reset --hard &lt;commit-id&gt;</td>
  </tr>
  <tr>
    <td>Roll back to the last (n - 1) commit locally</td>
    <td>git reset --hard HEAD~&lt;n&gt;</td>
  </tr>
  <tr>
    <td rowspan="5">Roll back to a commit remotely <br>(a backup may be necessary.)</td>
    <td>git checkout &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td>git pull</td>
  </tr>
  <tr>
    <td>git reset --hard &lt;commit id&gt;</td>
  </tr>
  <tr>
    <td>git push origin --delete &lt;branch name&gt;</td>
  </tr>
  <tr>
    <td>git push origin &lt;branch name&gt;</td>
  </tr>
</table>

### Reset to a commit and push

```shell
git log
git reset --hard <commit-id>
git push origin HEAD:<name-of-remote-branch>
```