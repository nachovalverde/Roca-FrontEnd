import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import CampoSelect from '../common/CampoSelect'
import CampoTexto from '../common/CampoTexto'
import { listarLocalidades, listarProvincias } from '../../services/georefService'

// El texto viene del servicio: explica si es falta de internet o si el servicio está saturado
function avisarError(titulo, texto) {
  Swal.fire({
    icon: 'error',
    title: titulo,
    text: texto,
    confirmButtonText: 'Entendido',
  })
}

function SelectorLugarNacimiento({ provincia = '', localidad = '', onChange }) {
  const [provincias, setProvincias] = useState(null) // null: todavía no llegaron
  const [localidades, setLocalidades] = useState({ provinciaId: '', nombres: [] })
  const [falloLaApi, setFalloLaApi] = useState(false)

  // El id de la provincia elegida, que es lo que pide Georef para buscar localidades
  const provinciaId = provincias?.find((item) => item.nombre === provincia)?.id ?? ''

  // Al montar: pide las provincias una sola vez
  useEffect(() => {
    listarProvincias()
      .then(setProvincias)
      .catch((error) => {
        setFalloLaApi(true)
        avisarError('No pudimos cargar las provincias', error.message)
      })
  }, [])

  // Cada vez que cambia la provincia: pide sus localidades
  useEffect(() => {
    if (!provinciaId) return

    let vigente = true
    listarLocalidades(provinciaId)
      .then((nombres) => {
        if (vigente) setLocalidades({ provinciaId, nombres })
      })
      .catch((error) => {
        if (vigente) {
          setFalloLaApi(true)
          avisarError('No pudimos cargar las localidades', error.message)
        }
      })

    // Si cambian de provincia antes de que llegue la respuesta, la anterior se descarta
    return () => {
      vigente = false
    }
  }, [provinciaId])

  // Si la API no responde, el formulario sigue funcionando con campos de texto
  if (falloLaApi) {
    return (
      <>
        <CampoTexto id="alumno-provinciaNacimiento" label="Provincia de nacimiento" name="provinciaNacimiento"
          value={provincia} onChange={onChange} md={6} />
        <CampoTexto id="alumno-lugarNacimiento" label="Localidad de nacimiento" name="lugarNacimiento"
          value={localidad} onChange={onChange} md={6} />
      </>
    )
  }

  const cargandoProvincias = provincias === null
  const cargandoLocalidades = Boolean(provinciaId) && localidades.provinciaId !== provinciaId

  let textoLocalidad = 'Elegí una localidad'
  if (!provinciaId) textoLocalidad = 'Primero elegí la provincia'
  if (cargandoLocalidades) textoLocalidad = 'Cargando localidades…'

  const cambiarProvincia = (name, valor) => {
    onChange(name, valor)
    onChange('lugarNacimiento', '') // la localidad anterior ya no corresponde
  }

  return (
    <>
      <CampoSelect id="alumno-provinciaNacimiento" label="Provincia de nacimiento" name="provinciaNacimiento"
        value={provincia} onChange={cambiarProvincia} md={6}
        opciones={(provincias ?? []).map((item) => item.nombre)}
        opcionVacia={cargandoProvincias ? 'Cargando provincias…' : 'Elegí una provincia'}
        disabled={cargandoProvincias} />
      <CampoSelect id="alumno-lugarNacimiento" label="Localidad de nacimiento" name="lugarNacimiento"
        value={localidad} onChange={onChange} md={6}
        opciones={cargandoLocalidades ? [] : localidades.nombres}
        opcionVacia={textoLocalidad}
        disabled={!provinciaId || cargandoLocalidades} />
    </>
  )
}

export default SelectorLugarNacimiento
