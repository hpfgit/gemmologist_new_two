<script>
    import {templateMessage} from "./api/templateMessage";

    export default {
        onLaunch: function () {
        },
        onShow: function () {
        },
        onHide: function () {
        },
        globalData: {
            templateMessage
        }
    };
</script>

<style>
    .container {
        min-height: 100vh;
        background-color: #eef1f4;
        overflow: hidden;
    }

    view {
        box-sizing: border-box;
    }

    view,
    text {
        font-family: "PingFang SC Medium";
        font-size: 28rpx;
        color: #282828;
    }

    image {
        vertical-align: middle;
        max-width: 100%;
    }

    .navigator-hover {
        background-color: transparent;
        opacity: 1;
    }
</style>
