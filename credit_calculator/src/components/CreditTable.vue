<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-center">
        Год, месяц
      </th>
      <th class="text-center">
        Сумма платежа, руб
      </th>
      <th class="text-center">
        Сумма на проценты, руб
      </th>
      <th class="text-center">
        Сумма на долг, руб
      </th>
      <th class="text-center">
        Остаток долга, руб
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in data"
        :key="item.date"
    >
      <td>{{ item.date }}</td>
      <td class="text-center">{{ item.annuityPayment }}</td>
      <td class="text-center">{{ item.percentPayment }}</td>
      <td class="text-center">{{ item.dutyPayment }}</td>
      <td class="text-center">{{ item.balance }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import moment from "moment";
import 'moment/locale/ru'

export default {
  name: "CreditTable",
  props: {
    housingCost: {
      type: Number,
      required: true,
    },
    initialFee: {
      type: Number,
      required: true,
    },
    creditTerm: {
      type: Number,
      required: true,
    },
    creditPercent: {
      type: Number,
      required: true,
    },
    isSalaryCard: {
      type: Boolean,
      required: true,
    },
    salaryCardBonus: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      data: [],
      interestRate: this.creditPercent,
    }
  },
  methods: {
    setDate() {
      for (let i = 0; i < this.creditTerm * 12; i++) {
        const dataItem = {
          date: moment().add(i, 'month').format('MMMM YYYY'),
          annuityPayment: 0,
          percentPayment: 0,
          dutyPayment: 0,
          balance: 0,
        }
        this.data.push(dataItem);
      }
    },

    setInterestRate() {
      if (this.isSalaryCard) this.interestRate -= this.salaryCardBonus;
      else this.interestRate += this.salaryCardBonus;
    },

    setAnnuityPayment() {
      const monthRate = this.interestRate/ (12 * 100);
      this.data[0].annuityPayment = -(this.housingCost - this.initialFee);
      for (let i = 1; i < this.data.length; i++) {
        this.data[i].annuityPayment = ((this.housingCost - this.initialFee) *
            ((monthRate) / (1 - (1 + monthRate) ** (-this.data.length)))).toFixed(2);
      }
    },

    setPayment() {
      const monthRate = this.interestRate/ (12 * 100);
      this.data[0].balance = (this.housingCost - this.initialFee);
      this.data[1].percentPayment = ((this.housingCost - this.initialFee) * monthRate).toFixed(2);
      this.data[1].dutyPayment = (this.data[1].annuityPayment - this.data[1].percentPayment).toFixed(2);
      this.data[1].balance = ((this.housingCost - this.initialFee) - this.data[1].annuityPayment).toFixed(2);

      for (let i = 2; i < this.data.length; i++) {
        this.data[i].percentPayment = (this.data[i - 1].balance * monthRate).toFixed(2);
        this.data[i].dutyPayment = (this.data[i].annuityPayment - this.data[i].percentPayment).toFixed(2);
        this.data[i].balance = (this.data[i - 1].balance - this.data[i].dutyPayment).toFixed(2);
      }
    },

  },
  mounted() {
    this.setInterestRate();
    this.setDate();
    this.setAnnuityPayment();
    this.setPayment();
  }
}
</script>