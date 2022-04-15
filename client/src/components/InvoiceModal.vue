<template>
  <b-container>
    <h6>Invoice Details</h6>
    <b-row>
      <b-col
        cols="4"
        v-for="[k, value, index] of Object.entries(invoiceDetails)"
        :key="index"
        class="m-1 py-0"
      >
        <b-input-group :prepend="capitalize(k)" size="sm" class="py-0">
          <input
            v-if="value.type !== 'textarea'"
            v-model="value.value"
            :type="value.type"
            class="form-control py-0"
            size="sm"
          />
          <textarea
            v-if="value.type === 'textarea'"
            v-model="value.value"
            class="form-control py-0"
            size="sm"
          ></textarea>
        </b-input-group>
      </b-col>
    </b-row>
    <!-- Custom Invoice Item Form -->
    <div v-if="type === 'custom'">
      <hr />

      <h6>Invoice Items</h6>
      <b-form v-for="(form, i) in custom_invoice.model" :key="i" inline>
        <input
          v-for="(el, idx) in custom_invoice.group"
          :key="idx"
          size="sm"
          class="form-control m-1 py-0"
          v-model="form[el.key]"
          :placeholder="el.label"
          :type="el.type"
          :style="el.style"
          :disabled="el.disabled"
          @input="callback(form)"
        /><b-button
          variant="light"
          size="sm"
          class="py-0"
          @click="removeRow(i)"
        >
          <b-icon size="sm" icon="x-circle" variant="danger"></b-icon>
        </b-button>
      </b-form>
      <b-button
        variant="light"
        class="text-success my-2"
        size="sm"
        @click="addFormRow"
        block
        >Add Entry</b-button
      >

      <hr />
    </div>
    <div id="printableInvoice">
      <b-row class="mb-2">
        <b-col cols="5"
          ><img
            src="https://drive.google.com/uc?export=view&id=1vOf1sRdudHvgTUEtm3hdth3KORG-eVm5"
            alt="EVEXUS-LOGO"
            style="width: 250px; max-width: 100%; height: auto"
        /></b-col>
        <b-col>INVOICE</b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-row>
            <b-col cols="3" class="text-right">Invoice To :</b-col>
            <b-col>{{ client_name }}</b-col>
          </b-row>
          <b-row>
            <b-col cols="3" class="text-right">Address :</b-col>
            <b-col>{{ invoiceDetails.client_address.value }}</b-col>
          </b-row>
        </b-col>

        <b-col>
          <b-row>
            <b-col cols="4" class="text-right">Invoice No: </b-col>
            <b-col>{{
              invoiceDetails.invoice_no.value | pad(4, "INV-")
            }}</b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="text-right">Invoice Date: </b-col>
            <b-col>{{
              invoiceDetails.invoice_date.value | formatAs("date")
            }}</b-col>
          </b-row>

          <b-row>
            <b-col cols="4" class="text-right">Payment Terms: </b-col>
            <b-col>{{ invoiceDetails.payment_terms.value }}</b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="text-right">VAT Reg No: </b-col>
            <b-col>{{ invoiceDetails.VAT_reg_no.value }}</b-col>
          </b-row>
        </b-col>
      </b-row>

      <!-- @@@@@@@@@@@@@@@ Table  -->
      <b-table
        striped
        hover
        :items="type === 'custom' ? custom_invoice['model'] : items"
        :fields="type === 'custom' ? custom_invoice['group'] : fields"
      >
      </b-table>
      <hr />
      <b-row
        class="mt-0"
        v-for="(item, idx) in footerFields"
        :key="idx"
        align-h="end"
      >
        <b-col
          cols="2"
          :class="item.cls ? 'text-right font-weight-bold' : 'text-right'"
          >{{ prefs[item.text] || item.text }}</b-col
        >
        <b-col
          cols="2"
          :class="item.cls ? 'text-left font-weight-bold' : 'text-left'"
          >{{
            invoiceFooter[item.fld] | formatAs(item.formatType, localeOptions)
          }}</b-col
        >
      </b-row>
    </div>
    <b-button
      v-if="type === 'custom'"
      variant="warning"
      class="text-primary my-2"
      size="sm"
      @click="print"
      block
      >Print Invoice</b-button
    >
    <pre>
      {{ prefs }}
    </pre>
  </b-container>
</template>

<script>
import moment from "moment";
import configStore from "../store/configuration";

export default {
  name: "invoice",
  props: {
    items: {
      type: Object,
      required: false,
    },
    clientId: {
      type: Number,
      required: true,
    },
    invoice_details: {
      type: Object,
      required: false,
    },
    inv_no: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      configStore: configStore,
      invoiceDetails: {
        client_address: {
          value: "",
          type: "textarea",
          label: "Client Address",
        },
        invoice_no: { value: "", type: "number", label: "Invoice No" },
        payment_terms: {
          value: "30 days",
          type: "text",
          label: "Payment Terms",
        },
        invoice_date: { value: "", type: "date", label: "Invoice Date" },
        VAT_reg_no: {
          value: configStore.state.prefs.reg_no,
          type: "text",
          label: configStore.state.prefs.label_reg_no,
        },

        // acc_no: { value: "", type: "text" },
      },
      client_name: "",
      client_address: "",
      fields: [
        {
          key: "activity_type_id",
          label: "Activity",
          formatter: (value, key, item) => {
            return this.config["tbl_activity_type"][value]["activity_type"];
          },
          class: "text-center",
        },
        {
          key: "task_type_id",
          label: "Task ",
          formatter: (value, key, item) => {
            return this.config["tbl_task_type"][value]["task_type"];
          },
        },
        {
          key: "time",
          label: "Time",
          formatter: (value, key, item) => {
            let str = item["hours"] + " Hrs " + item["minutes"] + " Mins";

            return str;
          },
        },
        {
          key: "rate",
          label: "Rate",
          formatter: (value) => {
            return this.$options.filters.formatAs(
              value,
              "currency",
              this.localeOptions
            );
          },
        },
        {
          key: "charge",
          label: "Charge",
          formatter: (value) => {
            return this.$options.filters.formatAs(
              value,
              "currency",
              this.localeOptions
            );
          },
        },
      ],
      footerFields: [
        { text: "Total", fld: "total", formatType: "currency" },
        {
          text: "tax_type",
          fld: "st_p",
          formatType: "percent",
        },
        {
          text: "tax_type",
          fld: "st",
          formatType: "currency",
        },
        {
          text: "Invoice Total",
          fld: "gt",
          formatType: "currency",
          cls: "font-weight-bold",
        },
      ],
      custom_invoice: {
        group: [
          {
            type: "text",
            key: "description",
            label: "Description",
            style: "width: 700px",
            class: "col-8",
          },
          {
            type: "number",
            key: "qty",
            label: "Qty",
            style: "width: 90px",
          },
          {
            type: "number",
            key: "rate",
            label: "Rate",
            style: "width: 110px",
            formatter: (value) => {
              return this.$options.filters.formatAs(value, "currency");
            },
          },
          {
            type: "number",
            key: "amount",
            label: "Amount",
            style: "width: 110px",
            formatter: (value) => {
              return this.$options.filters.formatAs(value, "currency");
            },
            disabled: true,
          },
        ],
        model: [],
      },
      localeOptions: {},
      dropdowns: {},
      momentDate: null,
      schema: this.filterSchema,
      output: null,
    };
  },
  computed: {
    filtersArray: function () {},
    invoiceFooter: function () {
      const o = {};
      let total = 0;
      if (this.type) {
        total = this.custom_invoice["model"].reduce(
          (a, b) => a + (Number(b["amount"]) || 0),
          0
        );
      } else {
        total = this.items.reduce((a, b) => a + (b["charge"] || 0), 0);
      }

      const st_p = 20;
      const st = (st_p * total) / 100;
      const gt = st + total;
      o["total"] = total;
      o["st_p"] = st_p;
      o["st"] = st;
      o["gt"] = gt;
      return o;
    },
    config() {
      return configStore.state.indexedDropdowns;
    },
    prefs() {
      return configStore.state.prefs;
    },
  },
  mounted() {
    this.localeOptions = {
      locale: configStore.state.prefs.locale,
      currency: configStore.state.prefs.currency,
    };
    console.log("Invoice Modal mounting...");
    this.client_name = this.config["tbl_client"][this.clientId]["client_name"];
    this.invoiceDetails["invoice_no"]["value"] = this.inv_no || "";
    var dt = new Date();
    console.log("Date", dt.toLocaleDateString("en-GB"));
    dt = dt.toLocaleDateString("en-GB").split("/").reverse().join("-");
    this.invoiceDetails["invoice_date"]["value"] = dt.toLocaleString("en-GB");
    if (this.invoice_details != null) {
      for (const key in this.invoice_details) {
        this.invoiceDetails[key]["value"] = this.invoice_details[key]["value"];
      }
    } else {
      this.invoiceDetails["client_address"]["value"] =
        this.config["tbl_client"][this.clientId]["address_1"];
    }
    this.generateModelForCustomInvoice();
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString().replace(/_/g, " ");

      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString().replace(/_/g, " ");

      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    reset() {
      Object.assign(this.$data, this.$options.data());
    },
    generateModelForCustomInvoice() {
      let o = {};
      this.custom_invoice.group.forEach((el) => {
        o[el.key] = "";
      });
      this.custom_invoice.model.push(o);
    },
    callback(model) {
      console.log(model);
      model["amount"] = model["rate"] * model["qty"];
    },

    addFormRow() {
      let clonedRow = { ...this.custom_invoice.model[0] };
      for (const [k, v] of Object.entries(clonedRow)) {
        clonedRow[k] = "";
      }
      this.custom_invoice.model.push(clonedRow);
    },
    removeRow(i) {
      this.custom_invoice.model.splice(i, 1);
    },
    async print() {
      await this.$htmlToPaper("printableInvoice");
    },
  },
};
</script>
<style>
@media print {
  .footer {
    position: relative;
    top: -20px;

    height: 10px;
  }
}
</style>