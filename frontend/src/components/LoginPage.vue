<template>
    <div>
        <form @submit.prevent="onSubmit">
            <p>아이디</p>
            <input type="text" name="id" v-model="id">
            <p>비밀번호</p>
            <input type="password" name="password" v-model="password">
            <p></p>
            <button>로그인</button>
        </form>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
            id: '',
            password: '',
        };
    },
    methods: {
        onSubmit() {
            const id = this.id;
            const password = this.password;
            this.$http.post("api/login", { id, password }, { "Content-Type":"application-json" })
                .then((res)=>{
                    console.log(res);
                    if(res.data.user) {
                        this.$store.commit("setUser", res.data.user);
                        this.$router.push({name: "IndexPage"});
                    } else if(res.data.message) {
                        alert(res.data.message);
                    }
                })
                .catch((err)=>{
                    console.error(err);
                });
        }
    }
}
</script>

<style>
</style>