import Vue from 'vue'
import Vuex from 'vuex';
//单例全局状态的创建，不过这种的方式我们在子组件中要频繁的引入，最好的方式是根组建的注入方式
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 0,
        persons: [
            {
                id: 1,
                name: '张烁',
                grade: 50
            },
            {
                id: 2,
                name: '姚善良',
                grade: 86
            },
            {
                id: 3,
                name: '张静',
                grade: 88
            },
            {
                id: 4,
                name: '顾怡',
                grade: 80
            },
        ]
    },
    //有时候我们的业务需要我们从store中的派生出一些状态，例如对列表过滤并计数，在这里getter就像组件中的计算属性一样
    getters: {
        passer: state => {
            return state.persons.filter(person => person.grade > 60)
        },
        //Getter也接受其他的getter作为第二个参数
        countPasser: (state, getters) => {
            return getters.passer.length;
        },
        //这里我们也可以返回返回这样用户的可操作性就更高
        getPerson: state => (name) => {
            return state.persons.find(person => person.name == name);
        },
        arrayYingShe: (state, getters) => {
            return getters.passer.length;
        }
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
    },
    actions: {
        //载荷的方式，这里我们让用户自定义延时的时间
        incrementAsync({commit}, time) {
            console.log(time.delay);
            setTimeout(() => {
                commit('increment')
            }, (time.delay)*1000)
        }
    }
})
export default store;