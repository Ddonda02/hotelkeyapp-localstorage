<script setup>
import { ref, watch, computed, onMounted } from "vue";

const { showForm, data, editObject } = defineProps([
  "showForm",
  "data",
  "editObject",
]);

const name = ref("");
const city = ref("");
const date = ref("");
const students = ref(data);

// Add Function

onMounted(() => {
  const storedStudents = localStorage.getItem("students");
  if (storedStudents) {
    students.value = JSON.parse(storedStudents);
  }
});
function saveStudentsToStorage(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

const nextId = students.value.length + 1;

const addStudent = () => {
  const newObject = {
    id: nextId,
    name: name.value,
    date: date.value,
    city: city.value,
  };
  students.value.push(newObject);
  saveStudentsToStorage(students.value);

  showForm();
  name.value = "";
  date.value = "";
  city.value = "";
};

const conditionName = ref(editObject.editedUser?.name);
watch(conditionName, () => (editObject.editedUser.name = conditionName.value));

const conditionDate = ref(editObject.editedUser?.date);
watch(conditionDate, () => (editObject.editedUser.date = conditionDate.value));

const conditionCity = ref(editObject.editedUser?.city);
watch(conditionCity, () => (editObject.editedUser.city = conditionCity.value));

const computedName = computed({
  get() {
    return editObject.editBoolean ? conditionName.value : name.value;
  },
  set(newValue) {
    if (editObject.editBoolean) {
      conditionName.value = newValue;
    } else {
      name.value = newValue;
    }
  },
});
const computedDate = computed({
  get() {
    return editObject.editBoolean ? conditionDate.value : date.value;
  },
  set(newValue) {
    if (editObject.editBoolean) {
      conditionDate.value = newValue;
    } else {
      date.value = newValue;
    }
  },
});
const computedCity = computed({
  get() {
    return editObject.editBoolean ? conditionCity.value : city.value;
  },
  set(newValue) {
    if (editObject.editBoolean) {
      conditionCity.value = newValue;
    } else {
      city.value = newValue;
    }
  },
});
</script>

<template>
  <div class="container custom-css">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title mb-4">
              {{ editObject.editBoolean ? "Edit Student" : "Add Student" }}
            </h5>
            <form>
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter name"
                  v-model="computedName"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Date of Birth</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="computedDate"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">City</label>
                <input
                  type="text"
                  class="form-control"
                  id="cityInput"
                  placeholder="Enter city"
                  v-model="computedCity"
                />
              </div>
              <div class="text-end">
                <button
                  type="button"
                  class="btn btn-primary me-2"
                  @click="
                    editObject.editBoolean
                      ? editObject.updateUser()
                      : addStudent()
                  "
                >
                  {{ editObject.editBoolean ? "Edit" : "Add" }}
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="
                    editObject.editBoolean
                      ? editObject.toggleEdit()
                      : showForm()
                  "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-css {
  position: absolute !important;
  max-width: 100% !important;
  max-height: 100% !important;
  /* background-color: rgba(72, 72, 72, 0.77) !important; */
  z-index: 10 !important;
  align-items: center !important;
  justify-content: center !important;
}

/* .background {
  display: block !important;
  position: absolute;
  max-width: 100% !important;
  max-height: 100% !important;
  background-color: rgba(72, 72, 72, 0.77) !important;
  z-index: 10 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important; */
/* } */
</style>
