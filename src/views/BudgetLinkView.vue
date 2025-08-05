<template>
  <div class="budget-link-view">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <img src="https://via.placeholder.com/120x40/007bff/ffffff?text=LOGO" alt="Logo" />
        </div>
        
        <div class="balance">
          <div class="balance-label">Баланс</div>
          <div class="balance-amount">₽ 125,430.50</div>
        </div>
        
        <div class="menu-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>
    </header>

    <div class="layout">
      <!-- Sidebar with categories -->
      <aside class="sidebar">
        <h3 class="sidebar-title">Категории</h3>
        <div class="categories">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="['category-btn', { active: selectedCategory === category.id }]"
          >
            {{ category.name }}
            <span class="category-count">({{ getCategoryCount(category.id) }})</span>
          </button>
        </div>
      </aside>

      <!-- Main content with cards -->
      <main class="main-content">
        <div class="cards-grid">
          <div 
            v-for="card in filteredCards" 
            :key="card.id" 
            class="card"
          >
            <div class="card-image">
              <img :src="card.image" :alt="card.title" />
            </div>
            <h3 class="card-title">{{ card.title }}</h3>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Card {
  id: number
  title: string
  image: string
  categoryId: number
}

interface Category {
  id: number
  name: string
}

const selectedCategory = ref<number | null>(null)

const categories: Category[] = [
  { id: 1, name: 'Все категории' },
  { id: 2, name: 'Продукты' },
  { id: 3, name: 'Развлечения' },
  { id: 4, name: 'Транспорт' },
  { id: 5, name: 'Здоровье' }
]

const cards: Card[] = [
  {
    id: 1,
    title: 'Продукты питания',
    image: 'https://picsum.photos/300/200?random=1',
    categoryId: 2
  },
  {
    id: 2,
    title: 'Кинотеатр',
    image: 'https://picsum.photos/300/200?random=2',
    categoryId: 3
  },
  {
    id: 3,
    title: 'Такси',
    image: 'https://picsum.photos/300/200?random=3',
    categoryId: 4
  },
  {
    id: 4,
    title: 'Аптека',
    image: 'https://picsum.photos/300/200?random=4',
    categoryId: 5
  },
  {
    id: 5,
    title: 'Ресторан',
    image: 'https://picsum.photos/300/200?random=5',
    categoryId: 3
  },
  {
    id: 6,
    title: 'Общественный транспорт',
    image: 'https://picsum.photos/300/200?random=6',
    categoryId: 4
  },
  {
    id: 7,
    title: 'Фрукты',
    image: 'https://picsum.photos/300/200?random=7',
    categoryId: 2
  },
  {
    id: 8,
    title: 'Спортзал',
    image: 'https://picsum.photos/300/200?random=8',
    categoryId: 5
  },
  {
    id: 9,
    title: 'Театр',
    image: 'https://picsum.photos/300/200?random=9',
    categoryId: 3
  }
]

const filteredCards = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 1) {
    return cards
  }
  return cards.filter(card => card.categoryId === selectedCategory.value)
})

const selectCategory = (categoryId: number) => {
  selectedCategory.value = categoryId
}

const getCategoryCount = (categoryId: number) => {
  if (categoryId === 1) {
    return cards.length
  }
  return cards.filter(card => card.categoryId === categoryId).length
}
</script>

<style scoped>
.budget-link-view {
  padding: 20px;
  padding-top: 100px; /* Add top padding for fixed header */
}

.layout {
  display: flex;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header styles */
.header {
  background-color: #007bff;
  color: white;
  padding: 15px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo img {
  height: 40px;
}

.balance {
  text-align: center;
}

.balance-label {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 5px;
}

.balance-amount {
  font-size: 24px;
  font-weight: bold;
}

.menu-icon {
  cursor: pointer;
}

/* Sidebar styles */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.sidebar-title {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: none;
  background: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 14px;
  color: #333;
}

.category-btn:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.category-btn.active {
  background: #007bff;
  color: white;
}

.category-count {
  font-size: 12px;
  opacity: 0.8;
}

/* Main content styles */
.main-content {
  flex: 1;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border: 2px solid #007bff;
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-image img {
  transform: scale(1.05);
}

.card-title {
  padding: 16px;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
}

/* Responsive design */
@media (max-width: 1024px) {
  .layout {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .categories {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .category-btn {
    flex: 1;
    min-width: 150px;
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .category-btn {
    min-width: 120px;
  }
}
</style>
