import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { AutenticacionUserService } from '../../services/autenticacion-user.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SqliteService } from 'src/app/services/sqlite.service';
import { User } from '../../interfaces/user.interface';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {

  loginForm!: FormGroup;
  aparecenErrores = false;
  exist: boolean = true;
  userError: string = '';
  userId!: string;

  constructor(
    private builder: FormBuilder,
    private database: DatabaseService,
    private router: Router,
    private userAuth: AutenticacionUserService,
    private sqliteService: SqliteService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.builder.group({
      userEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  async userValidation() {
    await this.userAuth
      .fetchEmail(this.loginForm.value.userEmail)
      .then((res) => {
        if (res.length === 0) {
          this.exist = false;
          this.userError = 'Este usuario no está registrado.';
        }
      });
  }

  login(email: string, password: string) {
    this.userAuth.login(email, password).then(
      (res) => {
        this.loginForm.controls['userEmail'].setValue("");
        this.loginForm.controls['password'].setValue("");
        this.router.navigate(['/user-profile']);
        console.log("Sesión iniciada")
      },
      (err) => {
        this.userError = 'Contraseña incorrecta.';
        this.exist = false;
      }
    );
  }

  getUserId(userEmail: string) {
    
  }

  async onSubmit() {
    this.exist = true;
    this.aparecenErrores = true;
    if (this.loginForm.valid) {
      await this.userValidation();
      if (this.exist) {

        this.database.getUserwithEmail(this.loginForm.value.userEmail).pipe(first()).subscribe(
          (user: User[]) => {
           try {
            console.log(user[0].id)
            this.sqliteService.createTable(user[0].id!);
            console.log('Tabla de datos del Usuario Creada');
            // Aquí puedes llamar a otros métodos del servicio
            } catch (error) {
              console.error('Error al inicializar la tabla de datos:', error);
            }
          }
        );

        

        this.login(
          this.loginForm.value.userEmail.toLowerCase(),
          this.loginForm.value.password
        );
      }
    }
  }

}
