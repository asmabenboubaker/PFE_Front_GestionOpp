import {Client} from "./Client";

export interface Demande {
    id: number;
    statutDemande: string;
    description: string;
    nom: string;
    dateDeCreation: Date;
    statut: string;

}