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
                description: 'Lorem Ipsum sit dorem esem X',
                completed: true,
                completedDate: '',
                location: {
                    long: 48.060523,
                    lat: 8.194542,
                    name: 'Erste Aufgabe',
                },
                distance: '',
            },
            {
                id: 2,
                title: 'Zweite Aufgabe',
                description: 'Lorem Ipsum sit dorem esem X',
                completed:false,
                completedDate: '',
                location: {
                    long: 48.07052,
                    lat: 8.194542,
                    name:'Zweite Aufgabe',
                },
                distance: '',
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
        }
    },
    mutations: {
        setNewProgress: (state, payload) => {
            state.done += payload;
        }
    },
});
