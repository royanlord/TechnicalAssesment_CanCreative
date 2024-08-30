<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Rating from '@/components/Rating.vue'
import AddFavorite from '@/components/AddFavorite.vue'
import CardGame from '@/components/CardGame.vue'

const storedFavorites = ref<Object[]>([]);

const updateStoredFavorites = () => {
    storedFavorites.value = JSON.parse(localStorage.getItem('favorites') || '[]');
};

onMounted(() => {
    updateStoredFavorites();
});

watch(storedFavorites, (newFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
});

const mappingGenres = (game) => {
    return game.genres.map(genre => genre.name).join(', ');
}

const handleFavoriteUpdated = () => {
    updateStoredFavorites();
};

</script>

<template>
    <div class="mx-10 grid lg:grid-cols-4 grid-cols-1 gap-5 mb-5">
        <CardGame :games="storedFavorites" :handleFavoriteUpdated="handleFavoriteUpdated" />
        <!-- <div v-for="game in storedFavorites" :key="game.id" class="card bg-slate-800 w-full shadow-xl">
            <figure>
                <img
                    :src="game.background_image"
                    alt="Shoes"
                    class="w-full h-auto"
                />
            </figure>
            <div class="card-body">
                <router-link
                    class="tooltip tooltip-right"
                    data-tip="View Detail"
                    :to="`/detail/${game.id}`"
                >
                    <h2 class="card-title text-2xl hover:text-white cursor-pointer">
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
        </div> -->
    </div>
</template>

<style scoped>

</style>