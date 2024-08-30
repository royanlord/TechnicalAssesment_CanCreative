<template>
    <div v-for="game in games" :key="game.id" class="out-shadow card bg-slate-800 w-full shadow-xl">
        <figure>
            <img
                :src="game.background_image"
                :alt="game.slug"
                class="w-full h-auto rounded-t-lg"
            />
        </figure>
        <div class="card-body">
            <router-link
            :to="`/detail/${game.id}`"
            >
                <h2 class="card-title text-left text-2xl hover:text-white cursor-pointer">
                    {{ game.name }}
                </h2>
            </router-link>
            <span class="inline">
                {{ mappingGenres(game) }}
            </span>
            <div class="card-actions justify-between mt-2">
                <Rating :rating="game.rating" />
                <AddFavorite :game="game" @favorite-updated="handleFavoriteUpdated" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Rating from '@/components/Rating.vue'
import AddFavorite from '@/components/AddFavorite.vue'

interface Genre {
  name: string;
}

interface Developer {
  name: string;
}

interface Publisher {
  name: string;
}

interface Game {
  id: number;
  name: string;
  slug?: string;
  background_image: string;
  background_image_additional?: string;
  rating: number;
  ratings_count: number;
  reviews_count: number;
  released?: string;
  updated?: string;
  description_raw?: string;
  genres: Genre[];
  developers?: Developer[];
  publishers?: Publisher[]
}

const props = defineProps<{
    games: Game[];
    handleFavoriteUpdated?: (game: Game) => void;
}>();

const mappingGenres = (game: Game) => {
    return game.genres.map(genre => genre.name).join(', ');
};

</script>

<style scoped>
    .out-shadow {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
</style>