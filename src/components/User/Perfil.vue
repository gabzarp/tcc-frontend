<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-7 mt-5">
                <div class=" pt-3 justify-content-center text-center">
                    <h2  class="text-dark">Perfil</h2>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <input class="form-control" type="text" placeholder="Nome" v-model="member.user.name">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="email" placeholder="E-mail" v-model="member.user.email">
                    </div>
                    <div class="form-group">    
                        <select class="form-control" type="password" placeholder="Posição" v-model="member.position">
                            <option value="" selected>Selecione seu cargo</option>
                            <option value="Programador">Programador</option>
                            <option value="Designer">Designer</option>
                            <option value="Scrum master">Scrum master</option>
                        </select>
                    </div>
                    <div class="form-group">    
                        <input class="form-control" type="text" placeholder="CPF" v-model="member.cpf">
                    </div>
                    <div class="form-group">
                        <label for="curriculum" class="text-dark">Importar currículo</label>
                        <input class="form-control-file text-dark" type="file" placeholder="Curriculo" name="curriculum" ref="files" id="curriculum">
                    </div>
                    <div class="d-flex">
                        <div class="form-group pr-3">
                            <button class="btn btn-primary px-3" @click.prevent="downloadFile">
                                Baixar currículo
                            </button>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary px-" @click="sendFile">
                                Atualizar
                            </button>
                        </div>
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
                member: {
                    _id: this.$session.get('expecificId')
                },
            };
        },
        methods: {
            async handleSubmit() {
                try {
                    var login = await this.axios.patch("/member", this.member);
                    if(login.data){
                        this.$session.start();
                        this.$session.set('userId', login.data._id);
                        this.$session.set('userName', login.data.name);
                        this.$session.set('userEmail', login.data.email);
                        this.$session.set('userType', login.data.user_type);
                    }
                    else{
                        console.log(login)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            async sendFile() {
                let dataForm = new FormData();
                dataForm.append('curriculum', this.$refs.files.files[0])
                dataForm.append('userId', this.member._id)
                await this.axios.post("/member-file", dataForm);                                
            },
            async downloadFile() {                
                let res = await this.axios.get(`/member-file/${this.$session.get('expecificId')}`, {responseType: 'blob'})
                let fileURL = window.URL.createObjectURL(new Blob([res.data]));                
                let fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', `curriculo.pdf`);
                document.body.appendChild(fileLink);
                fileLink.click();
            }
        },
        async mounted() {
            const memberRes = await this.axios.get(`/member/${this.$session.get('expecificId')}`);
            this.member = memberRes.data;
            console.log(this.member.position)
        },
    };
  </script>
  