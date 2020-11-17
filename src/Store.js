import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {getRandomInt} from "./components/RandomMovie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movieContent: {},
        movieGenres: null,
        isLogged: false,
        userInfos: {
            name: null,
            email: null,
        },
        wishList: [],
        wishListContent: [],
        genresSelected: [],
        eraSelected: "",
        resetPassConf: "",
        isPassConfSuccess: false
    },
    getters: {
        getMovieContent: state => state.movieContent,
        getMovieGenres: state => state.movieGenres,
        getIsLogged: state => state.isLogged,
        getUserInfos: state => state.userInfos,
        getGenresSelected: state => state.genresSelected,
        getEraSelected: state => state.eraSelected,
        getResetPassConf : state => state.resetPassConf,
        getIsPassConfSuccess: state => state.isPassConfSuccess,
        getWishList: state => state.wishList,
        getWishListContent: state => state.wishListContent
    },
    mutations: {
        setMovieContent: (state, payload) => state.movieContent = payload,
        setMovieGenres: (state, payload) => state.movieGenres = payload,
        setUserInfos: (state, payload) => {
            state.userInfos = payload.data;
            //state.userInfos.wishilist.push(payload.data.wishilist);
        },
        setIsLogged: (state, payload) => {
            state.isLogged = payload
        },
        setGenresSelected: (state, payload) => {
            state.genresSelected = payload
        },
        setEraSelected:(state, payload) => {
            state.eraSelected = payload
        },
        setResetPassConf: (state, payload) => {
            state.resetPassConf = payload.ResetPassConfMessage;
            state.isPassConfSuccess = payload.isPassConfSuccess
        },
        setWishList: (state, payload) => {
            state.wishList = payload;
        },
        setWishListContent: (state, payload) => {
            state.wishListContent = payload;
        },
        addWishListContent: (state, payload) => {
            state.wishListContent.push(payload);
        }
    },
    actions: {
        fetchMovieGenres: context => {
            axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' +process.env.VUE_APP_API_MOVIE_KEY, {
                withCredentials: false
            })
                .then(response => context.commit('setMovieGenres', response.data.genres))
                .catch(err => console.error(err))
        },
        fetchMovie: (context, payload) => {
            let params = {
                'api_key': process.env.VUE_APP_API_MOVIE_KEY,
                'language': "en-US",
                'sort_by': "popularity.desc",
                'include_adult': "false",
                'include_video': "false",
                'vote_average.gte': "6",
                'without_genres': "99",
            };

            if(payload.startingDate && payload.endingDate){
                console.log("avec date range");
                params = {
                    ...params,
                    'primary_release_date.gte': payload.startingDate,
                    'primary_release_date.lte': payload.endingDate,
                }
            }

            if(payload.genres){
                console.log("avec genre");
                params['with_genres'] = payload.genres;
            }

            axios.get('https://api.themoviedb.org/3/discover/movie', {params, withCredentials: false})
                .then(response => {
                    const totalPages = response.data.total_pages;
                    const page = getRandomInt(totalPages);
                    axios.get('https://api.themoviedb.org/3/discover/movie', {
                        params: {...params, page},
                        withCredentials: false
                    })
                    .then(response =>
                        {
                            const resultSize= response.data.results.length;
                            console.log(response.data);
                            if(resultSize){
                                context.commit('setMovieContent', response.data.results[getRandomInt(resultSize)]);
                            }

                        }
                    )
                    .catch(err => console.error(err));
                })
                .catch(err => console.error(err))
        }

    }
})


