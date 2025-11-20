<template>
  <section class="lesson-list">
    <div class="lesson-list-header">
      <div>
        <h2>Available Lessons</h2>
        <p>Choose from a range of after school subjects.</p>
      </div>
      <!-- later we’ll add sorting controls here -->
    </div>

    <div class="lessons-grid">
      <article
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-card"
      >
        <!-- Left: Icon -->
        <div class="lesson-icon-wrap">
          <i :class="lesson.icon"></i>
        </div>

        <!-- Middle: Info -->
        <div class="lesson-main">
          <h3 class="lesson-title">{{ lesson.subject }}</h3>
          <div class="lesson-tags">
            <span class="tag tag-location">
              <i class="fa-solid fa-location-dot"></i>
              {{ lesson.location }}
            </span>
            <span class="tag tag-price">
              £{{ lesson.price }}
            </span>
          </div>
          <p class="lesson-description">
            Great after school {{ lesson.subject.toLowerCase() }} support for students.
          </p>
        </div>

        <!-- Right: Spaces + Button -->
        <div class="lesson-side">
          <div
            class="spaces-pill"
            :class="{ 'spaces-pill--full': lesson.spacesAvailable === 0 }"
          >
            <span v-if="lesson.spacesAvailable > 0">
              {{ lesson.spacesAvailable }} spaces available
            </span>
            <span v-else>Fully booked</span>
          </div>

          <button
            class="add-btn"
            :disabled="lesson.spacesAvailable === 0"
            @click="addToCart(lesson)"
          >
            {{ lesson.spacesAvailable === 0 ? 'Full' : 'Add to Cart' }}
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LessonList',
  data() {
    return {
      lessons: [
        { id: 1, subject: 'Math',      location: 'London',     price: 20, spacesAvailable: 5,  icon: 'fa-solid fa-calculator' },
        { id: 2, subject: 'Science',   location: 'Birmingham', price: 25, spacesAvailable: 6,  icon: 'fa-solid fa-flask' },
        { id: 3, subject: 'English',   location: 'Manchester', price: 18, spacesAvailable: 8,  icon: 'fa-solid fa-book' },
        { id: 4, subject: 'Art',       location: 'Liverpool',  price: 15, spacesAvailable: 7,  icon: 'fa-solid fa-paintbrush' },
        { id: 5, subject: 'Music',     location: 'Leeds',      price: 22, spacesAvailable: 5,  icon: 'fa-solid fa-music' },
        { id: 6, subject: 'History',   location: 'Sheffield',  price: 19, spacesAvailable: 9,  icon: 'fa-solid fa-landmark' },
        { id: 7, subject: 'Geography', location: 'Nottingham', price: 17, spacesAvailable: 6,  icon: 'fa-solid fa-globe' },
        { id: 8, subject: 'Coding',    location: 'Bristol',    price: 30, spacesAvailable: 10, icon: 'fa-solid fa-laptop-code' },
        { id: 9, subject: 'Drama',     location: 'Cardiff',    price: 16, spacesAvailable: 5,  icon: 'fa-solid fa-masks-theater' },
        { id: 10, subject: 'Sports',   location: 'Newcastle',  price: 12, spacesAvailable: 7,  icon: 'fa-solid fa-football' }
      ]
    };
  },
  methods: {
    addToCart(lesson) {
      if (lesson.spacesAvailable > 0) {
        lesson.spacesAvailable--;
        alert(`${lesson.subject} added to cart!`);
      }
    }
  }
};
</script>

<style scoped>
.lesson-list {
  background: white;
  border-radius: 18px;
  padding: 20px 22px 24px;
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.12),
    0 0 0 1px rgba(148, 163, 184, 0.12);
}

.lesson-list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 18px;
}

.lesson-list-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.lesson-list-header p {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6b7280;
}

/* Horizontal layout – cards */
.lessons-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.lesson-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.lesson-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(148, 163, 184, 0.4);
  background: #ffffff;
}

.lesson-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: radial-gradient(circle at 20% 20%, #3b82f6, #10b981);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lesson-icon-wrap i {
  color: white;
  font-size: 24px;
}

.lesson-main {
  flex: 1;
  min-width: 0;
}

.lesson-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #111827;
}

.lesson-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid transparent;
}

.tag-location {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.tag-location i {
  font-size: 11px;
}

.tag-price {
  background: #ecfdf3;
  color: #15803d;
  border-color: #bbf7d0;
}

.lesson-description {
  margin: 6px 0 0;
  font-size: 13px;
  color: #6b7280;
}

/* Right side: spaces and button */
.lesson-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 150px;
}

.spaces-pill {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #ecfdf3;
  color: #166534;
  border: 1px solid #bbf7d0;
  white-space: nowrap;
}

.spaces-pill--full {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

.add-btn {
  padding: 8px 14px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.1s ease;
}

.add-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.add-btn:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .lesson-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .lesson-side {
    align-items: flex-start;
  }
}
</style>
