import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    genres: Array<{ name: string }>;
}

export const useDetailGameStore = defineStore('detailGame', () => {
    const detailGame = ref<Game | null>(null);

    const setDetailGame = (dataGame: Game) => {
        detailGame.value = dataGame;
    };

    return {
        detailGame,
        setDetailGame,
    };
})
