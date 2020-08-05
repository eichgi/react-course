export default function validarCrearProducto(valores) {
  let errores = {};
  console.log(valores);

  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  if (!valores.empresa) {
    errores.empresa = "La empresa es obligatoria";
  }

  if (!valores.url) {
    errores.url = "La URL es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "URL inválida";
  }

  if (!valores.descripcion) {
    errores.descripcion = 'La descripcion del producto es obligatoria';
  }

  return errores;
}