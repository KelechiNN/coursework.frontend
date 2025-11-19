<template>
  <div class="lesson-list">
    <h2>Extra Lessons</h2>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.id" class="lesson-card">
        <h3>
  <i :class="lesson.icon" class="lesson-icon"></i>
  {{ lesson.subject }}
</h3>
        <p><strong>Location:</strong> {{ lesson.location }}</p>
        <p><strong>Price:</strong> £{{ lesson.price }}</p>
        <p><strong>Spaces:</strong> {{ lesson.spaces }}</p>
        <button
          :disabled="lesson.spaces === 0"
          @click="addToCart(lesson)"
        >
          Add to Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LessonList',
  data() {
    return {
      lessons: [
        { id: 1, subject: 'Math', location: 'London', price: 20, spaces: 5, icon: 'fa-solid fa-calculator' },
        { id: 2, subject: 'Science', location: 'Birmingham', price: 25, spaces: 6, icon: 'fa-solid fa-flask' },
        { id: 3, subject: 'English', location: 'Manchester', price: 18, spaces: 8, icon: 'fa-solid fa-book' },
        { id: 4, subject: 'Art', location: 'Liverpool', price: 15, spaces: 7, icon: 'fa-solid fa-paintbrush' },
        { id: 5, subject: 'Music', location: 'Leeds', price: 22, spaces: 5, icon: 'fa-solid fa-music' },
        { id: 6, subject: 'History', location: 'Sheffield', price: 19, spaces: 9, icon: 'fa-solid fa-landmark' },
        { id: 7, subject: 'Geography', location: 'Nottingham', price: 17, spaces: 6, icon: 'fa-solid fa-globe' },
        { id: 8, subject: 'Coding', location: 'Bristol', price: 30, spaces: 10, icon: 'fa-solid fa-laptop-code' },
        { id: 9, subject: 'Drama', location: 'Cardiff', price: 16, spaces: 5, icon: 'fa-solid fa-masks-theater' },
        { id: 10, subject: 'Sports', location: 'Newcastle', price: 12, spaces: 7, icon: 'fa-solid fa-football' }
      ]
    };
  },
  methods: {
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        lesson.spaces--;
        alert(`${lesson.subject} added to cart!`);
      }
    }
  }
};
</script>


<style scoped>
.lesson-list {
  max-width: 700px;
  margin: 40px auto;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.lesson-card {
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

.lesson-card:last-child {
  border-bottom: none;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
.lesson-icon {
  color: #42b983;
  margin-right: 10px;
}

</style>
