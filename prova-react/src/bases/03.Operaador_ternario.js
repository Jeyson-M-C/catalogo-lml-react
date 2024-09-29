const activo = true;
const v = true;

//const mensaje = ( activo ) ? 'Activo' : 'Inactivo';
const mensaje = !activo && 'Activo'; 
const msj = ( v === true) && 'Verdadero'

console.log(mensaje)
console.log(msj)
