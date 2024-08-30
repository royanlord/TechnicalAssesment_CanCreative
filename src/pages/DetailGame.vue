<script setup lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDetailGameStore } from '@/stores/detailGameStore'
import Rating from '@/components/Rating.vue'
import dayjs from 'dayjs'
import AddFavorite from '@/components/AddFavorite.vue'

const route = useRoute()

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

const apiKey = '88d8ad869aca4a1db5bca624337e6f0a'

const detail = useDetailGameStore()

const getGameDetail = async (id: string) => {
  try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`, {
            method: 'GET'
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: any = await response.json();
        console.log(data);
        detail.setDetailGame(data);
    } catch (error) {
        console.error('Error fetching games:', error);
    }
};

onMounted(() => {
  const gameId = route.params.id as string;
  getGameDetail(gameId);
});

const getDescriptionParagraphs = () => {
    return detail.detailGame?.description_raw
        ? detail.detailGame.description_raw.split('\n\n').map(paragraph => paragraph.trim()) : [];
};

const releaseDate = computed(() => {
    return dayjs(detail.detailGame.released).format('DD MMM, YYYY');
});

const updatedDate = computed(() => {
    return dayjs(detail.detailGame.updated).format('DD MMM, YYYY');
});

const mappingDeveloper = (developer: Developer[]) => {
    return developer.map(dev => dev.name).join(', ');
}

const mappingPublisher = (publisher: Publisher[]) => {
    return publisher.map(pub => pub.name).join(', ');
}

</script>

<template>
    <div v-if="detail.detailGame" class="lg:w-3/4 w-11/12 out-shadow bg-slate-800 mx-auto py-10 px-10 mb-5 rounded-lg">
        <h1 class="text-white lg:text-5xl text-3xl font-bold">{{ detail.detailGame.name }}</h1>
        <div class="mt-5 flex items-center gap-2">
            <Rating :rating="detail.detailGame.rating" />
            <span class="text-lg">({{ detail.detailGame.ratings_count }})</span>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-x-6">
            <figure>
                <img
                    :src="detail.detailGame.background_image"
                    :alt="detail.detailGame.slug ? detail.detailGame.slug : ''"
                    class="w-full h-auto mt-5 rounded-lg"
                />
                <div class="mt-5 flex justify-between items-center">
                    <div class="flex gap-2">
                        <span v-for="(genre, index) in detail.detailGame.genres" :key="index" class="inline bg-slate-900 text-white text-base rounded-xl px-3 py-1">
                            {{ genre.name }}
                        </span>
                    </div>
                    <AddFavorite :game="detail.detailGame" />
                </div>
                <div class="text-white text-sm mt-3 text-justify">
                    <p v-for="(paragraph, index) in getDescriptionParagraphs()" :key="index" class="mb-4">
                        {{ paragraph }}
                    </p>
                </div>
            </figure>
            <div>
                <figure>
                    <img
                        :src="detail.detailGame.background_image_additional"
                        :alt="detail.detailGame.slug"
                        class="w-80 h-auto mt-5 rounded-lg"
                    />
                </figure>
                <table class="table-auto text-left mt-3 text-white">
                    <tbody>
                        <tr valign="top">
                            <td>All Reviews</td>
                            <td class='lg:px-3 pe-3 ps-12'>:</td>
                            <td>{{ detail.detailGame.reviews_count }}</td>
                        </tr>
                        <tr valign="top">
                            <td>Release Date</td>
                            <td class='lg:px-3 pe-3 ps-12'>:</td>
                            <td>{{ releaseDate }}</td>
                        </tr>
                        <tr valign="top">
                            <td>Updated on</td>
                            <td class='lg:px-3 pe-3 ps-12'>:</td>
                            <td>{{ updatedDate }}</td>
                        </tr>
                        <tr valign="top">
                            <td>Developer</td>
                            <td class='lg:px-3 pe-3 ps-12'>:</td>
                            <td>
                                {{ mappingDeveloper(detail.detailGame.developers) }}
                            </td>
                        </tr>
                        <tr valign="top">
                            <td>Publisher</td>
                            <td class='lg:px-3 pe-3 ps-12'>:</td>
                            <td>
                                {{ mappingPublisher(detail.detailGame.publishers) }}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- <div class="bg-slate-900 px-4 py-3 rounded-lg mt-3 flex gap-x-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="30" height="30" fill="white">
                        <path d="M570.9 372.3c-11.3 14.2-38.8 24.3-38.8 24.3L327 470.2v-54.3l150.9-53.8c17.1-6.1 19.8-14.8 5.8-19.4-13.9-4.6-39.1-3.3-56.2 2.9L327 381.1v-56.4c23.2-7.8 47.1-13.6 75.7-16.8 40.9-4.5 90.9 .6 130.2 15.5 44.2 14 49.2 34.7 38 48.9zm-224.4-92.5v-139c0-16.3-3-31.3-18.3-35.6-11.7-3.8-19 7.1-19 23.4v347.9l-93.8-29.8V32c39.9 7.4 98 24.9 129.2 35.4C424.1 94.7 451 128.7 451 205.2c0 74.5-46 102.8-104.5 74.6zM43.2 410.2c-45.4-12.8-53-39.5-32.3-54.8 19.1-14.2 51.7-24.9 51.7-24.9l134.5-47.8v54.5l-96.8 34.6c-17.1 6.1-19.7 14.8-5.8 19.4 13.9 4.6 39.1 3.3 56.2-2.9l46.4-16.9v48.8c-51.6 9.3-101.4 7.3-153.9-10z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="30" height="30" fill="white">
                        <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30" fill="white">
                        <path d="M369.9 318.2c44.3 54.3 64.7 98.8 54.4 118.7-7.9 15.1-56.7 44.6-92.6 55.9-29.6 9.3-68.4 13.3-100.4 10.2-38.2-3.7-76.9-17.4-110.1-39C93.3 445.8 87 438.3 87 423.4c0-29.9 32.9-82.3 89.2-142.1 32-33.9 76.5-73.7 81.4-72.6 9.4 2.1 84.3 75.1 112.3 109.5zM188.6 143.8c-29.7-26.9-58.1-53.9-86.4-63.4-15.2-5.1-16.3-4.8-28.7 8.1-29.2 30.4-53.5 79.7-60.3 122.4-5.4 34.2-6.1 43.8-4.2 60.5 5.6 50.5 17.3 85.4 40.5 120.9 9.5 14.6 12.1 17.3 9.3 9.9-4.2-11-.3-37.5 9.5-64 14.3-39 53.9-112.9 120.3-194.4zm311.6 63.5C483.3 127.3 432.7 77 425.6 77c-7.3 0-24.2 6.5-36 13.9-23.3 14.5-41 31.4-64.3 52.8C367.7 197 427.5 283.1 448.2 346c6.8 20.7 9.7 41.1 7.4 52.3-1.7 8.5-1.7 8.5 1.4 4.6 6.1-7.7 19.9-31.3 25.4-43.5 7.4-16.2 15-40.2 18.6-58.7 4.3-22.5 3.9-70.8-.8-93.4zM141.3 43C189 40.5 251 77.5 255.6 78.4c.7 .1 10.4-4.2 21.6-9.7 63.9-31.1 94-25.8 107.4-25.2-63.9-39.3-152.7-50-233.9-11.7-23.4 11.1-24 11.9-9.4 11.2z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="30" height="30" fill="white">
                        <path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5 .2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4 .2-.8 .7-.6 1.1 .3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6 .2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5 .1-1.3 .6-3.4 1.5-3.2 2.9 .1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7 .1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9 .6 7.9 1.2 11.8 1.2 8.1 2.5 15.7 .8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1 .6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3 .4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4 .7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6 .6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7 .8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4 .6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1 .8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7 .4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6 .8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1 .3-.2 .7-.3 1-.5 .8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"/>
                    </svg>
                </div> -->
            </div>
        </div>
    </div>
</template>



<style scoped>
    .out-shadow {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
</style>