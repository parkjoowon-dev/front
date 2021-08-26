<template>
	<div @click="clickHome">
	HOME
    <!-- 메인 문구에 Home 표시를 해주자 -->
	</div>
</template>
<script>
import { router } from '../router';
export default {
	name: 'Home',
	methods : {
		clickHome(){
			router.push('List');
		}
	}
};
</script>