<template>
  <div>
		<ul class="sns_login" v-show="!snsLoginShow">
			<li>
				<div id="sns_google">
					<a href="#" @click="authGoogle" class="loginBtn">
						<span class="icon"></span>
						<span class="buttonText">Google Login</span>
					</a>
				</div>
			</li><li>
				<div id="sns_naver">
					<a @click="post" href="#" class="loginBtn">
						<span class="icon"></span>
						<span class="buttonText">Naver Login</span>
					</a>
				</div>
			</li>		
		</ul>
	</div>
</template>
<script>
export default {
  name: 'Login',
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
		authGoogle(){
			//this.snsLoginShow = true;
			this.snsLoginUrl = "http://127.0.0.1:3000/auth/google_oauth2/"

			window.open(this.snsLoginUrl, "a", "width=400, height=300, left=100, top=50"); 
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
};
</script>

<style scoped>
#snsLoginFrame{position: absolute;top:0;left:0;width:100%;height:100%;border: none;}
.sns_icon{padding:0 0 3px 28px;}
.sns_icon.twitter{background:url(/img/twitter.png) no-repeat;}
.sns_icon.facebook{background:url(/img/facebook.png) no-repeat;}
.sns_icon.google{background:url(/img/google.png) no-repeat;}
.sns_icon.naver{background:url(/img/naver.png) no-repeat;}
.sns_icon.kakao{background:url(/img/kakao.png) no-repeat;}

.sns_login{padding:0;margin:0;list-style:none; overflow:hidden;}
.sns_login li{display:block;padding:0; margin-bottom:10px; text-align:center;}

#sns_twitter .loginBtn {display:inline-block;background: #2596E9;color: white; width: 175px;border-radius:5px;text-align:left;}
#sns_twitter a.loginBtn {text-decoration:none;}
#sns_twitter .loginBtn:hover {background: #55ACEE;cursor:hand;}
#sns_twitter span.label {font-weight:bold;}
#sns_twitter span.icon {background: url('/img/btn_twitter.png') transparent 10px 50% no-repeat;display: inline-block;vertical-align: middle;width: 40px;height:40px;}
#sns_twitter span.buttonText {display:inline-block;vertical-align:middle;padding-left:10px;}

#sns_facebook .loginBtn {display:inline-block;background: #3B5998;color: white; width: 175px;border-radius:5px;text-align:left;}
#sns_facebook a.loginBtn {text-decoration:none;}
#sns_facebook .loginBtn:hover {background: #5577BD;cursor:hand;}
#sns_facebook span.label {font-weight:bold;}
#sns_facebook span.icon {background: url('/img/btn_facebook.png') transparent 10px 50% no-repeat;display: inline-block;vertical-align: middle;width: 40px;height:40px;}
#sns_facebook span.buttonText {display:inline-block;vertical-align:middle;padding-left:10px;}

#sns_google .loginBtn {display:inline-block;background: #ffffff;color: black; width: 175px;border-radius:5px;text-align:left;border: 1px solid silver;}
#sns_google a.loginBtn {text-decoration:none;}
#sns_google .loginBtn:hover {background: #ffffff;cursor:hand;}
#sns_google span.label {font-weight:bold;}
#sns_google span.icon {background: url('/img/btn_google.png') transparent 10px 50% no-repeat;display: inline-block;vertical-align: middle;width: 40px;height:40px;}
#sns_google span.buttonText {display:inline-block;vertical-align:middle;padding-left:10px;}

#sns_naver .loginBtn {display:inline-block;background: #1ec800;color: white; width: 175px;border-radius:5px;text-align:left;}
#sns_naver a.loginBtn {text-decoration:none;}
#sns_naver .loginBtn:hover {background: #25d805;cursor:hand;}
#sns_naver span.label {font-weight:bold;}
#sns_naver span.icon {background: url('/img/btn_naver.png') transparent 10px 50% no-repeat;display: inline-block;vertical-align: middle;width: 40px;height:40px;}
#sns_naver span.buttonText {display:inline-block;vertical-align:middle;padding-left:10px;}

#sns_kakao .loginBtn {display:inline-block;background: #ffeb00;color:#3c1e1e; width: 175px;border-radius:5px;text-align:left;}
#sns_kakao a.loginBtn {text-decoration:none;}
#sns_kakao .loginBtn:hover {background: #FFDE00;cursor:hand;}
#sns_kakao span.label {font-weight:bold;}
#sns_kakao span.icon {background: url('/img/btn_kakao.png') transparent 10px 50% no-repeat;display: inline-block;vertical-align: middle;width: 40px;height:40px;}
#sns_kakao span.buttonText {display:inline-block;vertical-align:middle;padding-left:10px;}

</style>