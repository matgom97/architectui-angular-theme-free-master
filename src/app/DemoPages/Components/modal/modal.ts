import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss']
})
export class Modal implements OnInit {

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
  }
}