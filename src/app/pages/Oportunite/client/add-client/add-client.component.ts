import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { Client } from 'src/app/Models/Client';
import { ClientServiceService } from 'src/app/Service/client-service.service';
import {FormBuilder,FormGroup,Validators } from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpParam} from "../../../Global/ps-tools/class";
import {EnvService} from "../../../../../env.service";
import {WsService} from "../../../../../ws.service";
import {HttpServicesComponent} from "../../../Global/ps-tools/http-services/http-services.component";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {Router} from "@angular/router";
import {Components} from "formiojs";
import number = Components.components.number;

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit,OnChanges  {
  @Output() add = new EventEmitter<boolean>();
  @Input() id: string;

  private msg: string = 'defaultErrorMessageKey';
  dataSourcePays

  countries: { name: string, code: string }[] = [
    { name: 'United States', code: 'US' },
    { name: 'Australia', code: 'AU' },
    { name: 'India', code: 'IN' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Germany', code: 'DE' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'France', code: 'FR' },
    { name: 'Italy', code: 'IT' },
    { name: 'Spain', code: 'ES' },
    { name: 'Japan', code: 'JP' },
    { name: 'China', code: 'CN' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Russia', code: 'RU' },
    { name: 'South Korea', code: 'KR' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Chile', code: 'CL' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Peru', code: 'PE' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Norway', code: 'NO' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Finland', code: 'FI' },
    { name: 'Iceland', code: 'IS' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Austria', code: 'AT' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Greece', code: 'GR' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Palestine', code: 'PS' },
    { name: 'Iran', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Vietnam', code: 'VN' },
    { name: 'Singapore', code: 'SG' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Oman', code: 'OM' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Syria', code: 'SY' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Libya', code: 'LY' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Ivory Coast', code: 'CI' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' },
    { name: 'Angola', code: 'AO' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Samoa', code: 'WS' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Micronesia', code: 'FM' },
    { name: 'Palau', code: 'PW' },
  ];

  domaineForm = this.fb.group({
    id: null,
    nom: ['', Validators.required],
    adresse: ['', Validators.required],
    telephne: ['', Validators.required],
    email: ['', Validators.required],
    description: null,
    dateInscription:null,
    typeClient: null,
    notes: null,
    pays: ['']
  })
  // domaineForm = this.fb.group({
  //   id: [null],
  //   nom: [null, Validators.required],
  //   adresse: [null, Validators.required],
  //   telephne: [null],
  //   email: [null, [Validators.required, Validators.email]],
  //   description: [null],
  //   dateInscription: [null, Validators.required],
  //   typeClient: [null, Validators.required],
  //   notes: [null],
  // });

  constructor(private clientService: ClientServiceService,private fb: FormBuilder,
              private toastr: ToastrService, private env: EnvService,   private wsService: WsService,
              private translateService: TranslateService,
              private tokenStorage: TokenStorageService,
              private http: HttpClient,
              private router: Router
  ) {


  }
  onFieldDataChanged(e: any) {
    // Handle field data changes if needed
  }
  ngOnInit(): void {


  }



    Return() {

        // this.router.navigate(["/client/all"]);

        this.add.emit(false)

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changinID(changes.id.currentValue);
  }
  changinID(id){
    if (this.id) {
      const clientId = +this.id;
      this.clientService.getClientById(clientId).subscribe(
          (client: Client) => {

            this.domaineForm.patchValue(client);
          },
          (error) => {
            console.error('Error fetching client details:', error);
          }
      );
    }
  }

  onSubmit() {
    console.log('test');
    try {
      const clientData: Client = this.domaineForm.value as Client;
      if (this.id ) {
        console.log('iddddddddddd' + this.id);

        this.domaineForm.value.id = this.id;
console.log("data"+this.domaineForm.value);
        this.clientService.updateClient(clientData, this.id)
            .subscribe((data: any) => {

              this.Return();
            }, error => {
              // Handle error
            });
      } else {
        if(this.domaineForm.valid) {
          this.clientService.addClient(clientData)
              .subscribe((data: any) => {

                this.Return();
              }, error => {
                // Handle error
              });

        }else {
            if (!this.domaineForm.value.nom) {
              this.toastr.error('Merci de saisir le nom ');
            }
          if (!this.domaineForm.value.adresse) {
            this.toastr.error('Merci de saisir l adresse ');
          }
          if (!this.domaineForm.value.telephne) {
            this.toastr.error('Merci de saisir le numéro de téléphone ');
          }
          if (!this.domaineForm.value.email) {
            this.toastr.error('Merci de saisir l email ');
          }
        }
      }
    } catch (e) {
      console.log(e);
      this.translateService.get(this.msg).subscribe((res) => {
        this.toastr.error(res, '', {
          closeButton: true,
          positionClass: 'toast-top-right',
          extendedTimeOut: this.env.extendedTimeOutToastr,
          progressBar: true,
          disableTimeOut: false,
          timeOut: this.env.timeOutToastr,
        });
      });
      return;
    }
  }

}
