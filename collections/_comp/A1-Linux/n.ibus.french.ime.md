---
category: Notes
title: French Input Methods with ibus
tags: Linux
---

It maybe not convinient inputing french, when using a standard US keyboard. French keyboards often apply an AZERTY layout, in which key number and configuration differs from a QWERTY one. It is listed below:

<pre class="ascii_art">
,---,---,---,---,---,---,---,---,---,---,---,---,---,-------,
| ² |& 1|é 2|" 3|' 4|( 5|- 6|è 7|_ 8|ç 9|à 0|) °|= +| <-    |
|---'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-----|
| ->| | a | z | e | r | t | y | u | i | o | p |^ ¨|$ £|   E |
|-----',--',--',--',--',--',--',--',--',--',--',--',--',  N |
| caps | q | s | d | f | g | h | j | k | l | m |ù %|μ *|  T |
|----,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'---'----|
| sft|> <| w | x | c | v | b | n |, ?|; .|: /|! §| shift    |
|----',--'--,'---',--'---'---'---'---'---',--'---',--,------|
| ctl | win | alt |                       | altgr |  | ctrl |
'-----'-----'-----'-----------------------'-------'  '------'
</pre>

An alternative method may be inserting French with Compose Key, pressing dead key `altgr` and a normal key, i.g. altgr + q = ä. When altgr is pressed, the keyboard layout will be changed to:

<pre class="ascii_art">
,---,---,---,---,---,---,---,---,---,---,---,---,---,-------,
| ` | ¹ | ² | ³ | ¤ | € | ^ |  ̛ | ˛ | ‘ | ’ | ¥ | × | <-    |
|---'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-----|
| ->| | ä | å | é | ë | þ | ü | ú | í | ó | ö | « | » |  \  |
|-----',--',--',--',--',--',--',--',--',--',--',--',--'-----|
| caps | á | ß | ð | f | g | h | ï | œ | ø | ¶ | ´ | enter  |
|------'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'---'----|
| shift  | æ | œ | © | ® | · | ñ | µ | ç | ˙ | ¿ | shift    |
|-----,--'--,'---',--'---'---'---'---'---',--'---',--,------|
| ctl | win | alt |                       | altgr |  | ctrl |
'-----'-----'-----'-----------------------'-------'  '------'
</pre>

The standard US keyboard layout:

<pre class="ascii_art">
,---,---,---,---,---,---,---,---,---,---,---,---,---,-------,
| ~ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0 | - | = | <-    |
|---'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-----|
| ->| | Q | W | E | R | T | Y | U | I | O | P | [ | ] |  \  |
|-----',--',--',--',--',--',--',--',--',--',--',--',--'-----|
| caps | A | S | D | F | G | H | J | K | L | ; | ' | enter  |
|----,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'---'----|
| shift  | Z | X | C | V | B | N | M | , | . | / | shift    |
|----',--'--,'---',--'---'---'---'---'---',--'---',--,------|
| ctl | win | alt |                       | altgr |  | ctrl |
'-----'-----'-----'-----------------------'-------'  '------'
</pre>

To install French input method:
  - ibus: ibus-setup - Input Method - Add - French - English (intl., with AltGr dead keys)
  - window ime: 