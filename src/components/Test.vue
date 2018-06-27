<template>
    <div class="container">
        <p>这里是组件</p>
        <p>{{ hello }}</p>
        <p>{{ count }}</p>
        <!-- <p>{{ countAlias }}</p> -->
        <!-- <p>{{ countPlusLocalState }}</p> -->
        <ul class="box">
            <li>
                <p>以下是通过getters派生状态产生的数据</p>
            </li>
            <li v-for="(passer, index) in getterPasser" :key="index">
                <p>
                    <span>{{ passer.id }}</span>
                    <span>{{ passer.name }}</span>
                    <span>{{ passer.grade }}</span>
                </p>
            </li>
            <li>
                <p>通过考试的人数为: {{ getCountPasser }}</p>
            </li>
        </ul>
        <div class="box">
            <input type="text" v-model="personName" />
            <p v-if="getPerson">
                <span>学号：{{getPerson.id}}</span>
                <span>姓名：{{getPerson.name}}</span>
                <span>成绩：{{getPerson.grade}}</span>
            </p>
            <p v-else>
                请输入上一个示例中的用户名称，即可查看效果
            </p>
        </div>
        
        <div class="box">
            <p>mapGetter辅助函数映射的结果（数组）</p>
            <p>{{ arrayYingShe }}</p>
            <!-- <p>{{ arrayYingSheTest }}</p> -->
        </div>

        <div class="box">
            <p>{{ count }}</p>
            <p>{{ delay }}</p>
            <input type="text" v-model="delay" />
            <button @click="asyncIncrement(delay)">Actions异步修改,数据将在{{ delay }}s钟以后才更新</button>
        </div>
    </div>
</template>

<script>
// import Store from './../assets/v.js';
import { mapState, mapGetters } from 'vuex'
export default {
    data() {
        return {
            localCount: 2,
            personName: '',
            person: null,
            delay: 0
        }
    },
    //2.公共全局单例模式
    // computed: {
    //     count() {
    //         // return Store.state.count
    //         return this.$store.state.count;
    //     }
    // }

    //3.辅助函数
    //当我们使用较多的状态时，这些状态都声明成计算属性很是麻烦，那么我们可以使用mapState及进行辅助生成计算属性
    // computed: mapState({
    //     //方式一：箭头函数的方式
    //     //count: state => state.count

    //     //方式二：传递字符串参数的方式
    //     // countAlias: 'count'

    //     //有时候我们需要获取局部状态（需要使用普通函数的形式）
    //     countPlusLocalState(state) {
    //         return state.count + this.localCount;
    //     }
    // })

    //4.辅助函数映射
    // 当映射的计算属性的名称与state的子节点名称相同的时候，我们可以给mapState传入一个字符串数组
    // computed: mapState([
    //     // 映射 this.count 为 store.state.count
    //     'count'
    // ])

    computed: {
        hello() {
            return "这里我们运用对象展开运算符把计算属性和mapState混合在一起使用计算属性";
        },
        //5.对象展开运算符的方式
        //这样我们可以和局部计算属性混合使用计算属性
        ...mapState({
          count: state => state.count,
        }),

        //方法1：通过属性的方式访问派生的状态
        getterPasser() {
            return this.$store.getters.passer
        },
        getCountPasser() {
            return this.$store.getters.countPasser
        },

        //方法2：这里我们通过方法去获取带有条件的数据
        getPerson() {
            return this.$store.getters.getPerson(this.personName)
        },

        //方法3：我们可以通过辅助函数，将getter映射到局部计算属性中
        ...mapGetters([
            //数组的方式
            'arrayYingShe'
        ]),
        //如果你想给getter去另外一个名称，那请使用对象类型
        // ...mapGetters({
        //     arrayYingSheTest: 'arrayYingShe'
        // })
        
    },
    methods: {
        //这里不再介绍mutation的方式（只能同步的方式进行执行更改states数据）改变state的值，action分发提交的是mutation，但是用dispatch()方法
        asyncIncrement(time) {
            console.log(time);
            //action提交操作，可以异步监测state的值的改变来更新数据，在复杂的异步业务中很是受用
            //this.$store.dispatch('incrementAsync',{delay: time});//{delay: time}作为action中的time参数，(载荷的方式）
            this.$store.dispatch({//以对象的方式
                type: 'incrementAsync',
                delay: time
            });
        }
        //action的组合使用需要多多了解
    }
}
</script>

<style>
    .container {
        border: 1px solid red;
    }
    .box {
        margin-top: 20px;
        border: 1px solid #000000;
    }
</style>

