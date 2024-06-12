<script lang="ts">
    import BlockViewer from "./BlockViewer.svelte";
    import { probeTargetInputBlockCount, probeTargetInputData, probeTargetOutputBlockCount, probeTargetOutputData } from "$lib/backend/globals";
    import type { BulkBitEdit } from "$lib/backend/types";
    import type { ProbeInterface } from "$lib/backend/ProbeInterface";

    export let inputEdits: BulkBitEdit = [];
    export let probeInterface: ProbeInterface;

    function applyEdits() {
        probeInterface.writeBulkTargetInput(inputEdits);

        inputEdits = [];
    }
</script>

<div class="io-blocks-tab">
    <div class="half">
        <div class="block-field">
            <div class="field-head">
                <div class="field-title">FPGA -&#62; Probe</div>
                <div class="size">
                    <div class="block-count">{$probeTargetOutputBlockCount} Blocks</div>
                    <div class="dot" />
                    <div class="bit-count">{$probeTargetOutputBlockCount*3} Bits</div>
                </div>
            </div>

            <BlockViewer data={$probeTargetOutputData}/>
        </div>
    </div>

    <div class="half">
        <div class="block-field">
            <div class="field-head">
                <div class="field-title">Probe -&#62; FPGA</div>
                <div class="right">
                    <button
                        on:click={applyEdits}
                        disabled={inputEdits.length==0}
                    >
                        Apply
                    </button>

                    <div class="size">
                        <div class="block-count">{$probeTargetInputBlockCount} Blocks</div>
                        <div class="dot" />
                        <div class="bit-count">{$probeTargetInputBlockCount*3} Bits</div>
                    </div>
                </div>
            </div>

            <BlockViewer data={$probeTargetInputData} readOnly={false} bind:edits={inputEdits}/>
        </div>
    </div>
</div>

<style lang="scss">
    .io-blocks-tab {
        width: calc(100% - 48px);
        height: 100%;

        margin-top: 24px;

        backdrop-filter: blur(2px);

        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-evenly;
        gap: 24px;
    }

    .half {
        width: 50%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .block-field {
        width: calc(100% - 48px);

        padding: 24px;
        border-radius: 8px;

        background-color: #1a2025aa;
        backdrop-filter: blur(2px);

        display: flex;
        flex-direction: column;
        align-items: center;

        .field-head {
            width: 100%;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            margin-bottom: 16px;

            .field-title {
                font-family: "Roboto";
                font-size: 16px;
                font-weight: 700;
                color: #d9dcdd;

                padding: 0.5em 0em;
            }

            .right {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 16px;

                button {
                    height: calc(100% - 1.2em);

                    background-color: #2c3035;
                    background-color: #e4956833;

                    font-family: "Roboto";
                    font-size: 14px;
                    font-weight: 600;
                    color: #e49568;

                    padding: 0.6em 2em;
                    outline: none;
                    border: none;
                    border-radius: 8px;

                    cursor: pointer;
                    transition: 0.2s;

                    &:hover {
                        background-color: #31353a;
                        background-color: #e4956855;
                    }

                    &:disabled {
                        cursor: default;
                        background-color: #262a2e;
                        color: #767d80;
                    }
                }
            }

            .size {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 6px;

                font-family: "Roboto";
                font-weight: 500;
                font-size: 14px;
                color: #67737f;

                .dot {
                    width: 0.3em;
                    height: 0.3em;
                    border-radius: 50%;
                    background-color: #67737f;
                }
            }
        }
    }
</style>