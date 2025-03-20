<template>
  <div>
    <div class="header">
      <div class="logo">
        <img src="/logoCastro.jpg" width="80" height="80" alt="Logo Castro">
      </div>
      <div class="title">
        <div class="bold blue" style="line-height: 0.9">
          CLÍNICA VETERINARIA "CASTRO DE PADILLA" <br>
          CENTRO VETERINARIO "SEBASTIÁN PAGADOR" <br>
          ORURO - BOLIVIA <br>
          <span class="bold red">N° {{ cerosAdelante(documento.id) }}</span>
        </div>
        <div>
        </div>
      </div>
      <div class="logo">
        <img src="/logoOruro.png" width="80" height="80" alt="Logo Oruro">
      </div>
    </div>
    <div v-html="documento.html"></div>
  </div>
</template>

<script>
import {QrcodeCanvas} from "qrcode.vue";

export default {
  name: 'Imprimir',
  components: {QrcodeCanvas},
  data() {
    return {
      documento: ''
    };
  },
  mounted() {
    const checkAllLoaded = () => {
      this.$nextTick(() => {
        // setTimeout(() => {
        //   window.print();
        // }, 250);
        const id = this.$route.params.id;
        this.$axios.get(`documentos/${id}`)
          .then((response) => {
            this.documento = response.data;
            this.$nextTick(() => {
              window.print();
            //   auto close
              window.close();
            });
          })
          .catch((error) => {
            console.error(error);
          });
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
  },
  methods: {
    cerosAdelante(id) {
      return String(id).padStart(6, '0');
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
