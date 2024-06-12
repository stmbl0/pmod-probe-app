<script lang="ts">
    import type { ProbeInterface } from "$lib/backend/ProbeInterface";
    import type { PageSectionConfig } from "$lib/backend/pages/PageConfig";
    import Widget from "$lib/backend/widgets/Widget.svelte";
    import Bits from "$lib/backend/widgets/pprobe-basic/Bits.svelte";

    export let config: PageSectionConfig;
</script>

<div class="page-section">
    <div class="section-header">
        {config.title}
    </div>

    <div
        class="widget-grid"
        style="
            grid-template-columns: repeat({config.layout_tiles_x || 6}, 1fr);
            grid-template-rows: repeat({config.layout_tiles_y || 4}, 1fr);"
    >
        <!--<Bits 
            layout={{}}
            config={{
                label: "Byte Read",
                mode: "read",
                $bits: {
                    dir: "TOPI",
                    start: 0,
                    count: 8
                }
            }}
        />

        <Bits 
            layout={{}}
            config={{
                label: "Byte Write",
                mode: "write",
                $bits: {
                    dir: "TIPO",
                    start: 0,
                    count: 8
                }
            }}
        />-->

        {#each config.widgets as wg}
            <Widget config={wg}/>
        {/each}

    </div>
</div>

<style lang="scss">
    .page-section {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .section-header {
        width: calc(100% - 16px);

        font-family: "Roboto";
        font-size: 24px;
        font-weight: 700;
        color: #ffffff;

        padding: 8px;
    }

    .widget-grid {
        width: 100%;

        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, 1fr);
        gap: 12px;
    }
</style>