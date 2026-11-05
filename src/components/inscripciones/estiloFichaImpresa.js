// Estilos que se aplican solo al imprimir la ficha (los usa react-to-print con pageStyle).
// En papel: el alumno a todo el ancho con dos datos por renglón, y el resto de las secciones
// de a dos, lado a lado (padre y madre, vivienda y contactos), para que entre en una hoja A4.
export const ESTILO_FICHA_IMPRESA = `
  @page { size: A4; margin: 12mm; }
  /* Bootstrap fija el tamaño en body, así que se aplica directamente a la ficha */
  .ficha-impresa { padding: 0 !important; font-size: 9pt; line-height: 1.3; }
  .ficha-impresa header img { width: 56px; }
  .ficha-impresa h1 { font-size: 12pt; margin-bottom: 6pt !important; }
  .ficha-impresa h2 { font-size: 10pt; font-weight: 600; margin-bottom: 2pt !important; }
  .ficha-impresa h3 { font-size: 9pt; font-weight: 600; margin: 3pt 0 1pt; }
  .ficha-impresa section > div { margin-bottom: 3pt !important; }

  .ficha-impresa .resumen-impreso { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: 16pt; }
  .ficha-impresa .resumen-impreso > section { margin-bottom: 8pt !important; break-inside: avoid; }
  .ficha-impresa .resumen-impreso > section:first-child { grid-column: 1 / -1; }

  /* Cada renglón: etiqueta y valor. En la sección del alumno, dos pares por renglón. */
  .ficha-impresa dl { display: grid; grid-template-columns: 10em minmax(0, 1fr); column-gap: 6pt; align-items: baseline; margin: 0; }
  .ficha-impresa .resumen-impreso > section:first-child dl { grid-template-columns: 11em minmax(0, 1fr) 11em minmax(0, 1fr); }
  .ficha-impresa dt, .ficha-impresa dd { width: auto; max-width: none; margin: 0; padding: 1pt 0; }
  .ficha-impresa dt { font-size: 8pt; }
  /* Un mail largo se corta en vez de ensanchar la columna */
  .ficha-impresa dd { overflow-wrap: anywhere; }

  .ficha-impresa .firmas { break-inside: avoid; margin-top: 34pt !important; padding-top: 0 !important; }
`