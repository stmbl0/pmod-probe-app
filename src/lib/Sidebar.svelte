<script lang="ts">
    import SidebarDeviceInfo from "./SidebarDeviceInfo.svelte";
    import SidebarNavTarget from "./SidebarNavTarget.svelte";
    import SidebarProjectInfo from "./SidebarProjectInfo.svelte";
    import type { ProbeInterface } from "./backend/ProbeInterface";
    import { loadedProject } from "./backend/globals";
    import type { ProjectManager } from "./backend/project/ProjectManager";

    export let probeInterface: ProbeInterface;
    export let projectManager: ProjectManager;

    export let selectedTab: string = "";
</script>

<div class="sidebar">
    <div class="top-section">
        <div class="logo">
            <img src="assets/pmod-probe-logo.png" alt="">
        </div>

        <SidebarProjectInfo {projectManager} on:show-project-tab={() => {selectedTab = "project"}} />

        <div class="navigation">
            {#each ($loadedProject?.pages || []) as p}
                <SidebarNavTarget destinationID="@user/{p.id}" label={p.title} bind:selectedTab/>
            {/each}

            {#if $loadedProject?.options?.showScriptsTab || $loadedProject?.options?.showTestsTab}
                <div class="nav-separator" />
            {/if}
            {#if $loadedProject?.options?.showScriptsTab}
                <SidebarNavTarget destinationID="scripts" label="Scripts" bind:selectedTab/>
            {/if}
            {#if $loadedProject?.options?.showTestsTab}
                <SidebarNavTarget destinationID="tests" label="Tests" bind:selectedTab/>
            {/if}

            <div class="nav-separator" />

            <SidebarNavTarget destinationID="io-blocks" label="Raw Data" bind:selectedTab/>
        </div>
    </div>

    <div class="bottom-section">
        <SidebarDeviceInfo {probeInterface} />
    </div>
</div>

<style lang="scss">
    .sidebar {
        height: calc(100vh - 48px);
        width: calc(350px - 48px);
        padding: 24px;

        background-color: #1a2025aa;
        backdrop-filter: blur(2px);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .top-section {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        .logo {
            width: 90%;
            margin-bottom: 24px;

            img { width: 100%; }
        }

        .navigation {
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;

            .nav-separator {
                width: 100%;
                height: 1px;
                margin: 6px 0px;
                background-color: #283137;
            }
        }
    }

    .bottom-section {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>