---
category: Sheet
title: find - Quick Reference and Minimal Tutorial
tags: Linux
---

<table>
  <tr>
    <td>Search for file ending .conf</td>
    <td>find /etc/ -name *.conf</td>
  </tr>
  <tr>
    <td>Find files modified between 10 to 7 days ago</td>
    <td>find /etc/ -mmin +10 -mtime +7d</td>
  </tr>
  <tr>
    <td>Search for directories and change permission to 755</td>
    <td>find /path/ -type d -exec chmod -v 755 {} \;</td>
  </tr>
  <tr>
    <td>To find files with extension '.txt' and remove them</td>
    <td>find . /path/ -name '*.txt' -exec rm '{}' \;</td>
  </tr>
  <tr>
    <td>To find files with size bigger than 5 Mb and sort them by size</td>
    <td>find . -type f -size +20000k -exec ls -lh {} \; | awk '{ print $9 ": " $5 }'</td>
  </tr>
  <tr>
    <td>To search for and delete empty directories</td>
    <td>find . -type d -empty -exec rmdir {} \;</td>
  </tr>
  <tr>
    <td>To search all files who are not in .git directory</td>
    <td>find . ! -iwholename '*.git*' -type f</td>
  </tr>
  <tr>
    <td>To find files with extension '.txt' and look for a string into them</td>
    <td>find ./path/ -name '*.txt' | xargs grep 'string'</td>
  </tr>
</table>
