<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { ProjectManager } from "./ProjectManager";

    let dispatch = createEventDispatcher();
    export let userInput: string = "";

    export let projectManager: ProjectManager;

    function importConfig() {
        projectManager.importConfig(userInput);
        dispatch("close");
    }
</script>

<div class="dialog-container">
    <div class="dialog">
        <textarea bind:value={userInput} placeholder="Paste config here"/>

        <button on:click={importConfig}>Import</button>
    </div>
</div>

<style lang="scss">
    .dialog-container {
        position: fixed;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        z-index: 99;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .dialog {
        width: 100%;
        height: 100%;

        background-color: #00000040;
        backdrop-filter: blur(50px);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;

        textarea {
            width: calc(85% - 2em);
            height: 60vh;
            resize: none;

            background-color: #1a2025ff;

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
                background-color: #2c3035;
            }
        }

        button {
            background-color: #1a2025ff;

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
                background-color: #2c3035;
            }
        }
    }
</style>