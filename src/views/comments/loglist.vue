<template>
    <!-- 任务列表 -->
    <div class="fixed2 log" @click.stop="_selfClose() ">
        <!-- + (popUp?'list-pop-up':'list-pop-down') -->
        <div :class="'list-cont log-cont center '" @click.stop>
            <div class="list-title log-title">小鸡动态</div>
            <div class="list-list log-wrap list-scroll">
                <div class="log-list" v-for="(item,key,index) in closeList.logList" :key="index">
                    <div class="log-date">{{_changeDate(key)}}</div>
                    <div class="log-lines">
                        <div class="log-item" v-for="(item2,index2) in item" v-show="item.length>0" :key="index2">
                            <div class="item-right">
                                <div class="right-time">{{item2.itime}}</div>
                                <div class="right-msg flex-bt">
                                    <div class="msg-left">{{item2.explain}}</div>
                                    <div class="msg-right" v-html="item2.num"></div>
                                </div>
                                <div class="right-icon center3"></div>
                            </div>
                            <div class="v-wrap">
                                <div class="v-line center"></div>
                                <div :class="'v-icon ' + (item2.itype=='1'?'icon-recive':'icon-feed')"></div>
                            </div>
                        </div>
                    </div>
                    <div class="none-list" v-show="item.length<=0">暂无记录</div>
                </div>
            </div>
            <div class="list-close log-close" @click="_selfClose"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: ['closeList'],
        data() {
            return {
                popUp: false,
                list: []
            }
        },
        methods: {
            _selfClose: function () {
                let that = this;
                that.closeList._closeList();
            },
            _changeDate: function (time) {
                switch (time) {
                    case 'today':
                        return '今天'
                        break;
                    case 'yesterday':
                        return '昨天'

                        break;
                    case 'befor':
                        return '更早'
                        break;
                    default:
                        break;
                }
            }
        },
    }
</script>


<style lang='scss' scoped>
    .log {
        .list-list {
            .none-list {
                color: #6F4818;
                font-size: .24rem;
                line-height: .4rem;
                padding-left: .8rem;

            }

            .log-list {

                .log-date {
                    color: #6F4818;
                    font-size: .24rem;
                    line-height: .8rem;
                }

                .log-item {
                    width: 100%;
                    position: relative;
                    padding-left: .7rem;
                    padding-bottom: .2rem;

                    .v-wrap {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: .5rem;
                        height: 100%;

                        .v-line {
                            width: 1px;
                            height: 100%;
                            background: #E6B368;
                            position: absolute;
                            top: 0;
                        }

                        .v-icon {
                            width: 100%;
                            height: calc(100% - 0.2rem);
                            position: relative;
                            z-index: 2;
                        }

                        .icon-feed {
                            background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/w2.png) no-repeat center;
                            background-size: .4rem auto;
                        }

                        .icon-recive {
                            background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/w11.png) no-repeat center;
                            background-size: .4rem auto;
                        }
                    }

                    .item-right {
                        width: 100%;
                        background: #FBE1B8;
                        border-radius: .2rem;
                        padding: .2rem;
                        line-height: .4rem;
                        font-size: .24rem;
                        position: relative;

                        .right-time {
                            color: #E1972B;
                        }

                        .right-msg {
                            color: #6F4818;
                            word-break: break-all;

                            .msg-left {
                                margin-right: .1rem;
                            }
                        }

                        .right-icon {
                            width: .13rem;
                            height: .21rem;
                            left: -.13rem;
                            background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/j1.png) no-repeat;
                            background-size: 100% auto;
                        }
                    }
                }
            }
        }
    }
</style>