<template>
    <v-form class="form" ref="form" v-model="valid">
      <v-select
          label="Цель кредита"
          v-model="creditGoal"
          :items="goalItems"
          item-title="name"
          item-value="value"
          return-object
          hide-details
      />

      <section class="section">
        <h2>Есть ли у вас зарплатная карта?</h2>
        <v-switch :label="isSalaryCard ? 'Да' : 'Нет'" inset hide-details color="red" v-model="isSalaryCard"/>
      </section>

      <div class="inputs">
        <v-text-field
            label="Стоимость жилья"
            v-model="housingCost"
            suffix="&#8381"
            type="number"
            required
            :rules="housingCostRules"
        />
        <v-slider
            v-model="housingCost"
            :min="minHousingCost"
            :max="maxHousingCost"
            :step="stepHousingCost"
            color="red"
            hide-details
        />
        <div class="slider__labels">
          <p>{{this.minHousingCost / 1e6}} млн &#8381</p>
          <p>{{(this.maxHousingCost / 2) / 1e6}} млн &#8381</p>
          <p>{{this.maxHousingCost / 1e6}} млн &#8381</p>
        </div>
      </div>

      <div class="inputs">
        <v-text-field
            label="Первоначальный взнос"
            v-model="initialFee"
            suffix="&#8381"
            type="number"
            required
            :rules="initialFeeRules"
        />
        <v-slider
            v-model="initialFee"
            :min="minInitialFee"
            :max="maxInitialFee"
            :step="stepInitialFee"
            color="red"
            hide-details
        />
        <div class="slider__labels">
          <p>{{this.minInitialFee / 1e6}} млн &#8381</p>
          <p>{{(this.maxInitialFee / 2) / 1e6}} млн &#8381</p>
          <p>{{this.maxInitialFee / 1e6}} млн &#8381</p>
        </div>
      </div>

      <div class="inputs">
        <v-text-field
            label="Срок кредита"
            v-model="creditTerm"
            suffix="лет"
            type="number"
            :rules="creditTermRules"
            required
        />
        <v-slider
            v-model="creditTerm"
            :min="minCreditTerm"
            :max="maxCreditTerm"
            :step="stepCreditTerm"
            color="red"
            hide-details
        />
        <div class="slider__labels">
          <p>{{this.minCreditTerm}} год</p>
          <p>{{(this.maxCreditTerm / 2)}} лет</p>
          <p>{{this.maxCreditTerm}} лет</p>
        </div>
      </div>

      <v-btn @click="validate">
        Рассчитать кредит
      </v-btn>
    </v-form>
  <table-modal v-model:show="modalVisible">
    <credit-table
        :credit-percent="creditGoal.value"
        :is-salary-card="isSalaryCard"
        :housing-cost="housingCost"
        :initial-fee="initialFee"
        :credit-term="creditTerm"
    />
  </table-modal>
</template>

<script>
import TableModal from "@/components/TableModal";
import CreditTable from "@/components/CreditTable";
export default {
  components: {CreditTable, TableModal},
  data() {
    return {
      isSalaryCard: false,

      creditGoal: {name: 'Вторичное жилье', value: 10.4},
      goalItems: [
        {name: 'Вторичное жилье', value: 10.4},
        {name: 'Господдержка 2020', value: 6.7},
        {name: 'Для семей с детьми', value: 5.7},
        {name: 'Новостройка', value: 10.4},
      ],

      housingCost: 10000000,
      minHousingCost: 1500000,
      maxHousingCost: 60000000,
      stepHousingCost: 100,
      housingCostRules: [],

      initialFee: 1000000,
      minInitialFee: 500000,
      maxInitialFee: 60000000,
      stepInitialFee: 100,
      initialFeeRules: [],

      creditTerm: 5,
      minCreditTerm: 1,
      maxCreditTerm: 30,
      stepCreditTerm: 1,
      creditTermRules: [],

      valid: true,
      modalVisible: false,
    }
  },
  methods: {
    setRules() {
      this.housingCostRules.push(
          v => !!v || 'Поле должно быть заполнено',
          v => v >= this.minHousingCost || `Сумма должна быть не меньше чем ${this.minHousingCost} ₽`,
          v => v <= this.maxHousingCost || `Сумма должна быть не больше чем ${this.maxHousingCost} ₽`,
      );

      this.initialFeeRules.push(
          v => !!v || 'Поле должно быть заполнено',
          v => v >= this.minInitialFee || `Сумма должна быть не меньше чем ${this.minInitialFee} ₽`,
          v => v <= this.housingCost || `Сумма должна быть не больше чем текущее значение стоимости жилья (${this.housingCost} ₽)`,
      );

      this.creditTermRules.push(
          v => !!v || 'Поле должно быть заполнено',
          v => v >= this.minCreditTerm || `Сумма должна быть не меньше чем ${this.minCreditTerm} год`,
          v => v <= this.maxCreditTerm || `Сумма должна быть не больше чем ${this.maxCreditTerm} лет`,
      );
    },

    async validate () {
      this.setRules();
      const { valid } = await this.$refs.form.validate()

      if (valid) this.modalVisible = true;
    },
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.inputs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.slider__labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
</style>
