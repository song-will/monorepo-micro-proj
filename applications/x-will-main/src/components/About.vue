<template>
    <div>
        About
        <img :src="lyf" alt="">
    </div>
</template>

<script>
import lyf from '@/assets/images/lyf_1.jpg'
export default {
    name: 'About',
    data () {
        return {
            lyf
        }
    }
}
</script>

<style lang="less" scoped>
img {
    width: 400px;
}
</style>