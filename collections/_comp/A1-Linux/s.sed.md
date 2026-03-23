---
category: Sheet
title: sed - Quick Reference and Minimal Tutorial
tags: Linux
---

<table>
  <tr>
    <th colspan="3">Sed Syntax</th>
  </tr>
  <tr>
    <td>: label</td>
    <td># comment</td>
    <td>{....} Block</td>
  </tr>
  <tr>
    <td>= - print line number</td>
    <td>a \ - Append</td>
    <td>b label - Branch</td>
  </tr>
  <tr>
    <td>c \ - change</td>
    <td>d and D - Delete</td>
    <td>g and G - Get</td>
  </tr>
  <tr>
    <td>h and H - Hold</td>
    <td>i \ - Insert</td>
    <td>l - Look</td>
  </tr>
  <tr>
    <td>n and N - Next</td>
    <td>p and P - Print</td>
    <td>q - Quit</td>
  </tr>
  <tr>
    <td>r filename - Read File</td>
    <td>s/..../..../ - Substitute</td>
    <td>t label - Test</td>
  </tr>
  <tr>
    <td>w filename - Write Filename</td>
    <td>x - eXchange</td>
    <td>y/..../..../ - Transform</td>
  </tr>
  <tr>
    <th colspan="3">Sed Pattern Flags</th>
  </tr>
  <tr>
    <td>/g - Global</td>
    <td>/I - Ignore Case</td>
    <td>/p - Print</td>
  </tr>
  <tr>
    <td>/w filename - Write Filename</td>
    <td></td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <td>To replace all occurrences of "day" with "night" within file.txt:</td>
  </tr>
  <tr>
    <td>sed -i 's/day/night/g' file.txt</td>
  </tr>
  <tr>
    <td>To remove leading spaces</td>
  </tr>
  <tr>
    <td>sed-i -r 's/^\s+//g' file.txt</td>
  </tr>
  <tr>
    <td> insert a blank line above every line which matches "regex"</td>
  </tr>
  <tr>
    <td>sed '/regex/{x;p;x;}'</td>
  </tr>
  <tr>
    <td> IN UNIX ENVIRONMENT: convert DOS newlines (CR/LF) to Unix format.</td>
  </tr>
  <tr>
    <td>sed 's/.$//',# assumes that all lines end with CR/LF</td>
  </tr>
  <tr>
    <td>sed 's/^M$//',# in bash/tcsh, press Ctrl-V then Ctrl-M</td>
  </tr>
  <tr>
    <td>sed 's/\x0D$//',# works on ssed, gsed 3.02.80 or higher</td>
  </tr>
  <tr>
    <td>IN UNIX ENVIRONMENT: convert Unix newlines (LF) to DOS format.</td>
  </tr>
  <tr>
    <td>sed "s/$/`echo -e \\\r`/",# command line under ksh</td>
  </tr>
  <tr>
    <td>sed 's/$'"/`echo \\\r`/",# command line under bash</td>
  </tr>
  <tr>
    <td>sed "s/$/`echo \\\r`/",# command line under zsh</td>
  </tr>
  <tr>
    <td>sed 's/$/\r/',# gsed 3.02.80 or higher</td>
  </tr>
  <tr>
    <td>Change "scarlet" or "ruby" or "puce" to "red"</td>
  </tr>
  <tr>
    <td>sed 's/scarlet/red/g;s/ruby/red/g;s/puce/red/g'</td>
  </tr>
  <tr>
    <td>print first 10 lines of file (emulates behavior of "head") </td>
  </tr>
  <tr>
    <td>sed 10q</td>
  </tr>
  <tr>
    <td>Change beforedoc&lt;anystring&gt;afterdoc to b&lt;anystring&gt;a</td>
  </tr>
  <tr>
    <td>sed 's/beforedoc\([A-Za-z]\)afterdoc/b\1a/'</td>
  </tr>
</table>
