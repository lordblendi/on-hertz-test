import { css, html, LitElement, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"

@customElement("surround-panner")
export class SurroundPanner extends LitElement {
    static styles = css`
        .container {
            background-color: gray;
        }

        .circle {
            background-color: darkgray;
            border-radius: 50%;
            height: 25rem;
            width: 25rem;
            min-height: 200px;
            min-width: 200px;
        }
    `

    render(): TemplateResult {
        return html`<div class="container">
            <div class="circle"></div>
        </div>`
    }
}
