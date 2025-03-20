<template>
  <div>
<!--    <div>-->
<!--      <img src="logoCastro.jpg" width="100" height="100" alt="Logo">-->
<!--    </div>-->
<!--    <div>-->
<!--      <img src="logoOruro.png" width="100" height="100" alt="Logo">-->
<!--    </div>-->
<!--    <div class="center blue bold">CLÍNICA VETERINARIA "CASTRO DE PADILLA"</div>-->
<!--    <div>CENTRO VETERINARIO "SEBASTIÁN PAGADOR"</div>-->
<!--    <div>ORURO - BOLIVIA</div>-->
<!--    <div>N° 000097</div>-->
    <div class="header">
      <div class="logo">
        <img src="logoCastro.jpg" width="80" height="80" alt="Logo Castro">
      </div>
      <div class="title">
        <div class="bold blue" style="line-height: 0.9">
          CLÍNICA VETERINARIA "CASTRO DE PADILLA" <br>
          CENTRO VETERINARIO "SEBASTIÁN PAGADOR" <br>
          ORURO - BOLIVIA <br>
          <span class="bold red">N° 000097</span>
        </div>
        <div>
        </div>
      </div>
      <div class="logo">
        <img src="logoOruro.png" width="80" height="80" alt="Logo Oruro">
      </div>
    </div>
<!--    <div class="center bold blue subrayado h1">CERTIFICADO DE AUTORIZACIÓN QUIRÚRGICA</div>-->

    <div style="text-align: center; font-weight: bold; color: blue; text-decoration: underline; font-size: 1.2em;">
      CERTIFICADO DE AUTORIZACIÓN QUIRÚRGICA
    </div>
    <div>
      El Sr. Propietario responsable del paciente quirúrgico reconoce como correctos los siguientes datos identificados:
    </div>
    <div style="font-weight: bold;color: blue">PROPIETARIO RESPONSABLE</div>
    <div>
      <span style="font-weight: bold">Nombre y Apellidos:</span> adimer pal chambi ajta
      <span style="font-weight: bold">C.I.:</span> 7336199
      <span style="font-weight: bold">Teléfono:</span> 69603027
    </div>
    <div style="font-weight: bold;color: blue">VETERINARIOS RESPONSABLES</div>
    <div><strong>Cirujano:</strong> ...................................................................................................................</div>
    <div><strong>Cirujano 2 o instrumentista:</strong> ............................................................................</div>
    <div><strong>Anestesista:</strong> ............................................................................................................</div>
    <div style="font-weight: bold;color: blue">PACIENTE QUIRÚRGICO</div>

    <div>
      <strong>Especie:</strong> ..........
      <strong>Raza:</strong> ..........
      <strong>Sexo:</strong> ..........
      <strong>Edad:</strong> ..........
      <strong>Color:</strong> ..........
      <strong>Nombre:</strong> ..........
      <strong>Cirugía a realizar:</strong> ..........
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
          <td style="width: 33%">
            <div style="text-align: center;line-height: 0.9">
              ........................................<br>
              Firma del propietario <br>
              Nombre: xxxxxxxxxx <br>
              C.I.: xxxxxxxxxx <br>
            </div>
          </td>
          <td style="width: 33%" valign="top">
            <div style="text-align: center;line-height: 0.9">
              ........................................<br>
              Firma Veterinario Responsable <br>
<!--              Nombre: xxxxxxxxxx <br>-->
<!--              C.I.: xxxxxxxxxx <br>-->
            </div>
          </td>
          <td style="width: 33%">

          </td>
        </tr>
      </table>
    </div>
    <div style="text-align: center">
      Fecha de cirugía: xxxxxxx de: xxxxxxxxx de xxxxx
    </div>
  </div>
</template>

<script>
export default {
  name: 'Imprimir',
  mounted() {
    // Espera a que todas las imágenes y el contenido se carguen antes de imprimir
    const checkAllLoaded = () => {
      this.$nextTick(() => {
        setTimeout(() => {
          window.print();
        }, 250);
      });
    };

    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    if (images.length > 0) {
      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.onload = () => {
            loadedImages++;
            if (loadedImages === images.length) checkAllLoaded();
          };
          img.onerror = () => {
            loadedImages++;
            if (loadedImages === images.length) checkAllLoaded();
          };
        }
      });
    } else {
      checkAllLoaded();
    }
  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 10px;
}

.logo {
  flex: 1;
  display: flex;
  justify-content: center;
}

.title {
  flex: 2;
  text-align: center;
}

.bold {
  font-weight: bold;
}

.blue {
  color: blue;
}
.red {
  color: red;
}
.center {
  text-align: center;
}
.subrayado {
  text-decoration: underline;
}
.h1 {
  font-size: 1.2em;
}
</style>
