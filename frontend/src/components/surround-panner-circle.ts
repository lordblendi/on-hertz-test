import { css, html, LitElement, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"

@customElement("surround-panner-circle")
export class SurroundPannerCircle extends LitElement {
    static styles = css`
        .circle {
            position: absolute;
            top: 50px;
            left: 10%;
            background-color: darkgray;
            border-radius: 50%;
            height: 20rem;
            width: 20rem;
        }
    `

    render(): TemplateResult {
        return html`<div class="circle"></div>`
    }
}
