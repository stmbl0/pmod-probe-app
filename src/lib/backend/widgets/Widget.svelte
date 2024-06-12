<script lang="ts">
    import type { WidgetConfig } from "./WidgetConfig";
    import Bits from "./pprobe-basic/Bits.svelte";
    import Button from "./pprobe-basic/Button.svelte";
    import Switch from "./pprobe-basic/Switch.svelte";

    export let config: WidgetConfig;
</script>

{#if config.widget == "pprobe-basic::bits"}
    <Bits config={config.config} layout={config.layout}/>
{:else if config.widget == "pprobe-basic::button"}
    <Button config={config.config} layout={config.layout}/>
{:else if config.widget == "pprobe-basic::switch"}
    <Switch config={config.config} layout={config.layout}/>
{/if}