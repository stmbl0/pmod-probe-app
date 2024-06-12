<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { loadedProject } from "./backend/globals";
    import ImportProjectDialog from "./backend/project/ImportProjectDialog.svelte";
    import type { ProjectManager } from "./backend/project/ProjectManager";

    let dispatch = createEventDispatcher();
    export let projectManager: ProjectManager;
    export let showImportDialog = false;
</script>

<div class="sidebar-project-info">
    <div class="project-info">
        <div class="project-name">{$loadedProject?.project.title || "Untitled Project"}</div>
    </div>

    <button on:click={() => {dispatch("show-project-tab");}}>
        <img src="/assets/icons/settings.svg" alt="">
    </button>
</div>

{#if showImportDialog}
    <ImportProjectDialog {projectManager} on:close={() => {showImportDialog = false;}} />
{/if}

<style lang="scss">
    .sidebar-project-info {
        width: 100%;
        height: 36px;

        margin-bottom: 24px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 4px;
    }

    .project-info {
        flex-grow: 1;
        height: calc(36px - 16px);

        padding: 8px;
        border-radius: 8px 2px 2px 8px;
        background-color: #2c3035;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .project-name {
            font-family: "Roboto";
            font-size: 14px;
            font-weight: 600;
            color: #ffffffff;
        }
    }


    button {
        width: 36px;
        height: 100%;

        background-color: #2c3035;

        outline: none;
        border: none;
        border-radius: 2px 8px 8px 2px;

        cursor: pointer;
        transition: 0.2s;

        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: 60%;
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