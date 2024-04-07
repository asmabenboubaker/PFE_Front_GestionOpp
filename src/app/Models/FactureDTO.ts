export class FactureDTO{
    private _identifiant:any;
    private _datedemande:any;
    private _typedemande:any;
    private _activityName:any;
    private _intervenants:any;
    private _id:any;
    //properties of the class

    dateFacture: Date;
    description: string;
    serviceFournis: string;
    isGenerate: boolean;
    nom: string;
    paymentMethod: string;
    totalAmount: number;
    contactNumber: string;
    uuid: string;
    //getters and setters for the properties

    get identifiant() {
        return this._identifiant;
    }

    set identifiant(value) {
        this._identifiant = value;
    }

    get datedemande() {
        return this._datedemande;
    }

    set datedemande(value) {
        this._datedemande = value;
    }

    get typedemande() {
        return this._typedemande;
    }

    set typedemande(value) {
        this._typedemande = value;
    }


    get activityName(): any {
        return this._activityName;
    }

    set activityName(value: any) {
        this._activityName = value;
    }

    constructor(identifiant: any, datedemande: any, typedemande: any, id: any,activityName?:any, intervenants?:any) {
        this._identifiant = identifiant;
        this._datedemande = datedemande;
        this._typedemande = typedemande;
        this._intervenants = intervenants;
        this._id = id;
    }


    get intervenants(): any {
        return this._intervenants;
    }

    set intervenants(value: any) {
        this._intervenants = value;
    }

    get id(): any {
        return this._id;
    }

    set id(value: any) {
        this._id = value;
    }
}
