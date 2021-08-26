<template>
	<div>
		<router-view />
	</div>
	
</template>
<script>
import { router } from './router'; // 라우터 추가하고 
export default {
	name: 'App',
	data:function(){
		return {
			snsLoginShow : false,
			snsLoginUrl : null
		}
	},
	methods: {
		post(){
			var jwt = window.localStorage.getItem('jwt');
			fetch("http://127.0.0.1:8000/posts",{
					method: 'POST',
					headers:{
						'Content-Type':'application/json',
						"Authorization": "Bearer " + jwt
					},
					
					body: JSON.stringify({post:{board:'test',user_id:'5',name:'juon',title:'test_title',content:'test_content'}})
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
		checkToken(){
			var jwt = window.localStorage.getItem('jwt');
			console.log(jwt != null)
			if(jwt != null){
				fetch("http://127.0.0.1:3000/auth/check",{
					headers:{
						"Authorization": "Bearer " + jwt
					},
				}).then((r)=>{
					console.log("r = " , r)
					if(r.status != 200) throw new Error("HTTP EXCEPTION")
					return r.json()
				}).then((msg)=>{
					console.log(msg)
					router.push('List')
				}).catch(error => {
					console.log("this.snsLoginUrl - " , this.snsLoginUrl)
					console.error("error", error)
					this.refreshToken();
				});
			}
		},
		refreshToken(){
			var refresh = window.localStorage.getItem('refresh');
			console.log(refresh != null)
			if(refresh != null){
				fetch("http://127.0.0.1:3000/auth/refresh",{
					method: 'POST',
					headers:{
						"Authorization": "Bearer " + refresh
					},
					body: JSON.stringify({refresh_token:refresh})
				}).then((r)=>{
					console.log("r = " , r)
					if(r.status != 200) throw new Error("HTTP EXCEPTION")
					return r.json()
				}).then((msg)=>{
					window.localStorage.setItem('jwt', msg["access_token"]);
				}).catch(error => {
					console.log("this.snsLoginUrl - " , this.snsLoginUrl)
					console.error("error", error)
				});
			}
		}
	},
	mounted(){
		//router.push('Home')
		//this.checkToken();
	}
}

</script>


