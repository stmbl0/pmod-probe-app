<script lang="ts">
    import type { ProbeInterface } from "./backend/ProbeInterface";
    import { probeState } from "./backend/globals";
    import { ProbeState } from "./backend/types";

    export const WEBSERIAL_SUPPORTED = navigator.serial ? true : false;

    export let probeInterface: ProbeInterface;

    function connect() {
        probeInterface.connect();
    }
    function disconnect() {
        probeInterface.disconnect();
    }
    function probe() {
        probeInterface.startProbe();
    }
    function resetProbe() {
        probeInterface.stopProbe();
    }
</script>

<div class="sidebar-device-info">
    <div class="device-info">
        <div class="dev-name">PMod Probe</div>
        <div 
            class="dev-status"
            class:s_disconnected = {$probeState == ProbeState.Disconnected || $probeState == ProbeState.Connecting}
            class:s_ready = {$probeState == ProbeState.Ready || $probeState == ProbeState.Searching || $probeState == ProbeState.Handshake}
            class:s_probing = {$probeState == ProbeState.Active}
        >
            {#if $probeState == ProbeState.Disconnected || $probeState == ProbeState.Connecting}
                Disconnected
            {:else if $probeState == ProbeState.Ready}
                Ready
            {:else if $probeState == ProbeState.Searching || $probeState == ProbeState.Handshake}
                Probing...
            {:else if $probeState == ProbeState.Active}
                Active
            {/if}
        </div>
    </div>

    {#if !WEBSERIAL_SUPPORTED}
        <div class="error-message">
            Error: Webserial not supported by your browser!
        </div>
    {/if}

    <div class="buttons">
        {#if $probeState != ProbeState.Ready && $probeState != ProbeState.Active}
            <button class="btn-left" disabled>Probe</button>
        {:else if $probeState == ProbeState.Active}
        <button class="btn-left" on:click={resetProbe}>Stop Probe</button>
        {:else}
            <button class="btn-left" on:click={probe}>Probe</button>
        {/if}

        {#if $probeState == ProbeState.Disconnected}
            <button class="btn-right" disabled={!WEBSERIAL_SUPPORTED} on:click={connect}>Connect</button>
        {:else if $probeState == ProbeState.Connecting}
            <button class="btn-right" disabled>Connecting...</button>
        {:else}
            <button class="btn-right" disabled={!WEBSERIAL_SUPPORTED} on:click={disconnect}>Disconnect</button>
        {/if}
    </div>
</div>

<style lang="scss">
    .sidebar-device-info {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;

        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */

    }

    .device-info {
        width: calc(100% - 24px);

        padding: 12px;
        border-radius: 8px 8px 2px 2px;
        background-color: #2c3035;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;

        .dev-name {
            font-family: "Roboto";
            font-size: 16px;
            font-weight: 600;
            color: #ffffffff;
        }

        .dev-status {
            font-family: "Roboto";
            font-size: 12px;
            font-weight: 400;

            &.s_disconnected { color: #e94f61; }
            &.s_ready { color: #e49568; }
            &.s_probing { color: #44ce77; }
        }
    }

    .error-message {
        width: calc(100% - 24px);
        padding: 12px;

        background-color: #452e30;
        border-radius: 2px;

        font-family: "Roboto";
        font-size: 14px;
        font-weight: 400;
        color: #e94f61;
    }


    .buttons {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 4px;

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

            cursor: pointer;
            transition: 0.2s;

            &.btn-left {
                border-radius: 2px 2px 2px 8px;
            }

            &.btn-right {
                border-radius: 2px 2px 8px 2px;
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
    }
</style>