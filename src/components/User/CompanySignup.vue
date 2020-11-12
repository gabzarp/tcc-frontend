<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-7 mt-5 bg-gray">
                <div class=" pt-3 justify-content-center text-center">
                    <h2 class="text-white">Cadastrar empresa</h2>
                </div>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(onSubmit)">
                        <div class="form-group">
                            <validation-provider rules="required" v-slot="{ errors }">
                                <input class="form-control" type="text" placeholder="Nome" v-model="user.name">
                                <span class="mt-1 text-danger">{{ errors[0] }}</span>                        
                            </validation-provider>
                        </div>
                        <div class="form-group">
                            <validation-provider rules="required" v-slot="{ errors }">
                                <input class="form-control" type="email" placeholder="E-mail" v-model="user.email">
                                <span class="mt-1 text-danger">{{ errors[0] }}</span>                                                    
                            </validation-provider>                        
                        </div>
                        <div class="form-group">   
                            <validation-provider rules="required" v-slot="{ errors }">                        
                                <input class="form-control" type="password" placeholder="Senha" v-model="user.password">
                                <span class="mt-1 text-danger">{{ errors[0] }}</span>                                                    
                            </validation-provider>                        
                        </div>
                        <div class="form-group">    
                            <validation-provider rules="required" v-slot="{ errors }">
                                <input class="form-control" type="text" placeholder="CNPJ" v-model="user.cnpj">
                                <span class="mt-1 text-danger">{{ errors[0] }}</span>                        
                            </validation-provider>                        
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary ">
                                Signup
                            </button>
                        </div>
                    </form> 
                </ValidationObserver>
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
            async onSubmit() {
                try {
                    var login = await this.axios.post("/signup", this.user);
                    if(login.data){
                        this.$session.start();
                        this.$session.set('userId', login.data.user._id);
                        this.$session.set('expecificId', login.data._id);
                        this.$session.set('userName', login.data.user.name);
                        this.$session.set('userEmail', login.data.user.email);
                        this.$session.set('userType', login.data.user.user_type);
                        this.$session.set('role', login.data.position);
                        this.$router.push({ name: "my-projects" });
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
  