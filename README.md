[![Published on NPM](https://img.shields.io/npm/v/paper-input-file.svg)](https://www.npmjs.com/package/@fluidnext-polymer/paper-input-file)[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@fluidnext-polymer/paper-input-file)

# Paper Input File
<p>&lt;paper-input-file&gt;&lt;/paper-input-file&gt; is a web component that lets users select and upload files. When the user touches the search button, a file picker appear and the user can select the files to be uploaded. Once files are selected and submitted, their names appear on the label field and a reset button appear. The reset button lets the users clear the selection.</p>

See: [Demo](https://www.webcomponents.org/element/@fluidnext-polymer/paper-input-file/demo/demo/index.html).

## Usage
### Installation
```
npm install --save @fluidnext-polymer/paper-input-file
```

### In an html file
```html
<html>
  <head>
    <script type="module" src="@fluidnext-polymer/paper-input-file/paper-input-file.js"></script>
    <script type="module" src="@fluidnext-polymer/paper-input-file/icons/paper-input-file-icons.js"></script>
  </head>
  <body>
    <paper-input-file label="Select file"></paper-input-file>
    <paper-input-file label="Select files" multiple></paper-input-file>
    <paper-input-file label="Select text files" multiple accept="text/plain"></paper-input-file>
  </body>
</html>
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@fluidnext-polymer/paper-input-file/paper-input-file';
import '@fluidnext-polymer/paper-input-file/icons/paper-input-file-icons.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <paper-input-file label="Select file"></paper-input-file>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Custom icons
Icons can be customized by importing a different iconset.
For example, here is the iconset code imported in the [Demo]().
```js
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`
    <iron-iconset-svg name="paper-input-file" size="24">
        <svg><defs>
            <g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
            <g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
        </defs></svg>
    </iron-iconset-svg>
`;

document.head.appendChild(template.content);
```

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/fluidnext/paper-input-file
cd paper-input-file
npm install
npm install -g polymer-cli
npm install -g wct-istanbull
```

### Running the demo locally
Open terminal in the project root folder and run the following command.
```sh
polymer serve --open
```

### Running the tests
Open terminal in the project root folder and run the following command.
```sh
polymer test
```
To see tests details, open the generated "index.html" inside "coverage/lcov-report" folder.