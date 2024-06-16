<!--
    ### PMod Probe Widget ###

    Widget Name: Button
    Widget ID: pprobe-basic::button
    Required Module: --

    Description: A button to enable bit(s) for a short period of time

    Configuration:
        $bits <selector>
-->

<script lang="ts">
    //// Export Info about Widget ////
    export const WIDGET_ID = "pprobe-basic::button";
    export const WIDGET_NAME = "Button";

    //// Basic Imports ////
    import BaseWidget from "../BaseWidget.svelte";

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
        let editedState = ($bits).fill(true);
        bits.set(editedState);
        handler.writeChanges();

        setTimeout(() => {
            let editedState = ($bits).fill(false);
            bits.set(editedState);
            handler.writeChanges();
        }, 150);
    }
</script>

<button
    on:click={onClick}

    style:grid-column="{(typeof layout?.pos_x !== "undefined") ? layout.pos_x : ""} {(typeof layout?.size_x !== "undefined") ? `span ${layout.size_x}` : ""}"
    style:grid-row   ="{(typeof layout?.pos_y !== "undefined") ? layout.pos_y : ""} {(typeof layout?.size_y !== "undefined") ? `span ${layout.size_y}` : ""}"
>
    {config.label}
</button>

<style lang="scss">
    button {
        width: 100%;
        height: 100%;

        padding: 24px 24px;
        border-radius: 8px;

        background-color: #1a202500;
        backdrop-filter: blur(2px);
        transition: 0.3s;
        cursor: pointer;

        outline: none;
        border: 3px solid #1a2025ff;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        font-family: "Roboto";
        font-size: 16px;
        font-weight: 700;
        color: #ffffff;

        &:hover {
            background-color: #1a202533;
            border-radius: 16px;
        }

        &:active {
            background-color: #1a2025aa;
        }
    }
</style>