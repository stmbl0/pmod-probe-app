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
        label: string,

        system?: "decimal" | "hex";
        bitOrder?: "LSBF" | "MSBF";
        $bits: Selector|string;
    }

    export let config: WidgetConfig_T|{[key: string]:any};
    export let layout: WidgetLayoutConfig;

    //// Widget Imports ////

    //// Data ////

    const sel = getSelector(config.$bits);
    const handler = new BitFetcher(sel);
    const { bits } = handler;
</script>

<BaseWidget bind:layout>
    <div class="number-widget">
        <div class="widget-label">{config.label}</div>

        <div class="number">
            {config.system == "hex" ? "0x" : ""}{parseInt(
                (config.bitOrder == "LSBF" ? $bits.reverse() : $bits).map(b => b?"1":"0").join(""),
                2).toString(config.system == "hex" ? 16 : 10)
            }
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
        font-size: 18px;
        font-weight: 500;
        color: #67737f;
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>