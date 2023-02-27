<script setup>
import { ref, watch, computed, reactive, onMounted } from "vue";
import Form from "./Form.vue";
import Delete from "./Delete.vue";
import TableRow from "./TableRow.vue";
import Data from "../Data/data.json";

const students = ref(Data);
const getFromLocalStorage = () => {
  const restoreStudent = JSON.parse(localStorage.getItem("students")) || [];
  students.value = restoreStudent;
};

onMounted(() => {
  getFromLocalStorage();
});

const archivedData = ref([]);
if (!localStorage.getItem("students") || !localStorage.getItem("archive")) {
  localStorage.setItem("students", JSON.stringify(students.value));
  localStorage.setItem("archive", JSON.stringify(archivedData.value));
}

// Toggle form
const showForm = ref(false);
const toggleForm = () => {
  showForm.value = !showForm.value;
};

// Delete confirmation pop up mu shfaq
const showDeletePopUp = ref(false);
const togglePopUp = () => {
  showDeletePopUp.value = !showDeletePopUp.value;
};

// search

const search = ref("");
watch(search, () => {
  students.value = Data.filter((student) =>
    student.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// When Delete clicked in table
const handleDelete = (id) => {
  togglePopUp();
  selectedId.value = id;
};

// Delete Student And Save It To Archive
const selectedId = ref(-1);

const deleteItem = (studentObj) => {
  students.value = students.value.filter(
    (student) => student.id !== studentObj.id
  );
  archivedData.value.push(studentObj);
  const studentsFromStorage =
    JSON.parse(localStorage.getItem("students")) || [];
  const updatedStudents = studentsFromStorage.filter(
    (student) => student.id !== studentId.value
  );
  localStorage.setItem("students", JSON.stringify(updatedStudents));
  JSON.parse(localStorage.getItem("archive")) || [];
  localStorage.setItem("archive", JSON.stringify(archivedData.value));

  togglePopUp();
};

// const archiveFromStorage = JSON.parse(localStorage.getItem("students")) ?? [];
//   const updatedArchive = archiveFromStorage.filter(
//     (student) => student.id !== studentId.value
//   );
//   localStorage.setItem("students", JSON.stringify(updatedArchive));
// Pagination and Sort Item at DisplayedItems() function
// Storted Items
const sortDirection = ref(1);
const sortKey = ref("id");
const sortTable = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value * -1;
  } else {
    sortKey.value = key;
    sortDirection.value = 1;
  }
};
const currentPage = ref(1);
const itemsPerPage = ref(5);

const displayedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return students.value.slice(start, end).sort((a, b) => {
    let modifier = 1;
    if (sortDirection.value === -1) modifier = -1;
    if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
  });
});
const totalPages = computed(() => {
  return Math.ceil(students.value.length / itemsPerPage.value);
});
const pages = computed(() => {
  const result = [];
  for (let i = 1; i <= totalPages.value; i++) {
    result.push(i);
  }
  return result;
});

function changePage(page) {
  currentPage.value = page;
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
// Students to be displayed in a single page
// const displayedStudents = computed(() => {
//   const start = (currentPage.value - 1) * pageSize;
//   const end = start + pageSize;
//   let modifier = 1;
//   return students.value.slice(start, end).sort((a, b) => {
//     if (sortDirection.value === -1) modifier = -1;
//     if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
//     if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
//   });
// });

// Edit Students from table
// onMounted(() => {
//   const storedStudents = localStorage.getItem("students");
//   if (storedStudents) {
//     students.value = JSON.parse(storedStudents);
//   }
// });
// function saveStudentsToStorage(students) {
//   localStorage.setItem("students", JSON.stringify(students));
// }
const editState = reactive({
  editedUser: null,
  editBoolean: false,
  editedStudentIndex: -1,
  items: displayedStudents,
  toggleEdit: () => {
    editState.editBoolean = !editState.editBoolean;
    toggleForm();
  },
  updateUser: () => {
    const updatedItem = { ...editState.editedUser };
    const index = editState.editedStudentIndex;
    const itemId = editState.items[index].id;
    const storedItems = JSON.parse(localStorage.getItem("students")) || [];
    const updatedItems = storedItems.map((item) =>
      item.id === itemId ? updatedItem : item
    );

    localStorage.setItem("students", JSON.stringify(updatedItems));
    students.value = updatedItems;
    editState.items[index] = updatedItem;
    editState.toggleEdit();
  },
  editUser: (id) => {
    editState.editedUser = { ...editState.items[id] };
    editState.editedStudentIndex = id;
    editState.toggleEdit();
  },
});
</script>

<template>
  <Form
    v-if="showForm"
    :showForm="toggleForm"
    :data="students"
    :editObject="editState"
  />
  <div class="container container-background">
    <div class="row">
      <div class="col-md-6">
        <input
          type="text"
          v-model.trim="search"
          class="form-control mb-2"
          placeholder="Search"
        />
      </div>
      <div class="col-md-6 text-end">
        <button class="btn btn-primary mb-2" @click="toggleForm">
          Add Student
        </button>
      </div>
    </div>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th @click="sortTable('id')">Index</th>
          <th @click="sortTable('name')">Name</th>
          <th @click="sortTable('date')">Date Of Birth</th>
          <th @click="sortTable('city')">City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          :displayedStudents="displayedStudents"
          :editUser="editState.editUser"
          :handleDelete="handleDelete"
        />
      </tbody>
    </table>
    <!-- pagination -->
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="previousPage">&laquo;</button>
        </li>
        <li
          v-for="pageNumber in pages"
          :key="pageNumber"
          :class="{ active: pageNumber === currentPage }"
          class="page-item"
        >
          <button class="page-link" @click="changePage(pageNumber)">
            {{ pageNumber }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === pageCount }">
          <button class="page-link" @click="nextPage">&raquo;</button>
        </li>
      </ul>
    </nav>
    <Delete
      v-if="showDeletePopUp"
      :showPopUp="togglePopUp"
      :deleteFunction="deleteItem"
      :selectedId="selectedId"
      :students="students"
    />
  </div>
</template>

<style scoped>
.container {
  margin-top: 80px;
  padding: 20px;
}

.container-background {
  background: linear-gradient(
    90deg,
    rgba(192, 192, 192, 1) 35%,
    rgb(83, 74, 74) 79%
  );
}

table {
  margin-top: 40px;
}

th,
td {
  border: 1px solid black;

  text-align: center;
}

/* ///////// */
.table th,
.table td {
  padding: 0.5rem;
}
</style>
