<script lang="ts">
    import type { BulkBitEdit } from "$lib/backend/types";

    export let data: boolean[];
    export let readOnly: boolean = true;

    export let edits: BulkBitEdit = [];
    let editedBitIndices: number[] = [];
    $: editedBitIndices = edits.map(e => e.bitIndex);

    let rowCount: number = 0;
    $: rowCount = Math.ceil(data.length/3/4);

    function onBitClick(bitIndex: number) {
        if(readOnly) return;

        let editIndex = -1;
        for(var i=0; i<edits.length; i++) {
            if(edits[i].bitIndex == bitIndex) {
                editIndex = i;
                break;
            }
        }

        if(editIndex != -1) {
            // Bit has already been edited

            let oldState = edits[editIndex].newState;
            edits[editIndex].newState = !oldState;
            edits = edits;

        } else {
            // Bit has not been edited yet
            
            let oldState = data[bitIndex];
            edits.push({
                bitIndex,
                newState: !oldState
            });
            edits = edits;
        }
    }
</script>

<div class="block-viewer">
    <div class="top-label row-labels">Bit 0</div>
    <div class="top-label empty"></div>
    <div class="top-label block1">0</div>
    <div class="top-label block1">1</div>
    <div class="top-label block1">2</div>
    <div class="top-label empty"></div>
    <div class="top-label block1">3</div>
    <div class="top-label block1">4</div>
    <div class="top-label block1">5</div>
    <div class="top-label empty"></div>
    <div class="top-label block1">6</div>
    <div class="top-label block1">7</div>
    <div class="top-label block1">8</div>
    <div class="top-label empty"></div>
    <div class="top-label block1">9</div>
    <div class="top-label block1">10</div>
    <div class="top-label block1">11</div>

    <div class="row-list">
        {#each {length: rowCount} as _, i}
            <div class="row">
                <div class="row-value row-label">{i*12}</div>
                {#each {length: 4} as _, j}
                    <div class="row-value empty"></div>
                    {#each {length: 3} as _, k}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        {#if editedBitIndices.includes(i*12 + j*3 + k)}
                            <div class="row-value bit"
                                class:bit-high={edits.filter(e=>e.bitIndex==(i*12 + j*3 + k))[0].newState}
                                class:bit-ro={readOnly}
                                class:bit-changed={true}
                                on:click={() => {onBitClick(i*12+j*3+k)}}
                            >
                                {edits.filter(e=>e.bitIndex==(i*12 + j*3 + k))[0].newState ? 1:0}
                            </div>
                        {:else}
                            <div class="row-value bit"
                                class:bit-high={data[i*12+j*3+k]==true}
                                class:bit-ro={readOnly}
                                on:click={() => {onBitClick(i*12+j*3+k)}}
                            >
                                <!-- svelte-ignore empty-block -->
                                {#if data[i*12 + j*3 + k] == undefined}
                                {:else}
                                    {data[i*12 + j*3 + k] ? 1:0}
                                {/if}
                            </div>
                        {/if}
                    {/each}
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .block-viewer {
        width: 100%;
        height: 100%;

        display: grid;
        gap: 12px;
        grid-template-columns: 
            2fr     // Row Labels
            1fr     // Empty
            1fr     // Block 1
            1fr     // Block 1
            1fr     // Block 1
            1fr     // Empty
            1fr     // Block 2
            1fr     // Block 2
            1fr     // Block 2
            1fr     // Empty
            1fr     // Block 3
            1fr     // Block 3
            1fr     // Block 3
            1fr     // Empty
            1fr     // Block 4
            1fr     // Block 4
            1fr;    // Block 4
    }

    .top-label {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: "Roboto";
        font-size: 14px;
        font-weight: 600;
        color: #67737f;
    }

    .row-list {
        grid-column: span 17;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .row {
            width: 100%;

            display: grid;
            column-gap: 12px;
            grid-template-columns: 
                2fr     // Row Labels
                1fr     // Empty
                1fr     // Block 1
                1fr     // Block 1
                1fr     // Block 1
                1fr     // Empty
                1fr     // Block 2
                1fr     // Block 2
                1fr     // Block 2
                1fr     // Empty
                1fr     // Block 3
                1fr     // Block 3
                1fr     // Block 3
                1fr     // Empty
                1fr     // Block 4
                1fr     // Block 4
                1fr;    // Block 4

                .row-value {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    font-family: "Roboto";
                    font-size: 18px;
                    font-weight: 900;
                    color: #d9dcdd;

                    &.row-label {
                        font-family: "Roboto";
                        color: #67737f;
                        padding: 0.2em 0em;
                    }

                    &.bit {
                        width: 100%;
                        height: 100%;

                        cursor: pointer;
                        transition: 0.2s background-color;

                        background-color: #262a2e00;
                        color: #435d9b;
                        border-radius: 4px;

                        &.bit-high {
                            color: #db616b;
                        }

                        &:hover {
                            background-color: #262a2e;
                        }
                    }

                    &.bit.bit-changed {
                        background-color: #435d9b33;
                        &:hover {background-color: #435d9b55;}

                        &.bit-high {
                            background-color: #db616b33;
                            &:hover {background-color: #db616b55;}
                        }
                    }

                    &.bit.bit-ro, &.bit.bit-ro.bit-high {
                        cursor: default;
                        background-color: #262a2e00;
                        &:hover {background-color: #262a2e00;}
                    }
                }
        }
    }
</style>