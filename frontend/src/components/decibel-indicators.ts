import { Task } from "@lit/task"
import { css, html, LitElement, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement("decibel-indicators")
export class DecibelIndicators extends LitElement {
    connectedCallback(): void {
        super.connectedCallback()
        this.fetchData()
    }

    @property({ type: Object })
    data: Decibels = {
        left: -1,
        right: -1,
        center: -1,
        surroundLeft: -1,
        surroundRight: -1,
    }

    fetchData(): void {
        fetch("http://localhost:5000")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then((data) => {
                this.data = data
                console.log("Success:", data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    static styles = css`
        ul {
            list-style-type: none;
            text-align: right;
        }
        li {
            display: flex;
            width: 100%;
            justify-content: space-between;
        }
        span {
            min-width: 20px;
            text-align: right;
        }
    `

    render(): TemplateResult {
        return html`<ul>
            <li>
                L:&nbsp;
                <span>${this.data.left}</span>
                &nbsp;dB
            </li>
            <li>
                R:&nbsp;
                <span>${this.data.right}</span>
                &nbsp;dB
            </li>
            <li>
                C:&nbsp;
                <span>${this.data.center}</span>
                &nbsp;dB
            </li>
            <li>
                SL:&nbsp;
                <span>${this.data.surroundLeft}</span>
                &nbsp;dB
            </li>
            <li>
                SR:&nbsp;
                <span>${this.data.surroundRight}</span>
                &nbsp;dB
            </li>
        </ul>`
    }
}
