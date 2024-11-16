import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre es obligatorio"),
  apellidos: Yup.string().required("Apellidos son obligatorios"),
  telefono: Yup.string().required("Teléfono es obligatorio"),
  direccion: Yup.string().required("Dirección es obligatoria"),
  correo: Yup.string()
    .email("Correo inválido")
    .required("Correo es obligatorio"),
  password: Yup.string().required("Contraseña es obligatoria"),
});

export const LoginSchema = Yup.object().shape({
  correo: Yup.string()
    .email("Correo inválido")
    .required("Correo es obligatorio"),
  password: Yup.string()
    .required("Contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const reseetPasswordSchema = Yup.object().shape({
  correo: Yup.string()
    .email("Correo inválido")
    .required("Correo es obligatorio"),
});
