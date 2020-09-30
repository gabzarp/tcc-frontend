<template>
    <div>
        PROJETOs
        <ul>
            <li v-for="(project, index) of projects" :key="index">{{project.name}}</li>
        </ul>
    </div>
</template>
<script>

export default {
    data(){
        return {
            projects: {}
        }
    },
    async mounted() {
        const projectRes = await this.axios.get("http://localhost:3001/projects")
        this.projects = projectRes.data
    }
}
</script>
