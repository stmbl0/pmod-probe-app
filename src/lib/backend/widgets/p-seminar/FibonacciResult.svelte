<!--
    ### PMod Probe Widget ###

    Widget Name: Number
    Widget ID: pprobe-basic::number

    Description: A Widget to show a number (decimal / hexadecimal).

    Configuration:
        label <string>
        system <string>: decimal / hex (default: decimal)
        bitOrder <string>: LSBF / MSBF  (Least/Most Significant Bit First)
        $bits <selector>
-->

<script lang="ts">
    //// Export Info about Widget ////
    export const WIDGET_ID = "pprobe-basic::number";
    export const WIDGET_NAME = "Number";

    //// Basic Imports ////
    import BaseWidget from "../BaseWidget.svelte";

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

    let value = 0;

    const result = new BitFetcher(getSelector("ACC_Data")).bits;
    const pc = new BitFetcher(getSelector("PC_Data")).bits;

    function bitsToDec(bits: boolean[]) {
        return parseInt(bits.map(b => b?"1":"0").join(""), 2);
    }

    pc.subscribe((v) => {
        if(bitsToDec(v) == 0x14) {
            value = bitsToDec($result);
        }
    })
</script>

<BaseWidget bind:layout>
    <div class="number-widget">
        <div class="widget-label">Fibonacci Result</div>

        <div class="number">
            {value}
        </div>
    </div>
</BaseWidget>

<style lang="scss">
    .number-widget {
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

        display: flex;
        align-items: center;
        justify-content: center;

        font-family: "Roboto";
        font-size: 16px;
        font-weight: 800;
        color: #ffffff;

        padding: 0.3em 0em;
    }

    .number {
        height: 100%;
        height: 100%;

        font-family: "Roboto";
        font-size: 70px;
        font-weight: 500;
        color: #67737f;
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>