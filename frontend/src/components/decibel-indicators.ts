import { css, html, LitElement, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement("decibel-indicators")
export class DecibelIndicators extends LitElement {
    static styles = css`
        ul {
            list-style-type: none;
            background-color: red;
            text-align: right;
        }
    `

    @property({ type: Number })
    left: number = -1

    @property({ type: Number })
    right: number = -1

    @property({ type: Number })
    center: number = -1

    @property({ type: Number })
    surroundLeft: number = -1

    @property({ type: Number })
    surroundRight: number = -1

    render(): TemplateResult {
        return html`<ul>
            <li>L: ${this.left} dB</li>
            <li>R: ${this.right} dB</li>
            <li>C: ${this.center} dB</li>
            <li>SL: ${this.surroundLeft} dB</li>
            <li>SR: ${this.surroundRight} dB</li>
        </ul>`
    }
}
