<template>
	<div class="app">
		<!-- 导航栏 -->
		<div class="navbar flex-bt">
			<div class="nav-left" @click="goHome()"></div>
			<div class="nav-center" @click="_clearStorage">蛋蛋庄园</div>
			<div class="nav-right" v-if="isTest" @click="_clearUserInfo">重置</div>
			<div class="nav-right" v-if="!isTest"></div>
		</div>
		<!-- <router-view :base-info="baseInfo"></router-view> -->
		<Home></Home>
	</div>
</template>

<script>
	import Home from './home'
	export default {
		name: 'app',
		components: {
			Home
		},
		data() {
			return {
				baseInfo: {
					userid: '',
					deviceid: '',
					ptype: '',
					unix: '',
					token: '',
				},
				isTest: false,
			}
		},
		mounted() {
			let that = this;
			// 获取	基础信息
			that.baseInfo.userid = document.getElementById('userid').value;

			let uids = document.getElementById('testuid').value;
			that.isTest = uids.indexOf(that.baseInfo.userid) != -1 ? true : false;
		},
		methods: {
			_clearUserInfo: function () {
				// clearApi
				let that = this;
				if (!that.isTest) {
					return
				}
				that.$http({
					url: that.$apis.clearApi,
					method: "post",
					data: {
						userid: that.baseInfo.userid,
						ptype: that.baseInfo.ptype,
						token: that.baseInfo.token,
						unix: that.baseInfo.unix,
						deviceid: that.baseInfo.deviceid,
						keycode: that.baseInfo.keycode,
					}
				}).then(function (res) {
					if (res.data.status == 0) {
						that.$toast('数据清除成功~ 请退出重进~')
					}
				})
			},
			_clearStorage: function () {
				let that = this;
				if (that.isTest) {
					localStorage.clear()
					that.$toast('引导清除成功~ 请退出重进~')
				}
			},
			goHome: function () {
				try {
					android.goBack()
				} catch (error) {
					try {
						// window.webkit.messageHandlers.goBack.postMessage();
						window.goBack();
					} catch (error) {
						console.log('h5')
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	// 导航条高度
	$nav: .8rem;

	.app {
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		.navbar {
			width: 100%;
			height: $nav;
			line-height: $nav;
			color: #fff;
			font-size: .32rem;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;

			.nav-left {
				width: $nav;
				height: 100%;
				background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/j3.png) no-repeat center;
				background-size: 30% auto;
			}

			.nav-right {
				width: $nav;
				height: 100%;
			}
		}
	}

	.stroke {
		-webkit-text-stroke: 1px #442715;
		text-stroke: 1px #442715;
		font-weight: bold;
	}

	.stroke2 {
		-webkit-text-stroke: 1px #AC611A;
		text-stroke: 1px #AC611A;
		font-weight: bold;
	}

	.stroke3 {
		-webkit-text-stroke: 1px #C24224;
		text-stroke: 1px #C24224;
		font-weight: bold;
	}

	.fixed {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.8);
		z-index: 100;
		top: 0;
		left: 0;
	}

	.fixed2 {
		position: fixed;
		width: 100vw;
		height: 100vh;
		// background: rgba(0, 0, 0, 0.8);
		z-index: 100;
		top: 0;
		left: 0;
	}

	.fixedall {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.8);
		z-index: 99;
		top: 0;
		left: 0;
	}

	.list-cont {
		width: 6.8rem;
		height: 8.41rem;
		background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img2/bg-tanchuang.png) no-repeat;
		background-size: 100% auto;
		padding: .5rem .3rem 0;
		bottom: 0;
	}

	.list-title {
		width: 2.71rem;
		height: .64rem;
		line-height: .63rem;
		font-weight: bold;
		color: #FCF7E6;
		font-size: .35rem;
		text-align: center;
		margin: 0 auto;
		background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img2/bg-tantit.png) no-repeat;
		background-size: 100% auto;
	}

	.list-list {
		position: absolute;
		bottom: 0;
		width: calc(100% - 0.6rem);
		height: 7rem;
		padding: 0 .3rem;
		background: #FFEFD8;
		border-top-left-radius: .2rem;
		border-top-right-radius: .2rem;
	}

	.list-scroll {
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

	.list-scroll::-webkit-scrollbar {
		display: none
	}

	.list-close {
		position: absolute;
		width: .91rem;
		height: .97rem;
		background: url(http://xjccfile.pceggs.com:8080/xjyx/egg/img/w7.png) no-repeat;
		background-size: 100% auto;
		top: -.2rem;
		right: -.2rem;
	}

	.pull-up-enter-active,
	.pull-up-leave-active {
		transition: all .6s;
		transform: translateY(0);
	}

	.pull-up-enter,
	.pull-up-leave-active {
		transform: translateY(100%);
	}

	.msg-container {
		max-width: 4rem;
		min-width: 2.2rem;
		// min-height: .88rem;
		padding: .2rem .12rem;
		background: #FCF7E6;
		border-radius: .1rem;
		color: #B26D40;
		position: absolute;
	}

	.msg-san {
		position: absolute;
		width: 0;
		height: 0;
		border-width: 8px;
		border-style: solid;
	}

	.msg-san-up {
		top: -16px;
		left: 8px;
		border-color: transparent transparent #FCF7E6 transparent;
	}

	.msg-san-down {
		bottom: -16px;
		left: 8px;
		border-color: #FCF7E6 transparent transparent transparent;
	}

	.msg-san-left {
		top: 8px;
		left: -16px;
		border-color: transparent #FCF7E6 transparent transparent;
	}

	.msg-san-right {
		top: 8px;
		right: -16px;
		border-color: transparent transparent transparent #FCF7E6;
	}

	.msg-updown {
		animation: updown .1s infinite;
		-webkit-animation: updown 1s infinite;
	}

	@keyframes updown {
		0% {
			transform: translate(0, -5px)
		}

		50% {
			transform: translate(0, 0)
		}

		100% {
			transform: translate(0, -5px)
		}
	}

	@-webkit-keyframes updown {
		0% {
			transform: translate(0, -5px)
		}

		50% {
			transform: translate(0, 0)
		}

		100% {
			transform: translate(0, -5px)
		}
	}

	.msg-lr {
		animation: lrs .1s infinite;
		-webkit-animation: lrs 1s infinite;
	}

	@keyframes lrs {
		0% {
			transform: translate(-5px, 0)
		}

		50% {
			transform: translate(5px, 0)
		}

		100% {
			transform: translate(-5px, 0)
		}
	}

	@-webkit-keyframes lrs {
		0% {
			transform: translate(-5px, 0)
		}

		50% {
			transform: translate(5px, 0)
		}

		100% {
			transform: translate(-5px, 0)
		}
	}

	.scale-box {
		animation: scaledraw 1.5s infinite;
		-webkit-animation: scaledraw 1.5s infinite;
	}

	@keyframes scaledraw {

		0% {
			transform: scale(1);
		}

		25% {
			transform: scale(1.1);
		}

		50% {
			transform: scale(1);
		}

		75% {
			transform: scale(1.1);
		}
	}

	@-webkit-keyframes scaledraw {

		0% {
			transform: scale(1);
		}

		25% {
			transform: scale(1.1);
		}

		50% {
			transform: scale(1);
		}

		75% {
			transform: scale(1.1);
		}
	}

	.center3 {
		position: absolute;
		top: 50%;
		-ms-transform: translate(0, -50%);
		-moz-transform: translate(0, -50%);
		-o-transform: translate(0, -50%);
		transform: translate(0, -50%);
	}
</style>