import { get } from "svelte/store";
import { loadedProject } from "../globals";
import type { Selector } from "../types";

export function getSelector( sel: Selector|string ) {
    if(typeof sel === "string") {
        return get(loadedProject)?.mapping?.[sel] || {dir:"TOPI",start:0} as Selector;
    } else {
        return sel;
    }
}