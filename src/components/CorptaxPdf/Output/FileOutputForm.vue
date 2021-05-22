<template>
  <v-item-group class="vue-dropzone dropzone">
    <file-output processing :name="pdf" :key="pdf" v-for="pdf in pdfProcessing"/>
    <file-output waiting :name="pdf" :key="pdf" v-for="pdf in pdfWaiting"/>
    <file-output done :name="pdf" :key="pdf" :downloadDone="()=>downloadPdf(pdf)" :deleteDone="()=>deletePdf(pdf)" v-for="pdf in pdfDone"/>
  </v-item-group>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import apiMixin from '../api'
import FileOutput from './FileOutput.vue'

export default {
  components: { FileOutput },
  name: "FileOutputForm",
  mixins: [apiMixin],
  data: () => {
    return {
      checkPdfListInterval: null,
    }
  },
  mounted() {
    this.checkPdfListInterval = setInterval(this.checkDoneList, 1000);
  },
  computed: {
    ...mapState({
      pdfWaiting : state => state.corptaxPdfStore.pdfWaiting,
      pdfProcessing : state => state.corptaxPdfStore.pdfProcessing,
      pdfDone : state => state.corptaxPdfStore.pdfDone
    }),
    ...mapGetters(['isPdfProcessing'])
  },
  beforeDestroy() {
    clearInterval(this.checkPdfListInterval);
  },
  methods: {
    async checkDoneList() {
      await this.$store.dispatch('updatePdfDone');
      await this.$store.dispatch('updatePdfProcessingComparingPdfDone');
      await this.$store.dispatch('updatePdfWaitingIfNoPdfProcessing');
    }
  },
}
</script>

<style>

</style>