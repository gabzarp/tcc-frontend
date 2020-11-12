<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-7 mt-5 bg-gray">
                <div class=" pt-3 justify-content-center text-center">
                    <h2 class="text-light">Login</h2>
                </div>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(onSubmit)">
                        <div class="form-group">
                            <validation-provider rules="required" v-slot="{ errors }">
                                <input class="form-control" type="email" placeholder="E-mail" v-model="user.email">
                                <span class="mt-1 text-danger">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>
                        <div class="form-group">  
                            <validation-provider rules="required" v-slot="{ errors }">
                                <input class="form-control" type="password" placeholder="Password" v-model="user.password">
                                <span class="mt-1 text-danger">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary ">
                                Login
                            </button>
                        </div>
                        <p class="text-danger">{{ loginError }}</p>
                    </form> 
                </ValidationObserver>
            </div>
        </div>
    </div>  
</template>
  
  
  <script>
    import { extend } from 'vee-validate';
    import { required } from 'vee-validate/dist/rules';

    extend('required', {
        ...required,
        message: 'Campo obrigatório'
    });
    export default {
        data() {
            return {
                user: {},
                loginError: ''
            };
        },
        methods: {
            async onSubmit() {
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
                        this.$router.push({ name: "my-projects" });
                    }
                    else{
                        this.loginError = 'Usuário ou senha errados'
                    }
                } catch (error) {
                    this.loginError = 'Usuário ou senha errados'
                }
            },
        }
    };
  </script>
  