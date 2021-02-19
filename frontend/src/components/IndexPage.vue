<template>
    <div v-if="user">
        <h1>접속한 유저</h1>
        <p>아이디 : {{ user.id }}</p>
        <p>비밀번호 : {{ user.password }}</p>
        <p>이름 : {{ user.name }}</p>
        <button @click="callCareCenter">경기도 산후조리원 목록 불러오기</button>
        
    </div>
</template>

<script>
export default {
    created() {
        this.$http.get('/api/login')
            .then((res)=>{
                const user = res.data.user;
                console.log('index->', user);
                if(user) {
                    this.$store.commit("setUser", user);
                } else {
                    this.$router.push({name: "LoginPage"});
                }
            })
            .catch((err)=> {
                console.error(err);
            });
    },
    computed: {
        user() { return this.$store.getters.user; }
    },
    methods: {
        callCareCenter: function(event) {
            this.$http.get('/api/carecenter')
            .then((res)=>{
                console.log('carecenter->', res);
            })
            .catch((err)=> {
                console.error(err);
            });

        }
    }
}
</script>

<style>
</style>