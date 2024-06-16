<!--
    ### PMod Probe Widget ###

    Widget Name: Mapping
    Widget ID: pprobe-basic::mapping

    Description: 

    Configuration:
        label <string>
        bitOrder <string>: LSBF / MSBF  (Least/Most Significant Bit First)
        $bits <BitMapping>
-->

<script lang="ts">
    //// Export Info about Widget ////
    export const WIDGET_ID = "pprobe-basic::mapping";
    export const WIDGET_NAME = "Mapping";

    //// Basic Imports ////
    import BaseWidget from "../BaseWidget.svelte";

    import { getSelector } from "$lib/backend/project/utils";
    import { BitFetcher } from "$lib/backend/data/dataFetcher";

    import type { BitMapping } from "$lib/backend/types";
    import type { WidgetLayoutConfig } from "../WidgetConfig";

    //// Configuration ////
    type WidgetConfig_T = {
        label: string,

        bitOrder?: "LSBF" | "MSBF";
        $bits: BitMapping|string;
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
    <div class="mapping-widget">
        <div class="widget-label">{config.label}</div>

        <div class="value">
            {sel.valueMap?.[parseInt((config.bitOrder == "LSBF" ? $bits.reverse() : $bits).map(b => b?"1":"0").join(""), 2).toString()] || "--"}
        </div>
    </div>
</BaseWidget>

<style lang="scss">
    .mapping-widget {
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

    .value {
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