<template>
  <section class="lesson-list">
  <div class="lesson-list-header">
  <div>
    <h2>Available Lessons</h2>
    <p>Choose from a range of after school subjects and activities.</p>
  </div>
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
  {{ lesson.description }}
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
  {
    id: 1,
    subject: 'Math',
    location: 'London',
    price: 20,
    spacesAvailable: 5,
    icon: 'fa-solid fa-calculator',
    description: 'Improve your algebra, fractions, equations and problem-solving skills.'
  },
  {
    id: 2,
    subject: 'Science',
    location: 'Birmingham',
    price: 25,
    spacesAvailable: 6,
    icon: 'fa-solid fa-flask',
    description: 'Explore the periodic table, chemical reactions and exciting scientific concepts.'
  },
  {
    id: 3,
    subject: 'English',
    location: 'Manchester',
    price: 18,
    spacesAvailable: 8,
    icon: 'fa-solid fa-book',
    description: 'Boost reading skills, essay writing and understand classic literature.'
  },
  {
    id: 4,
    subject: 'Art',
    location: 'Liverpool',
    price: 15,
    spacesAvailable: 7,
    icon: 'fa-solid fa-paintbrush',
    description: 'Learn sketching, colouring, shading and creative expression techniques.'
  },
  {
    id: 5,
    subject: 'Music',
    location: 'Leeds',
    price: 22,
    spacesAvailable: 5,
    icon: 'fa-solid fa-music',
    description: 'Discover rhythm, melody, musical instruments and performance basics.'
  },
  {
    id: 6,
    subject: 'History',
    location: 'Sheffield',
    price: 19,
    spacesAvailable: 9,
    icon: 'fa-solid fa-landmark',
    description: 'Learn about ancient civilizations, major events and influential leaders.'
  },
  {
    id: 7,
    subject: 'Geography',
    location: 'Nottingham',
    price: 17,
    spacesAvailable: 6,
    icon: 'fa-solid fa-globe',
    description: 'Study maps, climates, natural disasters and world environments.'
  },
  {
    id: 8,
    subject: 'Coding',
    location: 'Bristol',
    price: 30,
    spacesAvailable: 10,
    icon: 'fa-solid fa-laptop-code',
    description: 'Learn the basics of programming, logic, and building simple apps.'
  },
  {
    id: 9,
    subject: 'Drama',
    location: 'Cardiff',
    price: 16,
    spacesAvailable: 5,
    icon: 'fa-solid fa-masks-theater',
    description: 'Build confidence through acting, improvisation and creative performance.'
  },
  {
    id: 10,
    subject: 'Sports',
    location: 'Newcastle',
    price: 12,
    spacesAvailable: 7,
    icon: 'fa-solid fa-football',
    description: 'Improve physical fitness, teamwork and a variety of sport activities.'
  },

  // New lessons
  {
    id: 11,
    subject: 'Physics',
    location: 'Oxford',
    price: 28,
    spacesAvailable: 6,
    icon: 'fa-solid fa-atom',
    description: 'Understand motion, forces, electricity and real-world physics concepts.'
  },
  {
    id: 12,
    subject: 'Biology',
    location: 'Cambridge',
    price: 26,
    spacesAvailable: 8,
    icon: 'fa-solid fa-dna',
    description: 'Learn about cells, organisms, ecosystems and human biology.'
  },
  {
    id: 13,
    subject: 'French',
    location: 'Brighton',
    price: 18,
    spacesAvailable: 7,
    icon: 'fa-solid fa-language',
    description: 'Build vocabulary, pronunciation and conversational French skills.'
  },
  {
    id: 14,
    subject: 'Dance',
    location: 'Southampton',
    price: 14,
    spacesAvailable: 5,
    icon: 'fa-solid fa-person-running',
    description: 'Learn choreography, rhythm and performance technique in fun sessions.'
  },
  {
    id: 15,
    subject: 'Business',
    location: 'York',
    price: 24,
    spacesAvailable: 6,
    icon: 'fa-solid fa-briefcase',
    description: 'Understand finance, entrepreneurship and how businesses work.'
  },
  {
    id: 16,
    subject: 'Computing',
    location: 'Derby',
    price: 27,
    spacesAvailable: 9,
    icon: 'fa-solid fa-microchip',
    description: 'Learn about hardware, software, networking and computer systems.'
  },
  {
    id: 17,
    subject: 'Robotics',
    location: 'Coventry',
    price: 35,
    spacesAvailable: 4,
    icon: 'fa-solid fa-robot',
    description: 'Explore robotics, automation and control systems with hands-on projects.'
  }
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
  background: #ffffff;
  border-radius: 20px;
  padding: 22px 22px 26px;
  box-shadow:
    0 20px 45px rgba(15, 23, 42, 0.16),
    0 0 0 1px rgba(148, 163, 184, 0.18);
}

/* header */
.lesson-list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}

.lesson-list-header h2 {
  margin: 0;
  font-size: 23px;
  font-weight: 650;
  color: #0f172a;
}

.lesson-list-header p {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6b7280;
}

/* horizontal card layout */
.lessons-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.lesson-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 18px;
  border-radius: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease,
    border-color 0.15s ease;
}

.lesson-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(148, 163, 184, 0.55);
  background: #ffffff;
  border-color: #bfdbfe;
}

/* left icon block */
.lesson-icon-wrap {
  width: 54px;
  height: 54px;
  border-radius: 16px;
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

/* middle content */
.lesson-main {
  flex: 1;
  min-width: 0;
}

.lesson-title {
  margin: 0;
  font-size: 19px;
  font-weight: 650;
  color: #111827;
}

.lesson-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 7px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
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
  margin: 7px 0 0;
  font-size: 13px;
  line-height: 1.45;
  color: #4b5563;
}

/* right side: spaces + button */
.lesson-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 160px;
}

.spaces-pill {
  font-size: 13px;
  font-weight: 500;
  padding: 5px 12px;
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
  padding: 9px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
  box-shadow: 0 8px 18px rgba(56, 189, 248, 0.45);
}

.add-btn:hover:not(:disabled) {
  opacity: 0.92;
  transform: translateY(-1px);
  box-shadow: 0 12px 25px rgba(56, 189, 248, 0.6);
}

.add-btn:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
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
