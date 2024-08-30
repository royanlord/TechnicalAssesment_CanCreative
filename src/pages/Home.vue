<script setup lang="ts">
// import { AkHeart } from '@kalimahapps/vue-icons';
import { computed, ref, onMounted } from 'vue'
import CardGame from '@/components/CardGame.vue'
import { useGameStore } from '@/stores/gameStore'

const apiKey = '88d8ad869aca4a1db5bca624337e6f0a'
const gameStore = useGameStore();
const searchQuery = ref<string>('')
const notFound = ref<boolean>(false)
const pageSize = ref<number>(10)
const page = ref<number>(1)

interface Genre {
    name: string;
}

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    genres: Genre[];
}

const getGames = async (searchQuery: string = '', page: number = 1, pageSize: number = 10) => {
    try {
        // const url = searchQuery
        //     ? `https://api.rawg.io/api/games?search=${searchQuery}&key=${apiKey}`
        //     : `https://api.rawg.io/api/games?key=${apiKey}`;
        const url = searchQuery
            ? `https://api.rawg.io/api/games?search=${searchQuery}&page=${page}&page_size=${pageSize}&key=${apiKey}`
            : `https://api.rawg.io/api/games?page=${page}&page_size=${pageSize}&key=${apiKey}`;
            
        const response = await fetch(url, {
            method: 'GET'
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        data.results.length === 0 ? notFound.value = true : notFound.value = false
        gameStore.setGames(data.results)
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

// const pagination = async (page: number = 1, pageSize: number = 10) => {
//     try {   
//         const response = await fetch(`https://api.rawg.io/api/games?page=${page}&page_size=${pageSize}&key=${apiKey}`, {
//             method: 'GET'
//         })

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Error fetching games:', error);
//     }
// }

onMounted(() => {
    getGames();
});

const nextPage = () => {
    page.value += 1;
    getGames(searchQuery.value, page.value, pageSize.value);
}

const prevPage = () => {
    if (page.value > 1) {
        page.value -= 1;
        getGames(searchQuery.value, page.value, pageSize.value);
    }
}

const mappingGenres = (game: Game) => {
    return game.genres.map(genre => genre.name).join(', ');
}

const searchGames = () => {
    page.value = 1
    getGames(searchQuery.value, page.value, pageSize.value);
}
</script>

<template>
    <div class="lg:w-2/5 w-9/12 mx-auto mb-5">
        <label class="relative block">
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center lg:pl-4 pl-2">
                <svg class="lg:h-5 lg:w-5 h-3 w-3 fill-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
            </span>
            <input 
                class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md lg:py-3 py-2 lg:pl-12 pl-7 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 lg:text-base text-xs" 
                placeholder="Search for anything..." 
                type="text" 
                name="search"
                v-model="searchQuery"
                @input="searchGames"
            />
        </label>
    </div>
    <div v-if="notFound" class="text-center text-gray-400 italic mt-8">
        No games found. Please try a different search.
    </div>
    <div v-else class="mb-5">
        <div class="mx-10 grid lg:grid-cols-4 grid-cols-1 gap-5 mb-5">
            <CardGame :games="gameStore.games" />
        </div>
        <div class="join w-full flex justify-center mx-auto">
            <button 
                class="join-item btn px-5 bg-slate-700 hover:bg-slate-600"
                @click="prevPage"
                :disabled="page === 1"
            >
                «
            </button>
            <button class="join-item btn px-8 bg-slate-700 hover:bg-slate-600">
                Page {{ page }}
            </button>
            <button 
                class="join-item btn px-5 bg-slate-700 hover:bg-slate-600"
                @click="nextPage"
            >
                »
            </button>
        </div>
    </div>
</template>

<style scoped>
    .out-shadow {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
</style>