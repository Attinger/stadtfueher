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
                completed: true,
                completedDate: '',
            },
            {
                id: 2,
                title: 'Zweite Aufgabe',
                completed:false,
                completedDate: '',
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
