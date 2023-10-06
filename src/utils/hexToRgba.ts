export function hexToRgba(hex: string, transparency: number) {
  // Удаление символа "#" из HEX-кода
  hex = hex.replace("#", "");

  // Разделение HEX-кода на составляющие
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Прозрачность в диапазоне от 0 до 1
  const alpha = transparency / 100;

  // Возврат значения в формате RGBA
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
