<template>
  <div v-if="hideTable === false">
    <div class="visibleItems">
      <n-text class="textVisible">
        Оберіть свою адресу нижче або додайте нову
      </n-text>
      <n-button @click="handleClick">
        Додати адресу
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
      У вас ще немає доданих адрес. Бажаєте додати?
    </n-text>
    <n-button @click="handleClick">
      Додати адресу
    </n-button>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";

const createColumns = () => {
  return [
    {
      title: 'Регіон/область',
      key: 'region',
      className: 'region'
    },
    {
      title: 'Місто/селище',
      key: 'city',
      className: 'city'
    },
    {
      title: 'Вулиця',
      key: 'street',
      className: 'street'
    },
    {
      title: 'Номер будинку',
      key: 'number',
      className: 'number'
    },
    {
      title: 'Квартира',
      key: 'apartment',
      className: 'apartment'
    }
  ]
}

export default defineComponent({
  name: "AllLocation",
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
      this.$router.push("/location?userId=" + this.userId)
    }
  },
  created() {
    axios.get("https://bot-test.fun/alllocation?userId=" + this.userId).then(res => {
      this.data = res.data.map(item => {
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