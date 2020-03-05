<template>
    <!-- 侧边栏(左)) -->
    <div class="sider">
        <div class="item" v-for="(item,index) in iconList" :key="index" @click="rightData._sideRight(index)">
            <img :src="item.img" :alt="item.name">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sider',
        props: ['rightData'],
        data() {
            return {
                iconList: [{
                    name: '动态',
                    img: 'http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-dongtai.png',
                    img2: '',
                    id: 0,
                }, {
                    name: '排行',
                    img: 'http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-paihang.png',
                    img2: '',
                    id: 1,
                }, {
                    name: '抽奖',
                    img: 'http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-cj.png',
                    img2: '',
                    id: 2,
                }],
            }
        },
    }
</script>


<style lang='scss' scoped>
    .sider {
        width: 1.08rem;
        overflow: hidden;
        position: fixed;
        right: .3rem;
        top: 1.2rem;
        z-index: 9;

        .item {
            width: 1.08rem;
            position: relative;
            margin-bottom: .2rem;

            img {
                width: 100%;
                height: auto;
            }
        }
    }
</style>