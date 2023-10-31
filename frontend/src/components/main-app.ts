import { css, html, LitElement, TemplateResult } from "lit"
import { customElement, state } from "lit/decorators.js"

import "./decibel-indicators"
import "./surround-panner"

@customElement("main-app")
export class MainApp extends LitElement {
    @state()
    coordinateX: number = 0

    @state()
    coordinateY: number = 0

    static styles = css`
        div {
            background-color: lightgray;
            display: flex;
            padding: 2rem;
            align-items: center;
            justify-content: space-between;
            min-width: 1000px;
            width: 50%;
        }
    `

    connectedCallback(): void {
        super.connectedCallback()
        this.addEventListener("coordinateUpdate", this.onCoordinateUpdate)
    }

    disconnectedCallback(): void {
        this.removeEventListener("coordinateUpdate", this.onCoordinateUpdate)
        super.disconnectedCallback()
    }

    onCoordinateUpdate(event: Event): void {
        const detail = (<CustomEvent>event).detail
        if (!!detail) {
            this.coordinateX = detail.x
            this.coordinateY = detail.y
        }
    }

    render(): TemplateResult {
        return html`<div>
            <surround-panner></surround-panner>
            <decibel-indicators
                .coordinateX="${this.coordinateX}"
                .coordinateY="${this.coordinateY}"
            ></decibel-indicators>
        </div> `
    }
}
