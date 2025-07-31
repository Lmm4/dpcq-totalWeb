<template>
	<div class="errPage-404">
		<div class="backgroundImg">
			<div>
				<img src="@/assets/web_404.png" />
			</div>
			<div>
				<span class="title">一不小心，页面丢失了......</span><br />
				<el-button class="button" icon="el-icon-s-home" @click="back">返回</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const back = () => {
	router.push({
		name: 'index'
	})
} 
</script>

<style lang="scss" scoped>
.errPage-404 {
	width: 100%;
	height: 100%;

	.backgroundImg {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 50px;
		text-align: center;

		.title {
			color: rgb(86, 86, 86);
			font-size: 24px;
			margin-right: 20px;
		}

		.button {
			margin-top: 20px;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
