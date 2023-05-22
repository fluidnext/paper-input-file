import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior';

import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/paper-input/paper-input-container';
import '@polymer/iron-input/iron-input';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-input/paper-input-error';

class PaperInputFile extends mixinBehaviors([PaperInputBehavior, IronFormElementBehavior], PolymerElement) {

    static get template() {
        return html`
            <style>
                iron-input > input {
                    @apply --paper-input-container-shared-input-style;
                    font-family: inherit;
                    font-weight: inherit;
                    font-size: inherit;
                    letter-spacing: inherit;
                    word-spacing: inherit;
                    line-height: inherit;
                    text-shadow: inherit;
                    color: inherit;
                    cursor: inherit;
                }

                input:disabled {
                    @apply --paper-input-container-input-disabled;
                }

                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    @apply --paper-input-container-input-webkit-spinner;
                }

                input::-webkit-clear-button {
                    @apply --paper-input-container-input-webkit-clear;
                }

                input::-webkit-calendar-picker-indicator {
                    @apply --paper-input-container-input-webkit-calendar-picker-indicator;
                }

                input::-webkit-input-placeholder {
                    color: var(--paper-input-container-color, var(--secondary-text-color));
                }

                input:-moz-placeholder {
                    color: var(--paper-input-container-color, var(--secondary-text-color));
                }

                input::-moz-placeholder {
                    color: var(--paper-input-container-color, var(--secondary-text-color));
                }

                input::-ms-clear {
                    @apply --paper-input-container-ms-clear;
                }

                input::-ms-reveal {
                    @apply --paper-input-container-ms-reveal;
                }

                input:-ms-input-placeholder {
                    color: var(--paper-input-container-color, var(--secondary-text-color));
                }

                [hidden] {
                    display: none;
                }
                
                paper-input-container {
                   --paper-input-prefix : {
                        cursor: pointer;
                   }
                }
                
                paper-input-container {
                   --paper-input-suffix : {
                        cursor: pointer;
                   }
                }
                
                paper-input-container > iron-input {
                   cursor: pointer;
                }
  
            </style>

            <paper-input-container no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate$="[[autoValidate]]" disabled$="[[disabled]]" invalid="[[invalid]]">
                <label hidden$="[[!label]]" slot="label" aria-hidden="true">[[label]]</label>

                <iron-input id$="[[_inputId]]" bind-value="{{value}}" slot="input" on-click="_searchFile" invalid="{{invalid}}" validator="[[validator]]" required="[[required]]" disabled>
                    <input type="text" disabled>
                </iron-input>

                <input type="file" id="uploadFile" multiple="{{multiple}}" capture="{{capture}}" accept="{{accept}}" on-change="_fileChange" hidden>

                <iron-icon hidden id="resetButton" slot="suffix" suffix icon="paper-input-file:clear" on-click="reset"></iron-icon>
                
                <iron-icon id="searchButton" slot="suffix" suffix icon="paper-input-file:search" on-click="_searchFile"></iron-icon>

                <template is="dom-if" if="[[errorMessage]]">
                    <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
                </template>
            </paper-input-container>
        `
    }

    static get properties () {
        return {

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

            isDirectory: {
                value: false,
                observer : "_changeIsDirectory"
            }
        };
    }

    /**
     * @private
     */
    _hideButton(){
        this.$.resetButton.setAttribute('hidden', null);
    }

    /**
     * @private
     */
    _showButton(){
        this.$.resetButton.removeAttribute('hidden');
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
        this._hideButton();
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
        this._showButton();
    }

    /**
     * @param value
     * @private
     */
    _changeValue(value) {
        if (!value) {
            this._hideButton();
            return;
        }

        this._showButton();
    }

    _changeIsDirectory(value) {
        if(!value) {
            return;
        }

        this.$.uploadFile.setAttribute('webkitdirectory', null);
        this.$.uploadFile.setAttribute('webkitdirectory', null);
    }
}


window.customElements.define('paper-input-file', PaperInputFile);