---
title: Emacs - Quick Reference
layout: slide-multilingual
categories: Sheet
subclass: Toolset
---

# En

## Emacs - Quick Reference

English version, rebuilt as a **four-column Markdown table** based on your original Emacs quick reference. 

Notation: `C-` = `Ctrl`, `M-` = `Meta/Alt`, `RET` = Return, `SPC` = Space, `DEL` = Backspace/Delete.

| Section                     | Action                               | Key / Command                         | Notes                                                     |                               |
| --------------------------- | ------------------------------------ | ------------------------------------- | --------------------------------------------------------- | ----------------------------- |
| **Basic**                   | Run command                          | `M-x`                                 | Invoke any interactive command                            |                               |
| **Basic**                   | Cancel current operation             | `C-g`                                 | Abort minibuffer, search, command, etc.                   |                               |
| **Basic**                   | Suspend / minimize Emacs             | `C-z`                                 | Usually minimizes GUI Emacs                               |                               |
| **Basic**                   | Exit Emacs                           | `C-x C-c`                             | Prompts if files are unsaved                              |                               |
| **Basic**                   | Repeat complex command               | `C-x ESC ESC`                         | Re-run previous complex command                           |                               |
| **Basic**                   | Universal argument                   | `C-u`                                 | Example: `C-u 4 C-n` moves down 4 lines                   |                               |
| **Basic**                   | Numeric argument                     | `M-1` … `M-9`                         | Pass a repeat count to the next command                   |                               |
| **Error Recovery**          | Undo                                 | `C-/` or `C-_`                        | Standard undo                                             |                               |
| **Error Recovery**          | Redo / undo-redo                     | `C-g C-/`                             | Available in newer Emacs versions                         |                               |
| **Error Recovery**          | Undo tree                            | `C-x u`                               | Requires `undo-tree` or custom setup                      |                               |
| **Error Recovery**          | Revert current buffer                | `M-x revert-buffer`                   | Reload file from disk                                     |                               |
| **Error Recovery**          | Recover session                      | `M-x recover-session`                 | Recover from auto-save files                              |                               |
| **File**                    | Open file                            | `C-x C-f`                             | `find-file`                                               |                               |
| **File**                    | Save file                            | `C-x C-s`                             | `save-buffer`                                             |                               |
| **File**                    | Save as                              | `C-x C-w`                             | `write-file`                                              |                               |
| **File**                    | Save all files                       | `C-x s`                               | Save all modified buffers                                 |                               |
| **File**                    | Replace current file with another    | `C-x C-v`                             | `find-alternate-file`                                     |                               |
| **File**                    | Toggle read-only mode                | `C-x C-q`                             | `read-only-mode`                                          |                               |
| **File**                    | Insert file into buffer              | `C-x i`                               | Insert another file’s content                             |                               |
| **File**                    | Open recent files                    | `M-x recentf-open-files`              | Requires `recentf-mode`                                   |                               |
| **Buffer**                  | Switch buffer                        | `C-x b`                               | `switch-to-buffer`                                        |                               |
| **Buffer**                  | List buffers                         | `C-x C-b`                             | Default buffer list                                       |                               |
| **Buffer**                  | Better buffer list                   | `M-x ibuffer`                         | Recommended replacement for `C-x C-b`                     |                               |
| **Buffer**                  | Kill current buffer                  | `C-x k`                               | `kill-buffer`                                             |                               |
| **Buffer**                  | Kill several buffers                 | `M-x kill-some-buffers`               | Confirm buffer deletion one by one                        |                               |
| **Buffer**                  | Previous / next buffer               | `C-x ←` / `C-x →`                     | `previous-buffer` / `next-buffer`                         |                               |
| **Buffer**                  | Rename current buffer                | `M-x rename-buffer`                   | Useful when buffer names conflict                         |                               |
| **Minibuffer**              | Complete input                       | `TAB`                                 | Context-sensitive completion                              |                               |
| **Minibuffer**              | Confirm and execute                  | `RET`                                 | Accept current input                                      |                               |
| **Minibuffer**              | Previous history item                | `M-p`                                 | Minibuffer history                                        |                               |
| **Minibuffer**              | Next history item                    | `M-n`                                 | Minibuffer history                                        |                               |
| **Minibuffer**              | Regexp search backward in history    | `M-r`                                 | Search previous minibuffer inputs                         |                               |
| **Minibuffer**              | Regexp search forward in history     | `M-s`                                 | Search later minibuffer inputs                            |                               |
| **Minibuffer**              | File-name completion                 | `TAB`                                 | Commonly used in `C-x C-f`                                |                               |
| **Minibuffer**              | Abort minibuffer                     | `C-g`                                 | Cancel current minibuffer input                           |                               |
| **Window**                  | Keep only current window             | `C-x 1`                               | Delete all other windows                                  |                               |
| **Window**                  | Delete current window                | `C-x 0`                               | Does not kill the buffer                                  |                               |
| **Window**                  | Split window horizontally            | `C-x 2`                               | Top / bottom split                                        |                               |
| **Window**                  | Split window vertically              | `C-x 3`                               | Left / right split                                        |                               |
| **Window**                  | Move to other window                 | `C-x o`                               | Default window switching                                  |                               |
| **Window**                  | Move to previous window              | `C-u C-x o`                           | Reverse direction                                         |                               |
| **Window**                  | Scroll other window                  | `C-M-v`                               | Scroll other window forward                               |                               |
| **Window**                  | Reverse-scroll other window          | `C-M-S-v` or `C-M-- C-M-v`            | Depends on terminal support                               |                               |
| **Window**                  | Open file in other window            | `C-x 4 f`                             | `find-file-other-window`                                  |                               |
| **Window**                  | Open buffer in other window          | `C-x 4 b`                             | `switch-to-buffer-other-window`                           |                               |
| **Window**                  | Balance windows                      | `C-x +`                               | Make window sizes even                                    |                               |
| **Window**                  | Enlarge current window vertically    | `C-x ^`                               | `enlarge-window`                                          |                               |
| **Window**                  | Enlarge current window horizontally  | `C-x }`                               | `enlarge-window-horizontally`                             |                               |
| **Window**                  | Shrink current window horizontally   | `C-x {`                               | `shrink-window-horizontally`                              |                               |
| **Frame**                   | Create new frame                     | `C-x 5 2`                             | Similar to a new GUI window                               |                               |
| **Frame**                   | Delete current frame                 | `C-x 5 0`                             | Does not necessarily exit Emacs                           |                               |
| **Frame**                   | Open file in new frame               | `C-x 5 f`                             | `find-file-other-frame`                                   |                               |
| **Tab Bar**                 | Create new tab                       | `C-x t 2`                             | Built-in `tab-bar`                                        |                               |
| **Tab Bar**                 | Close current tab                    | `C-x t 0`                             | `tab-close`                                               |                               |
| **Tab Bar**                 | Switch to next tab                   | `C-x t o`                             | `tab-next`                                                |                               |
| **Region / Mark**           | Set mark                             | `C-SPC` or `C-@`                      | Start selecting a region                                  |                               |
| **Region / Mark**           | Exchange point and mark              | `C-x C-x`                             | Jump between region boundaries                            |                               |
| **Region / Mark**           | Mark word                            | `M-@`                                 | `mark-word`                                               |                               |
| **Region / Mark**           | Mark paragraph                       | `M-h`                                 | `mark-paragraph`                                          |                               |
| **Region / Mark**           | Mark sexp                            | `C-M-SPC` or `C-M-@`                  | Useful for Lisp / structured text                         |                               |
| **Region / Mark**           | Mark function                        | `C-M-h`                               | `mark-defun`                                              |                               |
| **Region / Mark**           | Mark whole buffer                    | `C-x h`                               | Select entire buffer                                      |                               |
| **Copy / Kill / Yank**      | Cut region                           | `C-w`                                 | `kill-region`                                             |                               |
| **Copy / Kill / Yank**      | Copy region                          | `M-w`                                 | `kill-ring-save`                                          |                               |
| **Copy / Kill / Yank**      | Paste                                | `C-y`                                 | `yank`                                                    |                               |
| **Copy / Kill / Yank**      | Cycle previous yanks                 | `M-y`                                 | Use immediately after `C-y`                               |                               |
| **Copy / Kill / Yank**      | Kill up to character                 | `M-z CHAR`                            | `zap-to-char`                                             |                               |
| **Copy / Kill / Yank**      | Kill to end of line                  | `C-k`                                 | Kills newline if line is empty                            |                               |
| **Copy / Kill / Yank**      | Kill whole line                      | `C-S-backspace`                       | Often available in GUI Emacs                              |                               |
| **Editing**                 | Insert newline                       | `RET`                                 | Indentation depends on major mode                         |                               |
| **Editing**                 | Open line below point                | `C-o`                                 | Insert newline without moving following text              |                               |
| **Editing**                 | Delete horizontal whitespace         | `M-\`                                 | `delete-horizontal-space`                                 |                               |
| **Editing**                 | Join current line with previous line | `M-^`                                 | `delete-indentation`                                      |                               |
| **Editing**                 | Indent current line                  | `TAB`                                 | Depends on major mode                                     |                               |
| **Editing**                 | Indent region                        | `C-M-\`                               | `indent-region`                                           |                               |
| **Editing**                 | Comment / uncomment region           | `C-x C-;` or `M-x comment-region`     | Binding may vary by version or mode                       |                               |
| **Editing**                 | Comment line or region               | `M-;`                                 | `comment-dwim`                                            |                               |
| **Transpose**               | Transpose characters                 | `C-t`                                 | `transpose-chars`                                         |                               |
| **Transpose**               | Transpose words                      | `M-t`                                 | `transpose-words`                                         |                               |
| **Transpose**               | Transpose lines                      | `C-x C-t`                             | `transpose-lines`                                         |                               |
| **Transpose**               | Transpose sexps                      | `C-M-t`                               | `transpose-sexps`                                         |                               |
| **Case**                    | Uppercase word                       | `M-u`                                 | `upcase-word`                                             |                               |
| **Case**                    | Lowercase word                       | `M-l`                                 | `downcase-word`                                           |                               |
| **Case**                    | Capitalize word                      | `M-c`                                 | `capitalize-word`                                         |                               |
| **Case**                    | Uppercase region                     | `C-x C-u`                             | `upcase-region`; may need enabling                        |                               |
| **Case**                    | Lowercase region                     | `C-x C-l`                             | `downcase-region`; may need enabling                      |                               |
| **Motion**                  | Forward one character                | `C-f`                                 | Forward char                                              |                               |
| **Motion**                  | Backward one character               | `C-b`                                 | Backward char                                             |                               |
| **Motion**                  | Next line                            | `C-n`                                 | Move down                                                 |                               |
| **Motion**                  | Previous line                        | `C-p`                                 | Move up                                                   |                               |
| **Motion**                  | Forward one word                     | `M-f`                                 | Forward word                                              |                               |
| **Motion**                  | Backward one word                    | `M-b`                                 | Backward word                                             |                               |
| **Motion**                  | Beginning of line                    | `C-a`                                 | Move to line start                                        |                               |
| **Motion**                  | End of line                          | `C-e`                                 | Move to line end                                          |                               |
| **Motion**                  | Beginning of sentence                | `M-a`                                 | Backward sentence                                         |                               |
| **Motion**                  | End of sentence                      | `M-e`                                 | Forward sentence                                          |                               |
| **Motion**                  | Forward paragraph                    | `M-}`                                 | Move to next paragraph                                    |                               |
| **Motion**                  | Backward paragraph                   | `M-{`                                 | Move to previous paragraph                                |                               |
| **Motion**                  | Forward sexp                         | `C-M-f`                               | Useful for Lisp / nested expressions                      |                               |
| **Motion**                  | Backward sexp                        | `C-M-b`                               | Useful for Lisp / nested expressions                      |                               |
| **Motion**                  | Beginning of function                | `C-M-a`                               | Beginning of defun                                        |                               |
| **Motion**                  | End of function                      | `C-M-e`                               | End of defun                                              |                               |
| **Motion**                  | Beginning of buffer                  | `M-<`                                 | Move to buffer start                                      |                               |
| **Motion**                  | End of buffer                        | `M->`                                 | Move to buffer end                                        |                               |
| **Motion**                  | Next screen                          | `C-v`                                 | Scroll forward                                            |                               |
| **Motion**                  | Previous screen                      | `M-v`                                 | Scroll backward                                           |                               |
| **Motion**                  | Recenter line                        | `C-l`                                 | Repeated presses cycle center / top / bottom              |                               |
| **Motion**                  | Back to indentation                  | `M-m`                                 | `back-to-indentation`                                     |                               |
| **Motion**                  | Go to line                           | `M-g g`                               | `goto-line`                                               |                               |
| **Motion**                  | Go to character position             | `M-g c`                               | `goto-char`                                               |                               |
| **Deletion**                | Delete next character                | `C-d`                                 | Delete char                                               |                               |
| **Deletion**                | Delete previous character            | `DEL`                                 | Backward delete char                                      |                               |
| **Deletion**                | Kill next word                       | `M-d`                                 | `kill-word`                                               |                               |
| **Deletion**                | Kill previous word                   | `M-DEL`                               | `backward-kill-word`                                      |                               |
| **Deletion**                | Kill to sentence end                 | `M-k`                                 | `kill-sentence`                                           |                               |
| **Deletion**                | Kill to sentence beginning           | `C-x DEL`                             | `backward-kill-sentence`                                  |                               |
| **Deletion**                | Kill next sexp                       | `C-M-k`                               | `kill-sexp`                                               |                               |
| **Deletion**                | Kill previous sexp                   | `C-M-DEL`                             | `backward-kill-sexp`                                      |                               |
| **Search**                  | Incremental search forward           | `C-s`                                 | `isearch-forward`                                         |                               |
| **Search**                  | Incremental search backward          | `C-r`                                 | `isearch-backward`                                        |                               |
| **Search**                  | Regexp search forward                | `C-M-s`                               | Regexp incremental search                                 |                               |
| **Search**                  | Regexp search backward               | `C-M-r`                               | Regexp incremental search                                 |                               |
| **Search**                  | Search word at point                 | `C-s C-w`                             | Add word at point to search string                        |                               |
| **Search**                  | Accept search                        | `RET`                                 | Stay at current match                                     |                               |
| **Search**                  | Abort search                         | `C-g`                                 | Return to original position                               |                               |
| **Replace**                 | Query replace                        | `M-%`                                 | `query-replace`                                           |                               |
| **Replace**                 | Query replace regexp                 | `C-M-%` or `M-x query-replace-regexp` | Prefer remembering `C-M-%`                                |                               |
| **Replace**                 | Replace current match                | `y`                                   | Used during query replace                                 |                               |
| **Replace**                 | Skip current match                   | `n`                                   | Used during query replace                                 |                               |
| **Replace**                 | Replace all remaining matches        | `!`                                   | Used during query replace                                 |                               |
| **Replace**                 | Back up to previous match            | `^`                                   | Used during query replace                                 |                               |
| **Replace**                 | Exit replace                         | `RET` or `q`                          | Used during query replace                                 |                               |
| **Help**                    | Open tutorial                        | `C-h t`                               | Emacs tutorial                                            |                               |
| **Help**                    | Search command by keyword            | `C-h a`                               | `apropos-command`                                         |                               |
| **Help**                    | Describe bindings                    | `C-h b`                               | `describe-bindings`                                       |                               |
| **Help**                    | Describe key                         | `C-h k KEY`                           | `describe-key`                                            |                               |
| **Help**                    | Describe function                    | `C-h f`                               | `describe-function`                                       |                               |
| **Help**                    | Describe variable                    | `C-h v`                               | `describe-variable`                                       |                               |
| **Help**                    | Describe current mode                | `C-h m`                               | `describe-mode`                                           |                               |
| **Help**                    | Describe package                     | `C-h P`                               | `describe-package`                                        |                               |
| **Help**                    | View function source                 | `C-h f FUNCTION RET`                  | Source link appears in help buffer                        |                               |
| **Help**                    | Open Info manual                     | `C-h i`                               | Entry point to official manuals                           |                               |
| **Special Characters**      | Insert Unicode character             | `C-x 8 RET`                           | Enter character name or Unicode code point                |                               |
| **Special Characters**      | Insert character by command          | `M-x insert-char`                     | Same core function as `C-x 8 RET`                         |                               |
| **Special Characters**      | Insert copyright sign                | `C-x 8 C`                             | `©`                                                       |                               |
| **Special Characters**      | Insert registered sign               | `C-x 8 R`                             | `®`                                                       |                               |
| **Special Characters**      | Insert trademark sign                | `C-x 8 T`                             | `™`                                                       |                               |
| **Special Characters**      | Insert euro sign                     | `C-x 8 e`                             | `€`                                                       |                               |
| **Special Characters**      | Insert pound sign                    | `C-x 8 L`                             | `£`                                                       |                               |
| **Special Characters**      | Insert yen sign                      | `C-x 8 Y`                             | `¥`                                                       |                               |
| **Special Characters**      | Insert left / right quotation mark   | `C-x 8 [` / `C-x 8 ]`                 | `‘` / `’`; may vary by environment                        |                               |
| **Special Characters**      | Set input method                     | `C-\` or `M-x set-input-method`       | For `Quail` and other input methods                       |                               |
| **Dired**                   | Open directory                       | `C-x d`                               | Enter `dired`                                             |                               |
| **Dired**                   | Mark file                            | `m`                                   | Mark file                                                 |                               |
| **Dired**                   | Unmark file                          | `u`                                   | Remove mark                                               |                               |
| **Dired**                   | Execute marked operations            | `x`                                   | Execute pending operations                                |                               |
| **Dired**                   | Delete file                          | `D`                                   | Delete selected file                                      |                               |
| **Dired**                   | Copy file                            | `C`                                   | Copy selected file                                        |                               |
| **Dired**                   | Rename / move file                   | `R`                                   | Rename selected file                                      |                               |
| **Dired**                   | Create directory                     | `+`                                   | Make directory                                            |                               |
| **Dired**                   | Refresh buffer                       | `g`                                   | Revert Dired buffer                                       |                               |
| **Dired**                   | Open file / enter directory          | `RET`                                 | Visit file or directory                                   |                               |
| **Dired**                   | Go to parent directory               | `^`                                   | Up directory                                              |                               |
| **Dired**                   | Mark by regexp                       | `% m`                                 | Regexp mark                                               |                               |
| **Dired**                   | Rename by regexp                     | `% R`                                 | Regexp rename                                             |                               |
| **Programming**             | Switch major mode                    | `M-x MODE-name`                       | Example: `M-x python-mode`                                |                               |
| **Programming**             | Compile                              | `M-x compile`                         | Default command is often `make -k`                        |                               |
| **Programming**             | Recompile                            | `M-x recompile`                       | Reuse previous compile command                            |                               |
| **Programming**             | Next error                           | `M-g n` or `C-x ``                    | `next-error`                                              |                               |
| **Programming**             | Previous error                       | `M-g p`                               | `previous-error`                                          |                               |
| **Programming**             | Go to definition                     | `M-.`                                 | `xref-find-definitions`                                   |                               |
| **Programming**             | Go back from definition              | `M-,`                                 | `xref-go-back`                                            |                               |
| **Programming**             | Find references                      | `M-?`                                 | `xref-find-references`                                    |                               |
| **Programming**             | Start shell                          | `M-x shell`                           | Built-in shell buffer                                     |                               |
| **Programming**             | Start Eshell                         | `M-x eshell`                          | Shell implemented in Emacs Lisp                           |                               |
| **Programming**             | Start terminal emulator              | `M-x term` or `M-x ansi-term`         | Closer to a real terminal                                 |                               |
| **Programming**             | Execute shell command                | `M-!`                                 | `shell-command`                                           |                               |
| **Programming**             | Execute async shell command          | `M-&`                                 | `async-shell-command`                                     |                               |
| **Programming**             | Run shell command on region          | `M-                                   | `                                                         | `shell-command-on-region`     |
| **Programming**             | Replace region with command output   | `C-u M-                               | `                                                         | Filter region through command |
| **Programming**             | Start Eglot                          | `M-x eglot`                           | Built-in LSP client                                       |                               |
| **Programming**             | Format buffer with Eglot             | `M-x eglot-format-buffer`             | Requires language-server support                          |                               |
| **Programming**             | Rename symbol with Eglot             | `M-x eglot-rename`                    | Requires language-server support                          |                               |
| **Flymake**                 | Next diagnostic                      | `M-g n`                               | May integrate with `next-error`                           |                               |
| **Flymake**                 | Previous diagnostic                  | `M-g p`                               | Flymake diagnostic navigation                             |                               |
| **Flymake**                 | Show diagnostics list                | `M-x flymake-show-buffer-diagnostics` | Built-in diagnostics buffer                               |                               |
| **Org-mode**                | Insert heading                       | `M-RET`                               | New Org heading                                           |                               |
| **Org-mode**                | Insert same-level heading            | `C-RET`                               | Insert heading respecting content                         |                               |
| **Org-mode**                | Promote / demote heading             | `M-←` / `M-→`                         | Change heading level                                      |                               |
| **Org-mode**                | Move heading up / down               | `M-↑` / `M-↓`                         | Move subtree                                              |                               |
| **Org-mode**                | Fold / unfold                        | `TAB`                                 | Cycle current subtree                                     |                               |
| **Org-mode**                | Global visibility cycle              | `S-TAB`                               | Overview / contents / show all                            |                               |
| **Org-mode**                | Toggle TODO state                    | `C-c C-t`                             | TODO / DONE / custom states                               |                               |
| **Org-mode**                | Set tags                             | `C-c C-q`                             | Org tags                                                  |                               |
| **Org-mode**                | Set priority                         | `C-c ,`                               | Org priority                                              |                               |
| **Org-mode**                | Set deadline                         | `C-c C-d`                             | Org deadline                                              |                               |
| **Org-mode**                | Set scheduled date                   | `C-c C-s`                             | Org schedule                                              |                               |
| **Org-mode**                | Open agenda                          | `C-c a`                               | Requires `org-agenda-files`                               |                               |
| **Org-mode**                | Capture note                         | `C-c c`                               | Requires `org-capture-templates`                          |                               |
| **Org-mode**                | Insert link                          | `C-c C-l`                             | `org-insert-link`                                         |                               |
| **Org-mode**                | Open link                            | `C-c C-o`                             | `org-open-at-point`                                       |                               |
| **Org-mode**                | Export                               | `C-c C-e`                             | HTML / PDF / Markdown, etc.                               |                               |
| **Org-mode**                | Realign table                        | `TAB` or `C-c C-c`                    | Common in Org tables                                      |                               |
| **Org-mode**                | Evaluate table formula               | `C-c =`                               | `org-table-eval-formula`                                  |                               |
| **Keyboard Macro**          | Start recording macro                | `F3` or `C-x (`                       | Start keyboard macro                                      |                               |
| **Keyboard Macro**          | Stop recording macro                 | `F4` or `C-x )`                       | End keyboard macro                                        |                               |
| **Keyboard Macro**          | Execute last macro                   | `F4` or `C-x e`                       | Call last keyboard macro                                  |                               |
| **Keyboard Macro**          | Name last macro                      | `M-x name-last-kbd-macro`             | Can be saved into config                                  |                               |
| **Keyboard Macro**          | Apply macro to each line             | `M-x apply-macro-to-region-lines`     | Useful for batch editing                                  |                               |
| **Rectangle**               | Start rectangle selection            | `C-x SPC`                             | `rectangle-mark-mode`                                     |                               |
| **Rectangle**               | Delete rectangle                     | `C-x r d`                             | Delete rectangle                                          |                               |
| **Rectangle**               | Kill rectangle                       | `C-x r k`                             | Cut rectangle                                             |                               |
| **Rectangle**               | Yank rectangle                       | `C-x r y`                             | Paste rectangle                                           |                               |
| **Rectangle**               | Fill rectangle with string           | `C-x r t`                             | `string-rectangle`                                        |                               |
| **Register**                | Save position to register            | `C-x r SPC`                           | `point-to-register`                                       |                               |
| **Register**                | Jump to register position            | `C-x r j`                             | `jump-to-register`                                        |                               |
| **Register**                | Save region to register              | `C-x r s`                             | `copy-to-register`                                        |                               |
| **Register**                | Insert register content              | `C-x r i`                             | `insert-register`                                         |                               |
| **Bookmark**                | Set bookmark                         | `C-x r m`                             | `bookmark-set`                                            |                               |
| **Bookmark**                | Jump to bookmark                     | `C-x r b`                             | `bookmark-jump`                                           |                               |
| **Bookmark**                | List bookmarks                       | `C-x r l`                             | `list-bookmarks`                                          |                               |
| **Project**                 | Project command prefix               | `C-x p`                               | Built-in `project.el`                                     |                               |
| **Project**                 | Find file in project                 | `C-x p f`                             | `project-find-file`                                       |                               |
| **Project**                 | Search regexp in project             | `C-x p g`                             | `project-find-regexp`                                     |                               |
| **Project**                 | Switch project buffer                | `C-x p b`                             | `project-switch-to-buffer`                                |                               |
| **Project**                 | Compile project                      | `C-x p c`                             | `project-compile`                                         |                               |
| **Project**                 | Open project shell                   | `C-x p s`                             | `project-shell`                                           |                               |
| **Package**                 | List packages                        | `M-x list-packages`                   | Built-in package manager                                  |                               |
| **Package**                 | Install package                      | `M-x package-install`                 | Install from configured archives                          |                               |
| **Package**                 | Refresh package contents             | `M-x package-refresh-contents`        | Usually needed before installing                          |                               |
| **Package**                 | Delete package                       | `M-x package-delete`                  | Remove installed package                                  |                               |
| **VC**                      | Version-control prefix               | `C-x v`                               | Built-in VC interface                                     |                               |
| **VC**                      | Show VC directory status             | `C-x v d`                             | `vc-dir`                                                  |                               |
| **VC**                      | Commit / next VC action              | `C-x v v`                             | `vc-next-action`                                          |                               |
| **VC**                      | Show diff for current file           | `C-x v =`                             | Diff current file                                         |                               |
| **VC**                      | Show log                             | `C-x v l`                             | Print version-control log                                 |                               |
| **Magit**                   | Open Git status                      | `M-x magit-status`                    | Requires `magit`                                          |                               |
| **Magit**                   | Stage current item                   | `s`                                   | In Magit buffer                                           |                               |
| **Magit**                   | Unstage current item                 | `u`                                   | In Magit buffer                                           |                               |
| **Magit**                   | Commit                               | `c c`                                 | In Magit buffer                                           |                               |
| **Magit**                   | Push                                 | `P p`                                 | In Magit buffer                                           |                               |
| **Magit**                   | Pull                                 | `F p`                                 | In Magit buffer                                           |                               |
| **Ediff**                   | Start Ediff                          | `M-x ediff`                           | Compare files or buffers                                  |                               |
| **Ediff**                   | Quit Ediff                           | `q`                                   | Quit session                                              |                               |
| **Ediff**                   | Suspend Ediff control panel          | `z`                                   | Suspend session                                           |                               |
| **Ediff**                   | Previous diff                        | `p` or `DEL`                          | Move to previous difference                               |                               |
| **Ediff**                   | Next diff                            | `n` or `SPC`                          | Move to next difference                                   |                               |
| **Ediff**                   | Jump to diff                         | `j`                                   | Jump to numbered diff                                     |                               |
| **Ediff**                   | Recenter                             | `C-l`                                 | Recenter display                                          |                               |
| **Ediff**                   | Toggle vertical / horizontal split   | `                                     | `                                                         | Change split layout           |
| **Ediff**                   | Toggle highlighting                  | `h`                                   | Enable / disable highlighting                             |                               |
| **Ediff**                   | Ignore whitespace                    | `##`                                  | Toggle whitespace ignoring                                |                               |
| **Ediff**                   | Ignore case                          | `#c`                                  | Toggle case ignoring                                      |                               |
| **Ediff**                   | Copy A’s region to B                 | `a`                                   | Copy current diff from A to B                             |                               |
| **Ediff**                   | Copy B’s region to A                 | `b`                                   | Copy current diff from B to A                             |                               |
| **Ediff**                   | Restore old diff                     | `ra` / `rb`                           | Restore old diff in buffer A / B                          |                               |
| **Ediff**                   | Save buffer                          | `wa` / `wb`                           | Save buffer A / B                                         |                               |
| **Paredit**                 | Slurp forward                        | `C-)` or package setup                | Pull next expression into current list                    |                               |
| **Paredit**                 | Barf forward                         | `C-}` or package setup                | Push last expression out of current list                  |                               |
| **Paredit**                 | Slurp backward                       | `C-(` or package setup                | Pull previous expression into current list                |                               |
| **Paredit**                 | Barf backward                        | `C-{` or package setup                | Push first expression out of current list                 |                               |
| **Paredit**                 | Forward sexp                         | `C-M-f`                               | Same structural movement as Emacs default                 |                               |
| **Paredit**                 | Backward sexp                        | `C-M-b`                               | Same structural movement as Emacs default                 |                               |
| **User / Package-specific** | Toggle node                          | `C-,`                                 | Kept from original; not a default Emacs binding           |                               |
| **User / Package-specific** | Start shell in window                | `C-x t`                               | Kept from original; default `C-x t` is tab-bar prefix     |                               |
| **User / Package-specific** | Start SLIME                          | `C-x j`                               | Kept from original; usually custom or SLIME setup         |                               |
| **User / Package-specific** | Switch window by letter              | `C-x o <a-z>`                         | Kept from original; likely from `ace-window` or similar   |                               |
| **User / Package-specific** | Switch window by number              | `M-1` … `M-9`                         | Kept from original; likely custom window-management setup |                               |


# Zh

## Emacs 快捷键速查表

说明：`C-` = `Ctrl`，`M-` = `Meta/Alt`，`RET` = 回车，`SPC` = 空格，`DEL` = 删除/退格。

| 模块                          | 操作                 | 快捷键 / 命令                              | 备注                                            |                           |
| --------------------------- | ------------------ | ------------------------------------- | --------------------------------------------- | ------------------------- |
| **Basic**                   | 执行命令               | `M-x`                                 | 调用任意交互命令                                      |                           |
| **Basic**                   | 取消当前操作             | `C-g`                                 | 退出 minibuffer、搜索、命令等                          |                           |
| **Basic**                   | 暂停 / 最小化 Emacs     | `C-z`                                 | 图形界面下通常最小化                                    |                           |
| **Basic**                   | 退出 Emacs           | `C-x C-c`                             | 退出前会询问未保存文件                                   |                           |
| **Basic**                   | 重复复杂命令             | `C-x ESC ESC`                         | 重新执行上一条复杂命令                                   |                           |
| **Basic**                   | 通用前缀参数             | `C-u`                                 | 如 `C-u 4 C-n` 向下移动 4 行                        |                           |
| **Basic**                   | 数字参数               | `M-1` … `M-9`                         | 给后续命令传递次数                                     |                           |
| **Error Recovery**          | 撤销                 | `C-/` 或 `C-_`                         | 默认撤销                                          |                           |
| **Error Recovery**          | Redo / Undo-redo   | `C-g C-/`                             | 新版 Emacs 支持 `undo-redo`                       |                           |
| **Error Recovery**          | 撤销树                | `C-x u`                               | 需要 `undo-tree` 包或自定义                          |                           |
| **Error Recovery**          | 重载当前 buffer        | `M-x revert-buffer`                   | 放弃未保存修改并重新读入文件                                |                           |
| **Error Recovery**          | 恢复会话文件             | `M-x recover-session`                 | 从自动保存文件恢复                                     |                           |
| **File**                    | 打开文件               | `C-x C-f`                             | `find-file`                                   |                           |
| **File**                    | 保存文件               | `C-x C-s`                             | `save-buffer`                                 |                           |
| **File**                    | 另存为                | `C-x C-w`                             | `write-file`                                  |                           |
| **File**                    | 保存所有文件             | `C-x s`                               | 保存所有已修改 buffer                                |                           |
| **File**                    | 用另一文件替换当前文件        | `C-x C-v`                             | `find-alternate-file`                         |                           |
| **File**                    | 切换只读状态             | `C-x C-q`                             | `read-only-mode`                              |                           |
| **File**                    | 插入文件内容             | `C-x i`                               | 把文件内容插入当前 buffer                              |                           |
| **File**                    | 最近文件               | `M-x recentf-open-files`              | 需启用 `recentf-mode`                            |                           |
| **Buffer**                  | 切换 buffer          | `C-x b`                               | `switch-to-buffer`                            |                           |
| **Buffer**                  | 列出 buffer          | `C-x C-b`                             | 默认 buffer 列表                                  |                           |
| **Buffer**                  | 更强 buffer 列表       | `M-x ibuffer`                         | 推荐替代 `C-x C-b`                                |                           |
| **Buffer**                  | 关闭当前 buffer        | `C-x k`                               | `kill-buffer`                                 |                           |
| **Buffer**                  | 批量关闭 buffer        | `M-x kill-some-buffers`               | 逐个确认                                          |                           |
| **Buffer**                  | 上一个 / 下一个 buffer   | `C-x ←` / `C-x →`                     | `previous-buffer` / `next-buffer`             |                           |
| **Buffer**                  | 当前 buffer 改名       | `M-x rename-buffer`                   | 避免同名 buffer 混淆                                |                           |
| **Minibuffer**              | 补全                 | `TAB`                                 | 根据上下文补全                                       |                           |
| **Minibuffer**              | 确认并执行              | `RET`                                 | 接受当前输入                                        |                           |
| **Minibuffer**              | 上一条历史输入            | `M-p`                                 | minibuffer history                            |                           |
| **Minibuffer**              | 下一条历史输入            | `M-n`                                 | minibuffer history                            |                           |
| **Minibuffer**              | 正则反向查历史            | `M-r`                                 | history regexp backward                       |                           |
| **Minibuffer**              | 正则正向查历史            | `M-s`                                 | history regexp forward                        |                           |
| **Minibuffer**              | 文件名补全              | `TAB`                                 | 在 `C-x C-f` 中常用                               |                           |
| **Minibuffer**              | 取消 minibuffer      | `C-g`                                 | 放弃当前输入                                        |                           |
| **Window**                  | 只保留当前窗口            | `C-x 1`                               | 删除其他 window                                   |                           |
| **Window**                  | 删除当前窗口             | `C-x 0`                               | 不关闭 buffer                                    |                           |
| **Window**                  | 水平分屏               | `C-x 2`                               | 上下分屏                                          |                           |
| **Window**                  | 垂直分屏               | `C-x 3`                               | 左右分屏                                          |                           |
| **Window**                  | 切换到其他窗口            | `C-x o`                               | 默认窗口切换                                        |                           |
| **Window**                  | 反向切换窗口             | `C-u C-x o`                           | 向相反方向切换                                       |                           |
| **Window**                  | 滚动其他窗口             | `C-M-v`                               | 向下滚动 other window                             |                           |
| **Window**                  | 反向滚动其他窗口           | `C-M-S-v` 或 `C-M-- C-M-v`             | 依终端支持而定                                       |                           |
| **Window**                  | 在其他窗口打开文件          | `C-x 4 f`                             | `find-file-other-window`                      |                           |
| **Window**                  | 在其他窗口打开 buffer     | `C-x 4 b`                             | `switch-to-buffer-other-window`               |                           |
| **Window**                  | 平衡窗口大小             | `C-x +`                               | `balance-windows`                             |                           |
| **Window**                  | 放大当前窗口高度           | `C-x ^`                               | `enlarge-window`                              |                           |
| **Window**                  | 放大当前窗口宽度           | `C-x }`                               | `enlarge-window-horizontally`                 |                           |
| **Window**                  | 缩小当前窗口宽度           | `C-x {`                               | `shrink-window-horizontally`                  |                           |
| **Frame**                   | 新建 frame           | `C-x 5 2`                             | 图形界面中类似新窗口                                    |                           |
| **Frame**                   | 删除当前 frame         | `C-x 5 0`                             | 不一定退出 Emacs                                   |                           |
| **Frame**                   | 在新 frame 打开文件      | `C-x 5 f`                             | `find-file-other-frame`                       |                           |
| **Tab Bar**                 | 新建标签页              | `C-x t 2`                             | Emacs 内置 tab-bar                              |                           |
| **Tab Bar**                 | 关闭当前标签页            | `C-x t 0`                             | `tab-close`                                   |                           |
| **Tab Bar**                 | 切换标签页              | `C-x t o`                             | `tab-next`                                    |                           |
| **Region / Mark**           | 设置 mark            | `C-SPC` 或 `C-@`                       | 开始选择区域                                        |                           |
| **Region / Mark**           | 交换 point 和 mark    | `C-x C-x`                             | 在区域两端跳转                                       |                           |
| **Region / Mark**           | 标记单词               | `M-@`                                 | `mark-word`                                   |                           |
| **Region / Mark**           | 标记段落               | `M-h`                                 | `mark-paragraph`                              |                           |
| **Region / Mark**           | 标记 sexp            | `C-M-SPC` 或 `C-M-@`                   | Lisp / 结构化文本常用                                |                           |
| **Region / Mark**           | 标记函数               | `C-M-h`                               | `mark-defun`                                  |                           |
| **Region / Mark**           | 全选 buffer          | `C-x h`                               | `mark-whole-buffer`                           |                           |
| **Copy / Kill / Yank**      | 剪切区域               | `C-w`                                 | `kill-region`                                 |                           |
| **Copy / Kill / Yank**      | 复制区域               | `M-w`                                 | `kill-ring-save`                              |                           |
| **Copy / Kill / Yank**      | 粘贴                 | `C-y`                                 | `yank`                                        |                           |
| **Copy / Kill / Yank**      | 切换上一次粘贴内容          | `M-y`                                 | 必须紧接 `C-y` 使用                                 |                           |
| **Copy / Kill / Yank**      | 删除到字符              | `M-z CHAR`                            | `zap-to-char`                                 |                           |
| **Copy / Kill / Yank**      | 删除当前行剩余部分          | `C-k`                                 | 到行尾；空行时删除换行                                   |                           |
| **Copy / Kill / Yank**      | 删除整行               | `C-S-backspace`                       | 图形界面常可用                                       |                           |
| **Editing**                 | 插入新行               | `RET`                                 | 根据 major mode 缩进                              |                           |
| **Editing**                 | 打开下一行              | `C-o`                                 | 不移动后续文本内容                                     |                           |
| **Editing**                 | 删除水平空白             | `M-\`                                 | `delete-horizontal-space`                     |                           |
| **Editing**                 | 合并当前行与上一行          | `M-^`                                 | `delete-indentation`                          |                           |
| **Editing**                 | 缩进当前行              | `TAB`                                 | 由 major mode 决定                               |                           |
| **Editing**                 | 缩进区域               | `C-M-\`                               | `indent-region`                               |                           |
| **Editing**                 | 注释 / 取消注释区域        | `C-x C-;` 或 `M-x comment-region`      | 默认绑定随版本和模式可能不同                                |                           |
| **Editing**                 | 注释当前行或区域           | `M-;`                                 | `comment-dwim`                                |                           |
| **Transpose**               | 交换字符               | `C-t`                                 | `transpose-chars`                             |                           |
| **Transpose**               | 交换单词               | `M-t`                                 | `transpose-words`                             |                           |
| **Transpose**               | 交换行                | `C-x C-t`                             | `transpose-lines`                             |                           |
| **Transpose**               | 交换 sexp            | `C-M-t`                               | `transpose-sexps`                             |                           |
| **Case**                    | 单词转大写              | `M-u`                                 | `upcase-word`                                 |                           |
| **Case**                    | 单词转小写              | `M-l`                                 | `downcase-word`                               |                           |
| **Case**                    | 单词首字母大写            | `M-c`                                 | `capitalize-word`                             |                           |
| **Case**                    | 区域转大写              | `C-x C-u`                             | `upcase-region`，可能需启用                         |                           |
| **Case**                    | 区域转小写              | `C-x C-l`                             | `downcase-region`，可能需启用                       |                           |
| **Motion**                  | 前进一个字符             | `C-f`                                 | forward char                                  |                           |
| **Motion**                  | 后退一个字符             | `C-b`                                 | backward char                                 |                           |
| **Motion**                  | 下一行                | `C-n`                                 | next line                                     |                           |
| **Motion**                  | 上一行                | `C-p`                                 | previous line                                 |                           |
| **Motion**                  | 前进一个单词             | `M-f`                                 | forward word                                  |                           |
| **Motion**                  | 后退一个单词             | `M-b`                                 | backward word                                 |                           |
| **Motion**                  | 行首                 | `C-a`                                 | beginning of line                             |                           |
| **Motion**                  | 行尾                 | `C-e`                                 | end of line                                   |                           |
| **Motion**                  | 句首                 | `M-a`                                 | backward sentence                             |                           |
| **Motion**                  | 句尾                 | `M-e`                                 | forward sentence                              |                           |
| **Motion**                  | 段落前进               | `M-}`                                 | forward paragraph                             |                           |
| **Motion**                  | 段落后退               | `M-{`                                 | backward paragraph                            |                           |
| **Motion**                  | 前进一个 sexp          | `C-M-f`                               | Lisp / 括号结构常用                                 |                           |
| **Motion**                  | 后退一个 sexp          | `C-M-b`                               | Lisp / 括号结构常用                                 |                           |
| **Motion**                  | 函数开头               | `C-M-a`                               | beginning of defun                            |                           |
| **Motion**                  | 函数结尾               | `C-M-e`                               | end of defun                                  |                           |
| **Motion**                  | buffer 开头          | `M-<`                                 | beginning of buffer                           |                           |
| **Motion**                  | buffer 结尾          | `M->`                                 | end of buffer                                 |                           |
| **Motion**                  | 下一屏                | `C-v`                                 | scroll up / forward                           |                           |
| **Motion**                  | 上一屏                | `M-v`                                 | scroll down / backward                        |                           |
| **Motion**                  | 当前行居中 / 顶部 / 底部    | `C-l`                                 | 重复按会循环                                        |                           |
| **Motion**                  | 回到缩进处              | `M-m`                                 | `back-to-indentation`                         |                           |
| **Motion**                  | 跳转到行               | `M-g g`                               | `goto-line`                                   |                           |
| **Motion**                  | 跳转到字符位置            | `M-g c`                               | `goto-char`                                   |                           |
| **Deletion**                | 删除后一个字符            | `C-d`                                 | delete char                                   |                           |
| **Deletion**                | 删除前一个字符            | `DEL`                                 | backward delete char                          |                           |
| **Deletion**                | 删除后一个单词            | `M-d`                                 | kill word                                     |                           |
| **Deletion**                | 删除前一个单词            | `M-DEL`                               | backward kill word                            |                           |
| **Deletion**                | 删除到句尾              | `M-k`                                 | kill sentence                                 |                           |
| **Deletion**                | 删除到句首              | `C-x DEL`                             | backward kill sentence                        |                           |
| **Deletion**                | 删除后一个 sexp         | `C-M-k`                               | kill sexp                                     |                           |
| **Deletion**                | 删除前一个 sexp         | `C-M-DEL`                             | backward kill sexp                            |                           |
| **Search**                  | 向前增量搜索             | `C-s`                                 | incremental search forward                    |                           |
| **Search**                  | 向后增量搜索             | `C-r`                                 | incremental search backward                   |                           |
| **Search**                  | 正则向前搜索             | `C-M-s`                               | regexp isearch forward                        |                           |
| **Search**                  | 正则向后搜索             | `C-M-r`                               | regexp isearch backward                       |                           |
| **Search**                  | 搜索当前单词             | `C-s C-w`                             | 把 point 后的 word 加入搜索                          |                           |
| **Search**                  | 退出搜索并停在当前位置        | `RET`                                 | accept search                                 |                           |
| **Search**                  | 取消搜索并回到原位置         | `C-g`                                 | abort search                                  |                           |
| **Replace**                 | 交互替换               | `M-%`                                 | `query-replace`                               |                           |
| **Replace**                 | 正则交互替换             | `C-M-%` 或 `M-x query-replace-regexp`  | 更推荐记 `C-M-%`                                  |                           |
| **Replace**                 | 替换当前匹配             | `y`                                   | query replace 中使用                             |                           |
| **Replace**                 | 跳过当前匹配             | `n`                                   | query replace 中使用                             |                           |
| **Replace**                 | 替换全部剩余匹配           | `!`                                   | query replace 中使用                             |                           |
| **Replace**                 | 回到上一处匹配            | `^`                                   | query replace 中使用                             |                           |
| **Replace**                 | 退出替换               | `RET` 或 `q`                           | query replace 中使用                             |                           |
| **Help**                    | 打开教程               | `C-h t`                               | Emacs tutorial                                |                           |
| **Help**                    | 按关键词查命令            | `C-h a`                               | `apropos-command`                             |                           |
| **Help**                    | 查看按键绑定             | `C-h b`                               | `describe-bindings`                           |                           |
| **Help**                    | 查看某个键              | `C-h k KEY`                           | `describe-key`                                |                           |
| **Help**                    | 查看函数               | `C-h f`                               | `describe-function`                           |                           |
| **Help**                    | 查看变量               | `C-h v`                               | `describe-variable`                           |                           |
| **Help**                    | 查看当前模式             | `C-h m`                               | `describe-mode`                               |                           |
| **Help**                    | 查看包                | `C-h P`                               | `describe-package`                            |                           |
| **Help**                    | 查看函数源码             | `C-h f FUNCTION RET`                  | 帮助页中可跳转源码                                     |                           |
| **Help**                    | 查看 Info 手册         | `C-h i`                               | Emacs 官方文档入口                                  |                           |
| **Special Characters**      | 插入 Unicode 字符      | `C-x 8 RET`                           | 输入字符名或 Unicode 码点                             |                           |
| **Special Characters**      | 通过命令插入字符           | `M-x insert-char`                     | 同 `C-x 8 RET`                                 |                           |
| **Special Characters**      | 插入版权符号             | `C-x 8 C`                             | `©`                                           |                           |
| **Special Characters**      | 插入注册商标             | `C-x 8 R`                             | `®`                                           |                           |
| **Special Characters**      | 插入商标符号             | `C-x 8 T`                             | `™`                                           |                           |
| **Special Characters**      | 插入欧元符号             | `C-x 8 e`                             | `€`                                           |                           |
| **Special Characters**      | 插入英镑符号             | `C-x 8 L`                             | `£`                                           |                           |
| **Special Characters**      | 插入日元符号             | `C-x 8 Y`                             | `¥`                                           |                           |
| **Special Characters**      | 插入左引号 / 右引号        | `C-x 8 [` / `C-x 8 ]`                 | `‘` / `’`，依环境可能不同                             |                           |
| **Special Characters**      | 设置输入法              | `C-\` 或 `M-x set-input-method`        | `Quail` 输入法等                                  |                           |
| **Dired**                   | 打开目录               | `C-x d`                               | 进入 `dired`                                    |                           |
| **Dired**                   | 标记文件               | `m`                                   | mark                                          |                           |
| **Dired**                   | 取消标记               | `u`                                   | unmark                                        |                           |
| **Dired**                   | 执行标记操作             | `x`                                   | execute                                       |                           |
| **Dired**                   | 删除文件               | `D`                                   | delete                                        |                           |
| **Dired**                   | 复制文件               | `C`                                   | copy                                          |                           |
| **Dired**                   | 重命名 / 移动文件         | `R`                                   | rename                                        |                           |
| **Dired**                   | 新建目录               | `+`                                   | create directory                              |                           |
| **Dired**                   | 刷新                 | `g`                                   | revert buffer                                 |                           |
| **Dired**                   | 进入子目录 / 打开文件       | `RET`                                 | visit file or directory                       |                           |
| **Dired**                   | 返回上级目录             | `^`                                   | up directory                                  |                           |
| **Dired**                   | 按正则标记              | `% m`                                 | regexp mark                                   |                           |
| **Dired**                   | 按正则改名              | `% R`                                 | regexp rename                                 |                           |
| **Programming**             | 切换 major mode      | `M-x MODE-name`                       | 如 `M-x python-mode`                           |                           |
| **Programming**             | 编译                 | `M-x compile`                         | 默认运行 `make -k`                                |                           |
| **Programming**             | 重新编译               | `M-x recompile`                       | 使用上次编译命令                                      |                           |
| **Programming**             | 下一个错误              | `M-g n` 或 `C-x ``                     | `next-error`                                  |                           |
| **Programming**             | 上一个错误              | `M-g p`                               | `previous-error`                              |                           |
| **Programming**             | 跳转定义               | `M-.`                                 | `xref-find-definitions`                       |                           |
| **Programming**             | 返回跳转前位置            | `M-,`                                 | `xref-go-back`                                |                           |
| **Programming**             | 查找引用               | `M-?`                                 | `xref-find-references`                        |                           |
| **Programming**             | 启动 shell           | `M-x shell`                           | 内置 shell                                      |                           |
| **Programming**             | 启动 Eshell          | `M-x eshell`                          | Emacs Lisp 实现的 shell                          |                           |
| **Programming**             | 启动终端模拟器            | `M-x term` 或 `M-x ansi-term`          | 更接近真实终端                                       |                           |
| **Programming**             | 执行 shell 命令        | `M-!`                                 | `shell-command`                               |                           |
| **Programming**             | 异步执行 shell 命令      | `M-&`                                 | `async-shell-command`                         |                           |
| **Programming**             | 对区域运行命令            | `M-                                   | `                                             | `shell-command-on-region` |
| **Programming**             | 用命令结果替换区域          | `C-u M-                               | `                                             | filter region             |
| **Programming**             | 启动 Eglot           | `M-x eglot`                           | 内置 LSP 客户端                                    |                           |
| **Programming**             | 格式化 buffer         | `M-x eglot-format-buffer`             | 需要语言服务器支持                                     |                           |
| **Programming**             | 重命名符号              | `M-x eglot-rename`                    | 需要语言服务器支持                                     |                           |
| **Flymake**                 | 下一个诊断              | `M-g n`                               | `flymake-goto-next-error`，可能与 `next-error` 集成 |                           |
| **Flymake**                 | 上一个诊断              | `M-g p`                               | `flymake-goto-prev-error`                     |                           |
| **Flymake**                 | 显示诊断列表             | `M-x flymake-show-buffer-diagnostics` | 内置诊断列表                                        |                           |
| **Org-mode**                | 新建标题               | `M-RET`                               | insert heading                                |                           |
| **Org-mode**                | 新建同级标题             | `C-RET`                               | insert heading respect content                |                           |
| **Org-mode**                | 标题升级 / 降级          | `M-←` / `M-→`                         | promote / demote                              |                           |
| **Org-mode**                | 标题上移 / 下移          | `M-↑` / `M-↓`                         | move subtree                                  |                           |
| **Org-mode**                | 折叠 / 展开            | `TAB`                                 | 当前标题循环                                        |                           |
| **Org-mode**                | 全局折叠循环             | `S-TAB`                               | overview / contents / show all                |                           |
| **Org-mode**                | TODO 状态切换          | `C-c C-t`                             | TODO / DONE 等                                 |                           |
| **Org-mode**                | 设置标签               | `C-c C-q`                             | tags                                          |                           |
| **Org-mode**                | 设置优先级              | `C-c ,`                               | priority                                      |                           |
| **Org-mode**                | 设置截止日期             | `C-c C-d`                             | deadline                                      |                           |
| **Org-mode**                | 设置日程日期             | `C-c C-s`                             | schedule                                      |                           |
| **Org-mode**                | 打开 agenda          | `C-c a`                               | 需设置 `org-agenda-files`                        |                           |
| **Org-mode**                | 捕获笔记               | `C-c c`                               | 需设置 `org-capture-templates`                   |                           |
| **Org-mode**                | 插入链接               | `C-c C-l`                             | `org-insert-link`                             |                           |
| **Org-mode**                | 打开链接               | `C-c C-o`                             | `org-open-at-point`                           |                           |
| **Org-mode**                | 导出                 | `C-c C-e`                             | HTML / PDF / Markdown 等                       |                           |
| **Org-mode**                | 表格重排               | `TAB` 或 `C-c C-c`                     | Org table 常用                                  |                           |
| **Org-mode**                | 表格公式               | `C-c =`                               | `org-table-eval-formula`                      |                           |
| **Keyboard Macro**          | 开始录制宏              | `F3` 或 `C-x (`                        | start keyboard macro                          |                           |
| **Keyboard Macro**          | 结束录制宏              | `F4` 或 `C-x )`                        | end keyboard macro                            |                           |
| **Keyboard Macro**          | 执行上一个宏             | `F4` 或 `C-x e`                        | call last keyboard macro                      |                           |
| **Keyboard Macro**          | 命名宏                | `M-x name-last-kbd-macro`             | 可写入配置                                         |                           |
| **Keyboard Macro**          | 对每行执行宏             | `M-x apply-macro-to-region-lines`     | 批量编辑常用                                        |                           |
| **Rectangle**               | 开始矩形选择             | `C-x SPC`                             | `rectangle-mark-mode`                         |                           |
| **Rectangle**               | 删除矩形               | `C-x r d`                             | delete rectangle                              |                           |
| **Rectangle**               | 剪切矩形               | `C-x r k`                             | kill rectangle                                |                           |
| **Rectangle**               | 粘贴矩形               | `C-x r y`                             | yank rectangle                                |                           |
| **Rectangle**               | 矩形填入字符串            | `C-x r t`                             | string rectangle                              |                           |
| **Register**                | 保存位置到寄存器           | `C-x r SPC`                           | point-to-register                             |                           |
| **Register**                | 跳转到寄存器位置           | `C-x r j`                             | jump-to-register                              |                           |
| **Register**                | 保存区域到寄存器           | `C-x r s`                             | copy-to-register                              |                           |
| **Register**                | 插入寄存器内容            | `C-x r i`                             | insert-register                               |                           |
| **Bookmark**                | 设置书签               | `C-x r m`                             | bookmark-set                                  |                           |
| **Bookmark**                | 跳转书签               | `C-x r b`                             | bookmark-jump                                 |                           |
| **Bookmark**                | 列出书签               | `C-x r l`                             | list-bookmarks                                |                           |
| **Project**                 | 项目命令前缀             | `C-x p`                               | `project.el` 内置                               |                           |
| **Project**                 | 查找项目文件             | `C-x p f`                             | project-find-file                             |                           |
| **Project**                 | 项目内搜索 regexp       | `C-x p g`                             | project-find-regexp                           |                           |
| **Project**                 | 切换项目 buffer        | `C-x p b`                             | project-switch-to-buffer                      |                           |
| **Project**                 | 编译项目               | `C-x p c`                             | project-compile                               |                           |
| **Project**                 | 项目 shell           | `C-x p s`                             | project-shell                                 |                           |
| **Package**                 | 列出包                | `M-x list-packages`                   | 内置包管理                                         |                           |
| **Package**                 | 安装包                | `M-x package-install`                 | 从配置的 archive 安装                               |                           |
| **Package**                 | 更新包列表              | `M-x package-refresh-contents`        | 安装前常用                                         |                           |
| **Package**                 | 删除包                | `M-x package-delete`                  | 删除已安装包                                        |                           |
| **VC**                      | 版本控制前缀             | `C-x v`                               | Emacs 内置 VC                                   |                           |
| **VC**                      | 查看状态               | `C-x v d`                             | `vc-dir`                                      |                           |
| **VC**                      | 提交                 | `C-x v v`                             | `vc-next-action`                              |                           |
| **VC**                      | 查看差异               | `C-x v =`                             | diff current file                             |                           |
| **VC**                      | 查看日志               | `C-x v l`                             | print log                                     |                           |
| **Magit**                   | 打开 Git 状态          | `M-x magit-status`                    | 需要安装 `magit`                                  |                           |
| **Magit**                   | stage 当前文件 / hunk  | `s`                                   | 在 Magit buffer 中                              |                           |
| **Magit**                   | unstage 当前项        | `u`                                   | 在 Magit buffer 中                              |                           |
| **Magit**                   | commit             | `c c`                                 | 在 Magit buffer 中                              |                           |
| **Magit**                   | push               | `P p`                                 | 在 Magit buffer 中                              |                           |
| **Magit**                   | pull               | `F p`                                 | 在 Magit buffer 中                              |                           |
| **Ediff**                   | 启动 Ediff           | `M-x ediff`                           | 比较两个文件或 buffer                                |                           |
| **Ediff**                   | 退出 Ediff           | `q`                                   | quit                                          |                           |
| **Ediff**                   | 挂起 Ediff 控制面板      | `z`                                   | suspend                                       |                           |
| **Ediff**                   | 上一处差异              | `p` 或 `DEL`                           | previous diff                                 |                           |
| **Ediff**                   | 下一处差异              | `n` 或 `SPC`                           | next diff                                     |                           |
| **Ediff**                   | 跳转到指定差异            | `j`                                   | jump to diff                                  |                           |
| **Ediff**                   | 重新居中               | `C-l`                                 | recenter                                      |                           |
| **Ediff**                   | 垂直 / 水平布局切换        | `                                     | `                                             | split variant             |
| **Ediff**                   | 高亮切换               | `h`                                   | highlighting                                  |                           |
| **Ediff**                   | 忽略空白               | `##`                                  | ignore whitespace                             |                           |
| **Ediff**                   | 忽略大小写              | `#c`                                  | ignore case                                   |                           |
| **Ediff**                   | A 区域复制到 B          | `a`                                   | copy A to B                                   |                           |
| **Ediff**                   | B 区域复制到 A          | `b`                                   | copy B to A                                   |                           |
| **Ediff**                   | 恢复某 buffer 的旧 diff | `ra` / `rb`                           | restore old diff                              |                           |
| **Ediff**                   | 保存 buffer          | `wa` / `wb`                           | save buffer A / B                             |                           |
| **Paredit**                 | Slurp forward      | `C-)` 或包配置                            | 把右侧表达式吸入当前列表                                  |                           |
| **Paredit**                 | Barf forward       | `C-}` 或包配置                            | 把末尾表达式吐出当前列表                                  |                           |
| **Paredit**                 | Slurp backward     | `C-(` 或包配置                            | 把左侧表达式吸入当前列表                                  |                           |
| **Paredit**                 | Barf backward      | `C-{` 或包配置                            | 把开头表达式吐出当前列表                                  |                           |
| **Paredit**                 | 前进 sexp            | `C-M-f`                               | 与 Emacs 默认结构移动一致                              |                           |
| **Paredit**                 | 后退 sexp            | `C-M-b`                               | 与 Emacs 默认结构移动一致                              |                           |
| **User / Package-specific** | 切换 node            | `C-,`                                 | 原稿保留；非 Emacs 默认绑定                             |                           |
| **User / Package-specific** | 启动 shell in window | `C-x t`                               | 原稿保留；默认 `C-x t` 属于 tab-bar 前缀                 |                           |
| **User / Package-specific** | 启动 SLIME           | `C-x j`                               | 原稿保留；通常为自定义或 SLIME 配置                         |                           |
| **User / Package-specific** | 按字母切换窗口            | `C-x o <a-z>`                         | 原稿保留；可能来自 `ace-window` 等包                     |                           |
| **User / Package-specific** | 按数字切换窗口            | `M-1` … `M-9`                         | 原稿保留；可能来自自定义窗口管理配置                            |                           |
