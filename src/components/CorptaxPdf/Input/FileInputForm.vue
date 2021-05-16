<template>
  <vue-dropzone 
    id="corptax-pdf-dropzone" 
    ref="myVueDropzone" 
    @vdropzone-file-added="beforeUploadZip"
    @vdropzone-success="afterUploadZip"
    @vdropzone-error="afterUploadZipFailed"
    :options="dropzoneOptions"/>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'

export default {
  name: 'FileInputForm',
  components: {
    vueDropzone: vue2Dropzone, 
  },
  data: () => {
    return {
      dropzoneOptions: {
          url: '/zip-open',
          thumbnailWidth: 200,
          maxFilesize: 100,
          dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>Upload .zip Files",
          headers: { "My-Awesome-Header": "header value" }
      },
    }
  },
  methods: {
    beforeUploadZip(file) {
      console.log('beforeUploadZip', file);
      return false;
    },
    afterUploadZip(file) {
      console.log('afterUploadZip', file);
      //this.pdfWaiting.push('a');
    },
    afterUploadZipFailed(file) {
      const elements = document.querySelectorAll(".dz-file-preview");
      elements.forEach(element => {
        const filename = element.querySelectorAll(".dz-filename span")[0];
        if(!filename) {
          return;
        }

        if(filename.textContent === file.name) {
          const errorMessage = element.querySelector('.dz-error-message span');
          if(!file.name.includes('.zip')) {
            errorMessage.textContent=".zip 으로 압축된 파일만 업로드할 수 있습니다.";
          } else {
            errorMessage.textContent="원인을 알 수 없는 에러입니다.";
          }
        }
      });
    }
  },
}
</script>

<style>

</style>