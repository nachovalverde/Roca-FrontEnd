import ResumenInscripcion from './ResumenInscripcion'
import logoEscuela from '../../assets/LogoEscuelaRoca2.jpeg'
import { formatearFecha } from '../../utils/formatearFecha'

// La ficha tal como se imprime. En React 19, ref llega como una prop más (sin forwardRef).
function FichaImprimible({ inscripcion, ref }) {
  return (
    <div ref={ref} className="p-4 ficha-impresa">
      <header className="d-flex align-items-center gap-3 border-bottom pb-3 mb-3">
        <img src={logoEscuela} alt="Logo de la Escuela Presidente Julio A. Roca" width="70" />
        <div>
          <p className="fw-semibold mb-0">Escuela Presidente Julio A. Roca</p>
          <p className="small mb-0">Nivel Inicial y Primario · CUE 9.000.763 · Zona de Supervisión N.º 16 y N.º 9</p>
          <p className="small mb-0">España 507 · S. M. de Tucumán · Tel. 4216059 - 4312669</p>
        </div>
      </header>

      <h1 className="h4 text-center mb-4">Ficha de Inscripción {inscripcion.alumno.cicloLectivo}</h1>
      {/* El contenedor permite acomodar las secciones de a dos en el papel */}
      <div className="resumen-impreso">
        <ResumenInscripcion datos={inscripcion} />
      </div>

      <div className="row mt-5 pt-4 firmas">
        <div className="col-6 text-center">
          <div className="border-top pt-2 small">Firma del padre, madre o tutor · D.N.I.</div>
        </div>
        <div className="col-6 text-center">
          <div className="border-top pt-2 small">Firma y sello de la escuela</div>
        </div>
      </div>
      <p className="small text-body-secondary mt-4 mb-0">
        Generada el {formatearFecha(new Date().toISOString())} desde el sistema de inscripciones.
      </p>
    </div>
  )
}

export default FichaImprimible