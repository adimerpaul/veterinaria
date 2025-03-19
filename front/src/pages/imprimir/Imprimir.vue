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
        <img src="logoCastro.jpg" width="100" height="100" alt="Logo Castro">
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
        <img src="logoOruro.png" width="100" height="100" alt="Logo Oruro">
      </div>
    </div>
    <div class="center bold blue subrayado">CERTIFICADO DE AUTORIZACIÓN QUIRÚRGICA</div>

    <div>
      <div>PROPIETARIO RESPONSABLE</div>
      <p><strong>Nombre y Apellidos:</strong> [Nombre escrito a mano]</p>
      <p><strong>C.I.:</strong> [Número de identificación]</p>
      <p><strong>Teléfono:</strong> [Número de teléfono]</p>
    </div>

    <div>
      <div>VETERINARIOS RESPONSABLES</div>
      <p><strong>Cirujano:</strong> [Nombre del veterinario]</p>
      <p><strong>Cirujano 2 o instrumentista:</strong> [Nombre del asistente]</p>
      <p><strong>Anestesista:</strong> [Nombre si aplica]</p>
    </div>

    <div>
      <div>PACIENTE QUIRÚRGICO</div>
      <p><strong>Especie:</strong> [Ej. Canino, Felino]</p>
      <p><strong>Raza:</strong> [Ej. Poodle, Labrador]</p>
      <p><strong>Sexo:</strong> [Macho/Hembra]</p>
      <p><strong>Edad:</strong> [Edad del animal]</p>
      <p><strong>Color:</strong> [Color del animal]</p>
      <p><strong>Nombre:</strong> [Nombre de la mascota]</p>
      <p><strong>Cirugía a realizar:</strong> [Tipo de cirugía]</p>
      <p><strong>Costo Cirugía:</strong> [Monto]</p>
      <p><strong>Adelanto:</strong> [Monto]</p>
      <p><strong>Saldo:</strong> [Monto]</p>
    </div>

    <div>
      <div>Declaración del Propietario</div>
      <p>El Sr. Propietario y/o tenedor responsable autoriza al profesional veterinario y a su equipo a realizar el acto quirúrgico indicado al paciente ya mencionado.</p>
      <ul>
        <li>Tengo pleno conocimiento de la cirugía a realizar a mi animal, quedando satisfactoriamente informado de los pormenores de la misma.</li>
        <li>Estoy consciente de posibles reacciones secundarias no previstas a cualquiera de los fármacos o líquidos administrados.</li>
        <li>Conozco y acepto el riesgo que supone todo acto quirúrgico bajo anestesia general.</li>
        <li>La veterinaria no se responsabiliza por posibles reacciones alérgicas, infecciones post-quirúrgicas o sangrados imprevistos.</li>
        <li>Autorizo al profesional a modificar la conducta quirúrgica preestablecida cuando sea necesario.</li>
      </ul>
    </div>

    <div>
      <div>Firmas</div>
      <p><strong>Firma del Propietario:</strong> ___________________</p>
      <p><strong>Nombre:</strong> [Nombre del propietario]</p>
      <p><strong>C.I.:</strong> [Número de identificación]</p>
      <p><strong>Fecha de cirugía:</strong> [Día] de [Mes] de [Año]</p>

      <p><strong>Firma Veterinario Responsable:</strong> ___________________</p>
      <p><strong>Nombre:</strong> Dra. M. Cristina Huayñap Choque</p>
      <p><strong>NED Veterinario Zootecnista</strong></p>
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
</style>
