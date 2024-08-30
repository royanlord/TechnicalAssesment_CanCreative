<script setup lang="ts">
import { ref } from 'vue'

interface MenuItem {
  name: string
  link: string
}

const isOpen = ref(false)
const menuItems = ref<MenuItem[]>([
  { name: 'Home', link: '/' },
  { name: 'Favorite', link: '/favorite' },
])

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
    <nav class="bg-gray-800 z-[1000] fixed top-0 w-full out-shadow">
        <div class="max-w-7xl h-20 flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center w-full h-16 justify-between">
                <div class="flex-shrink-0">
                    <p class="text-white lg:text-2xl md:text-lg sm:text-base font-bold">
                        <router-link to="/">
                        NgeGameYok
                        </router-link>
                    </p>
                </div>
                <div class="nav-menus hidden md:block">
                    <div class="ml-10 flex items-baseline justify-end space-x-4">
                        <router-link to="/" class="nav-link nav-menu text-gray-300 hover:bg-zinc-400 hover:bg-opacity-30 hover:text-white px-3 py-2 rounded-md lg:text-base md:text-sm font-medium">
                            Home
                        </router-link>
                        <router-link to="/favorite" class="nav-link nav-menu text-gray-300 hover:bg-zinc-400 hover:bg-opacity-30 hover:text-white px-3 py-2 rounded-md lg:text-base md:text-sm font-medium">
                            Favorite
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="-mr-2 flex md:hidden relative">
                <button 
                    @click="toggleMenu"
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                    <svg v-if="!isOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                    <svg v-if="isOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div v-if="isOpen" class="md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <router-link 
                    to="/" 
                    class="text-gray-300 hover:bg-[#FFD700] hover:bg-opacity-30 hover:text-white block px-3 py-2 rounded-md text-sm font-medium" 
                    @click="toggleMenu"
                >
                    Home
                </router-link>
                <router-link 
                    to="/favorite" 
                    class="text-gray-300 hover:bg-[#FFD700] hover:bg-opacity-30 hover:text-white block px-3 py-2 rounded-md text-sm font-medium" 
                    @click="toggleMenu"
                >
                    Favorite
                </router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    nav.out-shadow {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    }
</style>