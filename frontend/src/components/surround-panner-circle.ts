import { css, html, LitElement, TemplateResult } from "lit"
import { customElement, query } from "lit/decorators.js"

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

        .isDragged {
            opacity: 0.25;
        }
    `

    getClientParameters(element: HTMLDivElement): Size {
        return {
            // should be absolute positioned for circle placement
            clientTop: element.clientTop,
            clientLeft: element.clientLeft,
            height: element.getBoundingClientRect().height,
            width: element.getBoundingClientRect().width,
        }
    }

    setNewPosition(left: number, top: number): void {
        this.draggableElement.style.left = `${left}px`
        this.draggableElement.style.top = `${top}px`
    }

    connectedCallback(): void {
        super.connectedCallback()
        this.addEventListener("drag", this.onDragStart)
        this.addEventListener("dragend", this.onDragEnd)
    }

    disconnectedCallback(): void {
        this.removeEventListener("drag", this.onDragStart)
        this.removeEventListener("dragend", this.onDragEnd)
        super.disconnectedCallback()
    }

    onDragStart(): void {
        this.draggableElement.classList.add("isDragged")
    }

    onDragEnd(event: DragEvent): void {
        this.draggableElement.classList.remove("isDragged")

        const draggableParameters = this.getClientParameters(
            this.draggableElement,
        )

        const circleClientRect = this.circleElement.getBoundingClientRect()

        const x = event.clientX
        const y = event.clientY

        const radius = circleClientRect.width / 2
        const circleCenterX = circleClientRect.left + radius
        const circleCenterY = circleClientRect.top + radius

        // is point within circle
        // (x - centerX)² + (y - centerY)² < radius²
        if (
            Math.pow(x - circleCenterX, 2) + Math.pow(y - circleCenterY, 2) <=
            Math.pow(radius, 2)
        ) {
            this.setNewPosition(
                x - circleClientRect.left - draggableParameters.width / 2,
                y - circleClientRect.top - draggableParameters.width / 2,
            )
        }
    }

    render(): TemplateResult {
        return html`<div class="circle">
            <div class="draggable" draggable="true"></div>
        </div>`
    }

    firstUpdated(): void {
        const circleParameters = this.getClientParameters(this.circleElement)
        const draggableParameters = this.getClientParameters(
            this.draggableElement,
        )

        // default place it in the middle of the circle
        this.setNewPosition(
            circleParameters.width / 2 - draggableParameters.width / 2,
            circleParameters.height / 2 - draggableParameters.height / 2,
        )
    }
}
