<script lang="ts">
    export let destinationID: string;
    export let label: string;
    export let selectedTab: string;

    function onClick() {
        selectedTab = destinationID;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="sidebar-nav-target" class:selected={selectedTab==destinationID} on:click={onClick}>
    <div class="label">{label}</div>
</div>

<style lang="scss">
    .sidebar-nav-target {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        cursor: pointer;
    }

    .label {
        width: 100%;

        font-family: "Roboto";
        font-size: 16px;
        font-weight: 400;
        color: #67737f;
        text-align: center;

        padding: 0.3em;
    }

    .selected {
        cursor: default;

        .label {
            color: #e49568;
           // color: #ffffff;
        }
    }
</style>