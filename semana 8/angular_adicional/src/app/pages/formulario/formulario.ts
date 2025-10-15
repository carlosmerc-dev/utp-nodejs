import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.css']
})
export class Formulario {
  form;

  enviado = false;
  mensaje = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      edad: [18, [Validators.required, Validators.min(18)]],
      acepta: [false, [Validators.requiredTrue]]
    });
  }

  enviar() {
    this.enviado = true;
    if (this.form.invalid) {
      this.mensaje = 'Faltan datos o hay errores de validación';
      return;
    }
    this.mensaje = `Registro ok: ${this.form.value.nombre} (${this.form.value.correo})`;
    console.log(this.form.value);
    this.form.reset({ edad: 18, acepta: false });
  }
}