const fmt = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
});

export const formatCLP = (n) => fmt.format(Number(n) || 0);

export const calcularDescuento = (precio, precioOriginal) => {
  if (!precioOriginal || precioOriginal <= precio) return null;
  return Math.round((1 - precio / precioOriginal) * 100);
};