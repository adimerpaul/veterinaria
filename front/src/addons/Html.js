import moment from "moment";

export class Html{
  static certificadoAutorizacionQuirurgica(mascota){
    console.log(mascota)
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dia = moment().format('DD')
    const mes = meses[moment().format('MM') - 1]
    const anio = moment().format('YYYY')
    return `  <div>
    <div style="text-align: center; font-weight: bold; color: blue; text-decoration: underline; font-size: 1.2em;">
      CERTIFICADO DE AUTORIZACIÓN QUIRÚRGICA
    </div>
    <div>
      El Sr. Propietario responsable del paciente quirúrgico reconoce como correctos los siguientes datos identificados:
    </div>
    <div style="font-weight: bold;color: blue">PROPIETARIO RESPONSABLE</div>
    <div>
      <span style="font-weight: bold">Nombre y Apellidos:</span> ${mascota.propietario_nombre}
      <span style="font-weight: bold">C.I.:</span> ${mascota.propietario_ci}
      <span style="font-weight: bold">Teléfono:</span> ${mascota.propietario_telefono}
    </div>
    <div style="font-weight: bold;color: blue">VETERINARIOS RESPONSABLES</div>
    <div><strong>Cirujano:</strong> ...................................................................................................................</div>
    <div><strong>Cirujano 2 o instrumentista:</strong> ............................................................................</div>
    <div><strong>Anestesista:</strong> ............................................................................................................</div>
    <div style="font-weight: bold;color: blue">PACIENTE QUIRÚRGICO</div>

    <div>
      <strong>Especie:</strong> ${mascota.especie}
      <strong>Raza:</strong> ${mascota.raza}
      <strong>Sexo:</strong> ${mascota.sexo}
      <strong>Edad:</strong> ${mascota.edad}
      <strong>Color:</strong> ${mascota.color}
      <strong>Nombre:</strong> ${mascota.nombre} <br>
      <strong>Cirugía a realizar:</strong> ............................................................................................................. <br>
      <strong>Costo Cirugía:</strong> ..........
      <strong>Adelanto:</strong> ..........
      <strong>Saldo:</strong> ..........
    </div>
    <div>El Señor. Propietario y/o tenedor responsable autoriza al profesional veterinario y a su equipo a realizar el acto quirúrgico indicado al paciente ya mencionado.</div>
    <div>El Señor. Responsable otorga el consentimiento y autoriza al profesional en el párrafo precedente, dejado constancia de:</div>
    <div>
      Tengo pleno conocimiento de la cirugía a realizar a mi animal, quedando satisfactoriamente informado de los pormenores de la misma;
      en lo que concierne al pre, intra y post operatorio., asi como los objetivos terapéuticos y/o exploratorios, dicho paciente ingresa con riesgo de :.............
    </div>
    <div>
      Estoy consciente de posibles reacciones secundarias no previstas a cualquiera de los fármacos o líquidos administrados,
      con posibles repercusion cardiaca, pulmonar, hepatica, renal y/o del sistema nervioso.
    </div>
    <div>
      Conozco y acepto el riesgo que supone todo acto quirúrgico bajo anestesia general,
      asi como las posibles complicaciones que puedan surgir en el dasarrollo de la misma.
    </div>
    <div>La veterinaria no se responsabiliza por posibles reacciones alérgicas o anafilácticas que el paciente pueda presentar antes, durante y después de la cirugía, asi como infeciones post quirurgicas y/o Sangrados improvistos.</div>
    <div>Autorizo al profesional a modificar la conducta quirúrgica pre-establecida e informada cuando sugieren razones médico quirúrgicas.</div>
    <div>
      Autorizo, SI .......... NO ......... a realizar pruebas de : .............................................................................................................
      a mi mascota, en caso de no apcetar deslindo responsabilidades al medico veterinario.por cualquier situación que surja intra y post operatorias.
    </div>
    <div>
      El Propietario con su forma certifica haber leido y comprendido todo lo expuesto en este documento, y acepta las condiciones y riesgos que implica la cirugía.
    </div>
    <br>
    <br>
    <br>
    <div>
      <table style="width: 100%">
        <tr>
          <td style="width: 40%" valign="top">
            <div style="text-align: center;line-height: 0.9">
              ........................................<br>
              Firma del propietario <br>
              Nombre: ${mascota.propietario_nombre} <br>
              C.I.: ${mascota.propietario_ci} <br>
            </div>
          </td>
          <td style="width: 40%" valign="top">
            <div style="text-align: center;line-height: 0.9">
              ........................................<br>
              Firma Veterinario Responsable <br>
<!--              Nombre: xxxxxxxxxx <br>-->
<!--              C.I.: xxxxxxxxxx <br>-->
            </div>
          </td>
          <td style="width: 20%">
            <div style="text-align: right">
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div style="text-align: center">
<!--      Fecha de cirugía: xxxxxxx de: xxxxxxxxx de xxxxx-->
      Fecha de cirugía: ${dia} de ${mes} de ${anio}
    </div>
  </div>`
  }
}
