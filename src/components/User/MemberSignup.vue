<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-7 mt-5">
                <div class=" pt-3 justify-content-center text-center">
                    <h2 class="text-dark">Cadastro de prestador de serviços</h2>
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
                                <select class="form-control" type="password" placeholder="" v-model="user.position">
                                    <option value="" selected>Selecione seu cargo</option>
                                    <option value="Programador">Programador</option>
                                    <option value="Designer">Designer</option>
                                    <option value="Scrum master">Scrum master</option>
                                </select>
                                <span class="mt-1 text-danger">{{ errors[0] }}</span>
                            </validation-provider>                      
                        </div>
                        <div class="form-group">    
                            <validation-provider rules="required|cpf" v-slot="{ errors }">
                                <input class="form-control" type="text" v-mask="'###.###.###-##'" placeholder="CPF" v-model="user.cpf">
                                <span class="mt-1 text-danger">{{ errors[0] }}</span>
                            </validation-provider>                        
                        </div>
                        <div class="form-group">
                            <label for="curriculum" class="text-dark">Importar currículo</label>
                            <input class="form-control-file text-dark" type="file" placeholder="Curriculo" name="curriculum" ref="files" id="curriculum">
                        </div>
                        <div class="form-group form-group d-flex justify-content-center">
                            <button class="btn btn-primary px-5">
                                Cadastrar
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
                    position: '',
                    user_type: 'member'
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
                        this.sendFile(this.$session.get('expecificId'));
                    }
                    else{
                        console.log(login)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            async sendFile(userId) {
                try {                        
                    let dataForm = new FormData();                
                    dataForm.append('curriculum', this.$refs.files.files[0])
                    dataForm.append('userId', userId)
                    await this.axios.post("/member-file", dataForm);
                } catch (error) {
                    console.log(error)
                }
            }
        },
    };
  </script>
  