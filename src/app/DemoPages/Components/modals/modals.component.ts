import {Component, ChangeDetectionStrategy, EventEmitter, Output, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false})
export class ModalsComponent {

  @Output() cerrar = new EventEmitter<void>();
  //Emitir cuando se guarda
  @Output() guardarCredito = new EventEmitter<any>();
  @Input() isCreation: boolean = false;
  @Input() credito: any = null; // Variable para recibir el crédito a editar
  @Input() isView: boolean = false; // Variable para determinar si es vista o edición


  // Con ternario
  title = ""; 

  

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      plazo: ['', Validators.required],
      tasaInteres: ['', Validators.required],
      valorCredito: ['', Validators.required],
    });
    this.title = this.isCreation ? 'Crear Crédito' : 'Editar Crédito';

    // Mostrar los datos del crédito en el formulario si es edición
    if (!this.isCreation && this.credito || this.isView) {
      this.form.patchValue({
        cedula: this.credito.cedula,
        nombres: this.credito.nombres,
        apellidos: this.credito.apellidos,
        plazo: this.credito.plazo,
        tasaInteres: this.credito.tasaInteres,
        valorCredito: this.credito.valorCredito
      });
    }

    console.log(this.title);
    console.log(this.credito);
    
    
  }


  cerrarModal() {
    this.cerrar.emit();
  }

  guardar(): void {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  var json = {
    cedula: this.form.value.cedula,
    nombres: this.form.value.nombres,
    apellidos: this.form.value.apellidos,
    plazo: this.form.value.plazo,
    tasaInteres: this.form.value.tasaInteres,
    valorCredito: this.form.value.valorCredito,
    id: this.credito ? this.credito.id : null
}

  const request = this.isCreation
    ? this.http.post('http://localhost:8000/api/creditos', json)
    : this.http.put('http://localhost:8000/api/creditos/update', json);

  request.subscribe({
    next: (resp) => {

      // Avisar al padre cuando realmente terminó
      this.guardarCredito.emit(resp);

      // Cerrar modal
      this.cerrar.emit();

    },
    error: (err) => console.error(err)
  });

}


}
