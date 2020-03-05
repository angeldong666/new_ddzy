<template>
    <!-- 新手引导 -->
    <div class="fixed guide-wrap" @click="guideData._changeGuideIndex(indexShow)">
        <!-- 喂饲料 -->
        <div class="guide-content guide-feed" v-show="indexShow == 1">
            <div class="msg-container msg-lr msg-feed-1">点击喂食小鸡孵化鸡蛋领取金蛋
                <div class="msg-san msg-san-right center3"></div>
            </div>
            <div class="guide-feed-img">
                <img class="f-img1" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img/w3.png" alt="">
                <img class="f-img2" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img/h1.png" alt="">
                <div class="stroke">100g</div>
            </div>
        </div>
        <!-- 收蛋 -->
        <div class="guide-content guide-eggs" v-show="indexShow == 2">
            <div class="msg-container msg-lr msg-eggs-1" style="min-width:2.3rem;white-space:nowrap;">点击领取孵化的鸡蛋
                <div class="msg-san msg-san-left center3"></div>
            </div>
            <div class="guide-eggs-img">
                <img class="f-img1" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img/w12.png" alt="">
                <img class="f-img2" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img/h1.png" alt="">
            </div>
        </div>
        <!-- 领饲料 -->
        <div class="guide-content guide-siliao guide-bottom" v-show="indexShow == 3">
            <div class="msg-container msg-updown msg-siliao-1" style="width:4rem;">
                完成任务，领取饲料。每日还免费赠送100g饲料，快来领呀<div class="msg-san msg-san-down" style="left:.5rem;"></div>
            </div>
            <div class="guide-siliao-img guide-bottom2">
                <img class="f-img1" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-lingsiliao.png" alt="">
            </div>
        </div>
        <!-- 领道具 -->
        <div class="guide-content guide-task guide-bottom" v-show="indexShow == 4">
            <div class="msg-container msg-updown msg-task-1 guide-bottom1" style="width:4rem;">完成任务，领取道具。加速小鸡喂养时间，快来领呀
                <div class="msg-san msg-san-down" style="left:1rem;"></div>
            </div>
            <div class="guide-task-img guide-bottom2">
                <img class="f-img1" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-daoju.png" alt="">
                <!-- <img class="f-img2" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img/h1.png" alt=""> -->
            </div>
        </div>
        <!-- 玩游戏 -->
        <div class="guide-content guide-log guide-bottom" v-show="indexShow == 5">
            <div class="msg-container msg-updown msg-log-1 guide-bottom1" style="width:4rem;">猜猜小鸡跑了几只，猜中赢千倍
                奖励<div class="msg-san msg-san-down" style="left:2.2rem;"></div>
            </div>
            <div class="guide-log-img guide-bottom2">
                <img class="f-img1" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-wyx.png" alt="">
            </div>
        </div>
        <!-- 抽奖 -->
        <div class="guide-content guide-right guide-youxi" v-show="indexShow == 6">
            <div class="msg-container msg-lr msg-youxi-1" style="width:3.3rem;">获取的金蛋可以进行兑奖，点击查看<div
                    class="msg-san msg-san-right center3"></div>
            </div>
            <div class="guide-right-2 guide-youxi-img">
                <img class="f-img1" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-cj.png" alt="">
            </div>
        </div>
        <!-- 攻略 -->
        <div class="guide-content guide-tips" v-show="indexShow == 7">
            <div class="msg-container msg-lr msg-tips-1" style="width:3.4rem;">点击可查看如何养成小鸡的攻略
                <div class="msg-san msg-san-right center3"></div>
            </div>
            <div class="guide-tips-img">
                <img class="f-img1" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img/r1.png" alt="">
            </div>
        </div>
        <!-- 动态列表 -->
        <div class="guide-content guide-right guide-dongtai" v-show="indexShow == 8">
            <div class="msg-container msg-lr dongtai-1" style="width:3.3rem;">查看小鸡的相关动态。喂食、领取饲料、获得金蛋等动态<div
                    class="msg-san msg-san-right center3"></div>
            </div>
            <div class="guide-right-2 dongtai-2">
                <img class="f-img1" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-dongtai.png" alt="">
            </div>
        </div>
        <!-- 好友列表 -->
        <div class="guide-content guide-right guide-rank" v-show="indexShow == 9">
            <div class="msg-container msg-lr rank-1" style="width:3.3rem;">点击可查看所有参与养成小鸡的排行<div
                    class="msg-san msg-san-right center3"></div>
            </div>
            <div class="guide-right-2 rank-2">
                <img class="f-img1" src="http://xjccfile.pceggs.com:8080/xjyx/egg/img2/icon-paihang.png" alt="">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "",
        props: ['guideData'],
        data() {
            return {
                indexShow: 0,
            }
        },
        watch: {
            'guideData': function () {
                this.indexShow = this.guideData.guideData || 0;
            }
        },
        methods: {

        },
    }
</script>

<style lang='scss' scoped>
    .guide-wrap {
        width: 100vw;
        height: 100vh;
        z-index: 999;
        top: 0;
        left: 0;

        .guide-content {
            position: fixed;
            width: 100%;

        }

        .guide-feed {
            bottom: 0;
            height: 2.65rem;

            .msg-feed-1 {
                margin-top: .36rem;
                right: 2.2rem;
            }

            .guide-feed-img {
                width: 1.48rem;
                height: 1.48rem;
                position: relative;
                float: right;
                margin-right: .3rem;

                div {
                    position: absolute;
                    bottom: -0.2rem;
                    left: 0;
                    width: 100%;
                    height: .4rem;
                    line-height: .4rem;
                    font-size: .32rem;
                    color: #fff;
                    text-align: center;
                }

                .f-img1 {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
        }

        .guide-eggs {
            bottom: 2rem;
            height: 2.5rem;

            .msg-eggs-1 {
                margin-top: .5rem;
                left: 2.3rem;
            }

            .guide-eggs-img {
                width: 1.8rem;
                height: 1.8rem;
                position: relative;
                float: left;
                margin-right: .4rem;
            }
        }

        .guide-right {
            .msg-lr {
                right: 1.8rem;
                top: .2rem;

            }

            .guide-right-2 {
                width: 1.1rem;
                height: 1.2rem;
                position: absolute;
                margin-left: .4rem;
                right: .3rem;
            }
        }

        .guide-youxi {
            top: 4.1rem;
            height: 2rem;
        }

        .guide-dongtai {
            top: 1.2rem;
            height: 2rem;
        }

        .guide-rank {
            top: 2.6rem;
            height: 2rem;
        }

        .guide-bottom {
            bottom: 0;
            height: 2.9rem;

            .guide-bottom1 {
                left: 1rem;
            }

            .guide-bottom2 {
                width: 1.1rem;
                height: 1.2rem;
                position: absolute;
                bottom: .56rem;
            }
        }

        .guide-siliao {
            .msg-siliao-1 {
                left: .2rem;
            }
            .guide-siliao-img {
                left: .3rem;
            }
        }

        .guide-task {
            .guide-task-img {
                left: 1.55rem;
            }
        }

        .guide-log {
            .guide-log-img {
                left: 2.8rem;
            }
        }

        .guide-tips {
            bottom: 2.3rem;
            height: 2.5rem;

            .msg-tips-1 {
                margin-top: .36rem;
                right: 2.2rem;
            }

            .guide-tips-img {
                width: 1.84rem;
                height: 2.14rem;
                position: absolute;
                right: 0;

                .f-img1 {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
        }

        .f-img1 {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        .f-img2 {
            width: .84rem;
            position: absolute;
            top: 60%;
            left: 60%;
            z-index: 1;
        }

    }
</style>