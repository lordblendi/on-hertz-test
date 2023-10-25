import { css, html, LitElement, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"
import { faVolumeOff } from "@fortawesome/free-solid-svg-icons"
import { litFontawesome } from "@weavedev/lit-fontawesome"

import "./surround-panner-circle"

@customElement("surround-panner-speakers")
export class SurroundPannerSpeakers extends LitElement {
    static styles = css`
        .flex-container {
            position: relative;
            width: 100%;
            height: 200px;
        }

        [data-icon="volume-off"] {
            height: 50px;
        }

        .speaker {
            position: absolute;
        }

        .left {
            left: 10%;
            top: 30%;
            transform: rotate(40deg);
        }
        .center {
            left: 45%;
            transform: rotate(90deg);
        }
        .right {
            right: 10%;
            top: 30%;
            transform: rotate(140deg);
        }
        .surroundLeft {
            left: 10%;
            top: 50%;
            transform: rotate(-40deg);
        }
        .surroundRight {
            right: 10%;
            top: 50%;
            transform: rotate(220deg);
        }
    `

    render(): TemplateResult {
        return html`<div class="flex-container">
                <div class="speaker left">${litFontawesome(faVolumeOff)}</div>
                <div class="speaker center">${litFontawesome(faVolumeOff)}</div>
                <div class="speaker right">${litFontawesome(faVolumeOff)}</div>
            </div>
            <div class="flex-container">
                <div class="speaker surroundLeft">
                    ${litFontawesome(faVolumeOff)}
                </div>
                <div class="speaker surroundRight">
                    ${litFontawesome(faVolumeOff)}
                </div>
            </div>`
    }
}
