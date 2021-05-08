<template>
  <v-item>
    <div class="dz-preview dz-file-preview dz-processing dz-success dz-complete">
      <div class="dz-image">
        <img data-dz-thumbnail/>
      </div>
      <div class="dz-details">
        <v-container style="display:flex; flex-direction:column; justify-content:space-around; height: 100%">
          <v-row>
            <h2>{{name}}</h2>
          </v-row>

          <v-row v-if="processing" justify="center" align="center" style="flex-direction:column">
            <v-row>
              <v-progress-circular
                indeterminate
                color="primary"/>
            </v-row>
            <v-row>
              <h3>처리 중 ...</h3>
            </v-row>
          </v-row>

          <v-row v-if="waiting" justify="center" align="center" style="flex-direction:column">
            <v-row>
              <v-progress-circular/>
            </v-row>
            <v-row>
              <h3>대기 중</h3>
            </v-row>
          </v-row>

          <v-row v-if="done">
            <v-btn @click="downloadDone" block class="white--text" color="blue-grey" elevation="3">
              <v-icon dark left>
                mdi-cloud-download
              </v-icon>
              Download
            </v-btn>
            <v-btn @click="deleteDone" block class="white--text" color="error" elevation="3">
              <v-icon dark left>
                mdi-delete-forever
              </v-icon>
              Delete
            </v-btn>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-item>
</template>

<script>
export default {
  name: "File",
  props: {
    name: String,
    processing: Boolean,
    waiting: Boolean,
    done: Boolean,
    downloadDone: Function,
    deleteDone: Function
  }
}
</script>

<style>

</style>