<template>
  <div v-if="hideTable === false">
    <div class="visibleItems">
      <n-text class="textVisible">
        Список ваших адрес:
      </n-text>
    </div>
    <n-space vertical :size="12">
      <n-data-table
          :bordered="false"
          :single-line="true"
          :columns="columns"
          :data="data"
      />
    </n-space>
  </div>
  <div v-else class="hideItems">
    <n-text class="textHide">
      У вас ще немає доданих адрес. Будь-ласка, закрийте це вікно і додайте нову адресу.
    </n-text>
  </div>
</template>

<script>
import {defineComponent, h} from 'vue'
import axios from "axios";
import {NButton} from "naive-ui";

export default defineComponent({
  name: "AllLocation",
  data() {
    return {
      data: [],
      userId: this.$route.query.userId,
      columns: this.createColumns(),
      hideTable: true,
      pagination: {
        pageSize: 5
      },
    }
  },
  methods:
      {
        handleClick() {
          this.$router.push("/location?userId=" + this.userId)
        },
        createColumns() {
          const self = this;
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
            },
            {
              title: "Дія",
              key: "actions",
              render(row) {
                return h(NButton, {
                  strong: true,
                  tertiary: true,
                  size: "small",
                  onClick: () => {
                    console.log(self.data)
                    const arrayId = self.data.findIndex(x => x.id === row.id)
                    axios.delete("https://bot-test.fun/alllocation/" + row.id).then(() => self.data.splice(arrayId, 1))
                  }
                }, {default: () => "🗑️"});
              }
            }
          ]
        }
      },
  created() {
    axios.get("https://bot-test.fun/alllocation?userId=" + this.userId).then(res => {
      this.data = res.data.map(item => {
        return item;
      })
      this.hideTable = this.data.length === 0;
    })
  },
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

.textVisible {
  font-size: 18px;
  text-align: center;
  padding: 10px;
  display: block;
}

.visibleItems {
  text-align: center;
  padding: 20px;
}

</style>