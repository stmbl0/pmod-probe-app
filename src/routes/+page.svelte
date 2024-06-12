<script lang="ts">
    import { loadedProject } from "$lib/backend/globals";
    import type { PageConfig } from "$lib/backend/pages/PageConfig";
    import { ProbeInterface } from "$lib/backend/ProbeInterface";
    import { ProjectManager } from "$lib/backend/project/ProjectManager";

    import Sidebar from "$lib/Sidebar.svelte";
    import ConnectOrLoadTab from "$lib/tabs/connect-or-load/ConnectOrLoadTab.svelte";
    import IoBlocksTab from "$lib/tabs/io-blocks/IOBlocksTab.svelte";
    import ProjectTab from "$lib/tabs/project/ProjectTab.svelte";
    import UserDefinedTab from "$lib/tabs/user-defined/UserDefinedTab.svelte";

    const probeInterface = new ProbeInterface();
    const projectManager = new ProjectManager();

    export let selectedTab = "project";

    let page: PageConfig|null = null;
    $: page = $loadedProject?.pages.filter(p => p.id==selectedTab.replace("@user/",""))[0]||null;
</script>

<title>PMod Probe</title>

<div class="app">
    <Sidebar {probeInterface} {projectManager} bind:selectedTab={selectedTab}/>

    <div class="content">
        {#if selectedTab == "io-blocks"}
            <IoBlocksTab {probeInterface}/>
        {:else if selectedTab == "project"}
            <ProjectTab {projectManager}/>
        {:else if selectedTab.startsWith("@user/")}
            {#if page}
                <UserDefinedTab {page} />
            {/if}
        {:else}
            <ConnectOrLoadTab />
        {/if}
    </div>
</div>

<style>
    .app {
        position: fixed;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;

        background: #0e1113;
        background-image: url("/assets/background-pattern.png");
        background-repeat: repeat;
        background-size: 40px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .content {
        flex-grow: 1;
        height: 100vh;
        max-height: 100vh;

        overflow-y: auto;
        overflow-x: hidden;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
