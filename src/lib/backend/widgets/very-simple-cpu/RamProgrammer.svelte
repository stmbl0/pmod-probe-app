<!--
    ### PMod Probe Widget ###

    Widget Name: RAM Programmer
    Widget ID: very-simple-cpu::programmer

    Description: A Widget to upload data to the RAM of the very simple cpu

    Configuration:
        $programming_en <selector>
        $programming_address <selector>
        $programming_data <selector>
-->

<script lang="ts">
    //// Export Info about Widget ////
    export const WIDGET_ID = "very-simple-cpu::programmer";
    export const WIDGET_NAME = "RAM Programmer";

    //// Basic Imports ////
    import BaseWidget from "../BaseWidget.svelte";

    import { getSelector } from "$lib/backend/project/utils";
    import { BitWriter } from "$lib/backend/data/dataFetcher";

    import type { Selector } from "$lib/backend/types";
    import type { WidgetLayoutConfig } from "../WidgetConfig";

    //// Configuration ////
    type WidgetConfig_T = {
        $clk: Selector|string;
        $programming_en: Selector|string;
        $programming_address: Selector|string;
        $programming_data: Selector|string;
    }

    export let config: WidgetConfig_T|{[key: string]:any};
    export let layout: WidgetLayoutConfig;

    //// Widget Imports ////

    //// Data ////

    export let enteredData: string = "";
    export let isProgramming: boolean = false;

    const clk_sel = getSelector(config.$clk);
    const pe_sel = getSelector(config.$programming_en);
    const pa_sel = getSelector(config.$programming_address);
    const pd_sel = getSelector(config.$programming_data);

    const clk_writer = new BitWriter(clk_sel);
    const pe_writer = new BitWriter(pe_sel);
    const pa_writer = new BitWriter(pa_sel);
    const pd_writer = new BitWriter(pd_sel);


    //// Event Handlers ////
    function start() {
        isProgramming = true;

        let dataBinary: number[] = [];
        for(var i=0; i<Math.floor(enteredData.length/2); i++) {
            var substr = enteredData.substring(i*2, i*2+2);
            var parsed = parseInt(substr, 16);
            dataBinary.push(parsed);
        }

        console.log("programming data:", dataBinary);

        clk_writer.bits.set(clk_writer.bitsArray.fill(false));
        clk_writer.writeChanges();
        pe_writer.bits.set(pe_writer.bitsArray.fill(true));
        pe_writer.writeChanges();
        pa_writer.bits.set(pa_writer.bitsArray.fill(false));
        pa_writer.writeChanges();
        pd_writer.bits.set(pd_writer.bitsArray.fill(false));
        pd_writer.writeChanges();

        setTimeout(() => {
            program(dataBinary);
        }, 300);
    }

    function program(data: number[]) {
        var address = 0;

        var int = setInterval(() => {
            clk_writer.bits.set(clk_writer.bitsArray.fill(true));
            clk_writer.writeChanges();

            pa_writer.bits.set(address.toString(2).padStart(8, "0").split("").map(b => b=="1"));
            pa_writer.writeChanges();
            pd_writer.bits.set(data[address].toString(2).padStart(8, "0").split("").map(b => b=="1"));
            pd_writer.writeChanges();
            
            setTimeout(() => {
                clk_writer.bits.set(clk_writer.bitsArray.fill(false));
                clk_writer.writeChanges();

                address += 1;
                if(address == data.length) {
                    clearInterval(int);
                    end();
                }
            }, 250);
        }, 500);
    }

    function end() {
        pe_writer.bits.set(pe_writer.bitsArray.fill(false));
        pe_writer.writeChanges();
        isProgramming = false;
        enteredData = "";
    }
</script>

<BaseWidget bind:layout>
    <div class="programmer-widget">
        <div class="widget-label">RAM Programmer</div>

        <input type="text" bind:value={enteredData} placeholder="Data to import">
        <button on:click={start} disabled={isProgramming}>
            {#if isProgramming}
                <div class="loading-circle-container">
                    <div class="loading-circle" />
                </div>
            {:else}
                <div class="label">Program</div>
            {/if}
        </button>
    </div>
</BaseWidget>

<style lang="scss">
    .programmer-widget {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
    }

    .widget-label {
        width: 100%;

        font-family: "Roboto";
        font-size: 16px;
        font-weight: 800;
        color: #ffffff;

        padding: 0.3em 0em;
    }

    input {
        width: calc(100% - 2em);

        padding: 12px;

        border: none;
        outline: none;
        border-radius: 8px 8px 2px 2px;

        background-color: #2c3035;

        font-family: "Roboto";
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;

        padding: 0.6em 1em;
    }

    button {
            width: 100%;

            background-color: #2c3035;

            font-family: "Roboto";
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;

            padding: 0.6em 0em;

            outline: none;
            border: none;
            border-radius: 2px 2px 8px 8px;

            cursor: pointer;
            transition: 0.2s;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            .loading-circle-container {
                height: 16px;
                width: 16px;

                display: flex;
                align-items: center;
                justify-content: center;

                .loading-circle {
                    width: 16px;
                    height: 16px;
                    box-sizing: border-box;

                    border-radius: 50%;
                    border: 3px solid #67737f;
                    border-top-color: #ffffff;

                    animation: 1s loader-spin linear infinite;

                    @keyframes loader-spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                }
            }

            &:hover {
                background-color: #31353a;
            }

            &:disabled {
                cursor: default;
                background-color: #262a2e;
                color: #767d80;
            }
        }
</style>