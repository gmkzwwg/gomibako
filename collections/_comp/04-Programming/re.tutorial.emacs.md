

## Tricks

## Wysiwyg Markdown Editor

### Hide markup

1. Enable `M-x markdown-toggle-markup-hidding (C-c C-x RET)`

### Display inline math formula

> Emacs package "math-preview" requires external nodejs program "math-preview"

1. Install math-preview

```shell
npm install -g git+https://gitlab.com/matsievskiysv/math-preview
```

2. Upgrade Emacs by `M-x package-upgrade-all`

3. Install math-preview plugin by `M-x package-install RET math-preview`

### Functions

| Emacs Functions        | Explanation                          |
| ---------------------- | ------------------------------------ |
| math-preview-all       | Preview equations in buffer          |
| math-preview-region    | Preview equations in selected region |
| math-preview-at-point  | Preview equation at current position |
| math-preview-clear-all | Clear equation images in buffer      |
| math-preview-copy-svg  | Copy SVG code to clipboard           |

## ediff - File Comparing

## magit
