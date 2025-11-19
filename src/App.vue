<template>
  <div class="app">
    <header>
      <h1>After School Lessons</h1>
    </header>

    <main>
      <LessonList />
    </main>
  </div>
</template>

<script>
import LessonList from './components/LessonList.vue';

export default {
  name: 'App',
  components: { LessonList }
};
</script>

<style scoped>
.app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  padding: 40px;
  background: #f4f4f4;
  min-height: 100vh;
}

header {
  background: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
