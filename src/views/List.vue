<template>
	<div>
	List
    <!-- 메인 문구에 Home 표시를 해주자 -->
	</div>
</template>
<script>
export default {
	name: 'List',
	methods: {
		getList(){
			var jwt = window.localStorage.getItem('jwt');
			fetch("http://127.0.0.1:8000/posts",{
					method: 'GET',
					headers:{
						'Content-Type':'application/json',
						"Authorization": "Bearer " + jwt
					},
				}).then((r)=>{
					console.log("r = " , r)
					//if(r.status != 200) throw new Error("HTTP EXCEPTION")
					return r.json()
				}).then((msg)=>{
					console.error("msg = ", msg)
				}).catch(error => {
					console.error("error", error)
				});
		},
	},
	mounted(){
		this.getList();
	}
};
</script>