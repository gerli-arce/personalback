export const GnId = (long = "short") => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const cadenaAleatoria = [];
  const longitud = long === "short" ? 10 : long === "large"?20:30;
  for (let i = 0; i < longitud; i++) {
    const numeroAleatorio = Math.floor(Math.random() * caracteres.length);
    cadenaAleatoria.push(caracteres[numeroAleatorio]);
  }
  return cadenaAleatoria.join("");
};
