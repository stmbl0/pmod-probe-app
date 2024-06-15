<!--
    ### PMod Probe Widget ###

    Widget Name: Switch
    Widget ID: pprobe-basic::switch

    Description: A switch to enable/disable bit(s)

    Configuration:
        label: string
        $bits <selector>
-->

<script lang="ts">
    //// Export Info about Widget ////
    export const WIDGET_ID = "pprobe-basic::switch";
    export const WIDGET_NAME = "Switch";

    //// Basic Imports ////
    import { getSelector } from "$lib/backend/project/utils";
    import { BitWriter } from "$lib/backend/data/dataFetcher";

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
    const handler = new BitWriter(sel);
    const { bits } = handler;


    //// Event Handlers ////
    function onClick() {
        let editedState = ($bits).fill(!$bits[0]);
        bits.set(editedState);
        handler.writeChanges();
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="switch-widget"
    class:active={$bits[0] == true}
    on:click={onClick}

    style:grid-column="{(typeof layout?.pos_x !== "undefined") ? layout.pos_x : ""} {(typeof layout?.size_x !== "undefined") ? `span ${layout.size_x}` : ""}"
    style:grid-row   ="{(typeof layout?.pos_y !== "undefined") ? layout.pos_y : ""} {(typeof layout?.size_y !== "undefined") ? `span ${layout.size_y}` : ""}"
>
    <div class="dot" />

    {config.label}
</div>

<style lang="scss">
    .switch-widget {
        width: calc(100% - 48px);
        height: calc(100% - 48px);

        padding: 24px;
        border-radius: 8px;

        background-color: #1a2025aa;
        backdrop-filter: blur(2px);
        transition: 0.3s;
        cursor: pointer;

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

        &:hover {
            background-color: #1a2025dd;
        }

        &:active {
            background-color: #1a2025ff;
        }

        &.active {
            background-color: #2c3035;
            .dot {
                background-color: #67737f;
                border-color: #67737f;
            }
        }
    }

    .dot {
        width: 0.8em;
        height: 0.8em;

        margin-right: 0.8em;

        background-color: #67737f00;
        border-radius: 50%;
        border: 3px solid #67737f;

        transition: 0.3s;
    }
</style>