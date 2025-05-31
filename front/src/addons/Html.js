import moment from "moment";

export class Html{
  static certificadoAutorizacionQuirurgica(mascota){
    // console.log(mascota)
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
      Fecha de cirugía: ${dia} de ${mes} de ${anio}
    </div>
  </div>`
  }
  static autorizacionEutanasia(mascota){
    // console.log(mascota)
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dia = moment().format('DD')
    const mes = meses[moment().format('MM') - 1]
    const anio = moment().format('YYYY')
    return `  <div>
    <div style="text-align: center; font-weight: bold; color: blue; text-decoration: underline; font-size: 1.2em;">
      AUTORIZACIÓN DE EUTANASIA
    </div>
    <div>
        Fecha de cirugía: ${dia} de ${mes} de ${anio}
    </div>
    <div style="font-weight: bold;color: blue">DATOS PROPIETARIO Y/O RESPONSABLE</div>
    <div>
      <span style="font-weight: bold">Nombre Propietario:</span> ${mascota.propietario_nombre}
      <span style="font-weight: bold">C.I.:</span> ${mascota.propietario_ci}
      <span style="font-weight: bold">Teléfono:</span> ${mascota.propietario_telefono}
      <span style="font-weight: bold">Dirección:</span> ${mascota.propietario_direccion}
    </div>
    <div style="font-weight: bold;color: blue">DATOS DEL PACIENTE</div>
    <div>
        <strong>Nombre:</strong> ${mascota.nombre} <br>
        <strong>Especie:</strong> ${mascota.especie} <br>
        <strong>Raza:</strong> ${mascota.raza} <br>
        <strong>Sexo:</strong> ${mascota.sexo} <br>
        <strong>Edad:</strong> ${mascota.edad} <br>
        <strong>Color:</strong> ${mascota.color} <br>
    </div>
    <div style="font-weight: bold;color: blue">MOTIVO DE EUATANASIA</div>
    <div>
        <strong>Motivo:</strong><br>
        <div>...........................................................................................................................................................................................................................</div>
        <div>...........................................................................................................................................................................................................................</div>
        <div>...........................................................................................................................................................................................................................</div>
        <div>...........................................................................................................................................................................................................................</div>
        <div>...........................................................................................................................................................................................................................</div>
    </div>
    <div style="font-weight: bold;color: blue">METODO DE EUATANASIA</div>
    <div>
        <strong>Metodo:</strong><br>
        <div>...........................................................................................................................................................................................................................</div>
        <div>...........................................................................................................................................................................................................................</div>
        <div>...........................................................................................................................................................................................................................</div>
        <div>...........................................................................................................................................................................................................................</div>
        <div>...........................................................................................................................................................................................................................</div>
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
            </div>
          </td>
          <td style="width: 20%">
            <div style="text-align: right">
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>`
  }
  static certificadoAltaVoluntaria(mascota) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dia = moment().format('DD')
    const mes = meses[moment().format('MM') - 1]
    const anio = moment().format('YYYY')

    return `<div>
    <div style="text-align: center; font-weight: bold; color: blue; text-decoration: underline; font-size: 1.2em;">
      CERTIFICADO DE ALTA VOLUNTARIA
    </div>
    <br>
    <div>
      Yo ${mascota.propietario_nombre} con C.I. ${mascota.propietario_ci}, propietario de la mascota de<br><br>
      <strong>Nombre:</strong> ${mascota.nombre} <br>
      <strong>Especie:</strong> ${mascota.especie} <br>
      <strong>Raza:</strong> ${mascota.raza} <br>
      <strong>Edad:</strong> ${mascota.edad} <br><br>
      He decidido retirar a mi mascota de la veterinaria, aun sabiendo las condiciones en las que se encuentra y bajo mi propio riesgo.
      Excluyendo a la veterinaria y a todo su personal de toda responsabilidad en cualquier situación que pudiera suscitarse.
    </div>
    <br><br><br>
    <div>
      <table style="width: 100%">
        <tr>
          <td style="width: 45%; text-align: center;">
            ......................................................<br>
            <strong>Firma del propietario y/o responsable</strong><br>
            Nombre: ${mascota.propietario_nombre} <br>
            C.I.: ${mascota.propietario_ci}
          </td>
          <td style="width: 10%"></td>
          <td style="width: 45%; text-align: center;">
            ......................................................<br>
            <strong>Firma y sello del veterinario responsable</strong>
          </td>
        </tr>
      </table>
    </div>
    <br>
    <div style="text-align: center">
      Fecha: ${dia} de ${mes} de ${anio}
    </div>
  </div>`;
  }
  static autorizacionInternacion(mascota) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dia = moment().format('DD')
    const mes = meses[moment().format('MM') - 1]
    const anio = moment().format('YYYY')

    return `<div>
    <div style="text-align: center; font-weight: bold; color: blue; text-decoration: underline; font-size: 1.2em;">
      AUTORIZACIÓN DE INTERNACIÓN
    </div>
    <br>
    <div>
      Yo: ${mascota.propietario_nombre} <br>
      C.I.: ${mascota.propietario_ci} <br>
      Teléfono: ${mascota.propietario_telefono}
    </div>
    <br>
    <div>
      Propietario de la mascota de nombre: <strong>${mascota.nombre}</strong> <br>
      <strong>Especie:</strong> ${mascota.especie} &nbsp;&nbsp;&nbsp;
      <strong>Sexo:</strong> ${mascota.sexo} &nbsp;&nbsp;&nbsp;
      <strong>Edad:</strong> ${mascota.edad} <br>
      <strong>Raza:</strong> ${mascota.raza}
    </div>
    <br>
    <div>
      Autorizo al o los médicos tratantes a realizar el ingreso a internación por<br>
      <strong>Causa:</strong> ..................................................................................................................
    </div>
    <br>
    <div>
      Autorizo la administración de los fármacos que sean necesarios para llevar a cabo la internación, entendiendo los riesgos o beneficios que ello conlleva,
      los cuales han sido explicados por el médico tratante.
      Así mismo, autorizo la realización de cualquier procedimiento adicional que el Médico Veterinario considere necesario ante cualquier situación que se presente en forma imprevista durante la estadía,
      asumiendo los costos que estos demanden.
    </div>
    <br>
    <div>
      En caso de los pacientes politraumatizados o de cuidados intensivos, la solicitud de exámenes complementarios u otro procedimiento podrá ser efectuada de forma inmediata,
      dependiendo de la urgencia.
    </div>
    <br>
    <div>
      El o los médicos tratantes deben informar al dueño del pronóstico del paciente antes del ingreso a hospital.
    </div>
    <br>
    <div>
      El potencial deceso del paciente no inhibe la responsabilidad de pago total de la cuenta; de lo contrario, se estudiarán acciones legales.
    </div>
    <br>
    <div>
      <strong>Como así también me queda claro los siguientes puntos:</strong><br>
      - Horarios únicos de visita donde solo puede entrar una persona por turno:<br>
      &nbsp;&nbsp;&nbsp;&nbsp;Mañana: 10:30 - 12:00 <br>
      &nbsp;&nbsp;&nbsp;&nbsp;Tarde: 15:30 - 17:00 <br>
      &nbsp;&nbsp;&nbsp;&nbsp;Noche: 21:00 - 22:00 <br>
      - Solo puedo alimentar a mi mascota bajo autorización del Médico Veterinario a cargo.
    </div>
    <br>
    <div>
      En base a todo lo indicado, confirmo que he leído todo lo anterior bajo mi juicio para la internación de mi mascota.
    </div>
    <br><br><br>
    <div style="text-align: center">
      ......................................................<br>
      <strong>Firma del propietario</strong><br>
      Nombre: ${mascota.propietario_nombre} <br>
      C.I.: ${mascota.propietario_ci}
    </div>
    <br>
    <div style="text-align: center">
      Fecha: ${dia} de ${mes} de ${anio}
    </div>
  </div>`;
  }
  static certificadoDerivacionPaciente(mascota) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dia = moment().format('DD')
    const mes = meses[moment().format('MM') - 1]
    const anio = moment().format('YYYY')

    return `<div>
    <div style="text-align: center; font-weight: bold; color: blue; text-decoration: underline; font-size: 1.2em;">
      CERTIFICADO DE DERIVACIÓN DEL PACIENTE
    </div>
    <br>
    <div>
      <strong>Nombre del Propietario:</strong> ${mascota.propietario_nombre} &nbsp;&nbsp;&nbsp;&nbsp;
      <strong>C.I.:</strong> ${mascota.propietario_ci}
    </div>
    <br>
    <div style="font-weight: bold; color: blue;">DATOS DEL PACIENTE</div>
    <div>
      <strong>Nombre:</strong> ${mascota.nombre} &nbsp;&nbsp;&nbsp;
      <strong>Especie:</strong> ${mascota.especie} &nbsp;&nbsp;&nbsp;
      <strong>Sexo:</strong> ${mascota.sexo} <br>
      <strong>Raza:</strong> ${mascota.raza} &nbsp;&nbsp;&nbsp;
      <strong>Edad:</strong> ${mascota.edad} &nbsp;&nbsp;&nbsp;
      <strong>Color:</strong> ${mascota.color}
    </div>
    <br>
    <div>
      <strong>Nombre del Veterinario:</strong> ...........................................................................................................................
    </div>
    <br>
    <div style="font-weight: bold; color: blue;">MOTIVO DE LA DERIVACIÓN</div>
    <div>
      ..........................................................................................................................................................................<br>
      ..........................................................................................................................................................................<br>
      ..........................................................................................................................................................................<br>
      ..........................................................................................................................................................................
    </div>
    <br>
    <div style="font-weight: bold; color: blue;">HISTORIA DEL PACIENTE</div>
    <div>
      ..........................................................................................................................................................................<br>
      ..........................................................................................................................................................................<br>
      ..........................................................................................................................................................................<br>
      ..........................................................................................................................................................................
    </div>
    <br>
    <div style="font-weight: bold; color: blue;">DONDE SE DERIVA</div>
    <div>
      ..........................................................................................................................................................................
    </div>
    <br>
    <div style="font-weight: bold; color: blue;">DOCUMENTOS ANEXOS</div>
    <div>
      ..........................................................................................................................................................................<br>
      ..........................................................................................................................................................................<br>
      ..........................................................................................................................................................................
    </div>
    <br><br><br>
    <div>
      <table style="width: 100%">
        <tr>
          <td style="width: 45%; text-align: center;">
            ......................................................<br>
            <strong>Firma del propietario y/o responsable</strong><br>
            Nombre: ${mascota.propietario_nombre} <br>
            C.I.: ${mascota.propietario_ci}
          </td>
          <td style="width: 10%"></td>
          <td style="width: 45%; text-align: center;">
            ......................................................<br>
            <strong>Firma y sello del veterinario responsable</strong>
          </td>
        </tr>
      </table>
    </div>
    <br>
    <div style="text-align: center">
      Oruro, ${dia} de ${mes} de ${anio}
    </div>
  </div>`;
  }
  static consentimientoSedacionEstetica(mascota) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dia = moment().format('DD')
    const mes = meses[moment().format('MM') - 1]
    const anio = moment().format('YYYY')

    return `<div>
    <div style="text-align: center; font-weight: bold; color: blue; text-decoration: underline; font-size: 1.2em;">
      CONSENTIMIENTO INFORMADO DE SEDACIÓN PARA ESTÉTICA
    </div>
    <br>
    <div>
      <strong>Fecha:</strong> ${dia} de ${mes} de ${anio}
    </div>
    <br>
    <div>
      <strong>Especie:</strong> ${mascota.especie} &nbsp;&nbsp;&nbsp;
      <strong>Raza:</strong> ${mascota.raza} &nbsp;&nbsp;&nbsp;
      <strong>Nombre:</strong> ${mascota.nombre}
    </div>
    <div>
      <strong>Sexo:</strong> ${mascota.sexo} &nbsp;&nbsp;&nbsp;
      <strong>Edad:</strong> ${mascota.edad}
    </div>
    <br>
    <div>
      <strong>Nombre del propietario:</strong> ${mascota.propietario_nombre} <br>
      <strong>Número de celular:</strong> ${mascota.propietario_telefono}
    </div>
    <br>
    <div>
      <strong>Como:</strong><br>
      - Propietario<br>
      - Representante del propietario
    </div>
    <br>
    <div>
      Yo, ${mascota.propietario_nombre}, C.I. ${mascota.propietario_ci}, doy mi consentimiento para que mi mascota sea sedada bajo anestesia en las condiciones que me han sido propuestas.
    </div>
    <br>
    <div>
      He leído y aceptado la información indicada, también he realizado las preguntas oportunas y he sido informado de las ventajas y riesgos del procedimiento.
    </div>
    <br><br><br>
    <div>
      <table style="width: 100%">
        <tr>
          <td style="width: 45%; text-align: center;">
            ......................................................<br>
            <strong>Firma del propietario</strong><br>
            Nombre: ${mascota.propietario_nombre}
          </td>
          <td style="width: 10%"></td>
          <td style="width: 45%; text-align: center;">
            ......................................................<br>
            <strong>Firma del veterinario</strong>
          </td>
        </tr>
      </table>
    </div>
  </div>`;
  }


}
