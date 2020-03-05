<template>
    <!-- 任务列表 -->
    <div class="fixed2 task" @click.stop="_selfClose()">
        <div class="list-cont task-cont center" @click.stop>
            <div class="list-title task-title">道具任务列表</div>
            <div class="task-nav flex-left">
                <div :class="'task-n-hide ' + (navtab==1?'task-n-act':'')" @click="_navChange(1)">道具任务</div>
                <div :class="'task-n-hide ' + (navtab==2?'task-n-act':'')" @click="_navChange(2)">我的道具</div>
            </div>
            <div v-show="navtab == 1" class="list-list task-nav-list list-scroll">
                <!-- 道具 -->
                <template v-if="data && data.taskPropList">
                    <div class="task-item" v-for="(item,index) in data.taskPropList.task" :key="index">
                        <!-- 列表 -->
                        <div class="item2">
                            <div class="item-top">
                                <div class="top-name flex-algin-center"
                                    @click="_handleHidetips(index,navtab,data.taskPropList.task[index])">
                                    {{item.taskname}} <i
                                        :class="'icon-arrow-up ' + (item.isshow == 1?'':'arrow-up-hide')"></i>
                                </div>
                                <div :class="'top-tips ' + (item.isshow == 1?'':'top-tips-hide')">{{item.explain}}</div>
                            </div>
                            <div class="item-bot flex-bt flex-algin-center">
                                <div class="bot-num">{{item.foodnum}}<img class="center2" :src="item.imgurl" alt="">
                                </div>
                                <!-- 分享按钮 -->
                                <div v-if="item.tasktype == 12 && item.status == 0" class="bot-btn" @click="_showShare">
                                    <img :src="item.btnimg" alt="">
                                </div>
                                <!-- 其他按钮 -->
                                <div v-else class="bot-btn"
                                    @click="data._taskButtonMethods(item.taskid,item.status,item.tasktype)">
                                    <img :src="item.btnimg" alt="">
                                </div>
                            </div>
                        </div>
                        <!-- 分享 -->
                        <div class="item-share flex-ar flex-algin-center" v-if="item.tasktype == 12 && shareShow">
                            <div class="btn-share share-hy" @click="_appShare('1')">分享给好友</div>
                            <div class="btn-share share-pyq" @click="_appShare('2')">分享到朋友圈</div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- 购买  data.taskPropList.TaskList_prop -->
            <div v-show="navtab == 2" class="list-list feed-buy task-nav-list">
                <template v-if="data && data.taskPropList">
                    <!-- <div class="buy-tit" v-if="data.taskPropList.chick">{{data.taskPropList.chick[0].golds}}</div> -->
                    <div class="buy-list list-scroll">
                        <div class="buy-items task-item flex-bt flex-algin-center"
                            v-for="(item,index) in data.taskPropList.mine" :key="index">
                            <div class="buy-left flex-left">
                                <div class="buy-imgs"><img class="center3" :src="item.img" alt=""></div>
                                <div class="buy-msgs">
                                    <p>{{item.name}} <span v-show="item.explain != ''">{{item.total}}张</span></p>
                                    <p>{{item.explain}}</p>
                                </div>
                            </div>
                            <div class="buy-right" @click="data._shopMethods('my',item.type)"><img :src="item.btnimg"
                                    alt=""></div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="list-close task-close" @click="_selfClose"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'propList',
        props: ['data'],
        data() {
            return {
                list: [],
                navtab: 1,
                shareShow: false,
            }
        },
        methods: {
            _showShare() {
                this.shareShow = !this.shareShow;
            },
            _appShare(type) {
                let that = this;
                that.$emit('_appShareMethods', type)
            },
            _navChange: function (index) {
                let that = this;
                that.navtab = index;
            },
            _selfClose: function () {
                let that = this;
                that.data._closeList();
            },
            _handleHidetips: function (tab, index, data) {
                let that = this;
                data.isshow = !data.isshow;
            }
        },
    }
</script>

<style lang='scss' scoped>
    .task {
        .task-cont {

            .task-nav {
                width: 100%;
                height: .7rem;
                line-height: .7rem;
                text-align: center;
                color: #764321;
                font-size: .26rem;
                margin-top: .3rem;

                .task-n-hide {
                    width: 30%;
                    font-size: .26rem;
                    height: .9rem;
                    border-top-left-radius: .2rem;
                    border-top-right-radius: .2rem;
                    background: #F3CB91;
                    margin-right: .14rem;
                }

                .task-n-act {
                    background: #FFEFD8;
                    font-weight: bold;
                }
            }

            .task-item {
                width: 100%;
                background: #FFEFD8;
                border-radius: .2rem;
                margin-bottom: .2rem;
                align-items: center;
                position: relative;
                box-shadow: 0px 3px 0px 0px #E9C38B inset;
                background: #F9D6A3;
            }

            .task-nav-list {
                height: 6.34rem;
                padding: .3rem;

                .item2 {
                    width: 100%;
                    padding: .3rem .2rem;

                    .item-top {
                        .top-name {
                            height: .35rem;
                            font-size: .24rem;
                            color: #905119;
                            margin: auto 0;

                            .icon-arrow-up {
                                display: inline-block;
                                width: .21rem;
                                height: .35rem;
                                background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img2/jt-shang.png) no-repeat center;
                                background-size: 100% auto;
                                margin-left: .12rem;
                                transition: all .3s ease;
                                -webkit-transition: all .3s ease;
                            }

                            .arrow-up-hide {
                                transform: rotateZ(180deg);
                                -webkit-transform: rotateZ(180deg);
                            }
                        }

                        .top-tips {
                            font-size: .22rem;
                            color: #BB773B;
                            line-height: .35rem;
                            margin: .1rem 0;
                            overflow: hidden;
                            transition: all .3s ease;
                            -webkit-transition: all .3s ease;
                            max-height: 1.2rem;
                        }

                        .top-tips-hide {
                            max-height: 0;
                        }

                    }

                    .item-bot {
                        .bot-num {
                            width: 1.6rem;
                            height: .36rem;
                            line-height: .36rem;
                            background: #D59459;
                            border-radius: .2rem;
                            text-align: center;
                            padding-left: .2rem;
                            color: #fff;
                            font-size: .22rem;
                            position: relative;

                            img {
                                width: .46rem;
                                height: auto;
                                left: -.1rem;
                                -ms-transform: translate(0, -50%);
                                -moz-transform: translate(0, -50%);
                                -o-transform: translate(0, -50%);
                                transform: translate(0, -50%);
                            }
                        }

                        .bot-btn {
                            width: 1.52rem;
                            height: .64rem;

                            img {
                                width: 100%;
                            }
                        }

                    }

                }

                .item-share {
                    width: 100%;
                    padding: .2rem .3rem;
                    background: #FDE0B7;
                    color: #BB773B;
                    font-size: .24rem;

                    .btn-share {
                        line-height: .5rem;
                        padding-left: .6rem;

                    }

                    .share-hy {
                        background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img2/fx-hy.png) no-repeat left center;
                        background-size: .5rem auto;
                    }

                    .share-pyq {
                        background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img2/fx-pyq.png) no-repeat left center;
                        background-size: .5rem auto;
                    }
                }
            }

            .feed-buy {
                .buy-tit {
                    display: inline-block;
                    height: .4rem;
                    line-height: .4rem;
                    border-radius: .2rem;
                    color: #fff;
                    padding: 0 .2rem 0 .5rem;
                    background: #E19F63 url(http://xjccfile.pceggs.com:8080/xjyx/game_cc/img/pop_gold1.png) no-repeat left center;
                    background-size: auto 100%;
                    margin-bottom: .3rem;
                }

                .buy-list {
                    height: 5.34rem;

                    .buy-items {
                        padding: .3rem .2rem;

                        .buy-left {
                            .buy-imgs {
                                width: .6rem;
                                height: .6rem;
                                max-width: .6rem;
                                min-width: .6rem;
                                margin: auto 0;
                                position: relative;

                                img {
                                    width: 100%;
                                }
                            }

                            .buy-msgs {
                                margin-left: .12rem;

                                p:nth-child(1) {
                                    line-height: .4rem;
                                    color: #905119;
                                    font-size: .24rem;
                                    white-space: nowrap;

                                    span {
                                        background: #C3854D;
                                        color: #fff;
                                        font-size: .2rem;
                                        border-radius: .12rem;
                                        padding: 0 .1rem;
                                    }
                                }

                                p:nth-child(2) {
                                    line-height: .35rem;
                                    color: #BB773B;
                                    font-size: .22rem;
                                }
                            }
                        }

                        .buy-right {
                            width: 1.52rem;
                            max-width: 1.52rem;
                            min-width: 1.52rem;
                            margin-left: .12rem;

                            img {
                                width: 100%;
                            }
                        }
                    }

                }

            }
        }

    }
</style>