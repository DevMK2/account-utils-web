<template>
  <v-item>
    <div class="dz-preview dz-file-preview dz-processing dz-success dz-complete">
      <div class="dz-image">
        <img data-dz-thumbnail/>
      </div>
      <div class="dz-details">
        <v-container style="display:flex; flex-direction:column; justify-content:space-around; height: 100%">
          <v-row>
            <h1>{{name}}</h1>
          </v-row>
          <v-row>
            <v-btn block class="white--text" color="blue-grey" elevation="3">
              <v-icon dark left>
                mdi-cloud-download
              </v-icon>
              Download
            </v-btn>
            <v-btn block class="white--text" color="error" elevation="3">
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
    name: String
  }
}
</script>

<style>

</style>