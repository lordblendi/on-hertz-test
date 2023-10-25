import { html, LitElement, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement("other-greeting")
export class SimpleGreeting extends LitElement {
    @property()
    name = "Somebody"

    render(): TemplateResult {
        return html`<p class="tw-p-4 p-4 tw-text-red-100">
            Hello, ${this.name}!
        </p>`
    }
}
