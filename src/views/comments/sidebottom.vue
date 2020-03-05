<template>
    <!-- 侧边栏(左)) -->
    <div class="sideb flex-left">
        <div class="item" v-for="(item,index) in iconList" :key="index" @click="showList(index)">
            <img :src="item.img" :alt="item.name">
            <div v-if="chickInfo && chickInfo.hasfood == 1 && index == 0" class="item-icon">待领</div>
            <div v-if="chickInfo && chickInfo.hasprop == 1 && index == 1" class="item-icon">待领</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sideb',
        props: ['showList', 'chickInfo'],
        data() {
            return {
                iconList: [{
                    name: '领饲料',
                    img: 'http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-lingsiliao.png',
                    img2: '',
                    id: 0,
                }, {
                    name: '领道具',
                    img: 'http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-daoju.png',
                    img2: '',
                    id: 1,
                }, {
                    name: '玩游戏',
                    img: 'http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-wyx.png',
                    img2: '',
                    id: 2,
                }],
            }
        },
    }
</script>


<style lang='scss' scoped>
    .sideb {
        overflow: hidden;
        position: fixed;
        left: .3rem;
        bottom: .5rem;
        z-index: 9;
        height: 1.25rem;
        overflow: hidden;

        .item {
            width: 1.08rem;
            position: relative;
            margin-right: .2rem;

            img {
                width: 100%;
                height: auto;
            }

            .item-icon {
                position: absolute;
                top: 0;
                right: -.2rem;
                color: #fff;
                background: #F90627;
                padding: 1px .1rem;
                font-size: .2rem;
                border-radius: .2rem;
                border-bottom-left-radius: 0;
            }
        }
    }
</style>