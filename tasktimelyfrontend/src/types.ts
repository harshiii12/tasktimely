export type TUser = {
    name: string,
    email : string,
    _id : string,
    projects: {name: string, _id : string}[]
}

export type TTask = {
    _id : string,
    description : string,
    user : {_id:string, name: string},
    dueDate : string,
    dueTime : string,
    priority : string,
    status : string
}