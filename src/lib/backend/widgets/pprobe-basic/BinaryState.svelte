<!--
    ### PMod Probe Widget ###

    Widget Name: BinaryState
    Widget ID: pprobe-basic::binary-state

    Description: Shows the state of one bit

    Configuration:
        label: string
        $bits <selector>
-->

<script lang="ts">
    //// Export Info about Widget ////
    export const WIDGET_ID = "pprobe-basic::binary-state";
    export const WIDGET_NAME = "Binary State";

    //// Basic Imports ////
    import { getSelector } from "$lib/backend/project/utils";
    import { BitFetcher } from "$lib/backend/data/dataFetcher";

    import type { Selector } from "$lib/backend/types";
    import type { WidgetLayoutConfig } from "../WidgetConfig";

    //// Configuration ////
    type WidgetConfig_T = {
        label: string,
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="binary-state-widget"
    class:active={$bits[0] == true}

    style:grid-column="{(typeof layout?.pos_x !== "undefined") ? layout.pos_x : ""} {(typeof layout?.size_x !== "undefined") ? `span ${layout.size_x}` : ""}"
    style:grid-row   ="{(typeof layout?.pos_y !== "undefined") ? layout.pos_y : ""} {(typeof layout?.size_y !== "undefined") ? `span ${layout.size_y}` : ""}"
>
    {config.label}
</div>

<style lang="scss">
    .binary-state-widget {
        width: calc(100% - 48px);
        height: calc(100% - 48px);

        padding: 24px;
        border-radius: 8px;

        background-color: #1a2025aa;
        backdrop-filter: blur(2px);
        transition: 0.3s;

        outline: none;
        border: none;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-family: "Roboto";
        font-size: 16px;
        font-weight: 700;
        color: #ffffff;

        &.active {
            background-color: #2c3035;
        }
    }
</style>