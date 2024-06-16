<!--
    ### PMod Probe Widget ###

    Widget Name: Bits
    Widget ID: pprobe-basic::bits
    Required Module: --

    Description: A Widget to visualize / set a couple of bits.

    Configuration:
        mode <string>: read / write
        bitOrder <string>: LSBF / MSBF  (Least/Most Significant Bit First)
        $bits <selector>
-->

<script lang="ts">
    //// Export Info about Widget ////
    export const WIDGET_ID = "pprobe-basic::bits";
    export const WIDGET_NAME = "Bits";

    //// Basic Imports ////
    import BaseWidget from "../BaseWidget.svelte";

    import { getSelector } from "$lib/backend/project/utils";
    import { BitFetcher, BitWriter } from "$lib/backend/data/dataFetcher";

    import type { Selector } from "$lib/backend/types";
    import type { WidgetLayoutConfig } from "../WidgetConfig";

    //// Configuration ////
    type WidgetConfig_T = {
        label: string,

        mode: "read" | "write";
        bitOrder?: "LSBF" | "MSBF";
        $bits: Selector|string;
    }

    export let config: WidgetConfig_T|{[key: string]:any};
    export let layout: WidgetLayoutConfig;

    //// Widget Imports ////

    //// Data ////

    const sel = getSelector(config.$bits);
    const handler = config.mode == "read" ? new BitFetcher(sel) : new BitWriter(sel);
    const { bits } = handler;


    //// Event Handlers ////
    function onBitClick(bitIndex: number) {
        let editedState = $bits;
        editedState[bitIndex] = !editedState[bitIndex];

        bits.set(editedState);
        (handler as BitWriter).writeChanges();
    }
</script>

<BaseWidget bind:layout>
    <div class="bits-widget">
        <div class="widget-label">{config.label}</div>

        <div class="bit-list" class:reversed={config.bitOrder == "LSBF"}>
            {#each $bits as bit, i}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="bit" class:editable={config.mode == "write"} on:click={() => onBitClick(i)}>
                    {bit ? 1 : 0}
                </div>
            {/each}
        </div>
    </div>
</BaseWidget>

<style lang="scss">
    .bits-widget {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }

    .widget-label {
        width: 100%;

        font-family: "Roboto";
        font-size: 16px;
        font-weight: 800;
        color: #ffffff;

        padding: 0.3em 0em;
    }

    .bit-list {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 2px;

        &.reversed {
            flex-direction: row-reverse;
        }

        .bit {
            width: calc(100% - 8px);
            padding: 4px 4px;

            border-radius: 4px;

            font-family: "Roboto";
            font-size: 18px;
            font-weight: 500;
            color: #67737f;
            text-align: center;
        }

        .bit.editable {
            background-color: #262a2e;
            transition: 0.2s;

            cursor: pointer;

            &:hover {
                background-color: #2e3236;
            }
        }
    }
</style>