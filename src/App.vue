<template>
  <div class="app-shell">
    <header class="top-bar">
      <div class="brand">
        <span class="brand-icon">
          <i class="fa-solid fa-school"></i>
        </span>
        <div>
          <h1 class="brand-title">After School Activities</h1>
          <p class="brand-subtitle">
            Browse and book extra lessons to support students after school.
          </p>
        </div>
      </div>

      <!-- We'll hook this up to the real cart later -->
      <button class="cart-btn" disabled>
        <i class="fa-solid fa-cart-shopping"></i>
        <span>Cart (0)</span>
      </button>
    </header>

    <main class="content-area">
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
.app-shell {
  min-height: 100vh;
  background: radial-gradient(circle at top left, #e0f2ff, #f7f7ff);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #111827;
}

/* header */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;
  background: linear-gradient(120deg, #0f172a, #111827);
  color: #f9fafb;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.45);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-icon {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-icon i {
  color: white;
  font-size: 20px;
}

.brand-title {
  margin: 0;
  font-size: 22px;
  font-weight: 650;
}

.brand-subtitle {
  margin: 2px 0 0;
  font-size: 13px;
  opacity: 0.85;
}

.cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background: rgba(15, 23, 42, 0.9);
  color: #e5e7eb;
  font-size: 14px;
  cursor: not-allowed; /* we'll enable when cart is done */
  opacity: 0.75;
}

.cart-btn i {
  font-size: 14px;
}

/* main wrapper */
.content-area {
  max-width: 1200px;
  margin: 28px auto 40px;
  padding: 0 24px 24px;
}
</style>

