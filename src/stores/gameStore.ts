import { ref } from 'vue'
import { defineStore } from 'pinia'

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
    slug: string;
    background_image: string;
    background_image_additional?: string;
    rating: number;
    ratings_count: number;
    reviews_count: number;
    released: string;
    updated: string;
    description_raw?: string;
    genres: Genre[];
    developers: Developer[];
    publishers: Publisher[]
}

export const useGameStore = defineStore('games', () => {
    const games = ref<Game[]>([]);

    const setGames = (dataGames: Game[]) => {
        games.value = dataGames;
    };

    return {
        games,
        setGames,
    };
})
