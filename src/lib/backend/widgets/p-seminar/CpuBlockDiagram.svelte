<script lang="ts">
    //// Export Info about Widget ////
    export const WIDGET_ID = "p-seminar::cpu-block-diagram";
    export const WIDGET_NAME = "CPU Block Diagram";

    //// Basic Imports ////

    import { getSelector } from "$lib/backend/project/utils";
    import { BitFetcher } from "$lib/backend/data/dataFetcher";

    import type { Selector } from "$lib/backend/types";
    import type { WidgetLayoutConfig } from "../WidgetConfig";

    //// Configuration ////
    type WidgetConfig_T = {
    }

    export let config: WidgetConfig_T|{[key: string]:any};
    export let layout: WidgetLayoutConfig;

    //// Widget Imports ////

    //// Data ////

    const irSelector = getSelector("IR_Data");

    const dataBusBits = new BitFetcher(getSelector("DataBus")).bits; 
    const addressBusBits = new BitFetcher(getSelector("AddressBus")).bits; 
    const pcBits = new BitFetcher(getSelector("PC_Data")).bits; 
    const accBits = new BitFetcher(getSelector("ACC_Data")).bits; 
    const drBits = new BitFetcher(getSelector("DR_Data")).bits; 
    const zcBits = new BitFetcher(getSelector("Flag_Data")).bits; 
    const irBits = new BitFetcher(getSelector("IR_Data")).bits; 
    const controlState = new BitFetcher(getSelector("dev_ctrl_state_cnt")).bits; 
    const controlClear = new BitFetcher(getSelector("dev_ctrl_clear")).bits; 
    const memoryWE = new BitFetcher(getSelector("memory_WE")).bits;
    const drLoad = new BitFetcher(getSelector("dev_dr_load")).bits;
    const irLoad = new BitFetcher(getSelector("dev_ir_load")).bits;
    const accLoad = new BitFetcher(getSelector("dev_ac_load")).bits;
    const zcLoad = new BitFetcher(getSelector("dev_zc_load")).bits;
    const thLoad = new BitFetcher(getSelector("dev_th_load")).bits;
    const tlLoad = new BitFetcher(getSelector("dev_tl_load")).bits;
    const aluOP = new BitFetcher(getSelector("dev_alu_op")).bits;
    const aluR = new BitFetcher(getSelector("ALU_O")).bits;
    const mux = new BitFetcher(getSelector("dev_mux_sel")).bits;

    function formatBitsToHex(bits: boolean[], targetDigits: number = 2) {
        const value = parseInt(bits.map(b => b?"1":"0").join(""), 2);
        return `0x${value.toString(16).padStart(targetDigits, "0")}`;
    }
    function formatBits(bits: boolean[], targetDigits: number = 2) {
        return bits.map(b => b?"1":"0").join("").padStart(targetDigits, "0");
    }
    function formatBitsToDec(bits: boolean[], targetDigits: number = 2) {
        const value = parseInt(bits.map(b => b?"1":"0").join(""), 2);
        return `${value.toString(10).padStart(targetDigits, "0")}`;
    }
    function bitsToDec(bits: boolean[]) {
        return parseInt(bits.map(b => b?"1":"0").join(""), 2);
    }
    function formatInstruction(bits: boolean[]) {
        const value = bitsToDec(bits);
        return irSelector.valueMap?.[value.toString()] || "--";
    }
</script>

<div
    class="block-diagram-widget"

    style:grid-column="{(typeof layout?.pos_x !== "undefined") ? layout.pos_x : ""} {layout?.pos_x&&layout?.size_x?"/":""} {(typeof layout?.size_x !== "undefined") ? `span ${layout.size_x}` : ""}"
    style:grid-row   ="{(typeof layout?.pos_y !== "undefined") ? layout.pos_y : ""} {layout?.pos_y&&layout?.size_y?"/":""} {(typeof layout?.size_y !== "undefined") ? `span ${layout.size_y}` : ""}"
>
    <svg width="1080" height="785" viewBox="0 0 1080 785" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_30_5)">
            <rect width="1080" height="785" rx="8" fill="#0E1113"/>
            <rect x="363" y="355" width="88" height="48" fill={bitsToDec($mux)==0 ? "#32353a" : "#1C1E22"}/>
            <rect x="641" y="355" width="88" height="48" fill={$thLoad[0]||$tlLoad[0] ? "#32353a" : "#1C1E22"}/>
            <rect x="363" y="679" width="88" height="48" fill={bitsToDec($mux)==1 ? "#32353a" : "#1C1E22"}/>
            <rect x="564" y="679" width="88" height="48" fill={bitsToDec($mux)==3 ? "#32353a" : "#1C1E22"}/>
            <rect x="617" y="565" width="48" height="114" fill="#1C1E22"/>
            <rect x="38" y="355" width="88" height="48" fill={$accLoad[0] ? "#32353a" : "#1C1E22"}/>
            <rect x="38" y="517" width="88" height="48" fill={$irLoad[0] ? "#32353a" : "#1C1E22"}/>
            <rect x="362" y="94" width="88" height="48" fill={$zcLoad[0] ? "#32353a" : "#1C1E22"}/>
            <rect x="38" y="679" width="88" height="48" fill={$drLoad[0] ? "#32353a" : "#1C1E22"}/>
            <rect x="594" y="517" width="23" height="48" fill="url(#paint0_linear_30_5)"/>
            <path d="M16 250C16 245.582 19.5817 242 24 242H657C661.418 242 665 245.582 665 250V290H16V250Z" fill="#32353A"/>
            <path d="M16 290H64V761C64 765.418 60.4183 769 56 769H24C19.5817 769 16 765.418 16 761V290Z" fill="#32353A"/>
            <path d="M617 290H665V557C665 561.418 661.418 565 657 565H617V290Z" fill="#32353A"/>
            <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="267.398" y="271.469">8-Bit Databus</tspan></text>
            <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="900" letter-spacing="0em"><tspan x="378.453" y="271.469">{formatBitsToHex($dataBusBits)}</tspan></text>
            <g clip-path="url(#clip1_30_5)">
                <rect x="688" y="16" width="376" height="274" rx="16" fill="#26292D"/>
                <rect x="688" y="16" width="376" height="274" rx="16" fill="url(#paint1_linear_30_5)"/>
                <rect x="688" y="16" width="376" height="274" rx="16" fill="#E49668"/>
                <g filter="url(#filter0_i_30_5)">
                    <rect x="692" y="20" width="368" height="266" rx="16" fill="#26292D"/>
                </g>
                <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="849.312" y="121.969">Control</tspan></text>
                <text fill="#6B6F78" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="784.227" y="196.469">State</tspan></text>
                <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em" text-anchor="middle"><tspan x="803" y="173.203">{bitsToDec($controlState)<2 ? `Fetch ${bitsToDec($controlState)+1}` : `${formatInstruction($irBits)} ${bitsToDec($controlState)-1}`}</tspan></text>
                <text fill="#6B6F78" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="929.805" y="196.469">Clear</tspan></text>
                <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em" text-anchor="middle"><tspan x="948.5" y="173.203">{$controlClear[0] ? "Yes" : "No"}</tspan></text>
            </g>
            <g clip-path="url(#clip2_30_5)">
                <rect x="16" y="16" width="376" height="203" rx="16" fill="#26292D"/>
                <rect x="20" y="20" width="368" height="195" rx="16" fill="#26292D"/>
                <rect x="20" y="20" width="368" height="195" rx="16" fill="#0E1113"/>
                <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="128.586" y="90.9688">Arithmetic Logic Unit</tspan></text>
                <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em" text-anchor="middle">
                    <tspan x="204" y="131.703">
                        {#if bitsToDec($aluOP) == 0}
                            Zero
                        {:else if bitsToDec($aluOP) == 1}
                            Passthrough
                        {:else if bitsToDec($aluOP) == 7}
                            !{bitsToDec($accBits)}
                        {:else}
                            {bitsToDec($accBits)}
                            {#if bitsToDec($aluOP) == 2}
                                +
                            {:else if bitsToDec($aluOP) == 3}
                                -
                            {:else if bitsToDec($aluOP) == 4}
                                &
                            {:else if bitsToDec($aluOP) == 5}
                                |
                            {:else if bitsToDec($aluOP) == 6}
                                ^
                            {:else if bitsToDec($aluOP) == 8}
                                &#62;
                            {:else if bitsToDec($aluOP) == 9}
                                &#8805;
                            {:else if bitsToDec($aluOP) == 10}
                                &#60;
                            {:else if bitsToDec($aluOP) == 11}
                                &#8804;
                            {:else if bitsToDec($aluOP) == 12}
                                ==
                            {/if}
                            {bitsToDec($dataBusBits)}
                        {/if}
                    </tspan>
                </text>
                <text fill="#6B6F78" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em" text-anchor="middle">
                    <tspan x="204" y="157.469">
                        {#if bitsToDec($aluOP) == 0}
                            <!-- Zero operation -->
                            0
                        {:else if bitsToDec($aluOP) == 1}
                            <!-- Passthrough operation -->
                            {formatBitsToHex($dataBusBits, 2)}
                        {:else if bitsToDec($aluOP) == 2 || bitsToDec($aluOP) == 3}
                            <!-- Arithmetic operations -->
                            {formatBitsToDec($aluR, 1)}
                        {:else if bitsToDec($aluOP) >= 4 && bitsToDec($aluOP) <= 7}
                            <!-- Bitwise operations -->
                            {formatBits($aluR, 8)}
                        {:else if bitsToDec($aluOP) >= 8 && bitsToDec($aluOP) <= 12}
                            <!-- Comparison operations -->
                            {bitsToDec($aluR) > 0 ? "True" : "False"}
                        {/if}
                    </tspan>
                </text>
            </g>
            <rect x="419" y="16" width="246" height="203" rx="16" fill="#26292D"/>
            <rect x="423" y="20" width="238" height="195" rx="16" fill="#26292D"/>
            <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="494.406" y="86.9688">Flag Register</tspan></text>
            <text fill="#6B6F78" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="480.203" y="161.469">Zero</tspan></text>
            <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em" text-anchor="middle"><tspan x="496.5" y="138.203">{$zcBits[0] ? "Yes" : "No"}</tspan></text>
            <text fill="#6B6F78" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="568.312" y="161.469">Carry</tspan></text>
            <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em" text-anchor="middle"><tspan x="587.5" y="138.203">{$zcBits[1] ? "Yes" : "No"}</tspan></text>
            <g clip-path="url(#clip3_30_5)">
                <rect x="419" y="313" width="175" height="456" rx="16" fill="#26292D"/>
                <rect x="423" y="317" width="167" height="448" rx="16" fill="#26292D"/>
                <rect x="423" y="317" width="167" height="448" rx="16" fill="#0E1113"/>
                <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="466.914" y="539.469">Multiplexer</tspan></text>
            </g>
            <g clip-path="url(#clip4_30_5)">
                <rect x="96" y="641" width="292" height="124" rx="16" fill="#26292D"/>
                <rect x="92" y="637" width="300" height="132" rx="16" fill="#26292D"/>
                <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="193.688" y="689.969">Data Register</tspan></text>
                <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em" text-anchor="middle"><tspan x="242" y="723.703">{formatBitsToDec($drBits, 3)}</tspan></text>
            </g>
            <g clip-path="url(#clip5_30_5)">
                <rect x="92" y="475" width="300" height="132" rx="16" fill="#26292D"/>
                <rect x="96" y="479" width="292" height="124" rx="16" fill="#26292D"/>
                <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="171.547" y="527.969">Instruction Register</tspan></text>
                <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em" text-anchor="middle"><tspan x="242" y="561.703">{formatInstruction($irBits)}</tspan></text>
            </g>
            <rect x="92" y="313" width="300" height="132" rx="16" fill="#26292D"/>
            <rect x="96" y="317" width="292" height="124" rx="16" fill="#26292D"/>
            <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="196.172" y="365.969">Accumulator</tspan></text>
            <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em" text-anchor="middle"><tspan x="242" y="399.703">{formatBitsToDec($accBits, 3)}</tspan></text>
            <g clip-path="url(#clip6_30_5)">
                <rect x="617" y="637" width="447" height="132" rx="16" fill="#26292D"/>
                <rect x="617" y="637" width="447" height="132" rx="16" fill="#4B4B4B" fill-opacity="0.7"/>
                <g filter="url(#filter1_i_30_5)">
                    <rect x="621" y="641" width="439" height="124" rx="16" fill="#26292D"/>
                </g>
                <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="795.117" y="693.969">4kB Memory</tspan></text>
                <text fill="{$memoryWE[0] ? "#E49668": "#6B6F78"}" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="900" letter-spacing="0em"><tspan x="794.984" y="724.469">Write Enable</tspan></text>
            </g>
            <g clip-path="url(#clip7_30_5)">
                <rect x="688" y="313" width="376" height="294" rx="16" fill="#26292D"/>
                <rect x="688" y="313" width="376" height="294" rx="16" fill="#4B4B4B" fill-opacity="0.7"/>
                <g filter="url(#filter2_i_30_5)">
                    <rect x="692" y="317" width="368" height="286" rx="16" fill="#26292D"/>
                </g>
                <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="817.727" y="428.969">Address Control</tspan></text>
                <text fill="#6B6F78" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="741.672" y="503.469">Program Counter</tspan></text>
                <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em"><tspan x="762.008" y="480.203">{formatBitsToHex($pcBits, 4)}</tspan></text>
                <text fill="#6B6F78" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="903.289" y="503.469">Address Bus</tspan></text>
                <text fill="#E49668" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="24" font-weight="900" letter-spacing="0em"><tspan x="907.508" y="480.203">{formatBitsToHex($addressBusBits, 4)}</tspan></text>
            </g>
        </g>
        <defs>
            <filter id="filter0_i_30_5" x="692" y="20" width="368" height="270" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="13.15"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_30_5"/>
            </filter>
            <filter id="filter1_i_30_5" x="621" y="641" width="439" height="128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="13.15"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_30_5"/>
            </filter>
            <filter id="filter2_i_30_5" x="692" y="317" width="368" height="290" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="13.15"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_30_5"/>
            </filter>
            <linearGradient id="paint0_linear_30_5" x1="617" y1="541" x2="599" y2="541" gradientUnits="userSpaceOnUse">
                <stop stop-color="#32353A"/>
                <stop offset="1" stop-color="#292B30"/>
            </linearGradient>
            <linearGradient id="paint1_linear_30_5" x1="767" y1="-26" x2="983.5" y2="355" gradientUnits="userSpaceOnUse">
                <stop stop-color="#5F5CCD"/>
                <stop offset="1" stop-color="#9B5CCD"/>
            </linearGradient>
            <clipPath id="clip0_30_5">
                <rect width="1080" height="785" fill="white"/>
            </clipPath>
            <clipPath id="clip1_30_5">
                <rect width="376" height="274" fill="white" transform="translate(688 16)"/>
            </clipPath>
            <clipPath id="clip2_30_5">
                <rect width="376" height="203" fill="white" transform="translate(16 16)"/>
            </clipPath>
            <clipPath id="clip3_30_5">
                <rect x="419" y="313" width="175" height="456" rx="16" fill="white"/>
            </clipPath>
            <clipPath id="clip4_30_5">
                <rect width="300" height="132" fill="white" transform="translate(92 637)"/>
            </clipPath>
            <clipPath id="clip5_30_5">
                <rect width="300" height="132" fill="white" transform="translate(92 475)"/>
            </clipPath>
            <clipPath id="clip6_30_5">
                <rect width="447" height="132" fill="white" transform="translate(617 637)"/>
            </clipPath>
            <clipPath id="clip7_30_5">
                <rect width="376" height="294" fill="white" transform="translate(688 313)"/>
            </clipPath>
        </defs>
    </svg>
        
</div>

<style lang="scss">
    .block-diagram-widget {
        width: calc(100% - 48px);
        height: calc(100% - 32px);

        padding: 16px 24px;
        border-radius: 8px;

        //background-color: #1a2025aa;
        //backdrop-filter: blur(2px);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    svg {
        width: 100%;
    }
</style>