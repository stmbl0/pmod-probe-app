<script lang="ts">
    import type { WidgetLayoutConfig } from "./WidgetConfig";

    export let layout: WidgetLayoutConfig;
</script>

<div
    class="widget-container"
    style:grid-column="{(typeof layout?.pos_x !== "undefined") ? layout.pos_x : ""} {layout?.pos_x&&layout?.size_x?"/":""} {(typeof layout?.size_x !== "undefined") ? `span ${layout.size_x}` : ""}"
    style:grid-row   ="{(typeof layout?.pos_y !== "undefined") ? layout.pos_y : ""} {layout?.pos_y&&layout?.size_y?"/":""} {(typeof layout?.size_y !== "undefined") ? `span ${layout.size_y}` : ""}"
>
    <slot />
</div>

<style lang="scss">
    .widget-container {
        width: calc(100% - 48px);
        height: calc(100% - 32px);

        padding: 16px 24px;
        border-radius: 8px;

        background-color: #1a2025aa;
        backdrop-filter: blur(2px);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>