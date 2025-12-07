<template>
  <section class="lesson-list">
    <!-- HEADER + SORT -->
    <div class="lesson-list-header">
      <div>
        <!-- New greeting -->
        <p v-if="userName" class="user-greeting">
          Hi, {{ userName }} 👋
        </p>

        <!-- Title changes depending on page -->
        <h2 v-if="!showCart">Available Lessons</h2>
        <h2 v-else>Your Cart</h2>

        <!-- Subtitle changes depending on page -->
        <p v-if="!showCart">
          Choose from a range of after school subjects and activities.
        </p>
        <p v-else>
          Confirm details to proceed.
        </p>
      </div>

      <!-- Sort controls ONLY on lessons page -->
      <div class="sort-controls" v-if="!showCart">
        <!-- Search (NEW) -->
        <label class="sort-field search-field">
          <span class="label-heading">Search</span>
          <input
            type="text"
            v-model="searchTerm"
            class="search-input"
            placeholder="Search by subject, location, price..."
          />
        </label>

        <!-- Sort attribute -->
        <label class="sort-field">
          <span class="label-heading">Sort by</span>
          <div class="pill-input">
            <select v-model="sortBy">
              <option value="subject">Subject</option>
              <option value="location">Location</option>
              <option value="price">Price</option>
              <option value="spacesAvailable">Spaces available</option>
            </select>
          </div>
        </label>

        <!-- Sort direction -->
        <div class="sort-direction">
          <span class="label-heading">Order</span>
          <div class="dir-pill">
            <button
              type="button"
              class="dir-btn"
              :class="{ active: sortDirection === 'asc' }"
              @click="sortDirection = 'asc'"
            >
              Asc
            </button>
            <button
              type="button"
              class="dir-btn"
              :class="{ active: sortDirection === 'desc' }"
              @click="sortDirection = 'desc'"
            >
              Desc
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SHOPPING CART TOGGLE BUTTON -->
    <div class="top-actions">
      <button
        class="cart-toggle-btn"
        :disabled="cartItemCount === 0 && !showCart"
        @click="toggleCart"
      >
        <span v-if="!showCart">
          Shopping Cart ({{ cartItemCount }})
        </span>
        <span v-else>
          Back to Lessons
        </span>
      </button>
    </div>

    <!-- LESSONS PAGE -->
    <div v-if="!showCart">
      <!-- FILTER ROW (only shows when relevant) -->
      <div
        class="filter-row"
        v-if="sortBy === 'location' || sortBy === 'price'"
      >
        <!-- Area filter only when sorting by location -->
        <label
          class="sort-field"
          v-if="sortBy === 'location'"
        >
          <span class="label-heading">Area</span>
          <div class="pill-input pill-input--soft">
            <select v-model="filterArea">
              <option value="all">All London areas</option>
              <option value="North London">North London</option>
              <option value="West London">West London</option>
              <option value="South London">South London</option>
              <option value="East London">East London</option>
              <option value="Central London">Central London</option>
            </select>
          </div>
        </label>

        <!-- Price filter only when sorting by price -->
        <label
          class="sort-field"
          v-if="sortBy === 'price'"
        >
          <span class="label-heading">Price range</span>
          <div class="pill-input pill-input--soft">
            <select v-model="filterPriceRange">
              <option value="all">All prices</option>
              <option value="0-15">£0 - £15</option>
              <option value="15-20">£15 - £20</option>
              <option value="20-30">£20 - £30</option>
            </select>
          </div>
        </label>
      </div>

      <!-- LESSON LIST -->
      <div class="lessons-grid">
        <article
          v-for="lesson in displayedLessons"
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

          <!-- Right: Spaces + Add button -->
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
    </div>

    <!-- CART PAGE -->
    <div v-else class="cart-page">
      <div class="cart-header-row">
        <div>
          <h3 class="cart-title">Your Cart</h3>
          <p class="cart-subtitle">
            Review your lessons and complete your enrolment.
          </p>
        </div>
        <button
          type="button"
          class="clear-cart-btn"
          :disabled="cartItemCount === 0"
          @click="clearCart"
        >
          Clear cart
        </button>
      </div>

      <!-- Empty cart message -->
      <p v-if="cartItemCount === 0" class="cart-empty">
        Your cart is empty. Add lessons to see them here.
      </p>

      <!-- Cart items + total -->
      <div v-if="cartItemCount > 0">
        <ul class="cart-list">
          <li
            v-for="item in cart"
            :key="item.id"
            class="cart-item"
          >
            <div class="cart-item-main">
              <h4>{{ item.subject }}</h4>
              <p class="cart-meta">
                {{ item.location }} • £{{ item.price }} per space
              </p>
            </div>
            <div class="cart-item-side">
              <span class="cart-qty">x{{ item.quantity }}</span>
              <span class="cart-total">£{{ item.price * item.quantity }}</span>
              <button
                type="button"
                class="cart-remove-btn"
                @click="removeFromCart(item)"
              >
                Remove one
              </button>
            </div>
          </li>
        </ul>

        <div class="cart-summary">
          <p class="cart-grand-total">
            Total: <strong>£{{ cartTotal }}</strong>
          </p>
        </div>
      </div>

      <!-- CHECKOUT -->
      <div class="checkout-box">
        <div class="checkout-header">
          <h4>Checkout details</h4>
          <span class="checkout-hint">All fields are required</span>
        </div>

        <div class="checkout-field">
          <label for="fullName">Full name</label>
          <input
            id="fullName"
            type="text"
            v-model="customerName"
            placeholder="Student or parent full name"
          />
        </div>

        <div class="checkout-field">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="customerEmail"
            placeholder="Enter valid email"
          />
        </div>

        <div class="checkout-field">
          <label for="phone">Phone</label>
          <input
            id="phone"
            type="text"
            v-model="customerPhone"
            placeholder="Contact number"
            @input="onPhoneInput"
          />
        </div>

        <button
          class="checkout-btn"
          :disabled="!isCheckoutValid"
          @click="checkout"
        >
          Checkout
        </button>

        <p v-if="checkoutMessage" class="checkout-message">
          <i class="fa-solid fa-circle-check"></i>
          <span>{{ checkoutMessage }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
// Backend URL (Render)
const API_BASE = "https://coursework-backend-78fg.onrender.com";

// map subjects -> icons so your cards still look the same
const SUBJECT_ICONS = {
  Math: "fa-solid fa-calculator",
  Science: "fa-solid fa-flask",
  English: "fa-solid fa-book",
  Art: "fa-solid fa-paintbrush",
  Music: "fa-solid fa-music",
  History: "fa-solid fa-landmark",
  Geography: "fa-solid fa-globe",
  Coding: "fa-solid fa-laptop-code",
  Drama: "fa-solid fa-masks-theater",
  Sports: "fa-solid fa-football",
  Physics: "fa-solid fa-atom",
  Biology: "fa-solid fa-dna",
  French: "fa-solid fa-language",
  Dance: "fa-solid fa-person-running",
  Business: "fa-solid fa-briefcase",
  Computing: "fa-solid fa-microchip",
  Robotics: "fa-solid fa-robot",
};

export default {
  name: "LessonList",

  props: {
    userName: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      showCart: false,

      sortBy: "subject",
      sortDirection: "asc",

      filterArea: "all",
      filterPriceRange: "all",

      searchTerm: "",

      cart: [],
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      checkoutMessage: "",

      lessons: [],
    };
  },

  computed: {
    filteredLessons() {
      return this.lessons.filter((lesson) => {
        let ok = true;

        if (this.sortBy === "location" && this.filterArea !== "all") {
          ok = ok && lesson.location === this.filterArea;
        }

        if (this.sortBy === "price" && this.filterPriceRange !== "all") {
          const p = lesson.price;
          if (this.filterPriceRange === "0-15") {
            ok = ok && p >= 0 && p <= 15;
          } else if (this.filterPriceRange === "15-20") {
            ok = ok && p > 15 && p <= 20;
          } else if (this.filterPriceRange === "20-30") {
            ok = ok && p > 20 && p <= 30;
          }
        }

        return ok;
      });
    },

    sortedLessons() {
      const sorted = [...this.filteredLessons];

      sorted.sort((a, b) => {
        const field = this.sortBy;
        let aVal = a[field];
        let bVal = b[field];

        if (typeof aVal === "string") aVal = aVal.toLowerCase();
        if (typeof bVal === "string") bVal = bVal.toLowerCase();

        if (aVal < bVal) return this.sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === "asc" ? 1 : -1;
        return 0;
      });

      return sorted;
    },

    displayedLessons() {
      const term = this.searchTerm.trim().toLowerCase();
      if (!term) return this.sortedLessons;

      return this.sortedLessons.filter((lesson) => {
        const subject = (lesson.subject || "").toLowerCase();
        const location = (lesson.location || "").toLowerCase();
        const priceStr = String(lesson.price || "").toLowerCase();
        const spacesStr = String(lesson.spacesAvailable || "").toLowerCase();

        return (
          subject.includes(term) ||
          location.includes(term) ||
          priceStr.includes(term) ||
          spacesStr.includes(term)
        );
      });
    },

    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },

    cartTotal() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    isCheckoutValid() {
      const name = this.customerName.trim();
      const email = this.customerEmail.trim();
      const phone = this.customerPhone.trim();

      const nameOk = /^[A-Za-z\s]+$/.test(name) && name.length > 0;
      const phoneOk = /^\d+$/.test(phone) && phone.length > 0;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      return nameOk && phoneOk && emailOk && this.cartItemCount > 0;
    },
  },

  watch: {
    searchTerm(newVal) {
      this.loadLessons(newVal);
    },
  },

  methods: {
    async loadLessons(query = "") {
      try {
        const url =
          query && query.trim().length > 0
            ? `${API_BASE}/search?q=${encodeURIComponent(query.trim())}`
            : `${API_BASE}/lessons`;

        const res = await fetch(url);
        const data = await res.json();

        this.lessons = data.map((raw) => ({
          id: raw.id || raw._id || String(Math.random()),
          subject: raw.subject,
          location: raw.location,
          price: raw.price,
          spacesAvailable: raw.spaces,
          description: raw.description,
          icon: SUBJECT_ICONS[raw.subject] || "fa-solid fa-star",
        }));
      } catch (err) {
        console.error("Failed to load lessons from backend:", err);
      }
    },

    toggleCart() {
      this.showCart = !this.showCart;
      if (!this.showCart) {
        this.checkoutMessage = "";
      }
    },

    onPhoneInput() {
      this.customerPhone = this.customerPhone.replace(/\D/g, "");
    },

    addToCart(lesson) {
      if (lesson.spacesAvailable <= 0) return;

      lesson.spacesAvailable--;

      const existing = this.cart.find((item) => item.id === lesson.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.cart.push({
          id: lesson.id,
          subject: lesson.subject,
          location: lesson.location,
          price: lesson.price,
          quantity: 1,
        });
      }
    },

    removeFromCart(cartItem) {
      const lesson = this.lessons.find((l) => l.id === cartItem.id);
      if (lesson) {
        lesson.spacesAvailable++;
      }

      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        this.cart = this.cart.filter((item) => item.id !== cartItem.id);
      }
    },

    clearCart() {
      this.cart.forEach((item) => {
        const lesson = this.lessons.find((l) => l.id === item.id);
        if (lesson) {
          lesson.spacesAvailable += item.quantity;
        }
      });
      this.cart = [];
      this.checkoutMessage = "";
    },

    async checkout() {
      if (!this.isCheckoutValid) return;

      const name = this.customerName.trim();
      const email = this.customerEmail.trim();
      const phone = this.customerPhone.trim();
      const total = this.cartTotal;

      const orderItems = this.cart.map((item) => ({
        lessonId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      this.checkoutMessage = "";

      // -------- POST ORDER --------
      let orderResponseData = null;
      try {
        const res = await fetch(`${API_BASE}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            email,
            items: orderItems,
            total,
          }),
        });

        orderResponseData = await res.json();

        if (!res.ok) {
          this.checkoutMessage =
            orderResponseData.error ||
            "Sorry, we could not place your order. Please try again.";
          return;
        }
      } catch (err) {
        console.error("Failed to send order to backend:", err);
        this.checkoutMessage =
          "Network error: Could not reach the server. Please try again.";
        return;
      }

      // -------- UPDATE SPACES --------
      try {
        const lessonsToUpdate = this.lessons.filter((lesson) =>
          this.cart.some((item) => item.id === lesson.id)
        );

        const updatePromises = lessonsToUpdate.map((lesson) =>
          fetch(`${API_BASE}/lessons/${lesson.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ spaces: lesson.spacesAvailable }),
          })
        );

        await Promise.all(updatePromises);
      } catch (err) {
        console.error("Error updating lesson spaces:", err);
      }

      // -------- SUCCESS --------
      this.checkoutMessage = `Thank you, ${name}! Your order has been submitted. Total: £${total}. We’ll contact you at ${email}.`;

      this.cart = [];
      this.customerName = "";
      this.customerEmail = "";
      this.customerPhone = "";
    },
  },

  mounted() {
    this.loadLessons();
  },
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

/* NEW greeting style */
.user-greeting {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: #0f766e;
}

/* header */
.lesson-list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  gap: 16px;
}

.lesson-list-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 750;
  color: #0f172a;
}

.lesson-list-header p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #6b7280;
}

/* labels */
.label-heading {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
  margin-bottom: 4px;
}

/* sort controls */
.sort-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.sort-field {
  display: flex;
  flex-direction: column;
}

/* search field (NEW) */
.search-field {
  flex: 1;
  min-width: 180px;
}

.search-input {
  border-radius: 999px;
  border: 1px solid #d1d5db;
  padding: 7px 14px;
  font-size: 13px;
  background: #f9fafb;
}

/* top actions (cart button) */
.top-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.cart-toggle-btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(56, 189, 248, 0.45);
}

.cart-toggle-btn:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}

/* pill-style selects */
.pill-input {
  border-radius: 999px;
  padding: 2px;
  background: linear-gradient(135deg, #dbeafe, #bbf7d0);
  display: inline-flex;
}

.pill-input--soft {
  background: linear-gradient(135deg, #e0f2fe, #e0f2fe);
}

.pill-input select {
  border: none;
  outline: none;
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  background: #ffffff;
  color: #111827;
  box-shadow: 0 2px 6px rgba(148, 163, 184, 0.5);
  appearance: none;
}

/* order buttons */
.sort-direction {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dir-pill {
  display: inline-flex;
  border-radius: 999px;
  background: linear-gradient(135deg, #e5e7eb, #e0f2fe);
  padding: 3px;
}

.dir-btn {
  padding: 6px 12px;
  border-radius: 999px;
  border: none;
  background: transparent;
  font-size: 13px;
  cursor: pointer;
  color: #374151;
  font-weight: 500;
}

.dir-btn.active {
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: white;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.45);
}

/* filters */
.filter-row {
  display: flex;
  gap: 18px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

/* lesson list layout */
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

/* left icon */
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

/* middle */
.lesson-main {
  flex: 1;
  min-width: 0;
}

.lesson-title {
  margin: 0;
  font-size: 19px;
  font-weight: 700;
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

/* right side */
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

/* CART PAGE */
.cart-page {
  margin-top: 14px;
  padding: 14px 14px 12px;
  border-radius: 18px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

/* header row in cart */
.cart-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.cart-title {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.cart-subtitle {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6b7280;
}

.clear-cart-btn {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
}

.clear-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.clear-cart-btn:hover:not(:disabled) {
  background: #fee2e2;
  box-shadow: 0 6px 16px rgba(248, 113, 113, 0.4);
  transform: translateY(-1px);
}

.cart-empty {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 10px;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0 0 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

.cart-item-main h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 650;
}

.cart-meta {
  margin: 2px 0 0;
  font-size: 13px;
  color: #6b7280;
}

.cart-item-side {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-qty {
  font-size: 13px;
  font-weight: 600;
}

.cart-total {
  font-size: 14px;
  font-weight: 700;
}

.cart-remove-btn {
  padding: 6px 10px;
  border-radius: 999px;
  border: none;
  background: #fee2e2;
  color: #b91c1c;
  font-size: 12px;
  cursor: pointer;
}

/* summary + checkout */
.cart-summary {
  margin-bottom: 10px;
}

.cart-grand-total {
  font-size: 15px;
  color: #111827;
}

/* checkout box */
.checkout-box {
  margin-top: 8px;
  padding: 14px 14px 12px;
  border-radius: 16px;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  box-shadow: 0 8px 20px rgba(129, 140, 248, 0.25);
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.checkout-box h4 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
}

.checkout-hint {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4b5563;
}

.checkout-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.checkout-field label {
  font-size: 13px;
  margin-bottom: 3px;
  font-weight: 600;
  color: #111827;
}

.checkout-field input {
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 7px 9px;
  font-size: 14px;
  background: #ffffff;
}

.checkout-btn {
  margin-top: 6px;
  padding: 9px 18px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(56, 189, 248, 0.45);
}

.checkout-btn:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}

.checkout-message {
  margin-top: 8px;
  font-size: 14px;
  color: #15803d;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background: #ecfdf3;
  border: 1px solid #bbf7d0;
}

.checkout-message i {
  font-size: 15px;
}

/* responsive */
@media (max-width: 768px) {
  .lesson-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .lesson-side {
    align-items: flex-start;
  }

  .lesson-list-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-row {
    flex-direction: column;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .cart-item-side {
    align-items: flex-start;
  }

  .cart-header-row {
    flex-direction: column;
    gap: 6px;
  }
}
</style>
