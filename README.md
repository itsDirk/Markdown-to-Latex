# Markdown to LaTeX
A simple yet powerful tool to instantly convert your Markdown files to valid LaTeX source code.
All processing is done in the browser, your data stays yours.

The primary goal of this project to fully support Markdown written in [Obsidian](https://obsidian.md/) and to closely match its styling in LaTeX. Other Markdown editors are also supported. New features and bugfixes are added whenever possible.

All testing and verification was done using TeXstudio, and only packages bundled with it are ever used in generated code.
## Usage
Simply navigate to [markdowntolatex.dirkvanroosmalen.com](https://markdowntolatex.dirkvanroosmalen.com/), or [clone](#cloning-and-installing) the project to run it locally.
### Website
The web page contains two text fields. Paste your Markdown source code in the left field and click 'convert'.
The following options are exposed that are applied to the next conversion:
- **Headers in boldface** writes each element in the top row of a table in **boldface**, much like how tables in Obsidian are rendered.
- **Outline every row** adds a horizontal bar between each row of a table.
- **Outline every column** adds a vertical bar between each column of a table.
- **Repeat headers at bottom of table** copies the headers of a table and adds them to the bottom.
- **Align table content** changes how the content inside each cell in a table is aligned: center/left/right.
### Local Installation
When running locally, adjust the path variables in [app.js](/src/app.js) to select the input (`.md`) and output (`.tex`) file. If no output `.tex` file is present, it is created, otherwise its contents will be overwritten. Run the app using `npm run start`.
## Features
- Text markup
  - *Italic text*
  - **Bold text**
  - ~~Strikethrough text~~ (implemented as underlined text)
- Headers
  - (#), (##), (###) as (sub)sections
  - (####), (#####) as (sub)paragraphs
  - (######) as bold text
- Horizontal lines (---)
- Hyperlinks
- Lists
  - Ordered lists
  - Unordered lists
  - Nested lists
- Tables
  - Options for table styling
- Images
    - Images with captions
    - Images with alt text (used as caption if no caption present)
    - Resized images
- Code blocks
  - `foo` inline code blocks using *texttt*
  - \`\`\`bar\`\`\` multiline code blocks using *verbatim*
- Math blocks 
  - $1+2=3$ inline math blocks
  - \$$ 1+2=3 $$ multiline math blocks
- Comments
  - Obsidian
  - Visual Studio Code
  - JetBrains IDE
- Dynamic package inclusion

## Cloning and Installing
Assuming `git` and `npm` are installed:
1. `git clone https://github.com/itsDirk/Markdown-to-Latex.git`
2. `cd Markdown-to-Latex`
3. `npm install`
4. `npm run start`