export interface Facture {


    id?: number; // Si l'ID est généré automatiquement côté serveur, vous pouvez le rendre optionnel
    dateFacture: Date;
    description: string;
    serviceFournis: string;
    isGenerate: boolean;
    nom: string;
    paymentMethod: string;
    totalAmount: number;
    contactNumber: string;
    uuid: string;
   // pv?: PV; // S'il y a une relation avec une entité PV, vous pouvez l'inclure ici
    // Ajoutez d'autres propriétés si nécessaire
}