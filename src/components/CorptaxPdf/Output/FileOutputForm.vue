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
      const pdfDone = await this.getPdfList();
      this.$store.commit({ type: 'setPdfDone', pdfDone });
      this.$store.commit({ type: 'pushPdfDone', pdf: 'done1.pdf' });
      this.$store.commit({ type: 'pushPdfDone', pdf: 'done2.pdf' });
      this.$store.commit({ type: 'pushPdfDone', pdf: 'processing.pdf' });

      await this.$store.dispatch('updatePdfProcessing')

      if(this.isPdfProcessing) {
        return;
      }
      const pdf = this.pdfWaiting[0];
      this.processPdf(pdf);
      this.$store.commit('popPdfWaiting');
      this.$store.commit({ type: 'pushPdfProcessing', pdf });
    }
  },
}
</script>

<style>

</style>