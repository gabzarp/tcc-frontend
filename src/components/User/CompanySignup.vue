<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-7 mt-5 bg-info">
                <div class=" pt-3 justify-content-center text-center">
                    <h2>Signup company</h2>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <input class="form-control" type="text" placeholder="Name" v-model="user.name">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="email" placeholder="E-mail" v-model="user.email">
                    </div>
                    <div class="form-group">    
                        <input class="form-control" type="password" placeholder="Password" v-model="user.password">
                    </div>
                    <div class="form-group">    
                        <input class="form-control" type="text" placeholder="CNPJ" v-model="user.cnpj">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary ">
                            Signup
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
                user: {
                    user_type: 'company'
                },
            };
        },
        methods: {
            async handleSubmit() {
                try {
                    var login = await this.axios.post("/signup", this.user);
                    if(login.data){
                        this.$session.set('userId', login.data.id);
                        this.$session.set('userName', login.data.name);
                        this.$session.set('userEmail', login.data.email);
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
  