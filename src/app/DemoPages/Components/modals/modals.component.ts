import {Component, ChangeDetectionStrategy, EventEmitter, Output} from '@angular/core';
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
  }


  cerrarModal() {
    this.cerrar.emit();
  }

  guardar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.http.post('http://localhost:8000/api/creditos', this.form.value)
      .subscribe({
        next: (resp) => console.log(resp),
        error: (err) => console.error(err)
      });

    this.cerrarModal(); // Cierra el modal después de guardar
  }


}
