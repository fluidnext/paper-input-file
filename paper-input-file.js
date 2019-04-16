import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-input/paper-input';


export class PaperInputFile extends PolymerElement {

    static get template() {
        return html`
            <style>
                :host {
                    --paper-input-container-underline-disabled: {
                        border-bottom: 1px solid var(--secondary-text-color);
                    }
                    
                    --paper-input-container-disabled : {
                        opacity: 1;
                    }
                }
             
                .container {
                    @apply --layout-horizontal;
                    @apply --layout-center;
                }
                
                .container paper-input {
                    @apply --layout-flex;
                }
  
            </style>
            <div class="container">
                <paper-input id="fileInput" label="{{label}}" disabled="disabled" value="[[value]]"></paper-input> 
                <div hidden$="[[hideReset]]">
                    <paper-icon-button icon="{{resetIcon}}" on-tap="reset"></paper-icon-button>
                </div>
                <paper-icon-button icon="{{searchIcon}}" on-tap="_searchFile"></paper-icon-button>
            </div>
            <input type="file" id="uploadFile" multiple="{{multiple}}" capture="{{capture}}" accept="{{accept}}" on-change="_fileChange" hidden>
        `
    }

    static get properties () {
        return {

            label : {
                type: String,
                notify: true
            },

            resetIcon : {
                type: String,
                value: 'icons:clear'
            },

            searchIcon: {
                type: String,
                value: 'icons:search'
            },

            accept: {
                type: String,
                notify: true
            },

            capture: {
                type: String,
                notify: true
            },

            files: {
                notify: true,
                readOnly: true,
                value: []
            },

            multiple: {
                type: Boolean,
                notify: true,
                value: false
            },

            value: {
                type: String,
                readOnly: true,
                observer : "_changeValue"
            },

            hideReset: {
                type: Boolean,
                notify: true,
                value: true
            }
        };
    }

    /**
     * @param evt
     * @private
     */
    _searchFile(evt) {
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, false);
        this.$.uploadFile.dispatchEvent(event);
    }

    /**
     * @param evt
     * @private
     */
    reset(evt) {

        this._setValue(null);
        this.$.uploadFile.value = "";
        this._setFiles([]);
        this.hideReset = true;
    }

    /**
     * @param evt
     * @private
     */
    _fileChange(evt) {

        this._setFiles(evt.target.files);
        let valueInput = '';
        let divider = ', ';
        for (let cont = 0; this.files.length > cont; cont++) {

            divider = (this.files.length-1) === cont ? '' : divider;
            valueInput = valueInput.concat(this.files[cont].name + divider);
        }
        this._setValue(valueInput);
        this.hideReset = false;
    }

    /**
     * @param value
     * @private
     */
    _changeValue(value) {
        if (!value) {
             this.hideReset = true;
             return;
        }

        this.hideReset = false;
    }
}


window.customElements.define('paper-input-file', PaperInputFile);