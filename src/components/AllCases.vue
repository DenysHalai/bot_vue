<template>
  <div v-if="hideTable === false">
    <div class="visibleItems">
      <n-text class="textVisible">
        Оберіть звернення нижче або створіть нове
      </n-text>
      <n-button @click="handleClick">
        Створити звернення
      </n-button>
    </div>
    <n-space vertical :size="12">
      <n-data-table
          :bordered="false"
          :single-line="false"
          :columns="columns"
          :data="data"
          :pagination="pagination"
      />
    </n-space>
  </div>
  <div v-else class="hideItems">
    <n-text class="textHide">
      У вас ще немає зверненнь. Бажаєте створити?
    </n-text>
    <n-button @click="handleClick">
      Створити звернення
    </n-button>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";
import {DateTime} from "luxon";

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
      data: null,
      userId: this.$route.query.userId,
      columns: createColumns(),
      hideTable: true,
      pagination: {
        pageSize: 3
      }
    }
  },
  methods: {
    handleClick() {
      this.$router.push("/createcase?userId=" + this.userId)
    }
  },
  created() {
    axios.get("https://f7b3-93-170-55-154.eu.ngrok.io/allcases?userId=" + this.userId).then(res => {
      this.data = res.data.map(item => {
        item.date = DateTime.fromISO(item.date).toFormat('HH:mm, dd LLL yyyy');
        return item;
      })
      this.hideTable = this.data.length === 0;
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

:deep(.n-data-table-td) {
  padding: 10px;
}

:deep(.date) {
  max-width: 100px !important;
  padding: 8px;
}

:deep(.title) {
  max-width: 160px;
}

.textHide {
  font-size: 22px;
  max-width: 300px;
  text-align: center;
  padding: 40px;
  display: block;
}

.hideItems {
  text-align: center;
}

.textVisible{
  font-size: 18px;
  text-align: center;
  padding: 10px;
  display: block;
}

.visibleItems{
  text-align: center;
  padding: 20px;
}

</style>