<template>
    <div class="container">
        <div class="row pt-3 justify-content-center">
            <h4 class="">{{project.name}}</h4>
        </div>
        <div class="row pt-3 justify-content-center">
            <a class="px-3 py-1 mx-1" href="#">
                <img style="width:40px" class="img-fluid" src="../../assets/trello.svg" alt="">
            </a>                         
            <a class="px-3 py-1 mx-1" href="#">
                <img style="width:40px" class="img-fluid" src="../../assets/git.svg" alt="">
            </a>
            <a class="px-3 py-1 mx-1" href="#">
                <img style="width:40px" class="img-fluid" src="../../assets/slack.svg" alt="">
            </a>
        </div>
        <div class="row">
            <div class="col-8">
                <h6 class="text-left">{{ 'Dono' }}</h6>
            </div>
            <div class="col-4">
                <div class="row">
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return {
            project: {}
        }
    },
    async mounted() {
        const projectRes = await this.axios.get(`${process.env.VUE_APP_API_URI}/project/${this.$route.params.id}`)
        this.project = projectRes.data
    }
}
</script>
