<script lang="ts">
    import type { WidgetConfig } from "./WidgetConfig";

    import BinaryState from "./pprobe-basic/BinaryState.svelte";
    import Bits from "./pprobe-basic/Bits.svelte";
    import Button from "./pprobe-basic/Button.svelte";
    import Mapping from "./pprobe-basic/Mapping.svelte";
    import Number from "./pprobe-basic/Number.svelte";
    import Switch from "./pprobe-basic/Switch.svelte";
    import RamProgrammer from "./very-simple-cpu/RamProgrammer.svelte";

    export let config: WidgetConfig;
</script>

{#if config.widget == "pprobe-basic::bits"}
    <Bits config={config.config} layout={config.layout} />
{:else if config.widget == "pprobe-basic::button"}
    <Button config={config.config} layout={config.layout} />
{:else if config.widget == "pprobe-basic::switch"}
    <Switch config={config.config} layout={config.layout} />
{:else if config.widget == "pprobe-basic::binary-state"}
    <BinaryState config={config.config} layout={config.layout} />
{:else if config.widget == "pprobe-basic::number"}
    <Number config={config.config} layout={config.layout} />
{:else if config.widget == "pprobe-basic::mapping"}
    <Mapping config={config.config} layout={config.layout} />

{:else if config.widget == "very-simple-cpu::programmer"}
    <RamProgrammer config={config.config} layout={config.layout} />
{/if}