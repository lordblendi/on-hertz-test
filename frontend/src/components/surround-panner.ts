import { css, html, LitElement, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"

import "./surround-panner-circle"
import "./surround-panner-speakers"

@customElement("surround-panner")
export class SurroundPanner extends LitElement {
    static styles = css`
        .container {
            border-radius: 1em;
            border: #cffafe 1px solid;
            height: 400px;
            position: relative;
            width: 400px;
        }
    `

    render(): TemplateResult {
        return html`<div class="container">
            <surround-panner-circle></surround-panner-circle>
            <surround-panner-speakers></surround-panner-speakers>
        </div>`
    }
}
