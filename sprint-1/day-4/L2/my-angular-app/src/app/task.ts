export class Task {
    id : string;
    title:string;
    description: string;
    completed:boolean;
    priority:string
    constructor(id:string,title:string, description: string,completed:boolean,priority:string){
        this.id = id
        this.title= title
        this.description= description
        this.completed = completed
        this.priority= priority
    }
}
