<script setup>
import { computed } from "vue";
// const [studId] = students.filter((s) => s.id === parseInt(route.params.id));

const { showPopUp, deleteFunction, selectedId, students } = defineProps([
  "showPopUp",
  "deleteFunction",
  "selectedId",
  "students",
]);

const studentObj = computed(() => {
  return students.find((Obj) => Obj.id === selectedId);
});
</script>

<template>
  <div
    class="modal vh-100"
    tabindex="0"
    role="dialog"
    aria-labelledby="deleteConfirmationModalLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteConfirmationModalLabel">
            Delete Item
          </h5>
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true" @click="showPopUp">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showPopUp">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteFunction(studentObj)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: block !important;
  position: absolute !important;
  max-width: 100% !important;
  max-height: 100% !important;
  background-color: rgba(72, 72, 72, 0.77) !important;
  z-index: 10 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>
