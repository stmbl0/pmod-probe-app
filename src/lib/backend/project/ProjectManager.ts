import { loadedProject, savedProjects } from "../globals";
import type { ProjectConfig } from "./ProjectConfig";

export class ProjectManager {

    public loadedProject: ProjectConfig | null = null;

    public savedProjects: ProjectConfig[] = [];

    constructor() {
        loadedProject.set(null);
        this.loadSavedProjects();
    }

    public loadSavedProjects() {
        const storedData = localStorage.getItem("pprobe-projects");

        if(storedData) {
            const projects = JSON.parse(storedData);
            savedProjects.set(projects);
            this.savedProjects = projects;
            console.log(`[project_manager] loaded ${projects.length} projects from localStorage`)
        } else {
            this.savedProjects = [];
            savedProjects.set([]);
        }
    }

    public importConfig( jsonData: string ) {
        const data = JSON.parse(jsonData);

        //this.loadedProject = data;
        //loadedProject.set(this.loadedProject);

        this.savedProjects.push(data);
        savedProjects.set(this.savedProjects);
        this.updateLocalStorage();
    }

    public selectProject( projectID: number ) {
        for(var p of this.savedProjects) {
            if(p.project.id == projectID) {
                this.loadedProject = p;
                loadedProject.set(p);
                break;
            }
        }
    }

    public deleteProject( projectID: number ) {
        this.savedProjects = this.savedProjects.filter(p => p.project.id != projectID);
        savedProjects.set(this.savedProjects);

        this.updateLocalStorage();
    }

    public updateLocalStorage() {
        localStorage.setItem("pprobe-projects", JSON.stringify(this.savedProjects));
    }

}