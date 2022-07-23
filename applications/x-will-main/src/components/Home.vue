<template>
    <div>
        Home
        <span>
            sss
        </span>
        <TestMainVue />
    </div>
</template>

<script>
import TestMainVue from './TestMain.vue'
export default {
    name: 'Home',
    components: {TestMainVue},
    created () {
        console.log('state', window.history.state)
    }
}
</script>

<style lang="less" scoped>
div {
    span {
        color: orange;
    }
}
</style>