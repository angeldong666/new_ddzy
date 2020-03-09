<template>
    <!-- 主页 -->
    <div class="home">
        <Avatar :user-info="{chickInfo,_showList}"></Avatar>
        <!-- <SideLeft v-if="chickInfo"></SideLeft> -->
        <SideRight v-if="chickInfo" :right-data="{_sideRight}"></SideRight>
        <!-- 主体 -->
        <div class="content center">
            <!-- 蛋 -->
            <div class="content-div" v-if="!layeggShow && newUser">
                <div class="content-wrap content-none">
                    <img v-for="(item,index) in speedImgsLength" :key="index" v-show="newImagesShow == (index + 1)"
                        :src="'http://xjccfile.pceggs.com:8080/xjyx/egg/newgold/'+(index+1)+'.png'" alt="">
                </div>
                <div class="content-btn scale-box" @click="_setChickName()"></div>
            </div>
            <!-- 鸡 -->
            <div class="content-div" v-if="!layeggShow && !newUser">
                <div class="content-wrap content-right" @click="_toFeed('touch')">
                    <img v-for="(item,index) in speedImgsLength" :key="index" class="center"
                        v-show="newImagesShow == (index + 1)" :src="speedImageName +(index+1)+'.png'" alt="">
                </div>
            </div>
            <!-- 下蛋过程 -->
            <div class="content-div lay-eggs" v-if="layeggShow">
                <div class="content-wrap content-none">
                    <img v-for="(item,index) in speedImgsLength" :key="index" v-show="newImagesShow == (index + 1)"
                        :src="speedImageName +(index+1)+'.png'" alt="">
                </div>
            </div>
            <div class="msg-container msg-updown" style="min-width:3.2rem;top:0;left:0;white-space: nowrap;"
                v-if="!layeggShow && newUser">
                蛋蛋庄园有一只可爱的小鸡。
                <div class="msg-san msg-san-down" style="left:1rem;"></div>
            </div>
        </div>
        <!-- 下蛋 -->
        <div class="egg" v-if="!newUser && chickInfo" @click="_reciveGold()">
            <div class="egg-cont">
                <div class="egg-pro-number" v-show="_fullNumber(chickInfo.eggs,chickInfo.eggsmax,2).eggNumber > 0">
                    {{_fullNumber(chickInfo.eggs,chickInfo.eggsmax,2).eggNumber}}</div>
            </div>
            <!-- 发光 -->
            <div v-show="_fullNumber(chickInfo.eggs,chickInfo.eggsmax,2).eggNumber > 0" class="egg-recived center">
            </div>
            <div class="egg-progress center stroke2">
                <div class="egg-pro-cont" :style="'width:'+(_fullNumber(chickInfo.eggs,chickInfo.eggsmax,1).num)"></div>
                <div class="egg-pro-txt">{{_fullNumber(chickInfo.eggs,chickInfo.eggsmax,2).num}}</div>
            </div>
        </div>
        <!-- 饲料 -->
        <div :class="'feed feed-side ' + (foodSide?'feed-side-act':'feed-side-hide')"
            v-if="!newUser && chickInfo && foodInfo" @click="_changeFeedAct(foodSide)">
            <!-- 饲料列表v-show="foodSide" -->
            <div class="feed-wrap">
                <div :class="' '+(foodSide?'feed-wrap-cont':'feed-wrap-cont2')">
                    <div class="feed-cont" v-for="(item,index) in foodInfo" :key="index"
                        @click="_feeding(item.foodtype,item.total)">
                        <img :src="item.img" alt="">
                        <div class="stroke feed-re-num">{{item.total || 0}}g</div>
                    </div>
                </div>
            </div>

            <div class="feed-weight feed-weishi" v-show="!feedTimeShow"></div>
            <div class="feed-weight feed-time" v-if="feedTimeShow">
                <p class=""></p>
                <p class="center">{{_changeTime(actionInfo.nowtime,actionInfo.endtime)}}</p>
            </div>
        </div>
        <!-- 点击攻略 -->
        <div class="raider-click" @click="_closeRaider"></div>
        <SideBottom v-show="!newUser && chickInfo" :show-list="_showList" :chick-info="chickInfo"></SideBottom>
        <!-- 饲料任务列表 -->
        <transition name="pull-up">
            <TaskList v-show="feedShow" :data="{_closeList,feedShow,taskFeedList,_taskButtonMethods,_shopMethods}"
                @_appShareMethods="_appShareMethods">
            </TaskList>
        </transition>
        <!-- 道具任务列表 -->
        <transition name="pull-up">
            <PropList v-show="propShow" :data="{_closeList,propShow,taskPropList,_taskButtonMethods,_shopMethods}"
                @_appShareMethods="_appShareMethods">
            </PropList>
        </transition>
        <!-- 排行榜 -->
        <transition name="pull-up">
            <RankList v-show="rankShow" :close-list="{_closeList,rankShow,rankList}" :uid='baseInfo.userid'
                :rank="rankList"></RankList>
        </transition>
        <!-- 动态 -->
        <transition name="pull-up">
            <LogList v-show="logShow" :close-list="{_closeList,logShow,logList}"></LogList>
        </transition>
        <!-- 个人信息 -->
        <transition name="pull-up">
            <UserInfo v-show="userShow" :close-list="{_closeList,userShow,userInfos}"></UserInfo>
        </transition>
        <!-- 弹窗(取名) -->
        <Pop v-if="setNameShow" :set-name="{_changeName,_closePop,popType,popDleve,popTitle,popccMsg}"></Pop>
        <!-- 弹窗(饲料) -->
        <PopFeed v-if="popHomeShow" :pop-home="{popHomeShow,popHomeMsg,_closePopHome}"></PopFeed>
        <!-- 弹窗(金蛋) -->
        <PopGold v-if="reciveGoldShow" :recive-egg="{reciveGoldShow,reciveGoldMsg,_closeRecivePop}"></PopGold>
        <!-- 商店 -->
        <!-- <Shops v-show="shopsShow" :close-list="{_closeList,shopsShow,shopList,_shopMethods}"></Shops> -->
        <!-- 新手引导 -->
        <newGuide :guide-data="{guideData,_changeGuideIndex}" v-show="newGuideShow"></newGuide>
        <!-- 攻略 -->
        <!-- <Raiders :raider="_closeRaider" v-show="raiderShow"></Raiders> -->
        <!-- 弹窗(更新信息) -->
        <popMsg v-if="msgData.show" :msg-data="msgData" @_closePopShow="_closePopShow" @_gotoGamecc="_gotoGamecc">
        </popMsg>

        <div class="fixedall" v-show="allpopShow"></div>

    </div>
</template>

<script>
    import Qs from 'qs'
    import Avatar from './comments/avatar'
    import SideRight from './comments/sideright'
    import SideBottom from './comments/sidebottom'
    import Pop from './comments/pop'
    import PopFeed from './comments/popFeed'
    import PopGold from './comments/popGold'
    import TaskList from './comments/feedList'
    import PropList from './comments/propList'
    import RankList from './comments/ranklist'
    import LogList from './comments/loglist'
    import newGuide from './comments/newGuide'
    import UserInfo from './comments/userInfo'
    // import Shops from './comments/shops'
    import popMsg from './comments/popmsg'
    export default {
        name: 'home',
        props: [],
        components: {
            Avatar,
            SideRight,
            SideBottom,
            Pop,
            PopFeed,
            PopGold,
            TaskList,
            RankList,
            LogList,
            newGuide,
            UserInfo,
            PropList,
            // Shops,
            popMsg
        },
        data() {
            return {
                baseInfo: {},
                feedShow: false,
                propShow: false,
                rankShow: false,
                logShow: false,
                userShow: false,
                foodInfo: null,
                taskList: [],
                taskFeedList: [],
                taskPropList: [],
                rankList: null,
                rankLength: null,
                shopList: null,
                logList: [],
                userInfos: {},
                chickInfo: null,
                newUser: false,
                layeggShow: false,
                setNameShow: false,
                popType: 0,
                popccMsg: '',
                popDleve: '',
                imgLength: 1,
                imgMoveShow: false,
                interval: null,
                timeOut: null,
                nowStatus: '',
                feedTimeShow: false,
                reciveGoldShow: false,
                reciveGoldMsg: 0,
                popHomeMsg: null,
                popHomeShow: false,
                egglineShow: false,
                newGuideShow: false,
                guideData: null,
                newImagesShow: 0,
                speedImgsLength: 0,
                speedImageName: '',
                serverReduce: 0,
                foodSide: false,
                shopsShow: false,
                locals: {},
                msgData: {
                    show: false,
                },
                allpopShow: false,
                newuserGuide: false,
                appShareData: null,
                shareType: 1,
            }
        },
        mounted() {
            let that = this;
            that.baseInfo.userid = document.getElementById('userid').value;
            that._getInfoData()
            that._popHome()
            that._shareAppData()
            that.locals.uid = that.baseInfo.userid;
            // console.log(navigator.userAgent.toLocaleString().split("("))
        },
        methods: {
            _changeFeedAct: function (type) {
                let that = this;
                if (that.foodInfo.length == 1) {
                    return
                }
                if (that.feedTimeShow) {
                    that.$toast('不要着急,还没吃完呢')
                    return
                }
                that.foodSide = !that.foodSide;
            },
            _gotoGamecc: function () {
                let that = this;
                let ccUrl =
                    `http://manorapp.pceggs.com/Pages/Manor28/index.aspx?userid=${that.baseInfo.userid}&deviceid=${that.baseInfo.deviceid}&ptype=${that.baseInfo.ptype}&unix=${that.baseInfo.unix}&token=${that.baseInfo.token}&keycode=${that.baseInfo.keycode}`;
                let uids = document.getElementById('testuid').value;
                let isTest = uids.indexOf(that.baseInfo.userid) != -1 ? true : false;

                // if (isTest) {
                try {
                    android.goEggsGame(ccUrl)
                } catch (error) {
                    if (window.goEggsGame) {
                        window.goEggsGame(ccUrl)
                    }
                }
                // } else {
                //     that.$toast('敬请期待')
                // }
            },
            _sideRight: function (id) {
                let that = this;
                switch (id) {
                    case 0:
                        // 动态
                        that._logListData()
                        that.logShow = true;
                        break;
                    case 1:
                        //排行
                        that.rankShow = true;
                        break;
                    case 2:
                        //抽奖
                        try {
                            android.goExchange()
                        } catch (error) {
                            try {
                                // window.webkit.messageHandlers.goWork.postMessage();
                                window.goExchange()
                            } catch (error) {
                                console.log('h5')
                            }
                        }
                        return
                        break;

                    default:
                        that.$toast('敬请期待')
                        break;
                }
                that.foodSide = false;
                that.allpopShow = true;

            },
            _toFeed: function (type) {
                //喂食
                let that = this;
                // let lefts = that.imgLength;
                let length = 0;
                let status = that.nowStatus;
                let lefts = that.newImagesShow;
                let imgHost = 'http://xjccfile.pceggs.com:8080/xjyx/egg/';
                let egglv = that.chickInfo.dlevel || 0;
                // let egglv = 9;
                let eggimg = '';
                // console.log(type + '---' + status)
                if (type == status) {
                    return
                }
                if ((status == 'feed' || status == 'feedHigh') && !that.layeggShow) {
                    return that.$toast('不要着急,还没吃完呢')
                }
                if (status == 'layegg') {
                    return
                }
                if (egglv >= 0 && egglv < 4) {
                    eggimg = 'feed_lv1/';
                } else if (egglv >= 4 && egglv < 7) {
                    eggimg = 'feed_lv4/';
                } else if (egglv >= 7) {
                    eggimg = 'feed_lv7/';
                }

                that.nowStatus = '';
                clearInterval(that.interval)
                clearTimeout(that.timeOut)
                switch (type) {
                    case 'newgold':
                        // 新人
                        length = 20;
                        that.speedImgsLength = 20;
                        that.speedImageName = imgHost + 'newgold/';
                        break;
                    case 'feed':
                        // 喂食23
                        // that.imgLength = 1;
                        length = 23;
                        that.speedImgsLength = 23;
                        that.speedImageName = imgHost + eggimg + 'feed/';
                        break;
                    case 'feedHigh':
                        // 喂食23
                        // that.imgLength = 1;
                        length = 23;
                        that.speedImgsLength = 23;
                        that.speedImageName = imgHost + eggimg + 'feedHigh/';
                        break;
                    case 'touch':
                        // 摸摸25
                        length = 25;
                        that.speedImgsLength = 25;
                        that.speedImageName = imgHost + eggimg + 'touch/';
                        break;
                    case 'hungry':
                        // 饿了25
                        length = 25;
                        that.speedImgsLength = 25;
                        that.speedImageName = imgHost + eggimg + 'hungry/';
                        break;
                    case 'layegg':
                        // 下蛋过程 50
                        length = 50;
                        that.speedImgsLength = 50;
                        that.speedImageName = imgHost + eggimg + 'layegg/';
                        break;
                    default:
                        break;
                }
                that.nowStatus = type;
                that.imgMoveShow = true;
                that.interval = setInterval(() => {
                    lefts++;
                    if (lefts > length) {
                        if (type == 'layegg') {
                            clearInterval(that.interval)
                            clearTimeout(that.timeOut)
                            lefts = 1;
                            that._getInfoData()
                            // console.log('下蛋倒计时结束~')
                            return
                        }
                        lefts = 1;
                    }
                    that.newImagesShow = lefts;
                }, 100);
            },

            _gameccShow: function () {
                let that = this;
                let localData = localStorage.getItem('gameEggsTocc') || null;
                if (!localData) {
                    // 显示弹窗
                    that.setNameShow = true;
                    that.popTitle = '小鸡猜猜猜';
                    that.popType = 3;
                    that.popccMsg = '<p>鸡舍不太平~</p><p>猜猜跑掉了几只小鸡</p><p>猜中赢海量金蛋</p>';
                    localStorage.setItem('gameEggsTocc', JSON.stringify({
                        ccShow: false
                    }))
                }
            },
            _setLolstorage: function (name, data) {
                localStorage.setItem(name, JSON.stringify(data))
            },
            _changeGuideIndex: function (index) {
                let that = this;
                let local = that.locals;

                if (index >= 9) {
                    that.newGuideShow = false;
                    local.index = 10;
                    that._setLolstorage('gameEggs', local)
                    return
                }
                that._closeList()
                switch (index) {
                    case 1:
                        // 引导 1 喂食
                        that._feeding(1, 100)
                        // that._changeFeedAct()
                        that.newGuideShow = false;
                        break;
                    case 2:
                        // 引导 2 收蛋
                        that._reciveGold()
                        that.newGuideShow = false;
                        break;

                    default:
                        break;
                }
                that.guideData = index + 1;
                local.index = index + 1;
                that._setLolstorage('gameEggs', local)
            },
            _getInfoData: function (type) {
                let that = this;
                that.$http({
                    url: that.$apis.homeInfoApi,
                    method: "post",
                    data: {}
                }).then(function (res) {
                    if (res.data.status == 0) {
                        clearInterval(that.interval)
                        clearTimeout(that.timeOut)
                        that.nowStatus = '';
                        that.imgLength = 1;
                        that.layeggShow = false;
                        // 小鸡状态
                        that._chickState(res.data.data)
                    } else {
                        that.$toast(res.data.msg)
                    }
                })
            },
            _getPopsData: function () {
                let that = this;
                that.$http({
                    url: that.$apis.popApi,
                    method: "post",
                    data: {}
                }).then(function (res) {
                    if (res.data.status == 0) {
                        let datas = res.data.data.detail[0] || {};
                        that.msgData = {
                            show: true,
                            title: datas.title,
                            msg: datas.context,
                        };

                    }
                })
            },
            _closePopShow: function () {
                this.msgData = {
                    show: false,
                };
            },
            _feeding: function (type, num) {
                let that = this;
                if (!that.foodSide && that.foodInfo.length > 1) {
                    return
                }
                if (num <= 0) {
                    return that.$toast('小鸡饲料不足')
                }
                if (that.feedTimeShow) {
                    return that.$toast('不要着急,还没吃完呢')
                }
                that.$http({
                    url: that.$apis.feedApi,
                    method: "post",
                    data: {
                        chickid: that.chickInfo.chickid,
                        mainid: that.chickInfo.mainid,
                        foodtype: type,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that._getInfoData()
                        // let fdata = res.data.data.action[0] || null;
                        // that.actionInfo = res.data.data.action[0] || null;
                        // // that.chickInfo.foodnum = res.data.data.chick[0].foodnum || 0;
                        // that.foodInfo = res.data.data.foods || null;
                        // if (that.actionInfo) {
                        //     let nowTime = Date.parse(new Date()) / 1000;
                        //     let serverTime = Date.parse(new Date(that.actionInfo.nowtime.replace(/-/g,
                        //         '/'))) / 1000;
                        //     that.serverReduce = parseInt(serverTime - nowTime)
                        // }
                        // if (fdata) {
                        //     switch (fdata.state) {
                        //         case 0:
                        //         case 2:
                        //             that._toFeed('none')
                        //             break;
                        //         case 1:
                        //             that.feedTimeShow = true;
                        //             that._toFeed('feed')

                        //             break;
                        //         case 3:
                        //             // 高级饲料
                        //             that.feedTimeShow = true;
                        //             that._toFeed('feedHigh')
                        //             break;
                        //         default:
                        //             that._toFeed('none')
                        //             break;
                        //     }
                        // }
                    } else {
                        that.$toast(res.data.msg)

                    }

                })
            },
            _userInfoData: function () {
                let that = this;
                that.$http({
                    url: that.$apis.userInfoApi,
                    method: "post",
                    data: {
                        chickid: that.chickInfo.chickid,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        try {
                            that.userInfos = res.data.data.detail[0]
                        } catch (error) {
                            that.userInfos = null
                        }

                    } else {
                        that.$toast(res.data.msg)
                    }
                })
            },
            _changeName: function (name) {
                let that = this;
                that.$http({
                    url: that.$apis.changeNameApi,
                    method: "post",
                    data: {
                        chickid: that.chickInfo.chickid,
                        nickname: name
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.popType = 0;
                        that.setNameShow = false;
                        that.newUser = false;
                        that.nowStatus = '';
                        that._getInfoData()
                        that._popHome()
                    } else {
                        that.$toast(res.data.msg)
                    }
                })
            },
            _reciveGold: function () {
                let that = this;
                if (that.chickInfo && parseInt(that.chickInfo.eggs / that.chickInfo.eggsmax) <= 0) {
                    return that.$toast('别着急,集满一颗就可以收了')
                }
                that.$http({
                    url: that.$apis.reciveGoldApi,
                    method: "post",
                    data: {
                        chickid: that.chickInfo.chickid,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.reciveGoldShow = true;
                        that.reciveGoldMsg = res.data.data.receivedeggs || 0;
                        that._getInfoData()
                        if (that.newuserGuide) {
                            setTimeout(() => {
                                that._popHome()
                            }, 3000);
                        }
                    } else {
                        that.$toast(res.data.msg)
                    }
                    that.foodSide = false;
                })
            },
            _popHome: function () {
                let that = this;
                that.$http({
                    url: that.$apis.homePopApi,
                    method: "post",
                    data: {}
                }).then(function (res) {
                    if (res.data.status == 0 && res.data.data.items && res.data.data.items.length > 0) {
                        that.popHomeMsg = res.data.data.items[0];
                        that.popHomeShow = true;
                    }

                })
            },
            _chickState: function (data) {
                let that = this;
                that.chickInfo = data.chicks[0] || null;
                that.actionInfo = data.action[0] || null;
                that.foodInfo = data.foods.length > 0 ? data.foods : null;
                if (that.actionInfo) {
                    let nowTime = Date.parse(new Date()) / 1000;
                    let serverTime = Date.parse(new Date(that.actionInfo.nowtime.replace(/-/g, '/'))) / 1000;
                    that.serverReduce = parseInt(serverTime - nowTime)
                }
                // console.log(that.chickInfo.state)
                switch (that.chickInfo.state) {
                    case 0:
                        // 新人
                        // dlevel = -1 新人 
                        // popType : false 提示  true 新人
                        that.newUser = true;
                        that.popType = 1;
                        that._toFeed('newgold')
                        break;
                    case 1:
                        // 饥饿
                        that._toFeed('hungry')
                        break;
                    case 2:
                        // 喂食中
                        that.feedTimeShow = true;
                        that._toFeed('feed')
                        break;
                    case 3:
                        // 无动作
                        that._toFeed('touch')
                        break;
                    case 4:
                        // 高级饲料
                        that.feedTimeShow = true;
                        that._toFeed('feed')
                        break;
                    case 5:
                        // 青菜饲料
                        that.feedTimeShow = true;
                        that._toFeed('feed')
                        break;
                    case 6:
                        // 稻谷饲料
                        that.feedTimeShow = true;
                        that._toFeed('feed')
                        break;
                    default:
                        // 无动作
                        that._toFeed('touch')
                        break;
                }

                if (that.chickInfo.uplevel > 0) {
                    that.setNameShow = true;
                    that.popType = 2;
                    that.popTitle = '小鸡升级啦~';
                    that.popDleve = '<p>小鸡升至LV' + that.chickInfo.uplevel +
                        '啦！</p><p>记得<font color="#FF4B27">领取孵化的鸡蛋</font></p>';
                }
                if (that.chickInfo.dlevel >= 1 && !that.newuserGuide && that.chickInfo.uplevel <= 0) {
                    that._getPopsData()
                    // if (!that.setNameShow) {
                    //     that._gameccShow()
                    // }
                }
                that.$loading()
                that._rankListData()
            },
            _newGuide: function (number) {
                // 新人引导 
                let that = this;
                let localData = JSON.parse(localStorage.getItem('gameEggs')) || null;
                let local = that.locals;
                if (localData && (localData.uid == that.baseInfo.userid)) {

                    if (localData.index <= 9) {
                        that.newGuideShow = true;
                        that.newuserGuide = true;
                        that.guideData = number ? number : localData.index;

                    } else {
                        that.newGuideShow = false;
                        that.newuserGuide = false;
                    }
                } else {

                    that.newGuideShow = true;
                    that.newuserGuide = true;
                    that.guideData = 1;
                    local.index = 1;
                    that._setLolstorage('gameEggs', local)
                }
            },
            _taskButtonMethods: function (id, status, type) {
                /**
                 *  params:(id, status, type)
                 * status : 0 去试玩,去邀请 { 
                 * tasktype: 1 去试玩, 2 去邀请, 3 去喂食 
                 * 11饲料奖励（小鸡猜猜猜）  12饲料奖励（每日分享） 13道具奖励（每日喂食） 14道具奖励（试玩领奖）
                 * }
                    1 去领取
                    2 已领取
                 */
                let that = this;
                if (status == 2) {
                    return
                } else if (status == '0') {
                    switch (type) {
                        case 11:
                            //去小鸡猜猜
                            that._gotoGamecc()
                            break;
                        case 12:
                            //每日分享
                            return
                            break;
                        case 13:
                            //每日喂食
                            that._closeList();
                            break;
                        case 14:
                            //试玩领奖
                            //去试玩
                            try {
                                android.goFastPager()
                            } catch (error) {
                                if (window.goFastPager) {
                                    window.goFastPager()
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    return
                }

                that.$http({
                    url: that.$apis.taskGoldApi,
                    method: "post",
                    data: {
                        chickid: that.chickInfo.chickid,
                        taskid: id,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        try {
                            that.$toast(res.data.data.items[0].takenote)
                        } catch (error) {
                            that.$toast(res.data.msg)
                        }
                        that._taskPropData()
                        that._taskFeedData()
                        that._getInfoData()

                    }
                    that.$toast(res.data.msg)

                })
            },

            _appShareMethods(type) {
                let that = this;
                /**
                    * appShareData :{title,context,url,icon}
                    * startShare(String type, String title, String des, String url, String iconUrl, String imgUrl) 
                    *  type 0 图片 1朋友圈 2好友
                        title 标题
                        des 描述
                        url 分享链接
                        iconUrl 分享链接的小图
                        imgUrl 对应 type = 0时候分享的大图片
                    */
                try {
                    android.startShare(
                        type,
                        that.appShareData.title,
                        that.appShareData.context,
                        that.appShareData.url,
                        that.appShareData.icon,
                        ''
                    )
                } catch (error) {
                    if (window.startShare) {
                        window.startShare(
                            type,
                            that.appShareData.title,
                            that.appShareData.context,
                            that.appShareData.url,
                            that.appShareData.icon,
                            ''
                        )
                    }
                }
                that._shareAppData('1')
            },
            _shareAppData(type) {
                let that = this;
                // shareApi
                that.$http({
                    url: that.$apis.shareApi,
                    method: "post",
                    data: {
                        type: type || '',
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        try {
                            that.appShareData = res.data.data.Share[0];
                        } catch (error) {
                            that.appShareData = {
                                title: '',
                                context: '',
                                url: '',
                                icon: '',
                            }
                        }
                    }
                })
            },
            _taskFeedData: function () {
                let that = this;
                that.$http({
                    url: that.$apis.taskFeedApi,
                    method: "post",
                    data: {}
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.taskFeedList = res.data.data || []
                    }
                })
            },
            _taskPropData: function () {
                let that = this;
                that.$http({
                    url: that.$apis.taskPropApi,
                    method: "post",
                    data: {}
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.taskPropList = res.data.data || []
                    }
                })
            },
            _rankListData: function () {
                let that = this;
                that.$http({
                    url: that.$apis.rankListApi,
                    method: "post",
                    data: {}
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.rankList = res.data.data.FriendList || [];
                    }
                })
            },
            _logListData: function () {
                let that = this;
                that.$http({
                    url: that.$apis.logListApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                        chickid: that.chickInfo.chickid,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.logList = res.data.data || []
                    }
                })
            },
            _shopMethods: function (name, id) {
                let that = this;
                switch (name) {
                    case 'feed':
                    case 'prop':
                        that._buyProps(id)
                        break;
                    case 'my':
                        that._useProps(id)
                        break;
                    default:
                        break;
                }

            },
            _buyProps: function (id) {
                // 购买道具
                let that = this;
                that.$http({
                    url: that.$apis.buyApi,
                    method: "post",
                    data: {
                        chickid: that.chickInfo.chickid,
                        pid: id,
                    }
                }).then(function (res) {
                    that.$toast(res.data.msg)
                    if (res.data.status == 0) {
                        that._getInfoData()
                        that._taskFeedData()
                    }
                })
            },
            _useProps: function (type) {
                // 使用道具
                let that = this;
                // shopListApi
                that.$http({
                    url: that.$apis.useBuyApi,
                    method: "post",
                    data: {
                        chickid: that.chickInfo.chickid,
                        proptype: type,
                    }
                }).then(function (res) {
                    that.$toast(res.data.msg)
                    if (res.data.status == 0) {
                        that._taskPropData()
                        that._getInfoData()
                    }
                })
            },
            _fullNumber: function (min, max, type) {
                let num = parseInt(min / max * 100);
                let eggNumber = 0;
                if (type == 2 && num >= 100) {
                    eggNumber = parseInt(num / 100)
                    num = '可领取';
                } else {
                    num = num + '%';
                }
                return {
                    num,
                    eggNumber
                }
            },
            _setChickName: function () {
                let that = this;
                that.setNameShow = true;
                that.popTitle = '孵化成功~';
                that.popType = 1;
            },
            _closePop: function (type) {
                let that = this;
                // 判断是否有新人引导 第 2 步  收蛋

                switch (type) {
                    case 'name':
                        //首次升级

                        that._newGuide(2)
                        that.setNameShow = false;
                        break;
                    case 'gotocc':
                        that.setNameShow = false;
                        that._gotoGamecc()
                        break;
                    case 'namecc':
                        // 小鸡猜猜引导
                        that.setNameShow = false;

                        let localData = localStorage.getItem('gameEggs') || null;
                        if (localData) {
                            localData = JSON.parse(localData)
                            if (localData.index == 99) {
                                that.setNameShow = false;
                            } else {
                                that.newGuideShow = true;
                                that.guideData = 99;
                            }
                        } else {
                            that.newGuideShow = true;
                            that.guideData = 99;
                        }
                        break;
                    default:
                        break;
                }
            },
            _showList: function (type) {
                let that = this;
                switch (type) {
                    case 0:
                        // 领饲料
                        that._taskFeedData()
                        that.feedShow = true;
                        break;
                    case 1:
                        // 领道具
                        that._taskPropData()
                        that.propShow = true;
                        break;
                    case 2:
                        that._gotoGamecc()
                        return
                        break;
                    case 3:
                        if (that.chickInfo && that.chickInfo.nickname != '') {
                            that._userInfoData()
                            that.userShow = true;
                        } else {
                            return
                        }
                        break;
                    default:
                        break;
                }
                that.foodSide = false;
                that.allpopShow = true;

            },
            _closeList: function (type) {
                let that = this;
                that.rankShow = false;
                that.feedShow = false;
                that.propShow = false;
                that.logShow = false;
                that.userShow = false;
                that.shopsShow = false;
                that.foodSide = false;
                that.allpopShow = false;
            },
            _closeRecivePop: function () {
                this.reciveGoldShow = false;
            },
            _closePopHome: function () {
                let that = this;
                if (that.popHomeMsg && that.popHomeMsg.taskid == 1) {
                    // 新人送饲料  stage = 1

                    that._newGuide(1)
                }
                if (that.popHomeMsg && that.popHomeMsg.taskid == 9) {
                    // 新人首次登录送饲料

                    that._newGuide(3)
                }
                that._getInfoData()
                that.popHomeShow = false;
            },
            _changeTime: function (ftime, time) {
                let that = this;
                let endTime = Date.parse(new Date(time.replace(/-/g, '/'))) / 1000;
                let nowTime = Date.parse(new Date()) / 1000 + (that.serverReduce);
                // let serverTime = Date.parse(new Date(ftime.replace(/-/g, '/'))) / 1000;
                // console.log(that.serverReduce)
                // let endTime = Date.parse(new Date(time.replace(/-/g, '/'))) / 1000;
                // let nowTime = Date.parse(new Date(stime.replace(/-/g, '/'))) / 1000;
                if (that.layeggShow) {
                    // console.log('下蛋ing...')
                    return
                }
                return that._changeOutTime(nowTime, endTime)
            },
            // 时间戳转化为倒计时
            _changeOutTime: function (start, end) {
                let that = this;
                let countDownTime = '';
                let t = end - start;
                if (t <= 0) {
                    // that.nowStatus = '';
                    clearInterval(that.interval)
                    clearTimeout(that.timeOut)
                    that.layeggShow = true;
                    that.feedTimeShow = false;
                    that._toFeed('layegg')
                    // console.log('喂食倒计时结束~~')
                    return
                }

                let hour = Math.floor(t / 60 / 60);
                let min = Math.floor(t / 60 % 60);
                let sec = Math.floor(t % 60);
                if (hour < 10) {
                    hour = "0" + hour;
                }
                if (min < 10) {
                    min = "0" + min;
                }
                if (sec < 10) {
                    sec = "0" + sec;
                }
                countDownTime = hour + ":" + min + ':' + sec
                return countDownTime
            },
            _closeRaider: function () {
                let that = this;
                // that.raiderShow = !that.raiderShow;
                try {
                    window.goSecondPage('http://manorapp.pceggs.com/Pages/Manor/Raider.aspx')
                } catch (error) {
                    window.location.href = 'http://manorapp.pceggs.com/Pages/Manor/Raider.aspx'
                }
            },

        }
    }
</script>
<style lang='scss' scoped>
    $nav: .8rem;

    .home {
        width: 100vw;
        height: 100vh;
        background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/bg1.png) no-repeat bottom;
        background-size: 100% auto;
        padding-top: $nav;

        .content {
            width: 3rem;
            height: 4rem;
            position: fixed;
            bottom: 2.2rem;
            z-index: 9;

            .content-div {
                width: 100%;
                height: 100%;

                .content-wrap {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .content-none {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    bottom: 0;
                    padding-top: .8rem;

                    img {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                    }
                }

                .content-right {
                    img {
                        width: 80%;
                        display: block;
                    }
                }

                .content-right2 {
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    // border: 1px solid red;

                    img {
                        height: auto;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }

                .content-btn {
                    position: absolute;
                    bottom: -1rem;
                    left: -.5rem;
                    width: 4rem;
                    height: .96rem;
                    background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/b1.png) no-repeat center;
                    background-size: 100% auto;
                }

                .content-progress {
                    width: 3.42rem;
                    height: .4rem;
                    line-height: .4rem;
                    background: #fff;
                    border-radius: .2rem;
                    margin-top: .2rem;
                    overflow: hidden;
                    position: absolute;
                    bottom: -.2rem;

                    .content-pro-cont {
                        min-width: 30%;
                        padding: 0 4px;
                        display: inline-block;
                        font-size: .24rem;
                        color: #fff;
                        text-align: center;
                        border-radius: .2rem;
                        background: linear-gradient(0deg, rgba(245, 133, 37, 1), rgba(252, 213, 99, 1));
                    }
                }
            }

            .lay-eggs {
                width: 5rem;
                height: 100%;
                position: absolute;
                left: -2rem;
            }

        }

        .egg {
            position: fixed;
            left: 0;
            bottom: 2.6rem;
            z-index: 9;
            width: 1.36rem;
            height: 1.45rem;

            .egg-cont {
                position: absolute;
                width: 100%;
                height: 1.45rem;
                top: 0;
                left: 0;
                line-height: 1.45rem;
                color: #F28310;
                font-weight: bold;
                text-align: center;
                background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/l1.png) no-repeat center;
                background-size: 100% auto;
                z-index: 2;
            }

            .egg-recived {
                position: absolute;
                width: .6rem;
                height: .8rem;
                border-radius: 50%;
                top: .2rem;
            }

            .egg-progress {
                width: 70%;
                height: 18px;
                border: 2px solid #AC611A;
                border-radius: .2rem;
                text-align: center;
                line-height: 14px;
                position: absolute;
                bottom: .1rem;
                background: #fff;
                font-size: 12px;
                color: #fff;
                overflow: hidden;
                z-index: 3;

                .egg-pro-cont {
                    min-width: 0%;
                    height: 100%;
                    border-radius: .2rem;
                    background: linear-gradient(0deg, rgba(245, 133, 37, 1), rgba(252, 213, 99, 1));
                }

                .egg-pro-txt {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

            }
        }

        .feed {
            width: 1.3rem;
            min-height: 1.3rem;
            padding: .2rem;
            position: fixed;
            right: .3rem;
            bottom: 1.2rem;
            z-index: 9;

            .feed-cont {
                width: .9rem;
                height: .9rem;
                margin: 0 auto .22rem;
                position: relative;

                &:last-child {
                    margin-bottom: 0;
                }

                img {
                    height: .9rem;
                    display: block;
                    margin: 0 auto;
                }

                .feed-re-num {
                    text-align: center;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    line-height: .3rem;
                    color: #fff;
                }
            }

            .feed-weight {
                position: absolute;
                bottom: -.2rem;
                left: 0;
                width: 100%;
                height: .35rem;
                line-height: .35rem;
                font-size: .32rem;
                color: #fff;
                text-align: center;

                p {
                    display: block;
                    font-size: .28rem;
                }

                p:nth-child(1) {
                    width: 100%;
                    height: .35rem;
                    background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/jinshi1.png) no-repeat center;
                    background-size: auto 100%;
                }

                p:nth-child(2) {
                    padding: 0 .2rem;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: .24rem;
                    box-sizing: content-box;
                }
            }

            .feed-weishi {
                background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/weishi1.png) no-repeat center;
                background-size: auto 100%;
            }
        }

        .feed-side {
            border-radius: 1rem;
            box-shadow: 0 0 10px 3px #fff inset;
        }

        .feed-wrap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
        }

        .feed-wrap-cont2 {
            position: absolute;
            bottom: 0;
        }

        .feed-side-act {
            // min-height: 1.28rem;
            max-height: 6.5rem;
        }

        .feed-side-hide {
            height: 1.3rem;
            max-height: 1.3rem;
        }

        .raider-click {
            width: 1.7rem;
            height: 1.2rem;
            position: fixed;
            bottom: 3.6rem;
            right: 0;
            z-index: 2;
        }
    }
</style>