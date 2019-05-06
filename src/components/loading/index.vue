
<template>
	<div class="loading-wrap">
		<div class="loading">
			<div class="loading-bg"><img src="./loading.png" height="36" width="36"></div>
			<p class="loading-txt">加载中...</p>
		</div>
	</div>
</template>

<script>
export default {

  	name: 'index'
  	
};
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.loading-wrap{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2000;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0);

	.loading{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 180px;
		height: 95px;
		text-align: center;
		background: rgba(0, 0, 0, 0.8);
		transform: translate(-50%, -50%);
		border-radius: 5px;
		padding-top: 20px;
		box-sizing: border-box;
		
		.loading-bg{
			-webkit-animation: load 1.6s linear infinite;
			-moz-animation: load 1.6s linear infinite;
			-ms-animation: load 1.6s linear infinite;
			-o-animation: load 1.6s linear infinite;
			animation: load 1.6s linear infinite;
		}

		.loading-txt{
			color: #FFF;
			line-height: 2;
		}
	}
}

@-webkit-keyframes load{
	0%{
		transform: rotate(0deg);
	}
	50%{
		transform: rotate(180deg);
	}
	100%{
		transform: rotate(360deg);
	}
}
@-moz-keyframes load{
	0%{
		-moz-transform: rotate(0deg);
	}
	50%{
		-moz-transform: rotate(180deg);
	}
	100%{
		-moz-transform: rotate(360deg);
	}
}
@-ms-keyframes load{
	0%{
		-ms-transform: rotate(0deg);
	}
	50%{
		-ms-transform: rotate(180deg);
	}
	100%{
		-ms-transform: rotate(360deg);
	}
}
@-o-keyframes load{
	0%{
		-o-transform: rotate(0deg);
	}
	50%{
		-o-transform: rotate(180deg);
	}
	100%{
		-o-transform: rotate(360deg);
	}
}
@keyframes load{
	0%{
		transform: rotate(0deg);
	}
	50%{
		transform: rotate(180deg);
	}
	100%{
		transform: rotate(360deg);
	}
}

</style>