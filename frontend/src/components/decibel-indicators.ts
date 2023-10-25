import { html, LitElement, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement("decibel-indicators")
export class DecibelIndicators extends LitElement {
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
        return html`<div>
            <div>Left: ${this.left}</div>
            <div>Right: ${this.right}</div>
            <div>Center: ${this.center}</div>
            <div>Surround Left: ${this.surroundLeft}</div>
            <div>Surround Right: ${this.surroundRight}</div>
        </div>`
    }
}
