import { css, html, LitElement, TemplateResult } from "lit"
import { customElement, state, query } from "lit/decorators.js"

interface Size {
    width: number
    height: number
    clientTop: number
    clientLeft: number
}

@customElement("surround-panner-circle")
export class SurroundPannerCircle extends LitElement {
    @query(".circle")
    circleElement!: HTMLDivElement

    @query(".draggable")
    draggableElement!: HTMLDivElement

    @state()
    positionClientLeft = -1

    @state()
    positionClientTop = -1

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

        .draggable {
            position: absolute;
            padding: 0.5rem;
            background-color: red;
            border-radius: 50%;
            cursor: grab;
            z-index: 1;
        }
    `

    getClientParameters(element: HTMLDivElement): Size {
        return {
            clientTop: element.clientTop,
            clientLeft: element.clientLeft,
            height: element.clientHeight,
            width: element.clientWidth,
        }
    }

    render(): TemplateResult {
        return html`<div class="circle" dropzone="move">
            <div class="draggable" draggable="true"></div>
        </div>`
    }

    firstUpdated(): void {
        const circleParameters = this.getClientParameters(this.circleElement)
        const draggableParameters = this.getClientParameters(
            this.draggableElement,
        )

        // default place it in the middle of the circle
        this.positionClientLeft =
            circleParameters.width / 2 - draggableParameters.width / 2
        this.positionClientTop =
            circleParameters.height / 2 - draggableParameters.height / 2
    }

    updated(changedProperties: Map<string, unknown>): void {
        // if any of the position properties have changed, we have to update it
        if (
            changedProperties.has("positionClientLeft") ||
            changedProperties.has("positionClientTop")
        ) {
            this.draggableElement.style.left = `${this.positionClientLeft}px`
            this.draggableElement.style.top = `${this.positionClientTop}px`
        }
    }
}
