import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.scss']
})
export class AddDemandeComponent implements OnInit {
  @Output() add = new EventEmitter<boolean>();
  @Input() id: string;
  demandeForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.demandeForm = this.fb.group({
      id: null, // You might want to initialize other properties based on your requirements
      nom: [null, Validators.required],
      description: null,
      dateDeCreation: null,
      statutDemande: null,
      statut: null,
    });
  }

  ngOnInit(): void {
  }

}
