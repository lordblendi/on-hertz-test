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

    // #010a39 => dark blue
    // #cffafe => cyan
    static styles = css`
        .circle {
            background-color: #010a39;
            background:
                /* lighting */
                radial-gradient(
                    100% 100%,
                    rgba(0, 0, 0, 0),
                    #000 10em,
                    rgba(0, 0, 0, 0) 10em
                ),
                /* lines */
                    linear-gradient(
                        #cffafe00 10em,
                        #cffafe 10em,
                        #cffafe 10.1em,
                        #cffafe00 9.9em
                    ),
                linear-gradient(
                    45deg,
                    #cffafe00 14.14em,
                    #cffafe 13.98em,
                    #cffafe 14.2em,
                    #cffafe00 14.04em
                ),
                linear-gradient(
                    90deg,
                    #cffafe00 10em,
                    #cffafe 10em,
                    #cffafe 10.1em,
                    #cffafe00 9.9em
                ),
                linear-gradient(
                    -45deg,
                    #cffafe00 14.04em,
                    #cffafe 14.1em,
                    #cffafe 14.14em,
                    #cffafe00 14.14em
                ),
                /* circles */
                    repeating-radial-gradient(
                        #010a39,
                        #010a39 3.16em,
                        #cffafe 3.2em,
                        #cffafe 3.26em,
                        #010a39 3.3em
                    );
            border-radius: 50%;
            height: 20rem;
            left: 10%;
            position: absolute;
            top: 50px;
            width: 20rem;
        }

        .draggable {
            animation: pulse 5s infinite;
            background-color: #07fff9;
            border-radius: 50%;
            cursor: grab;
            padding: 0.5rem;
            position: absolute;
            z-index: 1;
        }

        .isDragged {
            animation: unset;
            opacity: 0.25;
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255 0.1);
            }

            50% {
                box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
            }

            100% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
            }
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

        // calculate the circle center
        const circleClientRect = this.circleElement.getBoundingClientRect()
        const circleRadius = circleClientRect.width / 2
        const circleCenterX = circleClientRect.left + circleRadius
        const circleCenterY = circleClientRect.top + circleRadius

        // count the center of our red dot
        const draggableClientRect =
            this.draggableElement.getBoundingClientRect()
        const draggableCenterX =
            draggableClientRect.x + draggableClientRect.width / 2
        const draggableCenterY =
            draggableClientRect.y + draggableClientRect.height / 2

        // convert the position to coordinates
        const x = (draggableCenterX - circleCenterX) / circleRadius
        const y = (circleCenterY - draggableCenterY) / circleRadius

        // notify the other element to request an update
        const event = new CustomEvent("coordinateUpdate", {
            bubbles: true,
            composed: true,
            detail: {
                x,
                y,
            },
        })
        this.draggableElement.dispatchEvent(event)
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
