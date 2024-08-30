import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    genres: Array<{ name: string }>;
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
