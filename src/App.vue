<template>
  <div class="app-shell">
    <header class="top-bar">
      <div class="top-bar-inner">
        <!-- LEFT: BRAND -->
        <div class="brand">
          <span class="brand-icon">
            <i class="fa-solid fa-school"></i>
          </span>
          <div>
            <h1 class="brand-title">After School Activities</h1>
            <p class="brand-subtitle">
              Extra classes and activities to help students stay ahead.
            </p>
          </div>
        </div>

        <!-- RIGHT: INFO + (OPTIONAL) USER + CART -->
        <div class="top-actions">
          <!-- Always show status pill -->
          <div class="info-pill">
            <span class="dot"></span>
            <span>Open for enrolment</span>
          </div>

          <!-- Only show these AFTER login -->
          <template v-if="started">
            <div class="user-actions">
              <span class="user-pill">Hi, {{ fullName }} 👋</span>
              <button class="signout-btn" @click="signOut">
                Sign out
              </button>
            </div>

            <!-- Cart button: NO (0), clickable -->
            <button class="cart-btn" @click="scrollToCart">
              <i class="fa-solid fa-cart-shopping"></i>
              <span>Cart</span>
            </button>
          </template>
        </div>
      </div>
    </header>

    <main class="content-area">
      <!-- LOGIN / LANDING PAGE -->
      <section v-if="!started" class="landing">
        <div class="landing-card">
          <h2 class="landing-title">
            Enter your full name to continue
          </h2>
          <p class="landing-subtitle">
            We’ll use this name to personalise your after school lessons.
          </p>

          <label class="landing-label" for="landingName">
            Full name
          </label>
          <input
            id="landingName"
            type="text"
            v-model="fullName"
            placeholder="Student or parent full name"
            class="landing-input"
          />
          <p class="landing-hint">
            Letters and spaces only.
          </p>

          <button
            class="landing-btn"
            :disabled="!isNameValid"
            @click="startApp"
          >
            Continue
          </button>
        </div>
      </section>

      <!-- MAIN APP (LESSONS + CART) -->
      <section v-else>
        <!-- Name passed down so LessonList shows "Hi, Name 👋" too -->
        <!-- ✅ added ref="lessonList" -->
        <LessonList ref="lessonList" :user-name="fullName" />
      </section>
    </main>
  </div>
</template>

<script>
import LessonList from './components/LessonList.vue';

export default {
  name: 'App',
  components: { LessonList },

  data() {
    return {
      started: false,
      fullName: ''
    };
  },

  computed: {
    isNameValid() {
      const name = this.fullName.trim();
      return /^[A-Za-z\s]+$/.test(name) && name.length > 0;
    }
  },

  methods: {
    startApp() {
      if (this.isNameValid) {
        this.started = true;
      }
    },
    signOut() {
      this.started = false;
      this.fullName = '';
    },
    scrollToCart() {
      // ✅ First try calling the method on LessonList directly
      if (this.$refs.lessonList && typeof this.$refs.lessonList.toggleCart === 'function') {
        this.$refs.lessonList.toggleCart();
        return;
      }

      // Fallback: old behaviour using the button id inside LessonList
      const btn = document.getElementById('mainCartToggle');
      if (btn) btn.click();
    }
  }
};
</script>

<style scoped>
/* Global Typography Upgrade */
:root {
  --font-base: 16px;
  --font-small: 14px;
  --font-medium: 18px;
  --font-large: 22px;
  --font-xl: 28px;
  --font-xxl: 34px;

  --font-weight-normal: 500;
  --font-weight-bold: 700;
  --font-weight-heavy: 800;
}

body {
  font-size: var(--font-base);
  font-weight: var(--font-weight-normal);
}
.app-shell {
  min-height: 100vh;
  background: radial-gradient(circle at top left, #e0f2ff, #f7f7ff);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #111827;
}

/* BIG, BOLD HERO HEADER */
.top-bar {
  position: relative;
  padding: 0 0 32px 0;
}

/* decorative glow behind header */
.top-bar::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.5), transparent 55%);
  opacity: 0.6;
  pointer-events: none;
}

.top-bar-inner {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  max-width: 1200px;
  padding: 30px 55px 26px;
  background: linear-gradient(125deg, #020617, #0b1220 40%, #111827 80%);
  border-radius: 0 0 26px 26px;
  box-shadow:
    0 22px 50px rgba(15, 23, 42, 0.7),
    0 0 0 1px rgba(148, 163, 184, 0.35);
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: heroFadeIn 0.6s ease-out;
}

.brand {
  display: flex;
  align-items: center;
  gap: 18px;
}

.brand-icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.7);
}

.brand-icon i {
  color: white;
  font-size: 28px;
}

.brand-title {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, #ffffff, #dbeafe);
  -webkit-background-clip: text;
  color: transparent;
}

.brand-subtitle {
  margin: 6px 0 0;
  font-size: 15px;
  color: #e5e7eb;
  opacity: 0.9;
}

/* right side of header */
.top-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* little status pill */
.info-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.15);
  border: 1px solid rgba(45, 212, 191, 0.5);
  color: #a5f3fc;
  font-size: 13px;
}

.info-pill .dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.35);
}

/* greeting + signout */
.user-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.user-pill {
  background: rgba(15, 118, 110, 0.18);
  color: #a5f3fc;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 13px;
  border: 1px solid rgba(45, 212, 191, 0.4);
}

.signout-btn {
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(248, 250, 252, 0.3);
  background: #ef4444;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

/* cart button (kept same look, just no (0)) */
.cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid rgba(248, 250, 252, 0.3);
  background: rgba(15, 23, 42, 0.9);
  color: #e5e7eb;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  opacity: 0.9;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.7);
}

.cart-btn i {
  font-size: 16px;
}

/* main content wrapper */
.content-area {
  max-width: 1200px;
  margin: 30px auto 40px;
  padding: 0 24px 24px;
}

/* landing styles */
.landing {
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

.landing-card {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 30px 28px;
  box-shadow:
    0 18px 40px rgba(148, 163, 184, 0.45),
    0 0 0 1px rgba(191, 219, 254, 0.9);
}

.landing-title {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  color: #0f172a;
}

.landing-subtitle {
  margin: 0 0 20px;
  font-size: 14px;
  color: #6b7280;
}

.landing-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #111827;
}

.landing-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  padding: 10px 12px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.landing-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.landing-hint {
  margin: 4px 0 18px;
  font-size: 12px;
  color: #9ca3af;
}

.landing-btn {
  width: 100%;
  padding: 11px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(56, 189, 248, 0.6);
}

/* subtle fade-in for hero */
@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
