export function numeroALetras(n, singular = "peso", plural = "pesos", centsing = "centavo", centplural = "centavos") {
  function unidades(num, union = '') {
    const unidad = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    return num ? union + unidad[num] : '';
  }

  function decenas(num) {
    const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince'];
    const decena = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    let d = Math.trunc(num / 10), u = num % 10;

    if (d === 1) return especiales[u] || `dieci${unidades(u)}`;
    if (d === 2) return u ? `veinti${unidades(u)}` : 'veinte';
    return decena[d] + (u ? ` y ${unidades(u)}` : '');
  }

  function centenas(num) {
    const centena = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
    if (num === 100) return 'cien';
    let c = Math.trunc(num / 100), resto = num % 100;
    return `${centena[c]}${resto ? ' ' + decenas(resto) : ''}`;
  }

  function trio(num, txt = '', sing = '', plural = '') {
    if (num === 0) return txt;
    if (num === 1) return (sing ? `un${sing}` : 'un') + txt;
    return centenas(num) + plural + txt;
  }

  let ent = Math.trunc(n), dec = Math.round((n - ent) * 100);
  if (n === 0) return `cero ${plural} con 00/100`;

  let resultado = '', cc = 0, resto = ent;
  const nombres = ['', ' mil', ' millón', ' millones'];

  while (resto > 0) {
    let num = resto % 1000;
    resto = Math.trunc(resto / 1000);

    let nombreSingular = cc === 2 ? ' millón' : '';
    let nombrePlural = cc === 2 ? ' millones' : nombres[cc];

    resultado = trio(num, resultado, nombreSingular, nombrePlural);

    cc++;
  }

  // Asegurar que no haya una "y" al inicio
  resultado = resultado.trim();
  if (resultado.startsWith('y ')) {
    resultado = resultado.substring(2); // Eliminar la "y " inicial
  }

  // Formatear el resultado final
  resultado = `${ent === 1 ? singular : plural} ${resultado}`;
  let decimalTexto = dec ? ` con ${dec.toString().padStart(2, '0')}/100` : ' con 00/100';

  return resultado.trim() + decimalTexto;
}

// Ejemplo de uso:
// console.log(numeroALetras(5000000)); // "pesos cinco millones con 00/100"