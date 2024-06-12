<script lang="ts">
    import { loadedProject, savedProjects } from "$lib/backend/globals";
    import type { ProjectManager } from "$lib/backend/project/ProjectManager";
    import ListedProject from "./ListedProject.svelte";

    export let projectManager: ProjectManager;

    let importValue: string;
    function importProject() {
        projectManager.importConfig(importValue);
        importValue = "";
    }
</script>

<div class="project-tab">
    <div class="project-window">
        <div class="project-list">
            {#each $savedProjects as p}
                <ListedProject
                    id={p.project.id}
                    title={p.project.title}
                    isSelected={$loadedProject?.project.id == p.project.id}

                    on:select = {() => { projectManager.selectProject(p.project.id); }}
                    on:delete = {() => { projectManager.deleteProject(p.project.id); }}
                />
            {/each}
        </div>

        <div class="vertical-separator" />

        <div class="import-project">
            <textarea placeholder="Insert project configuration here..." bind:value={importValue} />
            <button on:click={importProject}>Import</button>
        </div>
    </div>
</div>

<style lang="scss">
    .project-tab {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        backdrop-filter: blur(2px);
    }

    .project-window {
        width: 70%;
        height: 60%;

        padding: 24px;
        border-radius: 8px;

        background-color: #1a2025aa;
        backdrop-filter: blur(4px);

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .vertical-separator {
        width: 1px;
        height: 100%;

        margin: 0px 24px;
        background-color: #283137aa;
    }

    .project-list {
        width: 40%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;

        overflow-y: auto;
        overflow-x: hidden;
    }

    .import-project {
        flex-grow: 1;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;

        textarea {
            width: calc(100% - 2em);
            height: 100%;
            resize: none;

            background-color: #202429aa;

            font-family: "Roboto";
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;

            padding: 1em 1em;

            outline: none;
            border: none;
            border-radius: 8px;

            cursor: text;
            transition: 0.2s;

            &:focus {
                background-color: #202429;
            }
        }

        button {
            width: 100%;

            background-color: #202429aa;

            font-family: "Roboto";
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;

            padding: 0.7em 3em;

            outline: none;
            border: none;
            border-radius: 8px;

            cursor: pointer;
            transition: 0.2s;

            &:hover {  
                background-color: #202429;
            }
        }
    }
</style>