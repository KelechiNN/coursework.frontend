<template>
  <section class="lesson-list">
    <!-- HEADER + SORT -->
    <div class="lesson-list-header">
      <div>
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
          v-for="lesson in sortedLessons"
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
        <h3 class="cart-title">Your Cart</h3>
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

      <!-- CHECKOUT (always shows on cart page so message stays visible) -->
      <div class="checkout-box">
        <h4>Checkout details</h4>

        <div class="checkout-field">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            v-model="customerName"
            placeholder="Student or parent name"
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
          {{ checkoutMessage }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LessonList',
  data() {
    return {
      // view
      showCart: false,

      // sorting
      sortBy: 'subject',
      sortDirection: 'asc',

      // filters
      filterArea: 'all',
      filterPriceRange: 'all',

      // cart
      cart: [], // [{ id, subject, location, price, quantity }]
      customerName: '',
      customerPhone: '',
      checkoutMessage: '',

      lessons: [
        {
          id: 1,
          subject: 'Math',
          location: 'North London',
          price: 20,
          spacesAvailable: 5,
          icon: 'fa-solid fa-calculator',
          description:
            'Improve your algebra, fractions, equations and problem-solving skills.'
        },
        {
          id: 2,
          subject: 'Science',
          location: 'West London',
          price: 25,
          spacesAvailable: 6,
          icon: 'fa-solid fa-flask',
          description:
            'Explore the periodic table, chemical reactions and exciting scientific concepts.'
        },
        {
          id: 3,
          subject: 'English',
          location: 'South London',
          price: 18,
          spacesAvailable: 8,
          icon: 'fa-solid fa-book',
          description:
            'Boost reading skills, essay writing and understand classic literature.'
        },
        {
          id: 4,
          subject: 'Art',
          location: 'East London',
          price: 15,
          spacesAvailable: 7,
          icon: 'fa-solid fa-paintbrush',
          description:
            'Learn sketching, colouring, shading and creative expression techniques.'
        },
        {
          id: 5,
          subject: 'Music',
          location: 'Central London',
          price: 22,
          spacesAvailable: 5,
          icon: 'fa-solid fa-music',
          description:
            'Discover rhythm, melody, musical instruments and performance basics.'
        },
        {
          id: 6,
          subject: 'History',
          location: 'North London',
          price: 19,
          spacesAvailable: 9,
          icon: 'fa-solid fa-landmark',
          description:
            'Learn about ancient civilizations, major events and influential leaders.'
        },
        {
          id: 7,
          subject: 'Geography',
          location: 'East London',
          price: 17,
          spacesAvailable: 6,
          icon: 'fa-solid fa-globe',
          description:
            'Study maps, climates, natural disasters and world environments.'
        },
        {
          id: 8,
          subject: 'Coding',
          location: 'Central London',
          price: 30,
          spacesAvailable: 10,
          icon: 'fa-solid fa-laptop-code',
          description:
            'Learn the basics of programming, logic, and building simple apps.'
        },
        {
          id: 9,
          subject: 'Drama',
          location: 'West London',
          price: 16,
          spacesAvailable: 5,
          icon: 'fa-solid fa-masks-theater',
          description:
            'Build confidence through acting, improvisation and creative performance.'
        },
        {
          id: 10,
          subject: 'Sports',
          location: 'South London',
          price: 12,
          spacesAvailable: 7,
          icon: 'fa-solid fa-football',
          description:
            'Improve physical fitness, teamwork and a variety of sport activities.'
        },
        {
          id: 11,
          subject: 'Physics',
          location: 'North London',
          price: 28,
          spacesAvailable: 6,
          icon: 'fa-solid fa-atom',
          description:
            'Understand motion, forces, electricity and real-world physics concepts.'
        },
        {
          id: 12,
          subject: 'Biology',
          location: 'East London',
          price: 26,
          spacesAvailable: 8,
          icon: 'fa-solid fa-dna',
          description:
            'Learn about cells, organisms, ecosystems and human biology.'
        },
        {
          id: 13,
          subject: 'French',
          location: 'Central London',
          price: 18,
          spacesAvailable: 7,
          icon: 'fa-solid fa-language',
          description:
            'Build vocabulary, pronunciation and conversational French skills.'
        },
        {
          id: 14,
          subject: 'Dance',
          location: 'South London',
          price: 14,
          spacesAvailable: 5,
          icon: 'fa-solid fa-person-running',
          description:
            'Learn choreography, rhythm and performance technique in fun sessions.'
        },
        {
          id: 15,
          subject: 'Business',
          location: 'West London',
          price: 24,
          spacesAvailable: 6,
          icon: 'fa-solid fa-briefcase',
          description:
            'Understand finance, entrepreneurship and how businesses work.'
        },
        {
          id: 16,
          subject: 'Computing',
          location: 'North London',
          price: 27,
          spacesAvailable: 9,
          icon: 'fa-solid fa-microchip',
          description:
            'Learn about hardware, software, networking and computer systems.'
        },
        {
          id: 17,
          subject: 'Robotics',
          location: 'Central London',
          price: 30,
          spacesAvailable: 4,
          icon: 'fa-solid fa-robot',
          description:
            'Explore robotics, automation and control systems with hands-on projects.'
        }
      ]
    };
  },
  computed: {
    // FILTER then SORT list of lessons
    filteredLessons() {
      return this.lessons.filter(lesson => {
        let ok = true;

        if (this.sortBy === 'location' && this.filterArea !== 'all') {
          ok = ok && lesson.location === this.filterArea;
        }

        if (this.sortBy === 'price' && this.filterPriceRange !== 'all') {
          const p = lesson.price;
          if (this.filterPriceRange === '0-15') {
            ok = ok && p >= 0 && p <= 15;
          } else if (this.filterPriceRange === '15-20') {
            ok = ok && p > 15 && p <= 20;
          } else if (this.filterPriceRange === '20-30') {
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

        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();

        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      return sorted;
    },

    // CART COMPUTED
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
      const phone = this.customerPhone.trim();

      const nameOk = /^[A-Za-z\s]+$/.test(name) && name.length > 0;
      const phoneOk = /^\d+$/.test(phone) && phone.length > 0;

      return nameOk && phoneOk && this.cartItemCount > 0;
    }
  },
  methods: {
    toggleCart() {
      this.showCart = !this.showCart;
      // when leaving cart, clear any old checkout message
      if (!this.showCart) {
        this.checkoutMessage = '';
      }
    },

    onPhoneInput() {
      // keep only digits in the phone input
      this.customerPhone = this.customerPhone.replace(/\D/g, '');
    },

    // ADD TO CART: reduces spaces and stores item in cart
    addToCart(lesson) {
      if (lesson.spacesAvailable <= 0) return;

      lesson.spacesAvailable--;

      const existing = this.cart.find(item => item.id === lesson.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.cart.push({
          id: lesson.id,
          subject: lesson.subject,
          location: lesson.location,
          price: lesson.price,
          quantity: 1
        });
      }
    },

    // REMOVE: returns one space to lesson and reduces quantity in cart
    removeFromCart(cartItem) {
      const lesson = this.lessons.find(l => l.id === cartItem.id);
      if (lesson) {
        lesson.spacesAvailable++;
      }

      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        this.cart = this.cart.filter(item => item.id !== cartItem.id);
      }
    },

    // Clear cart button
    clearCart() {
      // return spaces to lessons
      this.cart.forEach(item => {
        const lesson = this.lessons.find(l => l.id === item.id);
        if (lesson) {
          lesson.spacesAvailable += item.quantity;
        }
      });
      this.cart = [];
      this.checkoutMessage = '';
    },

    checkout() {
      if (!this.isCheckoutValid) return;

      const name = this.customerName.trim();
      this.checkoutMessage = `Thank you, ${name}! Your order has been submitted.`;

      // clear cart and form (spaces stay reduced – order is confirmed)
      this.cart = [];
      this.customerName = '';
      this.customerPhone = '';

      // stay on cart page; message remains until user leaves the cart
      // (toggleCart will clear checkoutMessage when leaving)
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
}

.sort-field {
  display: flex;
  flex-direction: column;
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
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
}

/* header row in cart */
.cart-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cart-title {
  font-size: 22px;
  font-weight: 750;
  color: #111827;
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
  background: #f9fafb;
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
  padding: 12px 14px;
  border-radius: 14px;
  background: #f3f4ff;
  border: 1px solid #e5e7eb;
}

.checkout-box h4 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 650;
}

.checkout-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.checkout-field label {
  font-size: 13px;
  margin-bottom: 3px;
}

.checkout-field input {
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 6px 8px;
  font-size: 14px;
}

.checkout-btn {
  margin-top: 4px;
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.checkout-btn:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

.checkout-message {
  margin-top: 6px;
  font-size: 14px;
  color: #15803d;
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
}
</style>
