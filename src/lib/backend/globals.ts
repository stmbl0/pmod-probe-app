import { readable, writable } from "svelte/store";
import { ProbeState } from "./types";
import { ProbeInterface } from "./ProbeInterface";
import type { ProjectConfig } from "./project/ProjectConfig";

export let probeState = writable<ProbeState>(ProbeState.Disconnected);
export let probeDetectedProjectID = writable<number>(0);
export let probeTargetInputBlockCount = writable<number>(0);
export let probeTargetOutputBlockCount = writable<number>(0);
export let probeTargetInputData = writable<boolean[]>([]);
export let probeTargetOutputData = writable<boolean[]>([]);

export let loadedProject = writable<ProjectConfig|null>(null);
export let savedProjects = writable<ProjectConfig[]>([]);