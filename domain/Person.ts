export class Person {

    private name:string;
    private email:string;
    private id:number;
    private firstName:string;
    private person:Person;

    constructor(name:string,email:string,id:number,firstName:string){
        this.name=name;
        this.email=email;
        this.id=id;
        this.firstName=firstName;
    }

    Person(person:Person){
        this.person=person;
    }

    getName():string{
        return this.name;
    }

    getEmail():string{
        return this.email;
    }

    getId():number{
        return this.id;
    }

    getFirstName():string{
        return this.firstName;
    }

    getPerson():Person{
        return this.person;
    }

    getPersonInText():String{
        return "Name:"+this.getName+"\nFirstName:"+this.getFirstName+"\nEmail:"+this.getEmail+"\nId:"+this.getId;
    }
}