<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex-column">
    <form @submit.prevent="submitForm" class="invoice-content">
      <h1>New Invoice</h1>

      <!-- Bill From -->
      <div class="bill-from flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="billerStreetAddress"
            v-model="billerStreetAddress"
          />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>

          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="billerZipCode"
              v-model="billerZipCode"
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input
              required
              type="text"
              id="billerCountry"
              v-model="billerCountry"
            />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input required type="text" id="clientName" v-model="clientName" />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="clientStreetAddress"
            v-model="clientStreetAddress"
          />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="clientCity" />
          </div>

          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="clientZipCode"
              v-model="clientZipCode"
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input
              required
              type="text"
              id="clientCountry"
              v-model="clientCountry"
            />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input
              disabled
              type="text"
              id="invoiceDate"
              v-model="invoiceDate"
            />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              v-model="paymentDueDate"
            />
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select required type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input
            disabled
            type="text"
            id="productDescription"
            v-model="productDescription"
          />
        </div>
        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>

            <tr
              class="table-items flex"
              v-for="(item, index) in invoiceItemList"
              :key="index"
            >
              <td class="item-name">
                <input type="text" v-model="item.itemName" />
              </td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price"><input type="text" v-model="item.price" /></td>
              <td class="total flex">
                ${{ (item.total = item.qty * item.price) }}
              </td>
              <img
                @click="deleteInvoiceItem(item.id)"
                src="../assets/image/icon-delete.svg"
                alt=""
              />
            </tr>
          </table>

          <div @click="addNewInvoiceItem" class="flex button">
            <img src="../assets/image/icon-plus.svg" alt="" />
            Add New Item
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeInvoice" class="red">
            Cancel
          </button>
        </div>
        <div class="right flex">
          <button type="submit" @click="saveDraft" class="dark-purple">
            Save Draft
          </button>
          <button type="submit" @click="publishInvoice" class="purple">
            Create Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { onMounted, watch } from "@vue/runtime-core";
import { v4 as uid } from "uuid";
import db from "../firebase/firebaseInit";
import { collection, addDoc } from "@firebase/firestore";

export default {
  name: "invoiceModal",
  setup() {
    const store = useStore();
    const state = reactive({
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    });

    /* close Modal Logic */
    function closeInvoice() {
      return store.commit("TOGGLE_INVOICE");
    }

    /* Generate Invoice date Logic  */
    onMounted(() => {
      state.invoiceDateUnix = Date.now();
      state.invoiceDate = new Date(state.invoiceDateUnix).toLocaleDateString(
        "en-us",
        state.dateOptions
      );

      watch(
        () => state.paymentTerms,
        () => {
          const futureDate = new Date();
          state.paymentDueDateUnix = futureDate.setDate(
            futureDate.getDate() + parseInt(state.paymentTerms)
          );
          state.paymentDueDate = new Date(
            state.paymentDueDateUnix
          ).toLocaleString("en-us", state.dateOptions);
        }
      );
    });

    /* Add invoice item Logic */
    function addNewInvoiceItem() {
      state.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    }

    function deleteInvoiceItem(id) {
      state.invoiceItemList = state.invoiceItemList.filter(
        (item) => item.id !== id
      );
    }

    /* Sending Invoice Data Logic */

    function publishInvoice() {
      state.invoicePending = true;
    }

    function saveDrat() {
      state.invoiceDraft = true;
    }

    function calInvoiceTotal() {
      state.invoiceTotal = 0;
      state.invoiceItemList.forEach((item) => {
        state.invoiceTotal += item.total;
      });
    }

    async function uploadInvoice() {
      if (state.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out Invoice Items!");
        return;
      }

      calInvoiceTotal();

      await addDoc(collection(db, "invoices"), {
        billerStreetAddress: state.billerStreetAddress,
        billerCity: state.billerCity,
        billerZipCode: state.billerZipCode,
        billerCountry: state.billerCountry,
        clientName: state.clientName,
        clientEmail: state.clientEmail,
        clientStreetAddress: state.clientStreetAddress,
        clientCity: state.clientCity,
        clientZipCode: state.clientZipCode,
        clientCountry: state.clientCountry,
        invoiceDateUnix: state.invoiceDateUnix,
        invoiceDate: state.invoiceDate,
        paymentTerms: state.paymentTerms,
        paymentDueDateUnix: state.paymentDueDateUnix,
        paymentDueDate: state.paymentDueDate,
        productDescription: state.productDescription,
        invoicePending: state.invoicePending,
        invoiceDraft: state.invoiceDraft,
        invoiceItemList: state.invoiceItemList,
        invoiceTotal: state.invoiceTotal,
      });

      closeInvoice();
    }

    function submitForm() {
      uploadInvoice();
    }

    return {
      publishInvoice,
      saveDrat,
      submitForm,
      deleteInvoiceItem,
      addNewInvoiceItem,
      ...toRefs(state),
      closeInvoice,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_button.scss";
@import "../assets/styles/_color.scss";
@import "../assets/styles/InvoiceModal/InvoiceModal.scss";
</style>
