import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'; // 라우터 추가하고 
const app = createApp(App)
app.use(router); // 사용 설정 하기
app.mount('#app')
window.addEventListener('message', function(e) {
    console.log('child message');
    console.log(e.data); 
    console.log("e.origin : " + e.origin);
    if(e.data.type != 'token_regist') return;
    const response = e.data;
    window.localStorage.setItem('jwt', response["access_token"]);
    window.localStorage.setItem('refresh', response["refresh_token"]);
    fetch("http://127.0.0.1:8000/test/show",{
        headers:{
            "Authorization": "Bearer " + window.localStorage.getItem("jwt")
        },
    }).then((r)=>r.json()).then((msg)=>{console.log(msg)});
  
});