<template>
  <div class="app-shell">
    <header class="top-bar">
      <div class="brand">
        <span class="brand-icon">
          <i class="fa-solid fa-school"></i>
        </span>
        <div>
          <h1 class="brand-title">After School Activities</h1>
          <p class vanilla="brand-subtitle">Browse and book extra lessons for students</p>
        </div>
      </div>

      <!-- Cart button will do more later when we add cart feature -->
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
  color: #1f2933;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;
  background: #111827;
  color: #f9fafb;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-icon i {
  color: white;
  font-size: 18px;
}

.brand-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.brand-subtitle {
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
}

.cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background: #111827;
  color: #e5e7eb;
  font-size: 14px;
  cursor: not-allowed; /* we’ll enable later when cart is wired up */
  opacity: 0.7;
}

.cart-btn i {
  font-size: 14px;
}

.content-area {
  max-width: 1200px;
  margin: 24px auto 40px;
  padding: 0 24px 24px;
}
</style>
