import { html, LitElement, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"
import Chart from "chart.js/auto"

@customElement("decibel-indicators")
export class DecibelIndicators extends LitElement {
    connectedCallback(): void {
        super.connectedCallback()
        this.fetchData()
    }

    @property({ type: Object })
    decibelChart?: Chart

    @property({ type: Number })
    coordinateX: number = 0

    @property({ type: Number })
    coordinateY: number = 0

    @property({ type: Array })
    data: DecibelGraphElement[] = []

    fetchData(): void {
        fetch(
            `http://localhost:5000?x=${this.coordinateX}&y=${this.coordinateY}`,
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then((data: Decibels) => {
                const newData = []
                newData.push({ label: "SL", value: data.surroundLeft })
                newData.push({ label: "L", value: data.left })
                newData.push({ label: "C", value: data.center })
                newData.push({ label: "R", value: data.right })
                newData.push({ label: "SR", value: data.surroundRight })

                this.data = newData
                this.renderChart()
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    renderChart(): void {
        const element = <HTMLCanvasElement>(
            this.renderRoot.querySelector("#decibelChart")
        )

        if (!!element) {
            const ctx = element.getContext("2d")

            if (!!ctx) {
                const labels = this.data.map((d) => d.label)
                const values = this.data.map((d) => d.value)

                this.decibelChart?.destroy()

                this.decibelChart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: ["#e0f2fe"],
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            title: {
                                display: true,
                                position: "bottom",
                                text: "Current decibel values",
                                color: "white",
                            },
                        },
                        scales: {
                            y: {
                                border: {
                                    display: false,
                                },
                                grid: {
                                    color: "#60a5fa",
                                },
                                min: 0,
                                max: 120,
                                ticks: {
                                    stepSize: 20,
                                    color: "white",
                                },
                            },
                            x: {
                                border: {
                                    display: false,
                                },
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    color: "white",
                                },
                            },
                        },
                    },
                })
            }
        }
    }

    render(): TemplateResult {
        return html`<canvas
            id="decibelChart"
            width="400"
            height="400"
        ></canvas>`
    }

    protected firstUpdated(): void {
        this.fetchData()
    }

    updated(changedProperties: Map<string, unknown>): void {
        if (
            changedProperties.has("coordinateX") ||
            changedProperties.has("coordinateY")
        ) {
            this.fetchData()
        }
    }
}
