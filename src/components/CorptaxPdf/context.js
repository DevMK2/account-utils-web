import { api } from './api';

const mutationKeys = {
  increment: "increment",
  plus: "plus",
};

const store = {
  state: {
    /**@FIXME temp for test */
    count: 1,
    pdfProcessing: ["processing.pdf"],
    pdfWaiting: ["wating1.pdf", "wating2.pdf", "wating3.pdf"],
    pdfDone: ["done1.pdf", "done2.pdf", "done3.pdf"],
    pdfFailed: []
    /**@FIXME temp for test */
  },
  getters: {
    isPdfProcessing: state => state.pdfProcessing.length !== 0,
    isNoPdfWaiting: state => state.pdfWaiting.length === 0,
    /**@FIXME temp for test */
    doubleCount: (state) => state.count * 2,
    fourtimeCount: (state, getters) => getters.doubleCount * 2,
    /**@FIXME temp for test */
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    plus(state, payload) {
      state.count += payload.amount;
    },
    setPdfProcessing(state, payload) {
      state.pdfProcessing = payload.pdfProcessing;
    },
    pushPdfProcessing(state, payload) {
      state.pdfProcessing.push(payload.pdf);
    },
    popPdfProcessing(state) {
      state.pdfProcessing.pop();
    },
    pushPdfWaiting(state, payload) {
      state.pdfWaiting.push(payload.pdf);
    },
    popPdfWaiting(state) {
      state.pdfWaiting.shift();
    },
    setPdfDone(state, payload) {
      state.pdfDone = payload.pdfDone;
    },
    pushPdfDone(state, payload) {
      state.pdfDone.push(payload.pdf);
    },
    popPdfDone(state) {
      state.pdfDone.pop();
    },
    pushPdfFailed(state, payload) {
      state.pdfFailed.push(payload.pdf);
    },
  },
  actions: {
    incrementAsync (context, payload) {
      setTimeout(()=>{
        context.commit({
          type: 'plus',
          amount: payload.amount
        })
      }, 1000);
    },
    async updatePdfDone(context) {
      const pdfDone = await api.getPdfList();

      context.commit({ type: 'setPdfDone', pdfDone });
      /**@FIXME temp for test*/
      context.commit({ type: 'pushPdfDone', pdf: 'done1.pdf' });
      context.commit({ type: 'pushPdfDone', pdf: 'done2.pdf' });
      context.commit({ type: 'pushPdfDone', pdf: 'processing.pdf' });
      /**@FIXME temp for test*/
    },
    updatePdfProcessingComparingPdfDone(context) {
      context.commit({
        type: 'setPdfProcessing',
        pdfProcessing: context.state.pdfProcessing.filter(pdf => !context.state.pdfDone.includes(pdf))
      });
    },
    updatePdfWaitingIfNoPdfProcessing(context) {
      if(context.getters.isPdfProcessing) {
        return;
      }
      if(context.getters.isNoPdfWaiting) {
        return;
      }

      const pdf = context.state.pdfWaiting[0];

      context.commit({ type: 'pushPdfProcessing', pdf });
      context.commit('popPdfWaiting');

      api.processPdfAsync(pdf, err => {
          console.error(err);
          context.dispatch('updatePdfProcessingIfFailed', pdf)
      });
    },
    async updatePdfProcessingIfFailed(context, failedPdf) {
    // @TODO logic check
      console.error('[context] pdf processing failed')
      context.commit({
        type: 'setPdfProcessing',
        pdfProcessing: context.state.pdfProcessing.filter(pdf => pdf !== failedPdf)
      });
      context.commit({
        type: 'pushPdfFailed', pdf: failedPdf
      });
      context.dispatch('updatePdfWaitingIfNoPdfProcessing');
    },
    async updatePdfWaitingAfterUpload(context, uploaded) {
      const targetPdf = uploaded.name.replace('.zip','.pdf');
      await context.commit({ type: 'pushPdfWaiting', pdf: targetPdf });
    }
  }
};

export default { mutationKeys, store };
