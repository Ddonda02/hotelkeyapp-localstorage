<script setup>
const { displayedStudents, editUser, handleDelete } = defineProps([
  "displayedStudents",
  "editUser",
  "handleDelete",
]);
</script>

<template>
  <tr
    v-for="(student, index) in displayedStudents"
    :key="student.id"
    :class="(student.id - 1) % 2 === 0 ? 'table-light' : 'table-secondary'"
  >
    <td>{{ student.id }}</td>
    <td>{{ student.name }}</td>
    <td>{{ student.date }}</td>
    <td>{{ student.city }}</td>
    <td class="buttons">
      <button class="btn btn btn-dark" @click="editUser(index)">Edit</button>
      <button class="btn btn btn-danger" @click="handleDelete(student.id)">
        Delete
      </button>
    </td>
  </tr>
</template>

<style scoped>
td {
  padding: 0.5rem;

  border: 1px solid black; /* Add a border to each table cell */

  text-align: center; /* Center the text within each table cell */
}
</style>
