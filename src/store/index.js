import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        done: 0,
        toBeDone: 8,
        tasks: [
            {
                id: 1,
                title: 'Erste Aufgabe',
                description: 'Das ist die erste Aufgabe.',
                completed: false,
                completedDate: '',
                location: {
                    long: 48.060523,
                    lat: 8.194542,
                    name: 'Erste Aufgabe',
                },
                distance: '',
                solution: 'Erstes Ergebniss',
                audiofilename: 'Audiofile-one',
                transskript: 'Das ist das Transskript der ersten  Aufgabe',
            },
            {
                id: 2,
                title: 'Zweite Aufgabe',
                description: 'Das ist die zweite Aufgabe.',
                completed:false,
                completedDate: '',
                location: {
                    long: 48.07052,
                    lat: 8.194542,
                    name:'Zweite Aufgabe',
                },
                distance: '',
                solution: 'Zweites Ergebniss',
                audiofilename: 'Audiofile-two',
                transskript: 'Das ist das Transskript der zweiten Aufgabe',
            },
        ]
    },
    getters: {
        done: state => state.done,
        toBeDone: state => state.toBeDone,
        tasks: state => state.tasks,
    },
    actions: {
        upDateProgress: (context, payload)  => {
            setTimeout(function() {
                context.commit('setNewProgress', payload);
            }, 100);
        },
        task: (context, payload) => {
            context.commit('setNewStatus', payload);
        }
    },
    mutations: {
        setNewProgress: (state, payload) => {
            state.done += payload;
        },
        setNewStatus: (state, payload) => {
            state.tasks = payload;
        }
    },
});
