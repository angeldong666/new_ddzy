<template>
    <!-- <div class="twrap"> -->
    <div class="toast center2" v-show="visible" v-html="message"></div>
    <!-- </div> -->
</template>

<script>
    export default {
        name: 'toast',
        data() {
            return {
                message: '', // 消息文字
                duration: 3000, // 显示时长，毫秒
                closed: false, // 用来判断消息框是否关闭
                timer: null, // 计时器
                visible: false // 是否显示
            }
        },
        mounted() {
            this.startTimer()
        },
        watch: {
            closed(newVal) {
                if (newVal) {
                    this.visible = false
                    this.destroyElement()
                }
            }
        },
        methods: {
            destroyElement() {
                this.$destroy()
                this.$el.parentNode.removeChild(this.$el)
            },
            startTimer() {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.closed = true
                        clearTimeout(this.timer)
                    }
                }, this.duration)
            }
        }
    }
</script>

<style lang="scss" scoped>
    // .twrap {
    //     position: fixed;
    //     width: 100%;
    //     height: 100%;
    //     z-index: 999;
    //     top: 0;
    //     left: 0;
    // }

    .toast {
        position: fixed;
        font-size: .28rem;
        line-height: .45rem;
        padding: .2rem .3rem;
        text-align: center;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        border-radius: .24rem;
        word-break: break-all;
    }
</style>