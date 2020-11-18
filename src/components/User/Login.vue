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
    extend('cpf', {
        validate: (value =>{
            value = value.replace(/[^\d]+/g,'');
            var Soma;
            var Resto;
            Soma = 0;
            if (value == "00000000000") return false;

            for (var i=1; i<=9; i++) Soma = Soma + parseInt(value.substring(i-1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

                if ((Resto == 10) || (Resto == 11))  Resto = 0;
                if (Resto != parseInt(value.substring(9, 10)) ) return false;

            Soma = 0;
                for (i = 1; i <= 10; i++) Soma = Soma + parseInt(value.substring(i-1, i)) * (12 - i);
                Resto = (Soma * 10) % 11;

                if ((Resto == 10) || (Resto == 11))  Resto = 0;
                if (Resto != parseInt(value.substring(10, 11) ) ) return false;
                return true;
        }),
        message: 'CPF inválido'
    });

    extend('cnpj', {
        validate: (value =>{
           var cnpj = value.replace(/[^\d]+/g,'');
 
            if(cnpj == '') return false;
            
            if (cnpj.length != 14)
                return false;
        
            // Elimina CNPJs invalidos conhecidos
            if (cnpj == "00000000000000" || 
                cnpj == "11111111111111" || 
                cnpj == "22222222222222" || 
                cnpj == "33333333333333" || 
                cnpj == "44444444444444" || 
                cnpj == "55555555555555" || 
                cnpj == "66666666666666" || 
                cnpj == "77777777777777" || 
                cnpj == "88888888888888" || 
                cnpj == "99999999999999")
                return false;
                
            // Valida DVs
            var tamanho = cnpj.length - 2
            var numeros = cnpj.substring(0,tamanho);
            var digitos = cnpj.substring(tamanho);
            var soma = 0;
            var pos = tamanho - 7;
            for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                    pos = 9;
            }
            var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
                
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
                
            return true;
        }),
        message: 'CNPJ inválido'
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
  