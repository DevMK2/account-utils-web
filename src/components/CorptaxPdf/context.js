const mutationKeys = {
  increment: "increment",
  plus: "plus",
};

const store = {
  state: {
    count: 1,
    pdfProcessing: ["processing.pdf"],
    pdfWaiting: ["wating1.pdf", "wating2.pdf", "wating3.pdf"],
    pdfDone: ["done1.pdf", "done2.pdf", "done3.pdf"],
  },
  getters: {
    isPdfProcessing: state => state.pdfProcessing.length !== 0,
    doubleCount: (state) => state.count * 2,
    fourtimeCount: (state, getters) => getters.doubleCount * 2,
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
    updatePdfProcessing(context) {
      return new Promise((resolve) => {
        context.commit({
          type: 'setPdfProcessing',
          pdfProcessing: context.state.pdfProcessing.filter(pdf => !context.state.pdfDone.includes(pdf))
        });
        resolve();
      })
    }
  }
};

export default { mutationKeys, store };
