# Image naming and organization

Store media under `images/<subject>/`, with an optional subject subdirectory.
Use lowercase English words and digits separated by hyphens. Avoid spaces,
underscores, random download identifiers, and repeated file extensions.

Name files `<main-content>-<type>.<extension>`. Useful types include `photo`,
`illustration`, `painting`, `meme`, `map`, `chart`, `diagram`, `timeline`,
`screenshot`, `logo`, and `video`. Keep astronomical object identifiers and
meaningful instrument, wavelength, chart number, or variant details.
Use `.jpg` for JPEG files and preserve each file's actual encoding.

## Subjects

- `architecture`: buildings and architectural views.
- `art`: artwork and mosaics.
- `astronomy`: nebulae, galaxies, galaxy clusters, supernova remnants, stars,
  quasars, black holes, deep fields, cosmology, and star charts.
- `branding`: site logos, icons, and identity images.
- `computing`: software screenshots.
- `history`: maps, timelines, artifacts, monuments, and portraits.
- `illustrations`: character illustrations.
- `learning`: learning-process diagrams.
- `mathematics`: knowledge maps and study roadmaps.
- `memes`: reaction and captioned images.
- `philosophy`: philosophy timelines and diagrams.
- `psychology`: psychological models and research charts.

## References

Use the configured site image root, for example:

```markdown
![]({{site.img}}/astronomy/nebulae/orion-nebula-photo.jpg)
```

Update references in collections, pages, templates, and configuration whenever
moving a file. `rename-map.csv` records this migration's old and new paths and
SHA-256 checksums. It is an audit record, not an HTTP redirect configuration.
Images without current references are retained. Identical files are retained
as separate variants; this migration does not remove or recompress media.
