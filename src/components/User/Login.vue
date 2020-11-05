<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-7 mt-5 bg-info">
                <div class=" pt-3 justify-content-center text-center">
                    <h2>Login</h2>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <input class="form-control" type="email" placeholder="E-mail" v-model="user.email">
                    </div>
                    <div class="form-group">    
                        <input class="form-control" type="password" placeholder="Password" v-model="user.password">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary ">
                            Login
                        </button>
                    </div>
                </form> 
            </div>
        </div>
    </div>  
</template>
  
  
  <script>
  
    export default {
        data() {
            return {
                user: {},
            };
        },
        methods: {
            async handleSubmit() {
                try {
                    var login = await this.axios.post("/login", this.user);
                    if(login.data){
                        console.log(login.data)
                        this.$session.start();
                        this.$session.set('userId', login.data.user._id);
                        this.$session.set('expecificId', login.data._id);
                        this.$session.set('userName', login.data.user.name);
                        this.$session.set('userEmail', login.data.user.email);
                        this.$session.set('userType', login.data.user.user_type);
                        this.$session.set('role', login.data.position);
                        this.$router.push({ name: "projects" });
                    }
                    else{
                        console.log(login)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }
    };
  </script>
  