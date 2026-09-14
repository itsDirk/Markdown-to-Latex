# Ref 1

## GitHub Markdown
Many markdown parsers, including the one used by GitHub, handles references through implicit generated anchors: [Link to ref 1](#ref-1)

## Obsidian
Obsidian however, doesn't. It uses a different syntax to link to headers. There are two options:
1. Use the header's name: [[#Ref 1]]
2. Use a custom display text: [[#Ref 1|Link to ref 1]]

### Edge cases
1. Empty ref text: [[#Ref 1|]]
2. "|" in ref text: [[#Ref 1|Link to | ref 1]]
