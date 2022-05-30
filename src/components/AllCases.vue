<template>
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
      key: 'desc',
      className: 'desc'
    },
    {
      title: 'Статус',
      key: 'status',
      className: 'status'
    }
  ]
}

const createData = () => [
  {
    date: new Date().toDateString(),
    title: "Немає води на 11-му поверсі",
    desc: "Вчора пропала вода на 11-му поверсі коли ремонтували трубу діди",
    status: "Нове"
  }
  /*  {
      key: 0,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },*/
]

export default defineComponent({
  name: "AllCases",
  data() {
    return {
      data: createData(),
      columns: createColumns(),
      pagination: {
        pageSize: 8
      }
    }
  },
  methods:{},
  created() {
    axios.get("https://305b-93-170-55-154.eu.ngrok.io/allcases?userId=1870397359").then(res=>{
      this.columns = res.data
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