export interface menuItem{
    name:string;
    link:string;
    icon:string;
    subMenu?:Array<menuItem>,
    subMenuOpened?:boolean;
    arrow?:string,
    roles:string;
}

export interface inputdigit{
    digit:number
}