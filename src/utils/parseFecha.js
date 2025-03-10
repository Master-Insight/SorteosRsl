export function parseFecha(fechaStr) {
  if (typeof fechaStr !== "string" || fechaStr.trim() === "") return null;

  const partes = fechaStr.split("/");
  if (partes.length !== 3) return null; // Si el formato no es válido

  const [dia, mes, año] = partes.map(Number); // Convertimos a números
  const fecha = new Date(año, mes - 1, dia);

  return isNaN(fecha.getTime()) ? null : fecha; // Si es fecha válida, la devuelve
}
