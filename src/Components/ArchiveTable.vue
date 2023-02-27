<script setup>
import { ref, watch, computed, reactive, onMounted } from "vue";
import Restore from "./Restore.vue";
import Data from "../Data/data.json";
const archivedData = ref([]);
const students = ref(Data);

const restoreFromLocalStorage = () => {
  const restoredItem = JSON.parse(localStorage.getItem("archive")) || [];
  archivedData.value = restoredItem;
};

onMounted(() => {
  restoreFromLocalStorage();
});

// Restore Pop Up
const showRestorePopUp = ref(false);
const togglePopUp = () => {
  showRestorePopUp.value = !showRestorePopUp.value;
};

// Search
const search = ref("");
watch(search, () => {
  archivedData.value = ArchiveData.filter((student) =>
    student.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const displayedArchivedStudents = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  let modifier = 1;
  return archivedData.value.slice(start, end).sort((a, b) => {
    if (sortDirection.value === -1) modifier = -1;
    if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
  });
});

// when clicked restore
const handleRestore = (id) => {
  togglePopUp();
  selectedId.value = id;
};

//  Delete Student And Save It To Archive
const selectedId = ref(-1);

const restoreItem = (id) => {
  archivedData.value = archivedData.value.filter(
    (student) => student.id !== id
  );
  const studentObj = computed(() => {
    return archivedData.value.find((Obj) => Obj.id === id);
  });
  students.value.push(studentObj);
  const studentsImported = JSON.parse(localStorage.getItem("students")) || [];
  localStorage.setItem(
    "students",
    JSON.stringify([...studentsImported, studentObj])
  );
  togglePopUp();
};

// sort
const sortKey = ref("id");
const sortDirection = ref(1);
const sortTable = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value * -1;
  } else {
    sortKey.value = key;
    sortDirection.value = 1;
  }
};
// TABLE PAGINATION
const pageSize = 5;
const currentPage = reactive({
  value: 1,
});
const pageCount = computed(() =>
  Math.ceil(archivedData.value.length / pageSize)
);
const pagesArray = computed(() => {
  const result = [];
  for (let i = 1; i <= pageCount.value; i++) {
    result.push(i);
  }
  return result;
});

function changePage(pageNumber) {
  console.log(pageNumber);
  currentPage.value = pageNumber;
}

function nextPage() {
  console.log("sdlfk");
  if (currentPage.value < pageCount) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>
<template>
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
        <tr
          v-for="student in displayedArchivedStudents"
          :key="student.id"
          :class="
            (student.id - 1) % 2 === 0 ? 'table-light' : 'table-secondary'
          "
        >
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.date }}</td>
          <td>{{ student.city }}</td>
          <td class="buttons">
            <button class="btn btn btn-dark" @click="handleRestore(student.id)">
              restore
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">&laquo;</button>
        </li>
        <li
          v-for="pageNumber in pagesArray"
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
  </div>

  <Restore
    v-if="showRestorePopUp"
    :togglePopUp="togglePopUp"
    :restoreStudent="restoreItem"
    :archivedStudents="archivedData"
    :selectedId="selectedId"
  />
</template>

<style scoped>
td {
  padding: 0.5rem;

  border: 1px solid black; /* Add a border to each table cell */

  text-align: center; /* Center the text within each table cell */
}

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
