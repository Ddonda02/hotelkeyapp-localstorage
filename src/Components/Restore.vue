<script setup>
import { computed } from "vue";
const { togglePopUp, restoreStudent, archivedStudents, selectedId } =
  defineProps([
    "togglePopUp",
    "restoreStudent",
    "archivedStudents",
    "selectedId",
  ]);

// const studentObj = computed(() => {
//   return archivedStudents.find((Obj) => Obj.id === selectedId);
// });
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
            Restore Student
          </h5>
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="togglePopUp"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to restore this item?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="togglePopUp">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="restoreStudent(selectedId)"
          >
            Restore
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
