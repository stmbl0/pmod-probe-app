import { get } from "svelte/store";
import { loadedProject } from "../globals";
import type { BitMapping } from "../types";

export function getSelector( sel: BitMapping|string ): BitMapping {
    if(typeof sel === "string") {
        return get(loadedProject)?.mapping?.[sel] || {dir:"TOPI",start:0} as BitMapping;
    } else {
        return sel;
    }
}