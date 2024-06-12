<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let id: number;
    export let title: string;
    export let isSelected: boolean = false;

    let dispatch = createEventDispatcher();

    function selectProject() {
        dispatch("select", { id });
    }

    function deleteProject() {
        dispatch("delete", { id });
    }
</script>

<div class="listed-project" class:selected={isSelected}>
    <div class="info">
        <div class="title">{title}</div>
        <div class="id">0x{id.toString(16)}</div>
    </div>

    <div class="buttons">
        <button class="select-button" on:click={selectProject}>
            Select
        </button>

        <button class="delete-button" on:click={deleteProject}>
            Delete
        </button>
    </div>
</div>

<style lang="scss">
    .listed-project {
        width: calc(100% - 32px);

        padding: 12px 16px;
        border-radius: 8px;

        background-color: #202429;
        transition: 0.3s;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &.selected {
            background-color: #2c3035;
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        font-family: "Roboto";

        .title {
            font-size: 18px;
            color: #ffffff;
            font-weight: 500;
        }

        .id {
            font-size: 14px;
            color: #767d80;
            font-weight: 400;
        }
    }

    .buttons {
        height: 32px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 6px;

        button {
            background-color: #e4956833;

            font-family: "Roboto";
            font-size: 14px;
            font-weight: 600;
            color: #e49568;

            padding: 0.6em 2em;
            outline: none;
            border: none;
            border-radius: 8px;

            cursor: pointer;
            transition: 0.2s;

            &:hover {
                background-color: #e4956844;
            }

            &.delete-button {
                background-color: #e94f6133;
                color: #e94f61;

                &:hover {
                    background-color: #e94f6144;
                }
            }
        }
    }
</style>