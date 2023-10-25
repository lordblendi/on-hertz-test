import { css, html, LitElement, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"

import "./decibel-indicators"
import "./surround-panner"

@customElement("main-app")
export class MainApp extends LitElement {
    static styles = css`
        div {
            background-color: lightgray;
            display: flex;
            padding: 2rem;
            width: 100%;
        }
    `

    render(): TemplateResult {
        return html`<div>
            <surround-panner></surround-panner>
            <decibel-indicators></decibel-indicators>
        </div> `
    }
}
