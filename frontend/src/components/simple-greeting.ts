import { html, LitElement, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement("simple-greeting")
export class SimpleGreeting extends LitElement {
    @property()
    name = "Somebody"

    render(): TemplateResult {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
