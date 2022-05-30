<template>
  <n-button @click="handleClick">
    Створити звернення
  </n-button>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :single-line="false"
        :columns="columns"
        :data="data"
        :pagination="pagination"
    />
  </n-space>
</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";

const createColumns = () => {
  return [
    {
      title: 'Дата',
      key: 'date',
      className: 'date'
    },
    {
      title: 'Тема',
      key: 'title',
      className: 'title'
    },
    {
      title: 'Опис',
      key: 'description',
      className: 'desc'
    },
    {
      title: 'Статус',
      key: 'status',
      className: 'status'
    }
  ]
}

export default defineComponent({
  name: "AllCases",
  data() {
    return {
      data: [],
      userId: this.$route.query.userId,
      columns: createColumns(),
      pagination: {
        pageSize: 8
      }
    }
  },
  methods:{
    handleClick(){
      this.$router.push("/createcase?userId=" + this.userId)
    }
  },
  created() {
    axios.get("https://305b-93-170-55-154.eu.ngrok.io/allcases?userId=" + this.userId).then(res=>{
      this.data = res.data
      console.log(res.data)
    })
  }
})
</script>

<style scoped>
:deep(.desc) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
  padding: 8px;
}
:deep(.n-data-table-td){
  padding: 10px;
}
:deep(.date){
  max-width: 100px !important;
  padding: 8px;
}
:deep(.title){
  max-width: 160px;
}
</style>