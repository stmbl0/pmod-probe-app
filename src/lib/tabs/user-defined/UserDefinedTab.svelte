<script lang="ts">
    import type { PageConfig } from "$lib/backend/pages/PageConfig";
    import PageSection from "./PageSection.svelte";

    export let page: PageConfig;
</script>

<div class="user-defined-tab">
    {#each page.layout_sections as psec}
        <PageSection config={psec} />
    {/each}
</div>

<style lang="scss">
    .user-defined-tab {
        width: calc(100% - 48px);
        height: 100%;

        margin-top: 24px;
        padding: 0px 24px;

        backdrop-filter: blur(2px);

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }
</style>