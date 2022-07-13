<template>
  <div v-if="hideTable === false">
    <div class="visibleItems">
      <n-text class="textVisible">
        Список ваших адрес:
      </n-text>
    </div>
    <table id="userData">
      <tr>
        <th>ID</th>
        <th>Регіон/область</th>
        <th>Місто/селище</th>
        <th>Вулиця</th>
        <th style="max-width: 70px; line-height: 1;">№ будинку</th>
        <th style="max-width: 50px;">Квартира</th>
        <th>Дія</th>
      </tr>
      <tr v-for="(data, k) in data" :key="k">
        <td>
          <input style="max-width: 20px;" readonly class="tableDisplay" type="text" v-model="data.id"/>
        </td>
        <td>
          <input readonly class="tableDisplay" type="text" v-model="data.region"/>
        </td>
        <td>
          <input readonly class="tableDisplay" type="text" v-model="data.city"/>
        </td>
        <td>
          <input readonly class="tableDisplay" type="text" v-model="data.street"/>
        </td>
        <td>
          <input style="max-width: 50px;" readonly class="tableDisplay" type="text" v-model="data.number"/>
        </td>
        <td>
          <input style="max-width: 50px;" readonly class="tableDisplay" type="text" v-model="data.apartment"/>
        </td>
        <td>
          <button type='button' class="buttonDelete" @click="deleteData(k)">
            DELETE
          </button>
        </td>
      </tr>
    </table>
  </div>
  <div v-else class="hideItems">
    <n-text class="textHide">
      У вас ще немає доданих адрес. Будь-ласка, закрийте це вікно і додайте нову адресу.
    </n-text>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "AllLocation",
  data() {
    return {
      data: [],
      userId: this.$route.query.userId,
      hideTable: true,
      pagination: {
        pageSize: 5
      },
    }
  },
  methods:
      {
        deleteData(data) {
          let index = this.data.indexOf(data)
          this.data.splice(index, 1)
          axios.delete("https://bot-test.fun/alllocation/" + index)
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

.tableDisplay {
  text-align: center;
  border: none;
  background-color: whitesmoke;
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